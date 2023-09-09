import { NestFactory } from '@nestjs/core';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as express from 'express';
import * as path from "path";

import { AppModule } from './app.module';

async function bootstrap() {
  var corsConfig: CorsOptions = {
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: [
      'Accept',
      'Content-Type',
      'Authorization',
    ]
  }

  const app = await NestFactory.create(AppModule, {
    cors: corsConfig,
  });

  // Public Uploads Folder Access
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000, () => {
    const apiUrl = process.env.API_URL || `http://localhost:${process.env.PORT || '3000'}`
    console.log('|---------------------------------------------------------|')
    console.log('|------------------- Discipline Server -------------------|')
    console.log('|---------------------------------------------------------|')
    console.log(`Server listening -> ${apiUrl}`);
    // console.log(`Swagger Documentation -> ${apiUrl}/docs`);
  });
}
bootstrap();