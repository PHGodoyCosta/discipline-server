import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Avaliation } from './entities/avaliation.entity';
import { AvaliationsService } from './avaliations.service';
import { AvaliationsController } from './avaliations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Avaliation])],
  controllers: [AvaliationsController],
  providers: [AvaliationsService],
})
export class AvaliationsModule { }
