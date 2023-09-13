import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://backend-todolist-u3xb.onrender.com/'
})