import type { User } from "./user"

export interface Project {
    id: number | string
    name: string
    description: string
    owner_id: string | null
    difficulty: number
    owner: User
    start_date: string
    end_date: string
}

export interface ProjectResponse {
    message: string,
    status: number,
    total: number,
    data: Project[]
}

export type ProjectInput = {
  name: string;
  description?: string;
  difficulty?: number;
  start_date?: string;
  end_date?: string;
  owner_id?: string | null;
};