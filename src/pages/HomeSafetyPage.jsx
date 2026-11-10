import { useState } from 'react'
import { Alert } from '../components/Alert'

function PageHeader({ emoji, title, subtitle }) {
  return (
    <div className="bg-canvas border-b border-border py-12 px-6 text-center">
      <div className="text-6xl mb-4">{emoji}</div>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-2">{title}</h1>
      <p className="text-ink-muted text-sm max-w-xl mx-auto">{subtitle}</p>
    </div>
  )
}

function SourceNote({ children }) {
  return (
    <div className="bg-surface-muted border border-border rounded-2xl p-3 flex gap-2 text-xs text-ink-muted leading-relaxed">
      <span className="shrink-0">📋</span>
      <p>{children}</p>
    </div>
  )
}

const rooms = [
  {
    room: '床鋪', emoji: '🛏️',
    tips: [
      '嬰兒床欄杆間距應小於6公分，避免頭部卡入',
      '床墊應與床架密合、無縫隙',
      '嬰兒床避免放置枕頭、棉被、玩偶（詳見「新生兒安全與警訊」SIDS安全睡眠原則）',
      '避免與嬰兒同床共寢，防止翻身悶壓或掉落床縫',
      '嬰兒床遠離窗簾繩、電線，避免纏繞勒頸',
    ],
  },
  {
    room: '浴室', emoji: '🛁',
    tips: [
      '洗澡水溫先用手肘或溫度計測試，不超過40°C，熱水器可設定防燙水溫',
      '幼兒在浴缸／澡盆內絕不可獨處，即使只是拿條毛巾的時間也不行',
      '地面鋪防滑墊，避免濕滑跌倒',
      '清潔劑、藥品等放置於幼兒無法拿取的高處或上鎖櫃內',
    ],
  },
  {
    room: '廚房', emoji: '🍳',
    tips: [
      '鍋柄轉向內側，避免幼兒拉扯打翻熱湯熱油',
      '使用爐具烹煮時避免同時抱著幼兒',
      '刀具、火柴、打火機等收納於幼兒無法取得處',
      '熱飲、熱湯遠離桌緣，避免幼兒抓拉桌布造成燙傷',
      '廚房下方櫥櫃加裝安全鎖',
    ],
  },
  {
    room: '窗戶／陽台', emoji: '🪟',
    tips: [
      '窗戶加裝安全鎖或限位器，開窗縫隙不超過10公分',
      '床、沙發、書櫃等家具不擺放於窗邊，避免幼兒攀爬墜落',
      '窗簾繩、百葉窗拉繩應收納或改用無繩產品，避免纏繞勒頸',
      '陽台、樓梯口加裝安全門欄',
    ],
  },
  {
    room: '電器', emoji: '🔌',
    tips: [
      '插座加裝安全蓋，避免幼兒手指或物品插入觸電',
      '電線收納整理，避免幼兒絆倒或拉扯電器掉落',
      '熨斗、電暖器等高溫電器使用後立即拔除插頭並置於幼兒無法觸及處',
      '電風扇加裝防護網，避免手指伸入',
    ],
  },
  {
    room: '藥物與化學物', emoji: '💊',
    tips: [
      '所有藥品、清潔劑、殺蟲劑應存放於幼兒看不到、拿不到的高處鎖櫃',
      '選用有兒童安全瓶蓋的藥品包裝',
      '絕不將藥品裝入飲料瓶等容易誤認的容器',
      '家中訪客（如長輩）攜帶的藥物也須提醒收好，避免掉落地上被幼兒撿食',
    ],
  },
  {
    room: '小物品', emoji: '🧷',
    tips: [
      '硬幣、鈕扣、電池（尤其鈕扣電池，誤食腐蝕性極高，須立即就醫）、彈珠等小物收納於幼兒無法取得處',
      '定期檢查地面、沙發縫隙有無掉落小物',
      '玩具零件定期檢查是否有鬆脫風險',
      '未充氣或破裂的氣球碎片是窒息高風險物品，使用時須大人全程在旁',
    ],
  },
]

const preventionCategories = [
  {
    title: '窒息預防', emoji: '🫁',
    tips: [
      '食物切成安全大小，避免圓形、硬脆、整顆餵食（葡萄、堅果、果凍等）',
      '睡眠環境保持淨空（參照SIDS安全睡眠原則）',
      '小物品、玩具零件、氣球妥善收納',
      '進食時保持坐姿，避免邊玩邊吃、邊哭邊吃',
    ],
  },
  {
    title: '燒燙傷預防', emoji: '🔥',
    tips: [
      '熱水瓶、飲水機加裝防燙鎖，鍋具遠離爐火邊緣與桌緣',
      '洗澡水溫先測試再讓幼兒入浴',
      '避免抱著幼兒喝熱飲、煮食',
      '電暖器、暖爐加裝防護網並遠離幼兒活動範圍',
    ],
  },
  {
    title: '跌倒／墜落預防', emoji: '🪜',
    tips: [
      '樓梯口、陽台裝設安全門欄',
      '窗戶加裝限位器',
      '國際上已不建議使用學步車，因會增加跌落樓梯及其他傷害風險',
      '換尿布、穿衣時手不離開幼兒身體，避免從床或尿布台跌落',
    ],
  },
  {
    title: '車禍預防', emoji: '🚗',
    tips: [
      '全程使用符合國家標準的兒童安全座椅，依體重／年齡選擇合適款式並正確安裝',
      '未滿4歲或體重18公斤以下應優先使用後向式安全座椅',
      '絕不將幼兒單獨留在車內，即使短暫離開，車內溫度也可能在數分鐘內快速上升',
      '上下車時注意車輛周遭動態，避免幼兒突然衝出',
    ],
  },
  {
    title: '溺水預防', emoji: '🌊',
    tips: [
      '幼兒在水邊（浴缸、泳池、水桶）須全程有大人伸手可及範圍內看顧，不可滑手機分心',
      '家中水桶、水盆用畢立即倒空，避免積水',
      '游泳池、戲水池加裝圍欄與自動上鎖門',
      '幼兒溺水通常安靜無聲、不會呼救掙扎，須主動注意而非等待呼救聲',
    ],
  },
]

