import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { Exclude } from "class-transformer";

@Entity()
export class UserAvaliation {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @Column()
    user_email: string;

    @Column()
    avaliation_hash: string;

    @Column({
        type: "datetime",
    })
    avaliation_date: string;

    @Column({
        type: "int",
    })
    number_of_questions: number;

    @Column({
        type: "int",
        default: 0,
    })
    correct_answers: number;

    @Column({
        type: "int",
        default: 0,
    })
    not_answered_questions: number;
}
