'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Property, PropertyDetails, PropertySearchParams, UserPropertySelection } from '@/lib/types/property'
import { searchProperties, getPropertyDetails, getRecommendedProperties } from '@/lib/api/properties'

// 物件検索用フック
export const usePropertySearch = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (params?: PropertySearchParams) => {
    setLoading(true)
    setError(null)

    try {
      const results = await searchProperties(params)
      setProperties(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : '物件検索に失敗しました')
      setProperties([])
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    properties,
    loading,
    error,
    search,
  }
}

// 物件詳細取得用フック
export const usePropertyDetails = (propertyId: string | null) => {
  const [property, setProperty] = useState<PropertyDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!propertyId) {
      setProperty(null)
      return
    }

    const fetchProperty = async () => {
      setLoading(true)
      setError(null)

      try {
        const details = await getPropertyDetails(propertyId)
        setProperty(details)
      } catch (err) {
        setError(err instanceof Error ? err.message : '物件詳細の取得に失敗しました')
        setProperty(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [propertyId])

  return {
    property,
    loading,
    error,
  }
}

// おすすめ物件取得用フック
export const useRecommendedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRecommended = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const results = await getRecommendedProperties()
      setProperties(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'おすすめ物件の取得に失敗しました')
      setProperties([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRecommended()
  }, [fetchRecommended])

  return {
    properties,
    loading,
    error,
    refetch: fetchRecommended,
  }
}

// ユーザーの物件選択管理用フック
export const useUserPropertySelection = () => {
  const [selection, setSelection] = useState<UserPropertySelection>({
    property_id: null,
  })

  // ローカルストレージから選択済み物件を読み込み
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_property_selection')
      if (saved) {
        try {
          setSelection(JSON.parse(saved))
        } catch (error) {
          console.error('物件選択情報の読み込みに失敗:', error)
        }
      }
    }
  }, [])

  // 物件を選択
  const selectProperty = useCallback((propertyId: string) => {
    const newSelection: UserPropertySelection = {
      property_id: propertyId,
      selected_at: new Date().toISOString(),
    }

    setSelection(newSelection)

    if (typeof window !== 'undefined') {
      localStorage.setItem('user_property_selection', JSON.stringify(newSelection))
    }
  }, [])

  // 物件選択をクリア
  const clearSelection = useCallback(() => {
    const clearedSelection: UserPropertySelection = {
      property_id: null,
    }

    setSelection(clearedSelection)

    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_property_selection')
    }
  }, [])

  return {
    selection,
    selectProperty,
    clearSelection,
    hasSelection: !!selection.property_id,
  }
}