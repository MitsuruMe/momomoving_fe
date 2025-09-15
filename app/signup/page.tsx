"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { registerSchema, formatPostalCode } from "@/lib/utils/validation"
import { API_ENDPOINTS } from "@/lib/config/env"
import type { RegisterRequest } from "@/lib/types"

export default function SignupPage() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
  })

  // 郵便番号のフォーマット処理
  const watchedPostalCode = watch("current_postal_code")
  useEffect(() => {
    if (watchedPostalCode) {
      const formatted = formatPostalCode(watchedPostalCode)
      setValue("current_postal_code", formatted)
    }
  }, [watchedPostalCode, setValue])

  // 既にログイン済みの場合はホームページにリダイレクト
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, loading, router])

  const onSubmit = async (data: RegisterRequest) => {
    setIsSubmitting(true)
    setRegisterError(null)

    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // 登録成功後、目的地選択画面へ遷移
        router.push("/destination")
      } else {
        const errorData = await response.json()
        if (response.status === 409) {
          setRegisterError('このメールアドレスは既に登録されています')
        } else {
          setRegisterError(errorData.detail || '新規登録に失敗しました')
        }
      }
    } catch (error) {
      setRegisterError('ネットワークエラーが発生しました')
      console.error('Register error:', error)
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
      {/* Header */}
      <div className="flex items-start justify-between px-4 pt-12 pb-8 max-w-sm mx-auto w-full">
        <div className="flex-1 pr-4">
          <h1 className="text-lg font-medium text-black leading-tight font-[family-name:var(--font-noto-sans-jp)]">
            まずあなたのことを
            <br />
            教えてください
          </h1>
        </div>
        <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center bg-white flex-shrink-0">
          <Image src="/images/momo.png" alt="Momo mascot" width={32} height={32} className="object-contain" />
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mx-auto space-y-6">
          {/* Error Message */}
          {registerError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{registerError}</p>
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
              className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black"
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
              className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black"
              placeholder="パスワードを入力"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Full Name Field */}
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-black text-base font-medium">
              お名前
            </Label>
            <Input
              id="full_name"
              type="text"
              {...register("full_name")}
              className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black"
              placeholder="山田 太郎"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm">{errors.full_name.message}</p>
            )}
          </div>

          {/* Postal Code Field */}
          <div className="space-y-2">
            <Label htmlFor="current_postal_code" className="text-black text-base font-medium">
              引越し前の郵便番号
            </Label>
            <Input
              id="current_postal_code"
              type="text"
              {...register("current_postal_code")}
              className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black"
              placeholder="123-4567"
              maxLength={8}
            />
            {errors.current_postal_code && (
              <p className="text-red-500 text-sm">{errors.current_postal_code.message}</p>
            )}
          </div>

          {/* Moving Date Field */}
          <div className="space-y-2">
            <Label htmlFor="move_date" className="text-black text-base font-medium">
              引越し予定日
            </Label>
            <Input
              id="move_date"
              type="date"
              {...register("move_date")}
              className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black"
            />
            {errors.move_date && (
              <p className="text-red-500 text-sm">{errors.move_date.message}</p>
            )}
          </div>

          {/* Start Button */}
          <div className="pt-8 pb-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-lg font-medium rounded-full border-0"
            >
              {isSubmitting ? '登録中...' : 'はじめる'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
