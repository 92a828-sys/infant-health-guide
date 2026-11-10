import { useState } from 'react'
import { Baby, Syringe, Soup, ShieldCheck, Moon, ArrowRightCircle, Pencil, Info, Star } from 'lucide-react'
import AgePicker from '../components/AgePicker'
import { StatusBadge } from '../components/Alert'
import { buildGuide, MAX_MONTHS } from '../data/ageGuide'

const ICON = { strokeWidth: 2, 'aria-hidden': true }

// 六張主題卡片固定配色（分類色只區分主題，不代表警示）
const CARD_CAT = {
  development: 'bg-cat-mist-bg text-cat-mist-fg',
  vaccines:    'bg-cat-teal-bg text-cat-teal-fg',
  diet:        'bg-cat-sand-bg text-cat-sand-fg',
  safety:      'bg-cat-mauve-bg text-cat-mauve-fg',
  sleep:       'bg-cat-lav-bg text-cat-lav-fg',
  next:        'bg-cat-slate-bg text-cat-slate-fg',
}

function TopicCard({ kind, Icon, title, children, linkLabel = '看完整內容 →', onLink }) {
  return (
    <article className="bg-surface border border-border rounded-2xl p-5 flex flex-col">
      <h3 className="flex items-center gap-2.5 font-bold text-ink mb-3">
        <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${CARD_CAT[kind]}`}>
          <Icon className="w-5 h-5" {...ICON} />
        </span>
        {title}
      </h3>
      <div className="text-sm text-ink-muted leading-relaxed space-y-2 flex-1">{children}</div>
      <button type="button" onClick={onLink} className="self-start mt-4 text-sm font-semibold text-brand hover:underline underline-offset-4">
        {linkLabel}
      </button>
    </article>
  )
}

function Bullets({ items }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden="true" className="shrink-0">•</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

export default function AgeGuidePage({ navigate, initialMonths }) {
  const valid = Number.isInteger(initialMonths) && initialMonths >= 0 && initialMonths <= MAX_MONTHS
  // 月齡只存在這個頁面的 state，不寫入任何儲存空間
  const [months, setMonths] = useState(valid ? initialMonths : null)
  const [editing, setEditing] = useState(!valid)

  const choose = m => {
    setMonths(m)
    setEditing(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const guide = months == null ? null : buildGuide(months)

  return (
    <div>
      {/* 頁首：標題＋隨時更改月齡 */}
      <div className="bg-canvas border-b border-border py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold text-brand mb-2">依月齡探索</p>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-ink mb-4">
            {guide ? `寶寶 ${guide.ageText}：這個階段的重點` : '請先選擇孩子的月齡'}
          </h1>
          {guide && !editing && (
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-ink-muted">對應階段：{guide.segment.label}</span>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-1.5 text-brand font-semibold hover:underline underline-offset-4"
              >
                <Pencil className="w-4 h-4" {...ICON} />
                更改月齡
              </button>
            </div>
          )}
          {editing && (
            <div className="bg-surface border border-border rounded-2xl p-4 sm:p-5">
              <p className="font-semibold text-ink mb-3">孩子目前幾歲幾個月？</p>
              <AgePicker key={months ?? 'none'} initialMonths={months} onSubmit={choose} idPrefix="guide-age" />
              <p className="text-xs text-ink-muted mt-3">早產兒請使用矯正年齡</p>
            </div>
          )}
        </div>
      </div>

      {guide && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {/* 最重要的 3 件事 */}
          <section aria-labelledby="top3-title" className="bg-brand-soft rounded-2xl p-5 sm:p-6 mb-8">
            <h2 id="top3-title" className="flex items-center gap-2 font-bold text-brand text-lg mb-4">
              <Star className="w-5 h-5" {...ICON} />
              這個階段最重要的 3 件事
            </h2>
            <ol className="space-y-3">
              {guide.top3.map((t, i) => (
                <li key={i} className="flex gap-3 text-ink">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand text-on-brand text-sm font-bold shrink-0">{i + 1}</span>
                  <span className="leading-relaxed pt-0.5">{t}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* 六張主題卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TopicCard kind="development" Icon={Baby} title="發展重點" onLink={() => navigate('growth', guide.development.linkGroup)}>
              <p>生長里程碑（{guide.development.groupLabel}）的代表項目：</p>
              <Bullets items={guide.development.items.map(it => `${it.cat}：${it.text}`)} />
              <div className="pt-1 space-y-1.5">
                {guide.development.redFlags.map((t, i) => (
                  <p key={i} className="flex flex-wrap items-start gap-2">
                    <StatusBadge tone="danger">紅旗</StatusBadge>
                    <span className="flex-1 min-w-[12rem] text-ink">{t}</span>
                  </p>
                ))}
              </div>
            </TopicCard>

            <TopicCard kind="vaccines" Icon={Syringe} title="疫苗與健檢" onLink={() => navigate('vaccination', 'schedule')}>
              {guide.vaccines.current.map(v => (
                <p key={v.age}><span className="font-semibold text-ink">{v.age}：</span>{v.vaccines.join('、')}</p>
              ))}
              {guide.vaccines.upcoming.map(v => (
                <p key={v.age}><span className="font-semibold text-ink">接下來（{v.age}）：</span>{v.vaccines.join('、')}</p>
              ))}
              {guide.vaccines.checkups.map(c => (
                <p key={c.stage}><span className="font-semibold text-ink">預防保健（{c.stage}）：</span>{c.items}</p>
              ))}
            </TopicCard>

            <TopicCard kind="diet" Icon={Soup} title="營養餵食" onLink={() => navigate('dietary', guide.diet.tab)}>
              <p>{guide.diet.text}</p>
            </TopicCard>

            <TopicCard
              kind="safety"
              Icon={ShieldCheck}
              title="安全提醒"
              onLink={() => (guide.safety.tab ? navigate(guide.safety.page, guide.safety.tab) : navigate(guide.safety.page))}
            >
              <Bullets items={guide.safety.tips} />
            </TopicCard>

            <TopicCard kind="sleep" Icon={Moon} title="睡眠作息" onLink={() => navigate('daily-care', 'sleep')}>
              <p><span className="font-semibold text-ink">{guide.sleep.age}：</span>{guide.sleep.hours}</p>
              <p>{guide.sleep.note}</p>
            </TopicCard>

            <TopicCard
              kind="next"
              Icon={ArrowRightCircle}
              title={`下個階段預告：${guide.next.label}`}
              linkLabel={guide.next.months != null ? `看 ${guide.next.label} 的重點 →` : '看完整內容 →'}
              onLink={() => (guide.next.months != null ? choose(guide.next.months) : navigate('growth', guide.next.linkGroup))}
            >
              <p>接下來可能會看到：</p>
              <Bullets items={guide.next.items.map(it => `${it.cat}：${it.text}`)} />
            </TopicCard>
          </div>

          {/* 頁尾 */}
          <div className="mt-10 space-y-3">
            <p className="text-sm text-ink-muted text-center">其他主題可以從上方選單慢慢瀏覽</p>
            <p className="flex items-start gap-2 bg-surface-muted border border-border rounded-2xl p-4 text-xs text-ink-muted leading-relaxed">
              <Info className="w-4 h-4 shrink-0 mt-0.5" {...ICON} />
              本頁依月齡整理一般衛教資訊，供參考使用，不能取代醫師或專業人員的個別評估
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
