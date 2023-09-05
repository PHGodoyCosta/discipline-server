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
    private repository: Repository<Avaliation>,
  ) { }

  findAll(params: any): Promise<Avaliation[]> {
    let query = this.repository
      .createQueryBuilder('avaliation')
      .select(["avaliation.title", "avaliation.year", "avaliation.updated_at"])
      .where('avaliation.is_active = :is_active', { is_active: 1 })

    if (params.title) query.andWhere('avaliation.title like :title', {title: `%${params.title}%` })
    if (params.year) query.andWhere('avaliation.year = :year', { year: params.year })

    if (params.start) query.offset(params.start)
    if (params.limit) query.limit(params.limit)

    return query
      .orderBy(params.sort ?? 'title', "ASC")
      .getMany()
  }

  findOne(hash: string): Promise<Avaliation | null> {
    return this.repository.findOneBy({ hash });
  }

  create(createAvaliationDto: CreateAvaliationDto): Promise<Avaliation> {
    return this.repository.save(createAvaliationDto)
  }

  update(hash: string, updateAvaliationDto: UpdateAvaliationDto): Promise<any> {
    return this.repository.update({ hash }, updateAvaliationDto);
  }

  async remove(hash: string): Promise<void> {
    await this.repository.softDelete({ hash });
  }
}
