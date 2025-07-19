import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Institution } from "./entities/institution.entity";

import { CreateInstitutionDto } from "./dto/create-institution.dto";
import { UpdateInstitutionDto } from "./dto/update-institution.dto";

@Injectable()
export class InstitutionsService {
    constructor(
        @InjectRepository(Institution)
        private repository: Repository<Institution>,
    ) {}

    findAll(): Promise<Institution[]> {
        return this.repository.find();
    }

    findOne(hash: string): Promise<Institution | null> {
        return this.repository.findOneBy({ hash });
    }

    create(createInstitutionDto: CreateInstitutionDto): Promise<Institution> {
        return this.repository.save(createInstitutionDto);
    }

    update(
        hash: string,
        updateInstitutionDto: UpdateInstitutionDto,
    ): Promise<any> {
        return this.repository.update({ hash }, updateInstitutionDto);
    }

    async remove(hash: string): Promise<void> {
        await this.repository.softDelete({ hash });
    }
}
