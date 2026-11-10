import { Alert } from '../components/Alert'

const readingStages = [
  {
    age: '0～6個月',
    emoji: '👶',
    tips: ['用愉悅、誇張的聲調朗讀給寶寶聽', '透過肢體接觸（抱著唸）增進親子連結', '寶寶疲累、不專心時就停止，不必勉強'],
    books: '色彩鮮明、對比強烈的圖畫書',
  },
  {
    age: '6～12個月',
    emoji: '🍼',
    tips: ['持續用愉悅聲調朗讀，讓寶寶熟悉語音節奏', '讓寶寶觸摸、翻閱布書或洗澡書', '共讀時間不必長，重點是固定出現'],
    books: '溫馨、圖案鮮明的圖畫書、布書、洗澡書',
  },
  {
    age: '1～2歲',
    emoji: '🚶',
    tips: ['布置一個孩子隨手可拿到書的「閱讀角落」', '讓孩子自己翻頁，大人手指著圖案命名', '大人可以自問自答，示範語言表達'],
    books: '有韻律感、重複句型、字少的繪本，互動玩具書',
  },
  {
    age: '2～3歲',
    emoji: '🧒',
    tips: ['用開放式問題引導孩子主動回答（如「牠在做什麼？」）', '把故事情節和孩子的生活經驗連結', '書被撕破時耐心修補，不責罵，保護閱讀興趣'],
    books: '貼近生活經驗的繪本、各類主題故事書',
  },
]

