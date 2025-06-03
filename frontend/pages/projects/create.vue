<template>
  <div class="p-2 md:p-4 lg:p-6 max-w-xl">
    <h1 class="text-2xl font-bold mb-4">Create Project</h1>
    <ProjectForm :form="form" :submit="submit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ProjectForm from '~/components/Forms/ProjectForm.vue';
import { useProject } from '~/composables/useProject';
import type { ProjectInput } from '~/types/project';

const { createProject } = useProject();
const router = useRouter();


const form = ref<ProjectInput>({
  name: '',
  description: '',
  difficulty: 1,
  start_date: '',
  end_date: '',
  owner_id: ''
});

const submit = async () => {
  await createProject(form.value);
  router.push('/projects');
};
</script>
