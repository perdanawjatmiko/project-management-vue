<template>
    <div class="p-2 md:p-4 w-full text-sm md:text-base">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold">{{ project?.name }}</h1>
            <div class="flex justify-end items-center gap-2">
                <NuxtLink :to="`/projects`" class="btn btn-primary btn-sm md:btn-md">Back to Projects</NuxtLink>
                <NuxtLink :to="`/projects/${project?.id}/edit`" class="btn btn-secondary btn-sm md:btn-md">Edit</NuxtLink>
            </div>
        </div>

        <div v-if="loading" class="text-center">Loading project...</div>

        <div v-else-if="project" class="space-y-4">
            <div class="bg-base-100 p-4 rounded shadow">
                <h2 class="text-xl font-semibold mb-2">Description</h2>
                <p>{{ project.description || 'No description provided.' }}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-base-100 p-4 rounded shadow">
                    <h3 class="font-semibold mb-1">Difficulty</h3>
                    <p>{{ project.difficulty }}</p>
                </div>
                <div class="bg-base-100 p-4 rounded shadow">
                    <h3 class="font-semibold mb-1">Owner</h3>
                    <p>{{ project.owner?.name || 'You' }}</p>
                </div>
                <div class="bg-base-100 p-4 rounded shadow">
                    <h3 class="font-semibold mb-1">Status</h3>
                    <p>{{ project.status?.name || '-' }}</p>
                </div>
                <div class="bg-base-100 p-4 rounded shadow">
                    <h3 class="font-semibold mb-1">Timeline</h3>
                    <p>
                        {{ formatDate(project.start_date) }} - {{ formatDate(project.end_date) }}
                    </p>
                </div>
                <div class="bg-base-100 p-4 rounded shadow">
                    <h3 class="font-semibold mb-1">Created At</h3>
                    <p>
                        {{ formatDate(project.created_at) }}
                    </p>
                </div>
                <div class="bg-base-100 p-4 rounded shadow">
                    <h3 class="font-semibold mb-1">Last Updated At</h3>
                    <p>
                        {{ formatDate(project.updated_at) }}
                    </p>
                </div>
                <div class="bg-base-100 p-4 rounded shadow md:col-span-2">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="font-semibold">Tasks on this project</h3>
                        <button class="btn btn-sm btn-primary" onclick="add_task.showModal()">add task</button>
                        <dialog id="add_task" class="modal modal-bottom sm:modal-middle">
                        <div class="modal-box">
                            <h3 class="text-lg font-bold">Add Task</h3>
                            <p class="py-4">Press ESC key or click the button below to close</p>
                            <TaskForm :form="form" :submit="submit" :isModal="true"/>
                        </div>
                        </dialog>
                    </div>

                    <TaskTable v-if="tasks.length > 0" :tasks="tasks" :showProject="false" />
                        <p v-else class="text-gray-500 italic">No tasks found for this project.</p>
                        <Pagination :currentPage="pagination.current_page" :lastPage="pagination.last_page" @change-page="fetchTasks"/>
                </div>
            </div>
        </div>

        <div v-else class="text-red-500">Project not found.</div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import TaskForm from '~/components/Forms/TaskForm.vue'
import TaskTable from '~/components/Tables/TaskTable.vue';
import { useProject } from '~/composables/useProject'
import { useTask } from '~/composables/useTask';
import type { Task, TaskInput } from '~/types/task';

const router = useRouter();
const { createTask } = useTask();

const route = useRoute()
const id = route.params.id as string

const { getProjectById, getProjectTasks } = useProject()
const project = ref<any>(null)
const loading = ref(true)

const form = ref<TaskInput>({
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

const fetchProject = async () => {
    loading.value = true
    project.value = await getProjectById(id)
    form.value.project_id = project.value.id;
    loading.value = false
}

const tasks = ref<Task[]>([]);
const pagination = ref({
  total: 0,
  per_page: 10,
  current_page: 1,
  last_page: 1
});

const fetchTasks = async (page = 1) => {
  try {
    const res = await getProjectTasks(id, page);
    if(res) {
        tasks.value = res.data;
        pagination.value = {
          total: res.total,
          per_page: res.per_page,
          current_page: res.current_page,
          last_page: res.last_page
        };
    }
  } catch (err) {
    console.error('Error fetching tasks:', err);
  }
};

const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}


const submit = async () => {
  try {
    const newTask = await createTask(form.value);
    project.value.tasks.push(newTask); // update list secara langsung

    // reset form kalau perlu
    Object.assign(form.value, {
    project_id: project.value.id,
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

    // tutup modal secara manual
    const modal = document.getElementById('add_task') as HTMLDialogElement;
    modal?.close();
  } catch (error) {
    console.error('Failed to create task:', error);
    alert('Failed to create task. Please check the form or console.');
  }
};

onMounted(async () => {
  await fetchProject();
  await fetchTasks();
});
</script>
