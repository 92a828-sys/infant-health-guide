import { useState } from 'react'

const diseases = [
  {
    id: 'enterovirus',
    emoji: '🦠',
    title: '腸病毒',
    subtitle: '好發於 5 歲以下幼兒，夏秋季高峰',
    color: 'from-red-50 to-rose-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    symptoms: [
      '手、足、口出現小水泡或潰瘍（手足口病）',
      '喉嚨後方出現水泡（疱疹性咽峽炎）',
      '發燒 38–40°C，持續 3–5 天',
      '食慾下降、流口水、哭鬧不安',
    ],
    care: [
      '補充水分，可食用冰涼食物減緩口腔疼痛',
      '保持手部衛生，勤洗手是最有效預防方式',
      '避免接觸其他幼兒，至症狀消退後至少 7 天',
      '玩具、餐具以稀釋漂白水消毒',
      '病童居家休養，不送托、不上學',
    ],
    emergency: [
      '持續高燒超過 39°C 超過 48 小時',
      '嗜睡、意識不清、叫不醒',
      '肌肉抽搐或肢體無力',
      '呼吸急促、心跳加速',
      '嘔吐劇烈且無法進食',
    ],
  },
  {
    id: 'rsv',
    emoji: '🫁',
    title: 'RSV（呼吸道融合病毒）',
    subtitle: '2 歲以下嬰幼兒最常見的下呼吸道感染',
    color: 'from-blue-50 to-sky-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    symptoms: [
      '初期類似感冒：流鼻水、輕微咳嗽、低燒',
      '2–3 天後出現喘鳴音（呼吸時有嘶嘶聲）',
      '呼吸加快，胸部起伏明顯',
      '嬰兒可能出現呼吸暫停',
    ],
    care: [
      '補充水分，少量多次餵食',
      '使用生理食鹽水滴鼻液清潔鼻腔',
      '保持室內空氣流通，避免二手菸',
      '勤洗手，避免接觸感冒的大人',
      '早產兒或心肺疾病嬰兒風險更高，需特別注意',
    ],
    emergency: [
      '呼吸超過 60 次/分（新生兒）或 50 次/分（嬰兒）',
      '鼻翼搧動、肋間凹陷（呼吸費力）',
      '嘴唇或指甲發紫',
      '餵食量減少超過 50% 或無法進食',
      '6 週以下嬰兒出現任何呼吸道症狀',
    ],
  },
  {
    id: 'roseola',
    emoji: '🌹',
    title: '玫瑰疹（幼兒急疹）',
    subtitle: '6 個月至 3 歲幼兒常見，由 HHV-6 病毒引起',
    color: 'from-pink-50 to-rose-50',
    border: 'border-pink-200',
    badge: 'bg-pink-100 text-pink-700',
    symptoms: [
      '突然高燒 39–40°C，持續 3–5 天',
      '發燒期間幼兒精神通常尚可',
      '退燒後全身出現粉紅色小疹子（玫瑰疹）',
      '疹子從軀幹開始，蔓延至臉、四肢，1–2 天消退',
    ],
    care: [
      '退燒藥控制體溫，讓幼兒舒服',
      '補充水分，多休息',
      '疹子出現後表示已接近康復，無需特別處理',
      '玫瑰疹本身不具高傳染性，皮疹期不需隔離',
    ],
    emergency: [
      '高燒期間出現熱痙攣（抽搐）',
      '發燒超過 5 天未退',
      '疹子出現後幼兒狀況更差',
      '3 個月以下嬰兒出現高燒',
    ],
  },
  {
    id: 'kawasaki',
    emoji: '❤️‍🔥',
    title: '川崎病',
    subtitle: '5 歲以下幼兒常見的血管發炎疾病，需及早診斷',
    color: 'from-orange-50 to-amber-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
    symptoms: [
      '持續高燒超過 5 天，且退燒藥效果有限',
      '眼白充血（結膜炎），但無分泌物',
      '嘴唇乾裂發紅、草莓舌',
      '手腳掌心泛紅腫脹，後期脫皮',
      '頸部淋巴結腫大（單側為主）',
      '全身皮疹（多型性）',
    ],
    care: [
      '川崎病需住院接受靜脈注射免疫球蛋白（IVIG）治療',
      '配合阿斯匹林療程，需遵醫囑服用',
      '定期追蹤心臟超音波，監測冠狀動脈',
      '出院後按時回診，不可自行停藥',
    ],
    emergency: [
      '發燒超過 5 天，合併上述任何 2 項症狀，請立即就醫',
      '川崎病若未及時治療，可能造成冠狀動脈瘤，影響心臟',
    ],
  },
  {
    id: 'bronchiolitis',
    emoji: '💨',
    title: '細支氣管炎',
    subtitle: '2 歲以下嬰幼兒常見，多由 RSV 或其他病毒引起',
    color: 'from-teal-50 to-cyan-50',
    border: 'border-teal-200',
    badge: 'bg-teal-100 text-teal-700',
    symptoms: [
      '初期流鼻水、輕咳、低燒',
      '2–3 天後出現喘鳴、呼吸加快',
      '餵奶量明顯減少',
      '呼吸時可聽到類似「咻咻」的聲音',
    ],
    care: [
      '補充水分，少量多次哺乳',
      '清潔鼻腔有助改善呼吸',
      '觀察呼吸速度及胸口起伏',
      '抬高頭部（可用枕頭墊高床頭端）',
      '多數可在家照護，症狀通常 7–10 天改善',
    ],
    emergency: [
      '呼吸急促（嬰兒 >60 次/分）',
      '肋間或鎖骨上凹陷（呼吸費力）',
      '進食量少於平日 50% 以上',
      '嘴唇蒼白或發紫',
      '嬰兒出現呼吸暫停',
    ],
  },
  {
    id: 'otitis',
    emoji: '👂',
    title: '中耳炎',
    subtitle: '嬰幼兒常見，常繼發於感冒之後',
    color: 'from-yellow-50 to-lime-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700',
    symptoms: [
      '感冒後出現新的高燒',
      '嬰兒拉扯或搓耳朵',
      '躺下時哭鬧更嚴重（耳壓增加）',
      '食慾下降、睡眠不佳',
      '耳道出現分泌物（鼓膜破裂時）',
    ],
    care: [
      '依醫師指示服用抗生素，療程勿中斷',
      '退燒止痛藥可緩解不適',
      '餵奶時保持頭部稍微抬高，避免平躺喝奶',
      '避免讓耳朵進水（游泳前諮詢醫師）',
      '按時回診確認治療效果',
    ],
    emergency: [
      '耳後出現紅腫（乳突炎）',
      '發燒超過 3 天未改善',
      '幼兒明顯聽力下降',
      '服藥 48–72 小時後症狀未改善',
    ],
  },
  {
    id: 'rotavirus',
    emoji: '🌀',
    title: '輪狀病毒腸胃炎',
    subtitle: '5 歲以下幼兒最常見的嚴重腸胃炎，可自費接種疫苗預防',
    color: 'from-violet-50 to-purple-50',
    border: 'border-violet-200',
    badge: 'bg-violet-100 text-violet-700',
    symptoms: [
      '突然出現大量水瀉（可達 20–30 次/天）',
      '嘔吐（通常先嘔吐後腹瀉）',
      '發燒',
      '腹痛',
      '嬰兒特別容易出現嚴重脫水',
    ],
    care: [
      '積極補充口服電解質液（ORS），少量多次',
      '繼續哺乳（母乳或配方奶）不需停止',
      '採 BRAT 飲食：香蕉、米飯、蘋果泥、吐司',
      '避免高糖飲料（如運動飲料、果汁）',
      '注意脫水徵兆：8 小時無尿、嘴唇乾、哭無淚',
    ],
    emergency: [
      '8 小時以上無尿（嚴重脫水）',
      '囟門凹陷（嬰兒）',
      '眼窩凹陷、哭無淚',
      '嘔吐劇烈無法補充水分',
      '血便或大便帶有黏液',
      '意識不清或極度虛弱',
    ],
  },
]

