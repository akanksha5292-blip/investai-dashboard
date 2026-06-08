"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eli15Tooltip } from "@/components/dashboard/eli15-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import type { StockResearch } from "@/types";
import { formatCurrency, getScoreColor } from "@/lib/utils";
import { Search, TrendingUp, AlertTriangle } from "lucide-react";

export default function ResearchPage() {
  const [symbol, setSymbol] = useState("");
  const [research, setResearch] = useState<StockResearch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol.trim()) return;

    setLoading(true);
    setError("");
    setResearch(null);

    try {
      const res = await fetch(`/api/research?symbol=${encodeURIComponent(symbol.trim())}`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to fetch research");
        return;
      }
      const data = await res.json();
      setResearch(data);
    } catch {
      setError("Failed to fetch research data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      <div>
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-emerald-400" />
          <h1 className="text-2xl font-bold">AI Research</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Deep-dive analysis on any stock with AI-powered insights
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3">
        <Input
          placeholder="Enter stock symbol (e.g., POLYCAB, RELIANCE, TCS)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="max-w-md"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Research"}
        </Button>
      </form>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      )}

      {research && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle className="text-xl">{research.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{research.symbol} · {research.sector}</p>
                  <p className="text-2xl font-bold mt-2">
                    {formatCurrency(research.currentPrice, research.currency)}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className={`text-xl font-bold ${getScoreColor(research.confidenceScore)}`}>
                      {research.confidenceScore}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Risk</p>
                    <p className={`text-xl font-bold ${getScoreColor(research.riskScore, true)}`}>
                      {research.riskScore}%
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{research.businessSummary}</p>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Revenue Growth", value: `${research.revenueGrowth.toFixed(1)}%`, term: "Revenue Growth" },
              { label: "Profit Growth", value: `${research.profitGrowth.toFixed(1)}%`, term: "Profit Growth" },
              { label: "ROE", value: `${research.roe.toFixed(1)}%`, term: "ROE" },
              { label: "ROCE", value: `${research.roce.toFixed(1)}%`, term: "ROCE" },
              { label: "Debt/Equity", value: research.debtToEquity.toFixed(2), term: "Debt-to-Equity" },
              { label: "Free Cash Flow", value: formatCurrency(research.freeCashFlow, research.currency), term: "Free Cash Flow" },
              { label: "P/E Ratio", value: research.peRatio.toFixed(1), term: "P/E Ratio" },
              { label: "P/B Ratio", value: research.pbRatio.toFixed(1), term: "Market Cap" },
            ].map((metric) => (
              <Card key={metric.label}>
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground">
                    <Eli15Tooltip term={metric.term}>{metric.label}</Eli15Tooltip>
                  </p>
                  <p className="text-lg font-bold mt-1">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {research.aiSummary && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{research.aiSummary}</p>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  Investment Thesis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{research.investmentThesis}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  Risk Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{research.riskAnalysis}</p>
              </CardContent>
            </Card>
          </div>

          {research.potentialCatalysts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Potential Catalysts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {research.potentialCatalysts.map((catalyst) => (
                    <Badge key={catalyst} variant="outline" className="text-emerald-400 border-emerald-500/30">
                      {catalyst}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Confidence Score</p>
              <Progress value={research.confidenceScore} className="h-2" indicatorClassName="bg-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
              <Progress value={research.riskScore} className="h-2" indicatorClassName="bg-amber-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
