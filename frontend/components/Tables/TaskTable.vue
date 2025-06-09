<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full px-4">
    <table class="table table-sm md:table-md">
      <thead>
        <tr>
          <th>#</th>
          <th class="w-fit">Subject</th>
          <th v-if="showProject">Project</th>
          <th>Status</th>
          <th class="w-[200px]">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="task.id">
          <th>{{ index + 1 }}</th>
          <td class="text-nowrap">
            <NuxtLink :to="`/tasks/${task.id}`" class="link link-hover text-primary font-semibold">
              {{ task.subject }}
            </NuxtLink>
            <br />
            <!-- <em class="text-xs md:text-sm text-gray-500">{{ task.description }}</em> -->
          </td>
          <td v-if="task.project" class="capitalize text-nowrap">{{ task.project?.name }}</td>
          <td class="capitalize">{{ task.status }}</td>
          <td class="flex justify-start items-center gap-1">
            <NuxtLink :to="`/tasks/${task.id}/edit`" class="btn btn-xs md:btn-sm btn-secondary">Edit</NuxtLink>
            <button @click="destroy(task.id as string, task.subject)" class="btn btn-xs md:btn-sm btn-error">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types/task';
import { useTask } from '~/composables/useTask';

const emit = defineEmits(['deleted'])
const { deleteTask } = useTask()

const props = withDefaults(defineProps<{
  tasks: Task[]
  showProject?: boolean
}>(), {
    showProject: true
})

const destroy = async (id: string, name: string) => {
  await deleteTask(id, name);
  emit('deleted')
}
</script>
