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

function SourceNote({ children }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 flex gap-2 text-xs text-gray-500 leading-relaxed">
      <span className="shrink-0">📋</span>
      <p>{children}</p>
    </div>
  )
}

const sidsAvoid = [
  { emoji: '🛏️', label: '與大人同床共寢' },
  { emoji: '🛌', label: '枕頭、涼被、厚被' },
  { emoji: '🧸', label: '玩偶、鬆軟玩具' },
  { emoji: '〰️', label: '床邊軟墊、防撞護欄' },
  { emoji: '💨', label: '趴睡或側睡' },
  { emoji: '🚬', label: '二手菸環境' },
]

const sidsPrinciples = [
  { title: 'A - Alone（獨自睡）', desc: '嬰兒應獨自睡在自己的嬰兒床/搖籃，可以在同房間但不同床（建議至少至6個月，理想至1歲）' },
  { title: 'B - Back（仰睡）', desc: '每次睡眠（包含小睡）都應讓嬰兒仰躺睡，趴睡與側睡皆會提高窒息風險' },
  { title: 'C - Crib（床鋪淨空）', desc: '嬰兒床應使用堅實平坦的床墊，不放枕頭、棉被、床邊軟墊、玩偶等任何物品' },
]

const stoolCards = [
  { no: 1, color: '#F5E6C8', normal: false },
  { no: 2, color: '#F2E1B8', normal: false },
  { no: 3, color: '#EDD9A8', normal: false },
  { no: 4, color: '#E8CE93', normal: false },
  { no: 5, color: '#D9BC80', normal: false },
  { no: 6, color: '#C9AC72', normal: false },
  { no: 7, color: '#B98A3E', normal: true },
  { no: 8, color: '#8A6A2A', normal: true },
  { no: 9, color: '#5C7A3A', normal: true },
]

const jaundiceFacts = [
  { q: '生理性黃疸', a: '約 50–60% 新生兒會出現，多於出生2–3天後開始，7–14天內自然消退，寶寶活力食慾正常，通常不需特別治療' },
  { q: '病理性黃疸警訊', a: '出生24小時內就出現黃疸、足月兒超過2週（早產兒超過3週）仍未消退、黃疸程度快速上升，皆須儘速就醫評估' },
  { q: '與大便顏色的關聯', a: '膽道閉鎖會使膽汁無法順利排入腸道，大便因此失去正常的黃綠色而呈現灰白、陶土色，是最重要的居家警訊' },
  { q: '為什麼要及早發現', a: '膽道閉鎖若能在出生後60天內確診並接受手術，治療效果較佳；延誤診斷可能導致肝硬化，須接受肝臟移植' },
]

const redFlags = [
  { cat: '🌡️ 發燒', items: ['3個月以下嬰兒肛溫≥38°C', '任何年齡體溫≥40°C', '發燒超過72小時未退或反覆升高'] },
  { cat: '🫁 呼吸', items: ['呼吸急促、胸凹或鎖骨上方凹陷', '嘴唇、指甲發紺（藍紫色）', '呼吸暫停或呼吸聲異常（喘鳴、咻咻聲）'] },
  { cat: '🧠 意識與神經', items: ['意識改變、嗜睡難喚醒', '持續哭鬧無法安撫超過數小時', '抽搐、肢體無力或歪斜'] },
  { cat: '💧 脫水', items: ['8小時以上無尿', '囟門凹陷、哭無眼淚', '皮膚失去彈性、眼窩凹陷'] },
  { cat: '🩸 皮膚與循環', items: ['皮膚出現按壓不會消退的紫紅色斑點', '全身性紅疹合併發燒或呼吸困難', '四肢冰冷、臉色蒼白'] },
  { cat: '🍼 餵食與大便', items: ['奶量驟減至平日50%以下', '大便帶血絲或黏液', '大便呈灰白／陶土色（疑似膽道閉鎖）'] },
]

