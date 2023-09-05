import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity()
export class Institution {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 36,
        generated: "uuid"
    })
    hash: string;

    @Column()
    name: string;
}
