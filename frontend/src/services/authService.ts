import { AxiosResponse } from "axios";
import { api } from "./api"

export const login = async (email: string, password: string): Promise<AxiosResponse> => {
    try {
        const response = await api.post('auth/login', {
            email: email,
            password: password
        })
        return response;
    } catch (error) {
        throw error;
    }
}

export const signup = async (name: string, email: string, password: string) => {
    try {
        const response = await api.post('auth/signup', {
            name: name,
            email: email,
            password: password
        })
        return response;
    } catch (err) {
        throw err;
    }
}


