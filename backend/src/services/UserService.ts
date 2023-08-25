import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../data-source";
export class UserService {
    private userRepository: UserRepository

    constructor(userRepository = new UserRepository(AppDataSource.manager)){
        this.userRepository = userRepository;
    }

    async createUser(userName: string, email: string, password: string): Promise<User>{
        const user = new User(userName,email,password);
        return this.userRepository.createUser(user);
    }
}