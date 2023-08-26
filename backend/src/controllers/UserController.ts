import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {

    userService: UserService = new UserService()

    createUser = (request: Request, response: Response): Response => {
        const user = request.body;

        if (!user.name || !user.email || !user.password)
            return response.status(400).json({ message: 'Bad request! Name, email e password obrigatórios!' })

        this.userService.createUser(user.name, user.email, user.password);

        return response.status(201).json({ message: 'Usuário criado' });
    }
    
    getUserById = (request: Request, response: Response): Response => {
        const id = request.body.id;
        const user = this.userService.getUserById(id);
        return response.status(201).json(JSON.stringify(user));
    }

    generateAuthToken = (request: Request, response: Response): Response => {
        const {email, password} = request.body;
        if(!email || !password)
            return response.status(500).json({ message: 'Email/password invalid' })
        
        try{
            const token = this.userService.getToken(email, password);
            return response.status(200).json({token});
        }catch(err){
            return response.status(500).json({ message: 'Email/password invalid' })
        }
    }

    

    
}