<template>
  <div class="p-2 md:p-4 lg:p-6 max-w-xl">
    <h1 class="text-2xl font-bold mb-4">Edit Project</h1>
    <ProjectForm :form="form" :submit="submit" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProjectForm from '~/components/Forms/ProjectForm.vue';
import { useProject } from '~/composables/useProject';

import type { ProjectInput } from '~/types/project';


const { getProjectById, updateProject } = useProject();
const route = useRoute();
const router = useRouter();

const form = ref<ProjectInput>({
  name: '',
  description: '',
  difficulty: 1,
});

onMounted(async () => {
  const data = await getProjectById(route.params.id as string);
  if(!data) {
    console.error("data not found")
    return
  }
  form.value = {
    name: data.name,
    description: data.description,
    difficulty: data.difficulty,
    start_date: data.start_date,
    end_date: data.end_date,
    owner_id: data.owner_id,
  };
});

const submit = async () => {
  await updateProject(route.params.id as string, form.value);
  router.push('/projects');
};
</script>
