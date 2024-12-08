import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { v4 } from 'uuid';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import * as https from 'https';

@Injectable()
export class S3Service {
  s3: S3Client;
  constructor(private configService: ConfigService) {
    const endpoint = this.configService.get('S3_ENDPOINT');
    const region = this.configService.get('S3_REGION');

    this.s3 = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('S3_ACCESS_SECRET'),
      },
      forcePathStyle: true,
      requestHandler: new NodeHttpHandler({
        httpsAgent: new https.Agent({
          rejectUnauthorized: true,
          minVersion: 'TLSv1.2',
        }),
      }),
    });
  }

  async uploadBufferToS3(
    buffer: Buffer,
    contentType: string,
    metadata?: Record<string, string>,
  ): Promise<string> {
    const subfix = contentType.split('/').pop();
    const fileKey = subfix ? `${v4()}.${subfix}` : v4();
    const params: PutObjectCommandInput = {
      Bucket: this.configService.get('S3_BUCKET'),
      Key: fileKey,
      Body: buffer,
      ContentType: contentType,
      Metadata: metadata,
    };

    const command = new PutObjectCommand(params);

    try {
      await this.s3.send(command);
      return `${this.configService.get('S3_BASE')}/${fileKey}`;
    } catch (error) {
      Logger.error('Error uploading file to S3:', error);
      throw error;
    }
  }
}
