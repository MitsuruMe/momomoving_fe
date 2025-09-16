// タスク管理カスタムフック

import { useState, useEffect, useCallback } from 'react'
import { getTasks, getTaskById, updateTask } from '@/lib/api/tasks'
import type { Task, UpdateTaskRequest } from '@/lib/types'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // タスク一覧取得
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const tasksData = await getTasks()
      setTasks(tasksData)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'タスク一覧の取得に失敗しました')
      setTasks([])
    } finally {
      setLoading(false)
    }
  }, [])

  // タスク更新
  const updateTaskStatus = useCallback(async (taskId: string, taskData: UpdateTaskRequest): Promise<boolean> => {
    try {
      setError(null)
      const updatedTask = await updateTask(taskId, taskData)

      // ローカル状態も更新（楽観的更新）
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.user_task_id === taskId ? updatedTask : task
        )
      )

      return true
    } catch (error) {
      setError(error instanceof Error ? error.message : 'タスクの更新に失敗しました')
      return false
    }
  }, [])

  // 完了率計算
  const getCompletionRate = useCallback((): number => {
    if (tasks.length === 0) return 0
    const completedCount = tasks.filter(task => task.status === 'completed').length
    return Math.round((completedCount / tasks.length) * 100)
  }, [tasks])

  // ステータス別タスク取得
  const getTasksByStatus = useCallback((status: 'pending' | 'completed' | 'in_progress') => {
    return tasks.filter(task => task.status === status)
  }, [tasks])

  // 特定タスク取得
  const getTask = useCallback((taskId: string): Task | undefined => {
    return tasks.find(task => task.user_task_id === taskId)
  }, [tasks])

  // エラークリア
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // 初回データ取得
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      fetchTasks()
    } else {
      setLoading(false)
    }
  }, [fetchTasks])

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    updateTaskStatus,
    getCompletionRate,
    getTasksByStatus,
    getTask,
    clearError,
  }
}