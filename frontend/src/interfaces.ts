export interface ITask {
    id: string,
    status: boolean,
    title: string
}

export interface JwtPayload {
    email: string
    iat: number
    sub: string
    name: string
}