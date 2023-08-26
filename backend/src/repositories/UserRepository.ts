import { EntityManager } from "typeorm";
import  User  from "../entity/User";

export class UserRepository {
     manager: EntityManager

    constructor(manager: EntityManager){
        this.manager = manager;
    }

    async createUser(user: User): Promise<User>{
        const resposta = await this.manager.save(user);
        return resposta;
    }

    async getUserById(id: string): Promise<User | null>{
        const resposta = await this.manager.findOne(User, {
            where: {
                id: id,
            }
        })
        return resposta;
    }
    
    async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
        return await this.manager.findOne(User, {
            where: {
                email: email,
                password: password
            }
        })
    }

}