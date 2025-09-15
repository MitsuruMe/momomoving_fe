// 日付計算ユーティリティ

// 引越し予定日までの残り日数を計算
export const calculateDaysUntilMove = (moveDate: string): number => {
  const today = new Date()
  const move = new Date(moveDate)

  // 時間を00:00:00に設定して日付のみで比較
  today.setHours(0, 0, 0, 0)
  move.setHours(0, 0, 0, 0)

  const diffTime = move.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return Math.max(0, diffDays) // 負の値は0にする
}

// 日付を日本語形式でフォーマット
export const formatDateJP = (dateString: string): string => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}年${month}月${day}日`
}

// 日付を YYYY-MM-DD 形式でフォーマット
export const formatDateISO = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// 今日の日付を YYYY-MM-DD 形式で取得
export const getTodayISO = (): string => {
  return formatDateISO(new Date())
}

// 指定した日数後の日付を YYYY-MM-DD 形式で取得
export const getDateAfterDays = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return formatDateISO(date)
}

// 日付文字列が有効かチェック
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString)
  return !isNaN(date.getTime()) && dateString.match(/^\d{4}-\d{2}-\d{2}$/) !== null
}

// 期限が近い（3日以内）かどうかを判定
export const isDeadlineSoon = (dueDateString: string): boolean => {
  const today = new Date()
  const dueDate = new Date(dueDateString)
  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays <= 3 && diffDays >= 0
}

// 期限が過ぎているかどうかを判定
export const isOverdue = (dueDateString: string): boolean => {
  const today = new Date()
  const dueDate = new Date(dueDateString)

  today.setHours(0, 0, 0, 0)
  dueDate.setHours(0, 0, 0, 0)

  return dueDate.getTime() < today.getTime()
}