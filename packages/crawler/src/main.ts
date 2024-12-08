import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  Logger.log('Starting crawler service...');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Enable CORS with credentials
  app.enableCors({
    origin: ['https://aitoolpro.work', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  Logger.log('CORS enabled');

  // Increase request timeout to 60 seconds for long-running operations
  app.use((req, res, next) => {
    res.setTimeout(60000, () => {
      Logger.error('Request timeout reached for:', req.url);
      res.status(408).json({
        status: 'error',
        message: 'Request timeout - operation took too long',
        timestamp: new Date().toISOString()
      });
    });
    next();
  });
  Logger.log('Request timeout set to 60 seconds');

  // Basic authentication
  const authUser = process.env.AUTH_USER;
  const authPassword = process.env.AUTH_PASSWORD;

  Logger.log('Configuring basic auth...');
  app.use(
    basicAuth({
      users: { [authUser]: authPassword },
      challenge: true,
      realm: 'Crawler Service',
    }),
  );
  Logger.log('Basic auth configured');

  // Global error handler
  app.use((error, req, res, next) => {
    Logger.error('Global error:', {
      url: req.url,
      method: req.method,
      error: error.message,
      stack: error.stack
    });

    res.status(error.status || 500).json({
      status: 'error',
      message: error.message || 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  });

  // Environment variables logging
  Logger.log('Environment variables loaded:');
  Logger.log('MongoDB URI:', process.env.MONGODB_URI?.substring(0, 20) + '...');
  Logger.log('Redis Host:', process.env.REDIS_HOST);
  Logger.log('Redis Port:', process.env.REDIS_PORT);
  Logger.log('Auth User:', process.env.AUTH_USER);

  const port = process.env.PORT || 13000;
  await app.listen(port);
  Logger.log(`Crawler service running on http://localhost:${port}`);
  Logger.log('Service started successfully with timeout protection');
}

bootstrap().catch(err => {
  Logger.error('Failed to start application:', err);
  process.exit(1);
});
