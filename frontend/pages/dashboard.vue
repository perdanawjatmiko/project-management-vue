<!-- pages/dashboard.vue -->
<template>
  <div class="p-2 md:p-4 lg:p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Dashboard Page</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="stats shadow bg-base-100">
        <div class="stat gap-2">
          <div class="stat-title">Project you have</div>
          <div class="stat-value">{{ totalProject }} Projects</div>
          <div class="stat-desc">
            <NuxtLink to="/projects" class="btn btn-primary btn-sm">go to projects</NuxtLink>
          </div>
        </div>
      </div>
      <div class="stats shadow bg-base-100">
        <div class="stat gap-2">
          <div class="stat-title">Task you Have</div>
          <div class="stat-value">{{ totalTask }} Tasks</div>
          <div class="stat-desc">
            <NuxtLink to="/tasks" class="btn btn-primary btn-sm">go to tasks</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProject } from '~/composables/useProject'
import { useTask } from '~/composables/useTask'

const { getProjectCount } = useProject()
const { getTaskCount } = useTask()

const totalProject = ref(0)
const totalTask = ref(0)

onMounted(async () => {
  totalProject.value = await getProjectCount()
  totalTask.value = await getTaskCount()
})
</script>
