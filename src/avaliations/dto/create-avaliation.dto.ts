import { IsString, IsNumber, IsBoolean } from "class-validator";

export class CreateAvaliationDto {
    @IsString()
    title: string;

    @IsNumber()
    year: number;

    @IsBoolean()
    is_active: boolean;
}
