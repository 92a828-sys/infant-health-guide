const diseases = [
  {
    id: 'enterovirus',
    emoji: '🦠',
    title: '腸病毒',
    subtitle: '好發於 5 歲以下幼兒，夏秋季高峰',
    accent: 'border-red-400',
    badgeColor: 'bg-red-100 text-red-700',
    intro: '腸病毒是一群病毒的總稱，包含手足口病與疱疹性咽峽炎兩種常見類型。台灣全年均有病例，以夏秋季（4–9 月）最為盛行。5 歲以下幼兒因免疫力尚未成熟，感染後症狀往往較大人嚴重，少數重症可侵犯神經系統，需特別警覺。',
    symptoms: [
      '手、足、口腔黏膜出現小水泡或潰瘍（手足口病）',
      '喉嚨後方出現白色水泡或潰瘍（疱疹性咽峽炎）',
      '發燒 38–40°C，持續 3–5 天',
      '食慾下降、流口水增加、哭鬧不安',
      '多數幼兒約 7–10 天自然康復',
    ],
    care: [
      '補充水分，可提供冰涼食物或冰棒減緩口腔疼痛',
      '保持手部衛生，飯前便後勤洗手（預防最有效）',
      '病童至症狀消退後至少 7 天才可回托或上學',
      '玩具、餐具、尿布台以稀釋漂白水（1:100）消毒',
      '照顧者接觸病童後需立即洗手，避免交叉傳染',
    ],
    emergency: [
      '持續高燒超過 39°C 且超過 48 小時未退',
      '嗜睡、意識不清、叫不醒，或突然極度煩躁',
      '肌肉抽搐、肢體無力或歪斜',
      '呼吸急促、心跳加速、臉色蒼白',
      '嘔吐劇烈且無法進食或飲水',
    ],
  },
  {
    id: 'rsv',
    emoji: '🫁',
    title: 'RSV（呼吸道融合病毒）',
    subtitle: '2 歲以下嬰幼兒最常見的下呼吸道感染',
    accent: 'border-sky-400',
    badgeColor: 'bg-sky-100 text-sky-700',
    intro: 'RSV（Respiratory Syncytial Virus）是造成嬰幼兒細支氣管炎與肺炎最常見的病毒。幾乎所有孩子在 2 歲前都曾感染過，成人感染通常症狀輕微，但對 2 歲以下嬰兒（尤其早產兒、心肺疾病兒）可能造成嚴重呼吸困難，需住院觀察。',
    symptoms: [
      '初期 1–3 天：類似感冒，流鼻水、輕微咳嗽、低燒',
      '2–5 天後：出現喘鳴音（呼吸時有「咻咻」嘶嘶聲）',
      '呼吸加快，可見胸部起伏明顯或肋骨間下陷',
      '食慾下降，餵奶量明顯減少',
      '嬰兒有時出現短暫呼吸暫停',
    ],
    care: [
      '少量多次補充水分（母乳或配方奶不停止）',
      '生理食鹽水滴鼻液清潔鼻腔，有助改善呼吸',
      '保持室內空氣流通，絕對避免二手菸',
      '頭部稍微抬高（用枕頭墊高嬰兒床床頭端）',
      '勤洗手，避免帶嬰兒接觸有感冒症狀的大人',
      '早產兒或有心肺疾病嬰兒，可詢問醫師是否需預防用藥',
    ],
    emergency: [
      '呼吸超過 60 次/分（新生兒）或 50 次/分（嬰兒）',
      '鼻翼搧動、肋間凹陷、鎖骨上方下陷（呼吸費力警訊）',
      '嘴唇或指甲呈藍紫色（血氧不足）',
      '餵食量少於平日 50% 以上',
      '6 週以下嬰兒出現任何呼吸道症狀，請直接就醫',
    ],
  },
  {
    id: 'roseola',
    emoji: '🌹',
    title: '玫瑰疹（幼兒急疹）',
    subtitle: '6 個月至 3 歲常見，退燒後才出疹，常讓家長誤以為是藥物過敏',
    accent: 'border-pink-400',
    badgeColor: 'bg-pink-100 text-pink-700',
    intro: '玫瑰疹由人類疱疹病毒第 6 型（HHV-6）引起，幾乎所有幼兒在 3 歲前都會感染一次。最大特點是「先高燒、後出疹」——退燒後全身出現粉紅色疹子，此時家長常以為是退燒藥過敏，其實是疾病即將康復的訊號。',
    symptoms: [
      '突然高燒 39–40°C，通常持續 3–5 天',
      '發燒期間幼兒精神狀況通常比發燒溫度看起來好',
      '退燒後數小時至 1 天內，全身出現粉紅色小疹子',
      '疹子從軀幹開始，蔓延至臉部與四肢',
      '疹子不癢、不痛，約 1–2 天自然消退',
    ],
    care: [
      '使用退燒藥控制體溫，讓幼兒感到舒適',
      '多補充水分，充分休息',
      '疹子出現代表即將康復，無需特別塗藥或處理',
      '玫瑰疹傳染性低，皮疹出現期間不需強制隔離',
      '勿將出疹誤認為藥物過敏而停用必要藥物',
    ],
    emergency: [
      '高燒期間出現熱痙攣（全身抽搐、眼神上飄）',
      '發燒超過 5 天持續未退',
      '疹子出現後幼兒精神反而更差或持續高燒',
      '3 個月以下嬰兒出現高燒（無論何種原因，請立即就醫）',
    ],
  },
  {
    id: 'kawasaki',
    emoji: '❤️‍🔥',
    title: '川崎病',
    subtitle: '5 歲以下幼兒的血管發炎疾病，須及早診斷以保護心臟',
    accent: 'border-orange-400',
    badgeColor: 'bg-orange-100 text-orange-700',
    intro: '川崎病是一種原因不明的全身性血管發炎疾病，好發於 5 歲以下幼兒，台灣男童發生率高於女童。若未及時治療，可能造成冠狀動脈瘤，影響孩子一生的心臟健康。早期症狀與一般發燒相似，關鍵在於「發燒超過 5 天合併特徵性症狀」要高度警覺。',
    symptoms: [
      '持續高燒超過 5 天，退燒藥僅短暫有效',
      '雙眼眼白充血（結膜炎），但無分泌物、無眼屎',
      '嘴唇乾裂發紅，舌頭表面呈現「草莓舌」',
      '手掌、腳掌泛紅腫脹，1–2 週後開始脫皮',
      '頸部淋巴結腫大（單側，直徑通常 > 1.5 cm）',
      '全身出現不規則多型性皮疹（非水泡型）',
    ],
    care: [
      '川崎病必須住院治療，無法在家自行照護',
      '住院接受靜脈注射免疫球蛋白（IVIG）與阿斯匹林',
      '出院後仍需長期遵醫囑服用阿斯匹林，不可自行停藥',
      '定期回診進行心臟超音波追蹤，監測冠狀動脈變化',
      '若有冠狀動脈瘤，需長期心臟科追蹤',
    ],
    emergency: [
      '幼兒發燒超過 5 天，合併眼白充血、草莓舌、手腳腫脹、皮疹、淋巴結腫大任兩項以上 → 立即就醫',
      '不必等到所有症狀都出現，高度懷疑即應就醫評估',
    ],
  },
  {
    id: 'bronchiolitis',
    emoji: '💨',
    title: '細支氣管炎',
    subtitle: '2 歲以下嬰幼兒常見，多由 RSV 或其他病毒引起',
    accent: 'border-teal-400',
    badgeColor: 'bg-teal-100 text-teal-700',
    intro: '細支氣管炎是嬰幼兒最常見的下呼吸道感染，指細小支氣管發炎腫脹導致氣道阻塞。初期症狀類似一般感冒，數天後出現喘鳴與呼吸費力。多數幼兒可在家照護，但 6 個月以下嬰兒、早產兒或有潛在疾病者，病情可能較為嚴重。',
    symptoms: [
      '初期 1–3 天：流鼻水、輕微咳嗽、低燒',
      '2–5 天後：喘鳴音出現（呼吸有咻咻聲）',
      '呼吸加快，胸部起伏明顯',
      '餵奶量明顯減少（呼吸費力時無法同時吸奶）',
      '多數 7–10 天內症狀改善，咳嗽可持續 2–3 週',
    ],
    care: [
      '少量多次餵食，補充水分',
      '生理食鹽水清潔鼻腔有助改善呼吸',
      '頭部稍微抬高可減緩喘鳴不適',
      '觀察並記錄呼吸速度、胸部外觀變化',
      '保持環境通風，避免二手菸與空汙',
      '細支氣管炎無特效藥，治療以症狀支持為主',
    ],
    emergency: [
      '呼吸急促（嬰兒 > 60 次/分，幼兒 > 50 次/分）',
      '肋間凹陷或鎖骨上方下陷（呼吸費力）',
      '每次進食量少於平日 50%',
      '嘴唇或指甲蒼白、發紫',
      '嬰兒出現呼吸暫停（停止超過 15–20 秒）',
    ],
  },
  {
    id: 'otitis',
    emoji: '👂',
    title: '中耳炎',
    subtitle: '嬰幼兒常見，常繼發於感冒之後，哭鬧難安撫時需留意',
    accent: 'border-yellow-400',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    intro: '中耳炎是嬰幼兒最常見的細菌感染之一。由於嬰幼兒的耳咽管（連接耳朵與鼻咽的通道）較短且水平，感冒時病菌容易由鼻腔上行至中耳，造成積液與發炎。嬰兒無法言語，常以「感冒後新出現發燒」或「躺下哭鬧加劇」為早期訊號。',
    symptoms: [
      '感冒之後出現新一波高燒（感冒本來有改善卻又發燒）',
      '嬰兒頻繁拉扯或搓揉耳朵',
      '躺下時哭鬧更加劇烈（平躺使耳壓增加）',
      '食慾下降、睡眠品質變差、易受驚嚇',
      '耳道流出黃色或白色分泌物（代表鼓膜可能已穿孔）',
    ],
    care: [
      '依醫師診斷，視情況使用抗生素，療程通常 5–10 天，勿中途停藥',
      '退燒止痛藥（乙醯胺酚或布洛芬）可緩解耳痛不適',
      '餵奶時盡量讓頭部稍微抬高，避免完全平躺喝奶',
      '游泳、洗頭時避免讓水進入耳道（諮詢醫師後決定）',
      '按時回診評估治療效果，確認積液是否消退',
    ],
    emergency: [
      '耳朵後方出現紅腫壓痛（可能為乳突炎，需住院）',
      '服藥 48–72 小時後發燒與症狀未改善',
      '幼兒出現明顯聽力下降或對聲音反應遲鈍',
      '反覆中耳炎（一年 3 次以上），需耳鼻喉科評估是否置放耳管',
    ],
  },
  {
    id: 'rotavirus',
    emoji: '🌀',
    title: '輪狀病毒腸胃炎',
    subtitle: '5 歲以下幼兒最常見的嚴重腸胃炎，可自費接種疫苗預防',
    accent: 'border-violet-400',
    badgeColor: 'bg-violet-100 text-violet-700',
    intro: '輪狀病毒（Rotavirus）是全球造成嬰幼兒嚴重腸胃炎最常見的病毒。台灣全年均有病例，冬春季（11–3 月）為高峰。幾乎所有 5 歲以下兒童都會感染。感染後腹瀉次數多且水分大量流失，嬰幼兒特別容易發生危險的脫水。目前有自費口服疫苗可有效預防。',
    symptoms: [
      '突然大量水瀉，每天可達 10–20 次以上',
      '嘔吐（通常先嘔吐，1–2 天後才開始腹瀉）',
      '發燒（通常 38–39°C）',
      '腹痛、腹脹',
      '嬰兒特別容易快速脫水，需密切觀察',
    ],
    care: [
      '積極補充口服電解質液（ORS），少量多次，每 5 分鐘 5–10 ml 開始',
      '繼續哺乳（母乳或配方奶），不需稀釋或停止',
      '可採 BRAT 飲食：香蕉、米飯、蘋果泥、吐司（較好消化）',
      '避免高糖飲料（運動飲料、果汁）會加重腹瀉',
      '注意脫水徵兆：8 小時無尿、哭無眼淚、嘴唇乾燥',
      '每次換尿布後確實清洗雙手，輪狀病毒傳染力極強',
    ],
    emergency: [
      '8 小時以上完全無尿（嚴重脫水最重要警訊）',
      '囟門明顯凹陷（嬰兒脫水徵象）',
      '眼窩凹陷、皮膚失去彈性、哭無眼淚',
      '嘔吐劇烈，完全無法補充任何水分',
      '大便帶有大量血絲或黏液',
      '意識不清、肢體無力、極度虛弱',
    ],
  },
]

