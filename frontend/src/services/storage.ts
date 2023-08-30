export const saveToken = (token: string): void => {
    localStorage.setItem('session', token);
}
export const getToken = (): string | null => {
    return localStorage.getItem('session');
}
export const updateToken = (token: string): void => {
    localStorage.setItem('session', token);
}
export const deleteToken = (): void => {
    localStorage.removeItem('session');
}