import { useEffect, useState } from 'react'
import { Baby, Info } from 'lucide-react'
import { pageIcons } from '../pageIcons'
import { navGroups, emergencyPage } from '../navGroups'
import AgePicker from '../components/AgePicker'

const quotes = [
  { text: '每個孩子都有自己的節奏，陪伴比催促更重要。', icon: '🌸' },
  { text: '照顧好自己，才能照顧好寶寶。', icon: '💪' },
  { text: '孩子的笑容，是最好的育兒回饋。', icon: '😊' },
  { text: '耐心是給孩子最好的禮物。', icon: '🎁' },
  { text: '每一天的陪伴，都是孩子成長的養分。', icon: '🌱' },
  { text: '孩子不需要完美的父母，只需要真實的愛。', icon: '💛' },
  { text: '說「我愛你」永遠不嫌多，抱抱也是。', icon: '🤗' },
  { text: '育兒是一場馬拉松，不是短跑，請好好喘口氣。', icon: '🏃' },
  { text: '允許自己不完美，也允許孩子慢慢來。', icon: '🌈' },
  { text: '孩子眼中的世界，因為有你而更安全。', icon: '🛡️' },
  { text: '今天的陪伴，是明天孩子安全感的來源。', icon: '🌙' },
  { text: '犯錯不是失敗，而是一起成長的機會。', icon: '✨' },
  { text: '睡前的故事與擁抱，勝過任何昂貴的玩具。', icon: '📖' },
  { text: '溫柔而堅定，是最好的教養方式。', icon: '🌿' },
  { text: '孩子學走路會跌倒，爸媽也會，這都沒關係。', icon: '👣' },
  { text: '不必和別人的孩子比，你的寶寶已經很棒了。', icon: '⭐' },
  { text: '照顧孩子很累，但你做得比自己想像的更好。', icon: '🌺' },
  { text: '孩子記住的，往往不是你說了什麼，而是你怎麼讓他感受到愛。', icon: '💞' },
  { text: '給孩子最好的禮物，是讓他看見快樂的你。', icon: '🎀' },
  { text: '深呼吸，你已經是孩子最需要的那個人了。', icon: '🍃' },
]

const officialLinks = [
  { name: '衛福部疾病管制署', desc: '疫苗、傳染病最新資訊', url: 'https://www.cdc.gov.tw', emoji: '🔬', bg: 'bg-blue-50 border-blue-100 hover:bg-blue-100' },
  { name: '臺灣兒科醫學會', desc: '兒童健康與發展指引', url: 'https://www.pediatr.org.tw', emoji: '👨‍⚕️', bg: 'bg-green-50 border-green-100 hover:bg-green-100' },
  { name: '台灣兒童急診醫學會', desc: '兒童急診衛教資源', url: 'https://www.tspem.org.tw', emoji: '🏥', bg: 'bg-orange-50 border-orange-100 hover:bg-orange-100' },
  { name: '國民健康署', desc: '孕產婦與嬰幼兒健康', url: 'https://www.hpa.gov.tw', emoji: '📋', bg: 'bg-purple-50 border-purple-100 hover:bg-purple-100' },
]

const officialManuals = [
  { name: '兒童健康手冊（電子版）', desc: '生長發育、預防接種紀錄官方手冊', url: 'https://www.hpa.gov.tw/Pages/EBook.aspx?nodeid=1139', emoji: '📗' },
  { name: '兒童衛教手冊', desc: '早產兒出院照顧、SIDS預防、副食品等衛教內容', url: 'https://www.hpa.gov.tw/Pages/EBook.aspx?nodeid=1459', emoji: '📘' },
]

// UTC+8 台灣時間的第幾天，確保午夜 12 點換句（於初次渲染時計算一次）
function pickDailyQuote() {
  return quotes[Math.floor((Date.now() + 8 * 3600000) / 86400000) % quotes.length]
}

// 首頁主題卡片依導覽分組呈現；各分組固定一個分類色
const GROUP_CAT = {
  growth: 'bg-cat-mist-bg text-cat-mist-fg',
  health: 'bg-cat-teal-bg text-cat-teal-fg',
  care:   'bg-cat-sand-bg text-cat-sand-fg',
  parent: 'bg-cat-mauve-bg text-cat-mauve-fg',
}

function TopicCard({ page, chip, onClick }) {
  const Icon = pageIcons[page.id]
  return (
    <button onClick={onClick} className="card-hover group bg-surface border border-border rounded-2xl p-6 text-left">
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-transform duration-200 group-hover:scale-110 ${chip}`}>
        <Icon className="w-7 h-7" strokeWidth={2} aria-hidden="true" />
      </div>
      <h3 className="font-bold text-ink text-base mb-2">{page.title}</h3>
      <p className="text-sm text-ink-muted mb-4 leading-relaxed">{page.desc}</p>
      <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full ${chip}`}>
        了解更多 →
      </span>
    </button>
  )
}