const relatedLinks = [
  {
    id: 'symptoms',
    emoji: '🌡️',
    title: '常見症狀處理',
    desc: '發燒、咳嗽、腹瀉等居家照護與就醫時機',
    color: 'bg-sky-50 border-sky-200 hover:bg-sky-100',
    textColor: 'text-sky-700',
  },
  {
    id: 'emergency',
    emoji: '🚑',
    title: '緊急狀況判斷',
    desc: '熱痙攣、異物哽塞、意識不清等緊急處理',
    color: 'bg-red-50 border-red-200 hover:bg-red-100',
    textColor: 'text-red-700',
  },
  {
    id: 'vaccination',
    emoji: '💉',
    title: '疫苗接種時程',
    desc: '輪狀病毒、流感等自費疫苗接種建議',
    color: 'bg-violet-50 border-violet-200 hover:bg-violet-100',
    textColor: 'text-violet-700',
  },
  {
    id: 'medication',
    emoji: '💊',
    title: '用藥衛教',
    desc: '退燒藥劑量計算與幼兒禁用藥物一覽',
    color: 'bg-teal-50 border-teal-200 hover:bg-teal-100',
    textColor: 'text-teal-700',
  },
  {
    id: 'vitals',
    emoji: '📊',
    title: '生命徵象參考',
    desc: '各年齡正常體溫、心跳、呼吸速率對照',
    color: 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100',
    textColor: 'text-cyan-700',
  },
]

