"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SectorStrength } from "@/types/analytics";
import { formatPercent, getChangeColor } from "@/lib/utils";
import { BarChart3 } from "lucide-react";

export function SectorStrengthTable({
  data,
  strongest,
  weakest,
}: {
  data: SectorStrength[];
  strongest: string;
  weakest: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-emerald-400" />
          Sector Strength Ranking
        </CardTitle>
        <div className="flex gap-2 mt-2">
          <Badge variant="success">Strongest: {strongest}</Badge>
          <Badge variant="danger">Weakest: {weakest}</Badge>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs">
              <th className="text-left py-2">Sector</th>
              <th className="text-right py-2">1D</th>
              <th className="text-right py-2">1W</th>
              <th className="text-right py-2">1M</th>
              <th className="text-right py-2">3M</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s) => (
              <tr key={s.sector} className="border-b border-border/50">
                <td className="py-2 font-medium">{s.sector}</td>
                {([s.return1D, s.return1W, s.return1M, s.return3M] as number[]).map((v, i) => (
                  <td key={i} className={`text-right py-2 ${getChangeColor(v)}`}>
                    {formatPercent(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
