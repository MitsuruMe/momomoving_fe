import { Skeleton } from "@/components/ui/skeleton"

export default function ConditionsLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-sm mx-auto px-6 pt-12 pb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="ml-4 flex-shrink-0">
            <Skeleton className="w-16 h-16 rounded-full" />
          </div>
        </div>
      </div>

      <div className="max-w-sm mx-auto px-6 space-y-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </div>

      <div className="max-w-sm mx-auto px-6 pb-8 pt-12">
        <Skeleton className="w-full h-14 rounded-full" />
      </div>
    </div>
  )
}
