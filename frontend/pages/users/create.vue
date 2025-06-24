<template>
  <div class="max-w-xl mx-auto p-4 space-y-4">
    <h1 class="text-2xl font-bold mb-4">Create New User</h1>
    <UserForm :form="form" :submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import UserForm from '~/components/Forms/UserForm.vue';
import { useRouter } from 'vue-router'
import { useUser } from '~/composables/useUser'

const router = useRouter()
const { createUser } = useUser()

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: '',
  avatar: null,
})

const handleSubmit = async () => {
  const payload = {
    name: form.name,
    email: form.email,
    password: form.password,
    role: form.role,
  }

  const result = await createUser(payload as any)
  if (result) {
    router.push('/users') // redirect ke halaman daftar user
  }
}
</script>
