// 依月齡探索（age-guide）內容設定
// ─────────────────────────────────────────────────────────────────
// 規則：
// • 從現有頁面取用的內容一律「引用」共用資料（不複製文字），並註明來源頁面
//   - 發展重點：src/data/milestones.js（生長里程碑頁）
//   - 疫苗與健檢：src/data/vaccines.js（疫苗接種頁）—— 不可在此另寫疫苗內容
//   - 睡眠時數：src/data/sleep.js（日常照護頁）
//   - 飲食提示：dietStages（原首頁「依月齡快速導覽」）
// • 新撰寫的內容（最重要的 3 件事、安全提醒）每條都標註 // 待護理師確認
// • buildGuide() 會檢查所有引用；引用不存在時直接拋出錯誤，避免默默顯示空白
// • 不儲存任何資料：月齡只存在頁面當下的 state

import { ageGroups } from './milestones'
import { schedule, checkups } from './vaccines'
import { sleepDurations } from './sleep'

export const MAX_MONTHS = 36

// 飲食提示（來源：原首頁「依月齡快速導覽」dietStageLabel，文字未改）
export const dietStages = [
  { below: 6,        text: '母乳／配方奶為主，準備開始認識副食品' },
  { below: 9,        text: '副食品初期：細滑泥狀，優先提供高鐵食物' },
  { below: 12,       text: '泥狀至粗泥，可開始嘗試手指食物' },
  { below: 18,       text: '軟爛小塊狀，練習自己進食' },
  { below: 36,       text: '家庭食物（軟），建立規律三餐加點心' },
  { below: Infinity, text: '接近成人飲食，均衡攝取六大類食物' },
]

// 睡眠時數列（來源：日常照護頁 sleepDurations 的 age 欄位）
const sleepRows = [
  { upTo: 3,  row: '0–3個月' },
  { upTo: 11, row: '4–11個月' },
  { upTo: 35, row: '1–2歲' },
  { upTo: 36, row: '3歲' },
]

