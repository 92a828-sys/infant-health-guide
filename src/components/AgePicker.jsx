import { useState } from 'react'
import { MAX_MONTHS } from '../data/ageGuide'

const YEARS = [0, 1, 2, 3]
const selectClass =
  'bg-surface border border-border rounded-xl px-3 py-2.5 text-base text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand'

/**
 * 月齡選擇（首頁 hero 與依月齡探索結果頁共用）
 * 不儲存任何資料：選擇只存在這個元件的 state，送出時交給 onSubmit
 */
export default function AgePicker({ initialMonths = null, onSubmit, submitLabel = '查看這個階段的重點', idPrefix = 'age' }) {
  const [years, setYears] = useState(initialMonths == null ? 0 : Math.floor(initialMonths / 12))
  const [months, setMonths] = useState(initialMonths == null ? 0 : initialMonths % 12)

  const maxMonthForYear = years * 12 + 11 > MAX_MONTHS ? MAX_MONTHS - years * 12 : 11
  const monthOptions = Array.from({ length: maxMonthForYear + 1 }, (_, i) => i)

  const changeYears = y => {
    setYears(y)
    // 選 3 歲時只能是 0 個月
    if (y * 12 + months > MAX_MONTHS) setMonths(MAX_MONTHS - y * 12)
  }

  const submit = e => {
    e.preventDefault()
    onSubmit(years * 12 + months)
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row sm:items-end gap-3">
      <div className="flex items-end gap-2">
        <label className="flex flex-col gap-1">
          <span className="sr-only">歲</span>
          <span className="relative inline-flex items-center gap-1.5">
            <select id={`${idPrefix}-years`} value={years} onChange={e => changeYears(Number(e.target.value))} className={selectClass}>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <span className="text-ink font-medium">歲</span>
          </span>
        </label>
        <label className="flex flex-col gap-1">
          <span className="sr-only">個月</span>
          <span className="relative inline-flex items-center gap-1.5">
            <select id={`${idPrefix}-months`} value={months} onChange={e => setMonths(Number(e.target.value))} className={selectClass}>
              {monthOptions.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <span className="text-ink font-medium">個月</span>
          </span>
        </label>
      </div>
      <button type="submit" className="inline-flex items-center justify-center gap-2 bg-brand text-on-brand font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
        {submitLabel}
      </button>
    </form>
  )
}
