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

function SourceNote({ children }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 flex gap-2 text-xs text-gray-500 leading-relaxed">
      <span className="shrink-0">📋</span>
      <p>{children}</p>
    </div>
  )
}

const schedule = [
  {
    age: '出生 24 小時內',
    vaccines: [
      { name: 'B 型肝炎疫苗（第 1 劑）', type: 'public', note: '出生後盡快施打' },
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
      { name: '五合一疫苗（DTaP-Hib-IPV）第 1 劑', type: 'public', note: '白喉、破傷風、非細胞性百日咳、b型流感嗜血桿菌、不活化小兒麻痺' },
      { name: '13 價肺炎鏈球菌疫苗（第 1 劑）', type: 'public', note: '' },
    ],
  },
  {
    age: '4 個月',
    vaccines: [
      { name: '五合一疫苗（第 2 劑）', type: 'public', note: '' },
      { name: '13 價肺炎鏈球菌疫苗（第 2 劑）', type: 'public', note: '' },
    ],
  },
  {
    age: '5–8 個月',
    vaccines: [
      { name: '卡介苗（BCG）', type: 'public', note: '105年起由「出生24小時內」調整為此區間，建議滿5個月後盡快接種' },
    ],
  },
  {
    age: '6 個月',
    vaccines: [
      { name: '五合一疫苗（第 3 劑）', type: 'public', note: '' },
      { name: 'B 型肝炎疫苗（第 3 劑）', type: 'public', note: '' },
      { name: '流感疫苗（每年 10 月起）', type: 'public', note: '初次接種者間隔 4 週打 2 劑，之後每年 1 劑' },
    ],
  },
  {
    age: '12 個月',
    vaccines: [
      { name: '水痘疫苗（第 1 劑）', type: 'public', note: '' },
      { name: '麻疹腮腺炎德國麻疹混合疫苗（MMR）第 1 劑', type: 'public', note: '' },
    ],
  },
  {
    age: '12–15 個月',
    vaccines: [
      { name: '13 價肺炎鏈球菌疫苗（第 3 劑）', type: 'public', note: '與前一劑至少間隔 8 週' },
    ],
  },
  {
    age: '15 個月',
    vaccines: [
      { name: '日本腦炎活性減毒疫苗（第 1 劑）', type: 'public', note: '106年5月起改採細胞培養活性減毒疫苗' },
    ],
  },
  {
    age: '18 個月',
    vaccines: [
      { name: '五合一疫苗（第 4 劑追加）', type: 'public', note: '' },
      { name: 'A 型肝炎疫苗（第 1 劑）', type: 'public', note: '114年起由「12個月」調整為此年齡' },
    ],
  },
  {
    age: '27 個月',
    vaccines: [
      { name: '日本腦炎活性減毒疫苗（第 2 劑）', type: 'public', note: '與第1劑間隔12個月' },
      { name: 'A 型肝炎疫苗（第 2 劑）', type: 'public', note: '114年起由「18個月」調整為此年齡' },
    ],
  },
  {
    age: '滿 5 歲至入國小前',
    vaccines: [
      { name: '破傷風白喉非細胞性百日咳及不活化小兒麻痺混合疫苗（DTaP-IPV）', type: 'public', note: '追加 1 劑' },
      { name: '麻疹腮腺炎德國麻疹混合疫苗（MMR）第 2 劑', type: 'public', note: '' },
    ],
  },
]

const afterCare = [
  '接種部位可能出現紅腫、硬塊，屬正常反應，通常 2–3 天緩解',
  '接種後觀察 30 分鐘再離開診所，確認無嚴重過敏反應',
  '接種後 24 小時避免劇烈搓揉接種部位（非活性疫苗）',
  '若有發燒（低燒常見）可依醫囑使用退燒藥，多補充水分、適度休息',
  '接種後數天內出現高燒不退、呼吸困難、嚴重過敏（大片蕁麻疹、臉部或嘴唇腫脹）請立即就醫',
]

const contraindications = [
  { title: '嚴重疾病急性期', desc: '中重度發燒（體溫≥38°C）合併明顯不適症狀時，建議延後接種；輕微感冒、無發燒可照常接種' },
  { title: '對疫苗成分嚴重過敏', desc: '曾對疫苗中的蛋白質、明膠、抗生素等成分有嚴重過敏反應（如全身性蕁麻疹、呼吸困難、過敏性休克）者，應告知醫師評估' },
  { title: '前劑曾有嚴重不良反應', desc: '接種同種疫苗曾發生嚴重過敏反應或神經系統併發症（如百日咳疫苗相關腦病變）者，該劑或同類疫苗應避免再接種，改由醫師評估替代方案' },
  { title: '免疫功能不全者', desc: '接受化學治療、先天性免疫缺乏、長期高劑量類固醇治療等免疫功能不全的幼兒，卡介苗、MMR、水痘、日本腦炎活性減毒疫苗等「活性減毒疫苗」須先經醫師評估是否可接種' },
]

