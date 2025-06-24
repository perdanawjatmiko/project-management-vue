import type { User, UserInput, UserResponse } from "~/types/user";
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

    const createUser = async (data: Omit<UserInput, 'id'>) => {
        try {
            const response = await $fetch('/users', {
                  method: 'POST',
                  baseURL: apiBase,
                  body: data,
                  headers: { Authorization: `Bearer ${token.value}` },
                })
            showSuccess('User Created Successfully')
            return response
        } catch (error: any) {
            showErrorNotif(error?.data?.message || 'Failed to add user');
            return [];
        }
    }

    const updateUser = async (id: string, data: Partial<UserInput>) => {
        try {
            const response = await $fetch(`/users/${id}`, {
                method: 'POST',
                baseURL: apiBase,
                body: data,
                headers: { Authorization: `Bearer ${token.value}` },
            })
            showSuccess(`User Updated Successfully`)
            return response
        } catch (error: any) {
            showErrorNotif(error?.data?.message || 'Failed to update user')
            return null
        }
    }

    const getUserById = async (id: string) => {
        try {
            const response = $fetch(`/users/${id}`, {
                method: "GET",
                baseURL: apiBase,
                headers: { Authorization: `Bearer ${token.value}` },
            })
            return response
        } catch (error: any) {
            showErrorNotif(error?.data?.message || 'Failed to update user')
            return null
        }
    }

    const deleteUser = async (id: string) => {
        try {
        await $fetch(`/users/${id}`, {
            method: 'DELETE',
            baseURL: apiBase,
            headers: { Authorization: `Bearer ${token.value}` },
        })
        showSuccess('User Deleted')
        } catch (error: any) {
        showErrorNotif(error?.data?.message || 'Failed to delete user')
        }
    }

    return {getUsers, createUser, updateUser, getUserById}
}