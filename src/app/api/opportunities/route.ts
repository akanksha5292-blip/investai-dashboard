import { NextResponse } from "next/server";
import { fetchNews } from "@/lib/news";
import { generateOpportunitiesFromNews } from "@/lib/ai";
import { getDiversifiedOpportunities } from "@/lib/diversified-opportunities";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const news = await fetchNews();
    const newsForOpps = news.articles.map((a) => ({
      title: a.title,
      summary: a.summary ?? a.title,
    }));

    const aiOpportunities = await generateOpportunitiesFromNews(newsForOpps);
    const opportunities = getDiversifiedOpportunities(aiOpportunities ?? []);

    return NextResponse.json({
      opportunities,
      source: news.source,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Opportunities API error:", error);
    return NextResponse.json({
      opportunities: getDiversifiedOpportunities(),
      source: "mock",
      lastUpdated: new Date().toISOString(),
    });
  }
}
