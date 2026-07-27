function SourceNote({ children }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 flex gap-2 text-xs text-gray-500 leading-relaxed">
      <span className="shrink-0">📋</span>
      <p>{children}</p>
    </div>
  )
}

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
          日常觀察紀錄、團體膳食與備餐衛生、發展活動設計與家長溝通參考工具
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
