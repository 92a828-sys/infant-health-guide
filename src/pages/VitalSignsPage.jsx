import { useState } from 'react'

// ── 各年齡正常值 ────────────────────────────────────────────
const ageGroups = [
  {
    label: '新生兒',
    range: '0–1 個月',
    hr:    '100–160',
    rr:    '40–60',
    temp:  '36.5–37.5',
    spo2:  '95–100',
  },
  {
    label: '小嬰兒',
    range: '1–6 個月',
    hr:    '100–150',
    rr:    '30–50',
    temp:  '36.5–37.5',
    spo2:  '95–100',
  },
  {
    label: '嬰兒',
    range: '6–12 個月',
    hr:    '90–150',
    rr:    '25–45',
    temp:  '36.5–37.5',
    spo2:  '95–100',
  },
  {
    label: '學步兒',
    range: '1–3 歲',
    hr:    '85–130',
    rr:    '20–35',
    temp:  '36.5–37.5',
    spo2:  '95–100',
  },
]

// ── 各生命徵象詳細說明 ────────────────────────────────────────
const TABS = [
  { id: 'temp',  emoji: '🌡️', label: '體溫' },
  { id: 'hr',    emoji: '❤️', label: '心跳' },
  { id: 'rr',    emoji: '🫁', label: '呼吸' },
  { id: 'spo2',  emoji: '💍', label: '血氧' },
  { id: 'aware', emoji: '👀', label: '意識' },
]

const tempData = {
  methods: [
    {
      name: '肛溫（最準確）',
      icon: '🔴',
      note: '6 個月以下嬰兒優先使用',
      steps: [
        '在體溫計前端塗少量凡士林',
        '讓嬰兒趴在腿上或仰躺，輕抬雙腳',
        '輕輕插入肛門約 2 公分，持續 1 分鐘',
        '正常值：36.5–37.5°C',
      ],
    },
    {
      name: '腋溫（最常用）',
      icon: '🟡',
      note: '一般日常監測推薦',
      steps: [
        '確保腋下乾燥',
        '將體溫計夾緊於腋下，手臂自然貼緊身體',
        '水銀計量 3 分鐘；電子計聽到聲響為止',
        '正常值：36.0–37.0°C（比肛溫低約 0.5°C）',
      ],
    },
    {
      name: '耳溫（快速方便）',
      icon: '🟠',
      note: '6 個月以上嬰兒可用',
      steps: [
        '將耳廓輕向後上方拉直（嬰兒向後拉即可）',
        '將探頭對準耳道插入，按下按鈕約 1 秒',
        '左右耳可能有差異，建議量同一耳',
        '正常值：36.5–37.5°C',
      ],
    },
    {
      name: '額溫（最快速）',
      icon: '🟢',
      note: '方便但準確性較低',
      steps: [
        '從前額中央向太陽穴方向掃過',
        '距額頭 1–3 公分（依品牌說明）',
        '注意：剛運動、哭鬧後數值可能偏高',
        '正常值參考：36.0–37.2°C（依品牌調整）',
      ],
    },
  ],
  ranges: [
    { label: '體溫偏低', range: '< 36.0°C', color: 'bg-blue-100 text-blue-800', action: '注意保暖，觀察活力', alert: false },
    { label: '正常體溫', range: '36.0–37.5°C', color: 'bg-green-100 text-green-800', action: '正常，繼續觀察', alert: false },
    { label: '低燒',     range: '37.6–38.0°C', color: 'bg-yellow-100 text-yellow-800', action: '觀察活力、補充水分', alert: false },
    { label: '發燒',     range: '38.1–39.9°C', color: 'bg-orange-100 text-orange-800', action: '可給退燒藥，持續觀察', alert: false },
    { label: '高燒',     range: '≥ 40.0°C',    color: 'bg-red-100 text-red-800',    action: '立即就醫評估', alert: true },
  ],
  tips: [
    '3 個月以下嬰兒，肛溫 ≥ 38°C → 立即就醫，不要等待',
    '退燒藥只能「緩解不適」，不能「治療病因」',
    '量體溫前 20 分鐘避免運動、洗澡、哭鬧',
    '體溫高低不等於病況嚴重程度，幼兒活力才是最重要指標',
  ],
}

