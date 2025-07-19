import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserAvaliationService } from "./user-avaliation.service";
import { UserAvaliationController } from "./user-avaliation.controller";
import { UserAvaliation } from "./entities/user-avaliation.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserAvaliation])],
    controllers: [UserAvaliationController],
    providers: [UserAvaliationService],
})
export class UserAvaliationModule {}
