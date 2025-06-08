<template>
  <div class="p-2 md:p-4 lg:p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Projects</h1>
      <NuxtLink to="/projects/create" class="btn btn-primary"><Plus/> New Project</NuxtLink>
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
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <CardProject v-for="project in projects" :key="project.id" :project="project" @delete="destroy" />
            </div>
            <!-- Pagination -->
            <div class="flex justify-center mt-4">
              <div class="join">
                <button
                  v-for="page in pagination.last_page"
                  :key="page"
                  @click="fetchProjects(page)"
                  :class="['join-item btn', { 'btn-active': page === currentPage }]"
                >
                  {{ page }}
                </button>
              </div>
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
import { Plus } from 'lucide-vue-next'

const { getProjects, deleteProject } = useProject();
const { user, fetchUser } = useAuth();
const allProjects = ref<Project[]>([]);
const myProjects = ref<Project[]>([]);
const loading = ref(true);
const activeTab = ref<'all' | 'my'>('all');
const currentPage = ref(1);
const pagination = ref({
  total: 0,
  per_page: 10,
  current_page: 1,
  last_page: 1,
});

const fetchProjects = async (page = 1) => {
  loading.value = true;
  if (!user.value) await fetchUser();

  const response = await getProjects(
    activeTab.value === 'my' ? user.value?.id : undefined,
    page
  );

  if (response) {
    if (activeTab.value === 'all') allProjects.value = response.data;
    else myProjects.value = response.data;

    pagination.value = {
      total: response.total,
      per_page: response.per_page,
      current_page: response.current_page,
      last_page: response.last_page,
    };
    currentPage.value = response.current_page;
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

const destroy = async (id: string, name: string) => {
  await deleteProject(id, name);
  fetchProjects();
}

onMounted(fetchProjects);
</script>

