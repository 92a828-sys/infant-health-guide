import { Baby, Ambulance, Phone, PhoneCall, Info, CalendarDays } from 'lucide-react'
import { pageIcons } from '../pageIcons'
import { navGroups } from '../navGroups'

// 重大內容更新時請手動更新此日期
const SITE_UPDATED = '2026年7月'

const contacts = [
  { num: '119',  desc: '緊急醫療救護',   Icon: Ambulance, color: 'text-danger-fg' },
  { num: '1922', desc: '疾管署防疫專線', Icon: PhoneCall, color: 'text-brand' },
  { num: '1966', desc: '長期照顧服務',   Icon: Phone,     color: 'text-brand' },
]

export default function Footer({ navigate }) {
  return (
    <footer className="bg-surface-muted border-t border-border text-ink pt-12 pb-6 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-soft text-brand">
                <Baby className="w-7 h-7" strokeWidth={2} aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold tracking-[0.05em] text-ink text-lg leading-tight">幼兒衛教專區</p>
                <p className="text-xs text-ink-muted">0–3歲照護指南</p>
              </div>
            </div>
            <p className="text-sm text-ink-muted leading-[1.75]">
              專為新手爸媽設計，由護理師整理實用的幼兒健康照護參考資訊。
            </p>
          </div>

          {/* 衛教主題：依導覽分組列出（資料來自 navGroups） */}
          <nav aria-label="衛教主題" className="md:col-span-2">
            <h3 className="text-sm font-semibold tracking-[0.05em] text-ink mb-3 uppercase">衛教主題</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              {navGroups.map(g => (
                <div key={g.id} className="min-w-0">
                  <p className="text-xs font-bold text-ink mb-1.5">{g.label}</p>
                  <ul className="space-y-1">
                    {g.items.map(it => {
                      const Icon = pageIcons[it.id]
                      return (
                        <li key={it.id}>
                          <button
                            onClick={() => navigate(it.id)}
                            className="flex items-center gap-1.5 text-left text-sm text-ink-muted hover:text-brand transition-colors"
                          >
                            <Icon className="w-4 h-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                            {it.label}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* Emergency contacts */}
          <div>
            <h3 className="text-sm font-semibold tracking-[0.05em] text-ink mb-3 uppercase">緊急聯絡</h3>
            <div className="space-y-2.5">
              {contacts.map(c => (
                <a key={c.num} href={`tel:${c.num}`} className="flex items-center gap-2.5 group">
                  <c.Icon className={`w-5 h-5 shrink-0 ${c.color}`} strokeWidth={2} aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink text-sm group-hover:text-brand">{c.num}</p>
                    <p className="text-xs text-ink-muted">{c.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center space-y-2">
          <p className="text-xs text-ink-muted flex items-start justify-center gap-1.5">
            <Info className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
            <span>本網站資訊僅供衛教參考，不得作為醫療診斷依據。若有健康疑慮，請諮詢合格醫師。</span>
          </p>
          <p className="text-xs text-ink-muted flex items-start justify-center gap-1.5">
            <CalendarDays className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
            <span>內容由護理師整理，各頁面來源標註區可查看該主題參考資料；本站最後整理日期：{SITE_UPDATED}</span>
          </p>
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} 幼兒衛教專區 · 內容參考：衛生福利部、疾病管制署、台灣兒科醫學會
          </p>
        </div>
      </div>
    </footer>
  )
}
