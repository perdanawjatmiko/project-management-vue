<!-- components/TaskForm.vue -->
<template>
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

    <!-- Description -->
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

    <!-- Start & End Date -->
    <div>
      <label for="start_date" class="block font-medium mb-1">Start Date</label>
      <input v-model="form.start_date" type="date" class="input w-full" />
    </div>
    <div>
      <label for="end_date" class="block font-medium mb-1">End Date</label>
      <input v-model="form.end_date" type="date" class="input w-full" />
    </div>

    <!-- Percentage -->
    <div>
      <label for="percentage" class="block font-medium mb-1">Percentage</label>
      <select v-model.number="form.percentage" id="percentage" class="select w-full">
        <option v-for="n in 11" :key="n" :value="(n - 1) * 10">
          {{ (n - 1) * 10 }}%
        </option>
      </select>
    </div>

    <!-- Assigned To -->
    <div>
      <label for="assigned_to" class="block font-medium mb-1">Assigned To (User ID)</label>
      <select v-model="form.assigned_to" class="select w-full">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>

    <!-- Buttons -->
    <div class="md:col-span-2 flex gap-2 justify-end mt-4">
      <button type="submit" class="btn btn-primary">Create</button>
      <button type="button" class="btn btn-outline" @click="handleCancel">Cancel</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProject } from '~/composables/useProject';
import type { ProjectOption } from '~/types/project';
import type { TaskInput } from '~/types/task';
import { useUser } from '~/composables/useUser';
import type { User } from '~/types/user';

const props = withDefaults(defineProps<{
  form: TaskInput,
  submit: () => void,
  isModal?: boolean
}>(), {
  isModal: false
});

const {getUsers} = useUser()
const users = ref<User[]>([])
const { getProjectOptions } = useProject();
const projects = ref<ProjectOption[]>([]);

const handleCancel = () => {
  if (props.isModal) {
    const modal = document.getElementById('add_task') as HTMLDialogElement;
    modal?.close();
  } else {
    navigateTo('/tasks');
  }
};

onMounted(async () => {
  projects.value = await getProjectOptions();
  users.value = await getUsers();
});
</script>
