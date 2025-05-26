<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">My Projects</h1>
      <NuxtLink to="/projects/create" class="btn btn-primary">+ New Project</NuxtLink>
    </div>

    <div v-if="loading" class="text-center">Loading...</div>

    <div v-else>
      <div v-if="projects.length === 0">No projects found.</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardProject
          v-for="project in projects"
          :key="project.id"
          :project="project"
          @delete="destroy"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardProject from '~/components/CardProject.vue';
import { useProject } from '~/composables/useProject';

const { getProjects, deleteProject } = useProject();
const projects = ref([]);
const loading = ref(true);

const fetchProjects = async () => {
  loading.value = true;
  projects.value = await getProjects();
  loading.value = false;
};

const destroy = async (id: string) => {
  if (confirm('Are you sure you want to delete this project?')) {
    await deleteProject(id);
    fetchProjects();
  }
};

onMounted(fetchProjects);
</script>
