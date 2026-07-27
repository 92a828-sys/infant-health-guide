import { useState } from 'react'

function PageHeader({ emoji, title, subtitle, color }) {
  return (
    <div className={`${color} py-12 px-6 text-center`}>
      <div className="text-6xl mb-4">{emoji}</div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
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

const laws = [
  { name: '兒童及少年福利與權益保障法', desc: '兒少福利與權益保障的根本大法，規範責任通報義務、禁止不當對待、保護服務等' },
  { name: '幼兒教育及照顧法', desc: '規範幼兒園（2歲至入國小前）之教育及照顧服務內容與人員資格' },
  { name: '兒童及少年福利機構設置標準', desc: '規範托嬰中心（未滿2歲）等機構之設置條件、空間設備與人力配置比例' },
  { name: '兒童及少年福利機構專業人員資格及訓練辦法', desc: '規範托育／教保專業人員之資格條件與在職訓練時數要求' },
  { name: '居家式托育服務提供者登記及管理辦法', desc: '規範居家保母之登記條件、管理與在職訓練規定' },
]

const staffingRules = [
  '托嬰中心每收托5名兒童應置專任托育人員1人，未滿5人者以5人計（生托比1:5）',
  '應置專任主管人員1人綜理業務',
  '應置特約醫師或專任護理人員至少1人',
  '專業人員資格需符合相關科系畢業或完成規定訓練課程並取得資格證明，方可任職',
]

const healthMgmtSummary = [
  '到職前及在職期間應定期辦理健康檢查（通常每1–2年一次），項目包含胸部X光排除開放性肺結核等傳染病篩檢',
  '患有法定傳染病、或經醫師評估身心狀況不適合從事托育工作者，不得聘僱或應暫停職務至康復為止',
  '腸胃道或呼吸道症狀者，備餐與餵食工作應暫停，詳細規則請見「常見疾病與照護」托育專區章節',
]

const growthMonitorTable = [
  { freq: '每日', items: '透過日常觀察紀錄表掌握精神、飲食、如廁、活動參與等當日狀況' },
  { freq: '每季（或每學期）', items: '定期測量身高、體重、頭圍，記錄並與生長曲線百分位對照' },
]

const growthTracking = [
  '建議每季（至少每學期）為幼兒測量身高、體重、頭圍一次，並記錄成長趨勢',
  '測量結果可搭配「生長曲線知多少」頁的線上估算器，換算百分位區間',
  '異常追蹤：若連續測量出現生長遲滯，或百分位大幅偏移（如跨越兩個區間以上），應提醒家長攜兒童健康手冊回診評估，機構端也應建立追蹤紀錄',
  '生長監測紀錄建議與家長於聯絡簿或定期會談中同步分享，而非僅內部留存',
]

const trainingRules = [
  { title: '每年至少18小時', desc: '在職訓練以年度計算，理論與實務並重；超過18小時的時數無法遞延至下一年度使用' },
  { title: '每2年8小時以上基本救命術', desc: '需接受基本救命術（BLS，含CPR、異物哽塞處理等）課程，可與「緊急狀況判斷」頁的CPR教學互相對照練習' },
  { title: '3年內完成各類課程', desc: '依規定期程完成涵蓋各專業課程類別的訓練，包含感染管制、兒童發展、親職教育等主題' },
]

const reportingScope = [
  '身體虐待：不明原因反覆瘀傷、燙傷、骨折等傷勢，且說法與傷勢不符',
  '精神虐待：長期言語羞辱、恐嚇、關禁閉等',
  '性虐待：任何形式的性接觸、性剝削疑慮',
  '疏忽照顧：長期未獲適當飲食、衛生、醫療照顧，或無故長時間無人照看',
  '遺棄：幼兒被拋棄或長期無人聞問',
]

const reportingWarnings = [
  '不明原因反覆出現的瘀傷、燙傷，或傷勢部位、型態與家長說法不符',
  '對特定人明顯表現出恐懼、退縮或過度警戒',
  '長期營養不良、衛生狀況持續不佳，或經常穿著不合季節的衣物',
  '行為出現顯著退化（如已學會的技能突然喪失）或出現不符年齡的性化言行',
]

const scripts2 = [
  {
    scenario: '聯絡簿撰寫原則',
    tone: 'bg-sky-50 border-sky-200 text-sky-800',
    text: '具體描述當日重要事項（飲食份量、睡眠時長、情緒狀態、活動參與），正向表現與待改善事項並陳，避免流水帳；用詞客觀、字跡工整，避免帶入個人情緒評價。',
    note: '聯絡簿是每日累積的正式紀錄，內容應經得起日後回顧查閱',
  },
  {
    scenario: '家長諮詢應對',
    tone: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    text: '「您提到的狀況我理解了，讓我說明一下我們這幾天觀察到的情形……」先完整傾聽家長疑慮再回應，避免打斷；以孩子的具體行為回應，而非空泛保證「不會有事」，必要時另約時間單獨面談深入討論。',
    note: '傾聽在先、具體在後，是化解家長疑慮最有效的順序',
  },
  {
    scenario: '衝突處理原則',
    tone: 'bg-amber-50 border-amber-200 text-amber-800',
    text: '「我了解您現在很生氣／擔心，這個狀況我們會認真處理。可以請您跟我說說當時實際發生的經過嗎？」先同理情緒、不與家長正面辯論，再共同釐清事實（時間、地點、經過），一起討論解決方案；必要時請主管或第三方介入協調。',
    note: '情緒降溫在事實釐清之前，順序顛倒容易讓衝突升溫',
  },
  {
    scenario: '幼兒間衝突告知雙方家長',
    tone: 'bg-red-50 border-red-200 text-red-800',
    text: '「今天○○和△△在搶玩具時發生一點小拉扯，○○的手臂被抓了一下，我們已經處理並安撫雙方，也請兩位孩子練習說『對不起』。這個年紀的孩子還在學習如何處理衝突，我們會持續留意引導。」',
    note: '對雙方家長說明時內容應一致、不偏袒，聚焦處理方式與後續引導，避免評價孩子的人格',
  },
]

export default function CaregiverProfessionalPage({ navigate }) {
  const [tab, setTab] = useState('laws')

  return (
    <div>
      <PageHeader
        emoji="📚"
        title="托育人員專業與法規"
        subtitle="相關法規、人員配置健康管理、幼兒健康監測、在職訓練、兒少保護通報、親師溝通進階"
        color="bg-gradient-to-br from-slate-50 to-blue-100"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex rounded-2xl bg-slate-100 p-1 mb-10 gap-1 overflow-x-auto">
          {[
            { id: 'laws', label: '📜 法規摘要' },
            { id: 'staffing', label: '👥 配置與健康管理' },
            { id: 'growth', label: '📏 幼兒健康監測' },
            { id: 'training', label: '📚 在職訓練' },
            { id: 'protection', label: '🛡️ 兒少保護通報' },
            { id: 'communication', label: '💬 親師溝通進階' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-white text-slate-700 shadow' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'laws' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-2">托育／教保工作相關的核心法規摘要（僅列名稱與重點，非法規全文，實際內容請以全國法規資料庫最新公告為準）</p>
            {laws.map(l => (
              <div key={l.name} className="bg-white border border-slate-200 rounded-2xl p-4">
                <p className="font-bold text-slate-700 text-sm mb-1">{l.name}</p>
                <p className="text-sm text-gray-600">{l.desc}</p>
              </div>
            ))}
            <SourceNote>
              資料參考：全國法規資料庫（law.moj.gov.tw）。法規條文可能修訂，實際適用內容請至全國法規資料庫查詢最新版本。
            </SourceNote>
          </div>
        )}

        {tab === 'staffing' && (
          <div className="space-y-5">
            <section className="bg-white border border-slate-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>👥</span> 人員配置與資格</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {staffingRules.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section className="bg-white border border-slate-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>🩺</span> 健康管理重點</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {healthMgmtSummary.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
              <p className="text-xs text-gray-400 mt-3">
                更完整的人員健康管理內容（含腸胃／呼吸道症狀工作限制）請見「常見疾病與照護」頁托育專區章節。
              </p>
            </section>

            <SourceNote>
              資料參考：兒童及少年福利機構設置標準、兒童及少年福利機構專業人員資格及訓練辦法。
            </SourceNote>
          </div>
        )}

        {tab === 'growth' && (
          <div className="space-y-5">
            <section className="bg-white border-2 border-slate-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>📏</span> 每日／定期健康監測</h2>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700">
                      <th className="border border-slate-200 p-2 text-left">頻率</th>
                      <th className="border border-slate-200 p-2 text-left">監測內容</th>
                    </tr>
                  </thead>
                  <tbody>
                    {growthMonitorTable.map(g => (
                      <tr key={g.freq}>
                        <td className="border border-gray-200 p-2 font-medium text-gray-700 whitespace-nowrap">{g.freq}</td>
                        <td className="border border-gray-200 p-2 text-gray-600">{g.items}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {growthTracking.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
              <button
                onClick={() => navigate('growth-chart')}
                className="mt-4 text-sm text-emerald-600 hover:text-emerald-800 underline"
              >
                前往「生長曲線知多少」百分位估算器 →
              </button>
            </section>

            <SourceNote>
              資料參考：兒童健康手冊生長曲線紀錄原則、衛生福利部國民健康署兒童生長監測衛教資料。
            </SourceNote>
          </div>
        )}

        {tab === 'training' && (
          <div className="space-y-5">
            <section className="bg-white border-2 border-blue-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>📚</span> 在職訓練時數要求</h2>
              <div className="space-y-3">
                {trainingRules.map(r => (
                  <div key={r.title} className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                    <p className="font-semibold text-blue-700 text-sm mb-1">{r.title}</p>
                    <p className="text-sm text-gray-600">{r.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                🔗 <strong>時數／積分查詢：</strong>可至衛生福利部社會及家庭署
                <a href="https://ncwis.sfaa.gov.tw/cwisweb110/login.jsp" target="_blank" rel="noopener noreferrer" className="underline font-semibold mx-1">
                  托育人員登記管理資訊系統
                </a>
                查詢個人在職訓練時數紀錄；各地方政府社會局／居家托育服務中心亦提供在職訓練課程報名資訊。
              </p>
            </div>

            <SourceNote>
              資料參考：居家式托育服務提供者登記及管理辦法、兒童及少年福利機構專業人員資格及訓練辦法在職訓練相關規定。
            </SourceNote>
          </div>
        )}

        {tab === 'protection' && (
          <div className="space-y-5">
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 flex gap-3 items-start">
              <span className="text-2xl shrink-0">🚨</span>
              <div>
                <p className="font-bold text-red-700 text-sm mb-1">托育／教保人員為法定責任通報人</p>
                <p className="text-xs text-red-600">執行職務時知悉疑似兒少保護事件，應於24小時內完成通報；無正當理由未通報者，可依法處以罰鍰。</p>
              </div>
            </div>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>🔍</span> 通報範圍</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {reportingScope.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>👁️</span> 需提高警覺的觀察警訊</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {reportingWarnings.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section className="bg-white border-2 border-red-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>📢</span> 通報方式</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                  <p className="font-bold text-red-700 text-sm mb-1">113 保護專線</p>
                  <p className="text-xs text-gray-600">24小時電話服務，亦提供線上文字對談與簡訊服務</p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                  <p className="font-bold text-red-700 text-sm mb-1">關懷e起來</p>
                  <p className="text-xs text-gray-600 mb-1">衛生福利部線上通報系統</p>
                  <a href="https://ecare.mohw.gov.tw/" target="_blank" rel="noopener noreferrer" className="text-xs text-red-500 underline">ecare.mohw.gov.tw</a>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">通報人身分依法應予保密，通報內容由主管機關依法處理與調查，通報後續處置非通報人須自行承擔的責任。</p>
            </section>

            <SourceNote>
              資料參考：兒童及少年福利與權益保障法責任通報相關條文、衛生福利部保護服務司「關懷e起來」通報流程說明。
            </SourceNote>
          </div>
        )}

        {tab === 'communication' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-2">
              延續「托育人員專區」既有的發展進度／事故通知話術，本頁聚焦聯絡簿撰寫、家長諮詢應對與衝突處理技巧。
            </p>
            {scripts2.map((s, i) => (
              <div key={i} className={`border-2 rounded-2xl p-5 ${s.tone}`}>
                <p className="font-bold text-sm mb-2">{s.scenario}</p>
                <p className="text-sm leading-relaxed mb-3">{s.text}</p>
                <p className="text-xs opacity-80 border-t border-current/20 pt-2">💡 {s.note}</p>
              </div>
            ))}
            <button
              onClick={() => navigate('caregiver')}
              className="mt-2 text-sm text-sky-600 hover:text-sky-800 underline"
            >
              前往「托育人員專區」查看發展進度與事故通知話術範本 →
            </button>
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
