import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDateString, IsNumber, IsObject, IsString } from 'class-validator';

import { Avaliation } from '../entities/avaliation.entity';

export class ResponseAvaliationDTO {
    @Exclude()
    @IsNumber()
    id: number;

    @IsString()
    hash: string;

    @IsString()
    title: string;

    @IsNumber()
    year: number;

    @Exclude()
    @IsObject()
    institution: {hash: string, name: string}

    @Expose()
    get icon(): string {
        return `/uploads/institutions/${this.institution.hash}.png`;
    }

    @Exclude()
    @IsBoolean()
    is_active: boolean;

    @Exclude()
    @IsDateString()
    created_at: string;

    @IsDateString()
    updatedAt: string;

    @Exclude()
    @IsDateString()
    deleted_at: string;

    constructor(partial: Partial<Avaliation>) {
        Object.assign(this, partial);
    }
}