const selfPayVaccines = [
  {
    name: '輪狀病毒疫苗',
    emoji: '🦠',
    target: '出生滿6週起，依廠牌於24週或32週前完成全部劑次',
    note: '口服疫苗，非現行國家公費項目（部分縣市對特定對象另有補助），須把握時效，超過建議週齡無法補種',
  },
  {
    name: '腸病毒 71 型疫苗',
    emoji: '🖐️',
    target: '滿 2 個月至未滿 6 歲，共 2 劑',
    note: '可降低重症腸病毒感染風險，建議於進入托嬰、幼兒園等群聚環境前評估接種',
  },
  {
    name: '流感疫苗（第2劑／鼻噴劑型）',
    emoji: '🤧',
    target: '6個月以上兒童公費對象初次接種第1劑後，若家長評估需要，可自費接種間隔4週之第2劑；2歲以上另有鼻噴劑型可選擇',
    note: '公費對象與劑次仍以衛生單位當年度公告為準',
  },
  {
    name: 'RSV 呼吸道融合病毒長效單株抗體',
    emoji: '🫁',
    target: '出生至未滿1歲嬰兒（尤其早產、先天性心臟病、慢性肺病等高風險族群），部分產品可用於1至2歲重症高風險幼兒',
    note: '屬被動免疫單株抗體而非傳統疫苗，一劑可提供約一季（5個月以上）保護力；部分高風險族群可能符合健保給付條件，其餘為自費，費用較高，請與兒科醫師討論適用性',
  },
]

const checkups = [
  { stage: '出生至2個月', items: '身體診察、先天性代謝異常疾病篩檢、新生兒聽力篩檢（多於出生醫院完成）' },
  { stage: '2～4個月', items: '生長評估、身體檢查、粗動作發展、餵養與居家安全衛教' },
  { stage: '4～10個月', items: '生長評估、副食品添加指導、發展篩檢（含粗動作、精細動作）' },
  { stage: '10個月～1歲半', items: '生長評估、發展篩檢（含語言、社會性）、事故傷害預防衛教' },
  { stage: '1歲半～2歲', items: '生長評估、發展篩檢（含認知、社交情緒，可包含自閉症篩檢工具）' },
  { stage: '2～3歲', items: '生長評估、發展篩檢、視力與口腔檢查、肥胖與飲食衛教' },
  { stage: '3～7歲', items: '生長評估、發展篩檢、視力與口腔檢查、入學前整體評估' },
]

const newbornScreenings = [
  {
    name: '先天性代謝異常疾病篩檢',
    emoji: '🩸',
    desc: '出生滿48小時後採腳跟血，現行公費補助21項篩檢項目（如苯酮尿症、先天性甲狀腺低能症、蠶豆症等），家長僅需負擔約200元篩檢費用',
  },
  {
    name: '新生兒聽力篩檢',
    emoji: '👂',
    desc: '出生24–60小時於合約院所以儀器完成初篩，未通過者於出院前複篩；把握「1–3–6原則」：1個月內完成篩檢、3個月內確診、6個月大前開始療育介入',
  },
  {
    name: '發展性髖關節篩檢',
    emoji: '🦴',
    desc: '台灣採「理學檢查為主」的選擇性篩檢策略，於新生兒與健兒門診常規理學檢查（Ortolani／Barlow測試）；具高風險因子（臀位產、家族史、女嬰、羊水過少等）或理學檢查異常者，會轉介進一步超音波檢查，非全面性常規超音波篩檢',
  },
]

