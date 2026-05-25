# FinTrack — SaaS Financial Analytics Dashboard

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-6366f1?style=flat-square&logo=vercel&logoColor=white)](https://fin-track-orpin-eight.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Recharts](https://img.shields.io/badge/Recharts-2-22C55E?style=flat-square)](https://recharts.org)

> A production-grade SaaS analytics dashboard built with React 18 and Tailwind CSS — featuring interactive charts, real-time filters, dark mode, and a fully responsive layout.

**[→ View live demo](https://fin-track-orpin-eight.vercel.app)**

---

## What this project demonstrates

This isn't a tutorial project. It's built to show the level of quality I bring to client work:

- **Complex state management** — series toggles, time-range filters, multi-column sorting, and live search all working together without prop drilling
- **Data visualisation** — custom Recharts tooltips, interactive line/bar/donut charts with animated transitions
- **Production UI patterns** — custom dropdown components with outside-click handling, active filter pills, empty states, sparkline micro-charts
- **Dark mode done right** — full Tailwind dark mode with `localStorage` persistence, not just a CSS filter
- **Performance** — Vite build, code-split routes, no unnecessary re-renders

---

## Feature breakdown

### Dashboard
- 4 KPI cards with trend indicators and inline SVG sparklines (last 7 months)
- Line chart with **per-series toggles** (Revenue / Expenses / Profit) and **time-range filter** (3M / 6M / YTD / 1Y)
- Donut chart with centre label showing total spend by category
- Recent transactions feed

### Transactions
- Fully sortable table — click any column header to sort asc/desc
- Custom styled dropdowns with animated chevron and outside-click close
- Live search with inline clear button
- **Active filter pills** — dismiss individual filters without resetting everything
- Footer showing transaction count + running income/expense totals for current filter
- Empty state with one-click "Clear all filters"

### Reports
- Annual summary cards (revenue, expenses, profit)
- Grouped bar chart by month with custom tooltip
- **Top insights** — best revenue month, highest expense month, average monthly profit — all auto-calculated

### Settings
- Profile form, notification preferences
- Appearance panel — Light / Dark / System theme selector, currency, timezone

---

## Tech stack

| | |
|---|---|
| Framework | React 18 |
| Bundler | Vite 5 |
| Styling | Tailwind CSS v3 (dark mode, custom config) |
| Charts | Recharts 2 (line, bar, donut) |
| Routing | React Router v6 |
| Icons | Lucide React |
| Date utils | date-fns |
| Deploy | Vercel |

---

## Getting started

```bash
git clone https://github.com/Dav1001/fintrack.git
cd fintrack
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

```bash
# Production build
npm run build
npm run preview
```

---

## Project structure

```
src/
├── components/
│   ├── layout/      # Sidebar, Header, Layout wrapper
│   ├── dashboard/   # KPICard, RevenueChart, SpendingDonut, RecentTransactions
│   └── ui/          # PageWrapper, FilterDropdown, custom chart tooltips
├── data/            # Mock data — transactions, monthly stats, categories
├── hooks/           # useTheme (dark mode), useDateFilter
├── pages/           # Dashboard, Transactions, Reports, Settings
└── utils/           # formatCurrency, formatDate, formatPercent
```

---

## About

Built by **Davit H.** — React frontend developer with 6 years of experience building SaaS products, dashboards, and data-driven interfaces.

**Available for freelance work on Upwork →** [upwork.com/freelancers/~015803afe7a184bd84](https://www.upwork.com/freelancers/~015803afe7a184bd84)
