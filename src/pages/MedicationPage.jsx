import { useState, useEffect } from 'react'

// ── Notion 直連設定 ────────────────────────────────────────────────
const NOTION_KEY = import.meta.env.VITE_NOTION_API_KEY
const NOTION_DB  = import.meta.env.VITE_NOTION_DATABASE_ID ?? '2d85578cd933803b9c9a000b56a13618'
const NOTION_VER = '2025-09-03'

function nProp(prop, type) {
  if (!prop) return type === 'multi' ? [] : ''
  switch (type) {
    case 'title':  return prop.title?.map(r => r.plain_text).join('') ?? ''
    case 'text':   return prop.rich_text?.map(r => r.plain_text).join('') ?? ''
    case 'select': return prop.select?.name ?? ''
    case 'multi':  return prop.multi_select?.map(o => o.name) ?? []
    case 'files':
      return (prop.files ?? []).map(f =>
        f.type === 'file' ? f.file.url : f.type === 'external' ? f.external.url : null
      ).filter(Boolean)
    default: return ''
  }
}

async function fetchDrugsFromNotion() {
  if (!NOTION_KEY) throw new Error('尚未設定 VITE_NOTION_API_KEY，請在 .env 填入 Notion Token。')
  const results = []
  let cursor
  do {
    const body = { sorts: [{ property: '藥物分類', direction: 'ascending' }], page_size: 100 }
    if (cursor) body.start_cursor = cursor
    const resp = await fetch(`/notion-proxy/v1/data_sources/${NOTION_DB}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_VER,
      },
      body: JSON.stringify(body),
    })
    if (!resp.ok) {
      const e = await resp.json().catch(() => ({}))
      throw new Error(e.message ?? `Notion API 錯誤 HTTP ${resp.status}`)
    }
    const data = await resp.json()
    results.push(...(data.results ?? []))
    cursor = data.has_more ? data.next_cursor : undefined
  } while (cursor)
  return results
    .filter(p => p.object === 'page' && !p.archived)
    .map(p => ({
      id:          p.id,
      name:        nProp(p.properties['藥品名稱'],   'title'),
      symptoms:    nProp(p.properties['主治症狀'],   'multi'),
      storage:     nProp(p.properties['保存條件'],   'select'),
      sideEffects: nProp(p.properties['副作用'],     'multi'),
      notes:       nProp(p.properties['注意事項'],   'text'),
      categories:  nProp(p.properties['藥物分類'],   'multi'),
      mechanism:   nProp(p.properties['藥理作用'],   'text'),
      images:      nProp(p.properties['外觀'],       'files'),
      keywords:    nProp(p.properties['關鍵字/外觀'], 'text'),
      updatedAt:   p.last_edited_time,
    }))
}

function PageHeader({ emoji, title, subtitle, color }) {
  return (
    <div className={`${color} py-12 px-6 text-center`}>
      <div className="text-6xl mb-4">{emoji}</div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-500 text-sm max-w-xl mx-auto">{subtitle}</p>
    </div>
  )
}

// ── 藥庫資料區塊 ──────────────────────────────────────────

const CATEGORY_COLORS = {
  '退燒藥':   'bg-red-100 text-red-700',
  '抗組織胺': 'bg-purple-100 text-purple-700',
  '止咳化痰': 'bg-blue-100 text-blue-700',
  '腸胃用藥': 'bg-amber-100 text-amber-700',
  '抗生素':   'bg-pink-100 text-pink-700',
  '外用藥':   'bg-teal-100 text-teal-700',
  '其他':     'bg-gray-100 text-gray-600',
}

function categoryBadge(cat) {
  return CATEGORY_COLORS[cat] ?? 'bg-gray-100 text-gray-600'
}

function DrugCard({ drug }) {
  const [open, setOpen] = useState(false)
  const firstImg = drug.images?.[0]

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* ── 卡片標題（點擊展開） ── */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4 px-4 py-4">
          {/* 圖片或預設圖示 */}
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-teal-50 flex items-center justify-center border border-gray-100">
            {firstImg
              ? <img src={firstImg} alt={drug.name} className="w-full h-full object-cover" />
              : <span className="text-3xl">💊</span>
            }
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="font-bold text-gray-800 text-sm leading-snug">{drug.name}</p>
              <span className="text-gray-400 text-sm shrink-0 mt-0.5">{open ? '▲' : '▼'}</span>
            </div>

            {/* 藥物分類標籤 */}
            {drug.categories?.length > 0 && (
              <div className="flex gap-1 flex-wrap mt-1">
                {drug.categories.map(c => (
                  <span key={c} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryBadge(c)}`}>
                    {c}
                  </span>
                ))}
              </div>
            )}

            {/* 主治症狀標籤 */}
            {drug.symptoms?.length > 0 && (
              <div className="flex gap-1 flex-wrap mt-1.5">
                {drug.symptoms.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </button>

      {/* ── 展開詳細資訊 ── */}
      {open && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3">
          {/* 多張圖片 */}
          {drug.images?.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {drug.images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${drug.name} 外觀 ${i + 1}`}
                  className="h-28 rounded-xl object-cover shrink-0 border border-gray-100"
                />
              ))}
            </div>
          )}

          {drug.mechanism && (
            <div>
              <p className="text-xs font-semibold text-teal-700 mb-1">🔬 藥理作用</p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{drug.mechanism}</p>
            </div>
          )}

          {drug.sideEffects?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-orange-600 mb-1">⚠️ 副作用</p>
              <div className="flex gap-1 flex-wrap">
                {drug.sideEffects.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {drug.notes && (
            <div>
              <p className="text-xs font-semibold text-red-600 mb-1">📋 注意事項</p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{drug.notes}</p>
            </div>
          )}

          {drug.storage && (
            <div>
              <p className="text-xs font-semibold text-indigo-600 mb-1">📦 保存條件</p>
              <p className="text-sm text-gray-600">{drug.storage}</p>
            </div>
          )}

          {drug.keywords && (
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-1">🏷️ 關鍵字 / 外觀</p>
              <p className="text-sm text-gray-500">{drug.keywords}</p>
            </div>
          )}

          {drug.updatedAt && (
            <p className="text-xs text-gray-300 text-right pt-1">
              更新：{new Date(drug.updatedAt).toLocaleDateString('zh-TW')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function DrugDatabase() {
  const [drugs, setDrugs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('全部')

  useEffect(() => {
    fetchDrugsFromNotion()
      .then(setDrugs)
      .catch(err => setError(err.message ?? '無法載入藥庫'))
      .finally(() => setLoading(false))
  }, [])

  // 從 multi_select 收集所有分類
  const categories = ['全部', ...Array.from(new Set(drugs.flatMap(d => d.categories ?? []).filter(Boolean)))]

  const filtered = drugs.filter(d => {
    const q = search.trim().toLowerCase()
    const matchSearch = !q ||
      d.name.toLowerCase().includes(q) ||
      (d.symptoms ?? []).some(s => s.toLowerCase().includes(q)) ||
      (d.keywords ?? '').toLowerCase().includes(q)
    const matchCat = activeCat === '全部' || (d.categories ?? []).includes(activeCat)
    return matchSearch && matchCat
  })

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4 animate-spin">⏳</div>
        <p className="text-gray-500 text-sm">正在從 Notion 載入藥庫…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center">
        <p className="text-4xl mb-3">⚠️</p>
        <p className="font-bold text-red-700 mb-2">無法連線至藥庫</p>
        <p className="text-sm text-red-500">{error}</p>
        <p className="text-xs text-gray-400 mt-4">
          請確認已完成 Notion 整合設定並部署至 Vercel。
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* 搜尋框 */}
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="搜尋藥品名稱、症狀、關鍵字…"
          className="w-full border-2 border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm outline-none focus:border-teal-400 transition-colors"
        />
      </div>

      {/* 藥物分類篩選 */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCat === c ? 'bg-teal-500 text-white shadow-sm' : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-4">
        顯示 {filtered.length} / {drugs.length} 筆藥品
      </p>

      {/* 藥品卡片列表 */}
      <div className="space-y-3">
        {filtered.length > 0
          ? filtered.map(d => <DrugCard key={d.id} drug={d} />)
          : (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-2">🔎</p>
              <p className="text-sm">找不到符合的藥品</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

// ── 退燒藥劑量表 ──────────────────────────────────────────

const acetWeights = [
  { kg: '3–4',  dose: '60',      freq: '每 4–6 小時' },
  { kg: '5–6',  dose: '80–120',  freq: '每 4–6 小時' },
  { kg: '7–9',  dose: '120–160', freq: '每 4–6 小時' },
  { kg: '10–12',dose: '160–200', freq: '每 4–6 小時' },
  { kg: '13–15',dose: '200–240', freq: '每 4–6 小時' },
  { kg: '16–19',dose: '240–320', freq: '每 4–6 小時' },
  { kg: '20–24',dose: '320–400', freq: '每 4–6 小時' },
]

const ibuWeights = [
  { kg: '5–7',  dose: '50',      freq: '每 6–8 小時' },
  { kg: '8–10', dose: '75–100',  freq: '每 6–8 小時' },
  { kg: '11–15',dose: '100–150', freq: '每 6–8 小時' },
  { kg: '16–19',dose: '150–200', freq: '每 6–8 小時' },
  { kg: '20–24',dose: '200–250', freq: '每 6–8 小時' },
]

const forbiddenMeds = [
  { name: '阿斯匹靈（Aspirin）',  reason: '18 歲以下禁用，可能導致雷氏症候群（致命）', urgent: true },
  { name: '成人感冒藥',            reason: '含有不適合幼兒的成分（如抗組織胺）', urgent: true },
  { name: '止瀉藥（Loperamide）', reason: '2 歲以下禁用，可能抑制腸道蠕動造成危險', urgent: true },
  { name: '抗組織胺（苯海拉明）', reason: '2 歲以下禁用，可能過度鎮靜', urgent: false },
  { name: '布洛芬（Ibuprofen）',  reason: '6 個月以下嬰兒禁用', urgent: false },
  { name: '四環黴素類抗生素',      reason: '8 歲以下禁用（影響骨骼牙齒發育）', urgent: false },
  { name: '任何成人鎮靜安眠藥',   reason: '絕對不可用於幼兒', urgent: true },
]

const principles = [
  { icon: '⚖️', title: '依體重計算劑量', desc: '幼兒用藥需依體重換算，不可以年齡粗估。' },
  { icon: '🕐', title: '遵守給藥間隔',   desc: '頻繁給藥可能造成肝腎傷害，嚴格遵守間隔時間。' },
  { icon: '🏥', title: '醫師處方才給藥', desc: '抗生素、類固醇等藥物需醫師評估，不可自行購買。' },
  { icon: '🚫', title: '不任意混用藥物', desc: '成人綜合感冒藥成分複雜，幼兒使用風險高。' },
  { icon: '📦', title: '藥物妥善保存',   desc: '存放於陰涼乾燥處，避免陽光直射及高溫。' },
  { icon: '🔒', title: '置於幼兒拿不到處', desc: '藥物外觀鮮豔，幼兒易誤食，請上鎖保存。' },
]

// ── 主頁面 ────────────────────────────────────────────────

const MAIN_TABS = [
  { id: 'principles', label: '📋 用藥原則' },
  { id: 'fever',      label: '🌡️ 退燒藥劑量' },
  { id: 'forbidden',  label: '🚫 禁用藥物' },
  { id: 'database',   label: '💊 幼生藥庫' },
]

export default function MedicationPage({ navigate }) {
  const [tab, setTab]   = useState('principles')
  const [med, setMed]   = useState('acet')

  return (
    <div>
      <PageHeader
        emoji="💊"
        title="用藥衛教"
        subtitle="嬰幼兒用藥原則、退燒藥劑量計算與幼生藥庫"
        color="bg-gradient-to-br from-teal-50 to-cyan-100"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Top-level tabs */}
        <div className="flex rounded-2xl bg-teal-50 p-1 mb-10 gap-1 overflow-x-auto">
          {MAIN_TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-white text-teal-700 shadow' : 'text-teal-600 hover:bg-teal-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── 用藥原則 ── */}
        {tab === 'principles' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map(p => (
              <div key={p.title} className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex gap-3">
                <span className="text-2xl shrink-0">{p.icon}</span>
                <div>
                  <p className="font-semibold text-teal-800 text-sm mb-1">{p.title}</p>
                  <p className="text-xs text-teal-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 退燒藥劑量 ── */}
        {tab === 'fever' && (
          <div className="space-y-5">
            <div className="flex gap-2">
              {[
                { id: 'acet', label: '乙醯胺酚（Acetaminophen）', note: '3 個月以上可用' },
                { id: 'ibu',  label: '布洛芬（Ibuprofen）',       note: '6 個月以上可用' },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMed(m.id)}
                  className={`flex-1 py-3 px-4 rounded-2xl text-sm font-semibold border-2 transition-all ${
                    med === m.id
                      ? 'bg-teal-100 border-teal-400 text-teal-800'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-teal-200'
                  }`}
                >
                  <p>{m.label}</p>
                  <p className="text-xs font-normal mt-0.5 opacity-70">{m.note}</p>
                </button>
              ))}
            </div>

            <div className="bg-white border-2 border-teal-200 rounded-3xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="text-left px-5 py-3 text-teal-800 font-semibold">體重（kg）</th>
                    <th className="text-left px-5 py-3 text-teal-800 font-semibold">每次劑量（mg）</th>
                    <th className="text-left px-5 py-3 text-teal-800 font-semibold">給藥頻率</th>
                  </tr>
                </thead>
                <tbody>
                  {(med === 'acet' ? acetWeights : ibuWeights).map((row, i) => (
                    <tr key={row.kg} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-5 py-3 font-medium text-gray-800">{row.kg}</td>
                      <td className="px-5 py-3 text-teal-700 font-bold">{row.dose} mg</td>
                      <td className="px-5 py-3 text-gray-600">{row.freq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
              <span className="text-xl shrink-0">💡</span>
              <div className="text-sm text-amber-700">
                <p className="font-semibold mb-1">計算 ml 數：需要劑量（mg）÷ 藥水濃度（mg/ml）</p>
                <p>例：需要 120mg，藥水濃度 24mg/ml → 需要 <strong>5ml</strong></p>
                <p className="mt-1 text-amber-600 text-xs">每日最大量：乙醯胺酚 75 mg/kg；布洛芬 40 mg/kg</p>
              </div>
            </div>
          </div>
        )}

        {/* ── 禁用藥物 ── */}
        {tab === 'forbidden' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">以下藥物在特定年齡前應避免給予幼兒</p>
            {forbiddenMeds.map(item => (
              <div key={item.name} className={`flex gap-4 items-start p-4 rounded-2xl border-2 ${
                item.urgent ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-100'
              }`}>
                <span className="text-2xl shrink-0">{item.urgent ? '🚨' : '⚠️'}</span>
                <div>
                  <p className={`font-bold text-sm mb-0.5 ${item.urgent ? 'text-red-700' : 'text-amber-700'}`}>
                    {item.name}
                  </p>
                  <p className={`text-sm ${item.urgent ? 'text-red-600' : 'text-amber-600'}`}>
                    {item.reason}
                  </p>
                </div>
              </div>
            ))}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mt-4 flex gap-3">
              <span className="text-xl shrink-0">📞</span>
              <p className="text-sm text-teal-700">
                懷疑誤食藥物？請立即撥打
                <strong> 毒藥物諮詢專線：0800-000-985</strong>（24 小時）
              </p>
            </div>
          </div>
        )}

        {/* ── 幼生藥庫 ── */}
        {tab === 'database' && (
          <div>
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6 flex gap-3">
              <span className="text-xl shrink-0">📡</span>
              <p className="text-sm text-teal-700 leading-relaxed">
                藥庫資料來自 <strong>Notion 幼生藥庫</strong>，由托育護理人員持續更新。
                點擊藥品名稱可展開詳細劑量與注意事項。
              </p>
            </div>
            <DrugDatabase />
          </div>
        )}

        <div className="mt-10 text-center">
          <button onClick={() => navigate('home')} className="text-sm text-orange-500 hover:text-orange-700 underline">
            ← 返回首頁
          </button>
        </div>
      </div>
    </div>
  )
}
