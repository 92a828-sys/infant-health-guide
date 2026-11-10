import { Phone } from 'lucide-react'
import { Alert, ToneIcon } from '../components/Alert'

function PageHeader({ emoji, title, subtitle, color }) {
  return (
    <div className={`${color} py-12 px-6 text-center`}>
      <div className="text-6xl mb-4">{emoji}</div>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-500 text-sm max-w-xl mx-auto">{subtitle}</p>
    </div>
  )
}

const immediateER = [
  '無呼吸、心跳停止',
  '意識不清、叫不醒、無反應',
  '呼吸急促、嚴重呼吸困難（肋骨明顯下陷）',
  '嘴唇、指甲呈現藍紫色（發紺）',
  '嚴重出血無法控制',
  '頭部嚴重撞傷後意識不清或嘔吐',
  '吞入或嗆入異物造成呼吸困難',
  '全身性嚴重過敏（蕁麻疹＋呼吸困難）',
  '3 個月以下嬰兒肛溫 ≥ 38°C',
  '任何年齡體溫 ≥ 40°C',
  '痙攣（抽搐）超過 5 分鐘',
  '皮膚出現紫紅色斑點不消退',
]

const emergencies = [
  {
    id: 'choking',
    emoji: '😮',
    title: '異物哽塞（嗆到）',
    color: 'bg-red-50 border-red-200',
    head: 'text-red-700',
    steps: [
      {
        phase: '確認嚴重程度',
        content: '能有效咳嗽→鼓勵持續咳嗽；若咳嗽微弱、無法發聲、臉色發紫→立即施救並叫人撥打 119',
      },
      {
        phase: '嬰兒（< 1 歲）施救步驟',
        content: '①托住頭頸，臉朝下趴放大腿上 ②手掌根部在兩肩胛骨間用力拍背 5 下 ③翻正，兩指在胸骨下端按壓 5 下 ④重複直到異物排出或失去意識',
      },
      {
        phase: '幼兒（≥ 1 歲）哈姆立克法',
        content: '①站到孩子身後，雙手環抱腹部 ②一手握拳放於肚臍上方兩指處 ③另一手包覆，往內往上快速衝擊 ④重複直到異物排出',
      },
      {
        phase: '失去意識時',
        content: '立即開始 CPR，每次開口吹氣前查看口中是否有可見異物，若有則取出（不可盲目手指挖掘）',
      },
    ],
  },
  {
    id: 'seizure',
    emoji: '⚡',
    title: '熱痙攣（發燒抽搐）',
    color: 'bg-orange-50 border-orange-200',
    head: 'text-orange-700',
    steps: [
      {
        phase: '發作當下',
        content: '保持冷靜，記錄發作時間。讓孩子側躺，清除周圍危險物品。',
      },
      {
        phase: '絕對不要做的事',
        content: '❌ 不要在嘴巴放任何東西（包括手指、湯匙） ❌ 不要強行壓制四肢 ❌ 不要給水或藥物',
      },
      {
        phase: '觀察重點',
        content: '記錄抽搐型態（全身或局部）、持續時間、發作時意識狀況，供醫師參考。',
      },
      {
        phase: '何時撥 119',
        content: '抽搐超過 5 分鐘、抽搐後意識長時間未恢復、24 小時內再次發作、首次發作不確定原因 → 立即送急診',
      },
    ],
  },
  {
    id: 'head',
    emoji: '🤕',
    title: '頭部撞傷',
    color: 'bg-yellow-50 border-yellow-200',
    head: 'text-yellow-700',
    steps: [
      {
        phase: '立即觀察（撞傷後最初 24 小時，密集觀察期）',
        content: '檢查意識清醒度、有無嘔吐（超過 2 次）、哭鬧是否可安撫、有無不對稱出現的頭皮血腫；白天每 2–4 小時、入睡後也應叫醒一次確認可正常清醒、反應正常',
      },
      {
        phase: '立即送急診的警訊',
        content: '意識不清或叫不醒、反覆嘔吐、抽搐、頭骨凹陷感、耳/鼻流出清澈液體、瞳孔大小不一',
      },
      {
        phase: '72 小時延長觀察期',
        content: '多數危險徵象在撞傷後24小時內出現，但部分遲發性顱內出血可能延遲顯現，建議延長留意至撞傷後72小時：期間若新出現嗜睡加重、頭痛加劇、反覆嘔吐、步態不穩或個性行為改變，仍應立即就醫',
      },
      {
        phase: '何時建議直接就醫評估',
        content: '2 歲以下若從 > 1 公尺高度跌落、2 歲以上從 > 1.5 公尺跌落，或跌落至硬質地面／撞及尖銳物，建議就醫評估，不必等待症狀出現',
      },
    ],
  },
  {
    id: 'burn',
    emoji: '🔥',
    title: '燙傷',
    color: 'bg-amber-50 border-amber-200',
    head: 'text-amber-700',
    steps: [
      {
        phase: '5 字訣：沖脫泡蓋送',
        content: '① 沖：流動冷水沖 15–20 分鐘（不可用冰水）② 脫：輕輕脫去衣物，若沾黏勿強撕 ③ 泡：浸泡冷水持續降溫 ④ 蓋：乾淨濕布覆蓋 ⑤ 送：立即就醫',
      },
      {
        phase: '不要做的事',
        content: '❌ 不要塗抹醬油、牙膏、奶油等 ❌ 不要刺破水泡 ❌ 不要用冰塊冷敷',
      },
      {
        phase: '立即就醫時機',
        content: '燙傷面積 > 手掌大小、燙傷在臉部/手部/生殖器、出現水泡、燙傷為白色或棕黑色（深度燒傷）',
      },
    ],
  },
]

