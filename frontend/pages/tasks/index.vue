<template>
    <div class="p-2 md:p-4 lg:p-6">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">My Tasks</h1>
            <NuxtLink to="/tasks/create" class="btn btn-primary">+ New Task</NuxtLink>
        </div>

        <div v-if="loading" class="text-center">Loading...</div>

        <div v-else>
            <div v-if="tasks.length === 0">No Tasks found.</div>
            <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full px-4">
                <table class="table table-sm md:table-md">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>#</th>
                            <th class="w-fit">Subject</th>
                            <th>Project</th>
                            <th>Status</th>
                            <th class="w-[200px]">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="(task, index) in tasks" :key="index">
                            <th>{{ index + 1 }}</th>
                            <td class="text-nowrap">
                                <NuxtLink :to="`/tasks/${task.id}`" class="link link-hover text-primary font-semibold">{{ task.subject }}</NuxtLink>
                                <br>
                                <em class="text-xs md:text-sm text-gray-500">{{ task.description }}</em>
                            </td>
                            <td class="capitalize text-nowrap">{{ task.project?.name }}</td>
                            <td class="capitalize">{{ task.status }}</td>
                            <td class="flex justify-start items-center gap-1">
                                <NuxtLink :to="`/tasks/${task.id}/edit`" class="btn btn-xs md:btn-sm btn-secondary">Edit</NuxtLink>
                                <NuxtLink :to="`/tasks/${task.id}`" class="btn btn-xs md:btn-sm btn-error">Delete</NuxtLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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