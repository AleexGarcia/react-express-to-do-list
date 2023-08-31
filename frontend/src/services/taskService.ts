import { api } from "./api"
import jwtDecode from 'jwt-decode'
import { JwtPayload } from "../interfaces"
export const createTask = async (title: string, token: string) => {

    try {
        const userId = getUserIdFromToken(token);
        if (userId) {
            const headers = {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
            const response = await api.post('/task', {
                title: title,
                userId: userId
            }, { headers })
            return response;
        }
        throw new Error('Invalid token');
    } catch (err) {
        throw err;
    }

}
export const updateTask = (status: boolean) => {
    // const headers = {
    //     'Content-Type': 'application/json',
    //     authorization: `Bearer ${token}`
    // }
}
export const deleteTask = () => {
    // const headers = {
    //     'Content-Type': 'application/json',
    //     authorization: `Bearer ${token}`
    // }
}
export const getAllTasks = async (token: string) => {
    const headers = {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
    }
    const userId = getUserIdFromToken(token);
    const response = await api.post('/alltask', {
        userId: userId
    }, { headers })
    return response;
}

const getUserIdFromToken = (token: string): string | null => {
    const decodedToken = jwtDecode(token) as JwtPayload | null
    return decodedToken ? decodedToken.sub : decodedToken;

}