export default function EarlyLearningPage({ navigate }) {
  return (
    <div>
      <div className="bg-canvas border-b border-border py-12 px-6 text-center">
        <div className="text-6xl mb-4">🧠</div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-2">早期學習與親子共讀</h1>
        <p className="text-ink-muted text-sm max-w-xl mx-auto">
          0～3歲是大腦發展的黃金期，陪伴與互動就是最好的教材
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Source note */}
        <div className="bg-surface-muted border border-border rounded-2xl p-4 flex gap-3">
          <span className="text-xl shrink-0">📋</span>
          <p className="text-sm text-ink leading-relaxed">
            本頁內容參考：<strong>衛生福利部國民健康署「親子共讀」衛教宣導</strong>、
            Heho親子報導（引小兒神經科醫師郭雲鼎觀點，2021）、
            以及美國哈佛大學兒童發展中心（Center on the Developing Child, Harvard University）提出之
            「Serve and Return（服務與回應）」互動理論。實務做法會因每個孩子的氣質而有所不同，僅供參考。
          </p>
        </div>

        {/* Brain development section */}
        <section className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
            <span>🧠</span> 大腦開發三大原則：陪伴・刺激・營養
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div className="border rounded-2xl p-4 bg-cat-mauve-bg border-cat-mauve-fg/20 text-cat-mauve-fg">
              <p className="font-semibold text-sm mb-1.5">💞 陪伴</p>
              <p className="text-xs leading-relaxed">
                多與寶寶互動、眼神交流、回應寶寶的表情與聲音，建構穩固的親子依附關係
              </p>
            </div>
            <div className="border rounded-2xl p-4 bg-cat-lav-bg border-cat-lav-fg/20 text-cat-lav-fg">
              <p className="font-semibold text-sm mb-1.5">🎵 刺激</p>
              <p className="text-xs leading-relaxed">
                聽音樂、說故事、多樣的觸摸與探索經驗，不需要昂貴教材，家庭日常互動就是最好的刺激
              </p>
            </div>
            <div className="border rounded-2xl p-4 bg-cat-teal-bg border-cat-teal-fg/20 text-cat-teal-fg">
              <p className="font-semibold text-sm mb-1.5">🥗 營養</p>
              <p className="text-xs leading-relaxed">
                均衡飲食提供大腦發育所需營養素，詳見「飲食與副食品」頁面的分齡建議
              </p>
            </div>
          </div>
          <Alert tone="warning" label="提醒" title="回應性照護（Serve and Return）">
            <p>
              當寶寶發出聲音、表情或動作（發球）時，大人及時給予眼神、話語或擁抱回應（接球），
              這一來一往的互動是建構大腦神經連結最有效的方式，比任何昂貴的教具都重要。
            </p>
          </Alert>
        </section>

        {/* Sensory & play activities */}
        <section className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
            <span>🎮</span> 感官刺激與遊戲活動建議
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="border border-border rounded-2xl p-4">
              <p className="font-semibold text-ink mb-2">0～1歲</p>
              <ul className="text-ink-muted space-y-1.5 list-disc list-inside">
                <li>黑白／高對比圖卡吸引視覺注意</li>
                <li>搖鈴、布書提供聽覺與觸覺刺激</li>
                <li>趴姿時間（tummy time）鍛鍊頸部與核心肌力</li>
                <li>躲貓貓遊戲建立物體恆存概念</li>
              </ul>
            </div>
            <div className="border border-border rounded-2xl p-4">
              <p className="font-semibold text-ink mb-2">1～2歲</p>
              <ul className="text-ink-muted space-y-1.5 list-disc list-inside">
                <li>堆疊積木、套杯練習手眼協調與因果關係</li>
                <li>簡單指令遊戲（拿給我、放進去）練習語言理解</li>
                <li>戶外散步、探索不同材質的物品</li>
                <li>模仿家事（擦桌子、假裝掃地）</li>
              </ul>
            </div>
            <div className="border border-border rounded-2xl p-4 sm:col-span-2">
              <p className="font-semibold text-ink mb-2">2～3歲</p>
              <ul className="text-ink-muted space-y-1.5 list-disc list-inside">
                <li>簡單拼圖、配對圖卡練習認知與專注力</li>
                <li>角色扮演遊戲（扮家家酒）發展想像力與社會情緒</li>
                <li>塗鴉、著色練習精細動作</li>
                <li>唱兒歌、猜謎語增加語言表達機會</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Reading guide by age */}
        <section>
          <h2 className="text-xl font-bold text-ink mb-2 flex items-center gap-2">
            <span>📖</span> 親子共讀指南（分齡）
          </h2>
          <p className="text-sm text-ink-muted mb-5">
            國健署共讀口訣：<strong className="text-brand">共讀零歲就開始・啟動對話式共讀・隨時隨地都共讀・共讀時間由少而多養成好習慣</strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {readingStages.map(s => (
              <div key={s.age} className="bg-surface border border-border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{s.emoji}</span>
                  <h3 className="font-bold text-ink">{s.age}</h3>
                </div>
                <ul className="text-sm text-ink-muted space-y-1.5 list-disc list-inside mb-3">
                  {s.tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
                <p className="text-xs bg-surface-muted text-ink rounded-lg px-3 py-2">
                  📚 適合繪本：{s.books}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Nav */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('growth')}
            className="flex items-center gap-3 bg-surface border border-border rounded-2xl p-4 text-left hover:bg-brand-soft transition-colors"
          >
            <span className="text-2xl">📏</span>
            <div>
              <p className="font-semibold text-ink text-sm">生長發育里程碑</p>
              <p className="text-xs text-ink-muted">動作、語言、社會情緒發展指標</p>
            </div>
            <span className="ml-auto text-brand">→</span>
          </button>
          <button
            onClick={() => navigate('parent-support')}
            className="flex items-center gap-3 bg-surface border border-border rounded-2xl p-4 text-left hover:bg-brand-soft transition-colors"
          >
            <span className="text-2xl">💗</span>
            <div>
              <p className="font-semibold text-ink text-sm">親職支持</p>
              <p className="text-xs text-ink-muted">產後情緒、正向教養與求助資源</p>
            </div>
            <span className="ml-auto text-brand">→</span>
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('home')}
            className="text-sm text-brand hover:opacity-80 underline underline-offset-4"
          >
            ← 返回首頁
          </button>
        </div>
      </div>
    </div>
  )
}
