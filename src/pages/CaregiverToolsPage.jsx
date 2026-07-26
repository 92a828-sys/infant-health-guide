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
          日常觀察紀錄、發展活動設計與家長溝通參考工具
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
