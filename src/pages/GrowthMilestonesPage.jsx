import { useState } from 'react'

const ageGroups = [
  {
    id: 'm4',
    label: '4個月',
    range: '3個月16天～5個月15天',
    emoji: '🌱',
    headerBg: 'bg-gradient-to-br from-rose-50 to-pink-100 border-rose-200',
    tabActive: 'bg-rose-500 text-white shadow',
    tabInactive: 'text-rose-600 hover:bg-rose-50',
    milestones: {
      '粗動作': [
        '趴著時能以雙肘支撐，將頭抬起和地面垂直，且能維持數秒後頭慢慢放下',
        '抱在肩上直立時，頭部和上半身能撐直至少10秒，不會搖來晃去',
        '趴臥拉起時頭能跟著身體抬起（滿5個月約90%通過）',
      ],
      '細動作': [
        '仰躺時雙手手掌能自然地張開，不再一直緊握',
        '仰躺時雙手會在胸前互相靠近（不一定要碰到）',
      ],
      '視覺': [
        '眼睛可以從左右、從上到下來回追視沒有聲音的移動物體',
      ],
      '社會情緒': [
        '面對面時能持續注視人臉，表現出對人的興趣',
        '能被大人逗笑、逗出聲音',
      ],
    },
    redFlags: [
      '頭不尋常地一直歪一邊，無法回正或自由轉動',
      '仰躺靜止時，身體姿勢經常歪向固定一側，無法維持在中線上',
      '使用左右手或左右腳的次數和力量明顯不平均',
      '眼睛無法追視移動物體',
      '即使跟他玩，也很少發出聲音',
      '面對面時對人缺乏興趣，不維持目光接觸',
      '接尿布時雙腿有明顯不尋常的阻力，不容易打開、彎曲',
    ],
  },
  {
    id: 'm6',
    label: '6個月',
    range: '5個月16天～8個月15天',
    emoji: '🌼',
    headerBg: 'bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200',
    tabActive: 'bg-orange-500 text-white shadow',
    tabInactive: 'text-orange-600 hover:bg-orange-50',
    milestones: {
      '粗動作': [
        '趴著時能用手掌撐著，將上半身抬起離開地面，頭部可以上下左右自由活動',
        '能用雙手撐著地面自己坐5秒，且頭部穩定不下垂（滿7個月約90%通過）',
        '大人稍微用手在腋下扶著就能站得很挺，腳跟可以偶爾自由挪動（滿7個月約90%通過）',
      ],
      '細動作': [
        '能單手伸出碰到眼前15公分的玩具（左右手均能做到才算通過）',
        '能抓緊放在手裡的玩具並稍微搖動（大拇指能開離手掌面）',
        '兩隻手可以同時各自握緊一樣東西至少3秒',
        '會把玩具由一手平順地換到另一手（滿7個月約90%通過）',
      ],
      '聽覺': [
        '會轉頭尋找左後方和右後方約20公分處的手搖鈴聲',
      ],
      '社會情緒': [
        '和照顧大人相處時可以維持目光對視',
        '大人說話、笑、拿出玩具就可以把他逗笑',
      ],
    },
    redFlags: [
      '頭不尋常地一直歪一邊，無法回正或自由轉動',
      '兩隻手無法同時各自握緊一樣東西',
      '無法轉頭尋找聲音來源',
      '即使跟他玩，也很少發出聲音',
      '接尿布時雙腿有明顯不尋常的阻力，不容易打開、彎曲',
    ],
  },
  {
    id: 'm9',
    label: '9個月',
    range: '8個月16天～11個月15天',
    emoji: '🐣',
    headerBg: 'bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200',
    tabActive: 'bg-yellow-500 text-white shadow',
    tabInactive: 'text-yellow-600 hover:bg-yellow-50',
    milestones: {
      '粗動作': [
        '能翻身（趴著變成仰躺和仰躺變成趴著均能做到）',
        '能自己坐穩數分鐘，不會搖晃或跌倒',
        '能手扶東西站立至少5秒',
      ],
      '細動作': [
        '兩隻手可以同時各自握緊一樣東西5秒以上',
        '會重複搖動讓玩具發出聲音',
        '會把玩具由一手平順地換到另一手',
        '會轉頭向下尋找掉落不見的玩具（物體恆存概念）',
      ],
      '社會情緒': [
        '可以和人維持目光對視，大人說話、笑、玩躲貓貓就可以把他逗笑',
        '可以分辨熟人和陌生人',
      ],
    },
    redFlags: [
      '無法翻身（趴著或仰躺均無法翻身）',
      '無法自己坐穩',
      '無法把玩具由一手換到另一手',
      '無法尋找掉落不見的玩具',
      '即使跟他玩，也很少發出聲音',
      '完全聽不懂話，叫喚名字不會回頭，說「不可以」沒有反應',
      '通常無法安靜讓大人抱著坐在大腿上，一直動來動去',
    ],
  },
  {
    id: 'y1',
    label: '1歲',
    range: '11個月16天～1歲2個月15天',
    emoji: '🎂',
    headerBg: 'bg-gradient-to-br from-lime-50 to-green-100 border-lime-200',
    tabActive: 'bg-lime-600 text-white shadow',
    tabInactive: 'text-lime-700 hover:bg-lime-50',
    milestones: {
      '粗動作': [
        '能由躺的姿勢（俯臥或仰躺均可）自己坐起來',
        '能自己拉著東西站起來，然後扶著家具側走兩三步',
      ],
      '遊戲探索': [
        '能以多種方式把玩玩具（搖、捏、敲、拉等），不只是放入嘴巴或丟到地上',
      ],
      '語言溝通': [
        '能聽懂簡單的日常生活指令（過來、給我、再見等，而非根據手勢或表情反應）',
        '會在大人提示下模仿做手勢（如拍拍手、再見、拜拜等）',
        '與大人有遊戲的默契（兒歌時能做出學習過的固定配合手勢）',
      ],
      '社會情緒': [
        '可以和人維持目光對視，大人說話、笑、玩躲貓貓就可以把他逗笑',
      ],
    },
    redFlags: [
      '無法由躺的姿勢自己坐起來',
      '只會把玩具放入嘴巴或丟到地上，沒有其他玩法',
      '完全不會自己發聲；或能發出的組合音種類少於三種',
      '大人反覆叫喚名字多次仍然不理會，沒有任何抬頭、轉頭或回到大人身邊的反應',
      '通常自顧自玩，對外界呼喚完全無反應',
      '通常無法安靜讓大人抱著坐在大腿上，一直動來動去',
      '持續出現不尋常的重複動作（如注視玩具、原地轉圈等）',
    ],
  },
  {
    id: 'y1m3',
    label: '1歲3個月',
    range: '1歲2個月16天～1歲5個月15天',
    emoji: '🌻',
    headerBg: 'bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200',
    tabActive: 'bg-teal-500 text-white shadow',
    tabInactive: 'text-teal-600 hover:bg-teal-50',
    milestones: {
      '粗動作': [
        '能不須扶東西自己站起來',
        '可以放手自己走路',
      ],
      '細動作': [
        '可以拿筆隨意塗塗畫畫（大人可先示範讓小孩模仿）',
        '可以用一手拿小零食（如葡萄乾、小饅頭）放入小容器（如小罐子）',
        '會想辦法把送進容器裡的小東西取出來',
      ],
      '語言溝通': [
        '能表達自己的意思（用說、比手勢或眼神示意，如點頭搖頭、伸出手心向上表示「要」、用手指出需要的東西）',
        '能聽懂生活中常用的口頭指令（喝奶奶、拍拍手、睡覺了等，沒有手勢提示也聽懂）',
        '會在適當情況下自己做拍拍手、再見等手勢',
      ],
      '社會情緒': [
        '和照顧大人相處時可以維持目光對視，大人說話、笑就可以把他逗笑',
      ],
    },
    redFlags: [
      '只會拉大人的手或衣服，從來不用「指」的手勢表達需求',
      '完全不會自己發聲；或能發出的組合音種類少於三種',
      '大人反覆叫喚名字多次仍然不理會',
      '持續出現不尋常的重複動作（如注視玩具、原地轉圈等）',
    ],
  },
  {
    id: 'y1m6',
    label: '1歲半',
    range: '1歲5個月16天～1歲11個月15天',
    emoji: '🦋',
    headerBg: 'bg-gradient-to-br from-sky-50 to-blue-100 border-sky-200',
    tabActive: 'bg-sky-500 text-white shadow',
    tabInactive: 'text-sky-600 hover:bg-sky-50',
    milestones: {
      '粗動作': [
        '能不須扶東西自己由坐或蹲的姿勢站起來',
        '走得很穩（不踮腳尖、不左右不對稱、能轉彎、雙膝自然下垂、不常跌倒）',
        '在少許支撐下能蹲下或彎腰撿起地上的東西，然後恢復站的姿勢',
      ],
      '細動作': [
        '可以拿筆隨意塗塗畫畫',
        '可以用一手拿小零食放入小容器',
      ],
      '語言溝通': [
        '能表達自己的意思（用說、比手勢或眼神示意，如指出需要的東西或要去的方向）',
        '能聽懂並遵從日常生活中至少數個的口頭指令（沒有手勢或表情提示時也聽懂）',
      ],
      '認知': [
        '自己記得常用東西藏放的地點，可以隨時把需要的東西找出來',
      ],
      '社會情緒': [
        '自己會去找照顧大人陪他一起玩',
        '高興時會和別人分享喜悅（如轉頭面對大人微笑、或展示喜歡的東西給大人看）',
      ],
    },
    redFlags: [
      '完全不會自己發聲；或能發出的組合音種類少於三種',
      '只會拉大人的手或衣服，從來不用「指」的手勢',
      '無法遵從口頭指令（沒有手勢提示時完全不理解）',
      '大人反覆叫喚名字多次仍然不理會',
      '持續出現不尋常的重複動作（如注視玩具、原地轉圈等）',
    ],
  },
  {
    id: 'y2',
    label: '2歲',
    range: '1歲11個月16天～2歲5個月15天',
    emoji: '🐥',
    headerBg: 'bg-gradient-to-br from-violet-50 to-purple-100 border-violet-200',
    tabActive: 'bg-violet-500 text-white shadow',
    tabInactive: 'text-violet-600 hover:bg-violet-50',
    milestones: {
      '粗動作': [
        '在少許支撐下能彎下或舉膝撿起地上的東西，然後恢復站的姿勢',
        '能夠雙手拿大東西（如搬小塑桶或抱大玩具）向前走約十步不會跌倒',
      ],
      '語言溝通': [
        '至少有10個穩定使用的語詞（娃娃語如「ㄇㄇ」為奶、「汪汪」為狗亦可）',
        '能正確指認至少一個圖形（筆、鞋子、鑰匙、魚、飛機、杯子）',
        '能正確指出至少四個身體部位（頭、手、腳、眼、耳、鼻、嘴）',
      ],
      '認知學習': [
        '模仿做家事或使用大多數的家用具（如掃地、用衛生紙擦東西、玩開關、玩鍋碗瓢匙梳等）',
        '有主動探索學習的動機（如自己去把玩具找出來玩、自己拿故事書出來翻看）',
      ],
      '社會情緒': [
        '高興時會和別人分享喜悅（如轉頭面對大人微笑、或展示喜歡的東西給大人看）',
      ],
    },
    redFlags: [
      '語詞少於10個，無法用詞語表達需求',
      '無法模仿認識詞（沒有仿說動機，或發音困難以致難以聽懂）',
      '大人反覆叫喚名字多次仍然不理會',
      '不跟隨大人手指方向、不指給大人看、不模仿大人動作',
    ],
  },
  {
    id: 'y2m6',
    label: '2歲半',
    range: '2歲5個月16天～2歲11個月15天',
    emoji: '🌈',
    headerBg: 'bg-gradient-to-br from-fuchsia-50 to-pink-100 border-fuchsia-200',
    tabActive: 'bg-fuchsia-500 text-white shadow',
    tabInactive: 'text-fuchsia-600 hover:bg-fuchsia-50',
    milestones: {
      '粗動作': [
        '能不須扶東西自己由地面站起來',
        '能拉欄杆或爬牆壁走上樓梯',
        '能雙腳同時離地跳躍（兩腳同時起、同時落）',
      ],
      '細動作': [
        '會撥開小瓶蓋（旋開的那種，大人先旋開一點點讓瓶蓋不會太緊）',
        '可以一頁一頁地翻閱硬卡書或布書',
      ],
      '語言溝通': [
        '可以說出來的語詞數量已多到數不清，而且大多數不是單音（如說「蘋果」而不是「果」）',
        '大多數時候能使用兩個詞語組成的句子表達意思（如：媽媽抱抱、要喝水）',
        '能正確說出至少四個物品名稱（筆、鞋子、鑰匙、魚、飛機、杯子）',
        '能正確指出至少六個身體部位（頭、手、腳、眼、耳、鼻、嘴）',
      ],
    },
    redFlags: [
      '口齒不清，說話連最親近的大人也聽不懂',
      '語詞數量少，無法用詞語或句子表達需求',
      '大人反覆叫喚名字多次仍然不理會',
      '不跟隨大人手指方向、不指給大人看',
    ],
  },
  {
    id: 'y3',
    label: '3歲',
    range: '2歲11個月16天～3歲5個月15天',
    emoji: '⭐',
    headerBg: 'bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200',
    tabActive: 'bg-indigo-500 text-white shadow',
    tabInactive: 'text-indigo-600 hover:bg-indigo-50',
    milestones: {
      '粗動作': [
        '不須扶東西就能站起，拉起地上的東西，然後恢復站的姿勢',
        '很輕鬆就能走上樓梯',
        '能雙腳同時離地跳躍',
        '能平穩繞過室內障礙物行走',
      ],
      '語言溝通': [
        '通常可以和大人一起使用2至3個單詞的句子，且回答兩次以上問題',
        '能主動問問題（如：是什麼？為什麼？去哪裡？在哪裡？）',
        '能正確說出至少四個物品名稱',
        '能正確使用代名詞「你」、「我」（而不是都用名字代表自己）',
      ],
      '認知': [
        '能配對圖案（找出兩張相同的圖）',
      ],
    },
    redFlags: [
      '口齒不清，說話連最親近的大人也聽不懂',
      '無法使用代名詞「你」、「我」，都用名字代表自己',
      '無法用句子與大人溝通',
      '不跟隨大人手指方向、不指給大人看',
      '似乎聽不懂日常指令',
    ],
  },
]

