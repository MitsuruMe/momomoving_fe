import { Skeleton } from "@/components/ui/skeleton"

export default function DestinationLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-sm mx-auto px-6 pt-12 pb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>
      </div>

      <div className="max-w-sm mx-auto px-6">
        <Skeleton className="w-full h-48 rounded-3xl mb-4" />
        <Skeleton className="h-6 w-20 mx-auto mb-8" />

        <Skeleton className="h-6 w-12 mb-3" />
        <Skeleton className="w-full h-12 rounded-lg mb-8" />

        <Skeleton className="w-full h-14 rounded-full" />
      </div>
    </div>
  )
}
