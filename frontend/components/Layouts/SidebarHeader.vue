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
      <div class="collapse w-full bg-base-100 border border-base-200 ">
        <input type="checkbox" class="peer" />
        <div class="collapse-title font-semibold p-2 flex items-center justify-center text-emerald-600">
          {{ user?.name }}
          <span class="ml-2 transition-transform duration-300 peer-checked:rotate-180">
            <ChevronDown />
          </span>
        </div>
        <div class="collapse-content text-sm md:text-base px-2 ">
          <ul class="menu md:menu-md font-semibold bg-transparent rounded-box w-full gap-2 px-0">
            <li><NuxtLink to="/profile" class=""><UserPen/> Update Profile</NuxtLink></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, ChevronDown, UserPen } from 'lucide-vue-next'
defineProps<{ user: any }>()
defineEmits(['closeDrawer'])
</script>