const toySafety = [
  '選購玩具認明商品檢驗合格標識（如國家標準CNS玩具安全標準、歐盟CE、美國ASTM F963等認證標章）',
  '依照玩具包裝標示的適用年齡選購，勿因孩子看起來成熟就提前給予不適齡玩具',
  '小零件測試：若玩具或零件可完全放入直徑約3.17公分的圓柱容器，即有吞入哽塞風險，不適合3歲以下幼兒',
  '定期檢查玩具有無破損、鬆脫零件、電池外露等狀況，損壞玩具應立即淘汰',
  '電池玩具需確認電池艙有螺絲鎖固，避免幼兒輕易打開取出鈕扣電池',
  '布毛絨玩具選擇可水洗材質，定期清潔避免塵蟎孳生',
  '避免長繩、絲帶類玩具或掛飾，以免纏繞勒頸',
]

export default function HomeSafetyPage({ navigate, initialTab }) {
  const [tab, setTab] = useState(initialTab || 'rooms')

  return (
    <div>
      <PageHeader
        emoji="🏠"
        title="居家安全與意外預防"
        subtitle="居家安全陷阱檢查、五大意外類型預防、玩具與環境安全標準"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex rounded-2xl bg-surface-muted border border-border p-1 mb-10 gap-1 overflow-x-auto">
          {[
            { id: 'rooms', label: '🏠 居家安全陷阱' },
            { id: 'prevention', label: '🚸 意外預防' },
            { id: 'toys', label: '🧸 玩具與環境安全' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-brand text-on-brand shadow' : 'text-ink-muted hover:bg-brand-soft hover:text-brand'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'rooms' && (
          <div className="space-y-4">
            {rooms.map(r => (
              <div key={r.room} className="bg-surface border border-border rounded-2xl p-5">
                <p className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                  <span className="text-xl">{r.emoji}</span> {r.room}
                </p>
                <ul className="text-sm text-ink-muted space-y-1.5 list-disc list-inside">
                  {r.tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            ))}
            <SourceNote>
              資料參考：衛生福利部國民健康署事故傷害防制衛教資料、美國兒科醫學會（AAP）居家安全指引。
            </SourceNote>
          </div>
        )}

        {tab === 'prevention' && (
          <div className="space-y-4">
            {preventionCategories.map(c => (
              <div key={c.title} className="bg-surface border border-border rounded-2xl p-5">
                <p className="font-bold text-ink text-sm mb-3 flex items-center gap-2">
                  <span className="text-xl">{c.emoji}</span> {c.title}
                </p>
                <ul className="text-sm text-ink-muted space-y-1.5 list-disc list-inside">
                  {c.tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            ))}
            <Alert tone="danger" label="緊急">
              <p>
                若意外已經發生（哽塞、燒燙傷、跌落撞頭等），請立即前往「緊急狀況判斷」頁面查看正確處理步驟，
                嚴重時勿猶豫，直接撥打119。
              </p>
            </Alert>
            <SourceNote>
              資料參考：衛生福利部國民健康署事故傷害防制五大類（跌墜、燒燙傷、溺水、車禍、異物梗塞）衛教資料、道路交通安全規則兒童安全座椅相關規定。
            </SourceNote>
          </div>
        )}

        {tab === 'toys' && (
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="font-bold text-ink text-lg mb-4">🧸 玩具與環境安全標準</h2>
              <ul className="text-sm text-ink-muted space-y-2 list-disc list-inside">
                {toySafety.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <SourceNote>
              資料參考：經濟部標準檢驗局CNS玩具商品檢驗規定、美國消費品安全委員會（CPSC）兒童玩具安全指引。
            </SourceNote>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('emergency')}
            className="flex items-center gap-3 bg-surface border border-border rounded-2xl p-4 text-left hover:bg-brand-soft transition-colors"
          >
            <span className="text-2xl">🚑</span>
            <div>
              <p className="font-semibold text-ink text-sm">緊急狀況判斷</p>
              <p className="text-xs text-ink-muted">CPR、異物哽塞、燒燙傷、頭部撞傷處理</p>
            </div>
            <span className="ml-auto text-brand">→</span>
          </button>
          <button
            onClick={() => navigate('newborn-safety')}
            className="flex items-center gap-3 bg-surface border border-border rounded-2xl p-4 text-left hover:bg-brand-soft transition-colors"
          >
            <span className="text-2xl">🛡️</span>
            <div>
              <p className="font-semibold text-ink text-sm">新生兒安全與警訊</p>
              <p className="text-xs text-ink-muted">SIDS安全睡眠環境圖解</p>
            </div>
            <span className="ml-auto text-brand">→</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => navigate('home')} className="text-sm text-brand hover:opacity-80 underline underline-offset-4">
            ← 返回首頁
          </button>
        </div>
      </div>
    </div>
  )
}
