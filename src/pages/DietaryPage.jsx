import { useState } from 'react'
import { Alert } from '../components/Alert'

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

const positions = [
  { name: '搖籃式', desc: '寶寶身體側向媽媽，頭靠在手肘內側，肚子貼肚子，是最常見的基本姿勢' },
  { name: '交叉搖籃式', desc: '以對側手臂支撐寶寶頭頸，另一手托乳房，適合新生兒或含乳困難時微調角度' },
  { name: '橄欖球式（football hold）', desc: '寶寶身體夾在腋下、腳朝媽媽身後，適合剖腹產傷口未癒或雙胞胎同時哺乳' },
  { name: '側躺式', desc: '媽媽與寶寶面對面側躺，適合夜間哺乳或會陰傷口不適時' },
]

const latchSigns = [
  '下巴緊貼乳房、鼻子輕觸或留有呼吸空間',
  '嘴巴張大呈魚嘴狀，含住大部分乳暈而非只含乳頭',
  '下唇外翻，可聽到規律的吞嚥聲（非啧啧聲）',
  '媽媽哺乳時不覺尖銳疼痛，僅初期輕微牽扯感',
]

const breastIssues = [
  {
    name: '漲奶（Engorgement）',
    emoji: '🎈',
    tag: 'bg-sky-50 border-sky-200 text-sky-800',
    desc: '乳房脹硬、疼痛，常發生於產後3–5天退奶或哺乳間隔過長時',
    steps: ['哺乳前溫敷、輕輕按摩幫助噴乳反射', '哺乳後可冷敷消腫止痛', '勤哺乳或以手擠/吸乳器排空，避免間隔過久'],
  },
  {
    name: '乳腺炎（Mastitis）',
    emoji: '🔥',
    tag: 'bg-red-50 border-red-200 text-red-800',
    desc: '局部紅腫熱痛、常合併發燒與類流感症狀，多由乳汁滯留或細菌感染引起',
    steps: ['持續哺乳患側，乳汁排空是最重要的處理原則', '哺乳前熱敷、哺乳時輕柔按摩硬塊處', '症狀持續超過24小時或發燒不退，應盡快就醫評估是否需抗生素治療'],
  },
  {
    name: '回奶／退奶',
    emoji: '📉',
    tag: 'bg-amber-50 border-amber-200 text-amber-800',
    desc: '部分食物或藥物可能抑制乳汁分泌',
    steps: ['薄荷、韭菜、麥芽（麥芽糖）等傳統上被認為有退奶效果，哺乳期宜留意攝取量', '若需主動退奶，建議逐漸減少哺乳/擠乳次數，避免驟停造成乳腺炎', '退奶期間仍脹痛可局部冷敷緩解不適'],
  },
]

const pumpingTips = [
  '手擠乳或吸乳器皆可，初期可搭配熱敷與按摩幫助噴乳反射',
  '擠出的母乳建議分裝小份量（60–120ml／袋），標註擠乳日期，方便先進先出使用',
  '解凍以冷藏隔夜退冰或流動溫水沖泡為原則，不可用微波爐（受熱不均且破壞營養素）',
  '解凍後的母乳不可重新冷凍，室溫下應於2小時內用完',
]

const formulaChoice = [
  { q: '基本選擇原則', a: '選擇通過衛福部查驗登記、符合國際 Codex Alimentarius 嬰兒配方標準的品牌；1 歲前使用「1 段」嬰兒配方即可，無需迷信高價或特殊訴求產品' },
  { q: '特殊配方', a: '標榜「防過敏」「部分水解」等特殊配方奶粉，屬於醫療需求用途，應由醫師評估後才使用，不建議自行更換' },
  { q: '更換品牌', a: '若需更換奶粉廠牌，建議與原配方漸進混合替換 3–5 天，觀察排便與消化狀況再全面替換' },
  { q: '早產兒／特殊需求', a: '早產兒或有代謝疾病等特殊需求的寶寶，配方奶選擇務必依醫師或營養師指示，不可自行選購一般配方替代' },
]

const formulaSafety = [
  '嬰兒配方奶粉並非無菌產品，可能含有極少量的阪崎腸桿菌（Cronobacter sakazakii）等病原菌，正確沖泡溫度是關鍵防護',
  '沖泡水應先煮沸，放涼至不低於70°C 時沖泡（可有效降低病菌風險），再降溫至體溫後餵食',
  '沖泡順序：先加水，量好水量後再加入奶粉，避免先加粉造成濃度過高，增加腎臟負擔',
  '沖泡好的奶應盡快餵食，室溫下最多放置2小時，不建議放入保溫瓶長時間保溫（適合細菌繁殖）',
  '奶瓶、奶嘴等哺乳器具使用前應澈底清潔並定期消毒（煮沸、蒸氣或消毒鍋皆可）',
]

