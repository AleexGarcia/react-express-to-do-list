import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { randomUUID } from 'crypto'
import User from "./User";

@Entity('tasks')
export default class Task {

    @PrimaryGeneratedColumn("uuid")
    private _id: string

    @Column()
    private _title: string

    @Column()
    private _status: boolean

    @ManyToOne(() => User, (user) => user.tasks)
    user: User

    constructor(title: string, user: User) {
        this._title = title;
        this.user = user;
        this._id = randomUUID();
        this._status = false;
    }

    set title(title: string) {
        this._title = title;
    }
    get title(): string {
        return this._title;
    }
    set status(status: boolean) {
        this._status = status;
    }
    get status(): boolean {
        return this._status;
    }
    get id(): string {
        return this._id;
    }


}
