import type { NewsArticle } from "@/types";
import { generateId } from "./utils";

interface YahooNewsItem {
  uuid?: string;
  title?: string;
  link?: string;
  publisher?: string;
  providerPublishTime?: number;
  summary?: string;
  relatedTickers?: string[];
}

interface YahooSearchResponse {
  news?: YahooNewsItem[];
}

async function fetchYahooNews(query: string, count = 8): Promise<NewsArticle[]> {
  try {
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&newsCount=${count}&quotesCount=0&enableFuzzyQuery=false`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; InvestAI/1.0)" },
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];

    const data = (await res.json()) as YahooSearchResponse;
    return (data.news ?? []).map((item) => ({
      id: item.uuid ?? generateId(),
      title: item.title ?? "Untitled",
      link: item.link ?? "#",
      source: item.publisher ?? "Yahoo Finance",
      publishedAt: item.providerPublishTime
        ? new Date(item.providerPublishTime * 1000).toISOString()
        : new Date().toISOString(),
      summary: item.summary ?? item.title ?? "",
    }));
  } catch (error) {
    console.error(`Yahoo news fetch failed for "${query}":`, error);
    return [];
  }
}

export async function fetchYahooFinanceNews(): Promise<NewsArticle[]> {
  const queries = [
    "india stock market",
    "nifty sensex",
    "india economy policy",
    "india infrastructure investment",
  ];

  const results = await Promise.all(queries.map((q) => fetchYahooNews(q, 5)));
  const all = results.flat();

  const unique = Array.from(
    new Map(all.map((a) => [a.title, a])).values()
  ).slice(0, 12);

  return unique;
}
