import { useState } from 'react'
import { Baby, Menu, X, Users, GraduationCap } from 'lucide-react'
import { useRole } from '../RoleContext'
import { pageIcons } from '../pageIcons'

const navItems = [
  { id: 'home',        label: '首頁' },
  { id: 'growth',      label: '生長里程碑' },
  { id: 'growth-chart', label: '生長曲線' },
  { id: 'symptoms',    label: '常見症狀' },
  { id: 'vaccination', label: '疫苗接種' },
  { id: 'dietary',     label: '營養與餵食' },
  { id: 'emergency',   label: '緊急狀況' },
  { id: 'medication',  label: '用藥衛教' },
  { id: 'diseases',   label: '常見疾病' },
  { id: 'newborn-safety', label: '新生兒安全' },
  { id: 'home-safety', label: '居家安全' },
  { id: 'daily-care', label: '日常照護' },
  { id: 'parent-support', label: '親職支持' },
  { id: 'vitals',    label: '生命徵象' },
  { id: 'early-learning', label: '早期學習' },
  { id: 'caregiver', label: '托育專區', caregiverOnly: true },
  { id: 'caregiver-professional', label: '托育專業法規', caregiverOnly: true },
]

function RoleSwitch({ role, setRole, compact }) {
  return (
    <div className={`flex items-center bg-brand-soft rounded-full p-1 ${compact ? 'text-xs' : 'text-sm'}`}>
      <button
        onClick={() => setRole('parent')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
          role === 'parent' ? 'bg-surface text-brand shadow-sm' : 'text-ink-muted hover:text-brand'
        }`}
      >
        <Users className="w-4 h-4" strokeWidth={2} aria-hidden="true" /> 家長版
      </button>
      <button
        onClick={() => setRole('caregiver')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
          role === 'caregiver' ? 'bg-surface text-brand shadow-sm' : 'text-ink-muted hover:text-brand'
        }`}
      >
        <GraduationCap className="w-4 h-4" strokeWidth={2} aria-hidden="true" /> 托育人員版
      </button>
    </div>
  )
}

export default function Navbar({ navigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { role, setRole } = useRole()

  const visibleItems = navItems.filter(item => role === 'caregiver' || !item.caregiverOnly)

  const go = (id) => {
    navigate(id)
    setMenuOpen(false)
  }

  return (
    <nav className="bg-surface/80 backdrop-blur-[10px] sticky top-0 z-50 border-b border-border shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-soft text-brand">
              <Baby className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
            </span>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold tracking-[0.05em] text-brand">幼兒衛教專區</p>
              <p className="text-xs text-ink-muted">0–3歲照護指南</p>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-1 overflow-x-auto">
            {visibleItems.slice(1).map(item => {
              const Icon = pageIcons[item.id]
              return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  currentPage === item.id
                    ? 'bg-brand-soft text-brand'
                    : 'text-ink-muted hover:bg-brand-soft/60 hover:text-brand'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:block">
              <RoleSwitch role={role} setRole={setRole} compact />
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden flex items-center justify-center w-10 h-10 rounded-2xl text-ink-muted hover:bg-brand-soft hover:text-brand transition-colors"
              aria-label="選單"
              aria-expanded={menuOpen}
            >
              {menuOpen
                ? <X className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                : <Menu className="w-5 h-5" strokeWidth={2} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="xl:hidden py-3 pb-4 border-t border-border">
            <div className="sm:hidden mb-3 flex justify-center">
              <RoleSwitch role={role} setRole={setRole} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {visibleItems.slice(1).map(item => {
                const Icon = pageIcons[item.id]
                return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                    currentPage === item.id
                      ? 'bg-brand-soft text-brand'
                      : 'text-ink-muted hover:bg-brand-soft/60 hover:text-brand'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
