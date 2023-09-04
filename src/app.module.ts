import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvaliationsModule } from './avaliations/avaliations.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'XXXXXX',
      password: 'XXXXXX',
      database: 'discipline_db',
      entities: ["dist/**/*.entity.js"],

      synchronize: true,
    }),

    AvaliationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
