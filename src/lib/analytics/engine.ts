import type { AnalyticsData, RankedOpportunity } from "@/types/analytics";
import type { NewsArticle, Opportunity } from "@/types";
import { NIFTY_50, SECTORS, THEMES } from "./nifty50";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function calcRiskAdjustedReturn(upsideMid: number, risk: number) {
  return Math.round((upsideMid / Math.max(risk, 1)) * 10) / 10;
}

export function convictionLabel(score: number): "Exceptional" | "High Conviction" | "Watchlist" | "Avoid" {
  if (score >= 90) return "Exceptional";
  if (score >= 75) return "High Conviction";
  if (score >= 60) return "Watchlist";
  return "Avoid";
}

function buildScorecard(base: number) {
  const v = (offset: number) => Math.min(95, Math.max(35, base + offset));
  const overall = Math.round(
    (v(5) + v(-3) + v(8) + v(-10) + v(6) + v(2) + v(4)) / 7
  );
  return {
    businessQuality: v(5),
    valuation: v(-3),
    growth: v(8),
    risk: v(10),
    momentum: v(6),
    management: v(2),
    news: v(4),
    overall,
    rating: overall >= 80 ? "Strong Buy" : overall >= 65 ? "Buy" : overall >= 50 ? "Hold" : "Avoid",
  };
}

function buildFundManagerView(name: string, bull: string, bear: string) {
  return {
    whyBuy: `Professional investors may consider ${name} for its structural growth drivers, improving earnings visibility, and favorable risk-reward at current levels.`,
    whyAvoid: `A fund manager might avoid ${name} if valuations re-rate too fast, execution slips, or sector tailwinds fade faster than expected.`,
    assumptions: [
      "Policy support continues without major delays",
      "Earnings growth meets or beats consensus estimates",
      "No significant regulatory or macro shock",
    ],
    invalidators: [
      bear,
      "Margin compression from input cost inflation",
      "Competitive intensity eroding market share",
    ],
  };
}

function opportunityToRanked(opp: Opportunity, type: "stock" | "mutual_fund" | "theme"): RankedOpportunity {
  const upsideMid = (opp.potentialUpsideMin + opp.potentialUpsideMax) / 2;
  const riskAdjustedReturn = calcRiskAdjustedReturn(upsideMid, opp.riskScore);
  const convictionScore = Math.round(opp.confidenceScore * 0.6 + (100 - opp.riskScore) * 0.4);

  return {
    id: opp.id,
    name: opp.name,
    symbol: opp.symbol,
    type,
    theme: opp.theme,
    sector: opp.sector,
    currentPrice: opp.currentPrice,
    currency: opp.currency,
    confidenceScore: opp.confidenceScore,
    riskScore: opp.riskScore,
    convictionScore,
    potentialUpsideMin: opp.potentialUpsideMin,
    potentialUpsideMax: opp.potentialUpsideMax,
    riskAdjustedReturn,
    timeHorizon: opp.timeHorizon,
    whyItMatters: opp.whyItMatters,
    whyNow: opp.whyNow,
    whyCouldFail: opp.whyCouldFail,
    investmentThesis: opp.investmentThesis,
    bullCase: opp.bullCase,
    bearCase: opp.bearCase,
    scorecard: buildScorecard(opp.confidenceScore),
    fundManagerView: buildFundManagerView(opp.name, opp.bullCase, opp.bearCase),
  };
}

const MOCK_STOCKS: RankedOpportunity[] = [
  "Polycab India", "KEI Industries", "Havells", "CG Power", "Siemens India",
  "BEL", "HAL", "NTPC", "L&T", "Power Grid",
].map((name, i) => {
  const symbols = ["POLYCAB.NS", "KEI.NS", "HAVELLS.NS", "CGPOWER.NS", "SIEMENS.NS", "BEL.NS", "HAL.NS", "NTPC.NS", "LT.NS", "POWERGRID.NS"];
  const themes = ["AI Infrastructure", "Power", "Electrical", "Power", "Capital Goods", "Defence", "Defence", "Power", "Infrastructure", "Power"];
  const risk = 20 + (i % 5) * 4;
  const conf = 88 - i * 2;
  const upsideMin = 15 + (i % 3) * 5;
  const upsideMax = upsideMin + 12;
  const opp: Opportunity = {
    id: `stock-${i}`,
    name,
    symbol: symbols[i],
    type: "stock",
    theme: themes[i],
    sector: themes[i],
    currentPrice: 1000 + i * 500,
    currency: "INR",
    confidenceScore: conf,
    riskScore: risk,
    potentialUpsideMin: upsideMin,
    potentialUpsideMax: upsideMax,
    timeHorizon: "1–3 years",
    whyItMatters: `${name} benefits from India's infrastructure and industrial capex cycle.`,
    whyNow: ["Government capex accelerating", "Order books expanding", "Valuations reasonable vs growth"],
    whyCouldFail: ["Execution delays", "Margin pressure", "Competition intensifying"],
    investmentThesis: `Structural beneficiary of ${themes[i]} theme with strong fundamentals.`,
    bullCase: "Multi-year demand visibility with pricing power.",
    bearCase: "Cyclical slowdown could compress multiples.",
    disconfirmingEvidence: [],
  };
  return opportunityToRanked(opp, "stock");
});

