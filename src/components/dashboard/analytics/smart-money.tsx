"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AnalyticsData } from "@/types/analytics";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export function SmartMoneyTracker({ data }: { data: AnalyticsData["smartMoney"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Wallet className="h-4 w-4 text-emerald-400" />
          Smart Money Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {data.flows.map((f) => (
            <div key={f.category} className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">{f.category}</p>
              <div className="flex items-center justify-between mt-1">
                <span className={`text-lg font-bold ${f.netFlow >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {f.netFlow >= 0 ? "+" : ""}₹{Math.abs(f.netFlow)} Cr
                </span>
                <Badge variant={f.trend === "inflow" ? "success" : f.trend === "outflow" ? "danger" : "secondary"}>
                  {f.changePercent > 0 ? "+" : ""}{f.changePercent}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold flex items-center gap-1 mb-2 text-emerald-400">
              <TrendingUp className="h-3 w-3" /> Most Accumulated
            </p>
            {data.accumulated.map((s) => (
              <div key={s.symbol} className="flex justify-between text-sm py-1">
                <span>{s.name}</span>
                <span className="text-emerald-400">+₹{s.netFlow} Cr</span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold flex items-center gap-1 mb-2 text-red-400">
              <TrendingDown className="h-3 w-3" /> Most Sold
            </p>
            {data.sold.map((s) => (
              <div key={s.symbol} className="flex justify-between text-sm py-1">
                <span>{s.name}</span>
                <span className="text-red-400">₹{s.netFlow} Cr</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