export default function NewbornSafetyPage({ navigate }) {
  return (
    <div>
      <PageHeader
        emoji="🛡️"
        title="新生兒安全與警訊"
        subtitle="安全睡眠環境、黃疸與大便顏色卡、何時必須就醫的紅旗症狀"
        color="bg-gradient-to-br from-cyan-50 to-blue-100"
      />

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">

        {/* SIDS safe sleep */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span>😴</span> 嬰兒猝死症（SIDS）預防：安全睡眠環境
          </h2>
          <p className="text-sm text-gray-500 mb-5">把握 A-B-C 三原則，可大幅降低嬰兒猝死症風險</p>

          <div className="bg-white border-2 border-cyan-200 rounded-3xl p-6 mb-5">
            <svg viewBox="0 0 320 190" className="w-full max-w-md mx-auto" role="img" aria-label="安全睡眠嬰兒床示意圖">
              <rect x="0" y="0" width="320" height="190" fill="#EFF8FB" rx="12" />
              {/* crib frame */}
              <rect x="30" y="40" width="260" height="120" rx="10" fill="#FFFFFF" stroke="#7DB8C9" strokeWidth="4" />
              {/* mattress */}
              <rect x="42" y="52" width="236" height="96" rx="6" fill="#FDF6E9" stroke="#E7D9B8" strokeWidth="2" />
              {/* crib slats left/right */}
              {[0,1,2,3,4].map(i => (
                <rect key={'l'+i} x={34 + i*4} y="40" width="2" height="120" fill="#BFE0EA" />
              ))}
              {[0,1,2,3,4].map(i => (
                <rect key={'r'+i} x={280 - i*4} y="40" width="2" height="120" fill="#BFE0EA" />
              ))}
              {/* baby lying on back, centered, nothing else in crib */}
              <ellipse cx="160" cy="105" rx="46" ry="26" fill="#FBD8B0" stroke="#E8A863" strokeWidth="2" />
              <circle cx="112" cy="100" r="20" fill="#FBD8B0" stroke="#E8A863" strokeWidth="2" />
              <circle cx="105" cy="97" r="2.2" fill="#5A4632" />
              <circle cx="118" cy="97" r="2.2" fill="#5A4632" />
              <path d="M107 106 Q112 110 118 106" stroke="#5A4632" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* arms at sides */}
              <path d="M140 92 Q150 88 158 94" stroke="#E8A863" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M140 118 Q150 124 158 118" stroke="#E8A863" strokeWidth="4" fill="none" strokeLinecap="round" />
              <text x="160" y="182" textAnchor="middle" fontSize="12" fill="#3E7A8C" fontWeight="600">仰睡・獨自睡・床鋪淨空無雜物</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {sidsPrinciples.map(p => (
              <div key={p.title} className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4">
                <p className="font-semibold text-cyan-800 text-sm mb-1">{p.title}</p>
                <p className="text-xs text-cyan-700 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <Alert tone="danger" label="避免" title="睡眠環境應避免" strong>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
              {sidsAvoid.map(a => (
                <div key={a.label} className="flex items-center gap-2 bg-surface rounded-xl px-3 py-2 border border-danger-border/40">
                  <span className="text-xl">{a.emoji}</span>
                  <span className="text-xs font-medium">{a.label}</span>
                </div>
              ))}
            </div>
          </Alert>

          <SourceNote>
            資料參考：American Academy of Pediatrics（AAP）Safe Sleep 安全睡眠建議、衛生福利部國民健康署嬰兒猝死症預防衛教資料。
          </SourceNote>
        </section>

        {/* Jaundice & stool color card */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span>💛</span> 黃疸與膽道閉鎖：大便顏色卡
          </h2>
          <p className="text-sm text-gray-500 mb-5">台灣官方「嬰兒黃金九色卡」是及早發現膽道閉鎖最重要的居家篩檢工具</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {jaundiceFacts.map(f => (
              <div key={f.q} className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="font-semibold text-amber-800 text-sm mb-1">{f.q}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 print:border-0">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-gray-800 text-sm">嬰兒黃金九色卡（示意）</p>
              <button
                onClick={() => window.print()}
                className="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-full hover:bg-amber-600 transition-colors print:hidden"
              >
                🖨️ 列印
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-4">1–6號為異常（淡黃／灰白），7–9號為正常（黃／綠）</p>
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
              {stoolCards.map(c => (
                <div key={c.no} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-full aspect-square rounded-lg border-2 ${c.normal ? 'border-success-border' : 'border-danger-border'}`}
                    style={{ backgroundColor: c.color }}
                  />
                  <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${c.normal ? 'text-success-fg' : 'text-danger-fg'}`}>
                    <ToneIcon tone={c.normal ? 'success' : 'danger'} className="w-3 h-3" />
                    {c.no}{c.normal ? '正常' : '異常'}
                  </span>
                </div>
              ))}
            </div>
            <Alert tone="danger" label="重要" className="mt-5">
              <p>
                <strong>螢幕顯示與自行列印的顏色僅供示意參考</strong>，家用印表機色彩也可能失真，實際比對請使用兒童健康手冊中的正版印刷色卡，
                於自然光或白色燈光下比對寶寶大便顏色。若比對結果落在1–6號異常範圍，或對顏色判讀有疑慮，
                請儘速攜帶寶寶及大便顏色卡就醫評估，不要自行等待觀察。
              </p>
            </Alert>
          </div>

          <SourceNote>
            資料參考：衛生福利部國民健康署「嬰兒黃金九色卡」、兒童健康手冊。大便卡諮詢專線：(02) 2382-0886；孕產婦關懷諮詢專線：0800-870-870。
          </SourceNote>
        </section>

        {/* Red flag summary */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span>🚨</span> 何時必須就醫的紅旗症狀總表
          </h2>
          <p className="text-sm text-gray-500 mb-5">彙整各主題頁面中的緊急警訊，出現以下任一情況請立即就醫或撥打119</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {redFlags.map(r => (
              <Alert key={r.cat} tone="danger" label="紅旗" title={r.cat}>
                <ul className="space-y-1.5 list-disc list-inside">
                  {r.items.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              </Alert>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('diseases')}
            className="flex items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-left hover:bg-indigo-100 transition-colors"
          >
            <span className="text-2xl">🏥</span>
            <div>
              <p className="font-semibold text-indigo-800 text-sm">認識常見疾病</p>
              <p className="text-xs text-indigo-600">腸病毒、肺炎、流感等辨識與照護</p>
            </div>
            <span className="ml-auto text-indigo-400">→</span>
          </button>
          <button
            onClick={() => navigate('emergency')}
            className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 text-left hover:bg-red-100 transition-colors"
          >
            <span className="text-2xl">🚑</span>
            <div>
              <p className="font-semibold text-red-800 text-sm">緊急狀況判斷</p>
              <p className="text-xs text-red-600">熱痙攣、異物哽塞等緊急處理</p>
            </div>
            <span className="ml-auto text-red-400">→</span>
          </button>
        </div>

        <div className="text-center">
          <button onClick={() => navigate('home')} className="text-sm text-orange-500 hover:text-orange-700 underline">
            ← 返回首頁
          </button>
        </div>
      </div>
    </div>
  )
}
