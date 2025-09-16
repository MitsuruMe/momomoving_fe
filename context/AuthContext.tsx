'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { AuthState, User } from '@/lib/types'
import { API_ENDPOINTS } from '@/lib/config/env'

// 認証アクションの型定義
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean }

// 認証コンテキストの型定義
interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  clearError: () => void
  setUser: (user: User) => void
}

// 初期状態
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true, // 初期化時はtrue
  error: null,
}

// Reducer関数
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

// コンテキストの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// プロバイダーコンポーネント
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // 初期化時にトークンをチェック
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token')

      if (token) {
        try {
          // ユーザー情報を取得してトークンの有効性を確認
          const response = await fetch(API_ENDPOINTS.USER_ME, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
            const user = await response.json()
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { user, token }
            })
          } else {
            // トークンが無効な場合は削除
            localStorage.removeItem('auth_token')
            dispatch({ type: 'SET_LOADING', payload: false })
          }
        } catch (error) {
          localStorage.removeItem('auth_token')
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    initializeAuth()
  }, [])

  // ログイン処理
  const login = async (username: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' })

    try {
      // OAuth2PasswordRequestFormを使用するため、フォームデータとして送信
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)

      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const { access_token } = await response.json()

        // ユーザー情報を取得
        const userResponse = await fetch(API_ENDPOINTS.USER_ME, {
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        })

        if (userResponse.ok) {
          const user = await userResponse.json()

          // トークンをローカルストレージに保存
          localStorage.setItem('auth_token', access_token)

          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, token: access_token }
          })

          return true
        }
      }

      const errorData = await response.json()

      // FastAPIのバリデーションエラーハンドリング
      let errorMessage = 'ログインに失敗しました'
      if (errorData.detail) {
        if (Array.isArray(errorData.detail)) {
          // バリデーションエラーの場合
          errorMessage = errorData.detail.map((err: any) => err.msg).join(', ')
        } else if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail
        }
      }

      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      })
      return false

    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'ネットワークエラーが発生しました'
      })
      return false
    }
  }

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem('auth_token')
    dispatch({ type: 'LOGOUT' })
  }

  // エラークリア
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  // ユーザー情報更新
  const setUser = (user: User) => {
    dispatch({ type: 'SET_USER', payload: user })
  }

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// カスタムフック
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}