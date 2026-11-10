import { useState } from 'react'
import { Printer } from 'lucide-react'
import { Alert, StatusBadge } from '../components/Alert'
import { ageGroups } from '../data/milestones'

// 發展分類 → 分類色 token（僅區分類別，不代表好壞；警示一律用 danger/warning/success）
// 視覺／聽覺、認知／遊戲探索 不會出現在同一月齡，各自共用一色
const catStyle = {
  '粗動作':   'bg-cat-mist-bg border-cat-mist-fg/20 text-cat-mist-fg',
  '細動作':   'bg-cat-lav-bg border-cat-lav-fg/20 text-cat-lav-fg',
  '視覺':     'bg-cat-teal-bg border-cat-teal-fg/20 text-cat-teal-fg',
  '聽覺':     'bg-cat-teal-bg border-cat-teal-fg/20 text-cat-teal-fg',
  '社會情緒': 'bg-cat-mauve-bg border-cat-mauve-fg/20 text-cat-mauve-fg',
  '語言溝通': 'bg-cat-sand-bg border-cat-sand-fg/20 text-cat-sand-fg',
  '認知':     'bg-cat-slate-bg border-cat-slate-fg/20 text-cat-slate-fg',
  '認知學習': 'bg-cat-slate-bg border-cat-slate-fg/20 text-cat-slate-fg',
  '遊戲探索': 'bg-cat-slate-bg border-cat-slate-fg/20 text-cat-slate-fg',
}

const catIcon = {
  '粗動作':   '🏃',
  '細動作':   '✋',
  '語言溝通': '🗣️',
  '認知':     '🧠',
  '認知學習': '🧠',
  '社會情緒': '💞',
  '視覺':     '👁️',
  '聽覺':     '👂',
  '遊戲探索': '🎮',
}

