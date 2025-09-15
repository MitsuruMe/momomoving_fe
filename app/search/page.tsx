"use client"

import { useRouter } from "next/navigation"
import { Home, Search, Star, MoreHorizontal } from "lucide-react"

export default function PropertySearchPage() {
  const router = useRouter()

  return (
    <div className="w-full max-w-sm mx-auto min-h-screen bg-white relative">
      {/* Header */}
      <header className="py-4 text-center border-b border-gray-100" style={{ backgroundColor: "#FDF7FA" }}>
        <h1 className="text-xl font-bold text-black">物件検索</h1>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-20">
        {/* Message Section */}
        <div className="flex items-center justify-between py-8 px-2">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-bold text-black leading-relaxed">あなたが選んでいる物件は以下の通りです</h2>
          </div>
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <img src="/images/momo.png" alt="Pink bear mascot" className="w-12 h-12 object-contain" />
          </div>
        </div>

        {/* Property Card */}
        <div className="bg-white rounded-2xl border-2 border-red-400 p-4 mb-8 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black mb-1">エクセルコード</h3>
              <p className="text-gray-600 text-sm">6.3万/月 1K/19.44m</p>
            </div>
            <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">NURO</div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">バス・トイレ別</span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">駐車場あり</span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">ペット相談</span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">独立洗面台</span>
          </div>

          <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src="/modern-dark-apartment-building-exterior.jpg"
              alt="Property exterior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Search Again Button */}
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-full text-base transition-colors"
          onClick={() => {
            // Here you would typically navigate to a search form or results page
            console.log("Search for properties again")
          }}
        >
          再度物件を探す
        </button>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center py-1" onClick={() => router.push("/")}>
            <Home className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">ホーム</span>
          </button>
          <div className="flex flex-col items-center py-1">
            <Search className="w-6 h-6 text-red-500 mb-0.5" />
            <span className="text-xs text-red-500 font-bold">物件検索</span>
          </div>
          <button className="flex flex-col items-center py-1" onClick={() => router.push("/badges")}>
            <Star className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">バッチ</span>
          </button>
          <button className="flex flex-col items-center py-1" onClick={() => router.push("/other")}>
            <MoreHorizontal className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">その他</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
