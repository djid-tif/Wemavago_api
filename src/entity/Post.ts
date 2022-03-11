import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsEmail, Length} from "class-validator";
import {User} from "./User";


@Entity()
export class Post {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    creation_date: Date;

    @Column()
    description: string;

    @Column()
    title: string;

    @Column()
    file_name: string;

    @UpdateDateColumn()
    last_update: Date;

    @ManyToOne(() => User, user => user.posts)
    user: User;

}
