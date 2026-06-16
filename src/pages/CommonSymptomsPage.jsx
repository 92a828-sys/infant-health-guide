import { useState } from 'react'

function PageHeader({ emoji, title, subtitle, color }) {
  return (
    <div className={`${color} py-12 px-6 text-center`}>
      <div className="text-6xl mb-4">{emoji}</div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-500 text-sm max-w-xl mx-auto">{subtitle}</p>
    </div>
  )
}

const symptoms = [
  {
    id: 'fever',
    emoji: '🌡️',
    title: '發燒',
    subtitle: '體溫 ≥ 38°C（肛溫）',
    color: 'from-red-50 to-rose-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    care: [
      '補充足夠水分（母乳、配方奶、開水）',
      '穿著舒適輕薄衣物，避免包太緊',
      '體溫 ≥ 38.5°C 且不舒服時，可使用退燒藥',
      '溫水擦澡可輔助降溫（水溫約 30–37°C）',
      '記錄發燒時間、最高溫度及退燒藥使用時間',
    ],
    emergency: [
      '3 個月以下嬰兒，肛溫 ≥ 38°C',
      '任何年齡體溫 ≥ 40°C',
      '發燒超過 72 小時未退',
      '伴隨嚴重頭痛、頸部僵硬、皮膚出現紫紅色斑點',
      '出現熱痙攣（抽搐）',
      '幼兒意識不清、叫不醒',
    ],
  },
  {
    id: 'cold',
    emoji: '🤧',
    title: '感冒 / 流鼻水',
    subtitle: '病毒性上呼吸道感染',
    color: 'from-blue-50 to-sky-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    care: [
      '多休息、補充水分（母乳或開水）',
      '使用生理食鹽水滴鼻液舒緩鼻塞',
      '鼻水多時可使用球形吸鼻器輕柔清潔',
      '室內保持適當濕度（可使用加濕器）',
      '感冒通常 7–10 天自然痊癒，勿隨意使用抗生素',
    ],
    emergency: [
      '呼吸急促、呼吸時肋骨明顯下陷',
      '嘴唇或指甲呈藍紫色',
      '幼兒完全無法進食超過 24 小時',
      '症狀超過 10 天未改善或持續惡化',
      '高燒不退（配合發燒緊急原則）',
    ],
  },
  {
    id: 'cough',
    emoji: '😮‍💨',
    title: '咳嗽',
    subtitle: '區分不同類型的咳嗽',
    color: 'from-teal-50 to-emerald-50',
    border: 'border-teal-200',
    badge: 'bg-teal-100 text-teal-700',
    care: [
      '補充水分，保持喉嚨濕潤',
      '1 歲以上幼兒可少量蜂蜜（每次 2–5ml）舒緩喉嚨',
      '1 歲以下嚴禁蜂蜜（肉毒桿菌風險）',
      '避免二手菸、香水等刺激物',
      '睡眠時頭部稍微墊高可減緩咳嗽',
    ],
    emergency: [
      '犬吠樣咳嗽（克魯普咳）伴隨呼吸困難',
      '咳嗽時伴隨喘鳴音（哮鳴）',
      '呼吸急促（新生兒 >60 次/分；1 歲 >50 次/分）',
      '臉色蒼白或發紫',
      '吸入異物（如花生、硬幣）後突發劇烈咳嗽',
    ],
  },
  {
    id: 'diarrhea',
    emoji: '💧',
    title: '腹瀉',
    subtitle: '大便次數增加且水分增多',
    color: 'from-amber-50 to-yellow-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    care: [
      '持續哺乳（母乳或配方奶），不需稀釋',
      '補充口服電解質液（ORS）預防脫水',
      '可採 BRAT 飲食：香蕉、米飯、蘋果泥、吐司',
      '避免高糖飲料（果汁、運動飲料）',
      '保持肛門清潔，每次換尿布後塗抹護膚霜',
    ],
    emergency: [
      '8 小時以上無尿（脫水警訊）',
      '囟門凹陷（嬰兒脫水徵象）',
      '大便帶有大量血絲或黏液',
      '嚴重腹痛、腹脹',
      '劇烈嘔吐無法補充水分',
      '意識改變或極度虛弱',
    ],
  },
  {
    id: 'vomit',
    emoji: '🤢',
    title: '嘔吐',
    subtitle: '注意與吐奶的區別',
    color: 'from-green-50 to-lime-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
    care: [
      '嘔吐後 30 分鐘先禁食，讓腸胃休息',
      '少量多次補充口服電解質液',
      '從每 5 分鐘 5ml 開始，逐漸增量',
      '確認幼兒側臥，避免吸入嘔吐物',
      '吐奶（溢奶）與嘔吐不同，多屬正常現象',
    ],
    emergency: [
      '嘔吐物帶有血液或呈現咖啡色',
      '嘔吐物呈膽汁綠色（可能腸阻塞）',
      '噴射性嘔吐（2 個月內嬰兒注意幽門狹窄）',
      '持續嘔吐超過 6 小時無法補充水分',
      '頭部撞傷後出現嘔吐',
    ],
  },
  {
    id: 'rash',
    emoji: '🌸',
    title: '皮膚疹',
    subtitle: '濕疹、蕁麻疹、痱子等',
    color: 'from-pink-50 to-rose-50',
    border: 'border-pink-200',
    badge: 'bg-pink-100 text-pink-700',
    care: [
      '保持皮膚清潔乾燥，沐浴後立即塗抹保濕乳液',
      '剪短指甲，避免幼兒搔抓',
      '穿著棉質寬鬆衣物，減少摩擦',
      '找出並避免過敏原（食物、清潔劑、衣物材質）',
      '痱子：保持涼爽通風，用清水沖洗',
    ],
    emergency: [
      '全身性紅疹伴隨發燒、呼吸困難（可能過敏反應）',
      '皮膚出現紫紅色不會消退的斑點（可能敗血症）',
      '皮疹迅速擴散且幼兒狀況差',
      '眼睛、嘴唇、喉嚨腫脹（血管性水腫）',
      '已知嚴重過敏史，接觸過敏原後出現疹子',
    ],
  },
]

