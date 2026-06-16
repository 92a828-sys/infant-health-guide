import { useState } from 'react'

const navItems = [
  { id: 'home',        label: '首頁',      emoji: '🏠' },
  { id: 'growth',      label: '生長里程碑', emoji: '📏' },
  { id: 'symptoms',    label: '常見症狀',   emoji: '🌡️' },
  { id: 'vaccination', label: '疫苗接種',   emoji: '💉' },
  { id: 'dietary',     label: '飲食副食品', emoji: '🥣' },
  { id: 'emergency',   label: '緊急狀況',   emoji: '🚑' },
  { id: 'medication',  label: '用藥衛教',   emoji: '💊' },
]

export default function Navbar({ navigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (id) => {
    navigate(id)
    setMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-3xl">👶</span>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-bold text-orange-700">幼兒衛教專區</p>
              <p className="text-xs text-orange-400">0–3歲照護指南</p>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.slice(1).map(item => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:bg-orange-50 transition-colors"
            aria-label="選單"
          >
            <span className="text-xl select-none">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="xl:hidden py-3 pb-4 border-t border-orange-100 grid grid-cols-2 gap-2">
            {navItems.slice(1).map(item => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                  currentPage === item.id
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
