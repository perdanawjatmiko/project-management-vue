<script setup lang="ts">
import UserForm from '~/components/Forms/UserForm.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUser } from '~/composables/useUser';
import type { UserInput } from '~/types/user';
const { fetchUser } = useAuth()

const {getUserById, updateUser} = useUser()
const route = useRoute();
const router = useRouter();

const form = ref<UserInput>({
  name: '',
  email: '',
  role: '',
  password: '',
  avatar: null,
});

const preview = ref<string>('');

onMounted(async () => {
  const response = await getUserById(route.params.id as string);
  if(!response) {
    console.error("data not found")
    return
  }
  console.log(response.data.avatar)
  form.value = {
    name: response.data.name,
    email: response.data.email,
    role: response.data.role,
    password: '',
    avatar: response.data.avatar,
  };

  preview.value = response.data.avatar 
    ? `http://localhost:8000/storage/${response.data.avatar}` 
    : '';
});

const submit = async () => {
  const data = new FormData();
  data.append('_method', 'PUT')
  data.append('name', form.value.name);
  data.append('email', form.value.email);
  data.append('role', form.value.role);

  if (form.value.password?.length) {
    data.append('password', form.value.password);
  }

  if (form.value.avatar instanceof File) {
    data.append('avatar', form.value.avatar);
  }

  await updateUser(route.params.id as string, data);
  await fetchUser()
  router.push('/users');
};

</script>

<template>
    <div class="p-2 md:p-4 lg:p-6 max-w-xl">
        <h1 class="text-2xl font-bold mb-4">Edit User {{ form.name }}</h1>
        <UserForm :form="form" :preview="preview" :submit="submit" />
    </div>
</template>