import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AvaliationsService } from './avaliations.service';

import { CreateAvaliationDto } from './dto/create-avaliation.dto';
import { UpdateAvaliationDto } from './dto/update-avaliation.dto';
import { Avaliation } from './entities/avaliation.entity';

@Controller('avaliations')
export class AvaliationsController {
  constructor(private readonly avaliationsService: AvaliationsService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(): Promise<Avaliation[]> {
    return this.avaliationsService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':hash')
  findOne(@Param('hash') hash: string): Promise<Avaliation> {
    return this.avaliationsService.findOne(hash);
  }

  @Post()
  create(@Body() createAvaliationDto: CreateAvaliationDto) {
    return this.avaliationsService.create(createAvaliationDto);
  }

  @Patch(':hash')
  update(@Param('hash') hash: string, @Body() updateAvaliationDto: UpdateAvaliationDto) {
    return this.avaliationsService.update(hash, updateAvaliationDto);
  }

  @Delete(':hash')
  remove(@Param('hash') hash: string) {
    return this.avaliationsService.remove(hash);
  }
}
