function PageHeader({ emoji, title, subtitle, color }) {
  return (
    <div className={`${color} py-12 px-6 text-center`}>
      <div className="text-6xl mb-4">{emoji}</div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
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
        phase: '立即觀察（撞傷後 24 小時）',
        content: '檢查意識清醒度、有無嘔吐（超過 2 次）、哭鬧是否可安撫、有無不對稱出現的頭皮血腫',
      },
      {
        phase: '立即送急診的警訊',
        content: '意識不清或叫不醒、反覆嘔吐、抽搐、頭骨凹陷感、耳/鼻流出清澈液體、瞳孔大小不一',
      },
      {
        phase: '居家觀察（輕微撞傷）',
        content: '2 歲以下若從 > 1 公尺高度跌落、2 歲以上從 > 1.5 公尺跌落，建議就醫評估；觀察期間 2–4 小時叫醒一次確認狀態',
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
        <div className="bg-red-600 text-white rounded-3xl p-6 mb-10 text-center shadow-lg">
          <p className="text-5xl font-black mb-2">📞 119</p>
          <p className="text-xl font-bold mb-1">緊急醫療救護</p>
          <p className="text-red-200 text-sm">遇到緊急醫療狀況，請立即撥打 119</p>
        </div>

        {/* Immediate ER signs */}
        <div className="bg-red-50 border-2 border-red-300 rounded-3xl p-6 mb-10">
          <h2 className="font-bold text-red-800 text-xl mb-4">🚨 立即送急診的症狀</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {immediateER.map((s, i) => (
              <div key={i} className="flex gap-2 items-start text-sm text-red-700">
                <span className="text-red-400 shrink-0 mt-0.5">⚠️</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

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

        {/* CPR reminder */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-3xl p-6 mb-6">
          <h2 className="font-bold text-purple-800 text-lg mb-3">💜 嬰幼兒 CPR 基本要點</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '評估環境安全', icon: '👀', desc: '確保現場安全，不讓救助者受傷' },
              { step: '確認反應', icon: '📢', desc: '輕拍腳底（嬰兒）或肩膀，大聲呼喚' },
              { step: '叫人撥 119', icon: '📞', desc: '立即叫人求助，啟動緊急救護體系' },
            ].map(c => (
              <div key={c.step} className="bg-white rounded-2xl p-4 text-center">
                <span className="text-3xl mb-2 block">{c.icon}</span>
                <p className="font-semibold text-purple-700 text-sm mb-1">{c.step}</p>
                <p className="text-xs text-gray-500">{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-purple-600 mt-4 text-center">
            強烈建議家長與托育人員參加<strong>嬰幼兒急救訓練課程</strong>，學習完整 CPR 技術。
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
