"use client"

import { useRouter } from "next/navigation"
import { Home, Search, Star, MoreHorizontal } from "lucide-react"

export default function OtherPage() {
  const router = useRouter()

  return (
    <div className="w-full max-w-sm mx-auto min-h-screen bg-white relative">
      {/* Header */}
      <header className="py-4 text-center border-b border-gray-100" style={{ backgroundColor: "#FDF7FA" }}>
        <h1 className="text-xl font-bold text-black">その他</h1>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-32 flex flex-col justify-center items-center min-h-[calc(100vh-140px)]">
        {/* User ID Section */}
        <div className="text-center mb-16">
          <h2 className="text-lg font-medium text-black mb-4">ユーザーID</h2>
          <p className="text-xl font-bold text-black">a123456789019</p>
        </div>

        {/* Logout Button */}
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-full text-lg transition-colors"
          onClick={() => {
            router.push("/login")
          }}
        >
          ログアウト
        </button>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center py-1" onClick={() => router.push("/")}>
            <Home className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">ホーム</span>
          </button>
          <button className="flex flex-col items-center py-1" onClick={() => router.push("/search")}>
            <Search className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">物件検索</span>
          </button>
          <button className="flex flex-col items-center py-1" onClick={() => router.push("/badges")}>
            <Star className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">バッチ</span>
          </button>
          <div className="flex flex-col items-center py-1">
            <MoreHorizontal className="w-6 h-6 text-red-500 mb-0.5" />
            <span className="text-xs text-red-500 font-bold">その他</span>
          </div>
        </div>
      </nav>
    </div>
  )
}
