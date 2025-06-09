import type { ProjectCount } from "~/types/dashboard"
import type { Project, ProjectInput, ProjectOption, ProjectResponse } from "~/types/project"
import { showSuccess, showErrorNotif, confirmDelete } from "~/utils/swal"
export const useProject = () => {
  const token = useCookie('token')
  const { $api } = useNuxtApp()
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const getProjects = async (userId: string | null = null, page: number | null = 1): Promise<ProjectResponse | null> => {
    try {
      const queryParams = new URLSearchParams();
      if (userId) queryParams.append('user', userId);
      if (page) queryParams.append('page', page.toString());

      const response = await $api<ProjectResponse>(`/projects?${queryParams.toString()}`, {
        method: "GET",
        baseURL: apiBase,
        headers: { Authorization: `Bearer ${token.value}` },
      })
      return response
    } catch (e) {
      console.error('Failed to fetch projects:', e)
      return null
    }
  }

  const getProjectOptions = async (): Promise<ProjectOption[]> => {
    try {
      const response = await $fetch<{ data: ProjectOption[] }>(
        '/select/projects',
        {
          baseURL: apiBase,
          headers: { Authorization: `Bearer ${token.value}` },
        }
      )
      return response.data
    } catch (e) {
      console.error('Failed to fetch project options:', e)
      return []
    }
  }

  const getProjectById = async (id: string): Promise<Project | null> => {
    try {
      const response = await $fetch<{data: Project}>(`/projects/${id}`, {
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
    showSuccess('Project Created Successfully')
    return response
  }

  const updateProject = async (id: string, data: Partial<Omit<Project, "id">>): Promise<Project | undefined> => {
    try {
      const response = await $fetch<Project>(`/projects/${id}`, {
        method: "PUT",
        baseURL: apiBase,
        body: data,
        headers: { Authorization: `Bearer ${token.value}` },
      });

      showSuccess('Project updated successfully');
      return response;
    } catch (error: any) {
      showErrorNotif(error?.data?.message || 'Failed to update project');
      return undefined;
    }
  };

  const deleteProject = async (id: string, name: string): Promise<boolean> => {
    const confirmed = await confirmDelete(name)
    if (!confirmed) return false

    try {
      await $fetch(`/projects/${id}`, {
        method: 'DELETE',
        baseURL: apiBase,
        headers: { Authorization: `Bearer ${token.value}` },
      })

      showSuccess('Project deleted successfully')
      return true
    } catch (error: any) {
      showErrorNotif(error?.data?.message || 'Failed to delete project')
      return false
    }
  }

  const getProjectCount = async () => {
    try {
      const response = await $api<ProjectCount>(`/dashboard/projects`, {
        method: "GET",
        baseURL: apiBase,
        headers: { Authorization: `Bearer ${token.value}` },
      })

      return response.total ?? 0
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      return 0
    }
  }

  const getProjectTasks = async (id: string, page: number | 1) => {
    try {
      const queryParams = new URLSearchParams();
      if (page) queryParams.append('page', page.toString());

      const response = await $api<ProjectResponse>(`/projects/${id}/tasks?${queryParams.toString()}`, {
        method: "GET",
        baseURL: apiBase,
        headers: { Authorization: `Bearer ${token.value}` },
      })
      console.log(response)
      return response
    } catch (e) {
      console.error('Failed to fetch projects:', e)
      return null
    }
  }

  return {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    getProjectOptions,
    getProjectCount,
    getProjectTasks,
  }
}
