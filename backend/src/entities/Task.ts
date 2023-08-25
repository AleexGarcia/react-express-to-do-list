import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { randomUUID } from 'crypto'
import { User } from "./User";
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: string
    @Column()
    title: string
    @Column()
    status: boolean
    @ManyToOne(() => User, (user) => user.tasks)
    user: User
    
    constructor(title: string, user: User){
        this.id = randomUUID();
        this.title = title;
        this.user = user;
        this.status = false;
    }


}


// + Atributos: id, title, description, status (boolean), userId
// + Relações: Uma Task pertence a um User
// + Métodos: Nenhum método especial