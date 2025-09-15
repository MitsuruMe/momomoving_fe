"use client"

import { useRouter } from "next/navigation"
import { Check, Home, Search, Star, MoreHorizontal } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from "@/context/AuthContext"

function MovingAppContent() {
  const router = useRouter()
  const { logout } = useAuth()

  const tasks = [
    {
      id: 1,
      title: "不要なものの処分",
      subtitle: "身軽に新生活を始めましょう",
      completed: true,
    },
    {
      id: 2,
      title: "インターネット選び",
      subtitle: "サクサクネットを楽しもう！",
      completed: true,
    },
    {
      id: 3,
      title: "火災保険を選ぼう",
      subtitle: "リーズナブルかつ安心な保険を選ぼう",
      completed: true,
    },
    {
      id: 4,
      title: "転出届を出そう",
      subtitle: "今住んでいる自治体にお別れを告げよう",
      completed: true,
    },
  ]

  const handleLogout = () => {
    logout()
  }

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
            10<span className="text-5xl font-black">日</span>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-6 px-2">
            <span className="text-sm text-black font-medium">完了率</span>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: "80%", backgroundColor: "#ef4444" }}
                ></div>
              </div>
            </div>
            <span className="text-sm font-bold text-black">80%</span>
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
            {tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between p-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-0.5">
                      <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                        <Check className="w-4 h-4 text-white stroke-2" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-black mb-1 text-base">{task.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{task.subtitle}</p>
                    </div>
                  </div>
                  <button className="detail-button" onClick={() => router.push(`/tasks/${task.id}`)}>
                    詳細
                  </button>
                </div>
              </div>
            ))}
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
