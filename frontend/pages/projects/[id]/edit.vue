<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Edit Project</h1>
    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="form.name" type="text" placeholder="Project Name" class="input input-bordered w-full" required />
      <textarea v-model="form.description" placeholder="Description" class="textarea textarea-bordered w-full" />
      <select v-model="form.difficulty" class="select select-bordered w-full">
        <option value="" disabled>Select Difficulty</option>
        <option v-for="n in 5" :key="n" :value="n">Level {{ n }}</option>
      </select>
      <div class="flex gap-2">
        <button type="submit" class="btn btn-primary">Update</button>
        <NuxtLink to="/projects" class="btn btn-outline">Cancel</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProject } from '~/composables/useProject';

const { getProject, updateProject } = useProject();
const route = useRoute();
const router = useRouter();

const form = ref({
  name: '',
  description: '',
  difficulty: 1,
});

onMounted(async () => {
  const data = await getProject(route.params.id as string);
  if(!data) {
    console.error("data not found")
    return
  }
  form.value = {
    name: data.name,
    description: data.description,
    difficulty: data.difficulty,
  };
});

const submit = async () => {
  await updateProject(route.params.id as string, form.value);
  router.push('/projects');
};
</script>
