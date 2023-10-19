import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Institution } from 'src/institutions/entities/institution.entity';

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
        type: "text",
        nullable: true
    })
    description: string;

    @Column({
        type: 'year',
        nullable: true
    })
    year: number;

    @Column({
        type: 'int',
        nullable: true
    })
    questions_quantity: number;

    @Column({
        default: true
    })
    is_active: boolean;

    @ManyToOne(() => Institution, (institution) => institution.avaliations)
    institution: Institution

    @CreateDateColumn({
        type: 'datetime'
    })
    created_at: string;

    @UpdateDateColumn({
        type: 'datetime'
    })
    updated_at: string;

    @DeleteDateColumn({
        type: 'datetime'
    })
    deleted_at: string;
}