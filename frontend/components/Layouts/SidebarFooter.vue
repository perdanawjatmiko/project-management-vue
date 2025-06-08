<template>
  <div class="flex-1 bottom-4 p-4">
    <button class="absolute bottom-6 btn btn-error btn-soft btn-wide" @click="$emit('logout')">
      <LogOut class="mr-2" /> Logout
    </button>
  </div>
</template>

<script setup lang="ts">
import { LogOut } from 'lucide-vue-next'
defineEmits(['logout'])
</script>
