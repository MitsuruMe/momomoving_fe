// ユーザー情報管理カスタムフック

import { useState, useEffect, useCallback } from 'react'
import { getUserInfo, updateUserInfo } from '@/lib/api/users'
import type { User, UpdateUserRequest } from '@/lib/types'

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ユーザー情報取得
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const userData = await getUserInfo()
      setUser(userData)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'ユーザー情報の取得に失敗しました')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // ユーザー情報更新
  const updateUser = useCallback(async (userData: UpdateUserRequest): Promise<boolean> => {
    try {
      setError(null)
      const updatedUser = await updateUserInfo(userData)
      setUser(updatedUser)
      return true
    } catch (error) {
      setError(error instanceof Error ? error.message : 'ユーザー情報の更新に失敗しました')
      return false
    }
  }, [])

  // 引っ越し予定日までの残り日数計算
  const getDaysUntilMove = useCallback((): number | null => {
    if (!user?.move_date) return null

    const moveDate = new Date(user.move_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    moveDate.setHours(0, 0, 0, 0)

    const diffTime = moveDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }, [user?.move_date])

  // エラークリア
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // 初回データ取得
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [fetchUser])

  return {
    user,
    loading,
    error,
    fetchUser,
    updateUser,
    getDaysUntilMove,
    clearError,
  }
}