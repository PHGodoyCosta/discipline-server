import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { UserAvaliationService } from "./user-avaliation.service";
import { CreateUserAvaliationDto } from "./dto/create-user-avaliation.dto";
import { UpdateUserAvaliationDto } from "./dto/update-user-avaliation.dto";

@Controller("user-avaliation")
export class UserAvaliationController {
    constructor(
        private readonly userAvaliationService: UserAvaliationService,
    ) {}

    @Post()
    create(@Body() createUserAvaliationDto: CreateUserAvaliationDto) {
        return this.userAvaliationService.create(createUserAvaliationDto);
    }

    // @Get()
    // findAll() {
    //   return this.userAvaliationService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.userAvaliationService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserAvaliationDto: UpdateUserAvaliationDto) {
    //   return this.userAvaliationService.update(+id, updateUserAvaliationDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.userAvaliationService.remove(+id);
    // }
}
