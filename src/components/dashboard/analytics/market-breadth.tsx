"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MarketBreadth } from "@/types/analytics";
import { Activity } from "lucide-react";

export function MarketBreadthCard({ data }: { data: MarketBreadth }) {
  const total = data.advancing + data.declining + data.unchanged;
  const advPct = (data.advancing / total) * 100;
  const decPct = (data.declining / total) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            Market Breadth
          </CardTitle>
          <Badge variant={data.health === "bullish" ? "success" : data.health === "bearish" ? "danger" : "warning"}>
            {data.health}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-4 rounded-full overflow-hidden">
          <div className="bg-emerald-500" style={{ width: `${advPct}%` }} />
          <div className="bg-gray-600" style={{ width: `${(data.unchanged / total) * 100}%` }} />
          <div className="bg-red-500" style={{ width: `${decPct}%` }} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-emerald-400">{data.advancing}</p>
            <p className="text-xs text-muted-foreground">Advancing</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-400">{data.declining}</p>
            <p className="text-xs text-muted-foreground">Declining</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{data.advanceDeclineRatio.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">A/D Ratio</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-400">{data.newHighs}</p>
            <p className="text-xs text-muted-foreground">52W Highs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-400">{data.newLows}</p>
            <p className="text-xs text-muted-foreground">52W Lows</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-muted-foreground">{data.unchanged}</p>
            <p className="text-xs text-muted-foreground">Unchanged</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
