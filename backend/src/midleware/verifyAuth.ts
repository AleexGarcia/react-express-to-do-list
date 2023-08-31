import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function verifyAuth (request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
  
    if(authToken){
        const [ ,token] = authToken.split(' ');
        try{
            const { sub } = verify(token, '#x82$cs<QK#^<I2`MsE%;:sGD4?I+6bx:U6BFDX?:sJz&rIw47$@%t|Y|Wv3.fE');
         
            return next();
        }catch(err){
            return response.status(401).json({message: 'Unauthorized'})
        }
    }

    return response.status(401).json({message: 'Unauthorized'}) 
}