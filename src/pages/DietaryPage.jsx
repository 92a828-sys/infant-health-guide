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

const solidFoods = [
  {
    range: '4–6 個月',
    emoji: '🌾',
    texture: '細滑泥狀',
    foods: ['米糊、燕麥糊（無麩質優先）', '南瓜泥、地瓜泥', '蘋果泥、香蕉泥', '胡蘿蔔泥'],
    tips: ['從單一食材開始，每次嘗試新食材觀察 3–5 天', '一次一種新食物，確認無過敏反應', '不加鹽、糖或調味料'],
  },
  {
    range: '7–8 個月',
    emoji: '🥦',
    texture: '泥狀至粗泥',
    foods: ['各種蔬菜泥（花椰菜、青豆、菠菜）', '肉泥（雞肉、豬肉）', '豆腐泥', '蛋黃（6 個月後可嘗試）'],
    tips: ['可開始混合食材', '質地逐漸加粗', '每日 1–2 次副食品'],
  },
  {
    range: '9–11 個月',
    emoji: '🍗',
    texture: '軟爛小塊狀',
    foods: ['軟煮米飯、粥', '軟嫩肉片、魚肉（去骨）', '蛋（全蛋）', '各種水果小塊', '豆類（軟煮）'],
    tips: ['可以手指食物（Finger Food）練習自主進食', '餐具練習：勺子、杯子', '每日 2–3 次副食品'],
  },
  {
    range: '12–18 個月',
    emoji: '🍱',
    texture: '家庭食物（軟）',
    foods: ['軟米飯、麵條', '各類蔬菜（切小塊）', '各類肉類、魚類', '起司、全脂優格', '各種水果'],
    tips: ['與家人同桌吃飯，建立飲食習慣', '少量鹽可接受（< 1g/天）', '練習使用湯匙自己進食'],
  },
  {
    range: '18 個月–3 歲',
    emoji: '🍽️',
    texture: '接近成人食物',
    foods: ['各類主食、蔬菜、蛋白質', '全脂牛奶（1 歲後，每日 500ml 以下）', '堅果醬（確認無過敏）'],
    tips: ['建立規律三餐加 1–2 次點心', '避免邊吃邊玩手機或看電視', '尊重孩子飢飽感，不強迫進食'],
  },
]

const avoidFoods = [
  { food: '蜂蜜', reason: '1 歲前嚴禁，含肉毒桿菌芽孢，嬰兒腸道無法抵抗', urgent: true },
  { food: '生的蛋/肉/魚', reason: '沙門氏菌等細菌感染風險', urgent: true },
  { food: '全脂牛奶（飲用）', reason: '1 歲前不可作為主要飲料，可用於烹調少量', urgent: false },
  { food: '堅果、葡萄整顆', reason: '哽塞危險，需磨碎或切小片', urgent: true },
  { food: '高汞魚類（旗魚、鮪魚）', reason: '汞影響神經發育，每週限量', urgent: false },
  { food: '加鹽重口味食物', reason: '嬰兒腎臟未成熟，無法處理過多鈉', urgent: false },
  { food: '糖果、飲料、果汁', reason: '1 歲前避免；1–3 歲每日不超過 120ml 純果汁', urgent: false },
  { food: '低脂乳製品', reason: '3 歲前需要全脂提供足夠能量與脂肪', urgent: false },
]

