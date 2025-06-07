<template>
  <div class="p-2 md:p-4 lg:p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">My Tasks</h1>
      <NuxtLink to="/tasks/create" class="btn btn-primary">+ New Task</NuxtLink>
    </div>

    <div v-if="loading" class="text-center">Loading...</div>

    <div v-else>
      <div v-if="tasks.length === 0">No Tasks found.</div>
      <TaskTable v-else :tasks="tasks" />
      <!-- Pagination -->
            <div class="flex justify-center mt-4">
              <div class="join">
                <button
                  v-for="page in pagination.last_page"
                  :key="page"
                  @click="fetchTasks(page)"
                  :class="['join-item btn', { 'btn-active': page === currentPage }]"
                >
                  {{ page }}
                </button>
              </div>
            </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskTable from '~/components/Tables/TaskTable.vue'
import { useTask } from '~/composables/useTask';
import type { Task } from '~/types/task';

const { getTasks } = useTask();
const tasks = ref<Task[]>([]);
const loading = ref(true);
const currentPage = ref(1);
const pagination = ref({
  total: 0,
  per_page: 10,
  current_page: 1,
  last_page: 1,
});

const fetchTasks = async (page = 1) => {
  loading.value = true;
  const response = await getTasks(page);
  if(response) {

    tasks.value = response.data
    loading.value = false;
    pagination.value = {
        total: response.total,
        per_page: response.per_page,
        current_page: response.current_page,
        last_page: response.last_page,
      };
    currentPage.value = response.current_page;
  }
};

onMounted(fetchTasks);

</script>