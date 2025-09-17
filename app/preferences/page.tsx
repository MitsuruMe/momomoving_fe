"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useUserPreferences } from "@/hooks/usePreferences"

function PreferencesContent() {
  const router = useRouter()
  const { preferences, updateSelectedTags, updateSearchConditions } = useUserPreferences()
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(preferences.selectedTags || [])

  // preferencesから初期値を設定
  useEffect(() => {
    const initialPreferences = [...(preferences.selectedTags || [])]

    // 光回線の設定を初期状態に反映
    if (preferences.nuroAvailable) {
      initialPreferences.push("NURO光対応")
    }
    if (preferences.sonetAvailable) {
      initialPreferences.push("So-net光対応")
    }

    setSelectedPreferences(initialPreferences)
  }, [preferences.selectedTags, preferences.nuroAvailable, preferences.sonetAvailable])

  const preferenceOptions = [
    "バス・トイレ別",
    "エアコン",
    "駐車場",
    "2階以上",
    "ペット相談",
    "IH",
    "NURO光対応",
    "ペット可",
    "So-net光対応",
  ]

  const togglePreference = (preference: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference) ? prev.filter((p) => p !== preference) : [...prev, preference],
    )
  }

  const handleNext = () => {
    // まず古いデータをクリア（デバッグ用）
    console.log('=== プリファレンス保存開始 ===')
    console.log('選択されたpreferences:', selectedPreferences)

    // NURO光とSo-net光を別パラメータとして処理
    const regularTags = selectedPreferences.filter(tag =>
      tag !== "NURO光対応" && tag !== "So-net光対応"
    )

    const nuroSelected = selectedPreferences.includes("NURO光対応")
    const sonetSelected = selectedPreferences.includes("So-net光対応")

    console.log('正規タグ:', regularTags)
    console.log('NURO選択:', nuroSelected)
    console.log('So-net選択:', sonetSelected)

    // タグと光回線の設定を保存
    updateSelectedTags(regularTags)

    // 光回線の設定を別途保存
    updateSearchConditions({
      nuroAvailable: nuroSelected || undefined,
      sonetAvailable: sonetSelected || undefined
    })

    // 保存後の確認
    setTimeout(() => {
      const saved = localStorage.getItem('user_preferences')
      console.log('保存後のLocalStorage:', saved)
    }, 100)

    router.push("/properties")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-sm mx-auto px-6 pt-12 pb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black leading-tight font-mono">
              お部屋選びの
              <br />
              ポイントを選んでください
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
      <div className="max-w-sm mx-auto px-6 flex-1">
        <div className="grid grid-cols-3 gap-4 mb-12">
          {preferenceOptions.map((preference, index) => (
            <button
              key={index}
              onClick={() => togglePreference(preference)}
              className={`
                aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-colors
                ${
                  selectedPreferences.includes(preference)
                    ? "bg-red-500 text-white"
                    : "bg-gray-400 text-white hover:bg-gray-500"
                }
              `}
            >
              {preference}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="max-w-sm mx-auto px-6 pb-8">
        <Button
          onClick={handleNext}
          className="w-full h-14 bg-red-500 hover:bg-red-600 text-white text-lg font-medium rounded-full"
        >
          次へ ({selectedPreferences.length}個選択中)
        </Button>
      </div>
    </div>
  )
}

export default function PreferencesPage() {
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
      <PreferencesContent />
    </ProtectedRoute>
  )
}
