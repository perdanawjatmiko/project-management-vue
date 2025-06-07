import type { Project } from "./project"
import type { User } from "./user"

export interface Task {
        id: number | string
        project_id: string
        subject: string
        description: string
        status: string
        priority: string
        start_date: string
        end_date: string
        order: number
        percentage: number
        assigned_to: string | null
        project?: Project
        created_at: string
        updated_at: string | null
        deleted_at: string | null
        assigned: User
    }

export interface TaskResponse {
    message: string
    status: number
    total: number
    per_page: number
    current_page: number
    last_page: number
    data: Task[]
}

export interface TaskInput {
        project_id: string
        subject: string
        description: string
        status: string
        priority: string
        start_date: string
        end_date: string
        order: number
        percentage: number
        assigned_to: string | null
    }