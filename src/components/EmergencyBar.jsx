import { useEffect, useRef, useState } from 'react'
import { Phone, LifeBuoy, ChevronDown } from 'lucide-react'

// 119 為唯一實心按鈕；其餘專線為純文字連結
const hotlines = [
  { label: '113 保護專線', tel: '113' },
  { label: '1922 防疫／腸病毒諮詢', tel: '1922' },
  { label: '0800-870-870 孕產婦關懷', tel: '0800870870' },
]

const linkClass =
  'text-ink-muted hover:underline underline-offset-4 whitespace-nowrap transition-colors'

export default function EmergencyBar({ navigate }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // 點擊外部或按 Esc 關閉選單
  useEffect(() => {
    if (!open) return
    const onClick = e => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false) }
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const goReferral = () => {
    setOpen(false)
    navigate('parent-support', 'family')
  }

  return (
    <div className="bg-danger-bg border-b border-danger-border text-sm">
      <div className="max-w-6xl mx-auto px-4 h-11 flex items-center gap-4">
        {/* 標題（手機版隱藏，只留 119 與選單） */}
        <p className="hidden sm:flex items-center gap-1.5 font-semibold text-danger-fg whitespace-nowrap shrink-0">
          <LifeBuoy className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          緊急與求助資源
        </p>

        {/* 119：唯一實心按鈕 */}
        <a
          href="tel:119"
          className="inline-flex items-center gap-1.5 bg-danger-fg text-danger-bg font-bold px-3 py-1 rounded-full whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <Phone className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          119 緊急救護
        </a>

        {/* 寬螢幕：其他專線直接列出 */}
        <nav aria-label="其他求助專線" className="hidden lg:flex items-center gap-5 min-w-0">
          {hotlines.map(h => (
            <a key={h.tel} href={`tel:${h.tel}`} className={linkClass}>{h.label}</a>
          ))}
          <button type="button" onClick={goReferral} className={linkClass}>兒童發展通報轉介</button>
        </nav>

        {/* 窄螢幕：收進展開選單 */}
        <div ref={menuRef} className="relative ml-auto lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="emergency-more"
            className="inline-flex items-center gap-1 text-ink-muted hover:underline underline-offset-4 whitespace-nowrap"
          >
            其他求助專線
            <ChevronDown
              className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
          {open && (
            <div
              id="emergency-more"
              className="absolute right-0 top-full mt-2 z-40 w-64 bg-surface border border-danger-border rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] py-2"
            >
              {hotlines.map(h => (
                <a
                  key={h.tel}
                  href={`tel:${h.tel}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-ink-muted hover:underline underline-offset-4"
                >
                  {h.label}
                </a>
              ))}
              <button
                type="button"
                onClick={goReferral}
                className="block w-full text-left px-4 py-2.5 text-ink-muted hover:underline underline-offset-4"
              >
                兒童發展通報轉介
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
