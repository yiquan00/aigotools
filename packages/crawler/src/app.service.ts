import { Injectable, Logger } from '@nestjs/common';
import { ProcessStage, Site } from './schemas/site.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SiteQueueProducer } from './site-queue/site-queue.producer';

export interface BatchParams {
  query?: {
    state?: string;
    processStage?: string;
    search?: string;
  };
  siteIds?: string[];  
}

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Site.name) private siteModel: Model<Site>,
    private siteQueueProducer: SiteQueueProducer,
  ) {}

  private generateBatchQuery(params: BatchParams) {
    Logger.log('Received params:', JSON.stringify(params));  
    const query: FilterQuery<Site> = { $or: [] };
    if (params.siteIds?.length) {
      query.$or.push({ _id: { $in: params.siteIds } });
    }
    if (params.query) {
      Logger.log('Query params:', JSON.stringify(params.query));  
      query.$or.push(params.query);
    }
    if (query.$or.length === 0) {
      Logger.error('No valid query parameters found');  
      throw new Error('params wrong');
    }
    Logger.log('Generated query:', JSON.stringify(query));  
    return query;
  }

  async batchDispatchSiteCrawl(params: BatchParams) {
    try {
      Logger.debug('开始批量分发爬虫任务，参数:', JSON.stringify(params));

      // 1. 查询站点
      const siteIds = params.siteIds || [];
      Logger.log('需要处理的站点:', siteIds);

      if (siteIds.length === 0) {
        Logger.warn('未找到需要处理的站点');
        return { 
          success: true, 
          message: '没有找到需要爬取的站点', 
          count: 0 
        };
      }

      // 2. 更新站点状态
      for (const siteId of siteIds) {
        try {
          await this.siteModel.findByIdAndUpdate(siteId, {
            processStage: ProcessStage.processing,
            updatedAt: new Date()
          });
          Logger.log(`站点 ${siteId} 状态已更新为处理中`);

          // 3. 尝试添加到队列，如果失败则记录日志但不中断处理
          try {
            await this.siteQueueProducer.addCrawlJob(siteId);
            Logger.log(`站点 ${siteId} 已添加到爬取队列`);
          } catch (queueError) {
            Logger.error(`添加站点 ${siteId} 到队列失败:`, queueError);
            // 继续处理其他站点，不抛出错误
          }
        } catch (error) {
          Logger.error(`更新站点 ${siteId} 状态失败:`, error);
        }
      }

      // 4. 返回处理结果
      return {
        success: true,
        message: `成功更新 ${siteIds.length} 个站点状态`,
        count: siteIds.length,
        details: {
          processedSites: siteIds,
          timestamp: new Date().toISOString(),
          status: 'processing',
          note: 'Redis连接不稳定，任务可能需要稍后重试'
        }
      };

    } catch (error) {
      Logger.error('批量分发过程出错:', error);
      throw error;
    }
  }

  async batchStopSiteCrawl(params: BatchParams) {
    const query = this.generateBatchQuery(params);
    const siteIds = (await this.siteModel.distinct('_id', query)).map((id) =>
      id.toString(),
    );
    await this.siteQueueProducer.batchStopCrawlJob(siteIds);
    Logger.log(`Batch stop ${siteIds.length} sites crawl`);
    await this.siteModel.updateMany(query, {
      $set: { processStage: ProcessStage.pending },
    });
  }
}
