<template>
  <div class="p-2 md:p-4 lg:p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Projects</h1>
      <NuxtLink to="/projects/create" class="btn btn-primary">+ New Project</NuxtLink>
    </div>

    <div v-if="loading" class="text-center">Loading...</div>

    <div v-else>
      <div class="tabs tabs-lift">
        <!-- All Projects -->
        <input
          type="radio"
          name="projects"
          class="tab"
          aria-label="All Projects"
          :checked="activeTab === 'all'"
          @change="selectTab('all')"
        />
        <div class="tab-content bg-base-100 p-4 border-base-300">
          <div v-if="activeTab === 'all'">
            <div v-if="projects.length === 0">No projects found.</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <CardProject v-for="project in projects" :key="project.id" :project="project" @delete="destroy" />
            </div>
          </div>
        </div>

        <!-- My Projects -->
        <input
          type="radio"
          name="projects"
          class="tab"
          aria-label="My Projects"
          :checked="activeTab === 'my'"
          @change="selectTab('my')"
        />
        <div class="tab-content bg-base-100 p-4 border-base-300">
          <div v-if="activeTab === 'my'">
            <div v-if="projects.length === 0">No projects found.</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <CardProject v-for="project in projects" :key="project.id" :project="project" @delete="destroy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardProject from '~/components/CardProject.vue';
import { useProject } from '~/composables/useProject';
import { useAuth } from '~/composables/useAuth';
import type { Project } from '~/types/project';

const { getProjects, deleteProject } = useProject();
const { user, fetchUser } = useAuth();
const allProjects = ref<Project[]>([]);
const myProjects = ref<Project[]>([]);
const loading = ref(true);
const activeTab = ref<'all' | 'my'>('all');

const fetchProjects = async () => {
  loading.value = true;
  if (!user.value) await fetchUser();

  if (activeTab.value === 'all') {
    if (allProjects.value.length === 0) {
      allProjects.value = await getProjects();
    }
  } else {
    if (myProjects.value.length === 0) {
      myProjects.value = await getProjects(user.value?.id);
    }
  }

  loading.value = false;
};

const selectTab = async (tab: 'all' | 'my') => {
  activeTab.value = tab;
  await fetchProjects();
};

const projects = computed(() => {
  return activeTab.value === 'all' ? allProjects.value : myProjects.value;
});

const destroy = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      fetchProjects();
  };
}

onMounted(fetchProjects);
</script>

