import { Request, Response} from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(userService = new UserService()){
        this.userService = userService;
    } 
    
    createUser(request:Request, response: Response): Response {
        const user = request.body;

        this.userService.createUser(user.userName, user.email, user.password);
        return response.status(201).json({message: 'Usuário criado'});
    }

}