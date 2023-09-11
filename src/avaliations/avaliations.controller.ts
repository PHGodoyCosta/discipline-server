import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AvaliationsService } from './avaliations.service';

import { Avaliation } from './entities/avaliation.entity';
import { CreateAvaliationDto } from './dto/create-avaliation.dto';
import { UpdateAvaliationDto } from './dto/update-avaliation.dto';
import { FilterAvaliationDto } from './dto/filter-avaliation.dto';

@Controller('avaliations')
export class AvaliationsController {
  constructor(private readonly avaliationsService: AvaliationsService) { }

  @Get()
  findAll(@Query() query: FilterAvaliationDto): Promise<Avaliation[]> {
    return this.avaliationsService.findAll(query);
  }

  @Get(':hash')
  findOne(@Param('hash') hash: string): Promise<Avaliation> {
    return this.avaliationsService.findOne(hash);
  }

  @Get(':hash/export')
  export(@Param('hash') hash: string): DisciplineFileData {
    return this.avaliationsService.getDisciplineFile(hash);
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
