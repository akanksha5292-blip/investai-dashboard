"use client";

import { useEffect, useState } from "react";
import { NewsCard } from "@/components/dashboard/news-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { NewsArticle } from "@/types";
import { Newspaper, RefreshCw } from "lucide-react";

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [source, setSource] = useState<"live" | "mock">("mock");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      const data = await res.json();
      setArticles(data.articles);
      setSource(data.source);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-emerald-400" />
            <h1 className="text-2xl font-bold">News Intelligence Engine</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            AI analyzes latest news to identify sector impacts and investment reasoning chains
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={source === "live" ? "success" : "warning"}>
            {source === "live" ? "Live" : "Mock"}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => fetchNews(true)} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
