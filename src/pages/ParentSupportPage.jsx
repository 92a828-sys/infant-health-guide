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

const moodSpectrum = [
  {
    name: '產後情緒低落（Baby Blues）', emoji: '🌦️',
    tag: 'bg-sky-50 border-sky-200 text-sky-800',
    desc: '約50–80%產婦會經歷，通常於產後2–3天出現，情緒起伏、易哭泣、焦慮，多在2週內自然緩解',
    steps: ['不需特別治療，但需要充分休息與陪伴', '讓伴侶、家人分擔照顧，爭取睡眠時間', '若2週後未緩解或症狀加劇，應進一步評估'],
  },
  {
    name: '產後憂鬱症（Postpartum Depression）', emoji: '🌧️',
    tag: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    desc: '約10–15%產婦會經歷，症狀持續超過2週且逐漸加劇：持續情緒低落、對照顧嬰兒失去興趣或過度焦慮、嚴重疲憊，甚至出現傷害自己或嬰兒的念頭',
    steps: ['屬於需要專業協助的醫療狀況，可尋求心理諮商或精神科評估', '必要時可搭配藥物治療，經醫師評估對哺乳影響通常可控管', '身邊親友發現徵兆時，應主動關心並協助就醫，不要等待「自己會好」'],
  },
]

const anxietyTips = [
  '常見來源：對寶寶健康過度擔心、資訊過載（爬文比較造成「別人家小孩」焦慮）、缺乏支持系統、長期睡眠不足',
  '適度篩選資訊來源，避免無止盡地瀏覽比較不同育兒論壇的極端案例',
  '建立屬於自己家庭的育兒步調，孩子的發展有個別差異，不必事事對照他人',
  '必要時尋求專業（家醫科、身心科）或同儕支持團體協助',
]

const partnerTips = [
  '產後初期建議伴侶共同參與夜間照顧（輪班或分工），避免單方長期睡眠剝奪',
  '開放溝通彼此的疲憊與需求，具體分工（如誰負責哪一段時間、家事如何分配）比籠統的「多幫忙」更有效',
  '伴侶的情緒支持（傾聽、肯定辛勞）對產後情緒恢復影響很大，不僅止於分擔家事',
  '避免「比慘」或互相指責，育兒是共同課題而非誰做得比較多的競賽',
]

const attachmentPoints = [
  { q: '什麼是安全依附？', a: '當寶寶哭泣或表達需求時，照顧者一致且及時地回應，能幫助孩子建立「世界是安全的、我的需求會被滿足」的內在信念，是長期情緒穩定與人際關係發展的基礎' },
  { q: '及時回應會寵壞孩子嗎？', a: '3歲以下嬰幼兒，及時回應需求並不會「寵壞」孩子，反而有助建立安全感；隨著年齡增長，才逐漸引入等待、規則等教養元素' },
  { q: '與回應性照護的關係', a: '此概念與「早期學習與親子共讀」頁介紹的Serve and Return（服務與回應）理論一致：一來一往的互動本身就是建構依附關係與大腦神經連結的核心' },
]

const positiveParenting = [
  { title: '描述行為而非貼標籤', desc: '如「你把玩具丟到地上了」而非「你好壞」，避免孩子形成負面自我認同' },
  { title: '溫和且堅定', desc: '同理孩子的情緒（「我知道你很生氣」），同時維持必要界線（「但是不可以打人」）' },
  { title: '自然後果取代體罰', desc: '讓孩子從行為的合理後果中學習（如玩具沒收拾就暫時收起來），而非透過恐懼與懲罰約束行為' },
  { title: '多關注正向行為', desc: '具體稱讚孩子做對的事，比一直糾正錯誤更能建立良好行為模式' },
  { title: '情緒沒有對錯，行為才有規範', desc: '允許孩子表達情緒（生氣、難過），但引導以適當方式表達，而非壓抑情緒本身' },
]

const twinsTips = [
  '主要挑戰：同時照顧多名新生兒的體力與時間負荷、擔心無法給予每個孩子足夠的個別關注、經濟負擔增加',
  '善用「同步作息」：讓寶寶們的餵奶、睡眠時間盡量同步，減少照顧循環次數',
  '主動尋求家人、月子中心或居家照顧服務協助，不需獨自硬撐',
  '加入雙胞胎／多胞胎家庭支持社群交流經驗，能有效減少孤立感',
]

const specialNeedsTips = [
  '常見類型：發展遲緩、身心障礙、慢性疾病等特殊需求兒童',
  '早期療育資源：透過兒童預防保健的發展篩檢，若有疑慮可轉介至「兒童發展聯合評估中心」進行跨專業評估（動作、認知、語言、聽力、視力、神經、家庭功能等）',
  '確診或轉介後，可透過各縣市「早期療育通報轉介中心」申請物理、職能、語言治療等療育服務，衛福部對0–6歲身心障礙或發展遲緩兒童的療育有相關補助',
  '心理調適：面對特殊需求診斷，家長常經歷否認、悲傷、接受等心理歷程，尋求家長支持團體或專業心理諮商有助於調適',
]

