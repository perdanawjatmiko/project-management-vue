<template>
  <div>
    <SidebarLayout>
      <div class="p-4">
        <slot/>
      </div>
    </SidebarLayout>
  </div>
</template>

<script setup lang="ts">
import SidebarLayout from '~/components/Layouts/SidebarLayout.vue';
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.path)

const getTitleFromRoute = () => {
  const path = route.path
  if (path === '/projects') return 'All Projects'
  if (path.startsWith('/projects/')) return 'Project Details'
  if (path === '/tasks') return 'All Tasks'
  if (path.startsWith('/tasks/')) return 'Task Details'
  return 'Project Management System'
}

useHead({
  title: getTitleFromRoute(),
  meta: [
    {
      name: 'description',
      content: 'Manage your tasks and projects efficiently using our system.'
    }
  ]
})
</script>