<template>
  <div class="drawer-side">
    <label for="mainSidebar" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="menu bg-base-100 text-base-content min-h-full w-80 p-4 flex-col justify-between">
      <SidebarHeader :user="user" @closeDrawer="$emit('closeDrawer')" />
      <SidebarMenu :menuItems="menuItems" @closeDrawer="$emit('closeDrawer')" />
      <SidebarFooter @logout="$emit('logout')" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  user: any
  menuItems: { label: string; to: string, icon: any }[]
}>()
defineEmits(['closeDrawer', 'logout'])
import SidebarHeader from '~/components/Layouts/SidebarHeader.vue'
import SidebarMenu from '~/components/Layouts/SidebarMenu.vue'
import SidebarFooter from '~/components/Layouts/SidebarFooter.vue'
</script>
