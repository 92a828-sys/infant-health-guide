import { useState } from 'react'

// ── 靜態藥品資料庫 ────────────────────────────────────────────────
// 圖片放在 public/drugs/ 資料夾，路徑格式：'/drugs/檔名.jpg'
// 新增藥品：在此陣列加一筆物件即可
const DRUG_DATA = [
  {
    id: '1',
    name: '希普利敏 / Cypromin',
    categories: ['抗組織胺'],
    symptoms: ['咳嗽', '流鼻水', '濕疹', '皮膚癢', '蕁麻疹'],
    mechanism: '具抗乙醯膽鹼及鎮靜功能，拮抗組織胺與血清素。',
    sideEffects: ['興奮/躁動（影響午休）', '頭暈/頭痛', '嗜睡/倦怠（需防跌）', '噁心/嘔吐/食慾差'],
    notes: '1. 強力嗜睡：屬於第一代抗組織胺，鎮靜作用強。服藥後幼兒易昏睡，活動時間需特別預防跌倒。\n2. 年齡警示：2歲以下幼兒曾有嚴重副作用案例，若收托2歲以下幼兒使用此藥，務必確認是醫師親自開立。\n3. 交互作用：不可擅自與其他感冒藥水（尤其是含抗組織胺成分）混吃，以免抑制過度。\n4. 特殊禁忌：新生兒、早產兒禁用。',
    storage: '室溫避光',
    keywords: '香草牛奶、鳳梨口味、透明、黃色、想睡覺',
    images: ['/drugs/201005191404367055.jpg'],
  },
  {
    id: '2',
    name: '息咳寧 / Secorine',
    categories: ['怯痰劑', '抗組織胺', '支氣管擴張'],
    symptoms: ['咳嗽', '怯痰', '打噴嚏', '流鼻水', '鼻塞'],
    mechanism: '綜合感冒藥。含有抗組織胺可緩解過敏流鼻水；支氣管擴張劑可緩解咳嗽；祛痰劑協助排出痰液。',
    sideEffects: ['興奮/躁動（影響午休）', '心悸/心跳加速', '頭暈/頭痛', '嗜睡/倦怠（需防跌）', '噁心/嘔吐/食慾差'],
    notes: '1. 務必搖勻：使用前須振搖均勻。\n2. 藥物重複檢核：確認家長未同時提供其他綜合感冒藥或抗過敏藥，避免過量。\n3. 特殊族群：含阿斯巴甜（Aspartame），苯酮尿症幼兒禁用。\n4. 觀察重點：含支氣管擴張成分，若幼兒出現心跳過快或情緒躁動需留意。',
    storage: '室溫避光',
    keywords: '紅橘色藥水、紫紅色藥水、感冒糖漿',
    images: ['/drugs/1544513266365.jpg'],
  },
  {
    id: '3',
    name: '安佳熱 / Anti-phen',
    categories: ['解熱鎮痛', '退燒藥'],
    symptoms: ['喉嚨痛', '止痛', '發燒', '頭痛'],
    mechanism: '成分為 Acetaminophen（24mg/ml），作用於中樞神經，可阻斷痛覺傳導並降低體溫。',
    sideEffects: ['皮疹/發紅（觀察過敏）', '頭暈/頭痛', '噁心/嘔吐/食慾差'],
    notes: '1. 嚴格間隔：若症狀持續，需間隔 4–6 小時才可重複使用。\n2. 每日上限：24 小時內不可超過 5 次。\n3. 重複用藥檢核：確認家長未同時使用其他含 Acetaminophen 的止痛退燒藥，過量恐傷肝。\n4. 特殊禁忌：含阿斯巴甜，苯酮尿症幼兒禁用。',
    storage: '室溫避光',
    keywords: '退燒紅藥水、退燒、紅色藥水、紫色藥水',
    images: ['/drugs/1544506670626.jpg'],
  },
  {
    id: '4',
    name: '依普芬 / Ibuprofen',
    categories: ['NSAID', '退燒藥'],
    symptoms: ['止痛', '消炎', '發燒', '關節痛'],
    mechanism: '抑制前列腺素合成，具消炎、鎮痛、解熱作用。',
    sideEffects: ['腸胃不適（建議飯後）', '腹瀉/軟便', '皮疹/發紅（觀察過敏）', '頭暈/頭痛', '噁心/嘔吐/食慾差'],
    notes: '1. 務必搖勻：使用前須振盪均勻。\n2. 腸胃保護：建議飯後餵藥，以減少胃部不適或胃痛。\n3. 觀察體溫：高燒幼兒退燒後可能出現體溫過低或四肢冰冷，需注意保暖。\n4. 特殊禁忌：氣喘兒、脫水嚴重幼兒需謹慎使用。',
    storage: '室溫避光',
    keywords: '綜合水果口味、葡萄口味、紅色、紫色、退燒藥、消炎、止痛',
    images: ['/drugs/1544509353362.jpg'],
  },
  {
    id: '5',
    name: '喘解液 / Exdila',
    categories: ['Beta-2 致效劑', '支氣管擴張'],
    symptoms: ['呼吸困難', '咳嗽', '支氣管炎', '氣喘'],
    mechanism: '成分為 Procaterol HCl。能選擇性興奮氣管的 β2 受體，使支氣管肌肉鬆弛，緩解呼吸困難；並促進氣管纖毛運動排痰。',
    sideEffects: ['心悸/心跳加速', '皮疹/發紅（觀察過敏）', '嗜睡/倦怠（需防跌）', '噁心/嘔吐/食慾差'],
    notes: '1. 觀察心跳：服藥後可能會心跳變快或臉紅，屬常見現象，若幼兒極度不適需回報。\n2. 藥物交互作用：不可與兒茶酚胺類（如 Epinephrine）併用，避免心律不整。\n3. 特殊成分：含酒精（Alcohol）與葡萄柚香料，對酒精極度敏感幼兒需留意。\n4. 午睡預警：支氣管擴張劑讓身體「跑起來」，吃完藥小朋友可能會比較嗨、睡不著或是手有點抖。',
    storage: '室溫避光',
    keywords: '葡萄柚口味、透明液體、氣管擴張、30ML',
    images: ['/drugs/1544509222856.jpg'],
  },
  {
    id: '6',
    name: '必爾生 / Kidsolone',
    categories: ['抗發炎', '類固醇'],
    symptoms: ['哮吼', '嚴重過敏', '支氣管炎', '氣喘'],
    mechanism: '成分為 Prednisolone。具有強力的抗發炎及抗過敏作用，能抑制免疫反應，緩解呼吸道腫脹。',
    sideEffects: ['興奮/躁動（影響午休）', '腸胃不適（建議飯後）', '免疫力下降（長期使用者）', '噁心/嘔吐/食慾差', '食慾增加'],
    notes: '1. 不可隨意停藥：若醫生開立療程（如3天），請務必讓家長餵完，不可因為症狀好轉就自行停藥（除非醫生有交代）。\n2. 口味極苦：雖有添加優格香料，但類固醇本體非常苦，建議準備小點心或糖水給藥後服用。\n3. 觀察感染：使用期間幼兒抵抗力可能較差，需留意是否有發燒或其他感染徵兆。\n4. 特殊禁忌：水痘、麻疹感染期間需謹慎評估，若接觸到需回報醫師。',
    storage: '室溫避光',
    keywords: '優格口味、苦藥、類固醇',
    images: ['/drugs/1544509442180.jpg'],
  },
  {
    id: '7',
    name: '勝克敏 / Cetirizine',
    categories: ['抗組織胺', '抗過敏'],
    symptoms: ['流鼻水', '皮膚癢', '結膜炎', '蕁麻疹', '過敏性鼻炎'],
    mechanism: '成分為 Cetirizine。屬於抗 H1 受體阻斷劑，作用迅速且長效，較不易通過腦血管障壁，嗜睡副作用較第一代輕微。',
    sideEffects: ['興奮/躁動（影響午休）', '口乾（鼓勵喝水）', '頭暈/頭痛', '嗜睡/倦怠（需防跌）', '噁心/嘔吐/食慾差'],
    notes: '1. 給藥頻率：通常為一天一次（晚餐時），若發現家長託藥單寫一天三次，請再次與家長或醫師確認（除非有特殊醫囑）。\n2. 特殊族群：腎功能不全幼兒需減半劑量，需留意病史。\n3. 口味辨識：特殊的優格口味，幼兒接受度通常很高。\n4. 交互作用：雖較安全，但仍避免與其他鎮靜劑併用。',
    storage: '室溫避光',
    keywords: '優格口味、長效、一天一次、過敏水',
    images: ['/drugs/1544509414743.jpg'],
  },
  {
    id: '8',
    name: '亞涕液 / Actin Solution',
    categories: ['去鼻充血劑', '抗組織胺', '綜合鼻炎藥'],
    symptoms: ['打噴嚏', '流鼻水', '過敏性鼻炎', '鼻塞'],
    mechanism: '複方藥水。Triprolidine（抗組織胺）緩解流鼻水；Pseudoephedrine（血管收縮劑）緩解鼻黏膜腫脹與鼻塞。',
    sideEffects: ['興奮/躁動（影響午休）', '口乾（鼓勵喝水）', '嗜睡/倦怠（需防跌）'],
    notes: '1. 午睡觀察：因含有 Pseudoephedrine（偽麻黃素），部分體質敏感的幼兒吃完會特別興奮、睡不著，若發生此狀況需紀錄並告知家長。\n2. 給藥天數：仿單建議勿連續服用超過 7 日。\n3. 務必搖勻：使用前須振搖均勻。\n4. 特殊警語：若幼兒出現嚴重突發性頭痛、意識不清需立即停藥就醫（極罕見）。',
    storage: '室溫避光',
    keywords: '橘子口味、黃色、鼻塞',
    images: ['/drugs/actin.jpg'],
  },
  {
    id: '9',
    name: '舒痰 / Soltan',
    categories: ['怯痰劑'],
    symptoms: ['卡痰', '咳不出痰', '支氣管炎'],
    mechanism: '成分為 Ambroxol HCl。能促進肺部界面活性劑產生及增加纖毛運動，讓黏稠的痰液變稀、容易咳出。',
    sideEffects: ['腸胃不適（建議飯後）', '皮疹/發紅（觀察過敏）', '噁心/嘔吐/食慾差'],
    notes: '1. 特殊禁忌：含阿斯巴甜（Aspartame），苯酮尿症幼兒不宜使用。\n2. 皮膚觀察：雖然極罕見，但若服藥後出現嚴重皮疹、黏膜潰瘍，需立即停藥就醫。\n3. 交互作用：與抗生素併用時，會提高抗生素在肺部的濃度，有助於治療效果。',
    storage: '室溫避光',
    keywords: '鳳梨口味、黃色、化痰',
    images: ['/drugs/soltan.jpg'],
  },
  {
    id: '10',
    name: '咳酚 / Guaphen',
    categories: ['怯痰劑'],
    symptoms: ['咳嗽', '多痰', '怯痰'],
    mechanism: '成分為 Guaifenesin。能增加呼吸道黏液分泌，降低痰液黏稠度，使痰容易咳出。',
    sideEffects: ['皮疹/發紅（觀察過敏）', '頭暈/頭痛', '噁心/嘔吐/食慾差'],
    notes: '1. 務必搖勻：使用前須振搖均勻。\n2. 特殊禁忌：含阿斯巴甜（Aspartame），苯酮尿症幼兒不宜使用。\n3. 就醫警訊：若幼兒服用後出現高燒、起疹子或咳嗽超過一週未改善，需建議家長回診。',
    storage: '室溫避光',
    keywords: '櫻桃口味、深紅色、褐色、化痰',
    images: ['/drugs/GUAPHEN.jpg'],
  },
  {
    id: '11',
    name: '喜普 / Cyproh',
    categories: ['抗組織胺'],
    symptoms: ['枯草熱', '流鼻水', '濕疹', '皮膚癢', '蕁麻疹', '過敏性鼻炎'],
    mechanism: '具抗乙醯膽鹼和鎮靜作用，可加強抗組織胺和 Serotonin-antagonist 作用，並有鈣離子阻斷效果。',
    sideEffects: ['興奮/躁動（影響午休）', '口乾（鼓勵喝水）', '腹瀉/軟便', '皮疹/發紅（觀察過敏）', '嗜睡/倦怠（需防跌）'],
    notes: '1. 強力嗜睡：服藥後應避免操作機械或活動，幼兒需留意防跌。\n2. 年齡警示：2歲以下孩童最好不要服用。\n3. 過量風險：小孩服用過量會造成中樞神經抑制、痙攣，甚至死亡，需嚴格確認劑量。\n4. 特殊禁忌：青光眼、氣喘幼兒禁用。',
    storage: '室溫避光',
    keywords: '國嘉、百香果口味、黃色、喜普',
    images: ['/drugs/下載_(1).jpg'],
  },
  {
    id: '12',
    name: '鎮咳祛痰 / Cough Mixture',
    categories: ['止咳化痰'],
    symptoms: ['咳嗽', '多痰', '怯痰'],
    mechanism: '桔梗流浸膏（Platycodon Fluidextract）。桔梗為祛痰劑，藥理證實具止咳作用。',
    sideEffects: ['腸胃不適（建議飯後）', '噁心/嘔吐/食慾差'],
    notes: '1. 務必搖勻：因含桔梗成分，易有細微沉澱，使用前必須用力振搖均勻。\n2. 腸胃觀察：若是腸胃功能較弱或容易腹瀉的幼兒，服用後需觀察是否有拉肚子情形。\n3. 就醫警訊：若持續高燒、出疹或咳嗽超過一週未改善，需建議家長回診。',
    storage: '室溫避光',
    keywords: '生達、桔梗、深褐色、橘子焦糖味',
    images: ['/drugs/螢幕擷取畫面_2026-01-02_161323.png'],
  },
  {
    id: '13',
    name: '伏咳 / Antica',
    categories: ['怯痰劑', '支氣管擴張', '複方感冒藥'],
    symptoms: ['卡痰', '咳嗽', '支氣管炎', '氣喘', '流鼻水'],
    mechanism: '1. Orciprenaline：鬆弛支氣管、緩解氣喘。\n2. Bromhexine：溶解稀釋痰液。\n3. Doxylamine：抗過敏、流鼻水、鎮靜。',
    sideEffects: ['興奮/躁動（影響午休）', '心悸/心跳加速', '腸胃不適（建議飯後）', '口乾（鼓勵喝水）', '嗜睡/倦怠（需防跌）', '噁心/嘔吐/食慾差'],
    notes: '1. 雙重副作用觀察：因含有氣管擴張劑（可能興奮/心跳快）與抗組織胺（可能嗜睡），幼兒反應不一，需觀察個別狀況。\n2. 心跳監測：若幼兒出現臉紅、躁動或主訴心跳很快，應讓其休息並告知家長。\n3. 皮膚觀察：極罕見情況下可能引起嚴重皮膚過敏（SJS），若出現不明皮疹或黏膜潰瘍需立即停藥就醫。\n4. 特殊禁忌：青光眼、心律不整病患需小心投與。',
    storage: '室溫避光',
    keywords: '瑞士、橘子口味、黃色、伏咳',
    images: ['/drugs/lant.jpg'],
  },
  {
    id: '14',
    name: '米瑞 / Mirate',
    categories: ['止咳藥'],
    symptoms: ['咳嗽', '感冒', '支氣管炎'],
    mechanism: '止咳鎮靜劑。能逐漸改善呼吸道受阻程度，增加肺活量。',
    sideEffects: ['腹瀉/軟便（加強屁屁護理）', '皮疹/發紅（觀察過敏）', '頭暈/頭痛', '噁心/嘔吐/食慾差'],
    notes: '1. 安全性高：屬於非麻醉性鎮咳劑，不具成癮性，可安全抑制咳嗽中樞。\n2. 觀察重點：雖然副作用發生率低（約1%），但若幼兒服用後出現腹瀉或皮疹，仍需紀錄並告知家長。\n3. 過量警示：若不慎過量服用，可能出現噁心、嘔吐、血壓降低等症狀。',
    storage: '室溫避光',
    keywords: '晟德、梅子口味、橘紅色、米瑞',
    images: ['/drugs/1544515716431.jpg'],
  },
  {
    id: '15',
    name: '諾快寧 / Curam',
    categories: ['抗生素', '青黴素類'],
    symptoms: ['中耳炎', '泌尿道感染', '細菌感染', '肺炎', '鼻竇炎'],
    mechanism: '複合製劑。Amoxicillin 殺菌，Clavulanic acid 阻斷細菌的抗藥性酵素，擴大殺菌範圍。',
    sideEffects: ['興奮/躁動（影響午休）', '腹瀉/軟便（加強屁屁護理）', '皮疹/發紅（觀察過敏）', '噁心/嘔吐/食慾差'],
    notes: '1. 效期嚴格：泡製後的藥水只能保存 7 天。若家長週一帶來，下週一通常已過期，需提醒家長丟棄。\n2. 腸胃照護：此抗生素極易引起腹瀉或軟便，請老師留意幼兒紅臀狀況，並勤換尿布。\n3. 給藥時機：建議飯前服用吸收較佳（但也可併用液體吞服）。\n4. 完整療程：抗生素需按時吃完療程，不可隨意停藥。',
    storage: '2–8°C 冷藏',
    keywords: 'Sandoz、抗生素、白色藥水、需冷藏',
    images: ['/drugs/A5500422-01.png'],
  },
  {
    id: '16',
    name: '鼻福 / Peace',
    categories: ['去鼻充血劑', '抗組織胺', '綜合鼻炎藥'],
    symptoms: ['打噴嚏', '流鼻水', '過敏性鼻炎', '鼻塞'],
    mechanism: 'Triprolidine（長效抗組織胺）緩解過敏流鼻水；Pseudoephedrine（擬交感神經興奮劑）收縮血管、緩解鼻塞。',
    sideEffects: ['興奮/躁動（影響午休）', '口乾（鼓勵喝水）', '嗜睡/倦怠（需防跌）'],
    notes: '1. 午睡觀察：成分含偽麻黃素，部分幼兒吃完會異常興奮、睡不著，若有此狀況請紀錄並告知家長。\n2. 務必搖勻：仿單明確標示「使用前須振搖均勻」。\n3. 特殊禁忌：不得與酒精性飲料併用。\n4. 安全性：6歲以下幼兒需由醫師處方使用。',
    storage: '室溫避光',
    keywords: '永信、鼻福、黃色、鼻塞',
    images: ['/drugs/image.png'],
  },
  {
    id: '17',
    name: '必達米瑞 / Butamirate',
    categories: ['止咳藥'],
    symptoms: ['感冒咳嗽', '打噴嚏', '支氣管炎'],
    mechanism: 'Butamirate Citrate。為非鴉片類止咳鎮靜劑，除止咳外，還能改善呼吸道受阻程度（增加肺活量）。',
    sideEffects: ['腹瀉/軟便（加強屁屁護理）', '皮疹/發紅（觀察過敏）', '頭暈/頭痛', '噁心/嘔吐/食慾差'],
    notes: '1. 非麻醉性止咳：不含鴉片類生物鹼，安全性較高，適合幼兒使用。\n2. 過量注意：若服用過量可能導致低血壓或嘔吐，需確認劑量。\n3. 特殊禁忌：對主成分 Butamirate Citrate 過敏者禁用。',
    storage: '室溫避光',
    keywords: '晟德、葡萄口味、紫色、止咳',
    images: ['/drugs/image 1.png'],
  },
  {
    id: '18',
    name: '息咳液 / Sortuss',
    categories: ['止咳化痰'],
    symptoms: ['咳嗽', '怯痰', '感冒'],
    mechanism: 'Dextromethorphan 抑制咳嗽反射；Glyceryl Guaiacolate 增加支氣管分泌、降低黏度以利排痰。',
    sideEffects: ['皮疹/發紅（觀察過敏）'],
    notes: '1. 雙胞胎辨識：此藥與「必達米瑞」外觀極像（皆為紫色葡萄味），本藥多了化痰功能，請依醫囑給藥。\n2. 務必搖勻：仿單明確標示「服用前請振搖均勻」。\n3. 特殊禁忌：不得與含酒精飲料併服。',
    storage: '室溫避光',
    keywords: '晟德、葡萄口味、紫色、止咳化痰',
    images: ['/drugs/image 2.png'],
  },
  {
    id: '19',
    name: '停咳喜 / Sutussi',
    categories: ['止咳藥'],
    symptoms: ['咳嗽', '感冒咳嗽', '支氣管炎', '氣喘性支氣管炎'],
    mechanism: 'Butamirate Citrate。具顯著止咳作用，且能改善呼吸道受阻程度（增加肺活量）。（中樞性非麻醉性）',
    sideEffects: ['腹瀉/軟便（加強屁屁護理）', '皮疹/發紅（觀察過敏）', '頭暈/頭痛', '噁心/嘔吐/食慾差'],
    notes: '1. 成分雙胞胎：此藥與「必達米瑞」成分相同，若家長同時帶來這兩罐，請確認是否為重複用藥。\n2. 特殊禁忌：含阿斯巴甜（Aspartame），苯酮尿症患者不宜使用。\n3. 非麻醉性：不含鴉片類生物鹼，安全性較高。',
    storage: '室溫避光',
    keywords: '晟德、葡萄口味、烏梅薄荷口味、止咳',
    images: ['/drugs/image 3.png'],
  },
  {
    id: '20',
    name: '克敏息喘 / Antimin',
    categories: ['抗組織胺'],
    symptoms: ['流鼻水', '濕疹', '皮膚癢', '蕁麻疹', '過敏性鼻炎'],
    mechanism: '具抗乙醯膽鹼和鎮靜作用，能阻斷組織胺接受器，緩解過敏反應。（第一代）',
    sideEffects: ['興奮/躁動（影響午休）', '口乾（鼓勵喝水）', '腹瀉/軟便（加強屁屁護理）'],
    notes: '1. 成分雙胞胎：此藥與「希普利敏」、「喜普液」成分相同，皆為強力抗組織胺，請確認家長是否重複給藥。\n2. 強力嗜睡：鎮靜作用強，幼兒服藥後容易昏睡、腳步不穩，需特別預防跌倒。\n3. 劑量確認：2–6 歲每次 5cc，請務必核對藥袋上的醫師醫囑。',
    storage: '室溫避光',
    keywords: '抗組織胺、想睡覺、流鼻水、黃色',
    images: ['/drugs/image 4.png'],
  },
]

