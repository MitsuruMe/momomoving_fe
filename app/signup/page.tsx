"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [movingDate, setMovingDate] = useState("")

  const handleStart = () => {
    router.push("/destination")
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
        <div className="w-full max-w-sm mx-auto space-y-6">
          {/* User ID Field */}
          <div className="space-y-2">
            <Label htmlFor="userId" className="text-black text-base font-medium">
              ユーザーID
            </Label>
            <Input id="userId" type="text" className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-black text-base font-medium">
              パスワード
            </Label>
            <Input id="password" type="password" className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black" />
          </div>

          {/* Postal Code Field */}
          <div className="space-y-2">
            <Label htmlFor="postalCode" className="text-black text-base font-medium">
              引越し前の郵便番号
            </Label>
            <Input id="postalCode" type="text" className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black" />
          </div>

          {/* Moving Date Field */}
          <div className="space-y-2">
            <Label htmlFor="movingDate" className="text-black text-base font-medium">
              引越し予定日
            </Label>
            <Input
              id="movingDate"
              type="date"
              value={movingDate}
              onChange={(e) => setMovingDate(e.target.value)}
              className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black"
            />
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="w-full max-w-sm mx-auto px-6 pb-8 mt-auto">
        <Button
          onClick={handleStart}
          className="w-full h-14 bg-red-500 hover:bg-red-600 text-white text-lg font-medium rounded-full border-0"
        >
          はじめる
        </Button>
      </div>
    </div>
  )
}
