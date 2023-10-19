import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpStatus,
  HttpException
} from '@nestjs/common';

import { AvaliationsService } from './avaliations.service';

import { DisciplineFileData } from '../discipline-file.interface';
import { CreateAvaliationDto } from './dto/create-avaliation.dto';
import { UpdateAvaliationDto } from './dto/update-avaliation.dto';
import { FilterAvaliationDto } from './dto/filter-avaliation.dto';
import { ResponseAvaliationDTO } from './dto/response-avaliation.dto';

@Controller('avaliations')
@UseInterceptors(ClassSerializerInterceptor)
export class AvaliationsController {
  constructor(private readonly avaliationsService: AvaliationsService) { }

  @Get()
  findAll(@Query() query: FilterAvaliationDto): Promise<{ data: ResponseAvaliationDTO[], total: number }> {
    return this.avaliationsService.findAll(query)
      .then(res => {
        return {
          data: res.data.map(item => new ResponseAvaliationDTO(item)),
          total: res.total
        }
      });
  }

  @Get(':hash')
  findOne(@Param('hash') hash: string): Promise<ResponseAvaliationDTO> {
    return this.avaliationsService.findOne(hash)
      .then(res => new ResponseAvaliationDTO(res));
  }

  @Get(':hash/export')
  export(@Param('hash') hash: string): Promise<DisciplineFileData> {
    return this.avaliationsService.getDisciplineFile(hash)
      .catch(err => {
        console.log(err)
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
      });
  }


  // @Post()
  // create(@Body() createAvaliationDto: CreateAvaliationDto) {
  //   return this.avaliationsService.create(createAvaliationDto);
  // }

  // @Patch(':hash')
  // update(@Param('hash') hash: string, @Body() updateAvaliationDto: UpdateAvaliationDto) {
  //   return this.avaliationsService.update(hash, updateAvaliationDto);
  // }

  // @Delete(':hash')
  // remove(@Param('hash') hash: string) {
  //   return this.avaliationsService.remove(hash);
  // }
}