export default function DietaryPage({ navigate }) {
  const [tab, setTab] = useState('solid')

  return (
    <div>
      <PageHeader
        emoji="🥣"
        title="飲食與副食品"
        subtitle="母乳哺育、配方奶選擇，以及各階段副食品添加原則"
        color="bg-gradient-to-br from-amber-50 to-orange-100"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex rounded-2xl bg-orange-100 p-1 mb-10 gap-1 overflow-x-auto">
          {[
            { id: 'breast', label: '🤱 母乳哺育' },
            { id: 'formula', label: '🍼 配方奶' },
            { id: 'solid', label: '🥣 副食品' },
            { id: 'avoid', label: '🚫 禁忌食物' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-white text-orange-700 shadow' : 'text-orange-600 hover:bg-orange-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Breastfeeding */}
        {tab === 'breast' && (
          <div className="space-y-5">
            <div className="bg-pink-50 border-2 border-pink-200 rounded-3xl p-6">
              <h2 className="font-bold text-pink-800 text-xl mb-4">🤱 母乳哺育要點</h2>
              <div className="space-y-3">
                {[
                  { q: '哺乳頻率', a: '新生兒每 2–3 小時、每日 8–12 次；不需嚴格按時，依嬰兒需求哺乳' },
                  { q: '每次哺乳時間', a: '10–20 分鐘/側；確認含乳姿勢正確，聽到吞嚥聲' },
                  { q: '母乳儲存', a: '室溫 (25°C) 4 小時；冷藏 4°C 可存 4 天；冷凍 -18°C 可存 3 個月' },
                  { q: '回奶食物', a: '薄荷、韭菜、麥芽等可能影響奶量，哺乳媽媽宜留意' },
                  { q: 'WHO 建議', a: '純母乳哺育至 6 個月，加入副食品後持續哺乳至 2 歲或更久' },
                ].map(item => (
                  <div key={item.q} className="bg-white rounded-2xl p-4">
                    <p className="font-semibold text-pink-700 text-sm mb-1">📌 {item.q}</p>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
              <span className="text-xl shrink-0">💡</span>
              <p className="text-sm text-amber-700">哺乳初期困難很常見，建議尋求泌乳顧問或母嬰親善醫院的支持。</p>
            </div>
          </div>
        )}

        {/* Formula */}
        {tab === 'formula' && (
          <div className="space-y-5">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6">
              <h2 className="font-bold text-blue-800 text-xl mb-4">🍼 配方奶使用指引</h2>
              <div className="space-y-3">
                {[
                  { q: '奶量參考', a: '0–3 個月：每次 60–120ml，每日 8 次左右；4–6 個月：每次 150–180ml，每日 5–6 次' },
                  { q: '沖泡方式', a: '先加溫水（70°C 以上殺菌），再加奶粉搖勻，冷卻至體溫後再餵' },
                  { q: '保存期限', a: '已沖好的奶粉室溫 2 小時內用完；冷藏可 24 小時；不可使用微波加熱' },
                  { q: '挑選原則', a: '選擇符合 Codex 標準、有台灣合法進口許可的品牌；1 歲前使用 1 段' },
                  { q: '更換配方', a: '若需更換奶粉，建議漸進混合替換，觀察消化狀況' },
                ].map(item => (
                  <div key={item.q} className="bg-white rounded-2xl p-4">
                    <p className="font-semibold text-blue-700 text-sm mb-1">📌 {item.q}</p>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Solid foods */}
        {tab === 'solid' && (
          <div className="space-y-5">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 mb-2">
              <span className="text-xl shrink-0">💡</span>
              <p className="text-sm text-amber-700">
                <strong>開始副食品的時機：</strong>一般建議 6 個月，但部分嬰兒在 4 個月後表現出準備好的訊號
                （可支撐坐穩、對食物感興趣、不再有推舌反射）。請與兒科醫師確認。
              </p>
            </div>
            {solidFoods.map(stage => (
              <div key={stage.range} className="bg-white border border-orange-200 rounded-3xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{stage.emoji}</span>
                  <div>
                    <p className="font-bold text-orange-800 text-base">{stage.range}</p>
                    <p className="text-xs text-orange-500">質地：{stage.texture}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">建議食材</p>
                    <ul className="space-y-1">
                      {stage.foods.map((f, i) => (
                        <li key={i} className="text-sm text-gray-600 flex gap-1.5">
                          <span className="text-orange-300">•</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">注意事項</p>
                    <ul className="space-y-1">
                      {stage.tips.map((t, i) => (
                        <li key={i} className="text-sm text-gray-600 flex gap-1.5">
                          <span className="text-green-400">✓</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Avoid foods */}
        {tab === 'avoid' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">以下食物在特定年齡前應避免給予</p>
            {avoidFoods.map(item => (
              <div key={item.food} className={`flex gap-4 items-start p-4 rounded-2xl border-2 ${item.urgent ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-100'}`}>
                <span className={`text-2xl shrink-0 ${item.urgent ? '🚨' : '⚠️'}`}>
                  {item.urgent ? '🚨' : '⚠️'}
                </span>
                <div>
                  <p className={`font-bold text-sm mb-1 ${item.urgent ? 'text-red-700' : 'text-amber-700'}`}>{item.food}</p>
                  <p className={`text-sm ${item.urgent ? 'text-red-600' : 'text-amber-600'}`}>{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button onClick={() => navigate('home')} className="text-sm text-orange-500 hover:text-orange-700 underline">
            ← 返回首頁
          </button>
        </div>
      </div>
    </div>
  )
}
