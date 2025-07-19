import {
    IsString,
    IsNumber,
    IsUUID,
    IsDateString,
    IsPositive,
} from "class-validator";

export class CreateUserAvaliationDto {
    @IsString()
    user_name: string;

    @IsString()
    user_email: string;

    @IsUUID()
    avaliation_hash: string;

    @IsDateString()
    avaliation_date: string;

    @IsPositive()
    number_of_questions: number;

    @IsNumber()
    correct_answers: number;

    @IsNumber()
    not_answered_questions: number;
}
