"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { API_ENDPOINTS } from "@/lib/config/env"

export default function TestApiPage() {
  const [results, setResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const testEndpoint = async (name: string, url: string, options?: RequestInit) => {
    setLoading(prev => ({ ...prev, [name]: true }))
    console.log(`Testing ${name}: ${url}`, options)

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      console.log(`Response for ${name}:`, response.status, response.statusText)

      const data = await response.text()
      let parsedData
      try {
        parsedData = JSON.parse(data)
      } catch {
        parsedData = data
      }

      console.log(`Data for ${name}:`, parsedData)

      setResults(prev => ({
        ...prev,
        [name]: {
          status: response.status,
          statusText: response.statusText,
          data: parsedData,
          url: url,
          headers: Object.fromEntries(response.headers.entries()),
        }
      }))
    } catch (error) {
      console.error(`Error for ${name}:`, error)
      setResults(prev => ({
        ...prev,
        [name]: {
          error: error instanceof Error ? error.message : 'Unknown error',
          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
          url: url,
        }
      }))
    } finally {
      setLoading(prev => ({ ...prev, [name]: false }))
    }
  }

  const testRegister = () => {
    testEndpoint('register', API_ENDPOINTS.REGISTER, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        username: 'testuser123',
        password: 'TestPass123',
        full_name: 'テストユーザー',
        move_date: '2025-12-01',
        current_postal_code: '123-4567'
      })
    })
  }

  const testLogin = () => {
    testEndpoint('login', API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        username: 'testuser123',
        password: 'TestPass123'
      })
    })
  }

  const testUserMe = () => {
    testEndpoint('userMe', API_ENDPOINTS.USER_ME, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer test_token'
      }
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">API接続テスト</h1>

      <div className="grid gap-4 mb-6">
        <div className="flex gap-4">
          <Button
            onClick={() => testEndpoint('health', `${API_ENDPOINTS.REGISTER.split('/api/v1')[0]}/health`)}
            disabled={loading.health}
          >
            {loading.health ? 'テスト中...' : 'ヘルスチェック'}
          </Button>

          <Button
            onClick={testRegister}
            disabled={loading.register}
          >
            {loading.register ? 'テスト中...' : '新規登録テスト'}
          </Button>

          <Button
            onClick={testLogin}
            disabled={loading.login}
          >
            {loading.login ? 'テスト中...' : 'ログインテスト'}
          </Button>

          <Button
            onClick={testUserMe}
            disabled={loading.userMe}
          >
            {loading.userMe ? 'テスト中...' : 'ユーザー情報テスト'}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(results).map(([name, result]) => (
          <div key={name} className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">{name}</h3>
            <div className="bg-gray-100 p-3 rounded text-sm font-mono">
              <div className="mb-2">
                <strong>URL:</strong> {result.url}
              </div>
              {result.status && (
                <div className="mb-2">
                  <strong>Status:</strong> {result.status} {result.statusText}
                </div>
              )}
              {result.error && (
                <div className="text-red-600 mb-2">
                  <strong>Error:</strong> {result.error}
                </div>
              )}
              <div>
                <strong>Response:</strong>
                <pre className="mt-1 whitespace-pre-wrap">
                  {JSON.stringify(result.data || result.error, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}