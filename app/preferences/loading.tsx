import { Skeleton } from "@/components/ui/skeleton"

export default function PreferencesLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="max-w-sm mx-auto px-6 pt-12 pb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-8 w-40" />
          </div>
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-sm mx-auto px-6 flex-1">
        <div className="grid grid-cols-3 gap-4 mb-12">
          {Array.from({ length: 11 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-full" />
          ))}
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="max-w-sm mx-auto px-6 pb-8">
        <Skeleton className="w-full h-14 rounded-full" />
      </div>
    </div>
  )
}
