import { randomUUID } from 'crypto'
import { Task } from './Task'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string
    @Column()
    userName: string
    @Column()
    email: string
    @Column()
    password: string
    @OneToMany(() => Task, (task) => task.user)
    tasks: Array<Task>

    constructor(userName: string, email: string, password: string) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.tasks = [];
        this.id = randomUUID();
    }
}