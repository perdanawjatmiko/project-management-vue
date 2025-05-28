<template>
    <div class="p-6 max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold">{{ project?.name }}</h1>
            <div class="flex justify-end items-center gap-2">
                <NuxtLink :to="`/projects`" class="btn btn-primary">Back to Projects</NuxtLink>
                <NuxtLink :to="`/projects/${project?.id}/edit`" class="btn btn-secondary">Edit</NuxtLink>
            </div>

        </div>

        <div v-if="loading" class="text-center">Loading project...</div>

        <div v-else-if="project" class="space-y-4">
            <div class="bg-base-100 p-4 rounded shadow">
                <h2 class="text-xl font-semibold mb-2">Description</h2>
                <p>{{ project.description || 'No description provided.' }}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-base-100 p-4 rounded shadow">
                    <h3 class="font-semibold mb-1">Difficulty</h3>
                    <p>{{ project.difficulty }}</p>
                </div>
                <div class="bg-base-100 p-4 rounded shadow">
                    <h3 class="font-semibold mb-1">Owner</h3>
                    <p>{{ project.owner?.name || 'You' }}</p>
                </div>
                <div class="bg-base-100 p-4 rounded shadow">
                    <h3 class="font-semibold mb-1">Status</h3>
                    <p>{{ project.status?.name || '-' }}</p>
                </div>
                <div class="bg-base-100 p-4 rounded shadow">
                    <h3 class="font-semibold mb-1">Timeline</h3>
                    <p>
                        {{ formatDate(project.start_date) }} - {{ formatDate(project.end_date) }}
                    </p>
                </div>
                <div class="bg-base-100 p-4 rounded shadow">
                    <h3 class="font-semibold mb-1">Created At</h3>
                    <p>
                        {{ formatDate(project.created_at) }}
                    </p>
                </div>
                <div class="bg-base-100 p-4 rounded shadow">
                    <h3 class="font-semibold mb-1">Last Updated At</h3>
                    <p>
                        {{ formatDate(project.updated_at) }}
                    </p>
                </div>
                <div class="bg-base-100 p-4 rounded shadow col-span-2">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="font-semibold">Tasks</h3>
                        <NuxtLink :to="`/projects/${project.id}/tasks/create`" class="btn btn-sm btn-primary">+ Add Task
                        </NuxtLink>
                    </div>
                    <ul v-if="project.tasks && project.tasks.length > 0" class="space-y-2">
                        <li v-for="task in project.tasks" :key="task.id"
                            class="p-3 shadow-sm rounded hover:bg-base-200 transition">
                            <div class="flex justify-between">
                                <div class="flex justify-start items-center gap-2">
                                    <p class="font-medium">{{ task.subject }}</p>
                                    <span class="badge badge-sm badge-success text-white capitalize">
                                        {{ task.status || '-' }}
                                    </span>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <NuxtLink :to="`/tasks/${task.id}/edit`" class="btn btn-sm btn-outline">Edit
                                    </NuxtLink>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p v-else class="text-gray-500 italic">No tasks found for this project.</p>
                </div>
            </div>
        </div>

        <div v-else class="text-red-500">Project not found.</div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProject } from '~/composables/useProject'

const route = useRoute()
const id = route.params.id as string

const { getProjectById } = useProject()
const project = ref<any>(null)
const loading = ref(true)

const fetchProject = async () => {
    loading.value = true
    project.value = await getProjectById(id)
    loading.value = false
}

const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}

onMounted(fetchProject)
</script>
