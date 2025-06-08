<template>
  <div class="card bg-base-100 shadow-md hover:shadow-lg transition-all">
    <div class="card-body">
      <h2 class="card-title text-lg font-semibold">{{ project.name }}</h2>
      <p class="text-sm text-gray-500 line-clamp-2">{{ project.description || 'No description provided.' }}</p>

      <div class="mt-4 flex flex-col gap-2 text-sm text-gray-600">
       <span><strong>Difficulty:</strong> {{ project.difficulty }}</span>
        <span><strong>Owner:</strong> {{ project.owner?.name || 'You' }}</span>
      </div>

      <div class="card-actions justify-end mt-4">
        <NuxtLink :to="`/projects/${project.id}`" class="btn btn-sm btn-primary">Detail</NuxtLink>
        <NuxtLink :to="`/projects/${project.id}/edit`" class="btn btn-sm btn-outline">Edit</NuxtLink>
        <button @click="$emit('delete', project.id, project.name)" class="btn btn-sm btn-error text-white">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/project';

defineProps<{
  project: Project
}>();

defineEmits(['delete']);
</script>
