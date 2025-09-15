"use client"

import { useRouter, useParams } from "next/navigation"
import { ChevronLeft, Home, Search, Star, MoreHorizontal } from "lucide-react"
import Image from "next/image"

const taskData = {
  "1": {
    title: "不要な物の処分",
    subtitle: "身軽になって新生活を始めましょう",
    sections: [
      {
        title: "転出届はどうして必要？",
        content:
          "私たちが受ける様々な行政サービスは、住民票の登録情報に基づいて提供されています。転出届と転入届を正しく行うことで住民票が新しい住所に移り、サービスをスムーズに受けられるようになります。",
      },
      {
        title: "大田区南の転出届の出し方",
        content:
          "東京都大田区から他の市区町村へ引越し（転出）する際には、事前に転出届を提出する必要があります。手続きは、区役所の窓口、郵送、またはオンライン（マイナポータル）で行うことができます。",
        hasAiBadge: true,
      },
    ],
  },
  "2": {
    title: "インターネット選び",
    subtitle: "サクサクネットを楽しもう！",
    sections: [
      {
        title: "インターネット選びのポイント",
        content: "新居でのインターネット環境を整えるために、速度、料金、工事の有無などを比較検討しましょう。",
      },
    ],
  },
  "3": {
    title: "火災保険を選ぼう",
    subtitle: "リーズナブルかつ安心な保険を選ぼう",
    sections: [
      {
        title: "火災保険の重要性",
        content: "新居での生活を守るため、適切な火災保険を選択することが重要です。",
      },
    ],
  },
  "4": {
    title: "転出届を出そう",
    subtitle: "今住んでいる自治体にお別れを告げよう",
    sections: [
      {
        title: "転出届の手続き方法",
        content: "現在お住まいの市区町村役場で転出届の手続きを行いましょう。",
      },
    ],
  },
}

export default function TaskDetailPage() {
  const router = useRouter()
  const params = useParams()
  const taskId = params.id as string
  const task = taskData[taskId as keyof typeof taskData]

  if (!task) {
    return <div>タスクが見つかりません</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-[375px] mx-auto relative">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-4" style={{ backgroundColor: "#FDF7FA" }}>
        <div className="flex items-center">
          <button onClick={() => router.back()} className="mr-4 p-1">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-center flex-1 mr-10">{task.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-20">
        {/* Motivational Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 leading-relaxed">{task.subtitle}</h2>
          </div>
          <div className="flex-shrink-0 ml-4">
            <Image src="/images/momo.png" alt="Momo mascot" width={70} height={70} className="object-contain" />
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {task.sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-900">{section.title}</h3>
                {section.hasAiBadge && (
                  <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">MOMO AI</span>
                )}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* AI Disclaimer */}
        <div className="mt-8 text-center text-xs text-gray-500 leading-relaxed">
          ※生成AI(GPT-4)により生成されました。
          <br />
          内容の正確性については別途ご確認ください
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
