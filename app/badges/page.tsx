"use client"

import { useRouter } from "next/navigation"
import { Home, Search, Star, MoreHorizontal } from "lucide-react"
import Image from "next/image"

export default function BadgesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white max-w-[375px] mx-auto relative">
      {/* Header */}
      <header className="py-4 text-center border-b border-gray-100" style={{ backgroundColor: "#FDF7FA" }}>
        <h1 className="text-xl font-bold text-black">バッチ</h1>
      </header>

      {/* Main Content */}
      <div className="px-4 pb-20 pt-6">
        <div className="grid grid-cols-2 gap-3">
          {/* First Badge */}
          <div className="bg-gray-100 rounded-2xl p-4 text-center">
            {/* Badge Title */}
            <div className="mb-4">
              <h2 className="text-sm font-medium text-black leading-relaxed">
                最初の一歩を踏み込め
                <br />
                たで賞
              </h2>
            </div>

            {/* Mascot Image */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 relative">
                <Image src="/images/badge-mascot.png" alt="Pink bear mascot" fill className="object-contain" />
              </div>
            </div>

            {/* Congratulations Message */}
            <p className="text-xs text-black font-medium">物件が決まってよかった！</p>
          </div>

          {/* Second Badge */}
          <div className="bg-gray-100 rounded-2xl p-4 text-center">
            {/* Badge Title */}
            <div className="mb-4">
              <h2 className="text-sm font-medium text-black leading-relaxed">ネットが使えるで賞</h2>
            </div>

            {/* Mascot Image */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 relative">
                <Image
                  src="/images/tech-mascot.png"
                  alt="Pink bear mascot with headphones"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Congratulations Message */}
            <p className="text-xs text-black font-medium">これで引越してもPS5で遊べる！</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[375px] bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <button onClick={() => router.push("/")} className="flex flex-col items-center py-2 px-4">
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">ホーム</span>
          </button>
          <button onClick={() => router.push("/search")} className="flex flex-col items-center py-2 px-4">
            <Search className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">物件検索</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4">
            <Star className="w-6 h-6 text-red-500 fill-red-500" />
            <span className="text-xs text-red-500 mt-1">バッチ</span>
          </button>
          <button onClick={() => router.push("/other")} className="flex flex-col items-center py-2 px-4">
            <MoreHorizontal className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">その他</span>
          </button>
        </div>
      </div>
    </div>
  )
}
