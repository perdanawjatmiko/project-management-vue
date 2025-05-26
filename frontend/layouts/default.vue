<template>
  <div>
    <SidebarLayout>
      <AppHeader/>
      <div class="p-4">
        <slot/>
      </div>
    </SidebarLayout>
  </div>
</template>

<script setup lang="ts">
import SidebarLayout from '~/components/SidebarLayout.vue'
</script>