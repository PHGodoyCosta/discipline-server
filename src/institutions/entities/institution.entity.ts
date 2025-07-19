import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Exclude } from "class-transformer";
import { Avaliation } from "src/avaliations/entities/avaliation.entity";

@Entity()
export class Institution {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 36,
        generated: "uuid",
    })
    hash: string;

    @Column()
    name: string;

    @OneToMany(() => Avaliation, (avaliation) => avaliation.institution)
    avaliations: Avaliation[];
}
