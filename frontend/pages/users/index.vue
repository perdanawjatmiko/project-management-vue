<template>
    <div class="p-2 md:p-4 lg:p-6 h-screen">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">Users</h1>
            <NuxtLink to="/users/create" class="btn btn-primary btn-sm md:btn-md"><UserPlus/> New User</NuxtLink>
        </div>
        <div v-if="loading" class="text-center">
            <span class="loading loading-dots loading-xl"></span>
        </div>

        <div v-else>
        <div v-if="users.length === 0">No Users found.</div>
        <UserTable v-else :users="users" />
        <!-- Pagination -->
        <!-- <Pagination :currentPage="currentPage" :lastPage="pagination.last_page" @change-page="fetchTasks" /> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { UserPlus } from "lucide-vue-next"
import UserTable from "~/components/Tables/UserTable.vue";
import { useUser } from '~/composables/useUser';
import type { User } from '~/types/user';

const { getUsers } = useUser()
const users = ref<User[]>([]);
const loading = ref(true);

const fetchUsers = async (page = 1) => {
  loading.value = true;
  const response = await getUsers();
  if (response) {
    users.value = response
    loading.value = false
    
  }
};

onMounted(fetchUsers);
</script>