function SymptomCard({ s }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`bg-gradient-to-br ${s.color} border-2 ${s.border} rounded-3xl overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">{s.emoji}</span>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{s.title}</h3>
            <p className="text-sm text-gray-500">{s.subtitle}</p>
          </div>
        </div>
        <span className="text-gray-400 text-xl transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
          ▾
        </span>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-4">
          <div className="bg-white/70 rounded-2xl p-4">
            <h4 className="font-semibold text-gray-700 text-sm mb-3">🏠 居家照護建議</h4>
            <ul className="space-y-2">
              {s.care.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <span className="text-green-400 shrink-0">✓</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50/80 border border-red-200 rounded-2xl p-4">
            <h4 className="font-semibold text-red-700 text-sm mb-3">🚨 立即就醫時機</h4>
            <ul className="space-y-2">
              {s.emergency.map((e, i) => (
                <li key={i} className="flex gap-2 text-sm text-red-700">
                  <span className="shrink-0">⚠️</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CommonSymptomsPage({ navigate }) {
  return (
    <div>
      <PageHeader
        emoji="🌡️"
        title="常見症狀處理"
        subtitle="點擊各症狀展開居家照護建議與就醫時機"
        color="bg-gradient-to-br from-sky-50 to-blue-100"
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 mb-10 flex gap-3 items-start">
          <span className="text-2xl shrink-0">🚨</span>
          <div>
            <p className="font-bold text-red-700 text-sm mb-1">緊急情況請立即撥打 119 或前往急診</p>
            <p className="text-xs text-red-600">若幼兒出現意識不清、呼吸困難、嚴重過敏等症狀，不要等待，請立即就醫。</p>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {symptoms.map(s => <SymptomCard key={s.id} s={s} />)}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm text-amber-700 leading-relaxed">
            <strong>何時應帶幼兒就醫？</strong>若您直覺覺得「不太對勁」，請相信家長的直覺，
            就算最後什麼都沒有，帶去看醫生也是正確的選擇。
            比較狀況總是可以在下次更準確地判斷。
          </p>
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => navigate('home')} className="text-sm text-orange-500 hover:text-orange-700 underline">
            ← 返回首頁
          </button>
        </div>
      </div>
    </div>
  )
}
