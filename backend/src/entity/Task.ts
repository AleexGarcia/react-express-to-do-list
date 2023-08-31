import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { randomUUID } from 'crypto'
import User from "./User";

@Entity('tasks')
export default class Task {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column()
    status: boolean

    @ManyToOne(() => User, (user) => user.tasks)
    user: User

    constructor(title: string, user: User) {
        this.title = title;
        this.user = user;
        this.id = randomUUID();
        this.status = false;
    }

}
