// ユーザー関連API

import { API_ENDPOINTS } from '@/lib/config/env'
import type { User, UpdateUserRequest } from '@/lib/types'

// ユーザー情報取得
export const getUserInfo = async (): Promise<User> => {
  const token = localStorage.getItem('auth_token')

  const response = await fetch(API_ENDPOINTS.USER_ME, {
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
    throw new Error('ユーザー情報の取得に失敗しました')
  }

  return response.json()
}

// ユーザー情報更新
export const updateUserInfo = async (userData: UpdateUserRequest): Promise<User> => {
  const token = localStorage.getItem('auth_token')

  const response = await fetch(API_ENDPOINTS.USER_ME, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('auth_token')
      throw new Error('認証期限が切れました。再度ログインしてください。')
    }
    throw new Error('ユーザー情報の更新に失敗しました')
  }

  return response.json()
}