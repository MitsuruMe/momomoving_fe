// タスク関連の型定義

export type TaskStatus = 'pending' | 'completed' | 'in_progress'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  user_task_id: string
  task_id: string
  category: string
  task_name: string
  description: string
  status: TaskStatus
  due_date: string // YYYY-MM-DD format
  priority: TaskPriority
  completed_date?: string | null
  custom_notes?: string | null
}

export interface UpdateTaskRequest {
  status?: TaskStatus
  custom_notes?: string
}

export interface UpdateTaskResponse extends Task {
  completed_date?: string | null
}

export interface TaskListResponse extends Array<Task> {}

// フロントエンド表示用のタスク型
export interface DisplayTask {
  id: string
  title: string
  subtitle: string
  completed: boolean
  priority: TaskPriority
  due_date: string
  custom_notes?: string
}