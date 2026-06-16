const links = [
  { id: 'growth',      label: '生長發育里程碑', emoji: '📏' },
  { id: 'symptoms',    label: '常見症狀處理',   emoji: '🌡️' },
  { id: 'vaccination', label: '疫苗接種時程',   emoji: '💉' },
  { id: 'dietary',     label: '飲食與副食品',   emoji: '🥣' },
  { id: 'emergency',   label: '緊急狀況判斷',   emoji: '🚑' },
  { id: 'medication',  label: '用藥衛教',       emoji: '💊' },
]

export default function Footer({ navigate }) {
  return (
    <footer className="bg-amber-900 text-amber-100 pt-12 pb-6 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">👶</span>
              <div>
                <p className="font-bold text-white text-lg leading-tight">幼兒衛教專區</p>
                <p className="text-xs text-amber-300">0–3歲照護指南</p>
              </div>
            </div>
            <p className="text-sm text-amber-300 leading-relaxed">
              專為新手爸媽與托育人員設計，提供實用的幼兒健康照護參考資訊。
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">衛教主題</h3>
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
              {links.map(l => (
                <button
                  key={l.id}
                  onClick={() => navigate(l.id)}
                  className="text-left text-sm text-amber-300 hover:text-white transition-colors"
                >
                  {l.emoji} {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Emergency contacts */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">緊急聯絡</h3>
            <div className="space-y-2.5">
              {[
                { num: '119', desc: '緊急醫療救護', emoji: '🚑', color: 'text-red-300' },
                { num: '1922', desc: '疾管署防疫專線', emoji: '☎️', color: 'text-blue-300' },
                { num: '1966', desc: '長期照顧服務', emoji: '📞', color: 'text-green-300' },
              ].map(c => (
                <div key={c.num} className="flex items-center gap-2.5">
                  <span className={`text-xl ${c.color}`}>{c.emoji}</span>
                  <div>
                    <p className="font-bold text-white text-sm">{c.num}</p>
                    <p className="text-xs text-amber-400">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 pt-6 text-center space-y-2">
          <p className="text-xs text-amber-400">
            ⚠️ 本網站資訊僅供衛教參考，不得作為醫療診斷依據。若有健康疑慮，請諮詢合格醫師。
          </p>
          <p className="text-xs text-amber-600">
            © 2025 幼兒衛教專區 · 內容參考：衛生福利部、疾病管制署、台灣兒科醫學會
          </p>
        </div>
      </div>
    </footer>
  )
}