// 月齡分段（對應生長里程碑頁的年齡組）
export const segments = [
  {
    id: '0-3m', label: '0–3個月', minMonths: 0, maxMonths: 3,
    milestoneGroup: 'm4', // 0–3 個月無獨立檢核組，顯示下一個檢核點（4 個月）
    top3: [
      '仰睡、獨睡在自己的嬰兒床，床上不放枕頭、棉被與玩偶，降低嬰兒猝死風險。', // 待護理師確認
      '依寶寶的飢餓訊號餵奶，留意每天的尿布量與體重是否穩定增加。', // 待護理師確認
      '未滿3個月發燒（肛溫 ≥ 38°C）請立即就醫，不要自行給退燒藥。', // 待護理師確認
    ],
    development: { picks: [['粗動作', 0], ['視覺', 0], ['社會情緒', 1]], redFlags: [5, 0] },
    vaccines: { scheduleAges: ['出生 24 小時內', '1 個月', '2 個月'], checkupStages: ['出生至2個月', '2～4個月'] },
    dietTab: 'breast',
    safety: {
      page: 'newborn-safety',
      tips: [
        '寶寶會踢腿、扭動身體：放在尿布台、沙發或大人床上時，手要一直扶著，避免翻落。', // 待護理師確認
        '洗澡前先用手肘或水溫計確認水溫，全程不離手，不讓寶寶單獨留在澡盆裡。', // 待護理師確認
        '坐車一律使用後向式汽車安全座椅，不可抱在懷中乘車。', // 待護理師確認
      ],
    },
  },
  {
    id: '4-5m', label: '4–5個月', minMonths: 4, maxMonths: 5,
    milestoneGroup: 'm4',
    top3: [
      '每天安排清醒時的趴姿遊戲，幫助頸部、肩膀與手臂力量發展。', // 待護理師確認
      '寶寶開始翻身，換尿布或放在床上、沙發上時，手不要離開寶寶。', // 待護理師確認
      '觀察是否能穩定抬頭、對大人吃東西感興趣，為約6個月開始添加副食品做準備。', // 待護理師確認
    ],
    development: { picks: [['粗動作', 1], ['細動作', 0], ['社會情緒', 0]], redFlags: [3, 4] },
    vaccines: { scheduleAges: ['4 個月', '5–8 個月'], checkupStages: ['2～4個月', '4～10個月'] },
    dietTab: 'breast',
    safety: {
      page: 'home-safety', tab: 'prevention',
      tips: [
        '開始會抓東西往嘴裡放：能放進衛生紙捲筒的小物品都要收好，避免哽塞。', // 待護理師確認
        '翻身後可能變成趴睡：睡覺時仍以仰躺姿勢放下，床上維持淨空。', // 待護理師確認
        '抱著寶寶時不喝熱飲、不靠近爐火，避免寶寶揮手打翻造成燙傷。', // 待護理師確認
      ],
    },
  },
  {
    id: '6-8m', label: '6–8個月', minMonths: 6, maxMonths: 8,
    milestoneGroup: 'm6',
    top3: [
      '開始添加副食品，優先提供含鐵食物，一次嘗試一種新食物並觀察有無過敏反應。', // 待護理師確認
      '長出第一顆牙後，就用紗布或嬰兒軟毛牙刷每天清潔。', // 待護理師確認
      '開始會坐、準備爬行，家中地面與低處的環境要重新檢查一次。', // 待護理師確認
    ],
    development: { picks: [['粗動作', 1], ['細動作', 3], ['聽覺', 0]], redFlags: [1, 2] },
    vaccines: { scheduleAges: ['5–8 個月', '6 個月'], checkupStages: ['4～10個月'] },
    dietTab: 'solid',
    safety: {
      page: 'home-safety', tab: 'prevention',
      tips: [
        '開始會坐、準備爬行：插座加蓋、樓梯口裝門欄，桌巾與電線收好避免拉扯。', // 待護理師確認
        '鈕扣電池、磁鐵、硬幣等小物品收在高處；懷疑誤食請立即就醫。', // 待護理師確認
        '坐餐椅時繫好安全帶，進食時大人在旁陪伴，不讓寶寶邊爬邊吃。', // 待護理師確認
      ],
    },
  },
  {
    id: '9-11m', label: '9–11個月', minMonths: 9, maxMonths: 11,
    milestoneGroup: 'm9',
    top3: [
      '開始扶站、扶走，家具邊角、樓梯和窗戶是這個階段的主要危險。', // 待護理師確認
      '讓寶寶練習用手抓食物、用杯子喝水，食物質地從泥狀逐漸變粗。', // 待護理師確認
      '多叫寶寶的名字、和他說話，觀察他是否會回頭、聽得懂「不可以」。', // 待護理師確認
    ],
    development: { picks: [['粗動作', 1], ['細動作', 3], ['社會情緒', 1]], redFlags: [1, 5] },
    vaccines: { scheduleAges: [], upcomingAges: ['12 個月'], checkupStages: ['4～10個月', '10個月～1歲半'] },
    dietTab: 'solid',
    safety: {
      page: 'home-safety', tab: 'prevention',
      tips: [
        '會扶著家具走：固定容易傾倒的櫃子與電視，窗邊不放可攀爬的家具。', // 待護理師確認
        '浴缸、水桶、馬桶都可能造成溺水：用完立刻把水倒掉、馬桶蓋蓋好，洗澡時全程不離手。', // 待護理師確認
        '手指食物要軟爛並切小，避免整顆堅果、葡萄、硬糖等容易哽塞的食物。', // 待護理師確認
      ],
    },
  },
  {
    id: '12-14m', label: '1歲–1歲2個月', minMonths: 12, maxMonths: 14,
    milestoneGroup: 'y1',
    top3: [
      '從副食品逐漸轉向家庭飲食，練習自己拿湯匙，建立規律的三餐加點心。', // 待護理師確認
      '開始學走路，跌倒碰撞變多，危險物品要收在孩子拿不到的高度。', // 待護理師確認
      '多用簡單詞語和孩子對話、一起看圖畫書，鼓勵他用手勢或聲音表達需求。', // 待護理師確認
    ],
    development: { picks: [['粗動作', 1], ['語言溝通', 0], ['遊戲探索', 0]], redFlags: [3, 2] },
    vaccines: { scheduleAges: ['12 個月', '12–15 個月'], checkupStages: ['10個月～1歲半'] },
    dietTab: 'toddler',
    safety: {
      page: 'home-safety', tab: 'prevention',
      tips: [
        '會爬上椅子、打開抽屜：藥品與清潔劑放在上鎖或高處的櫃子，不用飲料瓶分裝。', // 待護理師確認
        '好奇會拉扯：熱湯熱水放在桌子中央、鍋柄朝內，避免拉倒燙傷。', // 待護理師確認
        '開關門與倒車前，先確認孩子的位置，避免夾傷或被車輛撞到。', // 待護理師確認
      ],
    },
  },
  {
    id: '15-17m', label: '1歲3個月–1歲5個月', minMonths: 15, maxMonths: 17,
    milestoneGroup: 'y1m3',
    top3: [
      '放手走路後活動範圍變大，外出時牽手或使用推車，避免孩子突然衝向車道。', // 待護理師確認
      '鼓勵孩子用手指、比手勢或說話表達需求；若從不用手指東西，請和兒科醫師討論。', // 待護理師確認
      '建立固定的睡前程序（洗澡、說故事、熄燈），幫助作息穩定。', // 待護理師確認
    ],
    development: { picks: [['粗動作', 1], ['細動作', 0], ['語言溝通', 0]], redFlags: [0, 2] },
    vaccines: { scheduleAges: ['15 個月'], checkupStages: ['10個月～1歲半'] },
    dietTab: 'toddler',
    safety: {
      page: 'home-safety', tab: 'prevention',
      tips: [
        '走得更快、會爬高：窗戶與陽台加裝防護，旁邊不放椅子、箱子等可攀爬物。', // 待護理師確認
        '喜歡模仿大人：刀具、剪刀、打火機收好，避免在孩子面前吃藥讓他模仿。', // 待護理師確認
        '遊戲場選擇適齡設施，玩溜滑梯時大人在旁看顧，不要抱著孩子一起滑。', // 待護理師確認
      ],
    },
  },
  {
    id: '18-23m', label: '1歲半–1歲11個月', minMonths: 18, maxMonths: 23,
    milestoneGroup: 'y1m6',
    top3: [
      '語言快速發展的時期，多回應孩子的話，陪他說出身邊物品的名稱。', // 待護理師確認
      '孩子開始想自己來：讓他練習自己吃飯、脫襪子，用有限的選擇減少衝突。', // 待護理師確認
      '若常叫名字不理會、不會用手指東西或不會分享喜悅，建議盡早向兒科醫師反映。', // 待護理師確認
    ],
    development: { picks: [['粗動作', 1], ['語言溝通', 1], ['社會情緒', 1]], redFlags: [1, 3] },
    vaccines: { scheduleAges: ['18 個月'], checkupStages: ['10個月～1歲半', '1歲半～2歲'] },
    dietTab: 'toddler',
    safety: {
      page: 'home-safety', tab: 'prevention',
      tips: [
        '會推椅子去拿高處的東西：真正危險的物品改放在上鎖的櫃子。', // 待護理師確認
        '靠近馬路、停車場、巷口時一定牽手，這些是孩子衝出去的高風險地點。', // 待護理師確認
        '水桶、浴缸、魚池、泳池都要有大人看顧，幼兒在很淺的水中也可能溺水。', // 待護理師確認
      ],
    },
  },
  {
    id: '24-29m', label: '2歲–2歲5個月', minMonths: 24, maxMonths: 29,
    milestoneGroup: 'y2',
    top3: [
      '觀察如廁準備訊號（能表達尿意、尿布能保持乾燥較久），準備好再開始如廁訓練。', // 待護理師確認
      '每天安排戶外活動與跑跳時間，螢幕時間盡量減少並由大人陪同觀看。', // 待護理師確認
      '情緒起伏大、常說「不要」是正常發展，用溫和而堅定的方式回應並給予選擇。', // 待護理師確認
    ],
    development: { picks: [['語言溝通', 0], ['語言溝通', 2], ['認知學習', 0]], redFlags: [0, 3] },
    vaccines: { scheduleAges: ['27 個月'], checkupStages: ['2～3歲'] },
    dietTab: 'toddler',
    safety: {
      page: 'home-safety', tab: 'prevention',
      tips: [
        '會轉門把、開門：大門與通往陽台的門要上鎖，避免孩子自行外出。', // 待護理師確認
        '會爬上桌椅與流理台：熱水瓶、電器和刀具遠離檯面邊緣。', // 待護理師確認
        '坐車仍使用合適的汽車安全座椅，不讓孩子坐前座或在車內站立。', // 待護理師確認
      ],
    },
  },
  {
    id: '30-36m', label: '2歲半–3歲', minMonths: 30, maxMonths: 36,
    milestoneGroup: 'y2m6',
    milestoneGroupAt36: 'y3', // 滿 3 歲時「看完整內容」改連 3 歲組
    top3: [
      '能說兩、三個詞的句子，多陪孩子聊天、問開放式問題，鼓勵他描述自己的經驗。', // 待護理師確認
      '練習自己吃飯、洗手、表達如廁需求，為之後的團體生活做準備。', // 待護理師確認
      '若說話連最親近的大人都聽不懂，或無法用句子表達，請和兒科醫師討論。', // 待護理師確認
    ],
    development: { picks: [['語言溝通', 1], ['粗動作', 2], ['細動作', 1]], redFlags: [0, 1] },
    vaccines: { scheduleAges: [], upcomingAges: ['滿 5 歲至入國小前'], checkupStages: ['2～3歲'] },
    dietTab: 'toddler',
    safety: {
      page: 'home-safety', tab: 'prevention',
      tips: [
        '會騎三輪車、跑跳更快：騎乘時戴安全帽，只在遠離車道的場地騎。', // 待護理師確認
        '對火和插頭好奇：打火機、火柴收好，教孩子「燙」「危險」等簡單規則。', // 待護理師確認
        '雖然開始懂規則，但仍無法判斷危險，在水邊和馬路旁仍需大人全程看顧。', // 待護理師確認
      ],
    },
  },
]

