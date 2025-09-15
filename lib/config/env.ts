// 環境変数管理

export const env = {
  // API Configuration
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://momomoving-be.onrender.com',

  // App Configuration
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'ももとお引っ越し',
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',

  // Environment
  NODE_ENV: process.env.NODE_ENV || 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const

// API エンドポイント
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${env.API_BASE_URL}/api/v1/auth/login`,
  REGISTER: `${env.API_BASE_URL}/api/v1/auth/register`,

  // Users
  USER_ME: `${env.API_BASE_URL}/api/v1/users/me`,

  // Tasks
  TASKS: `${env.API_BASE_URL}/api/v1/tasks`,
  TASK_BY_ID: (id: string) => `${env.API_BASE_URL}/api/v1/tasks/${id}`,

  // Properties
  PROPERTIES: `${env.API_BASE_URL}/api/v1/properties`,
  PROPERTY_BY_ID: (id: string) => `${env.API_BASE_URL}/api/v1/properties/${id}`,

  // AI
  AI_SUGGESTIONS: `${env.API_BASE_URL}/api/v1/ai/suggestions`,
  AI_BULK_WASTE: `${env.API_BASE_URL}/api/v1/ai/bulk_waste_collection_date`,
} as const

// 設定の検証
export const validateEnv = () => {
  const requiredEnvVars = [
    'NEXT_PUBLIC_API_BASE_URL',
  ]

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  )

  if (missingVars.length > 0) {
    console.warn('Missing environment variables:', missingVars)
  }

  return missingVars.length === 0
}

// 環境変数のログ出力（開発時のみ）
if (env.IS_DEVELOPMENT) {
  console.log('Environment Configuration:', {
    API_BASE_URL: env.API_BASE_URL,
    NODE_ENV: env.NODE_ENV,
    APP_NAME: env.APP_NAME,
    APP_VERSION: env.APP_VERSION,
  })
}