import { useState } from 'react'

function SourceNote({ children }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 flex gap-2 text-xs text-gray-500 leading-relaxed">
      <span className="shrink-0">📋</span>
      <p>{children}</p>
    </div>
  )
}

const recordCheckPoints = [
  '入托（園）時要求家長提供兒童健康手冊或衛生所開立之預防接種證明，核對是否已完成該月齡應接種項目',
  '建立班級疫苗接種清單，對照現行公費疫苗時程表定期(如每學期)覆核，標記缺漏或延遲接種的幼兒',
  '對於接種紀錄有缺漏者，以書面或口頭主動通知家長，並約定補種期限，追蹤補種後將證明存入幼兒個人資料',
  '新生入園、轉學或延遲提供接種紀錄者，應建立追蹤名冊，避免遺漏查核',
]

const outbreakPrinciples = [
  {
    disease: '水痘 / 麻疹等空氣或飛沫傳染疾病',
    emoji: '🌡️',
    steps: [
      '一旦發現疑似病例，應立即通知家長帶幼兒就醫，並依規定通報衛生單位（法定傳染病）',
      '確認病例的班級內，清查其他幼兒之疫苗接種紀錄（如水痘、MMR疫苗），未完成接種或無自然感染證明者為高風險接觸者',
      '高風險接觸者依衛生單位指示進行健康監測或居家隔離，觀察期通常涵蓋該疾病最長潛伏期（如水痘、麻疹約至最後暴露後21天，實際天數以衛生單位公告為準）',
      '監測期間如出現發燒、紅疹等疑似症狀，應立即就醫並再次通報，避免帶病到園',
    ],
  },
  {
    disease: '百日咳等飛沫傳染疾病',
    emoji: '😷',
    steps: [
      '疑似病例應立即就醫並依醫囑於傳染力消失前在家休養，避免到園',
      '同班未完成五合一/DTaP相關疫苗接種之幼兒，應提高健康監測警覺，出現持續咳嗽等症狀立即就醫',
      '機構內加強落實洗手、咳嗽禮節、環境消毒等一般防治措施',
    ],
  },
]

const reportingSteps = [
  '機構人員發現疑似法定傳染病個案（如腸病毒重症、麻疹、水痘或諾羅病毒群聚等），應立即通知機構負責人並請家長帶幼兒就醫確診',
  '依傳染病防治法規定，法定傳染病須於診斷或發現後規定時限內（多數為24小時內）通報轄區衛生局(所)，機構不可自行延遲或隱匿',
  '配合衛生單位進行疫情調查，提供班級接觸者名冊、發病時間等資訊',
  '啟動班級／機構內防治措施（加強消毒、健康監測，必要時配合停課），並持續追蹤至衛生單位解除列管',
]

const suspensionRules = [
  { disease: '發燒', rule: '退燒後需滿24小時，且未使用退燒藥物情況下體溫正常，才可返園' },
  { disease: '腸病毒（手足口病／疱疹性咽峽炎）', rule: '請假原則以醫師診斷日或發病日當天為第1天，停托滿7天；同班一週內2名以上病例且逢流行期，經衛生單位認定可能須全班停課7天' },
  { disease: '水痘', rule: '全身疹子皆已結痂乾燥（通常出疹後約5–7天）才可返園' },
  { disease: '流行性結膜炎（紅眼症）', rule: '症狀（分泌物、紅腫）消失後，經醫師評估才可返園' },
  { disease: '諾羅／輪狀病毒腸胃炎', rule: '腹瀉、嘔吐症狀緩解至少48小時後才可返園，且應避免協助備餐' },
  { disease: '流感等呼吸道傳染病', rule: '依當時衛生單位公告之隔離／返園條件為準' },
]

const staffHealthMgmt = [
  '到職前及在職期間應依規定完成健康檢查，項目包含胸部X光（排除開放性肺結核）等傳染病篩檢，通常每1–2年更新一次',
  '負責備餐或協助餵食之人員，若出現腹瀉、嘔吐等腸胃道症狀，應暫停接觸食物或餵食工作，症狀緩解至少48小時後才可恢復',
  '出現呼吸道傳染病症狀（發燒、咳嗽等）之人員，應配戴口罩並考慮請假，避免帶病到園工作',
  '如確診法定傳染病，須依醫囑完成治療並經評估無傳染力後，才可返回工作崗位',
  '機構應建立人員健康資料檔案，定期更新健康檢查與疫苗接種紀錄（如MMR、水痘抗體、流感疫苗等）',
]

