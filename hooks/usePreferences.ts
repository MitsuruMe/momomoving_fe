'use client'

import { useState, useEffect, useCallback } from 'react'

// ユーザーの条件・設定管理
export interface UserPreferences {
  // 物件の条件
  selectedTags: string[]
  maxRent?: number
  nearestStation?: string
  minFloorArea?: number
  maxFloorArea?: number
  maxWalkMinutes?: number
  nuroAvailable?: boolean
  sonetAvailable?: boolean

  // 引っ越し先情報
  destinationPostalCode?: string
  destinationAddress?: string
}

const PREFERENCES_STORAGE_KEY = 'user_preferences'

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    selectedTags: []
  })

  // LocalStorageから設定を読み込み
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(PREFERENCES_STORAGE_KEY)
      if (saved) {
        try {
          const parsedPreferences = JSON.parse(saved)
          setPreferences(parsedPreferences)
        } catch (error) {
          console.error('設定の読み込みに失敗:', error)
        }
      }
    }
  }, [])

  // 設定をLocalStorageに保存
  const savePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    const updatedPreferences = { ...preferences, ...newPreferences }
    setPreferences(updatedPreferences)

    if (typeof window !== 'undefined') {
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(updatedPreferences))
    }
  }, [preferences])

  // 選択したタグを更新
  const updateSelectedTags = useCallback((tags: string[]) => {
    savePreferences({ selectedTags: tags })
  }, [savePreferences])

  // 引っ越し先情報を更新
  const updateDestination = useCallback((postalCode: string, address?: string) => {
    savePreferences({
      destinationPostalCode: postalCode,
      destinationAddress: address
    })
  }, [savePreferences])

  // 物件検索条件を更新
  const updateSearchConditions = useCallback((conditions: Partial<UserPreferences>) => {
    savePreferences(conditions)
  }, [savePreferences])

  // 設定をクリア
  const clearPreferences = useCallback(() => {
    setPreferences({ selectedTags: [] })
    if (typeof window !== 'undefined') {
      localStorage.removeItem(PREFERENCES_STORAGE_KEY)
    }
  }, [])

  return {
    preferences,
    updateSelectedTags,
    updateDestination,
    updateSearchConditions,
    savePreferences,
    clearPreferences,
    hasPreferences: preferences.selectedTags.length > 0 || !!preferences.destinationPostalCode
  }
}