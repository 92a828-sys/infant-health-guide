import { useCallback, useEffect, useRef, useState } from 'react'
import { Baby, Menu, X, ChevronDown, CalendarHeart } from 'lucide-react'
import { pageIcons } from '../pageIcons'
import { navGroups, groupOfPage } from '../navGroups'
import { useDismiss } from '../useDismiss'

const ICON = { strokeWidth: 2, 'aria-hidden': true }

// 分組按鈕：目前頁面所屬分組 → brand-soft 底、加粗、品牌色；其餘 ink-muted
function groupBtnClass(active) {
  return `inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
    active
      ? 'bg-brand-soft text-brand font-bold'
      : 'text-ink-muted font-medium hover:bg-brand-soft/60 hover:text-brand'
  }`
}

function Logo({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0" aria-label="幼兒衛教專區 首頁">
      <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-soft text-brand">
        <Baby className="w-6 h-6" {...ICON} />
      </span>
      <span className="leading-tight text-left">
        <span className="block text-sm font-semibold tracking-[0.05em] text-brand">幼兒衛教專區</span>
        <span className="block text-xs text-ink-muted">0–3歲照護指南</span>
      </span>
    </button>
  )
}

// ── 電腦版下拉選單 ───────────────────────────────────────────────
function NavDropdown({ group, active, currentPage, onGo, align = 'left' }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const triggerRef = useRef(null)
  const itemRefs = useRef([])
  const hoverTimer = useRef(null)
  const pointerType = useRef(null)
  const menuId = `nav-menu-${group.id}`

  const close = useCallback(() => setOpen(false), [])
  const focusTrigger = useCallback(() => triggerRef.current?.focus(), [])
  useDismiss(wrapRef, open, close, focusTrigger)
  useEffect(() => () => clearTimeout(hoverTimer.current), [])

  const focusItem = i => {
    const items = itemRefs.current.filter(Boolean)
    items[(i + items.length) % items.length]?.focus()
  }
  const openAndFocus = i => {
    setOpen(true)
    requestAnimationFrame(() => focusItem(i))
  }

  const onTriggerKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); openAndFocus(0) }
    if (e.key === 'ArrowUp') { e.preventDefault(); openAndFocus(-1) }
  }
  const onItemKey = (e, i) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); focusItem(i + 1) }
    if (e.key === 'ArrowUp') { e.preventDefault(); focusItem(i - 1) }
    if (e.key === 'Home') { e.preventDefault(); focusItem(0) }
    if (e.key === 'End') { e.preventDefault(); focusItem(-1) }
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      // 滑鼠：hover 展開；觸控與鍵盤：點擊切換
      onPointerEnter={e => { if (e.pointerType === 'mouse') { clearTimeout(hoverTimer.current); setOpen(true) } }}
      onPointerLeave={e => { if (e.pointerType === 'mouse') hoverTimer.current = setTimeout(close, 150) }}
      onBlur={e => { if (!wrapRef.current?.contains(e.relatedTarget)) close() }}
    >
      <button
        ref={triggerRef}
        type="button"
        onPointerDown={e => { pointerType.current = e.pointerType }}
        onClick={() => {
          // 滑鼠 hover 時已展開，點擊不應把它關掉
          if (pointerType.current === 'mouse') setOpen(true)
          else setOpen(o => !o)
          pointerType.current = null
        }}
        onKeyDown={onTriggerKey}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        className={groupBtnClass(active)}
      >
        <group.Icon className="w-4 h-4" {...ICON} />
        {group.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} {...ICON} />
      </button>

      {open && (
        // pt-2 讓滑鼠從按鈕移到面板時不會中斷 hover
        <div className={`absolute top-full pt-2 z-50 ${align === 'right' ? 'right-0' : 'left-0'}`}>
          <ul id={menuId} className="w-80 bg-surface border border-border rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-2">
            {group.items.map((it, i) => {
              const Icon = pageIcons[it.id]
              const current = currentPage === it.id
              return (
                <li key={it.id}>
                  <button
                    ref={el => { itemRefs.current[i] = el }}
                    type="button"
                    onClick={() => { close(); onGo(it.id) }}
                    onKeyDown={e => onItemKey(e, i)}
                    aria-current={current ? 'page' : undefined}
                    className={`w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                      current ? 'bg-brand-soft' : 'hover:bg-surface-muted focus:bg-surface-muted'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${current ? 'text-brand' : 'text-ink-muted'}`} {...ICON} />
                    <span className="min-w-0">
                      <span className={`block text-sm ${current ? 'font-bold text-brand' : 'font-semibold text-ink'}`}>{it.label}</span>
                      <span className="block text-xs text-ink-muted leading-relaxed">{it.desc}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

// ── 平板／手機全螢幕選單 ──────────────────────────────────────────
function MobilePanel({ currentPage, onGo, onAgeExplore, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      id="mobile-nav-panel"
      role="dialog"
      aria-modal="true"
      aria-label="網站選單"
      className="fixed inset-0 z-[60] bg-canvas flex flex-col lg:hidden"
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border bg-surface shrink-0">
        <span className="text-base font-semibold text-ink">網站選單</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3 h-10 rounded-2xl text-ink-muted hover:bg-brand-soft hover:text-brand transition-colors"
        >
          <X className="w-5 h-5" {...ICON} />
          關閉
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-5">
        <button
          type="button"
          onClick={onAgeExplore}
          className="w-full inline-flex items-center justify-center gap-2 bg-brand text-on-brand font-semibold rounded-2xl py-3 mb-6 hover:opacity-90 transition-opacity"
        >
          <CalendarHeart className="w-5 h-5" {...ICON} />
          依月齡探索
        </button>

        {navGroups.map(g => (
          <section key={g.id} className="mb-6" aria-labelledby={`mnav-${g.id}`}>
            <h2 id={`mnav-${g.id}`} className="flex items-center gap-1.5 text-sm font-bold text-ink mb-3">
              <g.Icon className="w-4 h-4 text-brand" {...ICON} />
              {g.label}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {g.items.map(it => {
                const Icon = pageIcons[it.id]
                const current = currentPage === it.id
                return (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => onGo(it.id)}
                    aria-current={current ? 'page' : undefined}
                    className={`min-w-0 flex flex-col items-start gap-2 rounded-2xl border p-3 text-left transition-colors ${
                      current
                        ? 'bg-brand-soft border-brand text-brand'
                        : 'bg-surface border-border text-ink hover:bg-surface-muted'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${current ? 'text-brand' : 'text-ink-muted'}`} {...ICON} />
                    <span className={`text-sm ${current ? 'font-bold' : 'font-semibold'}`}>{it.label}</span>
                    <span className="hidden sm:block text-xs text-ink-muted leading-relaxed">{it.desc}</span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

// ── 導覽列 ────────────────────────────────────────────────────────
export default function Navbar({ navigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeGroup = groupOfPage(currentPage)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const go = id => {
    setMenuOpen(false)
    navigate(id)
  }

  // 「依月齡探索」：帶到首頁 hero 的月齡選擇
  const ageExplore = () => {
    setMenuOpen(false)
    if (currentPage === 'home') {
      document.getElementById('age-picker')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('home', 'age-picker')
    }
  }

  return (
    <>
      <nav aria-label="主選單" className="bg-surface/80 backdrop-blur-[10px] sticky top-0 z-50 border-b border-border shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-3">
            <Logo onClick={() => go('home')} />

            {/* 電腦版：一行顯示 */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                type="button"
                onClick={ageExplore}
                className="inline-flex items-center gap-1.5 bg-brand text-on-brand px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap hover:opacity-90 transition-opacity mr-2"
              >
                <CalendarHeart className="w-4 h-4" {...ICON} />
                依月齡探索
              </button>
              {navGroups.map((g, i) => g.direct ? (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => go(g.direct)}
                  aria-current={currentPage === g.direct ? 'page' : undefined}
                  className={groupBtnClass(activeGroup === g.id)}
                >
                  <g.Icon className="w-4 h-4" {...ICON} />
                  {g.label}
                </button>
              ) : (
                <NavDropdown
                  key={g.id}
                  group={g}
                  active={activeGroup === g.id}
                  currentPage={currentPage}
                  onGo={go}
                  // 靠右的分組往左展開，避免超出視窗
                  align={i >= navGroups.length - 2 ? 'right' : 'left'}
                />
              ))}
            </div>

            {/* 平板／手機：選單按鈕 */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 h-10 rounded-2xl text-ink-muted hover:bg-brand-soft hover:text-brand transition-colors"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
            >
              <Menu className="w-5 h-5" {...ICON} />
              選單
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <MobilePanel currentPage={currentPage} onGo={go} onAgeExplore={ageExplore} onClose={closeMenu} />
      )}
    </>
  )
}
