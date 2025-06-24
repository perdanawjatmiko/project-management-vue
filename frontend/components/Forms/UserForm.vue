<template>
  <form @submit.prevent="submit" class="space-y-4">
    <!-- Name -->
    <div class="form-control">
      <label class="label" for="name">Name</label>
      <input
        v-model="form.name"
        id="name"
        type="text"
        placeholder="Full Name"
        class="input input-bordered w-full"
        required
      />
    </div>

    <!-- Email -->
    <div class="form-control">
      <label class="label" for="email">Email</label>
      <input
        v-model="form.email"
        id="email"
        type="email"
        placeholder="Email"
        class="input input-bordered w-full"
        required
      />
    </div>

    <!-- Password -->
    <div class="form-control">
      <label class="label" for="password">Password</label>
      <input
        v-model="form.password"
        id="password"
        type="password"
        placeholder="Password"
        class="input input-bordered w-full"
      />
      <small v-if="isEdit" class="text-xs text-gray-500 mt-1">Kosongkan jika tidak ingin mengubah password</small>
    </div>

    <!-- Role -->
    <div class="form-control">
      <label class="label" for="role">Role</label>
      <select
        v-model="form.role"
        id="role"
        class="select select-bordered w-full"
        required
      >
        <option disabled value="">-- Select Role --</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="staff">Staff</option>
      </select>
    </div>

    <!-- Avatar -->
    <div class="form-control">
      <label class="label" for="avatar">Avatar</label>
      <input
        id="avatar"
        type="file"
        accept="image/*"
        class="file-input file-input-bordered w-full"
        @change="handleFile"
      />
      <div v-if="preview" class="mt-2">
        <img :src="preview" class="w-24 h-24 rounded-full object-cover border" />
      </div>
    </div>

    <!-- Submit -->
    <button type="submit" class="btn btn-primary w-full">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { UserInput } from '~/types/user'

const props = defineProps<{
  form: UserInput,
  submit: () => void,
  preview?: string
}>()

const isEdit = ref(!!props.preview)
const preview = ref(props.preview || '')

const handleFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    props.form.avatar = file
    preview.value = URL.createObjectURL(file)
  }
}

watch(() => props.preview, (newPreview) => {
  preview.value = newPreview || ''
})
</script>
