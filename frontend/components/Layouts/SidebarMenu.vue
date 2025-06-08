<template>
  <ul class="flex flex-col justify-start">
    <li
      v-for="item in menuItems"
      :key="item.label"
      class="text-base my-1"
    >
      <NuxtLink :to="item.to" class="font-medium" @click="$emit('closeDrawer')">
        <component :is="item.icon" class="w-5 h-5" />
        {{ item.label }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ menuItems: { label: string; to: string, icon: any }[] }>()
defineEmits(['closeDrawer'])
</script>
