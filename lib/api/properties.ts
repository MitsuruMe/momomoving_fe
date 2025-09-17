import { API_ENDPOINTS } from '@/lib/config/env'
import type { Property, PropertyDetails, PropertySearchParams } from '@/lib/types/property'

// 認証トークンを取得
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

// 認証ヘッダーを作成
const createAuthHeaders = () => {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// 物件検索
export const searchProperties = async (params?: PropertySearchParams): Promise<Property[]> => {
  try {
    const queryParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // tags配列の場合
            value.forEach(tag => queryParams.append(key, tag))
          } else {
            queryParams.append(key, value.toString())
          }
        }
      })
    }

    const url = queryParams.toString()
      ? `${API_ENDPOINTS.PROPERTIES}?${queryParams.toString()}`
      : API_ENDPOINTS.PROPERTIES

    const response = await fetch(url, {
      method: 'GET',
      headers: createAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`物件検索に失敗しました: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('物件検索エラー:', error)
    throw error
  }
}

// 物件詳細取得
export const getPropertyDetails = async (propertyId: string): Promise<PropertyDetails> => {
  try {
    const response = await fetch(API_ENDPOINTS.PROPERTY_BY_ID(propertyId), {
      method: 'GET',
      headers: createAuthHeaders(),
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('物件が見つかりませんでした')
      }
      throw new Error(`物件詳細の取得に失敗しました: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('物件詳細取得エラー:', error)
    throw error
  }
}

// おすすめ物件取得（ユーザーの条件に基づく）
export const getRecommendedProperties = async (): Promise<Property[]> => {
  try {
    const userPreferences = typeof window !== 'undefined'
      ? localStorage.getItem('user_preferences')
      : null

    console.log('LocalStorageから取得した設定:', userPreferences)

    const searchParams: PropertySearchParams = {}
    let hasActiveSearchConditions = false

    if (userPreferences) {
      try {
        const preferences = JSON.parse(userPreferences)
        console.log('パースした設定:', preferences)

        // タグ検索パラメーターを設定（配列に要素がある場合のみ）
        if (preferences.selectedTags && Array.isArray(preferences.selectedTags) && preferences.selectedTags.length > 0) {
          searchParams.tags = preferences.selectedTags
          hasActiveSearchConditions = true
          console.log('アクティブなタグ条件:', preferences.selectedTags)
        }

        // 光回線パラメーターを設定（明示的にtrueの場合のみ）
        if (preferences.nuroAvailable === true) {
          searchParams.nuro_available = true
          hasActiveSearchConditions = true
          console.log('NURO光条件が有効')
        }
        if (preferences.sonetAvailable === true) {
          searchParams.sonet_available = true
          hasActiveSearchConditions = true
          console.log('So-net光条件が有効')
        }

        // 駅情報を設定（有効な文字列の場合のみ）
        if (preferences.nearestStation &&
            typeof preferences.nearestStation === 'string' &&
            preferences.nearestStation.trim() !== '') {
          searchParams.nearest_station = preferences.nearestStation.trim()
          hasActiveSearchConditions = true
          console.log('アクティブな駅条件:', preferences.nearestStation)
        }

        // 数値条件を設定（正の値の場合のみ）
        if (preferences.maxRent && typeof preferences.maxRent === 'number' && preferences.maxRent > 0) {
          searchParams.max_rent = preferences.maxRent
          hasActiveSearchConditions = true
          console.log('家賃上限条件:', preferences.maxRent)
        }
        if (preferences.minFloorArea && typeof preferences.minFloorArea === 'number' && preferences.minFloorArea > 0) {
          searchParams.min_floor_area = preferences.minFloorArea
          hasActiveSearchConditions = true
          console.log('最小面積条件:', preferences.minFloorArea)
        }
        if (preferences.maxFloorArea && typeof preferences.maxFloorArea === 'number' && preferences.maxFloorArea > 0) {
          searchParams.max_floor_area = preferences.maxFloorArea
          hasActiveSearchConditions = true
          console.log('最大面積条件:', preferences.maxFloorArea)
        }
        if (preferences.maxWalkMinutes && typeof preferences.maxWalkMinutes === 'number' && preferences.maxWalkMinutes > 0) {
          searchParams.max_walk_minutes = preferences.maxWalkMinutes
          hasActiveSearchConditions = true
          console.log('最大徒歩時間条件:', preferences.maxWalkMinutes)
        }

        console.log('検索条件の有無:', hasActiveSearchConditions)
        console.log('最終検索パラメーター:', searchParams)
      } catch (error) {
        console.error('ユーザー設定の解析に失敗:', error)
      }
    } else {
      console.log('LocalStorageに設定が見つかりません')
    }

    console.log('最終判定 - hasActiveSearchConditions:', hasActiveSearchConditions)

    // MVP用: 条件に関わらず常に全件取得
    console.log('MVP: 条件に関わらず全件取得を実行します')

    // 全件取得
    const response = await fetch(API_ENDPOINTS.PROPERTIES, {
      method: 'GET',
      headers: createAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`おすすめ物件の取得に失敗しました: ${response.status}`)
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      console.error('APIから配列以外のデータが返されました:', data)
      return []
    }

    // 重複除去とデータ検証
    const uniqueProperties = data.filter((property: any, index: number, array: any[]) =>
      array.findIndex(p => p.property_id === property.property_id) === index
    )

    return uniqueProperties
  } catch (error) {
    console.error('おすすめ物件取得エラー:', error)
    throw error
  }
}

// 物件関連のエラーハンドリング
export class PropertyAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'PropertyAPIError'
  }
}