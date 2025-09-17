"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useUserPreferences } from "@/hooks/usePreferences"

function ConditionsContent() {
  const router = useRouter()
  const { preferences, updateSearchConditions } = useUserPreferences()

  // Range sliders: [min, max]
  const [rent, setRent] = useState([50, 150]) // 家賃範囲（万円）
  const [area, setArea] = useState([20, 60])  // 面積範囲（m²）
  const [walkingDistance, setWalkingDistance] = useState([15]) // 最大徒歩時間（分）

  // preferencesから初期値を設定
  useEffect(() => {
    if (preferences.maxRent || preferences.minFloorArea || preferences.maxFloorArea || preferences.maxWalkMinutes) {
      setRent([
        preferences.minFloorArea ? Math.floor(preferences.minFloorArea / 10000) : 50,
        preferences.maxRent ? Math.floor(preferences.maxRent / 10000) : 150
      ])
      setArea([
        preferences.minFloorArea || 20,
        preferences.maxFloorArea || 60
      ])
      setWalkingDistance([preferences.maxWalkMinutes || 15])
    }
  }, [preferences])

  const handleNext = () => {
    // 設定値を保存
    updateSearchConditions({
      maxRent: rent[1] * 10000, // 万円 → 円
      minFloorArea: area[0],    // m²
      maxFloorArea: area[1],    // m²
      maxWalkMinutes: walkingDistance[0] // 分
    })

    console.log('保存された条件:', {
      maxRent: rent[1] * 10000,
      minFloorArea: area[0],
      maxFloorArea: area[1],
      maxWalkMinutes: walkingDistance[0]
    })

    router.push("/preferences")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-sm mx-auto px-6 pt-12 pb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black leading-tight font-mono">
              物件選びの条件を
              <br />
              教えてください
            </h1>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white">
              <Image src="/images/momo.png" alt="Momo mascot" width={48} height={48} className="rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto px-6 flex-1 flex flex-col space-y-8">
        {/* Rent Range Slider */}
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-6">
            <label className="block text-lg font-medium text-black mb-2">家賃</label>
            <div className="text-sm text-gray-600 mb-4">
              {rent[0]}万円 〜 {rent[1]}万円
            </div>
            <Slider
              value={rent}
              onValueChange={setRent}
              max={300}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0万円</span>
              <span>300万円</span>
            </div>
          </div>
        </div>

        {/* Floor Area Range Slider */}
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-6">
            <label className="block text-lg font-medium text-black mb-2">専有面積</label>
            <div className="text-sm text-gray-600 mb-4">
              {area[0]}m² 〜 {area[1]}m²
            </div>
            <Slider
              value={area}
              onValueChange={setArea}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>10m²</span>
              <span>100m²</span>
            </div>
          </div>
        </div>

        {/* Walking Distance Slider */}
        <div className="space-y-4">
          <div className="pb-6">
            <label className="block text-lg font-medium text-black mb-2">駅徒歩</label>
            <div className="text-sm text-gray-600 mb-4">
              最大 {walkingDistance[0]}分
            </div>
            <Slider
              value={walkingDistance}
              onValueChange={setWalkingDistance}
              max={30}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>1分</span>
              <span>30分</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="max-w-sm mx-auto px-6 pb-8 pt-12">
        <Button
          onClick={handleNext}
          className="w-full h-14 bg-red-500 hover:bg-red-600 text-white text-lg font-medium rounded-full"
        >
          次へ
        </Button>
      </div>
    </div>
  )
}

export default function ConditionsPage() {
  return (
    <ProtectedRoute
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">読み込み中...</p>
          </div>
        </div>
      }
    >
      <ConditionsContent />
    </ProtectedRoute>
  )
}
