<template>
    <div class="navbar bg-base-100 shadow-sm sm:flex">
        <div class="navbar-start">
            
        </div>
        
        <div class="navbar-end pr-4">
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul tabindex="0" class="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a href="">Profile</a></li>
                    <li><a>Settings</a></li>
                    <li><a @click="logout">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useProject } from '~/composables/useProject';
import { useAuth } from '~/composables/useAuth';

const { getProjects } = useProject();
const { logout } = useAuth();
</script>