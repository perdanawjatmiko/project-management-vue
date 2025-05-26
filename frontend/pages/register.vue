<template>
  <div class="h-screen flex flex-col justify-center items-center bg-base-200">
    <h1 class="text-3xl font-bold mb-8">PMS <span class="text-emerald-600">Nuxt</span> JS</h1>
    <div class="card w-96 bg-base-100 shadow-md">
      <div class="card-body">
        <h2 class="text-2xl font-bold text-center mb-4">Register</h2>
        <form @submit.prevent="submit" class="space-y-4">
          <input v-model="name" type="name" placeholder="Name" class="input w-full" />
          <input v-model="email" type="email" placeholder="Email" class="input w-full" />
          <input v-model="password" type="password" placeholder="Password" class="input w-full" />
          <button type="submit" class="btn btn-primary w-full">Register</button>
          <p class="text-base text-center">Already have an account? <NuxtLink to="/login"><span class="link link-primary">Login Here</span></NuxtLink></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
const { register } = useAuth();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');

const submit = async () => {
  const success = await register({ name: name.value, email: email.value, password: password.value });
  if (success) router.push('/dashboard');
  else alert('Register gagal');
};
</script>