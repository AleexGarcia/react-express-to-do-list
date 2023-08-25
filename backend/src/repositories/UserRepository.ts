import { EntityManager } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
    private manager: EntityManager

    constructor(manager: EntityManager){
        this.manager = manager;
    }

    async createUser(user: User){
        return this.manager.save(user);
    }
}