const catStyle = {
  '粗動作':   'bg-blue-50 border-blue-200 text-blue-700',
  '細動作':   'bg-purple-50 border-purple-200 text-purple-700',
  '語言溝通': 'bg-green-50 border-green-200 text-green-700',
  '認知':     'bg-amber-50 border-amber-200 text-amber-700',
  '認知學習': 'bg-amber-50 border-amber-200 text-amber-700',
  '社會情緒': 'bg-pink-50 border-pink-200 text-pink-700',
  '視覺':     'bg-cyan-50 border-cyan-200 text-cyan-700',
  '聽覺':     'bg-teal-50 border-teal-200 text-teal-700',
  '遊戲探索': 'bg-orange-50 border-orange-200 text-orange-700',
}

const catIcon = {
  '粗動作':   '🏃',
  '細動作':   '✋',
  '語言溝通': '🗣️',
  '認知':     '🧠',
  '認知學習': '🧠',
  '社會情緒': '💞',
  '視覺':     '👁️',
  '聽覺':     '👂',
  '遊戲探索': '🎮',
}

export default function GrowthMilestonesPage({ navigate }) {
  const [activeId, setActiveId] = useState('m4')
  const group = ageGroups.find(g => g.id === activeId)

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-6 text-center">
        <div className="text-6xl mb-4">📏</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">生長發育里程碑</h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          依據臺北市學齡前兒童發展檢核表，涵蓋4個月至3歲共9個年齡段
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Source note */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-8 flex gap-3">
          <span className="text-xl shrink-0">📋</span>
          <p className="text-sm text-emerald-800 leading-relaxed">
            本頁內容來源：<strong>臺北市政府衛生局・臺北市學齡前兒童發展檢核表（114年版）</strong>。
            檢核表為篩查工具，每位孩子發展速度不同；若有多項疑慮，請攜帶「健保卡」及「兒童健康手冊」至兒科或早療評估機構進一步確認。
          </p>
        </div>

        {/* Age group tabs — mobile: 3×3 grid, desktop: horizontal */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 mb-8">
          {ageGroups.map(g => (
            <button
              key={g.id}
              onClick={() => setActiveId(g.id)}
              className={`rounded-xl py-2 px-1 text-xs font-semibold transition-all text-center leading-tight ${
                activeId === g.id ? g.tabActive : g.tabInactive
              }`}
            >
              <div className="text-base mb-0.5">{g.emoji}</div>
              {g.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className={`border-2 rounded-3xl overflow-hidden ${group.headerBg.includes('border') ? '' : ''}`}>

          {/* Panel header */}
          <div className={`border-b-2 p-6 ${group.headerBg}`}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-4xl">{group.emoji}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{group.label}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{group.range}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6">

            {/* Milestones */}
            <h3 className="font-bold text-gray-700 text-sm mb-4 flex items-center gap-2">
              <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs">✅ 這個階段可以做到</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {Object.entries(group.milestones).map(([cat, items]) => (
                <div
                  key={cat}
                  className={`border rounded-2xl p-4 ${catStyle[cat] ?? 'bg-gray-50 border-gray-200 text-gray-700'}`}
                >
                  <p className="font-semibold text-xs mb-2 flex items-center gap-1.5">
                    <span>{catIcon[cat] ?? '•'}</span>
                    <span>{cat}</span>
                  </p>
                  <ul className="space-y-1.5">
                    {items.map((item, i) => (
                      <li key={i} className="text-xs leading-relaxed flex gap-1.5 text-gray-700">
                        <span className="shrink-0 mt-0.5 opacity-50">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Red flags */}
            <h3 className="font-bold text-gray-700 text-sm mb-4 flex items-center gap-2">
              <span className="bg-red-100 text-red-700 rounded-full px-2 py-0.5 text-xs">🚩 紅旗警訊——出現以下情形請盡早就醫評估</span>
            </h3>
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5">
              <ul className="space-y-2">
                {group.redFlags.map((flag, i) => (
                  <li key={i} className="flex gap-2 items-start text-sm text-red-800">
                    <span className="text-red-400 shrink-0 mt-0.5">★</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-red-500 mt-4 border-t border-red-200 pt-3">
                出現任何紅旗警訊，請攜帶「健保卡」及「兒童健康手冊」至兒童發展篩檢服務（PeDS）院所，或至早療評估醫院進一步確認。
              </p>
            </div>
          </div>
        </div>

        {/* Navigation hint */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {ageGroups.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActiveId(g.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                activeId === g.id
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'text-gray-500 border-gray-200 hover:border-gray-400'
              }`}
            >
              {i + 1}. {g.label}
            </button>
          ))}
        </div>

        {/* General tip */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
          <span className="text-xl shrink-0">💡</span>
          <p className="text-sm text-amber-700 leading-relaxed">
            <strong>提醒：</strong>每位孩子的發展速度不同，里程碑為「大多數孩子」可達到的範圍，並非嚴格標準。
            若孩子僅有個別項目略慢可先觀察；若有多項落後或出現上方紅旗警訊，建議主動向兒科醫師反映，必要時轉介早療資源，
            <strong>早期介入效果最好</strong>。
          </p>
        </div>

        {/* Related links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('vitals')}
            className="flex items-center gap-3 bg-cyan-50 border border-cyan-200 rounded-2xl p-4 text-left hover:bg-cyan-100 transition-colors"
          >
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-semibold text-cyan-800 text-sm">0–3歲生命徵象</p>
              <p className="text-xs text-cyan-600">體溫、心跳、呼吸正常範圍對照</p>
            </div>
            <span className="ml-auto text-cyan-400">→</span>
          </button>
          <button
            onClick={() => navigate('emergency')}
            className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 text-left hover:bg-red-100 transition-colors"
          >
            <span className="text-2xl">🚑</span>
            <div>
              <p className="font-semibold text-red-800 text-sm">緊急狀況判斷</p>
              <p className="text-xs text-red-600">哪些症狀需立即就醫</p>
            </div>
            <span className="ml-auto text-red-400">→</span>
          </button>
        </div>

        <div className="mt-8 text-center">
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
