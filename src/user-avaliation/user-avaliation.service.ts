import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { UserAvaliation } from "./entities/user-avaliation.entity";

import { CreateUserAvaliationDto } from "./dto/create-user-avaliation.dto";
import { UpdateUserAvaliationDto } from "./dto/update-user-avaliation.dto";

@Injectable()
export class UserAvaliationService {
    constructor(
        @InjectRepository(UserAvaliation)
        private repository: Repository<UserAvaliation>,
    ) {}

    create(createUserAvaliationDto: CreateUserAvaliationDto) {
        return this.repository.save(createUserAvaliationDto);
    }

    findAll() {
        return `This action returns all userAvaliation`;
    }

    findOne(id: number) {
        return `This action returns a #${id} userAvaliation`;
    }

    update(id: number, updateUserAvaliationDto: UpdateUserAvaliationDto) {
        return `This action updates a #${id} userAvaliation`;
    }

    remove(id: number) {
        return `This action removes a #${id} userAvaliation`;
    }
}