// 最後一段之後的「下個階段預告」（引用生長里程碑 3 歲組）
const afterLast = { label: '3歲', milestoneGroup: 'y3', picks: [['語言溝通', 1], ['語言溝通', 3]] }

// ── 讀取函式 ──────────────────────────────────────────────────────

export function formatAge(months) {
  return `${Math.floor(months / 12)}歲${months % 12}個月`
}

export function findSegment(months) {
  const seg = segments.find(s => months >= s.minMonths && months <= s.maxMonths)
  if (!seg) throw new Error(`ageGuide: 找不到 ${months} 個月的分段`)
  return seg
}

function must(value, what) {
  if (value === undefined || value === null) throw new Error(`ageGuide: 引用不存在 — ${what}`)
  return value
}

function milestoneGroup(id) {
  return must(ageGroups.find(g => g.id === id), `里程碑組 ${id}`)
}

function pickMilestones(groupId, picks) {
  const g = milestoneGroup(groupId)
  return picks.map(([cat, i]) => ({ cat, text: must(g.milestones[cat]?.[i], `${groupId}.${cat}[${i}]`) }))
}

function scheduleEntries(ages = []) {
  return ages.map(age => {
    const entry = must(schedule.find(s => s.age === age), `疫苗時程 ${age}`)
    return { age: entry.age, vaccines: entry.vaccines.map(v => v.name) }
  })
}

