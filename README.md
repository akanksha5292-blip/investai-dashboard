# InvestAI — AI Investment Intelligence Dashboard

An AI-powered investment research assistant that helps investors discover stock and mutual fund opportunities by analyzing news, government policies, macroeconomic trends, and market sentiment.

**This is NOT a trading application.** It is a research and education tool that explains why opportunities exist and helps users learn how professional investors think.

## Features

- **Market Overview** — Nifty 50, Sensex, Nasdaq, S&P 500, Gold, Crude Oil, USD/INR with daily and weekly changes
- **Top Opportunities** — AI-discovered investment ideas with confidence, risk, and upside scores
- **News Intelligence Engine** — Analyzes news with sector impacts and reasoning chains
- **Opportunity Discovery** — Full investment thesis with bull/bear cases and disconfirming evidence
- **Risk & Confidence Engines** — Multi-factor scoring with explanations
- **AI Research** — Deep-dive stock analysis with financial metrics
- **Explain Like I'm 15** — Tooltips explaining financial terms simply
- **Child Future Fund** — Portfolio planning with projection charts
- **Watchlist** — Save and track stocks, funds, and themes

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS, ShadCN UI
- **Backend:** Next.js API Routes
- **Storage:** In-memory cache (server) + localStorage (watchlist)
- **AI:** OpenAI API
- **Charts:** Recharts
- **Data:** Yahoo Finance, Google News RSS

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd ai-investment-dashboard
npm install
```

### Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

**Option A — Mock data (no API keys needed):**

```env
USE_MOCK_DATA=true
```

**Option B — Live data with AI:**

```env
USE_MOCK_DATA=false
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4o-mini
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The dashboard fetches fresh data every time you open or refresh it.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── dashboard/      # Combined dashboard data
│   │   ├── market/         # Market indices
│   │   ├── news/           # News intelligence
│   │   ├── opportunities/  # Opportunity discovery
│   │   ├── research/       # Stock research
│   │   ├── watchlist/      # Watchlist CRUD
│   │   ├── child-fund/     # Child fund planner
│   │   └── terms/          # ELI15 financial terms
│   ├── opportunities/      # Opportunities page
│   ├── news/               # News page
│   ├── research/           # AI Research page
│   ├── child-fund/         # Child Future Fund page
│   └── watchlist/          # Watchlist page
├── components/
│   ├── ui/                 # ShadCN UI components
│   ├── dashboard/          # Dashboard-specific components
│   ├── charts/             # Recharts components
│   └── layout/             # Layout components
├── lib/
│   ├── ai.ts               # OpenAI integration
│   ├── market.ts           # Yahoo Finance data
│   ├── news.ts             # Google News RSS
│   ├── risk-engine.ts      # Risk scoring
│   ├── confidence-engine.ts # Confidence scoring
│   ├── child-fund.ts       # Child fund calculations
│   ├── cache.ts            # In-memory API cache
│   ├── watchlist-client.ts # Browser watchlist storage
│   └── mock-data.ts        # Mock data fallback
└── types/
    └── index.ts            # TypeScript types
```

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/dashboard` | GET | Full dashboard data (market + news + opportunities) |
| `/api/market` | GET | Market indices overview |
| `/api/news` | GET | Analyzed news articles |
| `/api/opportunities` | GET | Investment opportunities |
| `/api/research?symbol=POLYCAB` | GET | Stock research |
| Watchlist | Browser localStorage | Saved per device in browser |
| `/api/child-fund` | POST | Child fund plan generation |
| `/api/terms` | GET | Financial term definitions |

## Mock Data Fallback

When `USE_MOCK_DATA=true` or live APIs fail, the app automatically serves realistic mock data including:

- Market indices with realistic values
- Curated news with full AI analysis
- Pre-built opportunities (Polycab, KEI, Havells, etc.)
- Stock research for POLYCAB

This ensures the app is fully functional for demos and development without API keys.

## Deploy to the Web

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step instructions to publish on Vercel, Netlify, or via CLI.

Quick deploy:

```bash
npm i -g vercel
vercel login
vercel --prod
```

Your app will be live at a URL like `https://your-project.vercel.app`.

## Disclaimer

This application is for educational and research purposes only. It does not provide financial advice. Always consult a qualified financial advisor before making investment decisions.
