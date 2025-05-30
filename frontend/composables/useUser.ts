import type { User, UserResponse } from "~/types/user";
export const useUser = () => {
    const token = useCookie('token')
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase

    const getUsers = async (): Promise<User[]> => {
        try {
            const response = await $fetch<UserResponse>(`/users`, {
                baseURL: apiBase,
                headers: { Authorization: `Bearer ${token.value}` },
            }) 
            

            return response.data
        } catch (error) {
            console.error('Failed to fetch users:', error)
            return []
        }
    }

    return {getUsers}
}