export default function EmergencyPage({ navigate }) {
  return (
    <div>
      <PageHeader
        emoji="🚑"
        title="緊急狀況判斷"
        subtitle="遇到緊急狀況時，保持冷靜、迅速判斷，必要時立即撥打 119"
        color="bg-gradient-to-br from-red-50 to-rose-100"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 119 banner */}
        <a href="tel:119" className="block bg-danger-bg text-danger-fg border-2 border-danger-border rounded-3xl p-6 mb-10 text-center shadow-lg hover:opacity-90 transition-opacity">
          <p className="inline-flex items-center gap-1.5 text-sm font-bold mb-2">
            <ToneIcon tone="danger" className="w-5 h-5" />緊急
          </p>
          <p className="text-5xl font-black mb-2 inline-flex items-center justify-center gap-3 w-full">
            <Phone className="w-10 h-10" strokeWidth={2} aria-hidden="true" />119
          </p>
          <p className="text-xl font-bold mb-1">緊急醫療救護</p>
          <p className="text-sm">遇到緊急醫療狀況，請立即撥打 119</p>
        </a>

        {/* Immediate ER signs */}
        <Alert tone="danger" label="危險" title="立即送急診的症狀" strong className="mb-10">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {immediateER.map((s, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span aria-hidden="true" className="shrink-0">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Alert>

        {/* Emergency procedures */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">🆘 緊急狀況處理步驟</h2>
        <div className="space-y-6 mb-10">
          {emergencies.map(e => (
            <div key={e.id} className={`${e.color} border-2 rounded-3xl p-6`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl">{e.emoji}</span>
                <h3 className={`font-bold text-xl ${e.head}`}>{e.title}</h3>
              </div>
              <div className="space-y-4">
                {e.steps.map((step, i) => (
                  <div key={i} className="bg-white/70 rounded-2xl p-4">
                    <p className="font-semibold text-gray-700 text-sm mb-2">步驟 {i + 1}：{step.phase}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CPR full walkthrough */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-3xl p-6 mb-6">
          <h2 className="font-bold text-purple-800 text-lg mb-3">💜 嬰幼兒 CPR 完整步驟</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            {[
              { step: '評估環境安全', icon: '👀', desc: '確保現場安全，不讓救助者受傷' },
              { step: '確認反應與呼吸', icon: '📢', desc: '輕拍腳底（嬰兒）或肩膀，大聲呼喚；觀察胸部起伏5–10秒' },
              { step: '叫人撥 119、取 AED', icon: '📞', desc: '立即請人求助；若僅一人在場，先施行約2分鐘CPR再打電話' },
            ].map(c => (
              <div key={c.step} className="bg-white rounded-2xl p-4 text-center">
                <span className="text-3xl mb-2 block">{c.icon}</span>
                <p className="font-semibold text-purple-700 text-sm mb-1">{c.step}</p>
                <p className="text-xs text-gray-500">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="bg-white rounded-2xl p-4">
              <p className="font-semibold text-purple-700 text-sm mb-2">👶 嬰兒（未滿1歲）CPR</p>
              <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside">
                <li>按壓位置：胸骨下半部（兩乳頭連線中點下方），以兩指或雙手環繞拇指法按壓</li>
                <li>按壓深度：約4公分（胸廓前後徑約1/3）</li>
                <li>按壓速率：每分鐘100–120下</li>
                <li>比例：每30下按壓，給予2次人工呼吸（口對口鼻，每次約1秒，見胸部起伏即可）</li>
                <li>持續施行直到專業救護人員抵達、患者恢復反應，或施救者體力無法負荷</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-4">
              <p className="font-semibold text-purple-700 text-sm mb-2">🧒 幼兒（1–8歲）CPR</p>
              <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside">
                <li>按壓位置同為胸骨下半部，依孩子體型以單手或雙手按壓</li>
                <li>按壓深度：約5公分（胸廓前後徑約1/3）</li>
                <li>按壓速率與比例（100–120下/分，30:2）與嬰兒相同</li>
                <li>若有AED，滿1歲即可使用，優先使用兒童專用電擊貼片／衰減器，若無則使用成人款繼續施救</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-purple-200 rounded-2xl p-4">
            <p className="text-sm text-purple-700 leading-relaxed">
              🎥 <strong>影片教學：</strong>可至
              <a href="https://www.youtube.com/user/redcrossROC" target="_blank" rel="noopener noreferrer" className="underline font-semibold mx-1">
                中華民國紅十字會 YouTube 頻道
              </a>
              搜尋最新嬰幼兒CPR與異物哽塞教學影片。強烈建議家長與家中照顧者實際報名參加紅十字會、消防局等單位開設的
              <strong>嬰幼兒急救訓練課程</strong>，透過假人操作練習才能真正熟悉正確力道與節奏。
            </p>
          </div>
        </div>

        <div className="mb-6 bg-gray-50 border border-gray-200 rounded-2xl p-3 flex gap-2 text-xs text-gray-500 leading-relaxed">
          <span className="shrink-0">📋</span>
          <p>資料參考：中華民國紅十字會、台灣兒科醫學會CPR教學指引；頭部撞傷觀察期原則參考一般兒科臨床衛教建議。實際急救仍以受過認證訓練之人員操作為準，本頁僅供事前熟悉流程使用。</p>
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
