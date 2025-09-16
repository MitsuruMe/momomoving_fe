"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/ProtectedRoute"

function DestinationContent() {
  const [stationName, setStationName] = useState("")
  const router = useRouter()

  const yamanoteStations = [
    "大崎",
    "五反田",
    "目黒",
    "恵比寿",
    "渋谷",
    "原宿",
    "代々木",
    "新宿",
    "新大久保",
    "高田馬場",
    "目白",
    "池袋",
    "大塚",
    "巣鴨",
    "駒込",
    "田端",
    "西日暮里",
    "日暮里",
    "鶯谷",
    "上野",
    "御徒町",
    "秋葉原",
    "神田",
    "東京",
    "有楽町",
    "新橋",
    "浜松町",
    "田町",
    "品川",
    "大崎",
  ]

  const handleNext = () => {
    router.push("/conditions")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-sm mx-auto px-6 pt-12 pb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black leading-tight font-mono">
              次に引越し先を
              <br />
              選んでください
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
      <div className="max-w-sm mx-auto px-6 flex-1 flex flex-col">
        {/* Station Selection Card */}
        <div className="mb-8">
          <button className="w-full bg-gray-300 rounded-3xl h-48 flex items-center justify-center mb-4 hover:bg-gray-400 transition-colors">
            <div className="text-center">
              <Image
                src="/images/train-illustration.png"
                alt="電車のイラスト"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
          </button>
          <p className="text-center text-lg font-medium text-black">駅から選ぶ</p>
        </div>

        {/* Station Name Select */}
        <div className="mb-8">
          <label htmlFor="station" className="block text-lg font-medium text-black mb-3">
            駅名
          </label>
          <Select value={stationName} onValueChange={setStationName}>
            <SelectTrigger className="w-full h-12 px-4 bg-gray-100 border-0 rounded-lg text-base">
              <SelectValue placeholder="駅を選択してください" />
            </SelectTrigger>
            <SelectContent>
              {yamanoteStations.map((station) => (
                <SelectItem key={station} value={station}>
                  {station}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="max-w-sm mx-auto px-6 pb-8">
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

export default function DestinationPage() {
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
      <DestinationContent />
    </ProtectedRoute>
  )
}
