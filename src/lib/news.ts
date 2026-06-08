import Parser from "rss-parser";
import type { NewsArticle } from "@/types";
import { MOCK_NEWS } from "./mock-data";
import { analyzeNewsArticle } from "./ai";
import { analyzeNewsFree } from "./news-analyzer";
import { fetchYahooFinanceNews } from "./yahoo-news";
import { generateId } from "./utils";
import { getCached, setCache } from "./db";

const parser = new Parser();

const RSS_FEEDS = [
  "https://news.google.com/rss/search?q=india+stock+market+finance&hl=en-IN&gl=IN&ceid=IN:en",
  "https://news.google.com/rss/search?q=india+economy+policy&hl=en-IN&gl=IN&ceid=IN:en",
];

async function fetchRssFeed(url: string): Promise<NewsArticle[]> {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items ?? []).slice(0, 5).map((item) => ({
      id: generateId(),
      title: item.title ?? "Untitled",
      link: item.link ?? "#",
      source: item.creator ?? feed.title ?? "Google News",
      publishedAt: item.isoDate ?? new Date().toISOString(),
      summary: item.contentSnippet ?? item.content?.slice(0, 300) ?? "",
    }));
  } catch (error) {
    console.error(`RSS fetch failed for ${url}:`, error);
    return [];
  }
}

async function analyzeArticle(title: string, summary: string) {
  // Try OpenAI only if key is set; otherwise use free rule-based analysis
  const aiResult = await analyzeNewsArticle(title, summary);
  if (aiResult && process.env.OPENAI_API_KEY && process.env.USE_MOCK_DATA !== "true") {
    return aiResult;
  }
  return analyzeNewsFree(title, summary);
}

export async function fetchNews(): Promise<{
  articles: NewsArticle[];
  source: "live" | "mock";
}> {
  const cached = getCached<NewsArticle[]>("news_articles");
  if (cached) return { articles: cached, source: "live" };

  if (process.env.USE_MOCK_DATA === "true") {
    return { articles: MOCK_NEWS, source: "mock" };
  }

  try {
    const [yahooNews, ...rssResults] = await Promise.all([
      fetchYahooFinanceNews(),
      ...RSS_FEEDS.map(fetchRssFeed),
    ]);

    const allArticles = [yahooNews, ...rssResults].flat();

    const uniqueArticles = Array.from(
      new Map(allArticles.map((a) => [a.title, a])).values()
    ).slice(0, 12);

    if (uniqueArticles.length === 0) {
      return { articles: MOCK_NEWS, source: "mock" };
    }

    const analyzed = await Promise.all(
      uniqueArticles.slice(0, 8).map(async (article) => {
        const analysis = await analyzeArticle(
          article.title,
          article.summary ?? article.title
        );
        return { ...article, analysis };
      })
    );

    setCache("news_articles", analyzed, 30);
    return { articles: analyzed, source: "live" };
  } catch (error) {
    console.error("News fetch failed:", error);
    return { articles: MOCK_NEWS, source: "mock" };
  }
}
