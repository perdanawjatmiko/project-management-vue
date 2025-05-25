<script setup>
const token = useCookie('token');
const router = useRouter();
const { logout } = useAuth();
const loading = ref(false);
definePageMeta({
  middleware: 'auth'
})

const user = useState('user') // diasumsikan sudah diset saat login
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Welcome, {{ user?.name }}</h1>
    <p>This is your dashboard.</p>
    <button
    @click="logout"
    :disabled="loading"
    class="mt-4 px-4 py-2 rounded cursor-pointer transition duration-200 flex items-center justify-center gap-2"
    :class="loading ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600 text-white'"
  >
    <span v-if="loading" class="loading loading-spinner loading-sm"></span>
    <span>{{ loading ? 'Logging out...' : 'Logout' }}</span>
  </button>
  </div>
</template>
