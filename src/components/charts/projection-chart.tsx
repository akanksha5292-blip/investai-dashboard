"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { ProjectionPoint } from "@/types";

interface ProjectionChartProps {
  data: ProjectionPoint[];
}

function formatINR(value: number) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${(value / 1000).toFixed(0)}K`;
}

export function ProjectionChart({ data }: ProjectionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="conservative" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6b7280" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="moderate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="aggressive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis
          dataKey="age"
          tick={{ fill: "#888", fontSize: 12 }}
          label={{ value: "Age", position: "insideBottom", offset: -5, fill: "#888" }}
        />
        <YAxis tickFormatter={formatINR} tick={{ fill: "#888", fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) => [formatINR(value), ""]}
          labelFormatter={(age) => `Age ${age}`}
          contentStyle={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 8 }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="conservative"
          stroke="#6b7280"
          fill="url(#conservative)"
          name="Conservative"
        />
        <Area
          type="monotone"
          dataKey="moderate"
          stroke="#34d399"
          fill="url(#moderate)"
          name="Moderate"
        />
        <Area
          type="monotone"
          dataKey="aggressive"
          stroke="#f59e0b"
          fill="url(#aggressive)"
          name="Aggressive"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
