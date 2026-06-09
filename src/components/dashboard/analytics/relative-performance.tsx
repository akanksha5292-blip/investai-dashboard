"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RelativePerformance } from "@/types/analytics";
import { formatPercent, getChangeColor } from "@/lib/utils";
import { Globe } from "lucide-react";

export function RelativePerformanceTable({ data }: { data: RelativePerformance[] }) {
  const periods: (keyof RelativePerformance)[] = ["return1M", "return3M", "return6M", "return1Y", "return3Y"];
  const labels = ["1M", "3M", "6M", "1Y", "3Y"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Globe className="h-4 w-4 text-emerald-400" />
          Relative Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs">
              <th className="text-left py-2">Asset</th>
              {labels.map((l) => (
                <th key={l} className="text-right py-2">{l}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.name} className="border-b border-border/50">
                <td className="py-2 font-medium">{row.name}</td>
                {periods.map((p) => (
                  <td key={p} className={`text-right py-2 ${getChangeColor(row[p] as number)}`}>
                    {formatPercent(row[p] as number)}
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