/** 依月數組出結果頁所需的全部內容（文字都來自上方設定或共用資料） */
export function buildGuide(months) {
  const seg = findSegment(months)
  const idx = segments.indexOf(seg)
  const next = segments[idx + 1]
  const group = months === MAX_MONTHS && seg.milestoneGroupAt36 ? seg.milestoneGroupAt36 : seg.milestoneGroup
  const g = milestoneGroup(seg.milestoneGroup)
  const sleepRow = must(sleepRows.find(r => months <= r.upTo), `睡眠列 ${months}`).row

  return {
    months,
    ageText: formatAge(months),
    segment: { id: seg.id, label: seg.label },
    top3: seg.top3,
    development: {
      groupLabel: g.label,
      linkGroup: group,
      items: pickMilestones(seg.milestoneGroup, seg.development.picks),
      redFlags: seg.development.redFlags.map(i => must(g.redFlags[i], `${seg.milestoneGroup}.redFlags[${i}]`)),
    },
    vaccines: {
      current: scheduleEntries(seg.vaccines.scheduleAges),
      upcoming: scheduleEntries(seg.vaccines.upcomingAges),
      checkups: seg.vaccines.checkupStages.map(st => must(checkups.find(c => c.stage === st), `預防保健 ${st}`)),
    },
    diet: {
      text: dietStages.find(d => months < d.below).text,
      tab: seg.dietTab,
    },
    safety: { tips: seg.safety.tips, page: seg.safety.page, tab: seg.safety.tab ?? null },
    sleep: must(sleepDurations.find(s => s.age === sleepRow), `睡眠時數 ${sleepRow}`),
    next: next
      ? { label: next.label, months: next.minMonths, items: pickMilestones(next.milestoneGroup, next.development.picks.slice(0, 2)) }
      : { label: afterLast.label, months: null, linkGroup: afterLast.milestoneGroup, items: pickMilestones(afterLast.milestoneGroup, afterLast.picks) },
  }
}
