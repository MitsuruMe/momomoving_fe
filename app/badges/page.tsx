"use client"

import { useRouter } from "next/navigation"
import { Home, Search, Star, MoreHorizontal, Award, Target } from "lucide-react"
import Image from "next/image"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useTasks } from "@/hooks/useTasks"

// バッジ定義
interface Badge {
  id: string
  title: string
  description: string
  condition: (tasks: any[], completionRate: number) => boolean
  icon: string
  earnedMessage: string
}

const badges: Badge[] = [
  {
    id: 'first_task',
    title: '最初の一歩を踏み込めたで賞',
    description: '初回タスクを完了',
    condition: (tasks, _) => tasks.some(task => task.status === 'completed'),
    icon: '🏠',
    earnedMessage: '最初のタスクを完了しました！'
  },
  {
    id: 'ten_percent',
    title: '10%達成で賞',
    description: 'タスクを10%完了',
    condition: (_, completionRate) => completionRate >= 10,
    icon: '📈',
    earnedMessage: 'タスクの10%を達成しました！'
  },
  {
    id: 'half_way',
    title: '折り返し地点で賞',
    description: 'タスクを50%完了',
    condition: (_, completionRate) => completionRate >= 50,
    icon: '🎯',
    earnedMessage: 'タスクの半分を達成しました！'
  },
  {
    id: 'almost_there',
    title: 'もうすぐゴールで賞',
    description: 'タスクを80%完了',
    condition: (_, completionRate) => completionRate >= 80,
    icon: '🏃‍♀️',
    earnedMessage: 'もうすぐ完了です！'
  },
  {
    id: 'complete_master',
    title: '引越しマスターで賞',
    description: '全タスクを完了',
    condition: (_, completionRate) => completionRate === 100,
    icon: '👑',
    earnedMessage: '全てのタスクを完了しました！おめでとうございます！'
  },
  {
    id: 'task_warrior',
    title: 'タスクウォリアーで賞',
    description: '5つ以上のタスクを完了',
    condition: (tasks, _) => tasks.filter(task => task.status === 'completed').length >= 5,
    icon: '⚔️',
    earnedMessage: '5つ以上のタスクを完了しました！'
  }
]

function BadgesContent() {
  const router = useRouter()
  const { tasks, loading, error, getCompletionRate } = useTasks()

  if (loading) {
    return (
      <div className="min-h-screen bg-white max-w-[375px] mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white max-w-[375px] mx-auto flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            再読み込み
          </button>
        </div>
      </div>
    )
  }

  const completionRate = getCompletionRate()
  const earnedBadges = badges.filter(badge => badge.condition(tasks, completionRate))
  const unearnedBadges = badges.filter(badge => !badge.condition(tasks, completionRate))

  return (
    <div className="min-h-screen bg-white max-w-[375px] mx-auto relative">
      {/* Header */}
      <header className="py-4 text-center border-b border-gray-100" style={{ backgroundColor: "#FDF7FA" }}>
        <h1 className="text-xl font-bold text-black">バッチ</h1>
        <p className="text-sm text-gray-600 mt-1">
          獲得: {earnedBadges.length} / {badges.length}
        </p>
      </header>

      {/* Main Content */}
      <div className="px-4 pb-20 pt-6">
        {/* Earned Badges Section */}
        {earnedBadges.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              獲得済みバッジ
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-4 text-center border-2 border-yellow-300">
                  <div className="mb-3">
                    <h3 className="text-sm font-bold text-black leading-tight mb-1">
                      {badge.title}
                    </h3>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                  </div>
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">
                      {badge.icon}
                    </div>
                  </div>
                  <p className="text-xs text-green-700 font-medium">
                    ✓ 獲得済み
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unearned Badges Section */}
        {unearnedBadges.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-gray-400" />
              未獲得バッジ
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {unearnedBadges.map((badge) => (
                <div key={badge.id} className="bg-gray-100 rounded-2xl p-4 text-center border-2 border-gray-200">
                  <div className="mb-3">
                    <h3 className="text-sm font-medium text-gray-600 leading-tight mb-1">
                      {badge.title}
                    </h3>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                  </div>
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl opacity-50">
                      {badge.icon}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    頑張って獲得しよう！
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completion Summary */}
        <div className="mt-8 bg-pink-50 rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16">
              <Image src="/images/momo.png" alt="Momo mascot" width={64} height={64} className="object-contain" />
            </div>
          </div>
          <p className="text-sm text-black font-medium">
            タスク完了率: {completionRate}%
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {completionRate === 100
              ? "全てのタスクが完了しました！おめでとうございます！"
              : "引き続き頑張りましょう！"}
          </p>
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
          <button onClick={() => router.push("/missions")} className="flex flex-col items-center py-2 px-4">
            <Target className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">ミッション</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4">
            <Star className="w-6 h-6 text-red-500 fill-red-500" />
            <span className="text-xs text-red-500 mt-1 font-bold">バッチ</span>
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

export default function BadgesPage() {
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
      <BadgesContent />
    </ProtectedRoute>
  )
}
