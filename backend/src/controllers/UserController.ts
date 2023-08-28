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
    
    getUserById = async (request: Request, response: Response): Promise<Response>  => {
        const id = request.body.id;
        const user = await this.userService.getUserById(id);
        if(!user) return response.status(400).json({message: 'invalid id'})
        return response.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            task: user.tasks
        });
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