import { API_ENDPOINTS } from '@/lib/config/env'

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
  console.log('認証トークン:', token ? `Bearer ${token.substring(0, 20)}...` : 'なし')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// AI提案の種類
export type SuggestionContext = 'internet_contract' | 'moving_preparation'

// AI提案リクエスト型
export interface AISuggestionRequest {
  context: SuggestionContext
  days_until_move?: number
  completion_rate?: number
}

// AI提案レスポンス型（バックエンドの実際の形式）
interface AIBackendResponse {
  suggestion_type: string
  title: string
  message: string
}

// フロントエンド用のAI提案型
export interface AISuggestion {
  suggestion: string
  context: SuggestionContext
}

// 粗大ゴミ情報レスポンス型（実際のAPI形式）
export interface BulkWasteInfo {
  postal_code: string
  info: string
}

// AI提案取得
export const getAISuggestions = async (request: AISuggestionRequest): Promise<AISuggestion> => {
  try {
    const params = new URLSearchParams({
      context: request.context
    })

    const url = `${API_ENDPOINTS.AI_SUGGESTIONS}?${params}`
    console.log('AI API呼び出し URL:', url)
    console.log('リクエストヘッダー:', createAuthHeaders())

    const response = await fetch(url, {
      method: 'GET',
      headers: createAuthHeaders(),
      // タイムアウトを30秒に設定
      signal: AbortSignal.timeout(30000)
    })

    console.log('AI APIレスポンス状態:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('AI APIエラーレスポンス:', errorText)
      throw new Error(`AI提案の取得に失敗しました: ${response.status} - ${errorText}`)
    }

    const backendResult: AIBackendResponse = await response.json()
    console.log('AI APIレスポンス:', backendResult)

    // バックエンドのレスポンス形式をフロントエンド用に変換
    // 文言を50文字以内に短縮
    let truncatedMessage = backendResult.message
    if (truncatedMessage.length > 50) {
      // 50文字で切り詰めて「...」を追加
      truncatedMessage = truncatedMessage.substring(0, 47) + '...'
    }

    const result: AISuggestion = {
      suggestion: truncatedMessage,
      context: request.context
    }

    console.log('変換後のレスポンス:', result)
    return result
  } catch (error) {
    console.error('AI提案取得エラー:', error)
    // ネットワークエラーやタイムアウトの場合も適切にエラーを投げる
    if (error instanceof TypeError) {
      throw new Error('ネットワーク接続エラーが発生しました')
    }
    throw error
  }
}

// 粗大ゴミ情報取得（パラメータなし）
export const getBulkWasteInfo = async (): Promise<BulkWasteInfo> => {
  try {
    const url = API_ENDPOINTS.AI_BULK_WASTE
    console.log('粗大ゴミAPI呼び出し URL:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: createAuthHeaders(),
    })

    console.log('粗大ゴミAPIレスポンス状態:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('粗大ゴミAPIエラーレスポンス:', errorText)
      throw new Error(`粗大ゴミ情報の取得に失敗しました: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('粗大ゴミAPIレスポンス:', result)
    return result
  } catch (error) {
    console.error('粗大ゴミ情報取得エラー:', error)
    throw error
  }
}

// AI関連のエラーハンドリング
export class AIAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'AIAPIError'
  }
}