const hrData = {
  howTo: [
    '將食指與中指輕放在手腕拇指側（橈動脈）',
    '或輕放於頸部一側（頸動脈）',
    '數 15 秒的跳動次數，再乘以 4',
    '嬰兒可將耳朵靠近胸口直接聽心跳',
    '最準確：用聽診器聽心尖音（左胸）',
  ],
  ranges: [
    { label: '過慢',  range: '< 80 次/分（嬰兒）', color: 'bg-blue-100 text-blue-800',   alert: true  },
    { label: '正常',  range: '依年齡見上表',         color: 'bg-green-100 text-green-800', alert: false },
    { label: '偏快',  range: '> 160 次/分（嬰兒）', color: 'bg-yellow-100 text-yellow-800', alert: false },
    { label: '過快',  range: '> 200 次/分',          color: 'bg-red-100 text-red-800',     alert: true  },
  ],
  tips: [
    '哭鬧、發燒、剛喝奶後心跳會自然加快，這是正常的',
    '平靜休息時心跳仍持續偏快（>160/分）才需注意',
    '心跳不規則、忽快忽慢請就醫評估',
    '心跳過慢（<80/分）合併臉色蒼白 → 立即急診',
  ],
}

const rrData = {
  howTo: [
    '讓幼兒平靜或睡眠中測量（哭鬧時數值不準）',
    '觀察胸部或腹部的起伏',
    '數 1 分鐘的呼吸次數（上下算一次）',
    '也可將手輕放在肚子上感受起伏',
    '注意：不要告訴幼兒你在數，否則呼吸會不自然',
  ],
  ranges: [
    { label: '正常',     range: '依年齡見上表',           color: 'bg-green-100 text-green-800',  alert: false },
    { label: '輕度偏快', range: '比正常值多 10 次/分',    color: 'bg-yellow-100 text-yellow-800', alert: false },
    { label: '呼吸急促', range: '嬰兒 > 60 次/分',        color: 'bg-orange-100 text-orange-800', alert: true  },
    { label: '危險',     range: '幼兒 > 50 次/分且費力',  color: 'bg-red-100 text-red-800',       alert: true  },
  ],
  warningSigns: [
    { sign: '鼻翼搧動',       desc: '呼吸時鼻孔跟著起伏，表示呼吸費力' },
    { sign: '肋間凹陷',       desc: '呼吸時可看見肋骨間的皮膚下陷' },
    { sign: '鎖骨上凹陷',     desc: '呼吸時鎖骨上方凹進去' },
    { sign: '喘鳴音',         desc: '呼吸時有「咻咻」或「呼嚕」聲' },
    { sign: '嘴唇／指甲發紫', desc: '代表血氧不足，需立即就醫' },
    { sign: '點頭呼吸',       desc: '嬰兒呼吸時頭部隨之點動，極度費力' },
  ],
  tips: [
    '發燒每升高 1°C，呼吸速率約增加 4 次/分，這是正常反應',
    '睡眠中偶爾暫停呼吸不超過 10 秒通常正常（新生兒）',
    '超過 20 秒的呼吸暫停 → 立即就醫',
  ],
}

const spo2Data = {
  intro: '血氧（SpO₂）是血液中含氧量的百分比，可用夾在手指上的「血氧機（脈搏血氧儀）」測量。',
  howTo: [
    '選擇嬰幼兒適用的血氧機（探頭較小）',
    '將探頭夾在腳趾或手指上（嬰兒建議腳趾）',
    '等待數值穩定（約 20–30 秒）再讀取',
    '確保幼兒安靜，哭鬧或亂動會造成數值誤差',
    '手腳冰冷或甲油也可能影響準確度',
  ],
  ranges: [
    { label: '正常',   range: '95–100%',  color: 'bg-green-100 text-green-800',  action: '正常，繼續觀察',     alert: false },
    { label: '輕度低', range: '91–94%',   color: 'bg-yellow-100 text-yellow-800', action: '觀察，安撫幼兒後重測', alert: false },
    { label: '偏低',   range: '88–90%',   color: 'bg-orange-100 text-orange-800', action: '立即就醫',           alert: true  },
    { label: '危險',   range: '< 88%',    color: 'bg-red-100 text-red-800',       action: '撥打 119',           alert: true  },
  ],
  tips: [
    '家中備有血氧機不代表可以取代就醫判斷',
    '數值僅供參考，幼兒活力、呼吸外觀更重要',
    '正常血氧但幼兒很不舒服，仍應就醫',
    '新生兒出生後 24–48 小時血氧監測可早期發現先天性心臟病',
  ],
}

