import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfigModule, ConfigService } from "@nestjs/config";
import databaseConfig from "./config/database.config";

import { AvaliationsModule } from "./avaliations/avaliations.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { InstitutionsModule } from "./institutions/institutions.module";
import { UserAvaliationModule } from "./user-avaliation/user-avaliation.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfig],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                host: configService.get("database.host"),
                port: configService.get("database.port"),
                username: configService.get("database.username"),
                password: configService.get("database.password"),
                database: "discipline_db",
                entities: ["dist/**/*.entity.js"],
                synchronize: configService.get("database.synchronize"),
                timezone: configService.get("timezone"),
                dateStrings: configService.get("dateStrings"),
            }),
        }),

        AvaliationsModule,
        InstitutionsModule,
        UserAvaliationModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
