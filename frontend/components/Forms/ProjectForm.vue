<template>
    <form @submit.prevent="submit" class="space-y-4">
        <label for="name" class="block font-medium mb-1">Project Name</label>
        <input v-model="form.name" type="text" name="name" class="input w-full" required />

        <label for="description" class="block font-medium mb-1">Description</label>
        <textarea v-model="form.description" name="description" class="textarea w-full"></textarea>

        <div>
            <label for="difficulty" class="block font-medium mb-1">Difficulty</label>
            <select v-model="form.difficulty" class="select w-full">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>

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
            <button type="submit" class="btn btn-primary">Create</button>
            <NuxtLink to="/projects" class="btn btn-outline">Cancel</NuxtLink>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '~/composables/useUser';
import type { ProjectInput } from '~/types/project';
import type { User } from '~/types/user';

const props = defineProps<{
  form: ProjectInput,
  submit: () => void
}>();

const {getUsers} = useUser()
const users = ref<User[]>([])
const fetchUsers = async () => {
  users.value = await getUsers()
}
onMounted(fetchUsers)


</script>