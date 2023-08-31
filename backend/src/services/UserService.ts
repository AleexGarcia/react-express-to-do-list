import User from "../entity/User";
import { AppDataSource } from "../data-source";
import { UserRepository } from "../repositories/UserRepository";
import { sign } from "jsonwebtoken";

export class UserService {

    userRepository: UserRepository;
    constructor(userRepository = new UserRepository(AppDataSource.manager)) {
        this.userRepository = userRepository;
    }

    createUser = async (name: string, email: string, password: string): Promise<User> => {
        const user = new User(name, email, password);
        user.tasks = [];
        return this.userRepository.createUser(user);
    }

    getUserById = async (id: string): Promise<User | null> => {

        return this.userRepository.getUserById(id);
    }

    getAuthenticatedUser = (email: string, password: string): Promise<User | null> => {
        
        return this.userRepository.getUserByEmailAndPassword(email, password);
    }
    
    getToken = async (email: string, password: string): Promise<string> => {
        const user = await this.getAuthenticatedUser(email, password);
        
        if(!user) throw new Error('Email/password invalid');
        
        const tokenData = {
            name: user?.name,
            email: user?.email
        }
        const tokenKey = 'lenovoLGMatematica'
        const tokenOptions = {
            subject: user?.id
        }

        const token = sign(tokenData, tokenKey, tokenOptions);
        return token;
    }

}