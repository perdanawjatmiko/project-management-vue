<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Create Project</h1>
    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="form.name" type="text" placeholder="Project Name" class="input w-full" required />
      <textarea v-model="form.description" placeholder="Description" class="textarea w-full"></textarea>
      <div class="flex gap-2">
        <button type="submit" class="btn btn-primary">Create</button>
        <NuxtLink to="/projects" class="btn btn-outline">Cancel</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProject } from '~/composables/useProject';

const { createProject } = useProject();
const router = useRouter();

const form = ref({
  name: '',
  description: '',
  difficulty: 1,
});

const submit = async () => {
  await createProject(form.value);
  router.push('/projects');
};
</script>
