// 認証関連の型定義

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface RegisterRequest {
  username: string
  password: string
  full_name: string
  move_date: string // YYYY-MM-DD format
  current_postal_code: string
}

export interface RegisterResponse {
  user_id: string
  username: string
  full_name: string
  move_date: string
  current_postal_code: string
}

export interface AuthError {
  detail: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

export interface User {
  user_id: string
  username: string
  full_name: string
  phone_number: string | null
  current_postal_code: string
  move_date: string
}