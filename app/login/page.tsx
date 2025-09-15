"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { loginSchema } from "@/lib/utils/validation"
import type { LoginRequest } from "@/lib/types"

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated, loading, error, clearError } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  })

  // 既にログイン済みの場合はホームページにリダイレクト
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, loading, router])

  // エラーをクリアする
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  const onSubmit = async (data: LoginRequest) => {
    setIsSubmitting(true)

    try {
      const success = await login(data.username, data.password)
      if (success) {
        router.push('/')
      }
    } catch (err) {
      console.error('Login error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ローディング中は何も表示しない
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  // 認証済みの場合は何も表示しない（リダイレクト中）
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex flex-col items-center justify-center px-6 pt-16 pb-8" style={{ backgroundColor: "#FDF7FA" }}>
        {/* Pink Bear Mascot */}
        <div className="mb-8">
          <Image src="/images/momo.png" alt="Momo mascot" width={64} height={64} className="w-16 h-16" />
        </div>

        {/* App Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-2" style={{ fontFamily: "var(--font-monomaniac-one)" }}>
            ももとおひっこし
          </h1>
          <h2 className="text-4xl font-bold text-black" style={{ fontFamily: "var(--font-monomaniac-one)" }}>
            へようこそ
          </h2>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6 mt-8">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* User ID Field */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-black text-base font-medium">
              ユーザーID（メールアドレス）
            </Label>
            <Input
              id="username"
              type="email"
              {...register("username")}
              className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black placeholder:text-gray-500"
              placeholder="example@email.com"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-black text-base font-medium">
              パスワード
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black placeholder:text-gray-500"
              placeholder="パスワードを入力"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="text-center mt-12 mb-8">
            <p className="text-black text-base">ももと引越しでは、</p>
            <p className="text-black text-base">あなたの引越しをサポートします</p>
          </div>

          <div className="w-full space-y-4 mt-auto pb-8">
            <Button
              className="w-full h-14 bg-red-500 hover:bg-red-600 text-white text-lg font-medium rounded-full border-0"
              asChild
            >
              <Link href="/signup">新規登録</Link>
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-lg font-medium rounded-full border-0"
            >
              {isSubmitting ? 'ログイン中...' : 'ログイン'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
