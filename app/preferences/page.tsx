"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function PreferencesPage() {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(["NURO OK"])

  const preferences = [
    "バストイレ別",
    "エアコン",
    "駐車場",
    "2階以上",
    "ペット相談",
    "IH",
    "NURO OK",
    "ペットOK",
    "au 光OK",
  ]

  const togglePreference = (preference: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference) ? prev.filter((p) => p !== preference) : [...prev, preference],
    )
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
          {preferences.map((preference, index) => (
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
          onClick={() => (window.location.href = "/properties")}
          className="w-full h-14 bg-red-500 hover:bg-red-600 text-white text-lg font-medium rounded-full"
        >
          次へ
        </Button>
      </div>
    </div>
  )
}
