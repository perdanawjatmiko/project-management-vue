<!-- components/SidebarLayout.vue -->
<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Sidebar -->
    <aside class="bg-base-100 w-full lg:w-64 p-4 hidden lg:block border-r-1 border-gray-200">
      <h2 class="text-2xl font-bold text-center">PMS Nuxt</h2>
      <div class="divider my-2"></div>
      <ul class="menu menu-lg space-y-1 w-full">
        <li v-for="item in menuItems" :key="item.label" class="">
          <NuxtLink :to="item.to" class="font-medium">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </aside>

    <!-- Mobile Navbar -->
    <div class="navbar bg-base-100 shadow-sm lg:hidden">
      <div class="flex-1">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 mt-3 w-52 shadow rounded-box z-10">
            <li v-for="item in menuItems" :key="item.label">
              <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <a class="btn btn-ghost text-xl">PMS Nuxt</a>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul class="menu menu-lg dropdown-content bg-base-100 mt-3 w-52 shadow rounded-box z-10">
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><a @click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 bg-base-200">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAuth();

const menuItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Projects', to: '/projects' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Users', to: '/users' },
];
</script>
