const items = [
  { label: '119 緊急醫療', tel: '119', emoji: '🚑' },
  { label: '113 保護專線', tel: '113', emoji: '🛡️' },
  { label: '1922 防疫／腸病毒諮詢', tel: '1922', emoji: '🦠' },
  { label: '0800-870-870 孕產婦關懷', tel: '0800870870', emoji: '🤰' },
]

export default function EmergencyBar({ navigate }) {
  return (
    <div className="bg-red-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center gap-2 overflow-x-auto text-xs sm:text-sm">
        <span className="font-bold shrink-0 hidden sm:inline">🚨 緊急資源</span>
        {items.map(it => (
          <a
            key={it.tel}
            href={`tel:${it.tel}`}
            className="flex items-center gap-1 shrink-0 bg-red-500/60 hover:bg-red-500 px-2.5 py-1 rounded-full transition-colors whitespace-nowrap"
          >
            <span>{it.emoji}</span>
            <span>{it.label}</span>
          </a>
        ))}
        <button
          onClick={() => navigate('parent-support', 'family')}
          className="flex items-center gap-1 shrink-0 bg-red-500/60 hover:bg-red-500 px-2.5 py-1 rounded-full transition-colors whitespace-nowrap"
        >
          <span>🧩</span>
          <span>兒童發展通報轉介</span>
        </button>
      </div>
    </div>
  )
}
