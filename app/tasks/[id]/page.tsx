"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ChevronLeft, Home, Search, Star, MoreHorizontal, Check, Circle, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useTasks } from "@/hooks/useTasks"
import { useUser } from "@/hooks/useUser"
import { useBulkWasteInfo } from "@/hooks/useAI"
import type { Task } from "@/lib/types"

export default function TaskDetailPage() {
  const router = useRouter()
  const params = useParams()
  const taskId = params.id as string
  const { tasks, updateTaskStatus, loading, error } = useTasks()
  const { user } = useUser()

  const [task, setTask] = useState<Task | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [customNotes, setCustomNotes] = useState("")
  const [updateError, setUpdateError] = useState<string | null>(null)

  // 不用品処分タスクの場合のみ粗大ゴミ情報を取得
  const shouldFetchWasteInfo = task?.task_name.includes('不用品の処分') || false
  console.log('不用品処分タスクかどうか:', shouldFetchWasteInfo)

  const { wasteInfo, loading: wasteLoading, error: wasteError } = useBulkWasteInfo(shouldFetchWasteInfo)

  console.log('粗大ゴミ情報状態:', { wasteInfo, wasteLoading, wasteError })

  // タスクデータの取得
  useEffect(() => {
    if (tasks.length > 0) {
      const foundTask = tasks.find(t => t.user_task_id === taskId)
      if (foundTask) {
        setTask(foundTask)
        setCustomNotes(foundTask.custom_notes || "")
      }
    }
  }, [tasks, taskId])

  // ローディング状態
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 max-w-[375px] mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  // エラー状態
  if (error || !task) {
    return (
      <div className="min-h-screen bg-gray-50 max-w-[375px] mx-auto flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-red-600 mb-4">{error || 'タスクが見つかりません'}</p>
          <Button onClick={() => router.back()} variant="outline">
            戻る
          </Button>
        </div>
      </div>
    )
  }

  // タスクステータス更新
  const handleStatusToggle = async () => {
    setIsUpdating(true)
    setUpdateError(null)

    const newStatus = task.status === 'completed' ? 'pending' : 'completed'

    const success = await updateTaskStatus(task.user_task_id, {
      status: newStatus,
      custom_notes: customNotes,
    })

    if (success) {
      setTask(prev => prev ? { ...prev, status: newStatus } : null)
    } else {
      setUpdateError('ステータスの更新に失敗しました')
    }

    setIsUpdating(false)
  }

  // メモ保存
  const handleSaveNotes = async () => {
    setIsUpdating(true)
    setUpdateError(null)

    const success = await updateTaskStatus(task.user_task_id, {
      custom_notes: customNotes,
    })

    if (!success) {
      setUpdateError('メモの保存に失敗しました')
    }

    setIsUpdating(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-[375px] mx-auto relative">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-4" style={{ backgroundColor: "#FDF7FA" }}>
        <div className="flex items-center">
          <button onClick={() => router.back()} className="mr-4 p-1">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-center flex-1 mr-10">{task.task_name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-20">
        {/* Error Message */}
        {updateError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-sm">{updateError}</p>
          </div>
        )}

        {/* Task Status Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {task.status === 'completed' ? (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white stroke-2" />
                </div>
              ) : (
                <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center">
                  <Circle className="w-4 h-4 text-gray-300" />
                </div>
              )}
              <div>
                <h2 className="font-bold text-gray-900">{task.task_name}</h2>
                <p className="text-sm text-gray-600">
                  ステータス: {task.status === 'completed' ? '完了' : task.status === 'in_progress' ? '進行中' : '未完了'}
                </p>
              </div>
            </div>
            <Button
              onClick={handleStatusToggle}
              disabled={isUpdating}
              variant={task.status === 'completed' ? 'outline' : 'default'}
              className={task.status === 'completed' ? 'border-red-500 text-red-500 hover:bg-red-50' : 'bg-green-500 hover:bg-green-600'}
            >
              {isUpdating ? '更新中...' : task.status === 'completed' ? '未完了に戻す' : '完了にする'}
            </Button>
          </div>
        </div>

        {/* Task Information */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h3 className="text-base font-bold text-gray-900 mb-3">タスクの詳細</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">説明</p>
              <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">カテゴリ</p>
              <p className="text-sm text-gray-600">{task.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">期限</p>
              <p className="text-sm text-gray-600">{task.due_date}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">優先度</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
              </span>
            </div>
          </div>
        </div>

        {/* Custom Notes Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h3 className="text-base font-bold text-gray-900 mb-3">メモ</h3>
          <div className="space-y-3">
            <Label htmlFor="custom_notes" className="text-sm font-medium text-gray-700">
              カスタムメモ
            </Label>
            <textarea
              id="custom_notes"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full h-24 resize-none border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="タスクに関するメモを入力してください..."
            />
            <Button
              onClick={handleSaveNotes}
              disabled={isUpdating}
              variant="outline"
              className="w-full"
            >
              {isUpdating ? '保存中...' : 'メモを保存'}
            </Button>
          </div>
        </div>

        {/* Internet PR Section */}
        {task.task_name.includes('インターネット') && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
            <h3 className="text-lg font-bold text-black mb-4">おすすめなインターネット回線！</h3>

            <div className="border border-gray-300 rounded-lg p-6 relative">
              {/* PR Label */}
              <div className="absolute top-2 right-2">
                <span className="bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded">PR</span>
              </div>

              {/* NURO Logo */}
              <div className="text-center mb-4">
                <div className="inline-block bg-black text-white px-6 py-3 rounded font-bold text-xl">
                  NURO 光
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 leading-relaxed mb-6">
                下り最大10Gbps または 2Gbpsのプランが選べる高速光回線
              </p>

              {/* Apply Button */}
              <div className="text-right">
                <button
                  onClick={() => {
                    // フロントのみの実装：実際の申し込み機能は未実装
                    alert('NURO光申し込みページへの遷移（実装予定）')
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full text-sm transition-colors"
                >
                  申し込む
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Fire Insurance PR Section */}
        {task.task_name.includes('火災保険') && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
            <h3 className="text-lg font-bold text-black mb-4">引越し先でおすすめな火災保険</h3>

            <div className="border border-gray-300 rounded-lg p-6 relative">
              {/* PR Label */}
              <div className="absolute top-2 right-2">
                <span className="bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded">PR</span>
              </div>

              <div className="flex items-start gap-4">
                {/* Sony Fire Insurance Logo */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-16 border-2 border-orange-400 bg-orange-50 rounded flex flex-col items-center justify-center text-center">
                    <div className="text-orange-600 text-xs font-bold leading-tight">
                      新ネット<br />火災保険
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed mb-6">
                    ソニー損保の新ネット火災保険なら、補償の組み合せが自由だから、必要な補償に絞って選べます
                  </p>
                </div>
              </div>

              {/* Apply Button */}
              <div className="text-right mt-4">
                <button
                  onClick={() => {
                    // フロントのみの実装：実際の申し込み機能は未実装
                    alert('ソニー損保火災保険申し込みページへの遷移（実装予定）')
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full text-sm transition-colors"
                >
                  申し込む
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Waste Collection Info Section */}
        {task.task_name.includes('不用品の処分') && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-black">粗大ゴミ回収情報</h3>
              <div className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                <span className="text-xs font-bold">MOMO AI</span>
              </div>
            </div>

            {wasteLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">粗大ゴミ情報を取得中...</p>
              </div>
            ) : wasteError ? (
              <div className="text-center py-4">
                <p className="text-gray-600 text-sm">粗大ゴミ情報の取得に失敗しました</p>
              </div>
            ) : wasteInfo ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{wasteInfo.info}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">粗大ゴミ情報が見つかりませんでした</p>
            )}
          </div>
        )}

        {/* Motivational Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <p className="text-sm text-gray-600 leading-relaxed">
              {task.status === 'completed' ? 'お疲れ様でした！' : 'がんばって取り組みましょう！'}
            </p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <Image src="/images/momo.png" alt="Momo mascot" width={50} height={50} className="object-contain" />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[375px] bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <button onClick={() => router.push("/")} className="flex flex-col items-center py-1">
            <Home className="w-6 h-6 text-red-500 mb-0.5" />
            <span className="text-xs text-red-500 font-bold">ホーム</span>
          </button>
          <button onClick={() => router.push("/search")} className="flex flex-col items-center py-1">
            <Search className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">物件検索</span>
          </button>
          <button onClick={() => router.push("/missions")} className="flex flex-col items-center py-1">
            <Target className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">ミッション</span>
          </button>
          <button onClick={() => router.push("/badges")} className="flex flex-col items-center py-1">
            <Star className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">バッチ</span>
          </button>
          <button onClick={() => router.push("/other")} className="flex flex-col items-center py-1">
            <MoreHorizontal className="w-6 h-6 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">その他</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
