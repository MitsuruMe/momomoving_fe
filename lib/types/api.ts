// API共通の型定義

export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

export interface ApiError {
  detail: string
  message?: string
  code?: string
  status: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  size: number
  pages: number
}

// HTTP Method types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// Request configuration
export interface RequestConfig {
  method: HttpMethod
  headers?: Record<string, string>
  body?: any
  params?: Record<string, any>
}

// Loading states for UI
export interface LoadingState {
  loading: boolean
  error: string | null
}

// Form validation types
export interface ValidationError {
  field: string
  message: string
}

export interface FormState<T> extends LoadingState {
  data: T
  errors: ValidationError[]
  touched: Record<keyof T, boolean>
}

// Common response status codes
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}