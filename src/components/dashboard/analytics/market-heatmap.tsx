"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HeatmapStock } from "@/types/analytics";
import { formatPercent } from "@/lib/utils";
import { Grid3X3 } from "lucide-react";

export function MarketHeatmap({ data }: { data: HeatmapStock[] }) {
  const maxCap = Math.max(...data.map((d) => d.marketCap));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Grid3X3 className="h-4 w-4 text-emerald-400" />
          Nifty 50 Heatmap
        </CardTitle>
        <p className="text-xs text-muted-foreground">Size = market cap · Color = daily change</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1">
          {data.map((stock) => {
            const size = Math.max(0.5, stock.marketCap / maxCap);
            const isPositive = stock.changePercent >= 0;
            const intensity = Math.min(Math.abs(stock.changePercent) / 3, 1);
            return (
              <div
                key={stock.symbol}
                title={`${stock.name}: ${formatPercent(stock.changePercent)}`}
                className="rounded px-2 py-1.5 text-center transition-transform hover:scale-105 cursor-default"
                style={{
                  flex: `${size} 1 80px`,
                  minWidth: 72,
                  backgroundColor: isPositive
                    ? `rgba(52, 211, 153, ${0.15 + intensity * 0.55})`
                    : `rgba(248, 113, 113, ${0.15 + intensity * 0.55})`,
                  fontSize: `${0.65 + size * 0.2}rem`,
                }}
              >
                <p className="font-semibold truncate">{stock.name}</p>
                <p className={`text-xs ${isPositive ? "text-emerald-300" : "text-red-300"}`}>
                  {formatPercent(stock.changePercent)}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
