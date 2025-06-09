<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <div class="drawer lg:drawer-open">
      <div class="w-full bg-base-100 fixed top-0 z-10 p-2 lg:hidden">
        <label for="mainSidebar" class="btn btn-ghost drawer-button lg:hidden">
          <Menu />
        </label>
      </div>
      <input id="mainSidebar" type="checkbox" ref="drawerCheckbox" class="drawer-toggle" />
      
      <div class="drawer-content flex flex-col justify-center w-full">
        <main class="flex-1 bg-base-200 min-h-screen pt-16 sm:pt-6">
          <slot />
        </main>
      </div>

      <SidebarDrawer :user="user" :menuItems="menuItems" @closeDrawer="closeDrawer" @logout="logout" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menu, LayoutDashboard, FolderKanban, ListTodo, Users } from 'lucide-vue-next'
import SidebarDrawer from '~/components/Layouts/SidebarDrawer.vue'

const { logout, user, fetchUser } = useAuth()
if (!user.value) await fetchUser()

const drawerCheckbox = ref<HTMLInputElement | null>(null)
const closeDrawer = () => {
  if (drawerCheckbox.value && drawerCheckbox.value.checked) {
    drawerCheckbox.value.checked = false
  }
}

const menuItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', to: '/projects', icon: FolderKanban },
  { label: 'Tasks', to: '/tasks', icon: ListTodo },
  { label: 'Users', to: '/users', icon: Users },
]
</script>
