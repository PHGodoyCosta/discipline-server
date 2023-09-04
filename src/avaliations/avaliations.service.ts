import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Avaliation } from './entities/avaliation.entity';

import { CreateAvaliationDto } from './dto/create-avaliation.dto';
import { UpdateAvaliationDto } from './dto/update-avaliation.dto';

@Injectable()
export class AvaliationsService {
  constructor(
    @InjectRepository(Avaliation)
    private avaliationsRepository: Repository<Avaliation>,
  ) { }

  findAll(): Promise<Avaliation[]> {
    return this.avaliationsRepository.find();
  }

  findOne(hash: string): Promise<Avaliation | null> {
    return this.avaliationsRepository.findOneBy({ hash });
  }

  create(createAvaliationDto: CreateAvaliationDto): Promise<Avaliation> {
    return this.avaliationsRepository.save(createAvaliationDto)
  }

  update(hash: string, updateAvaliationDto: UpdateAvaliationDto): Promise<any> {
    return this.avaliationsRepository.update({ hash }, updateAvaliationDto);
  }

  async remove(hash: string): Promise<void> {
    await this.avaliationsRepository.softDelete({ hash });
  }
}
