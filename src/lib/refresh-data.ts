import { getMarketOverview } from "./market";
import { fetchNews } from "./news";
import { generateOpportunitiesFromNews } from "./ai";
import { getDiversifiedOpportunities } from "./diversified-opportunities";
import { generateAnalytics } from "./analytics/engine";
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

  const aiOpportunities = await generateOpportunitiesFromNews(newsForOpps);
  const opportunities = getDiversifiedOpportunities(aiOpportunities ?? []);

  const analytics = await generateAnalytics(news.articles, opportunities);

  const dataSource =
    market.source === "mock" && news.source === "mock" ? "mock" : "live";

  const result = {
    marketOverview: market.data,
    topOpportunities: opportunities,
    newsArticles: news.articles,
    analytics,
    lastUpdated: new Date().toISOString(),
    dataSource,
  };

  setCache("dashboard_full", result, 24 * 60);
  setCache("market_overview", market.data, 24 * 60);
  setCache("news_articles", news.articles, 24 * 60);
  setCache("analytics", analytics, 24 * 60);

  return {
    success: true,
    refreshedAt: result.lastUpdated,
    dataSource: result.dataSource,
    marketCount: market.data.length,
    newsCount: news.articles.length,
    opportunityCount: opportunities.length,
  };
}