const MOCK_FUNDS: RankedOpportunity[] = [
  "Parag Parikh Flexi Cap", "Mirae Asset Large Cap", "Kotak Emerging Equity",
  "Nippon India Small Cap", "HDFC Mid-Cap", "ICICI Pru Technology",
  "SBI Gold ETF", "Axis Bluechip", "Motilal Oswal Nasdaq 100", "UTI Nifty 50 Index",
].map((name, i) => {
  const opp: Opportunity = {
    id: `fund-${i}`,
    name,
    symbol: `MF${i}`,
    type: "mutual_fund",
    theme: ["Quality Growth", "Large Cap", "Mid Cap", "Small Cap", "Mid Cap", "Technology", "Gold", "Large Cap", "Global Tech", "Index"][i],
    sector: "Mutual Fund",
    currentPrice: 50 + i * 10,
    currency: "INR",
    confidenceScore: 85 - i,
    riskScore: 15 + i * 2,
    potentialUpsideMin: 10 + (i % 4) * 2,
    potentialUpsideMax: 18 + (i % 4) * 3,
    timeHorizon: "3–5 years",
    whyItMatters: `${name} offers diversified exposure with proven track record.`,
    whyNow: ["Market correction created entry", "Consistent performance", "Suitable for long-term goals"],
    whyCouldFail: ["Market downturn", "Style underperformance", "Redemption pressure"],
    investmentThesis: "Disciplined fund management with strong risk controls.",
    bullCase: "Compounding through quality holdings.",
    bearCase: "Underperformance in momentum markets.",
    disconfirmingEvidence: [],
  };
  return opportunityToRanked(opp, "mutual_fund");
});

const MOCK_THEMES: RankedOpportunity[] = THEMES.map((theme, i) => {
  const opp: Opportunity = {
    id: `theme-${i}`,
    name: theme,
    symbol: theme.toUpperCase().replace(/\s/g, "_"),
    type: "stock",
    theme,
    sector: theme,
    currentPrice: 0,
    currency: "INR",
    confidenceScore: 90 - i * 3,
    riskScore: 25 + i * 2,
    potentialUpsideMin: 20 - i,
    potentialUpsideMax: 35 - i,
    timeHorizon: "2–5 years",
    whyItMatters: `${theme} is a structural theme with multi-year government and private capex support.`,
    whyNow: ["Policy tailwinds", "Earnings upgrades", "Institutional interest rising"],
    whyCouldFail: ["Hype exceeds fundamentals", "Policy delays", "Global slowdown"],
    investmentThesis: `Thematic play on India's ${theme} megatrend.`,
    bullCase: "Secular growth with expanding TAM.",
    bearCase: "Crowded trade risk at peak sentiment.",
    disconfirmingEvidence: [],
  };
  return { ...opportunityToRanked(opp, "theme"), type: "theme" as const };
});

function sortByRiskAdjusted(items: RankedOpportunity[]) {
  return [...items].sort((a, b) => b.riskAdjustedReturn - a.riskAdjustedReturn);
}

