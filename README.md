# Tax Harvesting Dashboard

A production-grade fintech dashboard that simulates crypto tax-loss harvesting and portfolio optimization.
Built as part of the KoinX Frontend Engineering Assignment using Next.js 14, TypeScript, and Tailwind CSS.

## Live Demo

https://taxharvest-project.vercel.app/

---

## Features

- Pre / After Harvesting summary cards with STCG & LTCG breakdown
- Realised Capital Gains computation in US currency formatting ($70,200.88)
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
- Dynamic STCG and LTCG recalculation

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
│   ├── summary/        # SummaryCard, SummarySection, SummarySkeleton
│   ├── holdings/       # HoldingsTable, HoldingsSkeleton
│   ├── transactions/   # TransactionsModal
│   ├── ui/             # Button, Checkbox, Dialog, Input, Skeleton
│   ├── Disclaimer.tsx  
|   ├── ErrorState.tsx
│   ├── Header.tsx
    ├── Navbar.tsx
    └── ThemeToggle.tsx
├── services/           # Mock async APIs (holdings, capitalGains)
├── lib/                # calculations, formatters, utils
├── types/              # Shared TypeScript types
└── data/               # Mock JSON dataset
```

---

## API Layer

Mock APIs simulate real backend behavior using Promises (~900ms delay).

### Holdings API
Returns:
- Asset details
- Price data
- STCG / LTCG breakdown

## Mock API

`services/holdings.ts` and `services/capitalGains.ts` simulate network latency with `setTimeout` (~900ms). They return typed promises and can be swapped with real endpoints without touching components.

## Harvesting Logic

- `gain > 0` adds to **profits**
- `gain < 0` adds absolute value to **losses**
- Applied separately to STCG and LTCG
- Net = profits − losses; Realised = STCG net + LTCG net
- Pre-harvest values come from the API; after-harvest is recomputed via `useMemo` based on selected holdings (no derived state).

### Capital Gains API
Returns initial tax state:
{
  stcg: { profits, losses },
  ltcg: { profits, losses }
}

---

## Holdings Table

- Asset name, logo, and metadata
- Holdings and average buy price
- Current price tracking
- STCG / LTCG breakdown
- Row selection via checkbox
- Select all / deselect all
- Amount-to-sell auto updates
- Sorting support
- Search filtering

---

## Transactions Modal

- Selected holdings breakdown
- Per-asset STCG and LTCG impact
- Total aggregated tax impact
- Summary view of tax savings

---

## Responsiveness

- Desktop: full analytical table
- Mobile: optimized card layout
- Fully responsive across breakpoints
- Touch-friendly interactions

---

## Performance Optimizations

- Memoized calculations using useMemo
- Prevented unnecessary re-renders
- Stable state updates for selection logic
- Efficient filtering and sorting pipeline
- Derived state avoided to maintain single source of truth

---

## Assumptions

- The provided dataset is treated as the source of truth.
- Pre-harvesting capital gains figures in `capitalGains.ts` are illustrative.
- "Amount to Sell" defaults to the entire holding when a row is selected.
- US ($) currency formatting with `en-US` locale.
