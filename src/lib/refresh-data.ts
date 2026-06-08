import { getMarketOverview } from "./market";
import { fetchNews } from "./news";
import { generateOpportunitiesFromNews } from "./ai";
import { MOCK_OPPORTUNITIES } from "./mock-data";
import { clearCache, setCache } from "./cache";

export async function refreshAllData() {
  clearCache();

  const [market, news] = await Promise.all([
    getMarketOverview(),
    fetchNews(),
  ]);

  const newsForOpps = news.articles.map((a) => ({
    title: a.title,
    summary: a.summary ?? a.title,
  }));

  const opportunities =
    (await generateOpportunitiesFromNews(newsForOpps)) ?? MOCK_OPPORTUNITIES;

  const dataSource =
    market.source === "mock" && news.source === "mock" ? "mock" : "live";

  const result = {
    marketOverview: market.data,
    topOpportunities: opportunities.slice(0, 6),
    newsArticles: news.articles,
    lastUpdated: new Date().toISOString(),
    dataSource,
  };

  // Cache until next daily refresh (24 hours)
  setCache("dashboard_full", result, 24 * 60);
  setCache("market_overview", market.data, 24 * 60);
  setCache("news_articles", news.articles, 24 * 60);

  return {
    success: true,
    refreshedAt: result.lastUpdated,
    dataSource: result.dataSource,
    marketCount: market.data.length,
    newsCount: news.articles.length,
    opportunityCount: opportunities.length,
  };
}
