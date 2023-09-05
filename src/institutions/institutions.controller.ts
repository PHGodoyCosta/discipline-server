import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { InstitutionsService } from './institutions.service';

import { Institution } from './entities/institution.entity';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionService: InstitutionsService) { }

  @Get()
  findAll(): Promise<Institution[]> {
    return this.institutionService.findAll();
  }

  @Get(':hash')
  findOne(@Param('hash') hash: string): Promise<Institution> {
    return this.institutionService.findOne(hash);
  }

  @Post()
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionService.create(createInstitutionDto);
  }

  @Patch(':hash')
  update(@Param('hash') hash: string, @Body() updateInstitutionDto: UpdateInstitutionDto) {
    return this.institutionService.update(hash, updateInstitutionDto);
  }

  @Delete(':hash')
  remove(@Param('hash') hash: string) {
    return this.institutionService.remove(hash);
  }
}