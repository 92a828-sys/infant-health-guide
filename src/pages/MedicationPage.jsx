import { useState } from 'react'

// ── 靜態藥品資料庫 ────────────────────────────────────────────────
// 新增藥品：在此陣列加一筆物件即可，欄位說明見下方範例
const DRUG_DATA = [
  {
    id: '1',
    name: '乙醯胺酚（Acetaminophen／普拿疼）',
    categories: ['退燒藥'],
    symptoms: ['發燒', '頭痛', '牙痛', '注射後疼痛'],
    mechanism: '抑制中樞神經前列腺素合成，達到退燒與止痛效果。不具抗發炎作用。',
    sideEffects: ['過量使用導致肝損傷', '皮膚紅疹（少見）'],
    notes: '每次劑量 10–15 mg/kg，每 4–6 小時一次，每日不超過 5 次。\n3 個月以上嬰兒即可使用。\n過量使用是兒童急性肝衰竭最常見原因，請嚴格依體重計算。',
    storage: '室溫陰涼乾燥處，避免陽光直射',
    keywords: '白色、橢圓形、糖漿劑、栓劑',
  },
  {
    id: '2',
    name: '布洛芬（Ibuprofen）',
    categories: ['退燒藥'],
    symptoms: ['發燒', '頭痛', '耳痛', '肌肉痠痛', '關節疼痛'],
    mechanism: '非類固醇消炎藥（NSAID），抑制前列腺素合成，具退燒、止痛、抗發炎三效。',
    sideEffects: ['腸胃不適', '噁心', '空腹使用易胃痛'],
    notes: '每次劑量 5–10 mg/kg，每 6–8 小時一次。\n6 個月以下嬰兒禁用。\n建議飯後或與食物一起服用，以減少腸胃刺激。\n脫水或腸胃炎期間避免使用。',
    storage: '室溫陰涼乾燥處',
    keywords: '橙色、糖漿劑',
  },
  {
    id: '3',
    name: '氯苯那敏（Chlorpheniramine，CTM）',
    categories: ['抗組織胺'],
    symptoms: ['過敏性鼻炎', '蕁麻疹', '皮膚癢', '流鼻水'],
    mechanism: '第一代抗組織胺，競爭性阻斷 H1 受體，抑制過敏反應。具鎮靜作用。',
    sideEffects: ['嗜睡', '口乾', '便秘', '尿瀦留'],
    notes: '2 歲以下不建議常規使用。\n服藥後可能嗜睡，避免在需要注意力的時段給藥。\n劑量依體重遵醫師指示。',
    storage: '室溫陰涼乾燥處',
    keywords: '黃色、白色小錠、糖漿',
  },
  {
    id: '4',
    name: '西替利嗪（Cetirizine）',
    categories: ['抗組織胺'],
    symptoms: ['過敏性鼻炎', '慢性蕁麻疹', '皮膚癢', '眼睛癢'],
    mechanism: '第二代抗組織胺，選擇性阻斷 H1 受體，嗜睡副作用較第一代低。',
    sideEffects: ['輕微嗜睡（少數）', '頭痛', '口乾'],
    notes: '6 個月以上嬰兒可使用。\n6 個月–1 歲：2.5 mg / 天；1–5 歲：2.5–5 mg / 天；6 歲以上：5–10 mg / 天。\n每日一次，建議睡前服用。',
    storage: '室溫陰涼乾燥處',
    keywords: '白色錠劑、糖漿',
  },
  {
    id: '5',
    name: '氨溴索（Ambroxol）',
    categories: ['止咳化痰'],
    symptoms: ['痰多', '黏稠不易咳出', '支氣管炎', '肺炎輔助'],
    mechanism: '促進呼吸道分泌物液化，增加纖毛運動，幫助痰液排出。',
    sideEffects: ['偶爾噁心', '腸胃不適'],
    notes: '建議多補充水分以增強化痰效果。\n通常於餐後給藥。\n劑量依體重及年齡遵醫師指示。',
    storage: '室溫陰涼乾燥處',
    keywords: '白色錠劑、糖漿、草莓口味',
  },
  {
    id: '6',
    name: '右美沙芬（Dextromethorphan，DXM）',
    categories: ['止咳化痰'],
    symptoms: ['乾咳', '夜間咳嗽影響睡眠'],
    mechanism: '中樞性鎮咳藥，作用於腦幹咳嗽中樞，抑制咳嗽反射。',
    sideEffects: ['嗜睡', '頭暈', '噁心'],
    notes: '2 歲以下不建議使用。\n有痰的濕咳不適合使用（會使痰液積聚）。\n過量使用有中樞神經抑制風險。',
    storage: '室溫陰涼乾燥處',
    keywords: '糖漿',
  },
  {
    id: '7',
    name: '益生菌（Probiotics）',
    categories: ['腸胃用藥'],
    symptoms: ['腹瀉', '腸胃炎後調理', '抗生素後腸菌恢復', '脹氣', '便秘'],
    mechanism: '補充腸道益生菌（如 Lactobacillus、Bifidobacterium），維持腸道菌叢平衡，縮短病毒性腸胃炎病程。',
    sideEffects: ['少數初期脹氣（通常數日後消失）'],
    notes: '可與食物或奶水一起服用。\n服用抗生素期間建議間隔 2 小時再補充益生菌。\n冷藏型益生菌請放冰箱保存。',
    storage: '依產品標示（部分需冷藏）',
    keywords: '粉包、膠囊、滴劑',
  },
  {
    id: '8',
    name: '口服電解質液（ORS）',
    categories: ['腸胃用藥'],
    symptoms: ['腹瀉脫水補充', '嘔吐後電解質補充', '發燒補水'],
    mechanism: '含適當比例的鈉、鉀、葡萄糖，利用腸道共同轉運機制快速補充水分與電解質。',
    sideEffects: ['極少副作用'],
    notes: '腹瀉期間不建議以白開水或運動飲料取代，應使用專用口服電解質液。\n少量多次餵食，避免一次大量引起嘔吐。\n開封後冷藏，24 小時內用完。',
    storage: '開封前室溫，開封後冷藏24小時內使用',
    keywords: '液體、蘋果口味、白葡萄口味',
  },
  {
    id: '9',
    name: '氧化鋅軟膏（Zinc Oxide）',
    categories: ['外用藥'],
    symptoms: ['尿布疹', '皮膚紅腫', '輕微擦傷', '皮膚保護'],
    mechanism: '在皮膚表面形成保護膜，隔絕尿液和糞便對皮膚的刺激，同時具輕微收斂與抗菌作用。',
    sideEffects: ['極少，偶爾局部皮膚刺激'],
    notes: '換尿布時清潔後薄薄塗抹，可厚塗於尿布疹嚴重處。\n不可塗抹在感染性傷口或黴菌感染部位。\n若尿布疹3天未改善或出現水泡膿包，需就醫。',
    storage: '室溫陰涼乾燥處',
    keywords: '白色軟膏、乳霜',
  },
  {
    id: '10',
    name: '生理食鹽水（Normal Saline 0.9%）',
    categories: ['外用藥'],
    symptoms: ['鼻塞洗鼻', '眼睛異物沖洗', '傷口清潔', '霧化吸入稀釋'],
    mechanism: '與人體體液等滲透壓，用於清潔沖洗，不刺激黏膜。',
    sideEffects: ['無'],
    notes: '洗鼻時使用專用洗鼻器，嬰兒可用滴管每側鼻孔滴2–3滴後輕輕吸出。\n開封後注意保存，建議24小時內用完（單次包裝最佳）。\n霧化吸入時可用於稀釋藥液（依醫師指示）。',
    storage: '室溫，開封後盡快使用',
    keywords: '透明液體、生食水、NS',
  },
]

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
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('全部')

  const categories = ['全部', ...Array.from(new Set(DRUG_DATA.flatMap(d => d.categories ?? []).filter(Boolean)))]

  const filtered = DRUG_DATA.filter(d => {
    const q = search.trim().toLowerCase()
    const matchSearch = !q ||
      d.name.toLowerCase().includes(q) ||
      (d.symptoms ?? []).some(s => s.toLowerCase().includes(q)) ||
      (d.keywords ?? '').toLowerCase().includes(q)
    const matchCat = activeCat === '全部' || (d.categories ?? []).includes(activeCat)
    return matchSearch && matchCat
  })

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
              <span className="text-xl shrink-0">💊</span>
              <p className="text-sm text-teal-700 leading-relaxed">
                收錄幼兒常見藥品的分類、適應症、注意事項與保存方式，由護理及托育人員整理維護。
                點擊藥品名稱可展開詳細資訊。
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
