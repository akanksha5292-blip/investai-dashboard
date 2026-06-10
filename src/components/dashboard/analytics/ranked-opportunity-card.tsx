"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { RankedOpportunity } from "@/types/analytics";
import { convictionLabel } from "@/lib/analytics/engine";
import { getScoreColor, formatCurrency } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertTriangle, Briefcase } from "lucide-react";

export function RankedOpportunityCard({ opp, rank }: { opp: RankedOpportunity; rank: number }) {
  const conviction = convictionLabel(opp.convictionScore);

  return (
    <Card className="bg-card/50">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400">#{rank}</span>
              <CardTitle className="text-sm">{opp.name}</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">{opp.symbol}</p>
            <Badge variant="outline" className="w-fit mt-1 text-xs border-emerald-500/30 text-emerald-400">
              {opp.sector}
            </Badge>
          </div>
          <Badge
            variant={
              conviction === "Exceptional" || conviction === "High Conviction"
                ? "success"
                : conviction === "Watchlist"
                  ? "warning"
                  : "danger"
            }
          >
            {conviction}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div>
            <p className="text-muted-foreground">Conviction</p>
            <p className={`font-bold ${getScoreColor(opp.convictionScore)}`}>{opp.convictionScore}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Risk</p>
            <p className={`font-bold ${getScoreColor(opp.riskScore, true)}`}>{opp.riskScore}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Upside</p>
            <p className="font-bold text-emerald-400">{opp.potentialUpsideMin}–{opp.potentialUpsideMax}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Risk-Adj</p>
            <p className="font-bold text-emerald-400">{opp.riskAdjustedReturn}</p>
          </div>
        </div>

        {opp.currentPrice ? (
          <p className="text-xs text-muted-foreground">
            Price: {formatCurrency(opp.currentPrice, opp.currency)} · {opp.timeHorizon}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">{opp.timeHorizon}</p>
        )}

        <Tabs defaultValue="thesis" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-8">
            <TabsTrigger value="thesis" className="text-xs">Thesis</TabsTrigger>
            <TabsTrigger value="scorecard" className="text-xs">Score</TabsTrigger>
            <TabsTrigger value="fm" className="text-xs">Fund Mgr</TabsTrigger>
          </TabsList>
          <TabsContent value="thesis" className="space-y-2 mt-2">
            <p className="text-xs">{opp.investmentThesis}</p>
            <div className="space-y-1">
              <p className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Why Now
              </p>
              {opp.whyNow.slice(0, 2).map((w, i) => (
                <p key={i} className="text-xs text-muted-foreground">• {w}</p>
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-red-400 flex items-center gap-1">
                <XCircle className="h-3 w-3" /> Why This Could Fail
              </p>
              {opp.whyCouldFail.slice(0, 2).map((w, i) => (
                <p key={i} className="text-xs text-muted-foreground">• {w}</p>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="scorecard" className="mt-2 space-y-1">
            {Object.entries({
              Business: opp.scorecard.businessQuality,
              Valuation: opp.scorecard.valuation,
              Growth: opp.scorecard.growth,
              Momentum: opp.scorecard.momentum,
              Management: opp.scorecard.management,
            }).map(([k, v]) => (
              <div key={k}>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{k}</span>
                  <span>{v}</span>
                </div>
                <Progress value={v} className="h-1" indicatorClassName="bg-emerald-500" />
              </div>
            ))}
            <p className="text-xs font-bold pt-1">
              Overall: {opp.scorecard.overall}/100 — {opp.scorecard.rating}
            </p>
          </TabsContent>
          <TabsContent value="fm" className="mt-2 space-y-2 text-xs">
            <div>
              <p className="font-medium flex items-center gap-1 text-emerald-400">
                <Briefcase className="h-3 w-3" /> Why a pro would buy
              </p>
              <p className="text-muted-foreground mt-1">{opp.fundManagerView.whyBuy}</p>
            </div>
            <div>
              <p className="font-medium flex items-center gap-1 text-red-400">
                <AlertTriangle className="h-3 w-3" /> Why a pro would avoid
              </p>
              <p className="text-muted-foreground mt-1">{opp.fundManagerView.whyAvoid}</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
