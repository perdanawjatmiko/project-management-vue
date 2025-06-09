import type { TaskCount } from "~/types/dashboard";
import type { Task, TaskResponse } from "~/types/task";
import { showSuccess, showErrorNotif, confirmDelete } from "~/utils/swal"
export const useTask = () => {
    const token = useCookie('token');
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase;
    const { $api } = useNuxtApp()

    const getTasks = async (page: number | null = 1): Promise<TaskResponse | null> => {
        try {
            const queryParams = new URLSearchParams();
            if (page) queryParams.append('page', page.toString());
            const response = await $api<TaskResponse>(`/tasks?${queryParams.toString()}`, {
                baseURL: apiBase,
                headers: { Authorization: `Bearer ${token.value}` },
            });
            return response
        } catch (error) {
            console.error("failed to fetch tasks", error);
            return null
        }
    }

    const createTask = async (data: any) => {
        try {
            const response = await $fetch<TaskResponse>('/tasks', {
                method: 'POST',
                baseURL: apiBase,
                headers: { Authorization: `Bearer ${token.value}` },
                body: data
            });
            showSuccess('Task Created Successufully!')
            return response.data
        } catch (error) {
            console.error("failed to add tasks", error);
            return []
        }
    }

    const getTask = async (id: string): Promise<Task | null> => {
        try {
            const response = await $fetch<{data: Task}>(`/tasks/${id}`, {
                baseURL: apiBase,
                headers: { Authorization: `Bearer ${token.value}` },
            })

            if(!response) {
                console.log("Task not Found")
                return null
            }
            return response.data
        } catch (error) {
            console.error("failed to fetch task", error);
            return null
        }
    }

    const updateTask = async (id : string, data: Partial<Omit<Task, 'id'>>) => {
        try {
            const response = await $fetch<Task>(`/tasks/${id}`, {
                method: 'PUT',
                baseURL: apiBase,
                body: data,
                headers: { Authorization: `Bearer ${token.value}` },
            })
            showSuccess('Task Updated Successufully!')
            return response
        } catch (error) {
            console.error("failed to update task", error);
            return []
        }
    }

    const getTaskCount = async () => {
        try {
          const response = await $api<TaskCount>(`/dashboard/tasks`, {
            method: "GET",
            baseURL: apiBase,
            headers: { Authorization: `Bearer ${token.value}` },
          })
    
          return response.total ?? 0
        } catch (error) {
          console.error('Failed to fetch tasks:', error)
          return 0
        }
    }

    const deleteTask = async (id: string, name: string): Promise<boolean> => {
        const confirmed = await confirmDelete(name)
        if (!confirmed) return false

        try {
        await $fetch(`/tasks/${id}`, {
            method: 'DELETE',
            baseURL: apiBase,
            headers: { Authorization: `Bearer ${token.value}` },
        })

        showSuccess('Task deleted successfully')
        return true
        } catch (error: any) {
        showErrorNotif(error?.data?.message || 'Failed to delete project')
        return false
        }
    }

    return {getTasks, createTask, getTask, updateTask, getTaskCount, deleteTask}
}