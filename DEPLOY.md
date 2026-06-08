# Deploy InvestAI to the Web

The fastest way to turn your local app into a public webpage is **Vercel** (made by the creators of Next.js).

## Option 1: Vercel (Recommended — ~5 minutes)

### Step 1: Push to GitHub

```bash
cd ai-investment-dashboard
git add .
git commit -m "Prepare for web deployment"
```

Create a new repository on [github.com/new](https://github.com/new), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/investai-dashboard.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click **Add New → Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**

### Step 3: Add Environment Variables (optional)

In Vercel → Project → **Settings → Environment Variables**:

| Variable | Value | Required |
|----------|-------|----------|
| `OPENAI_API_KEY` | `sk-...` | For live AI analysis |
| `USE_MOCK_DATA` | `false` | Use live market & news data |
| `OPENAI_MODEL` | `gpt-4o-mini` | Optional |

Without `OPENAI_API_KEY`, the app still works using mock AI data and live market/news feeds.

### Step 4: Your live URL

Vercel gives you a URL like:

```
https://investai-dashboard.vercel.app
```

Every `git push` to `main` auto-redeploys the site.

---

## Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
cd ai-investment-dashboard
vercel login
vercel
```

Follow the prompts. Run `vercel --prod` for production.

---

## Option 3: Netlify

1. Push code to GitHub (same as Step 1 above)
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Build command: `npm run build`
4. Publish directory: `.next` (Netlify has a Next.js plugin — enable it)
5. Add the same environment variables as above

---

## Daily Data Refresh

InvestAI automatically refreshes all market, news, and opportunity data **every day at 4:00 AM IST** (10:30 PM UTC).

This is configured in `vercel.json`:

```json
"crons": [{ "path": "/api/cron/refresh", "schedule": "30 22 * * *" }]
```

The cron job:
- Fetches fresh market data from Yahoo Finance
- Pulls latest news from Google News RSS
- Regenerates AI investment opportunities
- Caches results for 24 hours

Users also get fresh data whenever they click **Refresh** on the dashboard.

> **Note:** Vercel Cron requires a **Pro plan** ($20/mo). On the free Hobby plan, data still refreshes on every page visit and manual refresh.

---

## What works on the live site

| Feature | Web deployment |
|---------|----------------|
| Market overview | Live Yahoo Finance data |
| News intelligence | Live Google News RSS |
| AI opportunities | OpenAI (or mock fallback) |
| Stock research | Live + AI |
| Child fund planner | Works fully |
| Watchlist | Saved in your browser (localStorage) |

---

## Custom domain (optional)

In Vercel → **Settings → Domains**, add your domain (e.g. `investai.yourdomain.com`).

---

## Troubleshooting

**Build fails?** Run `npm run build` locally first to catch errors.

**No live data?** Set `USE_MOCK_DATA=false` in Vercel env vars and redeploy.

**AI not working?** Add `OPENAI_API_KEY` in Vercel environment variables.
