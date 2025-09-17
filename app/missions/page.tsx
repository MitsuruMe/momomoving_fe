"use client"

import { useRouter } from "next/navigation"
import { Home, Search, Star, MoreHorizontal, Target } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

// ミッション定義
interface Mission {
  id: string
  title: string
  description: string
  serviceType: 'nuro' | 'insurance'
  logo?: string
  ctaText: string
  ctaAction: () => void
}

function MissionsContent() {
  const router = useRouter()

  const missions: Mission[] = [
    {
      id: 'nuro_internet',
      title: 'NURO 光を契約しよう',
      description: 'NURO 光は、ソニーネットワークコミュニケーションズが提供する超高速光ファイバーインターネット接続サービスです',
      serviceType: 'nuro',
      ctaText: '契約する',
      ctaAction: () => {
        // 実際の契約ページへの遷移や外部リンクを実装
        console.log('NURO光契約ページへ遷移')
      }
    },
    {
      id: 'sony_insurance',
      title: 'ソニー生命の火災保険に入ろう',
      description: 'ソニー損保の新ネット火災保険は、ソニーグループが提供する火災保険サービスで、2020年から2025年までオリコン顧客満足度調査火災保険部門で連続第1位を受賞している商品です',
      serviceType: 'insurance',
      ctaText: '契約する',
      ctaAction: () => {
        // 実際の保険契約ページへの遷移や外部リンクを実装
        console.log('ソニー生命火災保険契約ページへ遷移')
      }
    }
  ]

  return (
    <div className="min-h-screen bg-white max-w-[375px] mx-auto relative">
      {/* Header */}
      <header className="py-4 text-center border-b border-gray-100" style={{ backgroundColor: "#FDF7FA" }}>
        <h1 className="text-xl font-bold text-black">スペシャルミッション</h1>
      </header>

      {/* Main Content */}
      <div className="px-4 pb-20 pt-6">
        <div className="space-y-6">
          {missions.map((mission) => (
            <div key={mission.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              {/* Mission Title */}
              <div className="mb-4">
                <h2 className="text-lg font-bold text-black leading-tight">
                  {mission.title}
                </h2>
              </div>

              {/* Mission Content */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {mission.description}
                  </p>
                </div>

                {/* Service Logo */}
                <div className="flex-shrink-0">
                  {mission.serviceType === 'nuro' ? (
                    <div className="w-20 h-12 bg-black rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm">NURO 光</span>
                    </div>
                  ) : (
                    <div className="w-20 h-12 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">SONY</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex justify-end">
                <button
                  onClick={mission.ctaAction}
                  className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-full text-sm transition-colors"
                >
                  {mission.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-blue-900">ミッションについて</h3>
          </div>
          <p className="text-xs text-blue-800 leading-relaxed">
            スペシャルミッションでは、引越しに関連するソニーグループのサービスをご紹介しています。
            お客様の新生活をより快適にするためのサービスを厳選してお届けします。
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[375px] bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          <button onClick={() => router.push("/")} className="flex flex-col items-center py-1">
            <Home className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">ホーム</span>
          </button>
          <button onClick={() => router.push("/search")} className="flex flex-col items-center py-1">
            <Search className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">物件検索</span>
          </button>
          <button className="flex flex-col items-center py-1">
            <Target className="w-6 h-6 text-red-500 mb-0.5" />
            <span className="text-xs text-red-500 font-bold">ミッション</span>
          </button>
          <button onClick={() => router.push("/badges")} className="flex flex-col items-center py-1">
            <Star className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">バッチ</span>
          </button>
          <button onClick={() => router.push("/other")} className="flex flex-col items-center py-1">
            <MoreHorizontal className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">その他</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default function MissionsPage() {
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
      <MissionsContent />
    </ProtectedRoute>
  )
}