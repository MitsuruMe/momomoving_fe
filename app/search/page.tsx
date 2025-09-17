"use client"

import { useRouter } from "next/navigation"
import { Home, Search, Star, MoreHorizontal, Target } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useUserPropertySelection, usePropertyDetails } from "@/hooks/useProperties"

function PropertySearchContent() {
  const router = useRouter()
  const { selection, clearSelection, hasSelection } = useUserPropertySelection()
  const { property, loading, error } = usePropertyDetails(selection.property_id)

  const handleSearchAgain = () => {
    router.push("/properties")
  }

  const formatRent = (rent: number) => {
    return `${(rent / 10000).toFixed(1)}万/月`
  }

  const getNetworkBadge = (property: any) => {
    if (property.nuro_available && property.sonet_available) {
      return "NURO・So-net"
    } else if (property.nuro_available) {
      return "NURO"
    } else if (property.sonet_available) {
      return "So-net"
    }
    return null
  }

  return (
    <div className="w-full max-w-sm mx-auto min-h-screen bg-white relative">
      {/* Header */}
      <header className="py-4 text-center border-b border-gray-100" style={{ backgroundColor: "#FDF7FA" }}>
        <h1 className="text-xl font-bold text-black">物件検索</h1>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-32">
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">物件情報を読み込み中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              再読み込み
            </button>
          </div>
        ) : !hasSelection || !property ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="/images/momo.png" alt="Pink bear mascot" className="w-12 h-12 object-contain" />
            </div>
            <h2 className="text-lg font-bold text-black mb-4">まだ物件を選択していません</h2>
            <p className="text-gray-600 mb-8">おすすめ物件から選択してください</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full text-base transition-colors"
              onClick={() => router.push("/properties")}
            >
              物件を選ぶ
            </button>
          </div>
        ) : (
          <>
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
                  <h3 className="text-lg font-bold text-black mb-1">{property.property_name}</h3>
                  <p className="text-gray-600 text-sm">
                    {formatRent(property.rent)} {property.room_layout}
                    {property.floor_area && `/${property.floor_area}m²`}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {property.nearest_station}徒歩{property.walk_minutes}分
                  </p>
                </div>
                {getNetworkBadge(property) && (
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
                    {getNetworkBadge(property)}
                  </div>
                )}
              </div>

              {/* Tags */}
              {property.tags && property.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Property Image */}
              <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                {property.image_urls && property.image_urls.length > 0 ? (
                  <img
                    src={property.image_urls[0]}
                    alt="Property exterior"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/property-placeholder.jpg"
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    物件画像なし
                  </div>
                )}
              </div>

              {/* Property Details Button */}
              <button
                className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-black font-medium py-2 px-4 rounded-lg text-sm transition-colors"
                onClick={() => router.push(`/properties/${property.property_id}`)}
              >
                詳細を見る
              </button>
            </div>

            {/* Contract Status Section */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-black mb-4 text-center">賃貸契約状況</h3>

              {/* Status Steps */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                  <span>内見</span>
                  <span>審査</span>
                  <span className="text-center">契約書<br />署名</span>
                  <span className="text-center">初期費用<br />支払</span>
                  <span>鍵受取</span>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: "20%" }}
                    ></div>
                  </div>

                  {/* Progress Dots */}
                  <div className="flex justify-between absolute -top-1 w-full">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <button
                onClick={() => {
                  // フロントのみの実装：実際の連絡機能は未実装
                  alert('不動産担当者への連絡機能（実装予定）')
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-full text-lg transition-colors"
              >
                不動産担当と話す
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-6">
              <button
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-full text-base transition-colors"
                onClick={handleSearchAgain}
              >
                再度物件を探す
              </button>

              <button
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-full text-base transition-colors"
                onClick={() => {
                  clearSelection()
                  router.push("/properties")
                }}
              >
                物件選択をリセット
              </button>
            </div>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center py-1" onClick={() => router.push("/")}>
            <Home className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">ホーム</span>
          </button>
          <div className="flex flex-col items-center py-1">
            <Search className="w-6 h-6 text-red-500 mb-0.5" />
            <span className="text-xs text-red-500 font-bold">物件検索</span>
          </div>
          <button className="flex flex-col items-center py-1" onClick={() => router.push("/missions")}>
            <Target className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">ミッション</span>
          </button>
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

export default function PropertySearchPage() {
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
      <PropertySearchContent />
    </ProtectedRoute>
  )
}
