// バリデーションスキーマとユーティリティ

import { z } from 'zod'

// ログインフォームのバリデーションスキーマ
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'ユーザーIDは必須です'),
  password: z
    .string()
    .min(1, 'パスワードは必須です')
    .min(6, 'パスワードは6文字以上で入力してください'),
})

// 新規登録フォームのバリデーションスキーマ
export const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'ユーザーIDは必須です')
    .min(3, 'ユーザーIDは3文字以上で入力してください')
    .max(50, 'ユーザーIDは50文字以内で入力してください')
    .regex(/^[a-zA-Z0-9_-]+$/, 'ユーザーIDは英数字、アンダースコア、ハイフンのみ使用できます'),
  password: z
    .string()
    .min(1, 'パスワードは1文字以上で入力してください'),
  full_name: z
    .string()
    .min(1, '氏名は必須です')
    .max(50, '氏名は50文字以内で入力してください'),
  move_date: z
    .string()
    .min(1, '引越し予定日は必須です')
    .regex(/^\d{4}-\d{2}-\d{2}$/, '正しい日付形式で入力してください')
    .refine((date) => {
      const moveDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return moveDate >= today
    }, '引越し予定日は今日以降の日付を選択してください'),
  current_postal_code: z
    .string()
    .min(1, '郵便番号は必須です')
    .regex(/^\d{3}-\d{4}$/, '郵便番号は xxx-xxxx の形式で入力してください'),
})

// ユーザー情報更新フォームのバリデーションスキーマ
export const updateUserSchema = z.object({
  full_name: z
    .string()
    .min(1, '氏名は必須です')
    .max(50, '氏名は50文字以内で入力してください')
    .optional(),
  phone_number: z
    .string()
    .regex(/^0\d{1,4}-\d{1,4}-\d{4}$/, '電話番号は 0xx-xxxx-xxxx の形式で入力してください')
    .optional()
    .or(z.literal('')),
  move_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '正しい日付形式で入力してください')
    .refine((date) => {
      const moveDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return moveDate >= today
    }, '引越し予定日は今日以降の日付を選択してください')
    .optional(),
  current_postal_code: z
    .string()
    .regex(/^\d{3}-\d{4}$/, '郵便番号は xxx-xxxx の形式で入力してください')
    .optional(),
})

// タスク更新フォームのバリデーションスキーマ
export const updateTaskSchema = z.object({
  status: z
    .enum(['pending', 'completed', 'in_progress'])
    .optional(),
  custom_notes: z
    .string()
    .max(500, 'メモは500文字以内で入力してください')
    .optional(),
})

// 物件検索フォームのバリデーションスキーマ
export const propertySearchSchema = z.object({
  max_rent: z
    .number()
    .min(0, '賃料は0以上で入力してください')
    .max(1000000, '賃料は100万円以下で入力してください')
    .optional(),
  nearest_station: z
    .string()
    .max(50, '駅名は50文字以内で入力してください')
    .optional(),
  min_floor_area: z
    .number()
    .min(0, '面積は0以上で入力してください')
    .optional(),
  max_floor_area: z
    .number()
    .min(0, '面積は0以上で入力してください')
    .optional(),
  min_build_year: z
    .number()
    .min(1900, '築年数は1900年以降で入力してください')
    .max(new Date().getFullYear(), '築年数は現在年以下で入力してください')
    .optional(),
  max_build_year: z
    .number()
    .min(1900, '築年数は1900年以降で入力してください')
    .max(new Date().getFullYear(), '築年数は現在年以下で入力してください')
    .optional(),
  max_walk_minutes: z
    .number()
    .min(0, '徒歩時間は0分以上で入力してください')
    .max(60, '徒歩時間は60分以下で入力してください')
    .optional(),
  nuro_available: z.boolean().optional(),
  sonet_available: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
})

// 郵便番号のフォーマット
export const formatPostalCode = (value: string): string => {
  const numbers = value.replace(/[^\d]/g, '')
  if (numbers.length <= 3) {
    return numbers
  }
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}`
}

// 電話番号のフォーマット
export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/[^\d]/g, '')
  if (numbers.length <= 3) {
    return numbers
  } else if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
  }
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
}

// バリデーションエラーメッセージの抽出
export const extractErrorMessages = (errors: any): Record<string, string> => {
  const errorMessages: Record<string, string> = {}

  if (errors && typeof errors === 'object') {
    Object.keys(errors).forEach((key) => {
      if (errors[key] && errors[key].message) {
        errorMessages[key] = errors[key].message
      }
    })
  }

  return errorMessages
}