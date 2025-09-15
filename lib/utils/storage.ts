// ローカルストレージ管理ユーティリティ

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  SELECTED_PROPERTY: 'selected_property',
  TASK_CACHE: 'task_cache',
} as const

export type StorageKey = keyof typeof STORAGE_KEYS

// ローカルストレージへの安全な保存
export const setItem = (key: StorageKey, value: any): boolean => {
  try {
    if (typeof window !== 'undefined') {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(STORAGE_KEYS[key], serializedValue)
      return true
    }
    return false
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
    return false
  }
}

// ローカルストレージからの安全な取得
export const getItem = <T = any>(key: StorageKey, defaultValue?: T): T | null => {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(STORAGE_KEYS[key])
      return item ? JSON.parse(item) : defaultValue || null
    }
    return defaultValue || null
  } catch (error) {
    console.error('Failed to get from localStorage:', error)
    return defaultValue || null
  }
}

// ローカルストレージからの削除
export const removeItem = (key: StorageKey): boolean => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS[key])
      return true
    }
    return false
  } catch (error) {
    console.error('Failed to remove from localStorage:', error)
    return false
  }
}

// ローカルストレージのクリア
export const clearStorage = (): boolean => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.clear()
      return true
    }
    return false
  } catch (error) {
    console.error('Failed to clear localStorage:', error)
    return false
  }
}

// 特定のキーが存在するかチェック
export const hasItem = (key: StorageKey): boolean => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS[key]) !== null
    }
    return false
  } catch (error) {
    console.error('Failed to check localStorage:', error)
    return false
  }
}