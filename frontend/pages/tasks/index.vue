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

const fetchTasks = async () => {
  loading.value = true;
  tasks.value = await getTasks();
  loading.value = false;
};

onMounted(fetchTasks);

</script>