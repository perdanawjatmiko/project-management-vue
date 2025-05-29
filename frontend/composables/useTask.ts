export const useTask = () => {
    const token = useCookie('token');
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase;

    interface Task {
        id: number | string
        project_id: string
        subject: string
        description: string
        status: string
        priority: 'low' | 'medium' | 'high' | 'urgent'
        start_date: string
        end_date: string
        order: number
        assigned_to: string | null
    }

    const getTasks = async () => {
        try {
            const data = await $fetch('/tasks', {
                baseURL: apiBase,
                headers: { Authorization: `Bearer ${token.value}` },
            });
            if(!data) return [];
            console.log(data)
            return data
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
            const data = await $fetch<Task>(`/tasks/${id}`, {
                baseURL: apiBase,
                headers: { Authorization: `Bearer ${token.value}` },
            })

            if(!data) {
                console.log("Task not Found")
                return null
            }
            return data
        } catch (error) {
            console.error("failed to fetch task", error);
            return null
        }
    }

    const updateTask = async (id : string, data: any) => {
        try {
            const update = await $fetch(`/tasks/${id}`, {
                method: 'PUT',
                baseURL: apiBase,
                body: data,
                headers: { Authorization: `Bearer ${token.value}` },
            })
            console.log(data)
            return update
        } catch (error) {
            console.error("failed to update task", error);
            return []
        }
    }

    return {getTasks, createTask, getTask, updateTask}
}