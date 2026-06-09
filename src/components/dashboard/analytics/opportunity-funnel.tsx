"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FunnelStage } from "@/types/analytics";
import { Filter } from "lucide-react";

export function OpportunityFunnel({ stages }: { stages: FunnelStage[] }) {
  const max = stages[0]?.count ?? 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Filter className="h-4 w-4 text-emerald-400" />
          Opportunity Funnel
        </CardTitle>
        <p className="text-xs text-muted-foreground">How we narrow 5000+ stocks to top 10</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {stages.map((stage, i) => {
          const width = Math.max(20, (stage.count / max) * 100);
          return (
            <div key={stage.label} className="flex items-center gap-3">
              <div className="flex-1">
                <div
                  className="rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 transition-all"
                  style={{ width: `${width}%`, minWidth: 120 }}
                >
                  <p className="text-sm font-semibold">{stage.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{stage.label}</p>
                </div>
              </div>
              {i < stages.length - 1 && (
                <span className="text-muted-foreground text-lg">↓</span>
              )}
            </div>
          );
        })}
        <p className="text-xs text-muted-foreground pt-2">{stages[stages.length - 1]?.description}</p>
      </CardContent>
    </Card>
  );
}
