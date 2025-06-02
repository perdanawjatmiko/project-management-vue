import type { Task, TaskResponse } from "~/types/task";
export const useTask = () => {
    const token = useCookie('token');
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase;

    const getTasks = async (): Promise<Task[]> => {
        try {
            const response = await $fetch<TaskResponse>('/tasks', {
                baseURL: apiBase,
                headers: { Authorization: `Bearer ${token.value}` },
            });
            if(!response) return [];
            console.log(response.data)
            return response.data
        } catch (error) {
            console.error("failed to fetch tasks", error);
            return []
        }
    }

    const createTask = async (data: any) => {
        try {
            const create = await $fetch('/tasks', {
                method: 'POST',
                baseURL: apiBase,
                headers: { Authorization: `Bearer ${token.value}` },
                body: data
            });
            return create
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
            return response
        } catch (error) {
            console.error("failed to update task", error);
            return []
        }
    }

    return {getTasks, createTask, getTask, updateTask}
}