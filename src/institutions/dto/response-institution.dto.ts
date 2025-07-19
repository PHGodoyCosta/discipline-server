import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

import { Institution } from "../entities/institution.entity";

export class ResponseInstitutionDTO {
    @Exclude()
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    hash: string;

    @Expose()
    @IsString()
    get icon(): string {
        return `${process.env.API_URL}/uploads/institutions/${this.hash}.png`;
    }

    constructor(partial: Partial<Institution>) {
        Object.assign(this, partial);
    }
}
