import { useState } from 'react'

function PageHeader({ emoji, title, subtitle, color }) {
  return (
    <div className={`${color} py-12 px-6 text-center`}>
      <div className="text-6xl mb-4">{emoji}</div>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
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

const bathingTips = [
  '臍帶未脫落前先以擦澡為主，脫落後可開始盆浴',
  '水溫約37–40°C，用手肘或洗澡溫度計測試，避免燙傷',
  '清潔順序由上到下、由乾淨到骯髒（臉→身體→屁股），頸部、腋下、鼠蹊部等皮膚皺褶處需特別清潔並拍乾',
  '使用溫和無皂鹼的嬰兒沐浴用品，避免成人清潔用品刺激皮膚',
  '6個月以下嬰兒每週2–3次盆浴即可，不需每日全身清潔，避免過度清潔破壞皮脂保護層；活動量大易流汗的較大幼兒可每日洗',
  '幼兒在浴缸內絕不可無人看顧，即使只是轉身拿條毛巾的時間也不行',
]

const skinTips = [
  '洗澡後3分鐘內全身塗抹保濕乳液鎖水，尤其秋冬乾燥季節',
  '皮膚皺褶處保持乾燥清潔，降低濕疹與尿布疹發生機率',
  '修剪指甲建議在洗完澡指甲較軟時進行，使用專用嬰兒指甲剪，避免剪太短造成甲溝炎',
]

const oralTips = [
  '未長牙前：每次餵奶後可用紗布巾沾溫開水，輕拭牙齦與舌苔',
  '長牙後（約6個月起）：使用嬰兒指套牙刷或軟毛小牙刷，早晚各刷一次；3歲以下建議使用米粒大小、含氟量1000ppm的兒童牙膏',
  '避免含著奶瓶入睡，這是造成奶瓶性齲齒最主要的原因',
  '建議在長出第一顆牙、或滿1歲前，進行第一次牙科檢查',
]

const diaperTips = [
  '約每2–3小時檢查一次，大便後應立即更換，避免排泄物刺激皮膚',
  '清潔方向由前往後擦拭，女嬰尤其重要，可降低泌尿道感染風險',
  '以溫水或濕紙巾清潔後確實拍乾，視情況塗抹護膚膏隔離保護',
  '換尿布台上動作時，手不離開幼兒身體，避免翻身跌落（詳見「居家安全與意外預防」）',
]

const toiletTraining = [
  { q: '開始時機', a: '通常介於18個月至3歲之間，以孩子的準備度而非年齡為主要判斷依據：能維持乾燥2小時以上、能表達如廁需求、對如廁表現興趣、能自行走到或坐上便器' },
  { q: '循序漸進原則', a: '不強迫、不因尿褲子責罵，以鼓勵取代處罰；先讓孩子熟悉便器，用簡單語言介紹如廁流程' },
  { q: '常見挫折是正常現象', a: '已經學會又重新尿床（退化）很常見，可能因環境轉換（入托、弟妹出生）引起，耐心陪伴、不過度緊張即可改善' },
  { q: '夜間如廁訓練較晚完成', a: '通常晚於白天訓練，多數孩子要到5–6歲才能穩定整夜不尿床，屬正常生理發展範圍' },
]

const sleepDurations = [
  { age: '0–3個月', hours: '約16–18小時／天', note: '含頻繁小睡，尚無明顯日夜節律' },
  { age: '4–11個月', hours: '約12–15小時／天', note: '含2–3次小睡，逐漸建立較規律作息' },
  { age: '1–2歲', hours: '約11–14小時／天', note: '含1–2次小睡' },
  { age: '3歲', hours: '約10–13小時／天', note: '含0–1次小睡，部分孩子開始不需午睡' },
]

const routineSteps = ['洗澡', '撫觸／換睡衣', '說故事或搖籃曲', '熄燈、保持安靜']

const nightWakingTips = [
  '3–4個月前的夜醒多為生理性肚子餓，屬正常現象，不需特別「處理」',
  '較大嬰幼兒的夜醒可能與分離焦慮、做夢、環境不適（太熱、尿布濕）、生病等有關，可先排除這些原因',
  '夜醒時先觀察數分鐘，避免每次醒來就立即抱起、開大燈、餵奶等高度刺激的回應，以免無意間建立不必要的依賴模式',
  '安撫時盡量保持低刺激：不開大燈、輕聲細語、避免過度互動或玩耍',
  '各種睡眠訓練方法（如漸進式等待法）在專業間仍有不同意見，建議家長依自身育兒理念選擇是否採用，並非必要措施，也不是每個孩子都需要「訓練」',
]

const visionTips = [
  '配合兒童預防保健（7次健檢）時程進行視力篩檢，3歲起可開始配合視力表檢查',
  '警訊：經常瞇眼、歪頭看東西、湊近看物品、眼睛不自主偏斜（疑似斜視）、畏光流淚，應及早轉介眼科評估',
  '2歲以下不建議使用螢幕；2–5歲每日螢幕時間建議不超過1小時，並維持適當觀看距離與充足採光',
  '每天至少2小時戶外活動，有助降低近視發生機率',
]

const hearingTips = [
  '新生兒聽力篩檢與1–3–6原則已於「新生兒安全與警訊」頁介紹，此處補充日常照護重點',
  '避免長時間暴露於高分貝環境（演唱會、鞭炮聲、長時間大聲收看電視或使用耳機）',
  '避免自行清潔耳道深處，棉花棒使用不當可能將耳垢愈推愈深或傷及耳膜；耳垢通常會自行排出，如有阻塞疑慮應由醫師處理',
  '留意孩子對聲音的反應：是否會轉頭尋找聲源、呼喚名字有反應、語言發展是否符合預期，若有疑慮應及早評估',
]

const dentalTips = [
  '建議1歲前進行第一次牙科檢查，之後每半年定期檢查一次',
  '氟化物應用：經牙醫師評估後定期塗氟，可有效預防齲齒',
  '減少含糖食物與飲料的攝取頻率，避免整天含奶瓶或吸吮沾有糖分的奶嘴',
  '乳牙照護同樣重要：乳牙蛀牙可能影響恆牙排列與齒顎發育，並非「反正會換牙就不用管」',
]

export default function DailyCarePage({ navigate }) {
  const [tab, setTab] = useState('hygiene')

  return (
    <div>
      <PageHeader
        emoji="🧴"
        title="日常照護與生活習慣"
        subtitle="洗澡與清潔、如廁訓練、睡眠作息、視力聽力口腔保健"
        color="bg-gradient-to-br from-rose-50 to-pink-100"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex rounded-2xl bg-rose-100 p-1 mb-10 gap-1 overflow-x-auto">
          {[
            { id: 'hygiene', label: '🛁 清潔與如廁' },
            { id: 'sleep', label: '😴 睡眠與作息' },
            { id: 'senses', label: '👀 視力聽力口腔' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-white text-rose-700 shadow' : 'text-rose-600 hover:bg-rose-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'hygiene' && (
          <div className="space-y-5">
            <section className="bg-white border border-rose-200 rounded-3xl p-6">
              <h2 className="font-bold text-rose-800 text-lg mb-4 flex items-center gap-2"><span>🛁</span> 洗澡</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {bathingTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section className="bg-white border border-rose-200 rounded-3xl p-6">
              <h2 className="font-bold text-rose-800 text-lg mb-4 flex items-center gap-2"><span>🧴</span> 皮膚清潔與保養</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {skinTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
              <p className="text-xs text-gray-400 mt-3">尿布疹、濕疹等皮膚問題詳細照護請見「常見症狀處理」頁。</p>
            </section>

            <section className="bg-white border border-rose-200 rounded-3xl p-6">
              <h2 className="font-bold text-rose-800 text-lg mb-4 flex items-center gap-2"><span>🦷</span> 口腔清潔</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {oralTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section className="bg-white border border-rose-200 rounded-3xl p-6">
              <h2 className="font-bold text-rose-800 text-lg mb-4 flex items-center gap-2"><span>👶</span> 尿布更換</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {diaperTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section className="bg-white border-2 border-pink-200 rounded-3xl p-6">
              <h2 className="font-bold text-pink-800 text-lg mb-4 flex items-center gap-2"><span>🚽</span> 如廁訓練</h2>
              <div className="space-y-3">
                {toiletTraining.map(item => (
                  <div key={item.q} className="bg-pink-50 border border-pink-100 rounded-2xl p-4">
                    <p className="font-semibold text-pink-700 text-sm mb-1">{item.q}</p>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <SourceNote>
              資料參考：衛生福利部國民健康署嬰幼兒照護衛教資料、台灣兒科醫學會如廁訓練與口腔保健建議。
            </SourceNote>
          </div>
        )}

        {tab === 'sleep' && (
          <div className="space-y-5">
            <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4 flex gap-3">
              <span className="text-xl shrink-0">🛡️</span>
              <p className="text-sm text-cyan-800 leading-relaxed">
                安全睡眠環境（仰睡、獨自睡、床鋪淨空）請見
                <button onClick={() => navigate('newborn-safety')} className="underline font-semibold mx-1">
                  「新生兒安全與警訊」頁的SIDS安全睡眠圖解
                </button>
                ，此處聚焦作息建立與夜醒處理。
              </p>
            </div>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>⏱️</span> 各年齡建議睡眠時數</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-rose-50 text-rose-800">
                      <th className="border border-rose-200 p-2 text-left">年齡</th>
                      <th className="border border-rose-200 p-2 text-left">建議時數</th>
                      <th className="border border-rose-200 p-2 text-left">說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sleepDurations.map(s => (
                      <tr key={s.age}>
                        <td className="border border-gray-200 p-2 font-medium text-gray-700 whitespace-nowrap">{s.age}</td>
                        <td className="border border-gray-200 p-2 text-gray-600">{s.hours}</td>
                        <td className="border border-gray-200 p-2 text-gray-500 text-xs">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white border-2 border-rose-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>🌙</span> 建立固定睡前儀式</h2>
              <div className="flex flex-wrap items-center gap-2">
                {routineSteps.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <span className="text-sm font-medium bg-rose-100 text-rose-700 rounded-full px-3 py-1.5">{s}</span>
                    {i < routineSteps.length - 1 && <span className="text-rose-300">→</span>}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                新生兒尚無明顯日夜節律，約3–4個月後開始逐漸建立較規律作息。固定重複的睡前流程能形成「入睡提示訊號」，
                幫助孩子預期並進入睡眠狀態；睡眠環境宜昏暗、安靜、涼爽（約24–26°C），並避免睡前使用螢幕／3C產品。
              </p>
            </section>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>🌛</span> 夜醒處理</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {nightWakingTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <SourceNote>
              資料參考：美國兒科醫學會（AAP）、美國國家睡眠基金會（National Sleep Foundation）兒童睡眠時數建議。個別孩子的睡眠需求會有差異，僅供參考。
            </SourceNote>
          </div>
        )}

        {tab === 'senses' && (
          <div className="space-y-5">
            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>👁️</span> 視力保健重點</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {visionTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>👂</span> 聽力保健重點</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {hearingTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>🦷</span> 口腔保健重點</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {dentalTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <SourceNote>
              資料參考：衛生福利部國民健康署視力保健／聽力保健／口腔保健衛教資料、世界衛生組織（WHO）兒童螢幕時間建議。
            </SourceNote>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('growth')}
            className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left hover:bg-emerald-100 transition-colors"
          >
            <span className="text-2xl">📏</span>
            <div>
              <p className="font-semibold text-emerald-800 text-sm">生長發育里程碑</p>
              <p className="text-xs text-emerald-600">動作、語言、社會情緒發展指標</p>
            </div>
            <span className="ml-auto text-emerald-400">→</span>
          </button>
          <button
            onClick={() => navigate('caregiver')}
            className="flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-2xl p-4 text-left hover:bg-sky-100 transition-colors"
          >
            <span className="text-2xl">🧑‍🏫</span>
            <div>
              <p className="font-semibold text-sky-800 text-sm">托育人員專區</p>
              <p className="text-xs text-sky-600">日常照顧SOP、個別化照顧計畫</p>
            </div>
            <span className="ml-auto text-sky-400">→</span>
          </button>
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
