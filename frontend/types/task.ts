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
        assigned_to: string | null
    }