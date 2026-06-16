function PageHeader({ emoji, title, subtitle, color }) {
  return (
    <div className={`${color} py-12 px-6 text-center`}>
      <div className="text-6xl mb-4">{emoji}</div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-500 text-sm max-w-xl mx-auto">{subtitle}</p>
    </div>
  )
}

const schedule = [
  {
    age: '出生 24 小時內',
    vaccines: [
      { name: 'B 型肝炎疫苗（第 1 劑）', type: 'public', note: '出生後盡快施打' },
      { name: '卡介苗（BCG）', type: 'public', note: '出生 24 小時後施打' },
    ],
  },
  {
    age: '1 個月',
    vaccines: [
      { name: 'B 型肝炎疫苗（第 2 劑）', type: 'public', note: '' },
    ],
  },
  {
    age: '2 個月',
    vaccines: [
      { name: '五合一疫苗（DTaP-Hib-IPV）第 1 劑', type: 'public', note: '白喉、百日咳、破傷風、b型流感嗜血桿菌、小兒麻痺' },
      { name: '13 價肺炎鏈球菌疫苗（第 1 劑）', type: 'public', note: '' },
      { name: '輪狀病毒疫苗（第 1 劑）', type: 'public', note: '口服，依品牌分 2 或 3 劑' },
    ],
  },
  {
    age: '4 個月',
    vaccines: [
      { name: '五合一疫苗（第 2 劑）', type: 'public', note: '' },
      { name: '13 價肺炎鏈球菌疫苗（第 2 劑）', type: 'public', note: '' },
      { name: '輪狀病毒疫苗（第 2 劑）', type: 'public', note: '' },
    ],
  },
  {
    age: '6 個月',
    vaccines: [
      { name: '五合一疫苗（第 3 劑）', type: 'public', note: '' },
      { name: 'B 型肝炎疫苗（第 3 劑）', type: 'public', note: '' },
      { name: '輪狀病毒疫苗（第 3 劑）', type: 'public', note: '僅部分品牌需要第 3 劑' },
      { name: '流感疫苗（每年 10 月起）', type: 'public', note: '初次接種者間隔 4 週打 2 劑' },
    ],
  },
  {
    age: '12 個月',
    vaccines: [
      { name: '麻疹腮腺炎德國麻疹混合疫苗（MMR）第 1 劑', type: 'public', note: '' },
      { name: '水痘疫苗（第 1 劑）', type: 'public', note: '' },
      { name: '13 價肺炎鏈球菌疫苗（第 3 劑）', type: 'public', note: '' },
      { name: 'A 型肝炎疫苗（第 1 劑）', type: 'public', note: '高危險群' },
    ],
  },
  {
    age: '15 個月',
    vaccines: [
      { name: '日本腦炎疫苗（第 1 劑）', type: 'public', note: '活性減毒，間隔 12 個月打第 2 劑' },
    ],
  },
  {
    age: '18 個月',
    vaccines: [
      { name: '五合一疫苗（第 4 劑追加）', type: 'public', note: '' },
      { name: 'A 型肝炎疫苗（第 2 劑）', type: 'public', note: '第 1 劑後 6 個月施打' },
    ],
  },
  {
    age: '27 個月',
    vaccines: [
      { name: '日本腦炎疫苗（第 2 劑）', type: 'public', note: '15 個月第 1 劑後 12 個月施打' },
    ],
  },
  {
    age: '5 歲前（自費參考）',
    vaccines: [
      { name: 'A 型流感（H1N1）', type: 'private', note: '部分廠牌含於流感疫苗' },
      { name: '腸病毒 71 型疫苗', type: 'private', note: '6 個月–6 歲，共 2 劑' },
      { name: '輪狀病毒（未公費地區）', type: 'private', note: '' },
    ],
  },
]

const afterCare = [
  '接種部位可能出現紅腫、硬塊，屬正常反應，通常 2–3 天緩解',
  '接種後觀察 30 分鐘再離開診所，確認無嚴重過敏反應',
  '接種後 24 小時避免碰水（非活性疫苗）；口服輪狀病毒 30 分鐘內勿餵食',
  '若有發燒（低燒常見）可依醫囑使用退燒藥',
  '接種後 2 週內出現高燒、呼吸困難、嚴重過敏（蕁麻疹、臉腫）請立即就醫',
]

export default function VaccinationPage({ navigate }) {
  return (
    <div>
      <PageHeader
        emoji="💉"
        title="疫苗接種時程"
        subtitle="114 年公費疫苗時程，依衛生福利部疾病管制署最新公告"
        color="bg-gradient-to-br from-violet-50 to-purple-100"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Legend */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-400 inline-block"></span>
            <span className="text-sm text-gray-600">公費疫苗（政府補助）</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-amber-400 inline-block"></span>
            <span className="text-sm text-gray-600">自費疫苗（部分縣市有補助）</span>
          </div>
        </div>

        {/* Schedule */}
        <div className="space-y-4 mb-12">
          {schedule.map(s => (
            <div key={s.age} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-violet-50 border-b border-violet-100 px-5 py-3">
                <h3 className="font-bold text-violet-800 text-sm">📅 {s.age}</h3>
              </div>
              <div className="p-4 space-y-2">
                {s.vaccines.map(v => (
                  <div key={v.name} className="flex items-start gap-3">
                    <span className={`w-3 h-3 rounded-full shrink-0 mt-1 ${v.type === 'public' ? 'bg-green-400' : 'bg-amber-400'}`}></span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{v.name}</p>
                      {v.note && <p className="text-xs text-gray-400 mt-0.5">{v.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* After care */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 mb-8">
          <h2 className="font-bold text-blue-800 text-lg mb-4">💉 接種後注意事項</h2>
          <ul className="space-y-3">
            {afterCare.map((c, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-blue-700">
                <span className="text-blue-400 shrink-0">✓</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm text-amber-700 leading-relaxed">
            <strong>注意：</strong>疫苗時程可能依地區、政策調整。請以您所在縣市衛生局公告及
            兒科醫師建議為準，並務必攜帶<strong>兒童健康手冊</strong>記錄接種紀錄。
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
