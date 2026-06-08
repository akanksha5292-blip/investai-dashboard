import { NextResponse } from "next/server";
import { getMarketOverview } from "@/lib/market";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await getMarketOverview();
    return NextResponse.json({
      data: result.data,
      source: result.source,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Market API error:", error);
    const { MOCK_MARKET_DATA } = await import("@/lib/mock-data");
    return NextResponse.json({
      data: MOCK_MARKET_DATA,
      source: "mock",
      lastUpdated: new Date().toISOString(),
    });
  }
}
