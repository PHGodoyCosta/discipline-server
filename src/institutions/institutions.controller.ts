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
} from "@nestjs/common";

import { InstitutionsService } from "./institutions.service";

import { Institution } from "./entities/institution.entity";
import { CreateInstitutionDto } from "./dto/create-institution.dto";
import { UpdateInstitutionDto } from "./dto/update-institution.dto";
import { ResponseInstitutionDTO } from "./dto/response-institution.dto";

@Controller("institutions")
@UseInterceptors(ClassSerializerInterceptor)
export class InstitutionsController {
    constructor(private readonly institutionService: InstitutionsService) {}

    @Get()
    findAll(): Promise<ResponseInstitutionDTO[]> {
        return this.institutionService
            .findAll()
            .then((res) => res.map((item) => new ResponseInstitutionDTO(item)));
    }

    @Get(":hash")
    findOne(@Param("hash") hash: string): Promise<Institution> {
        return this.institutionService.findOne(hash);
    }

    @Post()
    create(@Body() createInstitutionDto: CreateInstitutionDto) {
        return this.institutionService.create(createInstitutionDto);
    }

    @Patch(":hash")
    update(
        @Param("hash") hash: string,
        @Body() updateInstitutionDto: UpdateInstitutionDto,
    ) {
        return this.institutionService.update(hash, updateInstitutionDto);
    }

    @Delete(":hash")
    remove(@Param("hash") hash: string) {
        return this.institutionService.remove(hash);
    }
}
