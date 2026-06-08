"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectionChart } from "@/components/charts/projection-chart";
import { Skeleton } from "@/components/ui/skeleton";
import type { ChildFundResult } from "@/types";
import { Baby, Calculator } from "lucide-react";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ChildFundPage() {
  const [childName, setChildName] = useState("");
  const [currentAge, setCurrentAge] = useState("5");
  const [monthlyInvestment, setMonthlyInvestment] = useState("10000");
  const [targetAge, setTargetAge] = useState("18");
  const [riskAppetite, setRiskAppetite] = useState<"conservative" | "moderate" | "aggressive">("moderate");
  const [result, setResult] = useState<ChildFundResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/child-fund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName,
          currentAge: Number(currentAge),
          monthlyInvestment: Number(monthlyInvestment),
          targetAge: Number(targetAge),
          riskAppetite,
        }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      <div>
        <div className="flex items-center gap-2">
          <Baby className="h-5 w-5 text-emerald-400" />
          <h1 className="text-2xl font-bold">Child Future Fund</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Plan your child&apos;s financial future with AI-recommended portfolios and projections
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Plan Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="childName">Child&apos;s Name</Label>
                <Input
                  id="childName"
                  placeholder="Enter name"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentAge">Current Age</Label>
                  <Input
                    id="currentAge"
                    type="number"
                    min={0}
                    max={17}
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAge">Target Age</Label>
                  <Input
                    id="targetAge"
                    type="number"
                    min={18}
                    max={30}
                    value={targetAge}
                    onChange={(e) => setTargetAge(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly">Monthly Investment (₹)</Label>
                <Input
                  id="monthly"
                  type="number"
                  min={1000}
                  step={1000}
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Risk Appetite</Label>
                <Select value={riskAppetite} onValueChange={(v) => setRiskAppetite(v as typeof riskAppetite)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Calculating..." : "Generate Plan"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {loading && <Skeleton className="h-96 rounded-xl" />}

        {result && !loading && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Projected Corpus for {result.childName}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {result.yearsToInvest} years of investing · {riskAppetite} profile
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-emerald-400">
                  {formatINR(result.projectedCorpus)}
                </p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Conservative</p>
                    <p className="text-sm font-semibold">{formatINR(result.conservativeScenario)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Moderate</p>
                    <p className="text-sm font-semibold text-emerald-400">{formatINR(result.moderateScenario)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Aggressive</p>
                    <p className="text-sm font-semibold">{formatINR(result.aggressiveScenario)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recommended Portfolio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.recommendedPortfolio.map((alloc) => (
                  <div key={alloc.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="text-sm font-medium">{alloc.name}</p>
                      <p className="text-xs text-muted-foreground">{alloc.funds.join(", ")}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{alloc.allocation}%</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{alloc.expectedReturn}% p.a.</p>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                  {result.explanation}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Growth Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectionChart data={result.projectionData} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
