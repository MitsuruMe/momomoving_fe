"use client"

import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { ArrowLeft, Home, Search, Star, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProtectedRoute from "@/components/ProtectedRoute"
import { usePropertyDetails, useUserPropertySelection } from "@/hooks/useProperties"

function PropertyDetailsContent() {
  const router = useRouter()
  const params = useParams()
  const propertyId = params.id as string
  const { property, loading, error } = usePropertyDetails(propertyId)
  const { selectProperty } = useUserPropertySelection()

  const formatRent = (rent: number) => {
    return `${(rent / 10000).toFixed(1)}万円`
  }

  const getNetworkInfo = (property: any) => {
    const networks = []
    if (property.nuro_available) networks.push("NURO光")
    if (property.sonet_available) networks.push("So-net光")
    return networks.length > 0 ? networks.join("・") : "対応情報なし"
  }

  const handleSelectProperty = () => {
    if (property) {
      selectProperty(property.property_id)
      router.push("/search")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">物件詳細を読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-4">
          <p className="text-red-600 mb-4">{error || "物件が見つかりませんでした"}</p>
          <Button
            onClick={() => router.back()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            戻る
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm mx-auto min-h-screen bg-white relative">
      {/* Header */}
      <header className="py-4 px-4 border-b border-gray-100" style={{ backgroundColor: "#FDF7FA" }}>
        <div className="flex items-center">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-xl font-bold text-black">物件詳細</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-32">
        {/* Property Images */}
        <div className="py-4">
          {property.image_urls && property.image_urls.length > 0 ? (
            <div className="space-y-2">
              {property.image_urls.slice(0, 3).map((imageUrl, index) => (
                <div key={index} className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={`${property.property_name} - 画像${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/property-placeholder.jpg"
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">物件画像なし</span>
            </div>
          )}
        </div>

        {/* Property Info */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-2">{property.property_name}</h2>
            <p className="text-3xl font-bold text-red-500 mb-2">{formatRent(property.rent)}</p>
            <p className="text-gray-600 mb-1">{property.room_layout}</p>
            {property.floor_area && <p className="text-gray-600 mb-1">専有面積: {property.floor_area}m²</p>}
            {property.build_year && <p className="text-gray-600 mb-1">築年数: {new Date().getFullYear() - property.build_year}年</p>}
            {property.floor && <p className="text-gray-600 mb-1">階数: {property.floor}</p>}
          </div>

          {/* Address */}
          {property.address && (
            <div>
              <h3 className="text-lg font-bold text-black mb-2">住所</h3>
              <p className="text-gray-700">{property.address}</p>
            </div>
          )}

          {/* Station Access */}
          <div>
            <h3 className="text-lg font-bold text-black mb-2">交通</h3>
            <p className="text-gray-700">
              {property.nearest_station}徒歩{property.walk_minutes}分
            </p>
          </div>

          {/* Internet */}
          <div>
            <h3 className="text-lg font-bold text-black mb-2">インターネット</h3>
            <p className="text-gray-700">{getNetworkInfo(property)}</p>
          </div>

          {/* Facilities */}
          {property.facilities && (
            <div>
              <h3 className="text-lg font-bold text-black mb-2">設備</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(property.facilities).map(([key, value]) => {
                  const facilityNames: { [key: string]: string } = {
                    auto_lock: "オートロック",
                    separate_bathroom: "バス・トイレ別",
                    balcony: "バルコニー",
                    parking: "駐車場",
                    pet_allowed: "ペット可",
                    furnished: "家具付き",
                    air_conditioning: "エアコン",
                    washing_machine: "洗濯機",
                    security_camera: "防犯カメラ"
                  }

                  return (
                    <div
                      key={key}
                      className={`text-sm p-2 rounded ${
                        value ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {facilityNames[key] || key}: {value ? "○" : "×"}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tags */}
          {property.tags && property.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-black mb-2">特徴</h3>
              <div className="flex flex-wrap gap-2">
                {property.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {property.description && (
            <div>
              <h3 className="text-lg font-bold text-black mb-2">物件詳細</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <Button
            onClick={handleSelectProperty}
            className="w-full h-14 bg-red-500 hover:bg-red-600 text-white text-lg font-medium rounded-full"
          >
            この物件を選択
          </Button>

          <Button
            onClick={() => router.push("/properties")}
            className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 text-base font-medium rounded-full"
          >
            他の物件を見る
          </Button>
        </div>
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
          <button className="flex flex-col items-center py-1" onClick={() => router.push("/other")}>
            <MoreHorizontal className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">その他</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default function PropertyDetailsPage() {
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
      <PropertyDetailsContent />
    </ProtectedRoute>
  )
}