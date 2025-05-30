export interface User {
    id: string,
    name: string
}

export interface UserResponse {
    message: string,
    status: number,
    total: number,
    data: User[]
}