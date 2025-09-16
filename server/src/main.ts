import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DEV_CLIENT_URL } from './constants/dev.constants';
import { AggregateErrorFilter } from './filters/aggregate-error.filter';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN
      ? JSON.parse(process.env.CORS_ORIGIN)
      : DEV_CLIENT_URL,
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['Authorization'],
  });

  app.use('/payments/webhook', express.raw({ type: 'application/json' }));

  app.setGlobalPrefix(process.env.API_PREFIX || '');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
    }),
  );

  app.useGlobalFilters(new AggregateErrorFilter());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
