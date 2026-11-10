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

const symptoms = [
  {
    id: 'fever',
    emoji: '🌡️',
    title: '發燒',
    subtitle: '體溫 ≥ 38°C（肛溫）',
    concept: [
      '發燒是身體對抗感染的正常免疫反應：體溫上升有助抑制病原體繁殖、活化免疫細胞，是身體正在「作戰」的訊號，不等於疾病本身',
      '體溫的「高低」不直接等於病情嚴重度，觀察孩子的精神活力、食慾、呼吸狀況，比單看溫度數字更重要',
      '用藥的目的是讓孩子感到舒服，不是把體溫壓到正常值；退燒後幾小時體溫再次上升是常見現象，不代表藥物無效或病情惡化',
      '3 個月以下嬰兒發燒（肛溫 ≥38°C）是特殊警訊，新生兒免疫系統尚未成熟，須直接就醫評估，不適用一般在家觀察原則',
    ],
    care: [
      '補充足夠水分（母乳、配方奶、開水）',
      '穿著舒適輕薄衣物，避免包太緊',
      '體溫 ≥ 38.5°C 且孩子感到不舒服時，可使用退燒藥',
      '溫水擦澡可輔助降溫（水溫約 30–37°C）',
      '記錄發燒時間、最高溫度及退燒藥使用時間',
    ],
    medication: [
      '常用退燒藥為乙醯胺酚（Acetaminophen，如普拿疼）與布洛芬（Ibuprofen，如美林），須依醫師／藥師指示的體重劑量給藥，不可自行增量',
      '同一種藥物兩劑之間，乙醯胺酚需間隔至少4–6小時、布洛芬需間隔至少6–8小時，24小時內不超過建議總劑量',
      '若考慮兩種藥物交替使用，務必先詢問醫師或藥師確認劑量與間隔時間，避免因換算錯誤或分工混亂而不慎過量給藥',
      '務必確認手邊所有藥品（包含複方感冒糖漿）是否已含有乙醯胺酚或布洛芬成分，重複用藥是最常見的過量原因',
      '布洛芬不適用於6個月以下嬰兒、嚴重脫水或水痘感染中的幼兒，使用前務必詢問醫師',
      '孩子精神活力良好、體溫略高但無明顯不適時，不一定需要立即用藥',
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
  {
    id: 'diaper-rash',
    emoji: '🍑',
    title: '尿布疹',
    subtitle: '尿布包覆範圍內的刺激性皮膚炎，需與念珠菌感染區分',
    signs: [
      '好發於尿布包覆的屁股、鼠蹊部，皮膚皺褶處通常不受影響',
      '皮膚泛紅、局部脫皮，嚴重時可能破皮或滲液',
      '若皮膚皺褶處也出現紅疹、邊緣清楚且周圍散布小紅疹（衛星病灶），需懷疑念珠菌（黴菌）感染尿布疹',
    ],
    care: [
      '勤換尿布，減少皮膚與排泄物接觸的時間',
      '每次更換時以溫水清潔，輕輕拍乾而非用力擦拭',
      '塗抹足量氧化鋅或凡士林等隔離型護膚膏，形成保護層',
      '適度讓屁股透氣，可安排短時間不包尿布',
      '若懷疑念珠菌感染，一般護膚膏無效，需醫師開立抗黴菌藥膏',
    ],
    emergency: [
      '疹子出現水泡、化膿或明顯滲液',
      '合併發燒',
      '擦護膚膏3–5天未改善或持續惡化',
      '範圍迅速擴大，超出尿布包覆範圍',
    ],
  },
  {
    id: 'eczema',
    emoji: '🧴',
    title: '濕疹',
    subtitle: '嬰幼兒常見的皮膚乾燥發炎，好發於臉頰與四肢伸側',
    signs: [
      '好發於臉頰、頭皮、四肢伸側，皮膚乾燥粗糙、泛紅',
      '可能有細小丘疹，搔癢明顯，寶寶會磨蹭或搔抓',
      '症狀時好時壞，常因環境乾燥、悶熱、口水刺激而加劇',
    ],
    care: [
      '加強保濕是核心：每日至少塗抹保濕乳液2次以上，洗澡後3分鐘內立即塗抹鎖水',
      '洗澡水溫不宜過高（約37–38°C），時間不超過10分鐘，避免過度使用清潔劑',
      '選擇無香料、無皂鹼的溫和沐浴清潔品',
      '剪短指甲，必要時夜間可戴透氣手套避免抓破皮膚',
      '依醫師指示使用外用類固醇藥膏控制發炎，勿自行長期使用或自行停藥',
    ],
    emergency: [
      '皮膚出現黃色結痂、化膿等感染徵象',
      '搔癢劇烈已影響睡眠，且加強保濕仍無法改善',
      '疹子快速擴散並合併發燒',
    ],
  },
  {
    id: 'atopic-dermatitis',
    emoji: '🌿',
    title: '異位性皮膚炎',
    subtitle: '慢性反覆發作的過敏體質皮膚病，目標為長期穩定控制',
    signs: [
      '屬於慢性、反覆發作的皮膚疾病，常與過敏體質（氣喘、過敏性鼻炎）家族史相關',
      '嬰兒期好發於臉頰、頭皮及四肢伸側；較大幼兒常轉為肘窩、膝窩等關節屈側',
      '皮膚長期乾燥，搔癢劇烈，反覆搔抓可能造成皮膚增厚、色素沉澱',
    ],
    care: [
      '「保濕、保濕、保濕」是治療基礎：每日多次規律塗抹足量保濕劑，即使沒有發作也要持續使用',
      '急性發作期依醫師指示使用適當強度的外用藥膏，並依指示逐漸減量，勿自行驟停',
      '找出並避免個人誘發因子（特定衣物材質、清潔用品、悶熱流汗、塵蟎等）',
      '嚴重、反覆發作或懷疑食物誘發者，建議轉介皮膚科或過敏免疫科進一步評估',
      '異位性皮膚炎為慢性病程，目標是長期穩定控制，而非一次「根治」，須與醫療團隊長期配合',
    ],
    emergency: [
      '皮膚大範圍破損合併發燒、化膿，需排除細菌或疱疹病毒感染（疱疹性濕疹屬皮膚科急症）',
      '症狀嚴重影響睡眠與生活品質，一般保濕與藥膏控制效果不佳',
      '合併明顯呼吸道過敏症狀（如喘鳴），需一併評估',
    ],
  },
]

function SymptomCard({ s }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-surface-muted transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">{s.emoji}</span>
          <div>
            <h3 className="font-bold text-ink text-lg">{s.title}</h3>
            <p className="text-sm text-ink-muted">{s.subtitle}</p>
          </div>
        </div>
        <span className="text-ink-muted text-xl transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
          ▾
        </span>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-4">
          {s.concept && (
            <div className="bg-cat-lav-bg border border-cat-lav-fg/20 rounded-2xl p-4">
              <h4 className="font-semibold text-cat-lav-fg text-sm mb-3">💡 正確觀念</h4>
              <ul className="space-y-2">
                {s.concept.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm text-cat-lav-fg">
                    <span className="shrink-0">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {s.signs && (
            <div className="bg-surface-muted rounded-2xl p-4">
              <h4 className="font-semibold text-ink text-sm mb-3">🔍 辨識重點</h4>
              <ul className="space-y-2">
                {s.signs.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink-muted">
                    <span className="text-ink-muted shrink-0">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="bg-surface-muted rounded-2xl p-4">
            <h4 className="font-semibold text-ink text-sm mb-3">🏠 居家照護建議</h4>
            <ul className="space-y-2">
              {s.care.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-muted">
                  <span aria-hidden="true" className="text-success-fg shrink-0">✓</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          {s.medication && (
            <div className="bg-cat-teal-bg border border-cat-teal-fg/20 rounded-2xl p-4">
              <h4 className="font-semibold text-cat-teal-fg text-sm mb-3">💊 退燒藥使用順序（防過量給藥）</h4>
              <ul className="space-y-2">
                {s.medication.map((m, i) => (
                  <li key={i} className="flex gap-2 text-sm text-cat-teal-fg">
                    <span className="shrink-0">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Alert tone="danger" label="立即就醫" title="立即就醫時機">
            <ul className="space-y-2 mt-2">
              {s.emergency.map((e, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden="true" className="shrink-0">•</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </Alert>
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
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Alert tone="danger" label="緊急" title="緊急情況請立即撥打 119 或前往急診" strong className="mb-10">
          <p>若幼兒出現意識不清、呼吸困難、嚴重過敏等症狀，不要等待，請立即就醫。</p>
        </Alert>

        <div className="space-y-4 mb-10">
          {symptoms.map(s => <SymptomCard key={s.id} s={s} />)}
        </div>

        <Alert tone="warning" label="提醒" title="何時應帶幼兒就醫？">
          <p>
            若您直覺覺得「不太對勁」，請相信家長的直覺，
            就算最後什麼都沒有，帶去看醫生也是正確的選擇。
            比較狀況總是可以在下次更準確地判斷。
          </p>
        </Alert>

        <div className="mt-4 bg-surface-muted border border-border rounded-2xl p-3 flex gap-2 text-xs text-ink-muted leading-relaxed">
          <span className="shrink-0">📋</span>
          <p>資料參考：衛生福利部疾病管制署、台灣兒科醫學會發燒與退燒藥使用衛教資料、皮膚科兒童常見皮膚問題衛教資訊。個別用藥劑量與間隔仍請以醫師或藥師指示為準。</p>
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