function VaccineCalculator() {
  const [birthDate, setBirthDate] = useState('')

  const doses = [
    { months: 0, label: '出生24小時內', name: 'B型肝炎疫苗 第1劑' },
    { months: 1, label: '滿1個月', name: 'B型肝炎疫苗 第2劑' },
    { months: 2, label: '滿2個月', name: '五合一疫苗 第1劑' },
    { months: 2, label: '滿2個月', name: '13價肺炎鏈球菌疫苗 第1劑' },
    { months: 4, label: '滿4個月', name: '五合一疫苗 第2劑' },
    { months: 4, label: '滿4個月', name: '13價肺炎鏈球菌疫苗 第2劑' },
    { months: 5, label: '滿5–8個月', name: '卡介苗（BCG）' },
    { months: 6, label: '滿6個月', name: '五合一疫苗 第3劑' },
    { months: 6, label: '滿6個月', name: 'B型肝炎疫苗 第3劑' },
    { months: 12, label: '滿12個月', name: '水痘疫苗' },
    { months: 12, label: '滿12個月', name: 'MMR 第1劑' },
    { months: 13, label: '滿12–15個月', name: '13價肺炎鏈球菌疫苗 第3劑' },
    { months: 15, label: '滿15個月', name: '日本腦炎活性減毒疫苗 第1劑' },
    { months: 18, label: '滿18個月', name: '五合一疫苗 第4劑' },
    { months: 18, label: '滿18個月', name: 'A型肝炎疫苗 第1劑' },
    { months: 27, label: '滿27個月', name: '日本腦炎活性減毒疫苗 第2劑' },
    { months: 27, label: '滿27個月', name: 'A型肝炎疫苗 第2劑' },
    { months: 60, label: '滿5歲至入國小前', name: 'DTaP-IPV追加疫苗' },
    { months: 60, label: '滿5歲至入國小前', name: 'MMR 第2劑' },
  ]

  const results = birthDate
    ? doses
        .map(d => {
          const due = new Date(birthDate)
          due.setMonth(due.getMonth() + d.months)
          const today = new Date()
          const diffDays = Math.round((due - today) / 86400000)
          let status = 'upcoming'
          if (diffDays < 0) status = 'overdue'
          else if (diffDays <= 30) status = 'soon'
          return { ...d, due, diffDays, status }
        })
        .sort((a, b) => a.due - b.due)
    : []

  const statusStyle = {
    overdue: { label: '已達接種年齡', tag: 'bg-red-100 text-red-700 border-red-200' },
    soon: { label: '30天內到期', tag: 'bg-amber-100 text-amber-700 border-amber-200' },
    upcoming: { label: '尚未到期', tag: 'bg-gray-100 text-gray-500 border-gray-200' },
  }

  return (
    <section className="bg-white border-2 border-violet-200 rounded-3xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>🧮</span> 疫苗時程個人化試算
      </h2>
      <label className="text-xs font-semibold text-gray-600 mb-1 block">寶寶出生日期</label>
      <input
        type="date"
        value={birthDate}
        onChange={e => setBirthDate(e.target.value)}
        className="border border-gray-200 rounded-xl px-3 py-2 text-sm mb-4 w-full sm:w-64"
      />

      {!birthDate && (
        <p className="text-sm text-gray-400">輸入出生日期後，會依現行公費時程試算各劑疫苗建議接種日期。</p>
      )}

      {birthDate && (
        <div className="space-y-2 max-h-[28rem] overflow-y-auto pr-1">
          {results.map((r, i) => (
            <div key={i} className={`flex items-center justify-between gap-3 border rounded-xl p-3 ${statusStyle[r.status].tag}`}>
              <div>
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs opacity-80">{r.label}（建議日期：{r.due.toLocaleDateString('zh-TW')}）</p>
              </div>
              <span className="text-xs font-semibold whitespace-nowrap">{statusStyle[r.status].label}</span>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4">
        本工具僅依標準公費時程試算建議日期，不會儲存任何資料；流感疫苗為每年接種不列入試算。實際接種仍須以兒童健康手冊紀錄與醫師評估為準。
      </p>
    </section>
  )
}

export default function VaccinationPage({ navigate, initialTab }) {
  const [tab, setTab] = useState(initialTab || 'schedule')

  return (
    <div>
      <PageHeader
        emoji="💉"
        title="預防接種"
        subtitle="公費疫苗時程、自費建議、接種反應與禁忌、預防保健與新生兒篩檢"
        color="bg-gradient-to-br from-violet-50 to-purple-100"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex rounded-2xl bg-violet-100 p-1 mb-10 gap-1 overflow-x-auto">
          {[
            { id: 'schedule', label: '📅 接種時程' },
            { id: 'selfpay', label: '💰 自費疫苗' },
            { id: 'care', label: '🩺 反應與禁忌' },
            { id: 'calculator', label: '🧮 個人化試算' },
            { id: 'checkup', label: '🏥 預防保健' },
            { id: 'newborn', label: '🔬 新生兒篩檢' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-white text-violet-700 shadow' : 'text-violet-600 hover:bg-violet-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Schedule */}
        {tab === 'schedule' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-4 rounded-full bg-green-400 inline-block"></span>
              <span className="text-sm text-gray-600">公費疫苗（政府補助，依現行時程表）</span>
            </div>

            <div className="space-y-4">
              {schedule.map(s => (
                <div key={s.age} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-violet-50 border-b border-violet-100 px-5 py-3">
                    <h3 className="font-bold text-violet-800 text-sm">📅 {s.age}</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {s.vaccines.map(v => (
                      <div key={v.name} className="flex items-start gap-3">
                        <span className="w-3 h-3 rounded-full shrink-0 mt-1 bg-green-400"></span>
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

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
              <span className="text-xl shrink-0">💡</span>
              <p className="text-sm text-amber-700 leading-relaxed">
                <strong>注意：</strong>疫苗時程可能依政策調整（如卡介苗2016年起、A型肝炎疫苗2025年起皆曾調整接種年齡）。
                請以您所在縣市衛生局公告及兒科醫師建議為準，並務必攜帶<strong>兒童健康手冊</strong>記錄接種紀錄。
              </p>
            </div>

            <SourceNote>
              資料參考：衛生福利部疾病管制署《現行兒童預防接種時程表》（114年1月版，頁面最後更新2026年7月15日）。時程如有更新請以疾管署官網公告為準。
            </SourceNote>
          </div>
        )}

        {/* Self-pay */}
        {tab === 'selfpay' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-2">以下為常見自費疫苗／被動免疫選項，建議與兒科醫師討論後依個別風險評估接種：</p>
            {selfPayVaccines.map(v => (
              <div key={v.name} className="bg-white border-2 border-amber-200 rounded-2xl p-5">
                <p className="font-bold text-amber-800 text-sm mb-1 flex items-center gap-2">
                  <span className="text-xl">{v.emoji}</span> {v.name}
                </p>
                <p className="text-sm text-gray-700 mb-1"><strong>建議對象／時程：</strong>{v.target}</p>
                <p className="text-xs text-gray-500">{v.note}</p>
              </div>
            ))}
            <SourceNote>
              資料參考：衛生福利部疾病管制署自費疫苗與RSV單株抗體相關公告（2026年1月更新）。實際費用、廠牌與公費資格請洽診所或衛生單位，各院所定價不一，僅供概念參考。
            </SourceNote>
          </div>
        )}

        {/* After care & contraindications */}
        {tab === 'care' && (
          <div className="space-y-5">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6">
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

            <section className="bg-white border-2 border-red-100 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🚫</span> 接種禁忌症
              </h2>
              <div className="space-y-3">
                {contraindications.map(c => (
                  <div key={c.title} className="bg-red-50 border border-red-100 rounded-2xl p-4">
                    <p className="font-semibold text-red-700 text-sm mb-1">{c.title}</p>
                    <p className="text-sm text-gray-600">{c.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">以上僅為一般性原則，個別幼兒是否適合接種仍須由醫師評估。</p>
            </section>

            <SourceNote>
              資料參考：衛生福利部疾病管制署預防接種手冊、各項預防接種間隔時間一覽表（107.11版）。
            </SourceNote>
          </div>
        )}

        {/* Calculator */}
        {tab === 'calculator' && <VaccineCalculator />}

        {/* Preventive checkups */}
        {tab === 'checkup' && (
          <div className="space-y-5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex gap-3">
              <span className="text-xl shrink-0">💡</span>
              <p className="text-sm text-emerald-800 leading-relaxed">
                國健署為7歲以下兒童提供<strong>7次免費兒童預防保健服務</strong>，家長只需負擔醫療院所掛號費，
                攜帶兒童健康手冊及健保卡至健兒門診即可。
              </p>
            </div>
            <div className="space-y-3">
              {checkups.map(c => (
                <div key={c.stage} className="bg-white border border-emerald-200 rounded-2xl p-4">
                  <p className="font-semibold text-emerald-700 text-sm mb-1">🗓️ {c.stage}</p>
                  <p className="text-sm text-gray-600">{c.items}</p>
                </div>
              ))}
            </div>
            <SourceNote>
              資料參考：衛生福利部國民健康署兒童預防保健服務公告、兒童健康手冊。各次實際檢查項目仍以就診當次醫療院所安排為準。
            </SourceNote>
          </div>
        )}

        {/* Newborn screening */}
        {tab === 'newborn' && (
          <div className="space-y-4">
            {newbornScreenings.map(n => (
              <div key={n.name} className="bg-white border-2 border-sky-200 rounded-2xl p-5">
                <p className="font-bold text-sky-800 text-sm mb-2 flex items-center gap-2">
                  <span className="text-xl">{n.emoji}</span> {n.name}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">{n.desc}</p>
              </div>
            ))}
            <SourceNote>
              資料參考：衛生福利部國民健康署新生兒先天性代謝異常疾病篩檢、新生兒聽力篩檢補助服務方案公告；發展性髖關節篩檢政策依台灣現行選擇性篩檢實務彙整。
            </SourceNote>
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
