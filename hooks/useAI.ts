'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAISuggestions, getBulkWasteInfo, type SuggestionContext, type AISuggestion, type BulkWasteInfo, type AISuggestionRequest } from '@/lib/api/ai'

// AI提案を取得するフック
export const useAISuggestions = (request: AISuggestionRequest) => {
  const [suggestion, setSuggestion] = useState<AISuggestion | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  // 残り日数に応じたデフォルトメッセージを生成（50文字以内）
  const getDefaultMessage = useCallback(() => {
    if (request.context === 'internet_contract') {
      return 'インターネット契約の準備を進めましょう！'
    }

    const daysUntil = request.days_until_move || 0
    if (daysUntil <= 3) {
      return 'いよいよ引越し間近！最後の仕上げを頑張ろう！'
    } else if (daysUntil <= 7) {
      return 'あと1週間！荷造りなど最終準備を進めよう！'
    } else if (daysUntil <= 14) {
      return 'あと2週間！本格的な準備を始めよう！'
    } else if (daysUntil <= 30) {
      return 'もう少しで新生活だね！頑張ろう！'
    } else {
      return 'まだ時間はあるけど、計画的に準備を進めよう！'
    }
  }, [request.context, request.days_until_move])

  useEffect(() => {
    // 既に読み込み済みまたは有効なAI提案がある場合はスキップ
    if (hasLoaded) return
    if (suggestion && !suggestion.suggestion.includes('まだ時間はあるけど') && !suggestion.suggestion.includes('計画的に準備を進めよう')) return

    let isCancelled = false

    const fetchSuggestion = async () => {
      if (isCancelled) return

      setLoading(true)
      setError(null)

      const defaultMessage = getDefaultMessage()

      try {
        console.log('AI提案取得開始:', request)

        // 30秒でタイムアウト
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 30000)
        )

        const apiPromise = getAISuggestions(request)
        const result = await Promise.race([apiPromise, timeoutPromise]) as AISuggestion

        console.log('AI提案取得成功:', result)
        if (!isCancelled) {
          setSuggestion(result)
        }
      } catch (err) {
        console.error('AI提案取得失敗:', err)
        console.log('デフォルトメッセージを使用:', defaultMessage)
        if (!isCancelled) {
          // 既に有効なAI提案が設定されている場合は上書きしない
          setSuggestion(prevSuggestion => {
            // 既に有効なAI提案（デフォルトメッセージ以外）がある場合は上書きしない
            if (prevSuggestion &&
                !prevSuggestion.suggestion.includes('まだ時間はあるけど') &&
                !prevSuggestion.suggestion.includes('計画的に準備を進めよう') &&
                !prevSuggestion.suggestion.includes('いよいよ引越し間近') &&
                !prevSuggestion.suggestion.includes('あと1週間') &&
                !prevSuggestion.suggestion.includes('あと2週間') &&
                !prevSuggestion.suggestion.includes('もう少しで新生活') &&
                !prevSuggestion.suggestion.includes('インターネット契約の準備')) {
              console.log('既に有効なAI提案があるため、エラー時のデフォルトメッセージをスキップ')
              return prevSuggestion
            }
            return {
              suggestion: defaultMessage,
              context: request.context
            }
          })
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
          setHasLoaded(true)
        }
      }
    }

    fetchSuggestion()

    return () => {
      isCancelled = true
    }
  }, [request.context, request.days_until_move, request.completion_rate, getDefaultMessage, hasLoaded])

  const refetch = useCallback(() => {
    setHasLoaded(false)
  }, [])

  return {
    suggestion,
    loading,
    error,
    refetch,
  }
}

// 粗大ゴミ情報を取得するフック（パラメータなし）
export const useBulkWasteInfo = (shouldFetch: boolean = false) => {
  const [wasteInfo, setWasteInfo] = useState<BulkWasteInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWasteInfo = useCallback(async () => {
    console.log('粗大ゴミ情報取得開始')
    setLoading(true)
    setError(null)

    try {
      const result = await getBulkWasteInfo()
      console.log('粗大ゴミ情報取得成功:', result)
      setWasteInfo(result)
    } catch (err) {
      console.error('粗大ゴミ情報取得失敗:', err)
      setError(err instanceof Error ? err.message : '粗大ゴミ情報の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (shouldFetch) {
      fetchWasteInfo()
    }
  }, [shouldFetch, fetchWasteInfo])

  return {
    wasteInfo,
    loading,
    error,
    fetchWasteInfo,
  }
}

// AI機能の可用性チェック（簡易版）
export const useAIAvailability = () => {
  // 常にフォールバック機能があるため、利用可能として扱う
  return {
    isAvailable: true,
    checking: false,
  }
}