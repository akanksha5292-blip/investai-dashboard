"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { MarketIndex } from "@/types";
import { formatCurrency, formatPercent, getChangeColor } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MarketOverviewProps {
  data: MarketIndex[];
  loading?: boolean;
}

function ChangeIcon({ value }: { value: number }) {
  if (value > 0) return <TrendingUp className="h-3 w-3" />;
  if (value < 0) return <TrendingDown className="h-3 w-3" />;
  return <Minus className="h-3 w-3" />;
}

export function MarketOverview({ data, loading }: MarketOverviewProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {Array.from({ length: 7 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-3 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {data.map((index) => (
        <Card key={index.symbol} className="bg-card/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {index.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold tabular-nums">
              {index.name === "USD/INR"
                ? index.value.toFixed(2)
                : formatCurrency(index.value, index.currency).replace(/\.00$/, "")}
            </p>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <span className={`flex items-center gap-0.5 ${getChangeColor(index.dailyChangePercent)}`}>
                <ChangeIcon value={index.dailyChangePercent} />
                {formatPercent(index.dailyChangePercent)}
              </span>
              <span className="text-muted-foreground">1D</span>
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-xs">
              <span className={`flex items-center gap-0.5 ${getChangeColor(index.weeklyChangePercent)}`}>
                <ChangeIcon value={index.weeklyChangePercent} />
                {formatPercent(index.weeklyChangePercent)}
              </span>
              <span className="text-muted-foreground">1W</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
