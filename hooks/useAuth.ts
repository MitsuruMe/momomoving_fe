'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth as useAuthContext } from '@/context/AuthContext'

// 認証カスタムフック（追加機能付き）
export const useAuth = () => {
  const authContext = useAuthContext()
  const router = useRouter()

  // ログイン後のリダイレクト処理付きログイン
  const loginWithRedirect = async (username: string, password: string, redirectTo?: string) => {
    const success = await authContext.login(username, password)

    if (success) {
      router.push(redirectTo || '/')
    }

    return success
  }

  // ログアウト後のリダイレクト処理付きログアウト
  const logoutWithRedirect = () => {
    authContext.logout()
    router.push('/login')
  }

  // 認証が必要なページでの使用
  const requireAuth = () => {
    if (!authContext.loading && !authContext.isAuthenticated) {
      router.push('/login')
      return false
    }
    return true
  }

  return {
    ...authContext,
    loginWithRedirect,
    logoutWithRedirect,
    requireAuth,
  }
}

export default useAuth