const stressManagement = [
  '允許自己不完美：育兒沒有「正確答案」，接受自己會犯錯、需要學習',
  '建立支持網絡：家人、朋友、同為父母的社群，適時求助不是弱點',
  '找回自己的時間：即使短暫，安排屬於自己的休息或興趣時間有助心理健康',
  '留意警訊：若持續情緒低落、失眠、對日常生活失去興趣超過2週，應主動尋求專業協助',
]

const hotlines = [
  { name: '安心專線', number: '1925', desc: '24小時，衛生福利部設置，提供心理諮詢與自殺防治即時介入（諧音「依舊愛我」）' },
  { name: '生命線', number: '1995', desc: '24小時，提供各類心理困擾協助' },
  { name: '張老師專線', number: '1980', desc: '週一至週六9:00–21:00、週日9:00–17:00，提供情緒困擾與生活適應協助' },
  { name: '孕產婦關懷諮詢專線', number: '0800-870-870', desc: '提供孕產期及育兒相關諮詢' },
]

export default function ParentSupportPage({ navigate }) {
  const [tab, setTab] = useState('mood')

  return (
    <div>
      <PageHeader
        emoji="💗"
        title="心理與親職支持"
        subtitle="產後情緒、依附關係與正向教養、特殊家庭資源、求助管道"
        color="bg-gradient-to-br from-fuchsia-50 to-pink-100"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex rounded-2xl bg-fuchsia-100 p-1 mb-10 gap-1 overflow-x-auto">
          {[
            { id: 'mood', label: '🌤️ 產後情緒與分工' },
            { id: 'attachment', label: '🤝 依附與正向教養' },
            { id: 'family', label: '👨‍👩‍👧‍👦 特殊家庭資源' },
            { id: 'help', label: '📞 求助與紓壓' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-white text-fuchsia-700 shadow' : 'text-fuchsia-600 hover:bg-fuchsia-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'mood' && (
          <div className="space-y-5">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
              <span className="text-xl shrink-0">💡</span>
              <p className="text-sm text-amber-700 leading-relaxed">
                產後情緒困擾不是「不夠愛孩子」或「意志力不夠」，而是荷爾蒙劇烈變化、睡眠剝奪、身份轉換等多重壓力下常見的生理心理反應。
              </p>
            </div>

            <section className="space-y-4">
              {moodSpectrum.map(m => (
                <div key={m.name} className={`border-2 rounded-2xl p-5 ${m.tag}`}>
                  <p className="font-bold text-sm mb-1 flex items-center gap-2">
                    <span className="text-xl">{m.emoji}</span> {m.name}
                  </p>
                  <p className="text-sm mb-3 opacity-90">{m.desc}</p>
                  <ul className="text-sm space-y-1 list-disc list-inside opacity-90">
                    {m.steps.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              ))}
            </section>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>😰</span> 育兒焦慮調適</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {anxietyTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>🤲</span> 伴侶分工與支持</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {partnerTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <SourceNote>
              資料參考：衛生福利部產後憂鬱衛教資料、台灣精神醫學會周產期情緒障礙相關指引。若懷疑有產後憂鬱症狀，請儘速尋求專業評估，不需獨自承受。
            </SourceNote>
          </div>
        )}

        {tab === 'attachment' && (
          <div className="space-y-5">
            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>🤝</span> 依附關係建立</h2>
              <div className="space-y-3">
                {attachmentPoints.map(item => (
                  <div key={item.q} className="bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-4">
                    <p className="font-semibold text-fuchsia-700 text-sm mb-1">{item.q}</p>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border-2 border-pink-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>🌱</span> 正向教養原則（0–3歲）</h2>
              <div className="space-y-3">
                {positiveParenting.map(p => (
                  <div key={p.title} className="bg-pink-50 border border-pink-100 rounded-2xl p-4">
                    <p className="font-semibold text-pink-700 text-sm mb-1">{p.title}</p>
                    <p className="text-sm text-gray-600">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <SourceNote>
              資料參考：依附理論（Attachment Theory, Bowlby & Ainsworth）、哈佛大學兒童發展中心 Serve and Return 理論、正向教養（Positive Discipline）相關文獻。
            </SourceNote>
          </div>
        )}

        {tab === 'family' && (
          <div className="space-y-5">
            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>👯</span> 雙（多）胞胎家庭</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {twinsTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section className="bg-white border-2 border-violet-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>🧩</span> 特殊需求家庭資源</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {specialNeedsTips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <SourceNote>
              資料參考：衛生福利部發展遲緩兒童早期療育相關公告、各縣市早期療育通報轉介中心服務說明。
            </SourceNote>
          </div>
        )}

        {tab === 'help' && (
          <div className="space-y-5">
            <section className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>🧘</span> 壓力調適原則</h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {stressManagement.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </section>

            <section className="bg-white border-2 border-fuchsia-200 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><span>📞</span> 求助管道</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hotlines.map(h => (
                  <div key={h.name} className="bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-4">
                    <p className="font-bold text-fuchsia-800 text-sm mb-1">{h.name}：{h.number}</p>
                    <p className="text-xs text-gray-600">{h.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <SourceNote>
              資料參考：衛生福利部心理健康司全國諮詢及救援服務專線公告。若有立即的自傷或傷害他人風險，請直接撥打119或前往急診。
            </SourceNote>
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