const solidPrinciples = [
  {
    emoji: '📅', title: '添加時機',
    desc: '一般建議滿6個月開始，觀察寶寶是否能穩坐、對食物有興趣、推舌反射消失等準備訊號，不建議早於4個月',
  },
  {
    emoji: '🩸', title: '鐵質優先',
    desc: '純母乳寶寶體內鐵儲存約在6個月後逐漸下降，開始副食品時應優先提供高鐵食物，如鐵強化穀物、紅肉泥、蛋黃泥',
  },
  {
    emoji: '🥜', title: '過敏原及早、規律引入',
    desc: '目前實證（如 LEAP 研究）顯示延後添加花生、蛋等常見過敏原食物並不會降低過敏機率，建議在4–6個月開始副食品後即可少量、單一嘗試常見過敏原食物，之後規律持續給予；異位性皮膚炎或有家族過敏史者，建議先諮詢醫師',
  },
  {
    emoji: '🍽️', title: '質地與分量漸進',
    desc: '質地依發展從細滑泥狀逐步進展到碎狀、小塊狀，分量則依寶寶飢飽訊號調整，不強迫吃完',
  },
]

const solidFoods = [
  {
    range: '4–6 個月',
    emoji: '🌾',
    texture: '細滑泥狀',
    foods: ['鐵強化米糊、燕麥糊', '南瓜泥、地瓜泥', '蘋果泥、香蕉泥', '胡蘿蔔泥'],
    tips: ['從單一食材開始，每次嘗試新食材觀察 3–5 天', '一次一種新食物，確認無過敏反應', '不加鹽、糖或調味料'],
  },
  {
    range: '7–8 個月',
    emoji: '🥦',
    texture: '泥狀至粗泥',
    foods: ['各種蔬菜泥（花椰菜、青豆、菠菜）', '肉泥（雞肉、豬肉）', '豆腐泥', '蛋黃、全蛋泥'],
    tips: ['可開始混合食材', '質地逐漸加粗', '每日 1–2 次副食品'],
  },
  {
    range: '9–11 個月',
    emoji: '🍗',
    texture: '軟爛小塊狀',
    foods: ['軟煮米飯、粥', '軟嫩肉片、魚肉（去骨）', '蛋（全蛋）', '各種水果小塊', '豆類（軟煮）'],
    tips: ['可以手指食物（Finger Food）練習自主進食', '餐具練習：湯匙、杯子', '每日 2–3 次副食品'],
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

const blwPoints = [
  { q: '什麼是 BLW？', a: '寶寶主導式進食（Baby-Led Weaning）指讓寶寶從副食品初期就自己用手抓取條狀、塊狀食物進食，跳過或減少湯匙餵食泥狀食物的階段' },
  { q: '開始前提', a: '寶寶能自行穩坐、有一定抓握能力、對食物表現興趣，通常與6個月開始副食品的時機一致' },
  { q: '食物型態', a: '切成寶寶好抓握的條狀（約成人手指長度），質地需軟到用牙齦即可壓扁，避免圓形、硬脆、易噎食物' },
  { q: '哽塞 vs 作嘔反射', a: '作嘔反射（gagging）是寶寶把食物推向口腔前方的正常保護機制，會咳嗽、臉紅但仍可呼吸出聲；真正哽塞（choking）則是無法出聲、臉色發紫，需立即施行異物梗塞急救' },
  { q: '安全原則', a: '全程需有大人在旁看顧、讓寶寶坐直進食，避免整顆葡萄、堅果、爆米花等高哽塞風險食物' },
]

const foodGroups = [
  { group: '全穀雜糧類', amount: '1.5～2 碗', note: '米飯、麵條、地瓜等主食' },
  { group: '豆魚蛋肉類', amount: '3 份', note: '蛋、豆腐、魚肉、瘦肉等蛋白質來源' },
  { group: '乳品類', amount: '2 份（約480ml）', note: '全脂鮮奶、優格、起司' },
  { group: '蔬菜類', amount: '1.5 份', note: '深色蔬菜佔一半以上' },
  { group: '水果類', amount: '1～1.5 份', note: '以新鮮水果為主，避免果汁取代' },
  { group: '油脂與堅果種子類', amount: '3～4 茶匙＋1 份堅果', note: '堅果需磨粉或壓碎避免哽塞' },
]

const microNutrients = [
  { name: '鐵', value: '約 10 毫克/日', why: '缺乏易致缺鐵性貧血，影響認知發展，來源：紅肉、蛋黃、深綠色蔬菜' },
  { name: '鋅', value: '約 5 毫克/日', why: '影響食慾與生長發育，來源：肉類、海鮮、全穀類' },
  { name: '鈣', value: '約 500 毫克/日', why: '骨骼牙齒發育所需，來源：乳品、豆腐、小魚乾' },
  { name: '維生素 D', value: '約 10 微克/日（400 IU）', why: '幫助鈣質吸收，來源：日曬、蛋黃、魚類，必要時醫師評估補充' },
]

const pickyEatingTips = [
  '新食物平均需要接觸 8～15 次才可能被接受，多次少量嘗試比強迫吃完更有效',
  '家長以身作則，展現吃各種食物的正向態度，孩子會模仿大人的飲食行為',
  '避免以食物作為獎勵或懲罰（如「吃完飯才能玩」），容易讓孩子對食物產生負面連結',
  '建立規律三餐＋1～2次點心的作息，兩餐間避免零食、含糖飲料，維持適度飢餓感',
  '讓孩子參與簡單備餐（洗菜、擺餐具），提高對食物的興趣與掌控感',
  '單一次不吃某樣食物不必過度緊張，觀察整體一週的飲食均衡即可',
]

const weaningTips = [
  { q: '斷奶的定義', a: '從以母乳／配方奶為主要營養來源，逐漸轉換為以一般固體食物為主，同時將奶瓶飲用習慣轉換為杯子' },
  { q: '時機沒有強制標準', a: 'WHO 建議純母乳哺育至6個月，之後持續哺乳並添加副食品至2歲或以上；何時完全斷奶依親子意願與需求決定，非強制時間表' },
  { q: '奶瓶轉杯子', a: '建議1歲左右開始以學習杯練習喝奶、喝水，1歲後逐步減少奶瓶使用，2歲前完成奶瓶轉換有助口腔發展與避免早期蛀牙' },
  { q: '循序漸進的順序', a: '先減少白天較不依戀的一餐奶瓶／哺乳，以正餐或點心取代；睡前奶或起床奶通常是孩子情感依附最深的一餐，建議放到最後再戒除' },
  { q: '情緒與依附照顧', a: '斷奶不只是營養轉換，也牽涉親子依附調整；戒除某次哺乳/奶瓶時，建議以擁抱、陪伴、共讀等方式補足安撫需求，減少孩子的不安' },
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
        title="營養與餵食"
        subtitle="母乳哺育、配方奶、副食品添加、1-3歲均衡飲食與斷奶轉銜"
        color="bg-gradient-to-br from-amber-50 to-orange-100"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex rounded-2xl bg-orange-100 p-1 mb-10 gap-1 overflow-x-auto">
          {[
            { id: 'breast', label: '🤱 母乳哺育' },
            { id: 'formula', label: '🍼 配方奶' },
            { id: 'solid', label: '🥣 副食品' },
            { id: 'toddler', label: '🍽️ 1-3歲飲食' },
            { id: 'weaning', label: '🔄 斷奶轉銜' },
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
                  { q: 'WHO 建議', a: '純母乳哺育至 6 個月，加入副食品後持續哺乳至 2 歲或更久' },
                ].map(item => (
                  <div key={item.q} className="bg-white rounded-2xl p-4">
                    <p className="font-semibold text-pink-700 text-sm mb-1">📌 {item.q}</p>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🪑</span> 正確哺乳姿勢
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {positions.map(p => (
                  <div key={p.name} className="bg-pink-50 border border-pink-100 rounded-2xl p-4">
                    <p className="font-semibold text-pink-700 text-sm mb-1">{p.name}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
              <Alert tone="success" label="正確" title="正確含乳的判斷訊號">
                <ul className="space-y-1 list-disc list-inside">
                  {latchSigns.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </Alert>
            </section>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🍼</span> 擠奶與保存
              </h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {pumpingTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🩺</span> 常見哺乳問題處理
              </h2>
              <div className="space-y-4">
                {breastIssues.map(issue => (
                  <div key={issue.name} className={`border-2 rounded-2xl p-5 ${issue.tag}`}>
                    <p className="font-bold text-sm mb-1 flex items-center gap-2">
                      <span className="text-xl">{issue.emoji}</span> {issue.name}
                    </p>
                    <p className="text-sm mb-3 opacity-90">{issue.desc}</p>
                    <ul className="text-sm space-y-1 list-disc list-inside opacity-90">
                      {issue.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <SourceNote>
              資料參考：WHO/UNICEF 母乳哺育指引、衛福部國健署母乳哺育衛教資料、Academy of Breastfeeding Medicine 乳腺炎臨床指引（Protocol #36, 2022）。個別哺乳狀況仍建議諮詢泌乳顧問或醫療人員。
            </SourceNote>
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
                  { q: '保存期限', a: '已沖好的奶粉室溫 2 小時內用完；冷藏可 24 小時；不可使用微波加熱' },
                ].map(item => (
                  <div key={item.q} className="bg-white rounded-2xl p-4">
                    <p className="font-semibold text-blue-700 text-sm mb-1">📌 {item.q}</p>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🔍</span> 選擇原則
              </h2>
              <div className="space-y-3">
                {formulaChoice.map(item => (
                  <div key={item.q} className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                    <p className="font-semibold text-blue-700 text-sm mb-1">{item.q}</p>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border-2 border-red-100 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🌡️</span> 調配安全（避免細菌污染）
              </h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {formulaSafety.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <SourceNote>
              資料參考：WHO/FAO《Safe preparation, storage and handling of powdered infant formula》調配安全指引（2007）、衛福部國健署配方奶哺餵衛教資料。
            </SourceNote>
          </div>
        )}

        {/* Solid foods */}
        {tab === 'solid' && (
          <div className="space-y-5">
            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎯</span> 副食品添加四大原則
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {solidPrinciples.map(p => (
                  <div key={p.title} className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                    <p className="font-semibold text-orange-700 text-sm mb-1">{p.emoji} {p.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

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
                          <span aria-hidden="true" className="text-success-fg">✓</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            <section className="bg-white border-2 border-teal-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>✋</span> BLW 寶寶主導式進食
              </h2>
              <div className="space-y-3">
                {blwPoints.map(item => (
                  <div key={item.q} className="bg-teal-50 border border-teal-100 rounded-2xl p-4">
                    <p className="font-semibold text-teal-700 text-sm mb-1">{item.q}</p>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <SourceNote>
              資料參考：衛福部國健署《嬰幼兒副食品添加手冊》、Du Toit et al., LEAP Study（NEJM, 2015）過敏原早期引入實證、Gill Rapley《Baby-Led Weaning》BLW 理論。
            </SourceNote>
          </div>
        )}

        {/* 1-3 toddler diet */}
        {tab === 'toddler' && (
          <div className="space-y-5">
            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>⚖️</span> 每日六大類食物參考量（1–3歲）
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-amber-50 text-amber-800">
                      <th className="border border-amber-200 p-2 text-left">食物類別</th>
                      <th className="border border-amber-200 p-2 text-left">建議份量</th>
                      <th className="border border-amber-200 p-2 text-left">說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodGroups.map(g => (
                      <tr key={g.group}>
                        <td className="border border-gray-200 p-2 font-medium text-gray-700">{g.group}</td>
                        <td className="border border-gray-200 p-2 text-gray-600">{g.amount}</td>
                        <td className="border border-gray-200 p-2 text-gray-500 text-xs">{g.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🧪</span> 重點營養素參考攝取量
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {microNutrients.map(n => (
                  <div key={n.name} className="bg-lime-50 border border-lime-200 rounded-2xl p-4">
                    <p className="font-semibold text-lime-800 text-sm mb-1">{n.name}：{n.value}</p>
                    <p className="text-xs text-lime-700">{n.why}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border-2 border-orange-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🙅</span> 挑食處理技巧
              </h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {pickyEatingTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <SourceNote>
              資料參考：衛福部國健署「每日飲食指南」幼兒版、「國人膳食營養素參考攝取量」第八版（DRIs）。數值為一般健康幼兒參考範圍，個別需求仍請諮詢兒科醫師或營養師。
            </SourceNote>
          </div>
        )}

        {/* Weaning transition */}
        {tab === 'weaning' && (
          <div className="space-y-5">
            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🔄</span> 斷奶轉銜建議
              </h2>
              <div className="space-y-3">
                {weaningTips.map(item => (
                  <div key={item.q} className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
                    <p className="font-semibold text-violet-700 text-sm mb-1">{item.q}</p>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
            <SourceNote>
              資料參考：WHO 哺乳與離乳建議、衛福部國健署母乳哺育及斷奶衛教資料。斷奶步調應以親子雙方感受為主，無須與他人比較時程。
            </SourceNote>
          </div>
        )}

        {/* Avoid foods */}
        {tab === 'avoid' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">以下食物在特定年齡前應避免給予</p>
            {avoidFoods.map(item => (
              <Alert
                key={item.food}
                tone={item.urgent ? 'danger' : 'warning'}
                label={item.urgent ? '禁止' : '注意'}
                title={item.food}
              >
                <p>{item.reason}</p>
              </Alert>
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
