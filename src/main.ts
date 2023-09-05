import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  var corsConfig = {
    origin: ['*'],
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