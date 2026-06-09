"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DailyMemo } from "@/types/analytics";
import { FileText, AlertTriangle, TrendingUp, Newspaper } from "lucide-react";

export function DailyMemoCard({ memo }: { memo: DailyMemo }) {
  return (
    <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-400" />
          <CardTitle className="text-lg">Daily Investment Memo</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">{memo.date}</p>
        <p className="text-sm font-medium text-emerald-400 mt-2">{memo.headline}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1">Yesterday</p>
          <p className="text-sm leading-relaxed">{memo.yesterdaySummary}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold flex items-center gap-1 mb-2">
              <Newspaper className="h-3 w-3" /> Key News
            </p>
            <ul className="space-y-1">
              {memo.topNews.map((n, i) => (
                <li key={i} className="text-xs text-muted-foreground">• {n}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold flex items-center gap-1 mb-2">
              <TrendingUp className="h-3 w-3" /> Emerging Themes
            </p>
            <div className="flex flex-wrap gap-1">
              {memo.emergingThemes.map((t) => (
                <Badge key={t} variant="success" className="text-xs">{t}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold flex items-center gap-1 mb-2">
            <AlertTriangle className="h-3 w-3 text-amber-400" /> Top Risks
          </p>
          <ul className="space-y-1">
            {memo.topRisks.map((r, i) => (
              <li key={i} className="text-xs text-muted-foreground">• {r}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-muted/40 p-3">
          <p className="text-xs leading-relaxed whitespace-pre-line">{memo.fullMemo}</p>
        </div>
      </CardContent>
    </Card>
  );
}