function DiseaseCard({ d }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`bg-gradient-to-br ${d.color} border-2 ${d.border} rounded-3xl overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">{d.emoji}</span>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{d.title}</h3>
            <p className="text-sm text-gray-500">{d.subtitle}</p>
          </div>
        </div>
        <span className="text-gray-400 text-xl transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
          ▾
        </span>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-4">
          <div className="bg-white/70 rounded-2xl p-4">
            <h4 className="font-semibold text-gray-700 text-sm mb-3">🔍 常見症狀</h4>
            <ul className="space-y-2">
              {d.symptoms.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <span className="text-blue-400 shrink-0">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/70 rounded-2xl p-4">
            <h4 className="font-semibold text-gray-700 text-sm mb-3">🏠 居家照護建議</h4>
            <ul className="space-y-2">
              {d.care.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <span className="text-green-400 shrink-0">✓</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50/80 border border-red-200 rounded-2xl p-4">
            <h4 className="font-semibold text-red-700 text-sm mb-3">🚨 立即就醫時機</h4>
            <ul className="space-y-2">
              {d.emergency.map((e, i) => (
                <li key={i} className="flex gap-2 text-sm text-red-700">
                  <span className="shrink-0">⚠️</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CommonDiseasesPage({ navigate }) {
  return (
    <div>
      <div className="bg-gradient-to-br from-indigo-50 to-violet-100 py-12 px-6 text-center">
        <div className="text-6xl mb-4">🏥</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">認識常見疾病</h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">點擊各疾病展開症狀說明、居家照護建議與就醫時機</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 mb-10 flex gap-3 items-start">
          <span className="text-2xl shrink-0">🚨</span>
          <div>
            <p className="font-bold text-red-700 text-sm mb-1">緊急情況請立即撥打 119 或前往急診</p>
            <p className="text-xs text-red-600">若幼兒出現意識不清、呼吸困難、持續高燒等症狀，請勿觀望，立即就醫。</p>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {diseases.map(d => <DiseaseCard key={d.id} d={d} />)}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm text-amber-700 leading-relaxed">
            <strong>預防勝於治療：</strong>勤洗手、按時接種疫苗、避免帶生病幼兒至人多場所，
            是預防傳染病最有效的方式。若對孩子狀況有任何疑慮，請諮詢醫師。
          </p>
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => navigate('home')} className="text-sm text-orange-500 hover:text-orange-700 underline">
            ← 返回首頁
          </button>
        </div>
      </div>
    </div>
  )
}
