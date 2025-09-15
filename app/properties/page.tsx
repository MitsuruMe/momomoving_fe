"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Property {
  id: string
  name: string
  price: string
  details: string
  internetTag: string
  internetTagColor: string
  amenities: string[]
  image: string
}

export default function PropertiesPage() {
  const router = useRouter()
  const [selectedProperty, setSelectedProperty] = useState<string>("1")

  const properties: Property[] = [
    {
      id: "1",
      name: "エクセルコード",
      price: "6.3万/月",
      details: "1K/19.44m",
      internetTag: "NURO",
      internetTagColor: "bg-black",
      amenities: ["バス・トイレ別", "駐車場あり", "ペット相談", "独立洗面台"],
      image: "/modern-dark-apartment-building-exterior.jpg",
    },
    {
      id: "2",
      name: "スカイコード",
      price: "6.3万/月",
      details: "1K/19.44m",
      internetTag: "So-net 光",
      internetTagColor: "bg-red-500",
      amenities: ["バス・トイレ別", "駐車場あり", "ペット相談", "独立洗面台"],
      image: "/modern-dark-apartment-building-exterior.jpg",
    },
    {
      id: "3",
      name: "エクセルコード",
      price: "6.3万/月",
      details: "1K/19.44m",
      internetTag: "NURO",
      internetTagColor: "bg-black",
      amenities: ["バス・トイレ別", "駐車場あり", "ペット相談", "独立洗面台"],
      image: "/modern-dark-apartment-building-exterior.jpg",
    },
  ]

  const selectProperty = (propertyId: string) => {
    setSelectedProperty(propertyId)
  }

  const handleNext = () => {
    router.push("/")
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
        {properties.map((property) => (
          <button
            key={property.id}
            onClick={() => selectProperty(property.id)}
            className={`
              w-full p-4 rounded-2xl border-2 transition-all
              ${selectedProperty === property.id ? "border-red-500 bg-white" : "border-transparent bg-gray-100"}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-left">
                <h3 className="text-lg font-bold text-black">{property.name}</h3>
                <p className="text-sm text-gray-600">
                  {property.price} {property.details}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${property.internetTagColor}`}>
                {property.internetTag}
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs text-gray-700"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
              <div className="ml-4 flex-shrink-0">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  width={80}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </button>
        ))}
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
