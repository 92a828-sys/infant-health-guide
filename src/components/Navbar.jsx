import { useState } from 'react'
import { useRole } from '../RoleContext'

const navItems = [
  { id: 'home',        label: '首頁',      emoji: '🏠' },
  { id: 'growth',      label: '生長里程碑', emoji: '📏' },
  { id: 'growth-chart', label: '生長曲線',  emoji: '📈' },
  { id: 'symptoms',    label: '常見症狀',   emoji: '🌡️' },
  { id: 'vaccination', label: '疫苗接種',   emoji: '💉' },
  { id: 'dietary',     label: '營養與餵食', emoji: '🥣' },
  { id: 'emergency',   label: '緊急狀況',   emoji: '🚑' },
  { id: 'medication',  label: '用藥衛教',   emoji: '💊' },
  { id: 'diseases',   label: '常見疾病',   emoji: '🏥' },
  { id: 'newborn-safety', label: '新生兒安全', emoji: '🛡️' },
  { id: 'home-safety', label: '居家安全',   emoji: '🧯' },
  { id: 'daily-care', label: '日常照護',   emoji: '🧴' },
  { id: 'parent-support', label: '親職支持', emoji: '💗' },
  { id: 'vitals',    label: '生命徵象',   emoji: '📊' },
  { id: 'early-learning', label: '早期學習', emoji: '🧠' },
  { id: 'caregiver', label: '托育專區',   emoji: '🧑‍🏫', caregiverOnly: true },
  { id: 'caregiver-professional', label: '托育專業法規', emoji: '📚', caregiverOnly: true },
]

function RoleSwitch({ role, setRole, compact }) {
  return (
    <div className={`flex items-center bg-morandi-secondary rounded-full p-1 ${compact ? 'text-xs' : 'text-sm'}`}>
      <button
        onClick={() => setRole('parent')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
          role === 'parent' ? 'bg-white text-morandi-primary shadow-sm' : 'text-morandi-primary-light'
        }`}
      >
        👨‍👩‍👧 家長版
      </button>
      <button
        onClick={() => setRole('caregiver')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
          role === 'caregiver' ? 'bg-white text-morandi-primary shadow-sm' : 'text-morandi-primary-light'
        }`}
      >
        🧑‍🏫 托育人員版
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
    <nav className="bg-white sticky top-0 z-50 border-b border-morandi-secondary shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
          >
            <span className="text-3xl">👶</span>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold tracking-[0.05em] text-morandi-primary">幼兒衛教專區</p>
              <p className="text-xs text-morandi-primary-light">0–3歲照護指南</p>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-1 overflow-x-auto">
            {visibleItems.slice(1).map(item => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  currentPage === item.id
                    ? 'bg-morandi-secondary text-morandi-primary'
                    : 'text-gray-600 hover:bg-morandi-secondary/60 hover:text-morandi-primary'
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:block">
              <RoleSwitch role={role} setRole={setRole} compact />
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden flex items-center justify-center w-10 h-10 rounded-2xl text-gray-600 hover:bg-morandi-secondary transition-colors"
              aria-label="選單"
            >
              <span className="text-xl select-none">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="xl:hidden py-3 pb-4 border-t border-morandi-secondary">
            <div className="sm:hidden mb-3 flex justify-center">
              <RoleSwitch role={role} setRole={setRole} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {visibleItems.slice(1).map(item => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                    currentPage === item.id
                      ? 'bg-morandi-secondary text-morandi-primary'
                      : 'text-gray-600 hover:bg-morandi-secondary/60 hover:text-morandi-primary'
                  }`}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