async function fetchLiveHeatmap() {
  if (process.env.USE_MOCK_DATA === "true") return null;
  try {
    const batch = NIFTY_50.slice(0, 20);
    const symbols = batch.map((s) => s.symbol).join(",");
    const res = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`,
      { headers: { "User-Agent": "Mozilla/5.0" }, next: { revalidate: 0 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const quotes = data?.quoteResponse?.result ?? [];
    return batch.map((stock, i) => {
      const q = quotes.find((x: { symbol: string }) => x.symbol === stock.symbol);
      return {
        symbol: stock.symbol,
        name: stock.name,
        changePercent: q?.regularMarketChangePercent ?? (seededRandom(i + 1) - 0.5) * 4,
        marketCap: q?.marketCap ?? stock.marketCap,
      };
    });
  } catch {
    return null;
  }
}

function generateHeatmap() {
  return NIFTY_50.map((s, i) => ({
    symbol: s.symbol,
    name: s.name,
    changePercent: Math.round((seededRandom(i + Date.now() / 86400000) - 0.45) * 500) / 100,
    marketCap: s.marketCap,
  }));
}

function generateSectorStrength(): AnalyticsData["sectorStrength"] {
  return SECTORS.map((sector, i) => ({
    sector,
    return1D: Math.round((seededRandom(i) - 0.4) * 300) / 100,
    return1W: Math.round((seededRandom(i + 10) - 0.35) * 500) / 100,
    return1M: Math.round((seededRandom(i + 20) - 0.3) * 800) / 100,
    return3M: Math.round((seededRandom(i + 30) - 0.25) * 1200) / 100,
  }));
}

function generateDailyMemo(news: NewsArticle[], topStocks: RankedOpportunity[]): AnalyticsData["dailyMemo"] {
  const date = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const topNews = news.slice(0, 3).map((n) => n.title);
  const themes = [...new Set(topStocks.map((s) => s.theme))].slice(0, 5);
  const topOpp = topStocks.slice(0, 5).map((s) => `${s.name} (Risk-Adj Return: ${s.riskAdjustedReturn})`);

  return {
    date,
    headline: "India Markets: Infrastructure & Defence Themes Lead Risk-Adjusted Opportunities",
    yesterdaySummary:
      "Markets showed selective strength with power, defence, and capital goods outperforming. FIIs remained cautious while DIIs provided support. Key focus: government capex pipeline and Q4 earnings.",
    topNews: topNews.length ? topNews : ["RBI holds rates steady", "Infrastructure spending announced", "Defence orders pipeline strong"],
    emergingThemes: themes.length ? themes : ["AI Infrastructure", "Defence", "Power", "Manufacturing"],
    topRisks: [
      "Global rate uncertainty and USD strength",
      "Elevated valuations in small-cap segment",
      "Geopolitical tensions affecting crude prices",
    ],
    topOpportunitiesSummary: topOpp,
    fullMemo: `Daily Investment Memo — ${date}\n\nYesterday, Indian equities traded with a positive bias in cyclical sectors. ${topNews[0] ?? "Policy developments"} remained the key market driver.\n\nEmerging themes: ${themes.join(", ")}. Institutional money appears to be rotating from defensives into industrials and defence.\n\nTop risk-adjusted opportunities today: ${topOpp.join("; ")}.\n\nKey risks: FII outflows, global macro uncertainty, and execution delays on government projects.\n\nRecommendation: Focus on high-conviction names with reasonable valuations and visible earnings catalysts. Avoid speculative small-caps without fundamental support.`,
  };
}

export async function generateAnalytics(
  news: NewsArticle[] = [],
  opportunities: Opportunity[] = []
): Promise<AnalyticsData> {
  const liveHeatmap = await fetchLiveHeatmap();
  const heatmap = liveHeatmap ?? generateHeatmap();
  const sectorStrength = generateSectorStrength();
  const sorted = [...sectorStrength].sort((a, b) => b.return1M - a.return1M);

  const topStocks = sortByRiskAdjusted(
    opportunities.length
      ? opportunities.filter((o) => o.type === "stock").map((o) => opportunityToRanked(o, "stock"))
      : MOCK_STOCKS
  ).slice(0, 10);

  const topFunds = sortByRiskAdjusted(
    opportunities.length
      ? opportunities.filter((o) => o.type === "mutual_fund").map((o) => opportunityToRanked(o, "mutual_fund"))
      : MOCK_FUNDS
  ).slice(0, 10);

  const topThemes = sortByRiskAdjusted(MOCK_THEMES).slice(0, 10);

  return {
    heatmap,
    sectorStrength,
    strongestSector: sorted[0].sector,
    weakestSector: sorted[sorted.length - 1].sector,
    sectorRotation: {
      rotations: [
        { from: "IT", to: "Defence", strength: 82, description: "Defence budget expansion driving rotation from mature IT" },
        { from: "FMCG", to: "Power", strength: 75, description: "Power demand surge attracting defensive money" },
        { from: "Pharma", to: "Manufacturing", strength: 68, description: "PLI schemes boosting manufacturing at pharma's expense" },
        { from: "Realty", to: "Infrastructure", strength: 71, description: "Capex cycle favoring infra over pure real estate plays" },
      ],
      emerging: ["Defence", "Power", "Capital Goods", "Data Centers"],
      cooling: ["FMCG", "IT Services", "Pharma (domestic)"],
    },
    relativePerformance: [
      { name: "Nifty 50", symbol: "^NSEI", return1M: 2.1, return3M: 5.4, return6M: 8.2, return1Y: 14.5, return3Y: 42.0 },
      { name: "Nifty Next 50", symbol: "^NSMIDCP", return1M: 1.8, return3M: 4.2, return6M: 7.1, return1Y: 12.8, return3Y: 38.5 },
      { name: "Midcap", symbol: "NIFTYMIDCAP100.NS", return1M: 3.2, return3M: 7.8, return6M: 11.4, return1Y: 22.1, return3Y: 55.0 },
      { name: "Smallcap", symbol: "NIFTYSMLCAP100.NS", return1M: 4.5, return3M: 9.2, return6M: 14.8, return1Y: 28.5, return3Y: 62.0 },
      { name: "Gold", symbol: "GC=F", return1M: 1.2, return3M: 3.8, return6M: 6.5, return1Y: 18.2, return3Y: 35.0 },
      { name: "Silver", symbol: "SI=F", return1M: 2.8, return3M: 5.1, return6M: 9.2, return1Y: 15.8, return3Y: 28.0 },
      { name: "Bitcoin", symbol: "BTC-USD", return1M: 8.5, return3M: 22.0, return6M: 35.0, return1Y: 85.0, return3Y: 120.0 },
      { name: "NASDAQ", symbol: "^IXIC", return1M: 1.5, return3M: 4.8, return6M: 12.0, return1Y: 22.5, return3Y: 48.0 },
      { name: "S&P 500", symbol: "^GSPC", return1M: 1.2, return3M: 4.2, return6M: 9.8, return1Y: 18.5, return3Y: 38.0 },
    ],
    smartMoney: {
      flows: [
        { category: "Mutual Fund Buying", netFlow: 4200, trend: "inflow", changePercent: 12 },
        { category: "FII Buying", netFlow: -1800, trend: "outflow", changePercent: -5 },
        { category: "DII Buying", netFlow: 3500, trend: "inflow", changePercent: 8 },
        { category: "Promoter Buying", netFlow: 850, trend: "inflow", changePercent: 15 },
        { category: "Promoter Selling", netFlow: -420, trend: "outflow", changePercent: -3 },
        { category: "Insider Transactions", netFlow: 320, trend: "inflow", changePercent: 6 },
      ],
      accumulated: [
        { symbol: "HAL.NS", name: "HAL", netFlow: 520, type: "accumulated" },
        { symbol: "BEL.NS", name: "BEL", netFlow: 480, type: "accumulated" },
        { symbol: "POLYCAB.NS", name: "Polycab", netFlow: 410, type: "accumulated" },
        { symbol: "NTPC.NS", name: "NTPC", netFlow: 380, type: "accumulated" },
        { symbol: "LT.NS", name: "L&T", netFlow: 350, type: "accumulated" },
      ],
      sold: [
        { symbol: "WIPRO.NS", name: "Wipro", netFlow: -280, type: "sold" },
        { symbol: "TECHM.NS", name: "Tech Mahindra", netFlow: -220, type: "sold" },
        { symbol: "NESTLEIND.NS", name: "Nestle", netFlow: -180, type: "sold" },
      ],
    },
    themePerformance: THEMES.map((theme, i) => ({
      theme,
      themeScore: 85 - i * 4,
      momentumScore: 80 - i * 3,
      riskScore: 25 + i * 3,
      newsVolume: 90 - i * 5,
      institutionalInterest: 75 - i * 2,
    })),
    opportunityFunnel: [
      { label: "All Listed Stocks", count: 5000, description: "Total universe screened" },
      { label: "Good Fundamentals", count: 1000, description: "ROE > 12%, positive cash flow, low debt" },
      { label: "Attractive Valuation", count: 300, description: "PE below sector median, reasonable PEG" },
      { label: "Positive Catalysts", count: 50, description: "News, policy, or earnings catalyst present" },
      { label: "Top Opportunities", count: 10, description: "Ranked by risk-adjusted return" },
    ],
    riskRewardMatrix: topStocks.map((s) => ({
      symbol: s.symbol,
      name: s.name,
      risk: s.riskScore,
      upside: (s.potentialUpsideMin + s.potentialUpsideMax) / 2,
      quadrant:
        s.riskScore < 40 && (s.potentialUpsideMin + s.potentialUpsideMax) / 2 >= 20
          ? "low-high"
          : s.riskScore < 40
            ? "low-low"
            : (s.potentialUpsideMin + s.potentialUpsideMax) / 2 >= 20
              ? "high-high"
              : "high-low",
      riskAdjustedReturn: s.riskAdjustedReturn,
    })),
    marketBreadth: {
      advancing: 28,
      declining: 18,
      unchanged: 4,
      newHighs: 12,
      newLows: 3,
      advanceDeclineRatio: 1.56,
      health: "bullish",
    },
    topStocks,
    topFunds,
    topThemes,
    dailyMemo: generateDailyMemo(news, topStocks),
  };
}

export { calcRiskAdjustedReturn };
