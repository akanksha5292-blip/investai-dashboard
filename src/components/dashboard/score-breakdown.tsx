"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { RiskBreakdown, ConfidenceBreakdown } from "@/types";

interface ScoreBreakdownProps {
  title: string;
  type: "risk" | "confidence";
  data: RiskBreakdown | ConfidenceBreakdown;
}

const RISK_LABELS: Record<string, string> = {
  valuationRisk: "Valuation Risk",
  debtRisk: "Debt Risk",
  businessRisk: "Business Risk",
  regulatoryRisk: "Regulatory Risk",
  sectorRisk: "Sector Risk",
  executionRisk: "Execution Risk",
};

const CONFIDENCE_LABELS: Record<string, string> = {
  newsVolume: "News Volume",
  earningsQuality: "Earnings Quality",
  sectorMomentum: "Sector Momentum",
  institutionalInterest: "Institutional Interest",
  valuationAttractiveness: "Valuation Attractiveness",
  historicalThemeSuccess: "Historical Theme Success",
};

export function ScoreBreakdown({ title, type, data }: ScoreBreakdownProps) {
  const labels = type === "risk" ? RISK_LABELS : CONFIDENCE_LABELS;
  const entries = Object.entries(labels);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between">
          {title}
          <span className={`text-2xl font-bold ${type === "risk" ? "text-amber-400" : "text-emerald-400"}`}>
            {data.overallScore}{type === "confidence" ? "%" : "/100"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {entries.map(([key, label]) => {
          const value = data[key as keyof typeof data] as number;
          return (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}{type === "confidence" ? "%" : ""}</span>
              </div>
              <Progress
                value={value}
                className="h-1.5"
                indicatorClassName={type === "risk" ? "bg-amber-500" : "bg-emerald-500"}
              />
            </div>
          );
        })}
        <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border">
          {data.explanation}
        </p>
      </CardContent>
    </Card>
  );
}
