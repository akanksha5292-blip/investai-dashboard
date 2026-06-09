import { NextRequest, NextResponse } from "next/server";
import { fetchNews } from "@/lib/news";

export const dynamic = "force-dynamic";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

export async function GET(request: NextRequest) {
  const forceRefresh = request.nextUrl.searchParams.get("refresh") === "true";

  try {
    const result = await fetchNews(forceRefresh);
    return NextResponse.json(
      {
        articles: result.articles,
        source: result.source,
        lastUpdated: new Date().toISOString(),
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    console.error("News API error:", error);
    const { MOCK_NEWS } = await import("@/lib/mock-data");
    return NextResponse.json(
      {
        articles: MOCK_NEWS,
        source: "mock",
        lastUpdated: new Date().toISOString(),
      },
      { headers: NO_CACHE_HEADERS }
    );
  }
}
