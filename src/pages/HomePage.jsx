import { useState } from 'react'
import { Baby, ArrowRight, Ambulance, Info } from 'lucide-react'
import { useRole } from '../RoleContext'
import { pageIcons } from '../pageIcons'

const ageGroupTable = [
  { id: 'm4', m: 4 }, { id: 'm6', m: 6 }, { id: 'm9', m: 9 },
  { id: 'y1', m: 12 }, { id: 'y1m3', m: 15 }, { id: 'y1m6', m: 18 },
  { id: 'y2', m: 24 }, { id: 'y2m6', m: 30 }, { id: 'y3', m: 36 },
]

function nearestAgeGroupId(months) {
  return ageGroupTable.reduce((closest, t) =>
    Math.abs(months - t.m) < Math.abs(months - closest.m) ? t : closest
  ).id
}

function dietStageLabel(months) {
  if (months < 6) return '母乳／配方奶為主，準備開始認識副食品'
  if (months < 9) return '副食品初期：細滑泥狀，優先提供高鐵食物'
  if (months < 12) return '泥狀至粗泥，可開始嘗試手指食物'
  if (months < 18) return '軟爛小塊狀，練習自己進食'
  if (months < 36) return '家庭食物（軟），建立規律三餐加點心'
  return '接近成人飲食，均衡攝取六大類食物'
}

const cards = [
  {
    id: 'growth',
    title: '生長發育里程碑',
    desc: '0–3歲各階段動作、語言、社交情緒發展指標與紅旗警訊',
    grad: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'symptoms',
    title: '常見症狀處理',
    desc: '發燒、感冒、腹瀉、咳嗽等居家照護與就醫時機判斷',
    grad: 'from-sky-50 to-blue-50',
    border: 'border-sky-200',
    badge: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'vaccination',
    title: '預防接種',
    desc: '公費/自費疫苗時程、反應與禁忌、個人化試算、預防保健與新生兒篩檢',
    grad: 'from-violet-50 to-purple-50',
    border: 'border-violet-200',
    badge: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'dietary',
    title: '營養與餵食',
    desc: '母乳、配方奶、副食品添加（含BLW）、1-3歲均衡飲食與斷奶轉銜',
    grad: 'from-amber-50 to-orange-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'emergency',
    title: '緊急狀況判斷',
    desc: '哪些症狀需立即就醫？熱痙攣、異物哽塞緊急處理步驟',
    grad: 'from-red-50 to-rose-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
  },
  {
    id: 'medication',
    title: '用藥與托藥管理',
    desc: '退燒藥劑量計算、禁用藥物、幼生藥庫、三讀五對托藥SOP',
    grad: 'from-teal-50 to-cyan-50',
    border: 'border-teal-200',
    badge: 'bg-teal-100 text-teal-700',
  },
  {
    id: 'diseases',
    title: '認識常見疾病',
    desc: '腸病毒、RSV、肺炎、流感等幼兒常見疾病症狀與照護',
    grad: 'from-indigo-50 to-violet-50',
    border: 'border-indigo-200',
    badge: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'newborn-safety',
    title: '新生兒安全與警訊',
    desc: 'SIDS安全睡眠圖解、大便顏色卡、何時必須就醫的紅旗症狀',
    grad: 'from-cyan-50 to-blue-50',
    border: 'border-cyan-200',
    badge: 'bg-cyan-100 text-cyan-700',
  },
  {
    id: 'home-safety',
    title: '居家安全與意外預防',
    desc: '居家安全陷阱檢查、窒息燒燙傷跌倒車禍溺水預防、玩具安全標準',
    grad: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'daily-care',
    title: '日常照護與生活習慣',
    desc: '洗澡與清潔、如廁訓練、睡眠作息與夜醒處理、視力聽力口腔保健',
    grad: 'from-rose-50 to-pink-50',
    border: 'border-rose-200',
    badge: 'bg-rose-100 text-rose-700',
  },
  {
    id: 'parent-support',
    title: '心理與親職支持',
    desc: '產後情緒與伴侶分工、依附關係與正向教養、特殊家庭資源、求助管道',
    grad: 'from-fuchsia-50 to-pink-50',
    border: 'border-fuchsia-200',
    badge: 'bg-fuchsia-100 text-fuchsia-700',
  },
  {
    id: 'vitals',
    title: '0–3 歲生命徵象',
    desc: '體溫、心跳、呼吸、血氧正常值對照表與測量方式，爸媽也看得懂',
    grad: 'from-cyan-50 to-sky-50',
    border: 'border-cyan-200',
    badge: 'bg-cyan-100 text-cyan-700',
  },
  {
    id: 'growth-chart',
    title: '生長曲線知多少',
    desc: 'WHO生長曲線教學＋線上百分位估算器，早產兒矯正年齡換算',
    grad: 'from-lime-50 to-emerald-50',
    border: 'border-lime-200',
    badge: 'bg-lime-100 text-lime-700',
  },
  {
    id: 'early-learning',
    title: '早期學習與親子共讀',
    desc: '大腦開發三原則、分齡共讀技巧、感官刺激遊戲活動',
    grad: 'from-fuchsia-50 to-purple-50',
    border: 'border-fuchsia-200',
    badge: 'bg-fuchsia-100 text-fuchsia-700',
  },
  {
    id: 'caregiver',
    title: '托育人員專區',
    desc: '團體膳食菜單、感染管制與停托標準、空間安全檢核與事故通報、活動設計',
    grad: 'from-sky-50 to-blue-50',
    border: 'border-sky-200',
    badge: 'bg-sky-100 text-sky-700',
    caregiverOnly: true,
  },
  {
    id: 'caregiver-professional',
    title: '托育人員專業與法規',
    desc: '相關法規摘要、人員配置健康管理、幼兒健康監測、在職訓練、兒少保護通報',
    grad: 'from-slate-50 to-blue-50',
    border: 'border-slate-200',
    badge: 'bg-slate-100 text-slate-700',
    caregiverOnly: true,
  },
]

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
  { name: '托嬰中心感染管制手冊', desc: '疾管署發布之機構感染管制指引（供托育人員使用）', url: 'https://at.cdc.gov.tw/3Yg76d', emoji: '📙' },
]

