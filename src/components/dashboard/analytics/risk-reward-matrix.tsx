"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RiskRewardPoint } from "@/types/analytics";
import { Target } from "lucide-react";

const QUADRANT_COLORS: Record<string, string> = {
  "low-high": "#34d399",
  "low-low": "#6b7280",
  "high-high": "#f59e0b",
  "high-low": "#ef4444",
};

export function RiskRewardMatrix({ data }: { data: RiskRewardPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Target className="h-4 w-4 text-emerald-400" />
          Risk vs Reward Matrix
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Green = low risk, high reward · Ranked by risk-adjusted return
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              type="number"
              dataKey="risk"
              name="Risk"
              domain={[0, 100]}
              label={{ value: "Risk Score", position: "bottom", fill: "#888" }}
              tick={{ fill: "#888", fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="upside"
              name="Upside %"
              domain={[0, "auto"]}
              label={{ value: "Potential Upside %", angle: -90, position: "insideLeft", fill: "#888" }}
              tick={{ fill: "#888", fontSize: 11 }}
            />
            <ReferenceLine x={50} stroke="#555" strokeDasharray="3 3" />
            <ReferenceLine y={20} stroke="#555" strokeDasharray="3 3" />
            <Tooltip
              content={({ payload }) => {
                if (!payload?.[0]) return null;
                const d = payload[0].payload as RiskRewardPoint;
                return (
                  <div className="rounded-lg border border-border bg-card p-2 text-xs">
                    <p className="font-semibold">{d.name}</p>
                    <p>Risk: {d.risk} · Upside: {d.upside.toFixed(1)}%</p>
                    <p className="text-emerald-400">Risk-Adj: {d.riskAdjustedReturn}</p>
                  </div>
                );
              }}
            />
            <Scatter data={data} fill="#34d399">
              {data.map((entry, i) => (
                <Cell key={i} fill={QUADRANT_COLORS[entry.quadrant] ?? "#888"} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
          <span className="text-emerald-400">● Low Risk, High Reward</span>
          <span className="text-amber-400">● High Risk, High Reward</span>
          <span className="text-gray-400">● Low Risk, Low Reward</span>
          <span className="text-red-400">● High Risk, Low Reward</span>
        </div>
      </CardContent>
    </Card>
  );
}
