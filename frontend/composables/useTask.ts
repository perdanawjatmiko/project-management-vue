export const useTask = () => {
    const token = useCookie('token');
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase;

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

    return {getTasks, createTask}
}