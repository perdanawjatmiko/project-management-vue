import type { Project, ProjectInput, ProjectResponse } from "~/types/project"
export const useProject = () => {
  const token = useCookie('token')
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const getProjects = async (userId: string | null = null): Promise<Project[]> => {
    try {
      const query = userId ? `?user=${userId}` : ``;
      const response = await $fetch<ProjectResponse>(`/projects${query}`, {
        baseURL: apiBase,
        headers: { Authorization: `Bearer ${token.value}` },
      })
      return response.data
    } catch (e) {
      console.error('Failed to fetch projects:', e)
      return []
    }
  }

  const getProjectById = async (id: string): Promise<Project[] | null> => {
    try {
      const response = await $fetch<ProjectResponse>(`/projects/${id}`, {
        baseURL: apiBase,
        headers: { Authorization: `Bearer ${token.value}` },
      })
      return response.data
    } catch (e) {
      console.error('Failed to fetch project', e)
      return null
    }
  }

  const createProject = async (data: Omit<ProjectInput, 'id'>): Promise<Project> => {
    const response = await $fetch<Project>('/projects', {
      method: 'POST',
      baseURL: apiBase,
      body: data,
      headers: { Authorization: `Bearer ${token.value}` },
    })
    console.log(data)
    console.log(response)
    return response
  }

  const updateProject = async (
    id: string,
    data: Partial<Omit<Project, 'id'>>
  ): Promise<Project> => {
    return await $fetch<Project>(`/projects/${id}`, {
      method: 'PUT',
      baseURL: apiBase,
      body: data,
      headers: { Authorization: `Bearer ${token.value}` },
    })
  }

  const deleteProject = async (id: string): Promise<{ message: string }> => {
    return await $fetch<{ message: string }>(`/projects/${id}`, {
      method: 'DELETE',
      baseURL: apiBase,
      headers: { Authorization: `Bearer ${token.value}` },
    })
  }

  return {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
  }
}
