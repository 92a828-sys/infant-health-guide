import { useMemo, useState } from 'react'
import { measurements, lmsZ, zToPercentile } from '../data/whoGrowthData'
import { ToneIcon } from '../components/Alert'
import { toneClasses } from '../components/alertTones'

function correctedAgeMonths(chronoMonths, gestWeeks) {
  if (!gestWeeks || gestWeeks >= 37) return chronoMonths
  const weeksEarly = 40 - gestWeeks
  const monthsEarly = weeksEarly / 4.345
  const corrected = chronoMonths - monthsEarly
  return Math.max(0, corrected)
}

function percentileZone(p) {
  if (p < 3) return { key: 'low', label: '低於第3百分位', tone: 'danger' }
  if (p < 15) return { key: 'low2', label: '偏低區間（第3～15百分位）', tone: 'warning' }
  if (p <= 85) return { key: 'mid', label: '正常範圍（第15～85百分位）', tone: 'success' }
  if (p <= 97) return { key: 'high2', label: '偏高區間（第85～97百分位）', tone: 'warning' }
  return { key: 'high', label: '高於第97百分位', tone: 'danger' }
}

export default function GrowthChartPage({ navigate }) {
  const [sex, setSex] = useState('boys')
  const [ageMonths, setAgeMonths] = useState(6)
  const [metric, setMetric] = useState('weight')
  const [value, setValue] = useState('')
  const [isPreterm, setIsPreterm] = useState(false)
  const [gestWeeks, setGestWeeks] = useState(32)

  const effectiveAge = isPreterm ? correctedAgeMonths(ageMonths, gestWeeks) : ageMonths
  const monthIndex = Math.min(36, Math.max(0, Math.round(effectiveAge)))

  const result = useMemo(() => {
    const num = parseFloat(value)
    if (!num || num <= 0) return null
    const table = measurements[metric][sex]
    const lms = table[monthIndex]
    const z = lmsZ(num, lms)
    const p = Math.min(99.9, Math.max(0.1, zToPercentile(z)))
    return { p, z }
  }, [value, metric, sex, monthIndex])

  const zone = result ? percentileZone(result.p) : null
  const unit = measurements[metric].unit

  return (
    <div>
      <div className="bg-gradient-to-br from-lime-50 to-emerald-100 py-12 px-6 text-center">
        <div className="text-6xl mb-4">📈</div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-2">生長曲線知多少</h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          看懂體重、身高、頭圍百分位，並試試線上估算小工具
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Source note */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex gap-3">
          <span className="text-xl shrink-0">📋</span>
          <p className="text-sm text-emerald-800 leading-relaxed">
            本頁百分位數據來源：<strong>WHO Child Growth Standards（世界衛生組織，2006年）</strong>官方 LMS 參數表。
            計算結果僅供家長自行參考，不能取代兒童健康手冊的正式生長曲線紀錄與醫師評估。
          </p>
        </div>

        {/* Teaching section */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📖</span> 什麼是「百分位」？
          </h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              生長曲線上的「第50百分位」代表：在同年齡、同性別的孩子中，有50%的孩子數值比他小、50%比他大——也就是「中間值」，不是「及格分數」。
            </p>
            <p>
              同樣道理，「第3百分位」表示100個同齡孩子中，大約只有3個孩子比他更輕/更矮/頭圍更小。單一次落在第3～97百分位之間都屬於統計上的正常範圍，
              <strong>重點是孩子自己的曲線走勢是否平穩，而不是絕對名次</strong>。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
                <p className="font-semibold text-sky-700 text-sm mb-1">⚖️ 體重</p>
                <p className="text-xs text-sky-600">反映近期營養狀況，短期生病、食慾差會較快反映在體重上</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
                <p className="font-semibold text-purple-700 text-sm mb-1">📏 身高／身長</p>
                <p className="text-xs text-purple-600">反映長期生長狀況，變化較慢，受基因影響也較大</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                <p className="font-semibold text-orange-700 text-sm mb-1">🧠 頭圍</p>
                <p className="text-xs text-orange-600">反映腦部發育速度，0～2歲是追蹤重點期</p>
              </div>
            </div>
            <p>
              建議家長仍以<strong>兒童健康手冊上的正式生長曲線圖</strong>長期描點記錄，能看出走勢；若單次量測偏離原本曲線兩個區間以上（例如從50百分位掉到15百分位以下），或連續下降，應主動告知醫師。
            </p>
          </div>
        </section>

        {/* Premature / special needs block */}
        <section className="bg-white border-2 border-violet-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🐣</span> 早產兒／特殊需求兒童：追蹤重點
          </h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              早產兒（妊娠週數 &lt; 37週）在對照生長曲線與發展里程碑時，應使用<strong>「矯正年齡」</strong>而非實際月齡，
              直到約2歲（極早產兒可到3歲）：
            </p>
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 text-violet-800 text-xs sm:text-sm">
              矯正年齡 ＝ 實際月齡 －（40週－出生時妊娠週數）÷ 4.345
            </div>
            <p>
              下方計算器已內建矯正年齡選項：勾選「早產兒」並輸入出生時妊娠週數，系統會自動換算矯正年齡後再對照百分位。
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-gray-600">
              <li>早產兒生長與發展常較足月兒慢，這是預期中的現象，不需要與足月兒直接比較</li>
              <li>建議定期回小兒科／早產兒追蹤門診複診，依醫囑安排神經發展評估</li>
              <li>有特殊需求（如唐氏症、腦性麻痺等）的孩子，其生長曲線可能需採用專用的疾病別生長曲線，請與主治醫師確認</li>
              <li>若對發展有疑慮，可攜带兒童健康手冊至兒童發展聯合評估中心或早療通報轉介中心諮詢</li>
            </ul>
          </div>
        </section>

        {/* Calculator */}
        <section className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🧮</span> 線上生長曲線估算器
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">性別</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSex('boys')}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${sex === 'boys' ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-gray-600 border-gray-200'}`}
                >
                  👦 男孩
                </button>
                <button
                  onClick={() => setSex('girls')}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${sex === 'girls' ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-600 border-gray-200'}`}
                >
                  👧 女孩
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">量測項目</label>
              <div className="flex gap-2">
                {Object.entries(measurements).map(([key, m]) => (
                  <button
                    key={key}
                    onClick={() => setMetric(key)}
                    className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-colors ${metric === key ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-white text-gray-600 border-gray-200'}`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">實際月齡（0～36個月）</label>
              <input
                type="number" min="0" max="36" value={ageMonths}
                onChange={e => setAgeMonths(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">
                {metric === 'weight' ? '體重（公斤）' : metric === 'height' ? '身高／身長（公分）' : '頭圍（公分）'}
              </label>
              <input
                type="number" step="0.01" value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={`輸入${unit}`}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="bg-white/70 border border-teal-100 rounded-2xl p-3 mb-4">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={isPreterm} onChange={e => setIsPreterm(e.target.checked)} />
              這是早產兒，使用矯正年齡計算
            </label>
            {isPreterm && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-gray-500 shrink-0">出生時妊娠週數</span>
                <input
                  type="number" min="22" max="36" value={gestWeeks}
                  onChange={e => setGestWeeks(Number(e.target.value))}
                  className="w-20 border border-gray-200 rounded-xl px-2 py-1 text-sm"
                />
                <span className="text-xs text-gray-500">
                  → 矯正月齡約 {effectiveAge.toFixed(1)} 個月
                </span>
              </div>
            )}
          </div>

          {result && zone && (
            <div className={`border-2 rounded-2xl p-5 ${toneClasses(zone.tone)}`}>
              <p className="text-sm mb-1">估算結果</p>
              <p className="text-2xl font-bold">
                約第 {result.p.toFixed(0)} 百分位
              </p>
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold mt-1">
                <ToneIcon tone={zone.tone} className="w-4 h-4" />
                {zone.label}
              </p>

              {/* percentile bar */}
              <div className="relative h-3 bg-surface rounded-full mt-4 mb-1">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-800 border-2 border-white shadow"
                  style={{ left: `calc(${Math.min(100, Math.max(0, result.p))}% - 6px)` }}
                />
              </div>
              <div className="flex justify-between text-[10px] opacity-80">
                <span>P3</span><span>P15</span><span>P50</span><span>P85</span><span>P97</span>
              </div>

              {(zone.key === 'low' || zone.key === 'high') && (
                <p className="text-xs mt-3 border-t border-danger-border/50 pt-3">
                  單次量測落在此區間不代表異常，但建議攜帶兒童健康手冊回診，請兒科醫師搭配整體生長曲線走勢評估。
                </p>
              )}
            </div>
          )}
        </section>

        {/* Related links */}
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
            onClick={() => navigate('dietary')}
            className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left hover:bg-amber-100 transition-colors"
          >
            <span className="text-2xl">🥣</span>
            <div>
              <p className="font-semibold text-amber-800 text-sm">飲食與副食品</p>
              <p className="text-xs text-amber-600">母乳、配方奶與副食品添加原則</p>
            </div>
            <span className="ml-auto text-amber-400">→</span>
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