function PageHeader({ emoji, title, subtitle, color }) {
  return (
    <div className={`${color} py-12 px-6 text-center`}>
      <div className="text-6xl mb-4">{emoji}</div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-500 text-sm max-w-xl mx-auto">{subtitle}</p>
    </div>
  )
}

// ── 藥庫資料區塊 ──────────────────────────────────────────

const CATEGORY_COLORS = {
  '退燒藥':   'bg-red-100 text-red-700',
  '抗組織胺': 'bg-purple-100 text-purple-700',
  '止咳化痰': 'bg-blue-100 text-blue-700',
  '腸胃用藥': 'bg-amber-100 text-amber-700',
  '抗生素':   'bg-pink-100 text-pink-700',
  '外用藥':   'bg-teal-100 text-teal-700',
  '其他':     'bg-gray-100 text-gray-600',
}

function categoryBadge(cat) {
  return CATEGORY_COLORS[cat] ?? 'bg-gray-100 text-gray-600'
}

function DrugCard({ drug }) {
  const [open, setOpen] = useState(false)
  const firstImg = drug.images?.[0]

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* ── 卡片標題（點擊展開） ── */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4 px-4 py-4">
          {/* 圖片或預設圖示 */}
          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-teal-50 flex items-center justify-center border border-gray-100">
            {firstImg
              ? <img src={firstImg} alt={drug.name} className="w-full h-full object-cover" />
              : <span className="text-3xl">💊</span>
            }
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="font-bold text-gray-800 text-sm leading-snug">{drug.name}</p>
              <span className="text-gray-400 text-sm shrink-0 mt-0.5">{open ? '▲' : '▼'}</span>
            </div>

            {/* 藥物分類標籤 */}
            {drug.categories?.length > 0 && (
              <div className="flex gap-1 flex-wrap mt-1">
                {drug.categories.map(c => (
                  <span key={c} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryBadge(c)}`}>
                    {c}
                  </span>
                ))}
              </div>
            )}

            {/* 主治症狀標籤 */}
            {drug.symptoms?.length > 0 && (
              <div className="flex gap-1 flex-wrap mt-1.5">
                {drug.symptoms.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </button>

      {/* ── 展開詳細資訊 ── */}
      {open && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3">
          {/* 多張圖片 */}
          {drug.images?.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {drug.images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${drug.name} 外觀 ${i + 1}`}
                  className="h-28 rounded-xl object-cover shrink-0 border border-gray-100"
                />
              ))}
            </div>
          )}

          {drug.mechanism && (
            <div>
              <p className="text-xs font-semibold text-teal-700 mb-1">🔬 藥理作用</p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{drug.mechanism}</p>
            </div>
          )}

          {drug.sideEffects?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-orange-600 mb-1">⚠️ 副作用</p>
              <div className="flex gap-1 flex-wrap">
                {drug.sideEffects.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {drug.notes && (
            <div>
              <p className="text-xs font-semibold text-red-600 mb-1">📋 注意事項</p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{drug.notes}</p>
            </div>
          )}

          {drug.storage && (
            <div>
              <p className="text-xs font-semibold text-indigo-600 mb-1">📦 保存條件</p>
              <p className="text-sm text-gray-600">{drug.storage}</p>
            </div>
          )}

          {drug.keywords && (
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-1">🏷️ 關鍵字 / 外觀</p>
              <p className="text-sm text-gray-500">{drug.keywords}</p>
            </div>
          )}

          {drug.updatedAt && (
            <p className="text-xs text-gray-300 text-right pt-1">
              更新：{new Date(drug.updatedAt).toLocaleDateString('zh-TW')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function DrugDatabase() {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('全部')

  const categories = ['全部', ...Array.from(new Set(DRUG_DATA.flatMap(d => d.categories ?? []).filter(Boolean)))]

  const filtered = DRUG_DATA.filter(d => {
    const q = search.trim().toLowerCase()
    const matchSearch = !q ||
      d.name.toLowerCase().includes(q) ||
      (d.symptoms ?? []).some(s => s.toLowerCase().includes(q)) ||
      (d.keywords ?? '').toLowerCase().includes(q)
    const matchCat = activeCat === '全部' || (d.categories ?? []).includes(activeCat)
    return matchSearch && matchCat
  })

  return (
    <div>
      {/* 搜尋框 */}
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="搜尋藥品名稱、症狀、關鍵字…"
          className="w-full border-2 border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm outline-none focus:border-teal-400 transition-colors"
        />
      </div>

      {/* 藥物分類篩選 */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCat === c ? 'bg-teal-500 text-white shadow-sm' : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-4">
        顯示 {filtered.length} / {drugs.length} 筆藥品
      </p>

      {/* 藥品卡片列表 */}
      <div className="space-y-3">
        {filtered.length > 0
          ? filtered.map(d => <DrugCard key={d.id} drug={d} />)
          : (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-2">🔎</p>
              <p className="text-sm">找不到符合的藥品</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

// ── 退燒藥劑量表 ──────────────────────────────────────────

const acetWeights = [
  { kg: '3–4',  dose: '60',      freq: '每 4–6 小時' },
  { kg: '5–6',  dose: '80–120',  freq: '每 4–6 小時' },
  { kg: '7–9',  dose: '120–160', freq: '每 4–6 小時' },
  { kg: '10–12',dose: '160–200', freq: '每 4–6 小時' },
  { kg: '13–15',dose: '200–240', freq: '每 4–6 小時' },
  { kg: '16–19',dose: '240–320', freq: '每 4–6 小時' },
  { kg: '20–24',dose: '320–400', freq: '每 4–6 小時' },
]

const ibuWeights = [
  { kg: '5–7',  dose: '50',      freq: '每 6–8 小時' },
  { kg: '8–10', dose: '75–100',  freq: '每 6–8 小時' },
  { kg: '11–15',dose: '100–150', freq: '每 6–8 小時' },
  { kg: '16–19',dose: '150–200', freq: '每 6–8 小時' },
  { kg: '20–24',dose: '200–250', freq: '每 6–8 小時' },
]

const forbiddenMeds = [
  { name: '阿斯匹靈（Aspirin）',  reason: '18 歲以下禁用，可能導致雷氏症候群（致命）', urgent: true },
  { name: '成人感冒藥',            reason: '含有不適合幼兒的成分（如抗組織胺）', urgent: true },
  { name: '止瀉藥（Loperamide）', reason: '2 歲以下禁用，可能抑制腸道蠕動造成危險', urgent: true },
  { name: '抗組織胺（苯海拉明）', reason: '2 歲以下禁用，可能過度鎮靜', urgent: false },
  { name: '布洛芬（Ibuprofen）',  reason: '6 個月以下嬰兒禁用', urgent: false },
  { name: '四環黴素類抗生素',      reason: '8 歲以下禁用（影響骨骼牙齒發育）', urgent: false },
  { name: '任何成人鎮靜安眠藥',   reason: '絕對不可用於幼兒', urgent: true },
]

const principles = [
  { icon: '⚖️', title: '依體重計算劑量', desc: '幼兒用藥需依體重換算，不可以年齡粗估。' },
  { icon: '🕐', title: '遵守給藥間隔',   desc: '頻繁給藥可能造成肝腎傷害，嚴格遵守間隔時間。' },
  { icon: '🏥', title: '醫師處方才給藥', desc: '抗生素、類固醇等藥物需醫師評估，不可自行購買。' },
  { icon: '🚫', title: '不任意混用藥物', desc: '成人綜合感冒藥成分複雜，幼兒使用風險高。' },
  { icon: '📦', title: '藥物妥善保存',   desc: '存放於陰涼乾燥處，避免陽光直射及高溫。' },
  { icon: '🔒', title: '置於幼兒拿不到處', desc: '藥物外觀鮮豔，幼兒易誤食，請上鎖保存。' },
]

// ── 主頁面 ────────────────────────────────────────────────

const MAIN_TABS = [
  { id: 'principles', label: '📋 用藥原則' },
  { id: 'fever',      label: '🌡️ 退燒藥劑量' },
  { id: 'forbidden',  label: '🚫 禁用藥物' },
  { id: 'database',   label: '💊 幼生藥庫' },
]

export default function MedicationPage({ navigate }) {
  const [tab, setTab]   = useState('principles')
  const [med, setMed]   = useState('acet')

  return (
    <div>
      <PageHeader
        emoji="💊"
        title="用藥衛教"
        subtitle="嬰幼兒用藥原則、退燒藥劑量計算與幼生藥庫"
        color="bg-gradient-to-br from-teal-50 to-cyan-100"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Top-level tabs */}
        <div className="flex rounded-2xl bg-teal-50 p-1 mb-10 gap-1 overflow-x-auto">
          {MAIN_TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-white text-teal-700 shadow' : 'text-teal-600 hover:bg-teal-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── 用藥原則 ── */}
        {tab === 'principles' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map(p => (
              <div key={p.title} className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex gap-3">
                <span className="text-2xl shrink-0">{p.icon}</span>
                <div>
                  <p className="font-semibold text-teal-800 text-sm mb-1">{p.title}</p>
                  <p className="text-xs text-teal-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 退燒藥劑量 ── */}
        {tab === 'fever' && (
          <div className="space-y-5">
            <div className="flex gap-2">
              {[
                { id: 'acet', label: '乙醯胺酚（Acetaminophen）', note: '3 個月以上可用' },
                { id: 'ibu',  label: '布洛芬（Ibuprofen）',       note: '6 個月以上可用' },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMed(m.id)}
                  className={`flex-1 py-3 px-4 rounded-2xl text-sm font-semibold border-2 transition-all ${
                    med === m.id
                      ? 'bg-teal-100 border-teal-400 text-teal-800'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-teal-200'
                  }`}
                >
                  <p>{m.label}</p>
                  <p className="text-xs font-normal mt-0.5 opacity-70">{m.note}</p>
                </button>
              ))}
            </div>

            <div className="bg-white border-2 border-teal-200 rounded-3xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="text-left px-5 py-3 text-teal-800 font-semibold">體重（kg）</th>
                    <th className="text-left px-5 py-3 text-teal-800 font-semibold">每次劑量（mg）</th>
                    <th className="text-left px-5 py-3 text-teal-800 font-semibold">給藥頻率</th>
                  </tr>
                </thead>
                <tbody>
                  {(med === 'acet' ? acetWeights : ibuWeights).map((row, i) => (
                    <tr key={row.kg} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-5 py-3 font-medium text-gray-800">{row.kg}</td>
                      <td className="px-5 py-3 text-teal-700 font-bold">{row.dose} mg</td>
                      <td className="px-5 py-3 text-gray-600">{row.freq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
              <span className="text-xl shrink-0">💡</span>
              <div className="text-sm text-amber-700">
                <p className="font-semibold mb-1">計算 ml 數：需要劑量（mg）÷ 藥水濃度（mg/ml）</p>
                <p>例：需要 120mg，藥水濃度 24mg/ml → 需要 <strong>5ml</strong></p>
                <p className="mt-1 text-amber-600 text-xs">每日最大量：乙醯胺酚 75 mg/kg；布洛芬 40 mg/kg</p>
              </div>
            </div>
          </div>
        )}

        {/* ── 禁用藥物 ── */}
        {tab === 'forbidden' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">以下藥物在特定年齡前應避免給予幼兒</p>
            {forbiddenMeds.map(item => (
              <div key={item.name} className={`flex gap-4 items-start p-4 rounded-2xl border-2 ${
                item.urgent ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-100'
              }`}>
                <span className="text-2xl shrink-0">{item.urgent ? '🚨' : '⚠️'}</span>
                <div>
                  <p className={`font-bold text-sm mb-0.5 ${item.urgent ? 'text-red-700' : 'text-amber-700'}`}>
                    {item.name}
                  </p>
                  <p className={`text-sm ${item.urgent ? 'text-red-600' : 'text-amber-600'}`}>
                    {item.reason}
                  </p>
                </div>
              </div>
            ))}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mt-4 flex gap-3">
              <span className="text-xl shrink-0">📞</span>
              <p className="text-sm text-teal-700">
                懷疑誤食藥物？請立即撥打
                <strong> 毒藥物諮詢專線：0800-000-985</strong>（24 小時）
              </p>
            </div>
          </div>
        )}

        {/* ── 幼生藥庫 ── */}
        {tab === 'database' && (
          <div>
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6 flex gap-3">
              <span className="text-xl shrink-0">💊</span>
              <p className="text-sm text-teal-700 leading-relaxed">
                收錄幼兒常見藥品的分類、適應症、注意事項與保存方式，由護理及托育人員整理維護。
                點擊藥品名稱可展開詳細資訊。
              </p>
            </div>
            <DrugDatabase />
          </div>
        )}

        <div className="mt-10 text-center">
          <button onClick={() => navigate('home')} className="text-sm text-orange-500 hover:text-orange-700 underline">
            ← 返回首頁
          </button>
        </div>
      </div>
    </div>
  )
}
