"use client";

import { useEffect, useState, useCallback } from "react";
import { MarketOverview } from "@/components/dashboard/market-overview";
import { NewsCard } from "@/components/dashboard/news-card";
import { DailyMemoCard } from "@/components/dashboard/analytics/daily-memo";
import { MarketHeatmap } from "@/components/dashboard/analytics/market-heatmap";
import { SectorStrengthTable } from "@/components/dashboard/analytics/sector-strength";
import { SectorRotation } from "@/components/dashboard/analytics/sector-rotation";
import { RelativePerformanceTable } from "@/components/dashboard/analytics/relative-performance";
import { SmartMoneyTracker } from "@/components/dashboard/analytics/smart-money";
import { ThemePerformanceGrid } from "@/components/dashboard/analytics/theme-performance";
import { OpportunityFunnel } from "@/components/dashboard/analytics/opportunity-funnel";
import { RiskRewardMatrix } from "@/components/dashboard/analytics/risk-reward-matrix";
import { MarketBreadthCard } from "@/components/dashboard/analytics/market-breadth";
import { TopOpportunitiesSection } from "@/components/dashboard/analytics/top-opportunities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardData } from "@/types";
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

  const analytics = data?.analytics;

  return (
    <div className="space-y-8 pt-12 lg:pt-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">Investment Intelligence</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Ranked by risk-adjusted return — find the best opportunities, not the most speculative
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

      {loading ? (
        <Skeleton className="h-64 rounded-xl" />
      ) : analytics ? (
        <DailyMemoCard memo={analytics.dailyMemo} />
      ) : null}

      <section>
        <h2 className="text-lg font-semibold mb-4">Market Overview</h2>
        <MarketOverview data={data?.marketOverview ?? []} loading={loading} />
      </section>

      {analytics && (
        <>
          <MarketHeatmap data={analytics.heatmap} />

          <div className="grid gap-4 lg:grid-cols-2">
            <SectorStrengthTable
              data={analytics.sectorStrength}
              strongest={analytics.strongestSector}
              weakest={analytics.weakestSector}
            />
            <SectorRotation data={analytics.sectorRotation} />
          </div>

          <RelativePerformanceTable data={analytics.relativePerformance} />

          <div className="grid gap-4 lg:grid-cols-2">
            <SmartMoneyTracker data={analytics.smartMoney} />
            <MarketBreadthCard data={analytics.marketBreadth} />
          </div>

          <ThemePerformanceGrid data={analytics.themePerformance} />

          <div className="grid gap-4 lg:grid-cols-2">
            <OpportunityFunnel stages={analytics.opportunityFunnel} />
            <RiskRewardMatrix data={analytics.riskRewardMatrix} />
          </div>

          <TopOpportunitiesSection
            stocks={analytics.topStocks}
            funds={analytics.topFunds}
            themes={analytics.topThemes}
          />
        </>
      )}

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
