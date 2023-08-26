import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function verifyAuth (request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if(authToken){
        const [ ,token] = authToken.split(' ');
        try{
            const { sub } = verify(token, 'lenovoLGMatematica');
            return next();
        }catch(err){
            return response.status(401).json({message: 'Unauthorized'})
        }
    }

    return response.status(401).json({message: 'Unauthorized'}) 
}