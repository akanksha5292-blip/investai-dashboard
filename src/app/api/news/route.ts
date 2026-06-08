import { NextResponse } from "next/server";
import { fetchNews } from "@/lib/news";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await fetchNews();
    return NextResponse.json({
      articles: result.articles,
      source: result.source,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("News API error:", error);
    const { MOCK_NEWS } = await import("@/lib/mock-data");
    return NextResponse.json({
      articles: MOCK_NEWS,
      source: "mock",
      lastUpdated: new Date().toISOString(),
    });
  }
}
