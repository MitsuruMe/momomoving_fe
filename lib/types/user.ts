// ユーザー関連の型定義

export interface UserInfo {
  user_id: string
  username: string
  full_name: string
  phone_number: string | null
  current_postal_code: string
  move_date: string
}

export interface UpdateUserRequest {
  full_name?: string
  phone_number?: string
  move_date?: string
  current_postal_code?: string
}

export interface UpdateUserResponse extends UserInfo {}