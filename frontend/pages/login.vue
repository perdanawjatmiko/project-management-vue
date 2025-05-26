<template>
  <div class="h-screen flex flex-col justify-center items-center bg-base-200">
    <h1 class="text-3xl font-bold mb-8">PMS <span class="text-emerald-600">Nuxt</span> JS</h1>
    <div class="card w-96 bg-base-100 shadow-md">
      <div class="card-body">
        <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
        <form @submit.prevent="submit" class="space-y-4">
          <input v-model="email" type="email" placeholder="Email" class="input w-full" />
          <input v-model="password" type="password" placeholder="Password" class="input w-full" />

          <button type="submit" class="btn btn-primary w-full" :disabled="loading">
            <span v-if="loading" class="flex justify-center items-center gap-2">
              <span class="loading loading-spinner loading-sm"></span>
              Logging you in...
            </span>
            <span v-else>Login</span>
          </button>

          <p class="text-base text-center">
            Don't have an account yet?
            <NuxtLink to="/register">
              <span class="link link-primary">Register Here</span>
            </NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
const token = useCookie('token');
const { login } = useAuth();
const router = useRouter();

const email = ref('');
const password = ref('');
const loading = ref(false);

if (token.value) {
  router.push('/dashboard');
}

const submit = async () => {
  loading.value = true;
  const success = await login(email.value, password.value);
  loading.value = false;

  if (success) {
    router.push('/dashboard');
  } else {
    alert('Login gagal');
  }
};
</script>
