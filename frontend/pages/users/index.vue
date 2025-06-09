<template>
    <div class="p-2 md:p-4 lg:p-6 h-screen">
        <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Users</h1>
        <NuxtLink to="/users/create" class="btn btn-primary btn-sm md:btn-md"><UserPlus/> New User</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UserPlus } from "lucide-vue-next"
</script>