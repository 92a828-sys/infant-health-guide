function PageHeader({ emoji, title, subtitle, color }) {
  return (
    <div className={`${color} py-12 px-6 text-center`}>
      <div className="text-6xl mb-4">{emoji}</div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-500 text-sm max-w-xl mx-auto">{subtitle}</p>
    </div>
  )
}

const milestones = [
  {
    age: '0–3 個月',
    emoji: '🌙',
    color: 'from-indigo-50 to-blue-50',
    border: 'border-indigo-200',
    head: 'bg-indigo-100 text-indigo-700',
    gross: ['仰躺時頭可轉向聲音', '俯臥短暫抬頭約 45°', '四肢可做對稱動作'],
    fine: ['雙手握拳（反射性）', '注視人臉或物品', '追視水平方向移動的物體'],
    language: ['哭聲是主要溝通方式', '2 個月可發出「咕咕」聲', '對大聲聲響產生驚嚇反應'],
    social: ['注視照顧者面孔', '2 個月起出現社交性微笑', '柔和說話聲可安撫情緒'],
  },
  {
    age: '4–6 個月',
    emoji: '🌤️',
    color: 'from-sky-50 to-cyan-50',
    border: 'border-sky-200',
    head: 'bg-sky-100 text-sky-700',
    gross: ['俯臥可用手臂撐起上身', '扶坐時頭部可穩定', '開始出現翻身動作'],
    fine: ['可伸手抓物', '雙手可在身體中線合握', '開始把物品放入口中探索'],
    language: ['發出各種母音「啊、伊、嗚」', '對自己的名字有反應', '模仿簡單的口型'],
    social: ['看到熟悉的人會微笑', '4 個月會大聲笑出聲', '對陌生人開始出現好奇'],
  },
  {
    age: '7–9 個月',
    emoji: '☀️',
    color: 'from-amber-50 to-yellow-50',
    border: 'border-amber-200',
    head: 'bg-amber-100 text-amber-700',
    gross: ['可不需支撐獨坐', '開始腹部貼地爬行', '扶物站立時腿部可支撐'],
    fine: ['以拇指和其他手指捏物（鉗握）', '會從一手換到另一手', '敲打或搖晃玩具'],
    language: ['發出「媽媽」「爸爸」等音節串', '模仿聲音或動作', '理解「不行」的語氣'],
    social: ['出現陌生人焦慮', '分離焦慮明顯增加', '喜歡玩躲貓貓遊戲'],
  },
  {
    age: '10–12 個月',
    emoji: '🌟',
    color: 'from-orange-50 to-amber-50',
    border: 'border-orange-200',
    head: 'bg-orange-100 text-orange-700',
    gross: ['扶物巡走（沿家具移動）', '可自行蹲下撿物再站起', '部分幼兒已能獨立行走'],
    fine: ['精細鉗握（拇指與食指）', '可用手指對戳捏小物', '嘗試自己拿杯子喝水'],
    language: ['能說出1–2個有意義的詞', '能理解簡單指令「給我」', '用手指指向想要的東西'],
    social: ['模仿大人的動作', '會揮手再見', '拍手遊戲（大哥哥、拍拍手）'],
  },
  {
    age: '1–2 歲',
    emoji: '🎉',
    color: 'from-rose-50 to-pink-50',
    border: 'border-rose-200',
    head: 'bg-rose-100 text-rose-700',
    gross: ['獨走穩定，跌倒次數減少', '可上下樓梯（需扶持）', '18 個月可跑步但易跌'],
    fine: ['可疊 2–4 個積木', '翻書頁（多頁同翻）', '用湯匙舀食物（潑灑多）'],
    language: ['12 個月：約 5 個詞', '18 個月：約 10–20 個詞', '2 歲：開始兩個詞組合（媽媽抱）'],
    social: ['出現平行遊戲（各玩各的）', '18 個月情緒激烈（執拗期）', '模仿日常生活動作（掃地、打電話）'],
  },
  {
    age: '2–3 歲',
    emoji: '🚀',
    color: 'from-violet-50 to-purple-50',
    border: 'border-violet-200',
    head: 'bg-violet-100 text-violet-700',
    gross: ['可雙腳跳躍離地', '單腳站立 1–2 秒', '可騎三輪車'],
    fine: ['疊 6–8 個積木', '可用剪刀（需督導）', '握筆仿畫圓形和垂直線'],
    language: ['使用 3 個以上詞的句子', '說出自己的名字', '理解「大/小」「裡/外」等概念'],
    social: ['開始與同伴互動遊戲', '出現「我」的概念', '情緒較能用語言表達'],
  },
]