const awareData = {
  intro: '「意識」是觀察幼兒神智是否清醒，是最簡單、最重要的生命徵象之一，不需任何儀器。',
  levels: [
    {
      label: 'A — 清醒（Alert）',
      emoji: '😊',
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-800',
      desc: '幼兒清醒，對聲音、臉孔有反應，哭聲有力，活動力正常',
      action: '正常',
    },
    {
      label: 'V — 對聲音有反應（Voice）',
      emoji: '😐',
      color: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-800',
      desc: '閉著眼，但叫名字或出聲會有反應（動一下、睜眼）',
      action: '觀察，嘗試喚醒',
    },
    {
      label: 'P — 對痛有反應（Pain）',
      emoji: '😟',
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-800',
      desc: '叫不醒，但捏手背或腳底會有反應（縮手、皺眉）',
      action: '立即就醫',
    },
    {
      label: 'U — 無反應（Unresponsive）',
      emoji: '🚨',
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-800',
      desc: '完全無反應，叫不醒，痛刺激也沒反應',
      action: '撥打 119，立即急救',
    },
  ],
  redFlags: [
    '目光呆滯、眼神散渙，與平常不同',
    '突然不愛喝奶、沒有笑容',
    '肌肉張力變低，身體軟趴趴',
    '哭聲微弱或哭聲高亢尖銳',
    '不尋常的躁動不安或過度嗜睡',
    '無法認出父母或日常照顧者',
  ],
}

// ── 子元件 ────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return <h3 className="font-bold text-gray-700 text-sm mb-3">{children}</h3>
}

function AlertTag({ alert }) {
  return alert
    ? <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold ml-2">⚠️ 就醫</span>
    : null
}

