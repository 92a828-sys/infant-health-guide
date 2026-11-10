import { useCallback, useRef, useState } from 'react'
import { Phone, PhoneCall } from 'lucide-react'
import { useDismiss } from '../useDismiss'
import { emergencyPage } from '../navGroups'

// 「其他求助專線」選單內容
const hotlines = [
  { label: '113 保護專線', tel: '113' },
  { label: '1922 防疫／腸病毒諮詢', tel: '1922' },
  { label: '0800-870-870 孕產婦關懷', tel: '0800870870' },
]

const ICON = { strokeWidth: 2, 'aria-hidden': true }
const textLink = 'text-ink-muted hover:underline underline-offset-4 whitespace-nowrap'

export default function EmergencyBar({ navigate }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const triggerRef = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  const focusTrigger = useCallback(() => triggerRef.current?.focus(), [])
  useDismiss(menuRef, open, close, focusTrigger)

  const goReferral = () => {
    setOpen(false)
    navigate('parent-support', 'family')
  }

  return (
    <div className="bg-danger-bg border-b border-danger-border text-xs sm:text-sm">
      {/* 三個項目在任何寬度都維持一行；窄螢幕時「其他求助專線」縮成圖示按鈕 */}
      <div className="max-w-6xl mx-auto px-4 h-11 flex items-center gap-3 sm:gap-5">
        <a
          href="tel:119"
          className="inline-flex items-center gap-1.5 bg-danger-fg text-danger-bg font-bold px-3 py-1 rounded-full whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <Phone className="w-4 h-4" {...ICON} />
          119 緊急救護
        </a>

        <button type="button" onClick={() => navigate(emergencyPage.id)} className={`${textLink} shrink-0`}>
          急救處理指引 →
        </button>

        <div ref={menuRef} className="relative ml-auto shrink-0">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="emergency-more"
            aria-label="其他求助專線"
            className="inline-flex items-center justify-center text-ink-muted hover:underline underline-offset-4 whitespace-nowrap max-sm:w-8 max-sm:h-8 max-sm:rounded-full max-sm:border max-sm:border-danger-border max-sm:hover:bg-surface"
          >
            <PhoneCall className="w-4 h-4 sm:hidden" {...ICON} />
            <span className="hidden sm:inline">其他求助專線 →</span>
          </button>
          {open && (
            <div
              id="emergency-more"
              className="absolute right-0 top-full mt-2 z-[55] w-64 max-w-[calc(100vw-2rem)] bg-surface border border-danger-border rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] py-2 text-sm"
            >
              {hotlines.map(h => (
                <a
                  key={h.tel}
                  href={`tel:${h.tel}`}
                  onClick={close}
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
