<template>
  <div class="p-2 md:p-4 lg:p-6">
    <h1 class="text-2xl font-bold mb-6">Edit Task</h1>
    <TaskForm :form="form" :submit="submit"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProject } from '~/composables/useProject'
import { useTask } from '~/composables/useTask'
import type { Project } from "~/types/project"
import TaskForm from '~/components/Forms/TaskForm.vue'
import type { TaskInput } from '~/types/task'

const router = useRouter()
const route = useRoute()
const { getProjects } = useProject()
const { getTask, updateTask } = useTask()
const taskId = route.params.id as string

const projects = ref<Project[]>([])
const form = ref<TaskInput>({
  project_id: '',
  subject: '',
  description: '',
  status: '',
  priority: '',
  start_date: '',
  end_date: '',
  order: 0,
  assigned_to: '',
  percentage: 0
})

const fetchData = async () => {
  projects.value = await getProjects()

  const task = await getTask(taskId)
  if (!task) {
    alert('Task not found.')
    return
  }
  
  form.value = {
    project_id: task.project_id,
    subject: task.subject,
    description: task.description,
    status: task.status,
    priority: task.priority,
    start_date: task.start_date,
    end_date: task.end_date,
    order: task.order,
    assigned_to: task.assigned_to || '',
    percentage: task.percentage
  }
}

const submit = async () => {
  try {
    await updateTask(taskId, form.value)
    router.push('/tasks')
  } catch (error) {
    console.error('Failed to update task:', error)
    alert('Failed to update task. Please check the form or console.')
  }
}

onMounted(fetchData)
</script>