function DiseaseArticle({ d }) {
  return (
    <article id={d.id} className="scroll-mt-20">
      {/* 疾病標題列 */}
      <div className={`border-l-4 ${d.accent} pl-4 mb-5`}>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{d.emoji}</span>
          <h2 className="text-xl font-bold text-gray-800">{d.title}</h2>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${d.badgeColor}`}>
            幼兒常見
          </span>
        </div>
        <p className="text-sm text-gray-500 ml-12">{d.subtitle}</p>
      </div>

      {/* 疾病說明 */}
      <p className="text-sm text-gray-600 leading-relaxed mb-5 ml-1">{d.intro}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* 常見症狀 */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <h3 className="font-bold text-blue-800 text-sm mb-3 flex items-center gap-1.5">
            🔍 常見症狀
          </h3>
          <ul className="space-y-2">
            {d.symptoms.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-blue-400 shrink-0 mt-0.5">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 居家照護 */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
          <h3 className="font-bold text-green-800 text-sm mb-3 flex items-center gap-1.5">
            🏠 居家照護建議
          </h3>
          <ul className="space-y-2">
            {d.care.map((c, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-green-500 shrink-0 font-bold mt-0.5">✓</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 立即就醫 */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-2">
        <h3 className="font-bold text-red-700 text-sm mb-3 flex items-center gap-1.5">
          🚨 出現以下情況，請立即就醫
        </h3>
        <ul className="space-y-2">
          {d.emergency.map((e, i) => (
            <li key={i} className="flex gap-2 text-sm text-red-700">
              <span className="shrink-0 mt-0.5">⚠️</span>
              <span>{e}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function CommonDiseasesPage({ navigate }) {
  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-50 to-violet-100 py-12 px-6 text-center">
        <div className="text-6xl mb-4">🏥</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">認識常見疾病</h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          0–5 歲幼兒常見傳染病與疾病說明，包含症狀辨識、居家照護與就醫時機
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* 緊急提示 */}
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 mb-8 flex gap-3 items-start">
          <span className="text-2xl shrink-0">🚨</span>
          <div>
            <p className="font-bold text-red-700 text-sm mb-1">緊急情況請立即撥打 119 或前往急診</p>
            <p className="text-xs text-red-600">幼兒出現意識不清、呼吸困難、嘴唇發紫、持續高燒等症狀，請勿觀望，立即就醫。</p>
          </div>
        </div>

        {/* 本頁目錄 */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-10">
          <p className="text-xs font-bold text-indigo-700 mb-3 uppercase tracking-wide">本頁疾病目錄</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {diseases.map(d => (
              <button
                key={d.id}
                onClick={() => document.getElementById(d.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 text-left px-3 py-2 rounded-xl bg-white hover:bg-indigo-100 border border-indigo-100 transition-colors text-sm text-indigo-700 font-medium"
              >
                <span>{d.emoji}</span>
                <span className="truncate">{d.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 疾病文章列表 */}
        <div className="space-y-12">
          {diseases.map((d, i) => (
            <div key={d.id}>
              <DiseaseArticle d={d} />
              {i < diseases.length - 1 && (
                <hr className="mt-10 border-gray-100" />
              )}
            </div>
          ))}
        </div>

        {/* 預防提示 */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm text-amber-700 leading-relaxed">
            <strong>預防勝於治療：</strong>
            勤洗手、按時接種公費及自費疫苗、避免帶生病幼兒至人多場所，是預防幼兒傳染病最有效的方式。
            若對孩子症狀有任何疑慮，請隨時諮詢醫師，不要等待。
          </p>
        </div>

        {/* 相關資訊連結 */}
        <div className="mt-10">
          <h2 className="text-base font-bold text-gray-700 mb-4">📎 相關衛教資訊</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedLinks.map(l => (
              <button
                key={l.id}
                onClick={() => navigate(l.id)}
                className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${l.color}`}
              >
                <span className="text-2xl shrink-0">{l.emoji}</span>
                <div>
                  <p className={`font-bold text-sm ${l.textColor}`}>{l.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{l.desc}</p>
                </div>
                <span className="ml-auto text-gray-300 shrink-0">›</span>
              </button>
            ))}
          </div>
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
