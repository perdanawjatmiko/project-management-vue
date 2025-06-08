<template>
  <div>
    <div class="flex justify-between items-center px-2">
      <h1 class="text-2xl font-bold">PMS <span class="text-emerald-600">Nuxt</span> JS</h1>
      <button @click="$emit('closeDrawer')" class="btn sm:hidden">
        <X />
      </button>
    </div>
    <div class="divider my-2"></div>
    <div class="flex flex-col justify-center items-center bg-gray-300/10 rounded-md p-4 mb-2">
      <div class="avatar mb-4">
        <div class="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
        </div>
      </div>
      <p class="text-center text-base mb-4">
        Welcome, <span class="text-emerald-600 font-semibold link link-hover">{{ user?.name }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
defineProps<{ user: any }>()
defineEmits(['closeDrawer'])
</script>
