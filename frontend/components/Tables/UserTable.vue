<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full px-4">
    <table class="table table-sm md:table-md">
      <thead>
        <tr>
          <th>#</th>
          <th class="w-fit">Name</th>
          <th>Email</th>
          <th>Role</th>
          <th class="w-[200px]">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <th>{{ index + 1 }}</th>
          <td class="text-nowrap">
            <NuxtLink :to="`/users/${user.id}`" class="link link-hover text-primary font-semibold">
              {{ user.name }}
            </NuxtLink>
          </td>
          <td v-if="user.email" class="text-nowrap">{{ user.email }}</td>
          <td class="capitalize">{{ user.role }}</td>
          <td class="flex justify-start items-center gap-1">
            <NuxtLink :to="`/users/${user.id}/edit`" class="btn btn-xs md:btn-sm btn-secondary">Edit</NuxtLink>
            <!-- <button @click="destroy(user.id, user.name)" class="btn btn-xs md:btn-sm btn-error">Delete</button> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'
import { useUser } from '~/composables/useUser'
// const { deleteUser } = useUser()

const props = defineProps<{
  users: User[]
}>()

const emit = defineEmits<{
  (e: 'deleted'): void
}>()

const destroy = async (id: string, name: string) => {
//   const confirmed = confirm(`Are you sure you want to delete ${name}?`)
//   if (!confirmed) return

//   try {
//     await deleteUser(id)
//     emit('deleted')
//   } catch (error) {
//     console.error('Delete user failed:', error)
//   }
}
</script>
