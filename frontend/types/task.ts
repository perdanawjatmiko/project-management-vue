import type { Project } from "./project"

export interface Task {
        id: number | string
        project_id: string
        subject: string
        description: string
        status: string
        priority: 'low' | 'medium' | 'high' | 'urgent'
        start_date: string
        end_date: string
        order: number
        percentage: number
        assigned_to: string | null
        project?: Project
        created_at: string
        updated_at: string | null
        deleted_at: string | null
    }

export interface TaskResponse {
    message: string,
    status: number,
    total: number,
    data: Task[]
}

export interface TaskInput {
        id: number | string
        project_id: string
        subject: string
        description: string
        status: string
        priority: 'low' | 'medium' | 'high' | 'urgent'
        start_date: string
        end_date: string
        order: number
        percentage: number
        assigned_to: string | null
    }