export default function HomePage({ navigate, scrollTarget }) {
  const [q] = useState(pickDailyQuote)

  // 從導覽列「依月齡探索」進入時，捲動到月齡快速導覽
  useEffect(() => {
    if (!scrollTarget) return
    const t = setTimeout(() => {
      document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
    return () => clearTimeout(t)
  }, [scrollTarget])

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-canvas via-canvas to-brand-soft py-20 px-6 overflow-hidden">
        {/* 裝飾色塊（accent 僅供裝飾） */}
        <span aria-hidden="true" className="absolute -top-10 right-6 w-48 h-48 rounded-full bg-accent/15 pointer-events-none" />
        <span aria-hidden="true" className="absolute -bottom-12 left-4 w-40 h-40 rounded-full bg-accent/10 pointer-events-none" />
        <span aria-hidden="true" className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-brand/5 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-surface text-brand shadow-[0_10px_30px_rgba(0,0,0,0.08)] mb-6">
            <Baby className="w-11 h-11" strokeWidth={2} aria-hidden="true" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-[0.05em] text-ink mb-4 leading-tight">
            0–3歲幼兒衛教專區
          </h1>
          <p className="text-lg md:text-xl text-ink-muted mb-2">
            專為<strong className="text-ink">新手爸媽</strong>設計的幼兒健康指南
          </p>
          <p className="text-sm text-ink-muted mb-8">
            內容參考衛生福利部、台灣兒科醫學會等官方資料
          </p>

          {/* 依月齡探索入口（不儲存任何資料） */}
          <div id="age-picker" className="scroll-mt-24 bg-surface border border-border rounded-2xl p-5 sm:p-6 text-left max-w-xl mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <p className="font-bold text-ink text-lg mb-4">孩子目前幾歲幾個月？</p>
            <AgePicker onSubmit={m => navigate('age-guide', m)} idPrefix="home-age" />
            <div className="flex flex-wrap items-center justify-between gap-2 mt-4 text-sm">
              <p className="text-ink-muted">早產兒請使用矯正年齡</p>
              <button
                type="button"
                onClick={() => document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="text-brand font-semibold hover:underline underline-offset-4"
              >
                稍後再選
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-accent/10 border-y border-accent/30 py-7 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-3xl mb-2">{q.icon}</div>
          <p className="text-ink font-medium italic text-lg">「{q.text}」</p>
          <p className="text-ink-muted text-sm mt-1">— 今日育兒小語</p>
        </div>
      </section>


      {/* ── Nav Cards ── */}
      <section id="topics" className="scroll-mt-20 py-16 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[0.05em] text-ink text-center mb-2">📌 快速導覽</h2>
          <p className="text-ink-muted text-center mb-10 text-sm">選擇您需要的衛教主題</p>
          <div className="space-y-10">
            {navGroups.map(g => (
              <section key={g.id} aria-labelledby={`home-group-${g.id}`}>
                <h3 id={`home-group-${g.id}`} className="flex items-center gap-2 text-lg font-bold text-ink mb-4">
                  <g.Icon className="w-5 h-5 text-brand" strokeWidth={2} aria-hidden="true" />
                  {g.label}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {g.items.map(it => (
                    <TopicCard key={it.id} page={it} chip={GROUP_CAT[g.id]} onClick={() => navigate(it.id)} />
                  ))}
                </div>
              </section>
            ))}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <TopicCard page={emergencyPage} chip="bg-danger-bg text-danger-fg" onClick={() => navigate(emergencyPage.id)} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Official Resources ── */}
      <section className="py-14 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[0.05em] text-ink text-center mb-2">🔗 官方參考資源</h2>
          <p className="text-ink-muted text-center mb-10 text-sm">政府與醫學機構提供的權威健康資訊</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {officialLinks.map(l => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`card-hover flex items-start gap-4 p-5 rounded-2xl border-2 ${l.bg}`}
              >
                <span className="text-3xl shrink-0">{l.emoji}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm">{l.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{l.desc}</p>
                  <p className="text-xs text-blue-400 mt-1 truncate">{l.url}</p>
                </div>
                <span className="text-gray-400 ml-auto shrink-0 text-lg">↗</span>
              </a>
            ))}
          </div>

          <h3 className="text-lg font-semibold tracking-[0.05em] text-ink text-center mt-12 mb-6">📖 官方手冊下載</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {officialManuals.map(l => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-start gap-3 p-4 rounded-3xl border-2 bg-surface-muted border-border hover:bg-brand-soft shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              >
                <span className="text-2xl shrink-0">{l.emoji}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm">{l.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{l.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="py-8 px-6 bg-canvas border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-start bg-surface rounded-3xl p-5 border border-border shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
            <Info className="w-6 h-6 shrink-0 text-brand mt-0.5" strokeWidth={2} aria-hidden="true" />
            <div>
              <h3 className="font-semibold tracking-[0.05em] text-ink mb-1.5 text-sm">免責聲明</h3>
              <p className="text-sm text-ink-muted leading-[1.75]">
                本網站提供之資訊由護理師整理，
                <strong>僅供衛教參考，不得作為醫療診斷或治療之依據。</strong>
                每位幼兒狀況不同，如有健康疑慮請務必諮詢合格醫師或醫療人員。
                若遇緊急醫療狀況，請立即撥打 <strong className="text-danger-fg">119</strong>{' '}
                或前往最近急診室就醫。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
