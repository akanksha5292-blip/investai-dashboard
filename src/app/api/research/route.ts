import { NextRequest, NextResponse } from "next/server";
import { getStockQuote } from "@/lib/market";
import { researchStock } from "@/lib/ai";
import { calculateRiskScore } from "@/lib/risk-engine";
import { calculateConfidenceScore } from "@/lib/confidence-engine";
import { MOCK_STOCK_RESEARCH } from "@/lib/mock-data";
import type { StockResearch } from "@/types";

export const dynamic = "force-dynamic";

function normalizeSymbol(symbol: string): string {
  const upper = symbol.toUpperCase().trim();
  if (upper.includes(".")) return upper;
  return `${upper}.NS`;
}

function buildResearchFromQuote(
  symbol: string,
  data: NonNullable<Awaited<ReturnType<typeof getStockQuote>>>
): StockResearch {
  const { quote, summary } = data;
  const financial = summary?.financialData;
  const profile = summary?.summaryProfile;
  const stats = summary?.defaultKeyStatistics;

  const peRatio = quote.trailingPE ?? stats?.trailingPE ?? undefined;
  const debtToEquity = financial?.debtToEquity ?? undefined;
  const profitMargin = financial?.profitMargins
    ? financial.profitMargins * 100
    : undefined;
  const revenueGrowth = financial?.revenueGrowth
    ? financial.revenueGrowth * 100
    : undefined;

  const risk = calculateRiskScore({
    peRatio,
    debtToEquity,
    profitMargin,
    beta: quote.beta ?? undefined,
    revenueGrowth,
  });

  const confidence = calculateConfidenceScore({
    newsMentions: 8,
    earningsBeatRate: 0.75,
    sectorReturn3M: 5,
    institutionalHolding: 45,
    peVsSector: peRatio ? peRatio / 30 : 1.1,
  });

  return {
    symbol: quote.symbol ?? symbol,
    name: quote.shortName ?? quote.longName ?? symbol,
    sector: profile?.sector ?? "Unknown",
    currentPrice: quote.regularMarketPrice ?? 0,
    currency: quote.currency ?? "INR",
    businessSummary:
      profile?.longBusinessSummary ?? "No business summary available.",
    revenueGrowth: revenueGrowth ?? 0,
    profitGrowth: financial?.earningsGrowth
      ? financial.earningsGrowth * 100
      : 0,
    roe: financial?.returnOnEquity
      ? financial.returnOnEquity * 100
      : 0,
    roce: 0,
    debtToEquity: debtToEquity ?? 0,
    freeCashFlow: financial?.freeCashflow ?? 0,
    peRatio: peRatio ?? 0,
    pbRatio: stats?.priceToBook ?? 0,
    dividendYield: 0,
    aiSummary: "",
    investmentThesis: "",
    riskAnalysis: risk.explanation,
    recentNews: [],
    potentialCatalysts: [],
    riskScore: risk.overallScore,
    confidenceScore: confidence.overallScore,
  };
}

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");
  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  const normalized = normalizeSymbol(symbol);
  const baseKey = symbol.toUpperCase().replace(".NS", "").replace(".BO", "");

  if (process.env.USE_MOCK_DATA === "true" && MOCK_STOCK_RESEARCH[baseKey]) {
    return NextResponse.json(MOCK_STOCK_RESEARCH[baseKey]);
  }

  try {
    const quoteData = await getStockQuote(normalized);

    if (!quoteData) {
      if (MOCK_STOCK_RESEARCH[baseKey]) {
        return NextResponse.json(MOCK_STOCK_RESEARCH[baseKey]);
      }
      return NextResponse.json(
        { error: "Could not fetch data for this symbol" },
        { status: 404 }
      );
    }

    let research = buildResearchFromQuote(normalized, quoteData);

    const aiAnalysis = await researchStock(normalized, {
      quote: quoteData.quote,
      summary: quoteData.summary,
    });

    if (aiAnalysis) {
      research = { ...research, ...aiAnalysis };
    }

    return NextResponse.json(research);
  } catch (error) {
    console.error("Research API error:", error);
    if (MOCK_STOCK_RESEARCH[baseKey]) {
      return NextResponse.json(MOCK_STOCK_RESEARCH[baseKey]);
    }
    return NextResponse.json(
      { error: "Failed to research stock" },
      { status: 500 }
    );
  }
}
