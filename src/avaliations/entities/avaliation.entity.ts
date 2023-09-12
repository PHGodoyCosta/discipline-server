import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity()
export class Avaliation {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 36,
        generated: "uuid"
    })
    hash: string;

    @Column()
    title: string;

    @Column({
        type: 'year',
        nullable: true
    })
    year: number;

    @Column({
        default: true
    })
    is_active: boolean;

    @CreateDateColumn({
        type: 'datetime',
    })
    created_at: string;

    @UpdateDateColumn({
        type: 'datetime',
    })
    updated_at: string;

    @DeleteDateColumn({
        type: 'datetime',
    })
    deleted_at: string;
}