export default function VitalSignsPage({ navigate }) {
  const [tab, setTab] = useState('temp')

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-50 to-sky-100 py-12 px-6 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">0–3 歲生命徵象</h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">給爸媽與托育人員的生活化參考指南，不需醫療背景也看得懂</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ── 快速對照表 ── */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-800 mb-1">📋 正常值快速對照表</h2>
          <p className="text-xs text-gray-400 mb-4">以下為平靜休息時的參考範圍，哭鬧、發燒時數值會自然偏高</p>
          <div className="overflow-x-auto rounded-3xl border-2 border-sky-200">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="bg-sky-50">
                  <th className="text-left px-4 py-3 text-sky-800 font-bold">年齡</th>
                  <th className="text-center px-4 py-3 text-sky-800 font-bold">❤️ 心跳<br/><span className="font-normal text-xs">次/分</span></th>
                  <th className="text-center px-4 py-3 text-sky-800 font-bold">🫁 呼吸<br/><span className="font-normal text-xs">次/分</span></th>
                  <th className="text-center px-4 py-3 text-sky-800 font-bold">🌡️ 體溫<br/><span className="font-normal text-xs">°C（肛溫）</span></th>
                  <th className="text-center px-4 py-3 text-sky-800 font-bold">💍 血氧<br/><span className="font-normal text-xs">%</span></th>
                </tr>
              </thead>
              <tbody>
                {ageGroups.map((g, i) => (
                  <tr key={g.label} className={i % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'}>
                    <td className="px-4 py-3">
                      <p className="font-bold text-gray-800">{g.label}</p>
                      <p className="text-xs text-gray-400">{g.range}</p>
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-rose-600">{g.hr}</td>
                    <td className="px-4 py-3 text-center font-semibold text-teal-600">{g.rr}</td>
                    <td className="px-4 py-3 text-center font-semibold text-orange-600">{g.temp}</td>
                    <td className="px-4 py-3 text-center font-semibold text-violet-600">{g.spo2}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-right">資料來源參考：台灣兒科醫學會、Pediatric Advanced Life Support（PALS）</p>
        </div>

        {/* ── 分項說明 Tab ── */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">🔍 各項說明與測量方式</h2>
        <div className="flex rounded-2xl bg-sky-50 p-1 mb-8 gap-1 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? 'bg-white text-sky-700 shadow' : 'text-sky-600 hover:bg-sky-100'
              }`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* ── 體溫 ── */}
        {tab === 'temp' && (
          <div className="space-y-6">
            <div>
              <SectionTitle>🌡️ 體溫分級</SectionTitle>
              <div className="space-y-2">
                {tempData.ranges.map(r => (
                  <div key={r.label} className={`flex items-center justify-between px-4 py-3 rounded-2xl ${r.color}`}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{r.label}</span>
                      <AlertTag alert={r.alert} />
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{r.range}</p>
                      <p className="text-xs opacity-70">{r.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle>📏 測量方式說明</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tempData.methods.map(m => (
                  <div key={m.name} className="bg-white border-2 border-gray-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{m.icon}</span>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.note}</p>
                      </div>
                    </div>
                    <ol className="space-y-1.5">
                      {m.steps.map((s, i) => (
                        <li key={i} className="flex gap-2 text-xs text-gray-600">
                          <span className="text-sky-400 font-bold shrink-0">{i + 1}.</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="font-semibold text-amber-800 text-sm mb-2">💡 注意事項</p>
              <ul className="space-y-1.5">
                {tempData.tips.map((t, i) => (
                  <li key={i} className="text-sm text-amber-700 flex gap-2">
                    <span className="shrink-0">•</span><span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── 心跳 ── */}
        {tab === 'hr' && (
          <div className="space-y-6">
            <div className="bg-rose-50 border-2 border-rose-100 rounded-2xl p-5">
              <SectionTitle>❤️ 如何測量心跳／脈搏</SectionTitle>
              <ol className="space-y-2">
                {hrData.howTo.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-rose-400 font-bold shrink-0">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 bg-white rounded-xl p-3 border border-rose-100">
                <p className="text-xs text-gray-500 text-center">數 15 秒 × 4 = 每分鐘心跳次數</p>
                <p className="text-xs text-gray-400 text-center mt-1">例：15 秒數到 35 下 → 35 × 4 = 140 次/分</p>
              </div>
            </div>

            <div>
              <SectionTitle>📊 心跳速率判斷</SectionTitle>
              <div className="space-y-2">
                {hrData.ranges.map(r => (
                  <div key={r.label} className={`flex items-center justify-between px-4 py-3 rounded-2xl ${r.color}`}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{r.label}</span>
                      <AlertTag alert={r.alert} />
                    </div>
                    <span className="font-semibold text-sm">{r.range}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="font-semibold text-amber-800 text-sm mb-2">💡 注意事項</p>
              <ul className="space-y-1.5">
                {hrData.tips.map((t, i) => (
                  <li key={i} className="text-sm text-amber-700 flex gap-2">
                    <span className="shrink-0">•</span><span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── 呼吸 ── */}
        {tab === 'rr' && (
          <div className="space-y-6">
            <div className="bg-teal-50 border-2 border-teal-100 rounded-2xl p-5">
              <SectionTitle>🫁 如何計算呼吸次數</SectionTitle>
              <ol className="space-y-2">
                {rrData.howTo.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-teal-500 font-bold shrink-0">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 bg-white rounded-xl p-3 border border-teal-100">
                <p className="text-xs text-gray-500 text-center">胸部或腹部起伏一次（上+下）= 1 次呼吸</p>
                <p className="text-xs text-gray-400 text-center mt-1">建議計數完整的 60 秒，不要只算 15 或 30 秒</p>
              </div>
            </div>

            <div>
              <SectionTitle>📊 呼吸速率判斷</SectionTitle>
              <div className="space-y-2">
                {rrData.ranges.map(r => (
                  <div key={r.label} className={`flex items-center justify-between px-4 py-3 rounded-2xl ${r.color}`}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{r.label}</span>
                      <AlertTag alert={r.alert} />
                    </div>
                    <span className="font-semibold text-sm">{r.range}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle>🚨 呼吸費力的警示外觀</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rrData.warningSigns.map(w => (
                  <div key={w.sign} className="bg-red-50 border border-red-200 rounded-2xl p-3 flex gap-3">
                    <span className="text-red-400 shrink-0">⚠️</span>
                    <div>
                      <p className="font-bold text-red-700 text-sm">{w.sign}</p>
                      <p className="text-xs text-red-600 mt-0.5">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-red-500 mt-3 text-center font-semibold">出現任何一項 → 立即就醫，不要等待</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="font-semibold text-amber-800 text-sm mb-2">💡 注意事項</p>
              <ul className="space-y-1.5">
                {rrData.tips.map((t, i) => (
                  <li key={i} className="text-sm text-amber-700 flex gap-2">
                    <span className="shrink-0">•</span><span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── 血氧 ── */}
        {tab === 'spo2' && (
          <div className="space-y-6">
            <div className="bg-violet-50 border-2 border-violet-100 rounded-2xl p-4">
              <p className="text-sm text-violet-700 leading-relaxed">{spo2Data.intro}</p>
            </div>

            <div className="bg-violet-50 border-2 border-violet-100 rounded-2xl p-5">
              <SectionTitle>💍 如何使用血氧機</SectionTitle>
              <ol className="space-y-2">
                {spo2Data.howTo.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-violet-400 font-bold shrink-0">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <SectionTitle>📊 血氧數值判斷</SectionTitle>
              <div className="space-y-2">
                {spo2Data.ranges.map(r => (
                  <div key={r.label} className={`flex items-center justify-between px-4 py-3 rounded-2xl ${r.color}`}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{r.label}</span>
                      <AlertTag alert={r.alert} />
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{r.range}</p>
                      <p className="text-xs opacity-70">{r.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="font-semibold text-amber-800 text-sm mb-2">💡 注意事項</p>
              <ul className="space-y-1.5">
                {spo2Data.tips.map((t, i) => (
                  <li key={i} className="text-sm text-amber-700 flex gap-2">
                    <span className="shrink-0">•</span><span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── 意識 ── */}
        {tab === 'aware' && (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-2 border-indigo-100 rounded-2xl p-4">
              <p className="text-sm text-indigo-700 leading-relaxed">{awareData.intro}</p>
            </div>

            <div>
              <SectionTitle>👀 AVPU 意識評估（4 個等級）</SectionTitle>
              <div className="space-y-3">
                {awareData.levels.map(l => (
                  <div key={l.label} className={`border-2 rounded-2xl p-4 ${l.color}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{l.emoji}</span>
                      <div>
                        <p className={`font-bold text-sm ${l.textColor}`}>{l.label}</p>
                        {l.action === '撥打 119，立即急救' && (
                          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">緊急</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{l.desc}</p>
                    <p className={`text-xs font-semibold mt-2 ${l.textColor}`}>→ {l.action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle>🚩 意識異常的紅旗警訊</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {awareData.redFlags.map((f, i) => (
                  <div key={i} className="flex gap-2 items-start bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                    <span className="text-red-400 shrink-0 text-sm">🚩</span>
                    <p className="text-sm text-red-700">{f}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-red-500 mt-3 text-center font-semibold">出現任何一項 → 不要觀望，立即就醫</p>
            </div>
          </div>
        )}

        {/* ── 免責聲明 ── */}
        <div className="mt-10 bg-gray-50 border border-gray-200 rounded-2xl p-4 flex gap-3">
          <span className="text-xl shrink-0">⚠️</span>
          <p className="text-xs text-gray-500 leading-relaxed">
            本頁面數值僅供<strong>居家參考</strong>，非醫療診斷工具。每位幼兒狀況不同，
            若有任何疑慮請諮詢醫師。緊急狀況請撥打 <strong className="text-red-600">119</strong>。
          </p>
        </div>

        <div className="mt-6 text-center">
          <button onClick={() => navigate('home')} className="text-sm text-orange-500 hover:text-orange-700 underline">
            ← 返回首頁
          </button>
        </div>
      </div>
    </div>
  )
}