const redFlags = [
  { age: '2 個月', sign: '不會對聲音有反應、不會追視' },
  { age: '4 個月', sign: '不會微笑、頭頸仍完全無力' },
  { age: '6 個月', sign: '不會發聲、無法抓握物品' },
  { age: '9 個月', sign: '不會坐、不會爬、對名字無反應' },
  { age: '12 個月', sign: '不會爬、無任何字詞、不會揮手再見' },
  { age: '18 個月', sign: '仍無任何有意義詞彙、不會走路' },
  { age: '2 歲', sign: '詞彙少於 50 個、不會兩詞組合' },
  { age: '3 歲', sign: '陌生人無法理解其說話、不與他人互動' },
]

function MilestoneCard({ m }) {
  return (
    <div className={`bg-gradient-to-br ${m.color} border-2 ${m.border} rounded-3xl p-6`}>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-4xl">{m.emoji}</span>
        <span className={`font-bold text-base px-3 py-1 rounded-full ${m.head}`}>{m.age}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: '🏃 大動作', items: m.gross },
          { label: '✋ 精細動作', items: m.fine },
          { label: '🗣️ 語言溝通', items: m.language },
          { label: '💞 社交情緒', items: m.social },
        ].map(d => (
          <div key={d.label}>
            <p className="font-semibold text-gray-700 text-xs mb-2">{d.label}</p>
            <ul className="space-y-1">
              {d.items.map((item, i) => (
                <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                  <span className="text-gray-400 shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GrowthMilestonesPage({ navigate }) {
  return (
    <div>
      <PageHeader
        emoji="📏"
        title="生長發育里程碑"
        subtitle="0–3 歲各階段發展指標，協助您觀察寶寶的成長節奏"
        color="bg-gradient-to-br from-emerald-50 to-teal-100"
      />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Info tip */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-10 flex gap-3">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm text-amber-700 leading-relaxed">
            <strong>提醒：</strong>每位孩子的發展速度不同，里程碑僅為參考範圍。
            若孩子在某項指標落後 <strong>1–2 個月</strong>，可先觀察；
            若有多項落後或出現「紅旗警訊」，請諮詢兒科醫師或發展評估。
          </p>
        </div>

        {/* Milestones grid */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">📆 各月齡發展指標</h2>
        <div className="space-y-6 mb-14">
          {milestones.map(m => <MilestoneCard key={m.age} m={m} />)}
        </div>

        {/* Red flags */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">🚩 紅旗警訊——何時應尋求評估</h2>
        <p className="text-sm text-gray-500 mb-6">若發現以下情形，建議主動告知兒科醫師，必要時轉介早療資源。</p>
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {redFlags.map(r => (
              <div key={r.age} className="flex gap-3 items-start">
                <span className="bg-red-200 text-red-700 text-xs font-bold px-2 py-1 rounded-full shrink-0 mt-0.5 whitespace-nowrap">
                  {r.age}
                </span>
                <p className="text-sm text-red-800">{r.sign}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Growth book link */}
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex gap-3 items-start">
          <span className="text-2xl shrink-0">📗</span>
          <div>
            <p className="font-bold text-emerald-800 text-sm mb-1">兒童健康手冊</p>
            <p className="text-xs text-emerald-700 leading-relaxed">
              寶寶的健康手冊（兒童健康手冊）記錄預防接種、健康檢查、生長曲線等，是最重要的成長紀錄，
              請妥善保存並於每次就醫、健兒門診時攜帶。
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('home')}
            className="text-sm text-orange-500 hover:text-orange-700 underline"
          >
            ← 返回首頁
          </button>
        </div>
      </div>
    </div>
  )
}
