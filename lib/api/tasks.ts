// タスク関連API

import { API_ENDPOINTS } from '@/lib/config/env'
import type { Task, UpdateTaskRequest } from '@/lib/types'

// タスク一覧取得
export const getTasks = async (): Promise<Task[]> => {
  const token = localStorage.getItem('auth_token')

  const response = await fetch(API_ENDPOINTS.TASKS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('auth_token')
      throw new Error('認証期限が切れました。再度ログインしてください。')
    }

    // エラーレスポンスを詳細に処理
    try {
      const errorData = await response.json()
      if (errorData.detail) {
        if (Array.isArray(errorData.detail)) {
          throw new Error(errorData.detail.map((err: any) => err.msg).join(', '))
        } else if (typeof errorData.detail === 'string') {
          throw new Error(errorData.detail)
        }
      }
    } catch (parseError) {
      // JSON解析エラーの場合は汎用メッセージ
    }

    throw new Error('タスク一覧の取得に失敗しました')
  }

  return response.json()
}

// 特定タスク取得
export const getTaskById = async (taskId: string): Promise<Task> => {
  const token = localStorage.getItem('auth_token')

  const response = await fetch(API_ENDPOINTS.TASK_BY_ID(taskId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('auth_token')
      throw new Error('認証期限が切れました。再度ログインしてください。')
    }

    // エラーレスポンスを詳細に処理
    try {
      const errorData = await response.json()
      if (errorData.detail) {
        if (Array.isArray(errorData.detail)) {
          throw new Error(errorData.detail.map((err: any) => err.msg).join(', '))
        } else if (typeof errorData.detail === 'string') {
          throw new Error(errorData.detail)
        }
      }
    } catch (parseError) {
      // JSON解析エラーの場合は汎用メッセージ
    }

    throw new Error('タスクの取得に失敗しました')
  }

  return response.json()
}

// タスク更新
export const updateTask = async (taskId: string, taskData: UpdateTaskRequest): Promise<Task> => {
  const token = localStorage.getItem('auth_token')

  const response = await fetch(API_ENDPOINTS.TASK_BY_ID(taskId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  })

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('auth_token')
      throw new Error('認証期限が切れました。再度ログインしてください。')
    }

    // エラーレスポンスを詳細に処理
    try {
      const errorData = await response.json()
      if (errorData.detail) {
        if (Array.isArray(errorData.detail)) {
          throw new Error(errorData.detail.map((err: any) => err.msg).join(', '))
        } else if (typeof errorData.detail === 'string') {
          throw new Error(errorData.detail)
        }
      }
    } catch (parseError) {
      // JSON解析エラーの場合は汎用メッセージ
    }

    throw new Error('タスクの更新に失敗しました')
  }

  return response.json()
}