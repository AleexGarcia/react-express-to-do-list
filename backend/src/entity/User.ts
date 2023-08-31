import { randomUUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Task from "./Task";

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    name: string
    
    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Task, task => task.user)
    tasks!: Task[];

    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = randomUUID();
    }
}