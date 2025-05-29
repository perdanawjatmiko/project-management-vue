import type { Project } from "~/types/project"
export const useProject = () => {
  const token = useCookie('token')
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const getProjects = async (): Promise<Project[]> => {
    try {
      const data = await $fetch<Project[]>('/projects', {
        baseURL: apiBase,
        headers: { Authorization: `Bearer ${token.value}` },
      })
      return data
    } catch (e) {
      console.error('Failed to fetch projects:', e)
      return []
    }
  }

  const getProjectById = async (id: string): Promise<Project | null> => {
    try {
      const res = await $fetch<Project>(`/projects/${id}`, {
        baseURL: apiBase,
        headers: { Authorization: `Bearer ${token.value}` },
      })
      return res
    } catch (e) {
      console.error('Failed to fetch project', e)
      return null
    }
  }

  // alias untuk getProjectById (jika tetap ingin dipertahankan)
  const getProject = getProjectById

  const createProject = async (data: Omit<Project, 'id'>): Promise<Project> => {
    return await $fetch<Project>('/projects', {
      method: 'POST',
      baseURL: apiBase,
      body: data,
      headers: { Authorization: `Bearer ${token.value}` },
    })
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
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
  }
}
