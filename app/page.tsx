"use client"

import { useRouter } from "next/navigation"
import { Check, Home, Search, Star, MoreHorizontal, Circle } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from "@/context/AuthContext"
import { useUser } from "@/hooks/useUser"
import { useTasks } from "@/hooks/useTasks"

function MovingAppContent() {
  const router = useRouter()
  const { logout } = useAuth()
  const { user, loading: userLoading, error: userError } = useUser()
  const { tasks, loading: tasksLoading, error: tasksError, getCompletionRate } = useTasks()

  const handleLogout = () => {
    logout()
  }

  // ローディング状態
  if (userLoading || tasksLoading) {
    return (
      <div className="w-full max-w-sm mx-auto min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  // エラー状態
  if (userError || tasksError) {
    return (
      <div className="w-full max-w-sm mx-auto min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-red-600 mb-4">{userError || tasksError}</p>
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

  // 引っ越し予定日までの残り日数計算
  const getDaysUntilMove = (): number => {
    if (!user?.move_date) return 0

    const moveDate = new Date(user.move_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    moveDate.setHours(0, 0, 0, 0)

    const diffTime = moveDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return Math.max(0, diffDays)
  }

  const daysUntilMove = getDaysUntilMove()
  const completionRate = getCompletionRate()

  return (
    <div className="w-full max-w-sm mx-auto min-h-screen bg-white relative">
      {/* Header */}
      <header className="py-4 text-center border-b border-gray-100 relative" style={{ backgroundColor: "#FDF7FA" }}>
        <h1 className="text-xl font-bold text-black">ホーム</h1>
        <button
          onClick={handleLogout}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800"
        >
          ログアウト
        </button>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-32">
        {/* Countdown Section */}
        <div className="text-center py-6 bg-pink-50 mx-[-16px] px-4 mb-2" style={{ backgroundColor: "#FDF7FA" }}>
          <h2 className="text-lg text-black mb-4 font-medium">引越しまであと</h2>
          <div className="text-7xl font-black text-black mb-6 leading-none">
            {daysUntilMove}<span className="text-5xl font-black">日</span>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-6 px-2">
            <span className="text-sm text-black font-medium">完了率</span>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%`, backgroundColor: "#ef4444" }}
                ></div>
              </div>
            </div>
            <span className="text-sm font-bold text-black">{completionRate}%</span>
          </div>
        </div>

        {/* Mascot and Encouragement */}
        <div className="flex items-center justify-between mb-8 px-2">
          <p className="text-black text-sm font-medium flex-1 pr-4">もう少しで新生活だね！頑張ろう！</p>
          <div className="w-20 h-20 flex-shrink-0">
            <img src="/images/momo.png" alt="Pink bear mascot" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Task List */}
        <section>
          <h3 className="text-lg font-bold text-black mb-4 px-2">タスクリスト</h3>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>タスクがありません</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task.user_task_id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-start justify-between p-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-0.5">
                        {task.status === 'completed' ? (
                          <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                            <Check className="w-4 h-4 text-white stroke-2" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center">
                            <Circle className="w-3 h-3 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold mb-1 text-base ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-black'}`}>
                          {task.task_name}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{task.description}</p>
                        {task.custom_notes && (
                          <p className="text-blue-600 text-xs mt-1 italic">メモ: {task.custom_notes}</p>
                        )}
                      </div>
                    </div>
                    <button
                      className="detail-button"
                      onClick={() => router.push(`/tasks/${task.user_task_id}`)}
                    >
                      詳細
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          <div className="flex flex-col items-center py-1">
            <Home className="w-6 h-6 text-red-500 mb-0.5" />
            <span className="text-xs text-red-500 font-bold">ホーム</span>
          </div>
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

export default function MovingApp() {
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
      <MovingAppContent />
    </ProtectedRoute>
  )
}
