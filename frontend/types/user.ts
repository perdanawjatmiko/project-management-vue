export interface User {
    id: string
    email: string
    name: string
    role: string
}

export interface UserResponse {
    message: string,
    status: number,
    total: number,
    data: User[]
}

export interface TokenResponse {
    access_token: string
    token_type: string
}