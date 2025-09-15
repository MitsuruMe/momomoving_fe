"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ConditionsPage() {
  const router = useRouter()
  const [rent, setRent] = useState([50])
  const [area, setArea] = useState([30])
  const [age, setAge] = useState([10])
  const [walkingDistance, setWalkingDistance] = useState([5])

  const handleNext = () => {
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
      <div className="max-w-sm mx-auto px-6 flex-1 flex flex-col space-y-12">
        {/* Rent Slider */}
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <label className="block text-lg font-medium text-black mb-6">賃料</label>
            <Slider value={rent} onValueChange={setRent} max={200} min={0} step={5} className="w-full" />
          </div>
        </div>

        {/* Floor Area Slider */}
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <label className="block text-lg font-medium text-black mb-6">
              占有
              <br />
              面積
            </label>
            <Slider value={area} onValueChange={setArea} max={100} min={10} step={5} className="w-full" />
          </div>
        </div>

        {/* Building Age Slider */}
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <label className="block text-lg font-medium text-black mb-6">築年数</label>
            <Slider value={age} onValueChange={setAge} max={50} min={0} step={1} className="w-full" />
          </div>
        </div>

        {/* Walking Distance Slider */}
        <div className="space-y-4">
          <div className="pb-4">
            <label className="block text-lg font-medium text-black mb-6">駅徒歩</label>
            <Slider
              value={walkingDistance}
              onValueChange={setWalkingDistance}
              max={30}
              min={1}
              step={1}
              className="w-full"
            />
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
