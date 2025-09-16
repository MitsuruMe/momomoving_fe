// ユーザー関連の型定義

export interface User {
  user_id: string
  username: string
  full_name: string
  phone_number: string | null
  current_postal_code: string
  move_date: string
}

// 後方互換性のためのエイリアス
export interface UserInfo extends User {}

export interface UpdateUserRequest {
  full_name?: string
  phone_number?: string
  move_date?: string
  current_postal_code?: string
}

export interface UpdateUserResponse extends User {}