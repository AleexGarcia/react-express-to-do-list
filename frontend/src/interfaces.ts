export interface ITask {
    id?: number,
    status: boolean,
    title: string
}

export interface JwtPayload {
    email: string
    iat: number
    sub: string
    name: string
}