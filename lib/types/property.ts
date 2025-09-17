// 物件関連の型定義

// 物件の基本情報（検索結果用）
export interface Property {
  property_id: string
  property_name: string
  rent: number
  nearest_station: string
  walk_minutes: number
  room_layout: string
  nuro_available: boolean
  sonet_available: boolean
  image_urls: string[]
  tags: string[]
}

// 物件の詳細情報
export interface PropertyDetails extends Property {
  address: string
  floor_area: number
  build_year: number
  floor: string
  facilities: PropertyFacilities
  description?: string
}

// 物件設備情報
export interface PropertyFacilities {
  auto_lock: boolean
  separate_bathroom: boolean
  balcony: boolean
  parking: boolean
  pet_allowed: boolean
  furnished: boolean
  air_conditioning: boolean
  washing_machine: boolean
  security_camera: boolean
}

// 物件検索のクエリパラメータ
export interface PropertySearchParams {
  max_rent?: number
  nearest_station?: string
  min_floor_area?: number
  max_floor_area?: number
  min_build_year?: number
  max_build_year?: number
  max_walk_minutes?: number
  nuro_available?: boolean
  sonet_available?: boolean
  tags?: string[]
}

// ユーザーの物件選択情報
export interface UserPropertySelection {
  property_id: string | null
  selected_at?: string
}