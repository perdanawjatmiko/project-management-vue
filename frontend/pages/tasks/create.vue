<template>
  <div class="p-2 md:p-4 lg:p-6">
    <h1 class="text-2xl font-bold mb-6">Create Task</h1>
    <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Project Select -->
      <div>
        <label for="project_id" class="block font-medium mb-1">Project</label>
        <select v-model="form.project_id" class="select w-full" required>
          <option disabled value="">Choose Project</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.name }}
          </option>
        </select>
      </div>

      <!-- Subject -->
      <div>
        <label for="subject" class="block font-medium mb-1">Subject</label>
        <input v-model="form.subject" type="text" placeholder="Subject" class="input w-full" required />
      </div>

      <!-- Description (full width) -->
      <div class="md:col-span-2">
        <label for="description" class="block font-medium mb-1">Description</label>
        <textarea v-model="form.description" placeholder="Description" class="textarea w-full" rows="4" />
      </div>

      <!-- Status -->
      <div>
        <label for="status" class="block font-medium mb-1">Status</label>
        <select v-model="form.status" class="select w-full" required>
          <option disabled value="">Choose Status</option>
          <option value="backlog">Backlog</option>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>

      <!-- Priority -->
      <div>
        <label for="priority" class="block font-medium mb-1">Priority</label>
        <select v-model="form.priority" class="select w-full">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <!-- Start Date -->
      <div>
        <label for="start_date" class="block font-medium mb-1">Start Date</label>
        <input v-model="form.start_date" type="date" class="input w-full" />
      </div>

      <!-- End Date -->
      <div>
        <label for="end_date" class="block font-medium mb-1">End Date</label>
        <input v-model="form.end_date" type="date" class="input w-full" />
      </div>

      <!-- Percentage -->
      <div>
        <label for="percentage" class="block font-medium mb-1">Percentage</label>
        <input v-model.number="form.order" type="number" class="input w-full" min="0" max="100" />
      </div>

      <!-- Assigned To -->
      <div>
        <label for="assigned_to" class="block font-medium mb-1">Assigned To (User ID)</label>
        <input v-model="form.assigned_to" type="text" class="input w-full" placeholder="User UUID (optional)" />
      </div>

      <!-- Buttons (full width) -->
      <div class="md:col-span-2 flex gap-2 justify-end mt-4">
        <button type="submit" class="btn btn-primary">Create</button>
        <NuxtLink to="/projects" class="btn btn-outline">Cancel</NuxtLink>
      </div>
    </form>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProject } from '~/composables/useProject';
import { useTask } from '~/composables/useTask';
import type { Project } from '~/types/project';

const router = useRouter();
const { getProjects } = useProject();
const { createTask } = useTask();

const projects = ref<Project[]>([]);

const fetchProjects = async () => {
  projects.value = await getProjects();
};

onMounted(fetchProjects);

const form = ref({
  project_id: '',
  subject: '',
  description: '',
  status: '',
  priority: 'low',
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

