import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsNumber, IsBoolean } from "class-validator";

class AvaliationFilters {
    @IsString()
    title: string;

    @IsNumber()
    year: number;

    @IsBoolean()
    is_active: boolean;

    // Pagination
    @IsNumber()
    start: number;

    @IsNumber()
    limit: number;

    // Order
    @IsString()
    sort: string;
}

export class FilterAvaliationDto extends PartialType(AvaliationFilters) {}
