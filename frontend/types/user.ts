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

export interface UserInput {
    name: string
    email: string
    password: string
    role: string
    avatar: File | null
}