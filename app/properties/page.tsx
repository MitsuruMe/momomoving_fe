"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useRecommendedProperties, useUserPropertySelection } from "@/hooks/useProperties"
import type { Property } from "@/lib/types/property"

function PropertiesContent() {
  const router = useRouter()
  const { properties, loading, error, refetch } = useRecommendedProperties()
  const { selection, selectProperty, hasSelection } = useUserPropertySelection()
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(selection.property_id)

  const formatRent = (rent: number) => {
    return `${(rent / 10000).toFixed(1)}万/月`
  }

  const getNetworkBadge = (property: Property) => {
    if (property.nuro_available && property.sonet_available) {
      return { text: "NURO・So-net", color: "bg-black" }
    } else if (property.nuro_available) {
      return { text: "NURO", color: "bg-black" }
    } else if (property.sonet_available) {
      return { text: "So-net 光", color: "bg-red-500" }
    }
    return null
  }

  const handlePropertySelect = (property: Property) => {
    setSelectedPropertyId(property.property_id)
  }

  const handleNext = () => {
    if (selectedPropertyId) {
      selectProperty(selectedPropertyId)
      router.push("/")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">おすすめ物件を読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-4">
          <p className="text-red-600 mb-4">{error}</p>
          <Button
            onClick={refetch}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            再読み込み
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-sm mx-auto px-6 pt-12 pb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black leading-tight font-mono">
              あなたへのおすすめ
              <br />
              気になった物件を選ぼう
            </h1>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white">
              <Image src="/images/momo.png" alt="Momo mascot" width={48} height={48} className="rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Properties List */}
      <div className="max-w-sm mx-auto px-6 space-y-4 mb-12">
        {properties.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">おすすめ物件がありません</p>
            <Button
              onClick={refetch}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
            >
              再読み込み
            </Button>
          </div>
        ) : (
          properties.map((property) => {
            const networkBadge = getNetworkBadge(property)
            const isSelected = selectedPropertyId === property.property_id

            return (
              <button
                key={property.property_id}
                onClick={() => handlePropertySelect(property)}
                className={`
                  w-full p-4 rounded-2xl border-2 transition-all text-left
                  ${isSelected ? "border-red-500 bg-white" : "border-transparent bg-gray-100"}
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black">{property.property_name}</h3>
                    <p className="text-sm text-gray-600">
                      {formatRent(property.rent)} {property.room_layout}
                    </p>
                    <p className="text-sm text-gray-600">
                      {property.nearest_station}徒歩{property.walk_minutes}分
                    </p>
                  </div>
                  {networkBadge && (
                    <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${networkBadge.color}`}>
                      {networkBadge.text}
                    </div>
                  )}
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex flex-wrap gap-2 flex-1">
                    {property.tags && property.tags.length > 0 ? (
                      property.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs text-gray-700"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500">設備情報なし</span>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {property.image_urls && property.image_urls.length > 0 ? (
                      <img
                        src={property.image_urls[0]}
                        alt={property.property_name}
                        className="w-20 h-15 rounded-lg object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/property-placeholder.jpg"
                        }}
                      />
                    ) : (
                      <div className="w-20 h-15 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">画像なし</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Property Details Link */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs text-blue-600 hover:text-blue-800">
                    詳細を見る →
                  </span>
                </div>
              </button>
            )
          })
        )}
      </div>

      {/* Bottom Button */}
      <div className="max-w-sm mx-auto px-6 pb-8">
        <Button
          onClick={handleNext}
          disabled={!selectedPropertyId}
          className="w-full h-14 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white text-lg font-medium rounded-full"
        >
          {selectedPropertyId ? "この物件に決める" : "物件を選択してください"}
        </Button>
      </div>
    </div>
  )
}

export default function PropertiesPage() {
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
      <PropertiesContent />
    </ProtectedRoute>
  )
}
