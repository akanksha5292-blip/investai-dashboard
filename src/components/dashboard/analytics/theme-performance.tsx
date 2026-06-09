"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ThemePerformance } from "@/types/analytics";
import { Layers } from "lucide-react";

export function ThemePerformanceGrid({ data }: { data: ThemePerformance[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Layers className="h-4 w-4 text-emerald-400" />
          Theme Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((t) => (
            <div key={t.theme} className="rounded-lg border border-border p-3 space-y-2">
              <p className="font-semibold text-sm">{t.theme}</p>
              {[
                { label: "Theme", value: t.themeScore, color: "bg-emerald-500" },
                { label: "Momentum", value: t.momentumScore, color: "bg-blue-500" },
                { label: "Risk", value: t.riskScore, color: "bg-amber-500" },
                { label: "News", value: t.newsVolume, color: "bg-purple-500" },
                { label: "Institutional", value: t.institutionalInterest, color: "bg-cyan-500" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{m.label}</span>
                    <span>{m.value}</span>
                  </div>
                  <Progress value={m.value} className="h-1 mt-0.5" indicatorClassName={m.color} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
