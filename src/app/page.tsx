"use client";

import { useEffect, useState, useCallback } from "react";
import { MarketOverview } from "@/components/dashboard/market-overview";
import { OpportunityCard } from "@/components/dashboard/opportunity-card";
import { NewsCard } from "@/components/dashboard/news-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardData, Opportunity } from "@/types";
import { addToWatchlist } from "@/lib/watchlist-client";
import { RefreshCw, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const url = isRefresh
        ? `/api/dashboard?refresh=true&t=${Date.now()}`
        : `/api/dashboard?t=${Date.now()}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleAddWatchlist = (opp: Opportunity) => {
    addToWatchlist({
      symbol: opp.symbol,
      name: opp.name,
      type: opp.type,
      theme: opp.theme,
      riskScore: opp.riskScore,
      confidenceScore: opp.confidenceScore,
      aiThesis: opp.investmentThesis,
      themeExposure: opp.beneficiarySectors,
    });
  };

  return (
    <div className="space-y-8 pt-12 lg:pt-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">Investment Intelligence</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered research to discover opportunities before they become mainstream
          </p>
        </div>
        <div className="flex items-center gap-3">
          {data && (
            <Badge variant={data.dataSource === "live" ? "success" : "warning"}>
              {data.dataSource === "live" ? "Live Data" : "Mock Data"}
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchDashboard(true)}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-4">Market Overview</h2>
        <MarketOverview
          data={data?.marketOverview ?? []}
          loading={loading}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Top Opportunities Today</h2>
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {data?.topOpportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onAddWatchlist={handleAddWatchlist}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Latest News Intelligence</h2>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {data?.newsArticles.slice(0, 3).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      {data?.lastUpdated && (
        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date(data.lastUpdated).toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-muted-foreground/70">
            Data refreshes daily at 4:00 AM IST · Click Refresh for latest
          </p>
        </div>
      )}
    </div>
  );
}
