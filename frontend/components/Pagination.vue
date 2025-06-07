<template>
  <div class="flex justify-center mt-4">
    <div class="join">
      <button
        v-for="page in lastPage"
        :key="page"
        @click="$emit('change-page', page)"
        :class="['join-item btn', { 'btn-active': page === currentPage }]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number
  lastPage: number
}>()

defineEmits<{
  (e: 'change-page', page: number): void
}>()
</script>
