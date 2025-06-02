<template>
  <div class="p-2 md:p-4 lg:p-6">
    <h1 class="text-2xl font-bold mb-6">Create Task</h1>
    <TaskForm :form="form" :submit="submit"/>
  </div>
</template>



<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTask } from '~/composables/useTask';
import TaskForm from '~/components/Forms/TaskForm.vue'

const router = useRouter();
const { createTask } = useTask();


const form = ref({
  project_id: '',
  subject: '',
  description: '',
  status: '',
  priority: 'low',
  percentage: 0,
  start_date: '',
  end_date: '',
  order: 0,
  assigned_to: ''
});

const submit = async () => {
  try {
    await createTask(form.value);
    router.push('/tasks');
  } catch (error) {
    console.error('Failed to create task:', error);
    alert('Failed to create task. Please check the form or console.');
  }
};
</script>

