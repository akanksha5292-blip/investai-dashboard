import { NextResponse } from "next/server";
import { fetchNews } from "@/lib/news";
import { generateOpportunitiesFromNews } from "@/lib/ai";
import { MOCK_OPPORTUNITIES } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const news = await fetchNews();
    const newsForOpps = news.articles.map((a) => ({
      title: a.title,
      summary: a.summary ?? a.title,
    }));

    const opportunities =
      (await generateOpportunitiesFromNews(newsForOpps)) ?? MOCK_OPPORTUNITIES;

    return NextResponse.json({
      opportunities,
      source: news.source,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Opportunities API error:", error);
    return NextResponse.json({
      opportunities: MOCK_OPPORTUNITIES,
      source: "mock",
      lastUpdated: new Date().toISOString(),
    });
  }
}