const handHygieneMoments = ['入園時、進食前後', '如廁後、協助幼兒如廁或更換尿布後', '接觸分泌物、嘔吐物、傷口後', '擤鼻涕、咳嗽、打噴嚏後', '接觸公共物品、玩具後']

const envCleaningRules = ['每日清潔消毒幼兒常接觸物品表面（桌面、玩具、門把、扶手）', '尿布台、如廁設施每次使用後清潔消毒', '嘔吐物、排泄物污染區域應立即以高濃度漂白水處理並做好個人防護（手套、口罩）', '寢具、毛巾等應定期清洗曝曬，避免共用']

const toccItems = [
  { letter: 'T', word: 'Travel 旅遊史', desc: '近期是否有國內外旅遊或疫區活動史' },
  { letter: 'O', word: 'Occupation 職業', desc: '家中成員是否於高風險場所工作（如醫療院所）' },
  { letter: 'C', word: 'Contact 接觸史', desc: '是否接觸過確診／疑似傳染病個案' },
  { letter: 'C', word: 'Cluster 群聚史', desc: '近期是否參與人群聚集場合，或家中／班級是否有群聚疫情' },
]

function BleachCalculator() {
  const [liters, setLiters] = useState('')
  const [ppm, setPpm] = useState(500)

  const sourcePpm = 50000 // 市售家用漂白水約5%，估算為50,000ppm有效氯
  const num = parseFloat(liters)
  const cc = num > 0 ? Math.round(num * 1000 * (ppm / sourcePpm)) : null

  const tiers = [
    { value: 500, label: '500 ppm', desc: '日常環境／玩具消毒' },
    { value: 1000, label: '1000 ppm', desc: '腸病毒流行期／物體表面加強消毒' },
    { value: 5000, label: '5000 ppm', desc: '嘔吐物、排泄物等體液污染處理' },
  ]

  return (
    <div className="bg-white/70 border border-teal-100 rounded-2xl p-4">
      <p className="text-sm font-semibold text-gray-700 mb-3">🧮 漂白水稀釋計算器</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">需要配製的水量（公升）</label>
          <input
            type="number" min="0" step="0.5" value={liters}
            onChange={e => setLiters(e.target.value)}
            placeholder="例如：10"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">目標濃度</label>
          <div className="flex gap-1.5">
            {tiers.map(t => (
              <button
                key={t.value}
                onClick={() => setPpm(t.value)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-colors ${ppm === t.value ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mb-3">{tiers.find(t => t.value === ppm)?.desc}</p>
      {cc !== null && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-3">
          <p className="text-sm text-teal-800">
            需加入市售漂白水（約5%原液）約 <strong className="text-lg">{cc} cc</strong>，
            兌水至總量 {liters} 公升，配成約 {ppm} ppm 消毒液
          </p>
        </div>
      )}
      <p className="text-xs text-gray-400 mt-3">
        以市售家用漂白水濃度約5%（約50,000ppm有效氯）估算，如使用產品濃度不同請自行換算比例；稀釋消毒液建議當日配製當日用完。
      </p>
    </div>
  )
}

const facilityChecklist = [
  '逃生通道、太平門保持暢通，無雜物堆放',
  '滅火器在有效期限內，並定期檢查壓力正常',
  '緊急照明燈與警報系統功能正常',
  '電器插座裝設安全蓋，電線妥善固定收納',
  '樓梯口、陽台、頂樓出入口裝設安全門欄',
  '遊戲器材、遊戲場地面軟墊無破損鬆動',
  '藥品、清潔用品等危險物品上鎖存放於幼兒無法取得處',
  '書櫃等高大家具固定於牆面，無倒塌風險',
  '飲用水設備、食品儲存區域清潔衛生',
  '緊急聯絡資訊（119、家長電話、鄰近醫院）張貼於明顯處',
]

const drillPoints = [
  '建議每學期至少辦理1次消防（火災）逃生演練，全園師生共同參與並留存紀錄',
  '依所在地區風險，建議增加地震避難演練（趴下、掩護、穩住）',
  '演練後應檢討疏散動線是否順暢、集合點是否安全清楚、人數清點程序是否確實',
  '建立緊急應變小組與分工（如疏散引導、清點人數、對外聯繫、急救處理），並定期更新聯絡名冊',
  '演練紀錄應留存（日期、參與人數、演練類型、檢討事項），以供主管機關查核',
]

const incidentReportSteps = [
  '事故發生當下，先確保幼兒安全並視情況給予急救處理，嚴重時立即撥打119',
  '通知機構負責人／園所主管，並儘速以電話聯繫家長告知狀況（勿等放學才告知）',
  '詳實填寫事故傷害紀錄表：時間、地點、經過、處理方式、後續狀況',
  '依機構規定期限與主管機關要求，將事故通報表送交主管機關備查',
  '事後檢討事故原因，研擬改善措施，避免同類事件再次發生',
]

const incidentScripts = [
  {
    scenario: '輕微擦挫傷通知',
    tone: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    text: '「跟您說一下，○○今天在遊戲場跑步時不小心跌倒，膝蓋擦傷了一點皮，我們已經用生理食鹽水清潔並貼上OK繃，他當下有哭一下，但現在活動力恢復正常、有繼續開心玩耍，請您回家後留意一下傷口狀況。」',
    note: '具體描述事發經過、當下處理方式與目前狀態，讓家長清楚掌握全貌而非模糊帶過',
  },
  {
    scenario: '碰撞頭部通知',
    tone: 'bg-amber-50 border-amber-200 text-amber-800',
    text: '「要跟您說一件事，○○剛剛在教室裡不小心撞到頭，額頭有點紅腫，我們已經冰敷處理，這段時間他的意識、活動力都正常、也有正常說話反應，會持續留意觀察到您接回去。接下來24–72小時在家也請多留意他的精神狀況，如有嗜睡、嘔吐、異常等情形請儘速就醫。」',
    note: '頭部撞傷須特別詳細說明觀察重點與時間範圍，並給家長明確的後續注意事項',
  },
  {
    scenario: '需送醫狀況通知',
    tone: 'bg-red-50 border-red-200 text-red-800',
    text: '「（電話聯繫）您好，跟您報告一個緊急狀況，○○剛才發生……，我們已經立即為他做……處理，目前狀況是……，我們評估後決定叫救護車／由老師陪同送往ＯＯ醫院，麻煩您盡快到醫院與我們會合，路上請小心。」',
    note: '緊急送醫狀況務必第一時間電話聯繫，語氣冷靜但明確傳達已處理的內容與現況',
  },
]

const activities = [
  {
    age: '0～1歲', domain: '粗動作／感官',
    goal: '練習趴姿抬頭、追視能力',
    steps: ['安全地板鋪軟墊，讓寶寶趴臥', '在寶寶前方15～20公分處搖動鈴鐺或高對比圖卡', '每次3～5分鐘，寶寶不耐煩就停止'],
  },
  {
    age: '1～2歲', domain: '精細動作／認知',
    goal: '練習手眼協調與因果概念',
    steps: ['準備套杯或大顆積木', '示範堆疊、套疊一次給孩子看', '讓孩子自己嘗試，鼓勵而非糾正失敗'],
  },
  {
    age: '2～3歲', domain: '語言／社會情緒',
    goal: '練習輪流表達與同儕互動',
    steps: ['安排2～3位幼兒進行簡單桌遊或說故事時間', '引導孩子輪流發言、練習等待', '對主動分享或表達的孩子給予具體稱讚'],
  },
]

const menuDesignPrinciples = [
  '六大類食物均衡搭配，每週菜色盡量不重複，主食可米飯／麵食交替',
  '質地依班級分齡調整：小月齡班需切碎、剁泥或軟爛處理，避免整顆、圓形、黏牙食材',
  '控制鹽糖用量，盡量以食材原味與天然辛香料調味',
  '優先使用當季食材，兼顧成本與新鮮度',
  '菜單需標明主要過敏原，供家長與教保人員核對幼兒個別過敏史',
]

const sampleWeekMenu = [
  { day: '星期一', morning: '地瓜粥＋豆漿', lunch: '滷雞腿肉、炒高麗菜、白飯、味噌湯', snack: '香蕉切片' },
  { day: '星期二', morning: '蔬菜蛋餅（含蛋、麩質）', lunch: '紅燒魚片、炒青江菜、糙米飯、玉米濃湯', snack: '無糖優格' },
  { day: '星期三', morning: '牛奶燕麥粥（含乳）', lunch: '番茄豆腐燴飯、燙花椰菜、蛤蜊湯（含貝類）', snack: '蒸南瓜' },
  { day: '星期四', morning: '全麥吐司＋起司（含麩質、乳）', lunch: '滷豬肉末、炒菠菜、白飯、蘿蔔排骨湯', snack: '蘋果泥' },
  { day: '星期五', morning: '小米粥＋蒸蛋（含蛋）', lunch: '清蒸鱈魚、炒櫛瓜、五穀飯、紫菜蛋花湯', snack: '米餅' },
]

const hygieneRules = [
  '備餐人員需完成健康檢查（含糞便檢查）並定期更新，作業前落實七步洗手法與戴帽戴口罩',
  '生食、熟食砧板與刀具分開使用並標示，避免交叉污染',
  '食物中心溫度：熱食應達 75°C 以上，冷藏食材保存於 7°C 以下',
  '依規定留存當日供膳「留樣」（一般建議冷藏保存48小時），供疑似食品中毒時查驗',
  '食材、成品應標示製作日期，先進先出，逾期或異味立即丟棄不供餐',
]

const allergenLabels = [
  '甲殼類（蝦、蟹）', '芒果', '花生', '牛奶／乳製品', '蛋', '堅果類（如杏仁、核桃）',
  '芝麻', '含麩質之穀物（小麥、大麥、黑麥等）', '大豆', '魚類及其製品', '使用亞硫酸鹽類等添加物之食品',
]

const emergencySteps = [
  {
    name: '異物哽塞（1歲以上，意識清楚）',
    emoji: '🆘',
    tone: 'bg-red-50 border-red-200 text-red-800',
    steps: ['立即施行哈姆立克法（腹部推擠法）：站／跪於幼兒身後，雙手環抱上腹部，快速向內向上推擠', '重複推擠直到異物排出或幼兒失去意識', '若失去意識，立即讓幼兒平躺並施行CPR，同時撥打119並準備AED'],
  },
  {
    name: '異物哽塞（未滿1歲嬰兒）',
    emoji: '👶',
    tone: 'bg-orange-50 border-orange-200 text-orange-800',
    steps: ['採取「拍背壓胸法」：讓嬰兒趴於前臂上、頭低於身體，於肩胛骨間拍背5次', '翻身讓嬰兒仰躺，以兩指於胸骨下半段快速下壓5次', '交替進行拍背與壓胸，直到異物排出或嬰兒失去反應，並立即撥打119'],
  },
  {
    name: '過敏性休克（Anaphylaxis）',
    emoji: '🚨',
    tone: 'bg-purple-50 border-purple-200 text-purple-800',
    steps: ['警覺徵兆：嘴唇／臉部腫脹、大片蕁麻疹、喘鳴或呼吸困難、嘔吐合併意識改變', '立即撥打119並同時通知家長，說明幼兒過敏史與可疑食物', '若幼兒有醫囑備藥（如腎上腺素自動注射器），依機構急救流程與訓練協助使用', '協助幼兒採取舒適姿勢（呼吸困難者採坐姿，勿平躺），持續觀察生命徵象直到救護人員到場'],
  },
]

const feedingLogColumns = ['日期', '餐別', '攝食比例', '有無異常反應', '備註']

const scripts = [
  {
    scenario: '分享正向進步',
    tone: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    text: '「○○媽媽，今天他自己把積木一個一個疊起來疊到第4層喔，比上週更穩了，看得出來他最近很喜歡玩堆疊類的玩具！」',
    note: '具體描述行為與進步幅度，讓家長感受到孩子被用心觀察，而不是空泛的「他很棒」',
  },
  {
    scenario: '提出發展疑慮（初次觀察到）',
    tone: 'bg-amber-50 border-amber-200 text-amber-800',
    text: '「我最近觀察到○○在跟其他小朋友玩的時候，比較少主動用手指東西或眼神看我們，這個部分我想跟您確認一下，在家裡是不是也有類似的情況？」',
    note: '先描述具體觀察到的行為，再邀請家長一起確認，避免直接下診斷或評價',
  },
  {
    scenario: '建議轉介評估',
    tone: 'bg-red-50 border-red-200 text-red-800',
    text: '「這幾週我們持續記錄下來，○○在語言表達上跟同齡的孩子比起來慢了一些，這不代表一定有問題，但及早了解狀況對孩子最有幫助，建議您可以帶健保卡和兒童健康手冊，跟兒科醫師聊聊，看是否需要進一步評估。」',
    note: '強調「及早了解對孩子最有幫助」，降低家長的防衛心；避免使用「遲緩」等標籤化字眼',
  },
  {
    scenario: '飲食／睡眠狀況回報',
    tone: 'bg-sky-50 border-sky-200 text-sky-800',
    text: '「跟您說一下，○○這幾天中午都只吃了平常一半的份量，精神跟活動力都還正常，想跟您確認一下，最近在家的食慮或作息是不是有什麼變化？」',
    note: '先給客觀數據，再詢問家中狀況，避免讓家長覺得被指責照顧不周',
  },
]

export default function CaregiverToolsPage({ navigate }) {
  return (
    <div>
      <div className="bg-gradient-to-br from-sky-50 to-blue-100 py-12 px-6 text-center">
        <div className="text-6xl mb-4">🧑‍🏫</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">托育人員專區</h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          日常觀察紀錄、團體膳食與備餐衛生、感染管制與停托標準、空間安全與事故通報、發展活動設計與家長溝通參考工具
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex gap-3">
          <span className="text-xl shrink-0">📋</span>
          <p className="text-sm text-sky-800 leading-relaxed">
            本頁提供之紀錄表、活動範例與溝通話術為<strong>實務參考工具</strong>，並非政府公告之標準格式；
            正式托育觀察紀錄仍請依所屬機構規範或地方政府社會局/衛生局公告格式填寫。
            發展相關描述可對照「生長發育里程碑」頁面的分齡指標。
          </p>
        </div>

        {/* Daily observation log */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 print:border-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>📝</span> 幼兒日常觀察紀錄表
            </h2>
            <button
              onClick={() => window.print()}
              className="text-xs bg-sky-500 text-white px-3 py-1.5 rounded-full hover:bg-sky-600 transition-colors print:hidden"
            >
              🖨️ 列印
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-sky-50 text-sky-800">
                  <th className="border border-sky-200 p-2">日期</th>
                  <th className="border border-sky-200 p-2">情緒狀態</th>
                  <th className="border border-sky-200 p-2">飲食情形</th>
                  <th className="border border-sky-200 p-2">睡眠情形</th>
                  <th className="border border-sky-200 p-2">如廁情形</th>
                  <th className="border border-sky-200 p-2">活動參與度</th>
                  <th className="border border-sky-200 p-2">特殊事件／備註</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="border border-gray-200 p-3 h-10">&nbsp;</td>
                    <td className="border border-gray-200 p-3">&nbsp;</td>
                    <td className="border border-gray-200 p-3">&nbsp;</td>
                    <td className="border border-gray-200 p-3">&nbsp;</td>
                    <td className="border border-gray-200 p-3">&nbsp;</td>
                    <td className="border border-gray-200 p-3">&nbsp;</td>
                    <td className="border border-gray-200 p-3">&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            建議每日固定時段填寫，長期累積可作為與家長溝通、或轉介評估時的具體觀察依據。
          </p>
        </section>

        {/* Group meal menu template */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 print:border-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>🍱</span> 團體膳食菜單範本
            </h2>
            <button
              onClick={() => window.print()}
              className="text-xs bg-sky-500 text-white px-3 py-1.5 rounded-full hover:bg-sky-600 transition-colors print:hidden"
            >
              🖨️ 列印
            </button>
          </div>

          <p className="text-sm font-semibold text-gray-600 mb-2">菜單設計原則</p>
          <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside mb-5">
            {menuDesignPrinciples.map((t, i) => <li key={i}>{t}</li>)}
          </ul>

          <p className="text-sm font-semibold text-gray-600 mb-2">週菜單範例（1～2歲班，通用格式）</p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-sky-50 text-sky-800">
                  <th className="border border-sky-200 p-2">星期</th>
                  <th className="border border-sky-200 p-2">早點</th>
                  <th className="border border-sky-200 p-2">午餐</th>
                  <th className="border border-sky-200 p-2">午點</th>
                </tr>
              </thead>
              <tbody>
                {sampleWeekMenu.map(row => (
                  <tr key={row.day}>
                    <td className="border border-gray-200 p-2 font-medium text-gray-700 whitespace-nowrap">{row.day}</td>
                    <td className="border border-gray-200 p-2 text-gray-600">{row.morning}</td>
                    <td className="border border-gray-200 p-2 text-gray-600">{row.lunch}</td>
                    <td className="border border-gray-200 p-2 text-gray-600">{row.snack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            菜色內文括號內為主要過敏原標示範例，實際供餐請依當日採購食材確認並更新標示。
          </p>

          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
            <p className="text-sm text-sky-800 leading-relaxed">
              📎 本頁提供之月菜單為<strong>通用參考範例</strong>；若貴機構（如 NIDO／IC 班）已建置專屬的月菜單系統，
              建議與該系統相互連結參照，以確保菜色與班級實際供餐內容一致。
              <span className="italic text-sky-500">（連結位置預留，待補上實際連結）</span>
            </p>
          </div>
        </section>

        {/* Food safety, allergen labeling & emergency response */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🧼</span> 備餐衛生規範重點
          </h2>
          <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside mb-2">
            {hygieneRules.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🏷️</span> 過敏原標示
          </h2>
          <p className="text-sm text-gray-500 mb-3">依食品安全衛生管理法規定應標示之常見過敏原類別：</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {allergenLabels.map(a => (
              <span key={a} className="text-xs font-medium bg-amber-100 text-amber-700 rounded-full px-3 py-1.5">{a}</span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            供餐前應對照幼兒個別過敏史清單確認，並於菜單／餐點標示中明確列出當餐使用之過敏原食材。
          </p>
        </section>

        <section className="bg-white border-2 border-red-100 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🚑</span> 緊急處理流程
          </h2>
          <div className="space-y-4">
            {emergencySteps.map(e => (
              <div key={e.name} className={`border-2 rounded-2xl p-5 ${e.tone}`}>
                <p className="font-bold text-sm mb-2 flex items-center gap-2">
                  <span className="text-xl">{e.emoji}</span> {e.name}
                </p>
                <ol className="text-sm space-y-1 list-decimal list-inside opacity-90">
                  {e.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            以上為一般性衛教流程說明，非正式急救訓練；建議托育人員定期參加合格單位（如紅十字會、消防局）之心肺復甦術與異物梗塞急救訓練並取得證照。
          </p>
        </section>

        {/* Feeding observation log */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 print:border-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>🍴</span> 餵食觀察與紀錄表
            </h2>
            <button
              onClick={() => window.print()}
              className="text-xs bg-sky-500 text-white px-3 py-1.5 rounded-full hover:bg-sky-600 transition-colors print:hidden"
            >
              🖨️ 列印
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-sky-50 text-sky-800">
                  {feedingLogColumns.map(c => (
                    <th key={c} className="border border-sky-200 p-2">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {feedingLogColumns.map(c => (
                      <td key={c} className="border border-gray-200 p-3 h-10">&nbsp;</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            建議每餐固定記錄攝食比例與反應，若同一食材連續出現異常反應，應提高警覺並主動告知家長。
          </p>
        </section>

        <SourceNote>
          資料參考：食品安全衛生管理法及其過敏原標示相關公告、食品良好衛生規範準則、兒童及少年福利機構設置標準之餐飲衛生規定、台灣兒科醫學會與紅十字會異物梗塞急救衛教資料。緊急處理流程僅供平時衛教參考，正式急救仍應以受過認證訓練之人員操作為準。
        </SourceNote>

        {/* Vaccination record check & outbreak isolation */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>💉</span> 接種紀錄查核與補種提醒
          </h2>
          <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
            {recordCheckPoints.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
          <p className="text-xs text-gray-400 mt-3">
            現行公費疫苗時程表可對照「預防接種」頁面查詢。
          </p>
        </section>

        <section className="bg-white border-2 border-red-100 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🏫</span> 群聚時接種查核與隔離原則
          </h2>
          <div className="space-y-4">
            {outbreakPrinciples.map(o => (
              <div key={o.disease} className="bg-red-50 border border-red-100 rounded-2xl p-4">
                <p className="font-bold text-red-700 text-sm mb-2 flex items-center gap-2">
                  <span className="text-xl">{o.emoji}</span> {o.disease}
                </p>
                <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside">
                  {o.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <SourceNote>
            資料參考：傳染病防治法及地方衛生局群聚事件處理指引、衛生福利部疾病管制署預防接種時程表。實際隔離／健康監測天數與通報流程請依當次衛生單位指示與最新公告為準。
          </SourceNote>
        </section>

        {/* Infectious disease reporting, isolation & suspension standards */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📢</span> 傳染病通報流程
          </h2>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
            {reportingSteps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </section>

        <section className="bg-white border-2 border-orange-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🚸</span> 停托標準參考
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-orange-50 text-orange-800">
                  <th className="border border-orange-200 p-2 text-left">情況</th>
                  <th className="border border-orange-200 p-2 text-left">返園條件</th>
                </tr>
              </thead>
              <tbody>
                {suspensionRules.map(r => (
                  <tr key={r.disease}>
                    <td className="border border-gray-200 p-2 font-medium text-gray-700 whitespace-nowrap">{r.disease}</td>
                    <td className="border border-gray-200 p-2 text-gray-600">{r.rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SourceNote>
            資料參考：教育部與地方政府防疫停課標準公告、衛生福利部疾病管制署腸病毒停課停托標準。實際標準會依當時疫情與地方主管機關公告調整，請以最新公告為準。
          </SourceNote>
        </section>

        {/* Staff health management */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🩺</span> 人員健康管理
          </h2>
          <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
            {staffHealthMgmt.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
          <SourceNote>
            資料參考：兒童及少年福利機構設置標準人員健康檢查相關規定、機構職業衛生一般實務。實際檢查項目與週期請依所屬機構規範及地方主管機關要求為準。
          </SourceNote>
        </section>

        {/* Daily infection control */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🧼</span> 感染管制日常執行
          </h2>

          <p className="text-sm font-semibold text-gray-600 mb-2">✋ 手部衛生時機</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {handHygieneMoments.map(m => (
              <span key={m} className="text-xs font-medium bg-sky-100 text-sky-700 rounded-full px-3 py-1.5">{m}</span>
            ))}
          </div>

          <p className="text-sm font-semibold text-gray-600 mb-2">🧽 環境清潔</p>
          <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside mb-5">
            {envCleaningRules.map((t, i) => <li key={i}>{t}</li>)}
          </ul>

          <p className="text-sm font-semibold text-gray-600 mb-2">🗣️ TOCC 詢問原則</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {toccItems.map(t => (
              <div key={t.word} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-3 flex gap-3">
                <span className="text-xl font-bold text-indigo-500 shrink-0">{t.letter}</span>
                <div>
                  <p className="font-semibold text-indigo-700 text-xs">{t.word}</p>
                  <p className="text-xs text-gray-500">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mb-5">
            適用於幼兒或訪客出現不明原因發燒、呼吸道或腸胃道症狀時的初步詢問，協助研判傳播風險並決定是否需要進一步隔離或通報。
          </p>

          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 mb-5">
            <p className="text-sm text-sky-800 leading-relaxed">
              📎 本頁提供之漂白水稀釋原則為通用參考；若貴機構（如IC班／NIDO班）已建置專屬的<strong>「漂白水消毒SOP」</strong>
              （含1000/5000 PPM四桶配置），建議與該SOP相互對照使用。
              <span className="italic text-sky-500">（連結位置預留，待補上實際連結）</span>
            </p>
          </div>

          <BleachCalculator />

          <SourceNote>
            資料參考：衛生福利部疾病管制署環境消毒建議濃度、TOCC問診原則衛教資料。漂白水稀釋比例為通用估算，實際操作請依機構SOP或衛生單位指引為準。
          </SourceNote>
        </section>

        {/* Facility safety checklist */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 print:border-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>✅</span> 空間與設備安全檢核表
            </h2>
            <button
              onClick={() => window.print()}
              className="text-xs bg-sky-500 text-white px-3 py-1.5 rounded-full hover:bg-sky-600 transition-colors print:hidden"
            >
              🖨️ 列印
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-50 text-emerald-800">
                  <th className="border border-emerald-200 p-2 text-left">檢核項目</th>
                  <th className="border border-emerald-200 p-2 w-24">正常／異常</th>
                  <th className="border border-emerald-200 p-2 w-32">改善備註</th>
                </tr>
              </thead>
              <tbody>
                {facilityChecklist.map((item, i) => (
                  <tr key={i}>
                    <td className="border border-gray-200 p-2 text-gray-700">{item}</td>
                    <td className="border border-gray-200 p-2 h-10">&nbsp;</td>
                    <td className="border border-gray-200 p-2">&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">建議至少每月檢核一次，發現異常應立即改善並記錄追蹤。</p>
        </section>

        {/* Emergency drills */}
        <section className="bg-white border-2 border-orange-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🏃</span> 緊急應變演練
          </h2>
          <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
            {drillPoints.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
          <SourceNote>
            資料參考：兒童及少年福利機構設置標準防火避難相關規定、消防法及地方消防局公告之防火安全演練要求。實際辦理頻率與流程請依機構規模與地方主管機關規定為準。
          </SourceNote>
        </section>

        {/* Incident reporting & parent communication */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📋</span> 事故傷害通報流程
          </h2>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
            {incidentReportSteps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>💬</span> 事故通知家長話術範本
          </h2>
          <div className="space-y-4">
            {incidentScripts.map((s, i) => (
              <div key={i} className={`border-2 rounded-2xl p-5 ${s.tone}`}>
                <p className="font-bold text-sm mb-2">{s.scenario}</p>
                <p className="text-sm leading-relaxed mb-3">「{s.text.replace(/^「|」$/g, '')}」</p>
                <p className="text-xs opacity-80 border-t border-current/20 pt-2">💡 {s.note}</p>
              </div>
            ))}
          </div>
          <SourceNote>
            資料參考：兒童及少年福利機構重大偶發事件通報規定、一般托育機構事故傷害處理實務。通報時限與表單格式請依所屬機構及地方主管機關規定辦理。
          </SourceNote>
        </section>

        {/* Activity design */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🎨</span> 發展活動設計範例
          </h2>
          <div className="space-y-4">
            {activities.map((a, i) => (
              <div key={i} className="bg-white border-2 border-blue-100 rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-3 py-1">{a.age}</span>
                  <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full px-3 py-1">{a.domain}</span>
                </div>
                <p className="font-semibold text-gray-800 text-sm mb-2">🎯 活動目標：{a.goal}</p>
                <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                  {a.steps.map((s, j) => <li key={j}>{s}</li>)}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Communication scripts */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>💬</span> 與家長溝通發展進度話術範本
          </h2>
          <div className="space-y-4">
            {scripts.map((s, i) => (
              <div key={i} className={`border-2 rounded-2xl p-5 ${s.tone}`}>
                <p className="font-bold text-sm mb-2">{s.scenario}</p>
                <p className="text-sm leading-relaxed mb-3">「{s.text.replace(/^「|」$/g, '')}」</p>
                <p className="text-xs opacity-80 border-t border-current/20 pt-2">💡 {s.note}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            onClick={() => navigate('early-learning')}
            className="flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-2xl p-4 text-left hover:bg-purple-100 transition-colors"
          >
            <span className="text-2xl">🧠</span>
            <div>
              <p className="font-semibold text-purple-800 text-sm">早期學習與親子共讀</p>
              <p className="text-xs text-purple-600">大腦開發原則、分齡共讀技巧</p>
            </div>
            <span className="ml-auto text-purple-400">→</span>
          </button>
        </div>

        <div className="text-center">
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
