import { PartialType } from "@nestjs/mapped-types";
import { CreateUserAvaliationDto } from "./create-user-avaliation.dto";

export class UpdateUserAvaliationDto extends PartialType(
    CreateUserAvaliationDto,
) {}
