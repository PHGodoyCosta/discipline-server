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

    @Exclude()
    @Column({
        default: true
    })
    is_active: boolean;

    @Exclude()
    @CreateDateColumn({
        type: 'datetime',
    })
    created_at: string;

    @UpdateDateColumn({
        type: 'datetime',
    })
    updated_at: string;

    @Exclude()
    @DeleteDateColumn({
        type: 'datetime',
    })
    deleted_at: string;
}