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

      <label for="start_date" class="block font-medium mb-1">Start Date</label>
      <input v-model="form.start_date" type="date" class="input w-full" />

      <label for="end_date" class="block font-medium mb-1">End Date</label>
      <input v-model="form.end_date" type="date" class="input w-full" />

      <div>
        <label for="owner" class="block font-medium mb-1">Owner</label>
        <select v-model="form.owner_id" class="select w-full">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>

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
import { useUser } from '~/composables/useUser';
import type { ProjectInput } from '~/types/project';
import type { User } from '~/types/user';

const { getProjectById, updateProject } = useProject();
const route = useRoute();
const router = useRouter();

const {getUsers} = useUser()

const users = ref<User[]>([])

const fetchUsers = async () => {
  users.value = await getUsers()
}

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

onMounted(fetchUsers)

const submit = async () => {
  await updateProject(route.params.id as string, form.value);
  router.push('/projects');
};
</script>
