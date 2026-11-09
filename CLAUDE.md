# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

An infant/toddler health guide (嬰幼兒健康指南) for Taiwanese parents and childcare workers (托育人員). All UI text, code comments and commit messages are in Traditional Chinese (zh-TW); keep new content in the same language and tone. Commit messages follow `feat: <中文描述>`.

Stack: React 19 + Vite 8 + Tailwind CSS v4 (via `@tailwindcss/vite`), plain JavaScript/JSX (no TypeScript), deployed on Vercel. The README is the unmodified Vite template and has no project-specific information.

## Commands

```sh
npm run dev       # Vite dev server
npm run build     # production build to dist/
npm run lint      # ESLint (flat config, react-hooks + react-refresh rules)
npm run preview   # serve the built dist/
```

There is no test suite. Verify changes with `npm run lint`, `npm run build`, and by checking the page in the dev server.

## Architecture

**No router.** `src/App.jsx` holds `currentPage` state and renders pages through a `switch` on a string ID. Every page receives a `navigate(pageId, param?)` prop; `param` lets a page open at a specific state (e.g. `GrowthMilestonesPage` takes `initialAgeId`, `VaccinationPage`/`ParentSupportPage` take `initialTab`). `<main key={currentPage}>` remounts on each navigation, which is what triggers the `.page-transition` animation.

Adding a page means touching three places: the `switch` in `App.jsx`, the `navItems` array in `src/components/Navbar.jsx`, and (if it should appear on the landing page) the `cards` array in `src/pages/HomePage.jsx`. Footer/EmergencyBar links also use the same page IDs.

**Dual-perspective (parent / caregiver).** `src/RoleContext.jsx` provides `useRole()` with `role` = `'parent' | 'caregiver'`, persisted to `localStorage` key `ihg_role`. Content gated to caregivers is marked with `caregiverOnly: true` on items in the nav list, home cards, and page-level tab lists (e.g. `MAIN_TABS` in `MedicationPage.jsx`), then filtered with `role === 'caregiver' || !item.caregiverOnly`. Follow this pattern for new caregiver-only content.

**Content is static data inside each page file.** Pages are large, self-contained components with their data arrays defined at the top of the file (e.g. `DRUG_DATA` in `MedicationPage.jsx`, with images in `public/drugs/` referenced as `/drugs/<file>`). `src/data/whoGrowthData.js` holds WHO growth-curve reference data for `GrowthChartPage`.

**Notion integration is currently unused by the frontend.** `api/drugs.js` is a Vercel serverless function that reads a Notion data source (`@notionhq/client` v5 `dataSources.query`) and maps Chinese-named properties (藥品名稱, 主治症狀, …) into drug objects; `vite.config.js` and `vercel.json` both proxy `/notion-proxy` → `api.notion.com`. Nothing in `src/` calls these — the medication page uses its static `DRUG_DATA`. Env vars (see `.env.example`, copy to `.env.local`): `NOTION_API_KEY`/`NOTION_DATABASE_ID` (the API also accepts `VITE_`-prefixed variants). `scripts/check-notion.js` (`node scripts/check-notion.js`) prints a Notion database's schema for mapping fields.

## Styling conventions

- Tailwind v4 theme tokens are defined in `src/index.css` under `@theme` (`morandi-primary`, `-primary-light`, `-secondary`, `-accent`, `-dark`). Per the comment there, the Morandi palette applies **only to the site frame** (Navbar, Footer, homepage shell). Content pages keep semantic colors (red = emergency, amber = caution, green = normal) and their per-topic category colors — don't recolor them with Morandi tokens.
- Custom utilities `.page-transition` and `.card-hover` live in `src/index.css` and are disabled under `prefers-reduced-motion`.
- `src/App.css` is leftover Vite template CSS and is not imported.
