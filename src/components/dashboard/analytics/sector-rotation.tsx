"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AnalyticsData } from "@/types/analytics";
import { ArrowRight, RefreshCw } from "lucide-react";

export function SectorRotation({ data }: { data: AnalyticsData["sectorRotation"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-emerald-400" />
          Sector Rotation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {data.rotations.map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-sm rounded-lg border border-border p-3">
              <span className="text-red-400">{r.from}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-emerald-400">{r.to}</span>
              <Badge variant="secondary" className="ml-auto">{r.strength}%</Badge>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-emerald-400 mb-2">Emerging Sectors</p>
            <div className="flex flex-wrap gap-1">
              {data.emerging.map((s) => (
                <Badge key={s} variant="success" className="text-xs">{s}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-400 mb-2">Cooling Sectors</p>
            <div className="flex flex-wrap gap-1">
              {data.cooling.map((s) => (
                <Badge key={s} variant="danger" className="text-xs">{s}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
