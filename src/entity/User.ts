import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {IsEmail, Length} from "class-validator";
import {Post} from "./Post";


@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    creation_date: Date;

    @Column()
    @Length(2, 30)
    firstName: string;

    @Column()
    @Length(2, 30)
    lastName: string;

    @Column()
    @Length(2, 30)
    userName: string;

    @Column()
    @Unique(["email"])
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}
