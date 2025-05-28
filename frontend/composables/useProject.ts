export const useProject = () => {
  const token = useCookie('token');
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase;

  const getProjects = async () => {
    try {
      const data = await $fetch('/projects', {
        baseURL: apiBase,
        headers: { Authorization: `Bearer ${token.value}` },
      });
      return data
    } catch (e) {
      console.error('Failed to fetch projects:', e);
      return [];
    }
  };

  const getProjectById = async (id: string) => {
    try {
      const res = await $fetch(`/projects/${id}`, {
        baseURL: apiBase,
        headers: { Authorization: `Bearer ${token.value}` },
      })
      return res
    } catch (e) {
      console.error('Failed to fetch project', e)
      return null
    }
  }

  const getProject = async (id: string) => {
    return await $fetch(`/projects/${id}`, {
      baseURL: apiBase,
      headers: { Authorization: `Bearer ${token.value}` },
    });
  };

  const createProject = async (data: any) => {
    return await $fetch('/projects', {
      method: 'POST',
      baseURL: apiBase,
      body: data,
      headers: { Authorization: `Bearer ${token.value}` },
    });
  };

  const updateProject = async (id: string, data: any) => {
    return await $fetch(`/projects/${id}`, {
      method: 'PUT',
      baseURL: apiBase,
      body: data,
      headers: { Authorization: `Bearer ${token.value}` },
    });
  };

  const deleteProject = async (id: string) => {
    return await $fetch(`/projects/${id}`, {
      method: 'DELETE',
      baseURL: apiBase,
      headers: { Authorization: `Bearer ${token.value}` },
    });
  };

  return { getProjects, getProject, createProject, updateProject, deleteProject, getProjectById };
};
