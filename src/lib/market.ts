import type { MarketIndex } from "@/types";
import { MOCK_MARKET_DATA } from "./mock-data";
import { getCached, setCache } from "./db";

const MARKET_SYMBOLS: { symbol: string; name: string; currency: string }[] = [
  { symbol: "^NSEI", name: "Nifty 50", currency: "INR" },
  { symbol: "^BSESN", name: "Sensex", currency: "INR" },
  { symbol: "^IXIC", name: "Nasdaq", currency: "USD" },
  { symbol: "^GSPC", name: "S&P 500", currency: "USD" },
  { symbol: "GC=F", name: "Gold", currency: "USD" },
  { symbol: "CL=F", name: "Crude Oil", currency: "USD" },
  { symbol: "INR=X", name: "USD/INR", currency: "INR" },
];

interface YahooChartResponse {
  chart?: {
    result?: Array<{
      meta?: {
        regularMarketPrice?: number;
        chartPreviousClose?: number;
        currency?: string;
      };
      indicators?: {
        quote?: Array<{
          close?: (number | null)[];
        }>;
      };
    }>;
  };
}

interface YahooQuoteResponse {
  quoteResponse?: {
    result?: Array<{
      symbol?: string;
      shortName?: string;
      longName?: string;
      regularMarketPrice?: number;
      regularMarketChange?: number;
      regularMarketChangePercent?: number;
      currency?: string;
      trailingPE?: number;
      beta?: number;
      marketCap?: number;
    }>;
  };
}

interface YahooSummaryResponse {
  quoteSummary?: {
    result?: Array<{
      summaryProfile?: {
        sector?: string;
        industry?: string;
        longBusinessSummary?: string;
      };
      financialData?: {
        revenueGrowth?: number;
        earningsGrowth?: number;
        returnOnEquity?: number;
        debtToEquity?: number;
        profitMargins?: number;
        freeCashflow?: number;
      };
      defaultKeyStatistics?: {
        trailingPE?: number;
        priceToBook?: number;
      };
    }>;
  };
}

async function yahooFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; InvestAI/1.0)",
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error("Yahoo fetch error:", error);
    return null;
  }
}

async function fetchQuote(
  symbol: string,
  name: string,
  currency: string
): Promise<MarketIndex | null> {
  const encoded = encodeURIComponent(symbol);
  const data = await yahooFetch<YahooChartResponse>(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encoded}?interval=1d&range=5d`
  );

  const result = data?.chart?.result?.[0];
  if (!result?.meta?.regularMarketPrice) return null;

  const closes =
    result.indicators?.quote?.[0]?.close?.filter(
      (p): p is number => p != null
    ) ?? [];
  const currentPrice = result.meta.regularMarketPrice;
  const prevClose = result.meta.chartPreviousClose ?? closes[closes.length - 2] ?? currentPrice;
  const weekAgoPrice = closes[0] ?? prevClose;

  const dailyChange = currentPrice - prevClose;
  const dailyChangePercent = prevClose ? (dailyChange / prevClose) * 100 : 0;
  const weeklyChange = currentPrice - weekAgoPrice;
  const weeklyChangePercent = weekAgoPrice
    ? (weeklyChange / weekAgoPrice) * 100
    : 0;

  return {
    symbol,
    name,
    value: currentPrice,
    dailyChange,
    dailyChangePercent,
    weeklyChange,
    weeklyChangePercent,
    currency,
  };
}

export async function getMarketOverview(): Promise<{
  data: MarketIndex[];
  source: "live" | "mock";
}> {
  const cached = getCached<MarketIndex[]>("market_overview");
  if (cached) return { data: cached, source: "live" };

  if (process.env.USE_MOCK_DATA === "true") {
    return { data: MOCK_MARKET_DATA, source: "mock" };
  }

  try {
    const results = await Promise.all(
      MARKET_SYMBOLS.map(({ symbol, name, currency }) =>
        fetchQuote(symbol, name, currency)
      )
    );

    const data = results.filter((r): r is MarketIndex => r !== null);

    if (data.length === 0) {
      return { data: MOCK_MARKET_DATA, source: "mock" };
    }

    const filled = MARKET_SYMBOLS.map((meta) => {
      const found = data.find((d) => d.symbol === meta.symbol);
      if (found) return found;
      const mock = MOCK_MARKET_DATA.find((m) => m.symbol === meta.symbol);
      return mock!;
    });

    setCache("market_overview", filled, 15);
    return { data: filled, source: "live" };
  } catch (error) {
    console.error("Market data fetch failed:", error);
    return { data: MOCK_MARKET_DATA, source: "mock" };
  }
}

export async function getStockQuote(symbol: string) {
  if (process.env.USE_MOCK_DATA === "true") return null;

  try {
    const encoded = encodeURIComponent(symbol);
    const [quoteData, summaryData] = await Promise.all([
      yahooFetch<YahooQuoteResponse>(
        `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encoded}`
      ),
      yahooFetch<YahooSummaryResponse>(
        `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${encoded}?modules=summaryProfile,financialData,defaultKeyStatistics`
      ),
    ]);

    const quote = quoteData?.quoteResponse?.result?.[0];
    const summary = summaryData?.quoteSummary?.result?.[0];

    if (!quote) return null;

    return { quote, summary };
  } catch (error) {
    console.error(`Failed to fetch quote for ${symbol}:`, error);
    return null;
  }
}
