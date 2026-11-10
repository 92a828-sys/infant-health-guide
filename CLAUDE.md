# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

An infant/toddler (0–3) health guide (嬰幼兒健康指南) for Taiwanese parents, compiled by a nurse (護理師整理). The site is parent-facing only — there is no caregiver/childcare-worker mode, and copy should address parents (not 托育人員). All UI text, code comments and commit messages are in Traditional Chinese (zh-TW); keep new content in the same language and tone. Commit messages follow `feat: <中文描述>`.

Stack: React 19 + Vite 8 + Tailwind CSS v4 (via `@tailwindcss/vite`), plain JavaScript/JSX (no TypeScript), deployed on Vercel.

## Commands

```sh
npm run dev       # Vite dev server
npm run build     # production build to dist/
npm run lint      # ESLint (flat config, react-hooks + react-refresh rules)
npm run preview   # serve the built dist/
```

There is no test suite. Verify changes with `npm run lint` (must stay at 0 errors and 0 warnings; don't relax rules to get there), `npm run build`, and by checking the page in the dev server.

## Architecture

**No router.** `src/App.jsx` holds `currentPage` state and renders pages through a `switch` on a string ID. Every page receives a `navigate(pageId, param?)` prop; `param` lets a page open at a specific state (e.g. `GrowthMilestonesPage` takes `initialAgeId`, `VaccinationPage`/`ParentSupportPage` take `initialTab`). `<main key={currentPage}>` remounts on each navigation, which is what triggers the `.page-transition` animation.

**Navigation is driven by `src/navGroups.js`.** It defines four groups (成長發展, 健康預防, 日常照護, 親職支持 — the last is a single-page group with `direct`), each item carrying `id`, `label` (short nav name), `title` and `desc` (homepage card text, also shown in the nav dropdowns). Navbar, HomePage topic cards and Footer all read from it; `groupOfPage(id)` gives the active group. `emergencyPage` is exported separately: 緊急狀況 is intentionally not in the navbar — its entry points are the EmergencyBar (「急救處理指引」) and a homepage card. Adding a page means: a `case` in `App.jsx`, an item in `navGroups.js`, and an icon in `src/pageIcons.js`.

**Layout order:** `EmergencyBar` (scrolls away) → `Navbar` (sticky) → page. Navbar shows dropdowns at `lg+` and a full-screen grouped panel below `lg`; nothing may cause horizontal scrolling at any width. 「依月齡探索」 navigates to `home` with `navParam = 'age-picker'`, and `HomePage` scrolls to the hero age picker. Shared outside-click/Esc handling for popovers lives in `src/useDismiss.js`.

**Content is static data inside each page file.** There is no backend or API; deployment is a static Vite build on Vercel (`vercel.json`). Pages are large, self-contained components with their data arrays defined at the top of the file (e.g. `DRUG_DATA` in `MedicationPage.jsx`, with images in `public/drugs/` referenced as `/drugs/<file>`). `src/data/whoGrowthData.js` holds WHO growth-curve reference data for `GrowthChartPage`.

**Shared data in `src/data/`.** Arrays used by more than one page live here and pages import them: `milestones.js` (`ageGroups`), `vaccines.js` (`schedule`, `checkups`), `sleep.js` (`sleepDurations`), `whoGrowthData.js`. Edit content there, not in the pages.

**依月齡探索 (`age-guide`).** The homepage hero (`#age-picker`, `src/components/AgePicker.jsx`) sends the total months via `navigate('age-guide', months)`; `AgeGuidePage` keeps the age only in component state (no localStorage). All content comes from `src/data/ageGuide.js`: 9 `segments` (aligned to the milestone age groups) that *reference* shared data by key/index (milestone picks and red flags, vaccine `schedule` ages, `checkups` stages, sleep rows, `dietStages`), plus newly written `top3` and `safety.tips`. `buildGuide(months)` resolves everything and throws if a reference is missing — renaming a vaccine `age`, a checkup `stage` or reordering milestone items requires updating `ageGuide.js`. Vaccine text must only come from `vaccines.js`. Newly written, not-yet-reviewed medical copy is marked with a trailing `// 待護理師確認` comment on the same line; keep that convention for any new copy. `age-guide` is not in `navGroups`; DietaryPage, DailyCarePage, HomeSafetyPage and VaccinationPage accept `initialTab` via `navParam` so cards can deep-link.

## Styling conventions

- **Design tokens** live in `src/index.css`: raw CSS variables on `:root`, overridden under `[data-theme="dark"]`, exposed to Tailwind via `@theme inline` (`bg-canvas`, `bg-surface`, `bg-surface-muted`, `bg-brand`, `bg-brand-soft`, `text-ink`, `text-ink-muted`, `text-on-brand`, `border-border`, `bg-accent`). A `dark:` custom variant keys off `data-theme`; there is no theme toggle yet. `accent` is decorative only — never use it for text. Primary buttons are `bg-brand text-on-brand` (white text in light mode, dark text in dark mode).
- The site frame and all content pages use only these tokens, so every page is ready for dark mode once a `data-theme` toggle is added.
- **Alerts are semantic and fixed:** red = danger, yellow = warning, green = success, via the `danger-*`/`warning-*`/`success-*` `{bg,fg,border}` tokens. Every alert must show an icon **and** a text label, never color alone. Use `<Alert tone label title strong>` and `<StatusBadge tone>` from `src/components/Alert.jsx`; for custom layouts (graded rows, severity cards), use `toneClasses(tone)` from `src/components/alertTones.js` plus `<ToneIcon tone>`. Data arrays store `tone: 'danger' | 'warning' | 'success'`, not class strings.
- **Category colors** separate topics only and must never be used for alerts. There are six low-saturation tokens, each with a light and dark variant: `cat-mist`, `cat-lav`, `cat-teal`, `cat-mauve`, `cat-sand`, `cat-slate`. Use them as `bg-cat-*-bg text-cat-*-fg border-cat-*-fg/20`. A category keeps the same color everywhere it appears (e.g. on every age tab of a page). Store the mapping as literal class strings in a lookup (see `catStyle` in `GrowthMilestonesPage.jsx`) so Tailwind can detect them. If there are more categories than colors, only categories that never appear together may share a color.
- **Content-page rules (all pages now follow them):** page header `bg-canvas border-b border-border`; info/source boxes `bg-surface-muted border-border`; cards and sections `bg-surface border border-border rounded-2xl` (no thick borders, gradients or large bright fills); tabs and segmented toggles selected `bg-brand text-on-brand`, unselected `text-ink-muted`; buttons `bg-brand text-on-brand`; related-page link cards neutral `bg-surface`; text links `text-brand`. No Tailwind palette colors (`red-*`, `sky-*`, `gray-*`…) remain in `src/pages` except the photo lightbox overlays in `MedicationPage` (`bg-black/*`, `text-white`).
- **When to use category colors vs. neutral:** use `cat-*` only for a real classification that repeats on the page, and assign colors by a fixed per-page rule (e.g. vital signs: 心跳 mauve, 呼吸 teal, 體溫 sand, 血氧 lav, 意識 slate; drug classes in `CATEGORY_COLORS`; recurring block types in symptom cards: 正確觀念 lav, 退燒藥 teal). Lists of individual topics (each symptom, each disease article) and plain grouping boxes stay neutral.
- Icons: `lucide-react` with `strokeWidth={2}`. `src/pageIcons.js` maps each page ID to its icon and is shared by Navbar, HomePage and Footer. Emoji inside content text are intentionally kept for now.
- Fonts: Noto Sans TC for body text and Noto Serif TC for headings, both loaded from Google Fonts in `index.html`. `font-serif` is used only on the homepage hero `<h1>` and each page's title `<h1>`.
- Custom utilities `.page-transition` and `.card-hover` live in `src/index.css` and are disabled under `prefers-reduced-motion`.
