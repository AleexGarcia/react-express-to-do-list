import { api } from "./api"
import jwtDecode from 'jwt-decode'
import { JwtPayload } from "../interfaces"
export const createTask = async (title: string, token: string) => {

    const decodedToken = jwtDecode(token) as JwtPayload | null
    try{
        if (decodedToken) {
            const { sub } = decodedToken;
            const headers = {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
            const response = await api.post('/task', {
                 title: title,
                 userId: sub
             },{headers})
             return response;
        }
        throw new Error('Invalid token');
    }catch(err){
        throw err;
    }
    
}
export const updateTask = (status: boolean) => {

}
export const deleteTask = () => {

}
export const getAllTasks = () => {

}