export default function GrowthMilestonesPage({ navigate, initialAgeId }) {
  const validInitial = ageGroups.some(g => g.id === initialAgeId) ? initialAgeId : 'm4'
  const [activeId, setActiveId] = useState(validInitial)
  const [checked, setChecked] = useState({})
  const group = ageGroups.find(g => g.id === activeId)

  const toggleCheck = key => setChecked(prev => ({ ...prev, [key]: !prev[key] }))

  const totalItems = Object.values(group.milestones).reduce((sum, items) => sum + items.length, 0)
  const checkedCount = Object.entries(group.milestones).reduce((sum, [cat, items]) => {
    return sum + items.filter((_, i) => checked[`${group.id}-${cat}-${i}`]).length
  }, 0)

  return (
    <div>
      {/* Header */}
      <div className="bg-canvas border-b border-border py-12 px-6 text-center">
        <div className="text-6xl mb-4">📏</div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-2">生長發育里程碑</h1>
        <p className="text-ink-muted text-sm max-w-xl mx-auto">
          依據臺北市學齡前兒童發展檢核表，涵蓋4個月至3歲共9個年齡段
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Source note */}
        <div className="bg-surface-muted border border-border rounded-2xl p-4 mb-8 flex gap-3">
          <span className="text-xl shrink-0">📋</span>
          <p className="text-sm text-ink leading-relaxed">
            本頁內容來源：<strong>臺北市政府衛生局・臺北市學齡前兒童發展檢核表（114年版）</strong>。
            檢核表為篩查工具，每位孩子發展速度不同；若有多項疑慮，請攜帶「健保卡」及「兒童健康手冊」至兒科或早療評估機構進一步確認。
          </p>
        </div>

        {/* Age group tabs — mobile: 3×3 grid, desktop: horizontal */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 mb-8">
          {ageGroups.map(g => (
            <button
              key={g.id}
              onClick={() => setActiveId(g.id)}
              aria-pressed={activeId === g.id}
              className={`rounded-xl py-2 px-1 text-xs font-semibold transition-all text-center leading-tight ${
                activeId === g.id ? 'bg-brand text-on-brand shadow' : 'text-ink-muted hover:bg-brand-soft hover:text-brand'
              }`}
            >
              <div className="text-base mb-0.5">{g.emoji}</div>
              {g.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="bg-surface border border-border rounded-3xl overflow-hidden">

          {/* Panel header */}
          <div className="bg-surface-muted border-b border-border p-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-4xl">{group.emoji}</span>
              <div>
                <h2 className="text-2xl font-bold text-ink">{group.label}</h2>
                <p className="text-sm text-ink-muted mt-0.5">{group.range}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface p-6 print:p-0">

            {/* Milestones */}
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                <StatusBadge tone="success">這個階段可以做到（點擊項目可勾選）</StatusBadge>
              </h3>
              <div className="flex items-center gap-3 print:hidden">
                <span className="text-xs text-ink-muted">已勾選 {checkedCount} / {totalItems} 項</span>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-brand text-on-brand px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Printer className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                  列印本階段檢核表
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {Object.entries(group.milestones).map(([cat, items]) => (
                <div
                  key={cat}
                  className={`border rounded-2xl p-4 ${catStyle[cat] ?? 'bg-surface-muted border-border text-ink'}`}
                >
                  <p className="font-semibold text-xs mb-2 flex items-center gap-1.5">
                    <span>{catIcon[cat] ?? '•'}</span>
                    <span>{cat}</span>
                  </p>
                  <ul className="space-y-1.5">
                    {items.map((item, i) => {
                      const key = `${group.id}-${cat}-${i}`
                      const isChecked = !!checked[key]
                      return (
                        <li key={i}>
                          <button
                            onClick={() => toggleCheck(key)}
                            className="text-xs leading-relaxed flex gap-1.5 text-ink text-left w-full"
                          >
                            <span className={`shrink-0 mt-0.5 w-3.5 h-3.5 rounded border flex items-center justify-center ${isChecked ? 'bg-brand border-brand text-on-brand' : 'bg-surface border-current/40'}`}>
                              {isChecked && '✓'}
                            </span>
                            <span className={isChecked ? 'line-through opacity-60' : ''}>{item}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Red flags */}
            <h3 className="font-bold text-ink text-sm mb-4 flex items-center gap-2">
              <StatusBadge tone="danger">紅旗警訊——出現以下情形請盡早就醫評估</StatusBadge>
            </h3>
            <Alert tone="danger" label="紅旗警訊" strong>
              <ul className="space-y-2 mt-1">
                {group.redFlags.map((flag, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span aria-hidden="true" className="shrink-0">★</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs mt-4 border-t border-danger-border/50 pt-3">
                出現任何紅旗警訊，請攜帶「健保卡」及「兒童健康手冊」至兒童發展篩檢服務（PeDS）院所，或至早療評估醫院進一步確認。
              </p>
            </Alert>
          </div>
        </div>

        {/* Navigation hint */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {ageGroups.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActiveId(g.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                activeId === g.id
                  ? 'bg-brand text-on-brand border-brand'
                  : 'text-ink-muted border-border hover:border-brand hover:text-brand'
              }`}
            >
              {i + 1}. {g.label}
            </button>
          ))}
        </div>

        {/* General tip */}
        <Alert tone="warning" label="提醒" className="mt-8">
          <p>
            每位孩子的發展速度不同，里程碑為「大多數孩子」可達到的範圍，並非嚴格標準。
            若孩子僅有個別項目略慢可先觀察；若有多項落後或出現上方紅旗警訊，建議主動向兒科醫師反映，必要時轉介早療資源，
            <strong>早期介入效果最好</strong>。
          </p>
        </Alert>

        {/* Related links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('vitals')}
            className="flex items-center gap-3 bg-surface border border-border rounded-2xl p-4 text-left hover:bg-brand-soft transition-colors"
          >
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-semibold text-ink text-sm">0–3歲生命徵象</p>
              <p className="text-xs text-ink-muted">體溫、心跳、呼吸正常範圍對照</p>
            </div>
            <span className="ml-auto text-brand">→</span>
          </button>
          <button
            onClick={() => navigate('emergency')}
            className="flex items-center gap-3 bg-surface border border-border rounded-2xl p-4 text-left hover:bg-brand-soft transition-colors"
          >
            <span className="text-2xl">🚑</span>
            <div>
              <p className="font-semibold text-ink text-sm">緊急狀況判斷</p>
              <p className="text-xs text-ink-muted">哪些症狀需立即就醫</p>
            </div>
            <span className="ml-auto text-brand">→</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('home')}
            className="text-sm text-brand hover:opacity-80 underline underline-offset-4"
          >
            ← 返回首頁
          </button>
        </div>
      </div>
    </div>
  )
}
