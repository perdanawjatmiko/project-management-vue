<template>
    <label for="project_id" class="block font-medium mb-1">Project</label>
    <select v-model="form.project_id" class="select w-full" required>
        <option disabled value="">Choose Project</option>
        <option v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.name }}
        </option>
    </select>
</template>

<script setup lang="ts">
import { useProject } from '~/composables/useProject';
const { getProjectOptions } = useProject();
const projects = ref([])

onMounted(async () => {
  projects.value = await getProjectOptions()
})
</script>