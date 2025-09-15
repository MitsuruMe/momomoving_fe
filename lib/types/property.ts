// 物件関連の型定義

export interface Property {
  property_id: string
  property_name: string
  rent: number
  nearest_station?: string
  walk_minutes?: number
  room_layout?: string
  floor_area?: number
  build_year?: number
  nuro_available: boolean
  sonet_available: boolean
  image_urls: string[]
  tags: string[]
  address?: string
  facilities?: PropertyFacilities
}

export interface PropertyFacilities {
  auto_lock?: boolean
  separate_bathroom?: boolean
  balcony?: boolean
  parking?: boolean
  pet_friendly?: boolean
  elevator?: boolean
  security_camera?: boolean
  delivery_box?: boolean
  internet_ready?: boolean
}

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

export interface PropertyListResponse extends Array<Property> {}

export interface PropertyDetailResponse extends Property {}

// フロントエンド表示用の物件型
export interface DisplayProperty {
  id: string
  name: string
  price: string
  details: string
  internetTag: string
  internetTagColor: string
  amenities: string[]
  image: string
}