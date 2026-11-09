import { TONES } from './alertTones'

/**
 * 警示區塊
 * @param tone      'danger' | 'warning' | 'success'
 * @param label     文字標籤（預設：危險／注意／正常），可改為「緊急」「提醒」「建議」等
 * @param title     標題（選填，與標籤同列顯示）
 * @param className 額外排版 class（如 mb-8）
 */
export function Alert({ tone = 'warning', label, title, className = '', children }) {
  const t = TONES[tone]
  const { Icon } = t
  return (
    <div role={tone === 'danger' ? 'alert' : 'note'} className={`border rounded-2xl p-4 flex gap-3 items-start ${t.box} ${className}`}>
      <Icon className="w-5 h-5 shrink-0 mt-1" strokeWidth={2} aria-hidden="true" />
      <div className="min-w-0 flex-1 text-sm leading-relaxed">
        <p className="font-bold mb-1">
          <span>{label ?? t.label}</span>
          {title && <span>｜{title}</span>}
        </p>
        {children}
      </div>
    </div>
  )
}

/**
 * 分級／狀態小標籤（表格、分級清單用）
 * 文字內容即為標籤，例如 <StatusBadge tone="danger">高燒</StatusBadge>
 */
export function StatusBadge({ tone = 'warning', className = '', children }) {
  const t = TONES[tone]
  const { Icon } = t
  return (
    <span className={`inline-flex items-center gap-1 border rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.box} ${className}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
      {children}
    </span>
  )
}

/** 單獨的語意圖示（給自訂版型的分級卡片用，旁邊必須有文字） */
export function ToneIcon({ tone, className = 'w-5 h-5' }) {
  const { Icon } = TONES[tone]
  return <Icon className={`shrink-0 ${className}`} strokeWidth={2} aria-hidden="true" />
}
