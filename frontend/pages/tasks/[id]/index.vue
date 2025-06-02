<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Task Detail</h1>

    <div v-if="task" class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-100 p-6 rounded shadow">
      <div>
        <p class="text-gray-500">Subject</p>
        <p class="font-medium text-lg">{{ task.subject }}</p>
      </div>

      <div>
        <p class="text-gray-500">Project</p>
        <p>{{ task.project?.name || '-' }}</p>
      </div>

      <div class="md:col-span-2">
        <p class="text-gray-500">Description</p>
        <p>{{ task.description || '-' }}</p>
      </div>

      <div>
        <p class="text-gray-500">Status</p>
        <p>{{ capitalize(task.status) }}</p>
      </div>

      <div>
        <p class="text-gray-500">Priority</p>
        <p class="capitalize">{{ task.priority }}</p>
      </div>

      <div>
        <p class="text-gray-500">Start Date</p>
        <p>{{ formatDate(task.start_date) }}</p>
      </div>

      <div>
        <p class="text-gray-500">End Date</p>
        <p>{{ formatDate(task.end_date) }}</p>
      </div>

      <div>
        <p class="text-gray-500">Progress</p>
        <p>{{ task.percentage }}%</p>
      </div>

      <div>
        <p class="text-gray-500">Assigned To</p>
        <p>{{ task.assigned?.name || '-' }}</p>
      </div>
    </div>

    <div v-else class="text-center py-10 text-gray-500">
      Loading...
    </div>

    <div class="mt-6">
      <NuxtLink to="/tasks" class="btn btn-outline">Back</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useTask } from '~/composables/useTask'

const route = useRoute()
const id = route.params.id as string
const { getTask } = useTask()
const task = ref<any>(null)

const fetchTask = async () => {
   task.value = await getTask(id)
}

const formatDate = (date: string | null) => {
  return date ? new Date(date).toLocaleDateString() : '-'
}

const capitalize = (str: string) => str?.charAt(0).toUpperCase() + str?.slice(1)

onMounted(fetchTask)
</script>
