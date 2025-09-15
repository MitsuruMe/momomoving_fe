// AI機能関連の型定義

export type SuggestionContext = 'internet_contract' | 'moving_preparation' | 'utilities' | 'general'

export interface AISuggestionRequest {
  context: SuggestionContext
}

export interface AISuggestionResponse {
  suggestion_type: string
  title: string
  message: string
}

export interface BulkWasteCollectionResponse {
  postal_code: string
  info: string
}