<!-- components/SidebarLayout.vue -->
<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <div class="drawer lg:drawer-open">
      <label for="mainSidebar" class="btn btn-ghost drawer-button lg:hidden fixed top-2 left-2">
          <Menu />
      </label>
      <input id="mainSidebar" type="checkbox" ref="drawerCheckbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col justify-center w-full">
        <!-- Main Content -->
        <main class="flex-1 bg-base-200 min-h-screen pt-10 sm:pt-6">
          <slot />
        </main>
      </div>
      <div class="drawer-side">
        <label for="mainSidebar" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="menu bg-base-100 text-base-content min-h-full w-80 p-4 flex-col justify-between">
          <div class="flex justify-between items-center px-2">
            <h1 class="text-2xl font-bold">PMS <span class="text-emerald-600">Nuxt</span> JS</h1>
            <button @click="closeDrawer" class="btn sm:hidden">
              <X/>
            </button>
          </div>
          <div class="divider my-2"></div>
          <div class="flex flex-col justify-center items-center bg-gray-300/10 rounded-md p-4 mb-2">
            <div class="avatar mb-4">
              <div class="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
              </div>
            </div>
            <p class="text-center text-base mb-4">Welcome, <span class="text-emerald-600 font-semibold link link-hover">{{ user?.name }}</span></p>
          </div>
          <ul class="flex flex-col justify-start">
            <li v-for="item in menuItems" :key="item.label" class="text-base my-1">
            <NuxtLink :to="item.to" class="font-medium" aria-label="close sidebar"  @click="closeDrawer">
              {{ item.label }}
            </NuxtLink>
            </li>
          </ul>
          <div class="flex-1 bottom-4 p-4">
            <button class="absolute bottom-6 btn btn-error btn-soft btn-wide text-md" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, Menu } from 'lucide-vue-next';
const { logout, user, fetchUser } = useAuth();
if (!user.value) await fetchUser();
const drawerCheckbox = ref<HTMLInputElement | null>(null);

const closeDrawer = () => {
  if (drawerCheckbox.value && drawerCheckbox.value.checked) {
    drawerCheckbox.value.checked = false;
  }
};

const menuItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Projects', to: '/projects' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Users', to: '/users' },
];
</script>
