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

export interface TokenResponse {
    access_token: string
    token_type: string
}