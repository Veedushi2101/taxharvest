# Tax Harvesting Dashboard

A production-ready, recruiter-grade fintech dashboard for crypto tax loss harvesting. Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** primitives.

## Features

- Pre / After Harvesting summary cards with STCG & LTCG breakdown
- Realised Capital Gains computation in Indian currency formatting (₹70,200.88)
- Sortable, searchable, selectable holdings table (desktop) + mobile card layout
- Select-all with indeterminate state
- View All Holdings dialog
- All Harvest Transactions modal with per-row STCG / LTCG impact
- Live "You're going to save ₹X" badge with smooth animation
- Shimmer skeleton loaders for cards and table rows
- Centered error state with retry
- Floating-point cleanup (values < 1e-6 normalized to 0)
- Fully responsive (desktop / tablet / mobile)
- Reusable utility & calculation modules

## Tech Stack

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS 3
- shadcn/ui-style primitives (Radix UI)
- Lucide React icons
- Framer Motion (subtle entry / save-badge animations)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build
npm run start
```

## Folder Structure

```
src/
├── app/                # Next.js App Router entry (layout, page, globals)
├── components/
│   ├── summary/        # SummaryCard, SummarySection, skeleton
│   ├── holdings/       # HoldingsTable, skeleton
│   ├── transactions/   # TransactionsModal
│   ├── ui/             # Button, Checkbox, Dialog, Input, Skeleton
│   ├── Header.tsx
│   └── ErrorState.tsx
├── services/           # Mock async APIs (holdings, capitalGains)
├── lib/                # calculations, formatters, utils
├── types/              # Shared TypeScript types
└── data/               # Mock JSON dataset
```

## Mock API

`services/holdings.ts` and `services/capitalGains.ts` simulate network latency with `setTimeout` (~900ms). They return typed promises and can be swapped with real endpoints without touching components.

## Harvesting Logic

- `gain > 0` adds to **profits**
- `gain < 0` adds absolute value to **losses**
- Applied separately to STCG and LTCG
- Net = profits − losses; Realised = STCG net + LTCG net
- Pre-harvest values come from the API; after-harvest is recomputed via `useMemo` based on selected holdings (no derived state).

## Deployment (Vercel)

```bash
# Push to GitHub, import in Vercel — zero config needed.
# Or via CLI:
npx vercel
```

No environment variables, no backend, no database required.

## Assumptions

- The provided dataset is treated as the source of truth.
- Pre-harvesting capital gains figures in `capitalGains.ts` are illustrative.
- "Amount to Sell" defaults to the entire holding when a row is selected.
- Indian (₹) currency formatting with `en-IN` locale.

## Screenshots

> _Add screenshots to `public/screenshots/` and reference them here._

- `public/screenshots/desktop.png`
- `public/screenshots/mobile.png`

## License

MIT