const GrowthIcon = pageIcons['growth']
const VaccinationIcon = pageIcons['vaccination']
const DietaryIcon = pageIcons['dietary']
const DailyCareIcon = pageIcons['daily-care']

export default function HomePage({ navigate }) {
  // UTC+8 台灣時間的第幾天，確保午夜 12 點換句
  const q = quotes[Math.floor((Date.now() + 8 * 3600000) / 86400000) % quotes.length]
  const { role } = useRole()
  const visibleCards = cards.filter(c => role === 'caregiver' || !c.caregiverOnly)
  const [ageMonths, setAgeMonths] = useState(6)

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
            專為<strong className="text-ink">新手爸媽</strong>與<strong className="text-ink">托育人員</strong>設計的健康指南
          </p>
          <p className="text-sm text-ink-muted mb-10">
            內容參考衛生福利部、台灣兒科醫學會等官方資料
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('growth')}
              className="inline-flex items-center justify-center gap-2 bg-brand text-on-brand px-8 py-3.5 rounded-3xl font-semibold hover:opacity-90 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 text-base"
            >
              開始探索
              <ArrowRight className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              onClick={() => navigate('emergency')}
              className="inline-flex items-center justify-center gap-2 bg-surface text-danger-fg border-2 border-danger-border px-8 py-3.5 rounded-3xl font-semibold hover:bg-danger-bg transition-all shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-base"
            >
              <Ambulance className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
              緊急狀況
            </button>
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

      {/* ── Age-based quick nav ── */}
      <section className="py-12 px-6 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold tracking-[0.05em] text-ink text-center mb-2">🎯 依月齡快速導覽</h2>
          <p className="text-ink-muted text-center mb-6 text-sm">選擇寶寶目前月齡，直接前往對應內容</p>

          <div className="flex items-center gap-4 mb-6">
            <input
              type="range" min="0" max="36" value={ageMonths}
              onChange={e => setAgeMonths(Number(e.target.value))}
              className="flex-1 accent-brand"
            />
            <span className="text-lg font-semibold text-brand w-20 text-right shrink-0">{ageMonths} 個月</span>
          </div>

          <div className="bg-surface-muted border border-border rounded-3xl p-4 mb-5 text-sm text-ink shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
            🥣 這個階段的飲食：{dietStageLabel(ageMonths)}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => navigate('growth', nearestAgeGroupId(ageMonths))}
              className="card-hover bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-center hover:bg-emerald-100"
            >
              <GrowthIcon className="w-6 h-6 mx-auto mb-1" strokeWidth={2} aria-hidden="true" />
              <span className="text-xs font-semibold text-emerald-700">生長里程碑</span>
            </button>
            <button
              onClick={() => navigate('vaccination', 'calculator')}
              className="card-hover bg-violet-50 border border-violet-200 rounded-2xl p-3 text-center hover:bg-violet-100"
            >
              <VaccinationIcon className="w-6 h-6 mx-auto mb-1" strokeWidth={2} aria-hidden="true" />
              <span className="text-xs font-semibold text-violet-700">疫苗時程試算</span>
            </button>
            <button
              onClick={() => navigate('dietary')}
              className="card-hover bg-orange-50 border border-orange-200 rounded-2xl p-3 text-center hover:bg-orange-100"
            >
              <DietaryIcon className="w-6 h-6 mx-auto mb-1" strokeWidth={2} aria-hidden="true" />
              <span className="text-xs font-semibold text-orange-700">營養與餵食</span>
            </button>
            <button
              onClick={() => navigate('daily-care')}
              className="card-hover bg-rose-50 border border-rose-200 rounded-2xl p-3 text-center hover:bg-rose-100"
            >
              <DailyCareIcon className="w-6 h-6 mx-auto mb-1" strokeWidth={2} aria-hidden="true" />
              <span className="text-xs font-semibold text-rose-700">日常照護</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Nav Cards ── */}
      <section className="py-16 px-6 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[0.05em] text-ink text-center mb-2">📌 快速導覽</h2>
          <p className="text-ink-muted text-center mb-10 text-sm">選擇您需要的衛教主題</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleCards.map(c => {
              const Icon = pageIcons[c.id]
              return (
              <button
                key={c.id}
                onClick={() => navigate(c.id)}
                className={`card-hover group bg-gradient-to-br ${c.grad} border-2 ${c.border} rounded-3xl p-6 text-left`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-transform duration-200 group-hover:scale-110 ${c.badge}`}>
                  <Icon className="w-7 h-7" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-ink text-base mb-2">{c.title}</h3>
                <p className="text-sm text-ink-muted mb-4 leading-relaxed">{c.desc}</p>
                <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full ${c.badge}`}>
                  了解更多 →
                </span>
              </button>
              )
            })}
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
