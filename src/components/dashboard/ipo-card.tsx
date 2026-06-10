"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UpcomingIpo } from "@/types/ipo";
import { getScoreColor } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Scale,
} from "lucide-react";

const VERDICT_STYLES: Record<
  UpcomingIpo["verdict"],
  { variant: "success" | "danger" | "warning" | "secondary"; icon: typeof CheckCircle2 }
> = {
  Subscribe: { variant: "success", icon: CheckCircle2 },
  Avoid: { variant: "danger", icon: XCircle },
  Neutral: { variant: "warning", icon: Scale },
  "Listing Gains Only": { variant: "secondary", icon: AlertTriangle },
};

export function IpoCard({ ipo }: { ipo: UpcomingIpo }) {
  const style = VERDICT_STYLES[ipo.verdict];
  const VerdictIcon = style.icon;

  return (
    <Card className="bg-card/50">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-base">{ipo.companyName}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">{ipo.sector}</Badge>
              <Badge variant="secondary">{ipo.status}</Badge>
              {ipo.expectedOpenDate && (
                <Badge variant="outline" className="text-muted-foreground">
                  {ipo.expectedOpenDate}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <Badge variant={style.variant} className="flex items-center gap-1">
              <VerdictIcon className="h-3 w-3" />
              {ipo.verdict}
            </Badge>
            <p className={`text-sm font-semibold ${ipo.worthInvesting ? "text-emerald-400" : "text-red-400"}`}>
              {ipo.worthInvesting ? "Worth considering" : "Not recommended"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {(ipo.priceBandMin || ipo.issueSizeCr) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            {ipo.priceBandMin && ipo.priceBandMax ? (
              <div>
                <p className="text-xs text-muted-foreground">Price Band</p>
                <p className="font-medium">₹{ipo.priceBandMin}–{ipo.priceBandMax}</p>
              </div>
            ) : null}
            {ipo.issueSizeCr ? (
              <div>
                <p className="text-xs text-muted-foreground">Issue Size</p>
                <p className="font-medium">₹{ipo.issueSizeCr.toLocaleString("en-IN")} Cr</p>
              </div>
            ) : null}
            {ipo.lotSize ? (
              <div>
                <p className="text-xs text-muted-foreground">Lot Size</p>
                <p className="font-medium">{ipo.lotSize} shares</p>
              </div>
            ) : null}
            {ipo.greyMarketPremium != null ? (
              <div>
                <p className="text-xs text-muted-foreground">GMP</p>
                <p className={`font-medium ${ipo.greyMarketPremium >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {ipo.greyMarketPremium >= 0 ? "+" : ""}{ipo.greyMarketPremium}%
                </p>
              </div>
            ) : null}
          </div>
        )}

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <p className="text-xs font-semibold text-amber-400 mb-1">Honest Take</p>
          <p className="text-sm leading-relaxed">{ipo.honestTake}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-400" /> Upside
            </p>
            <p className="text-lg font-bold text-emerald-400">
              {ipo.upsideMin}–{ipo.upsideMax}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <TrendingDown className="h-3 w-3 text-red-400" /> Downside
            </p>
            <p className="text-lg font-bold text-red-400">
              {ipo.downsideMin}–{ipo.downsideMax}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Risk</p>
            <p className={`text-lg font-bold ${getScoreColor(ipo.riskScore, true)}`}>{ipo.riskScore}%</p>
            <Progress value={ipo.riskScore} className="h-1 mt-1" indicatorClassName="bg-amber-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Confidence</p>
            <p className={`text-lg font-bold ${getScoreColor(ipo.confidenceScore)}`}>{ipo.confidenceScore}%</p>
            <Progress value={ipo.confidenceScore} className="h-1 mt-1" indicatorClassName="bg-emerald-500" />
          </div>
        </div>

        <Tabs defaultValue="verdict" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-8">
            <TabsTrigger value="verdict" className="text-xs">Verdict</TabsTrigger>
            <TabsTrigger value="cases" className="text-xs">Bull / Bear</TabsTrigger>
            <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="verdict" className="space-y-3 mt-3">
            {ipo.whySubscribe && ipo.whySubscribe.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-emerald-400 mb-1">Why subscribe</p>
                <ul className="space-y-1">
                  {ipo.whySubscribe.map((r, i) => (
                    <li key={i} className="text-xs flex gap-2">
                      <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {ipo.whyAvoid && ipo.whyAvoid.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-red-400 mb-1">Why avoid</p>
                <ul className="space-y-1">
                  {ipo.whyAvoid.map((r, i) => (
                    <li key={i} className="text-xs flex gap-2">
                      <XCircle className="h-3 w-3 text-red-400 shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          <TabsContent value="cases" className="space-y-3 mt-3 text-xs">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
              <p className="font-semibold text-emerald-400 mb-1">Bull case</p>
              <p className="text-muted-foreground">{ipo.bullCase}</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
              <p className="font-semibold text-red-400 mb-1">Bear case</p>
              <p className="text-muted-foreground">{ipo.bearCase}</p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="space-y-2 mt-3 text-xs">
            <p className="text-muted-foreground">{ipo.businessSummary}</p>
            <div className="grid gap-2 sm:grid-cols-2 pt-2">
              <div>
                <p className="font-medium">Listing gain potential</p>
                <p className="text-muted-foreground">{ipo.listingGainPotential}</p>
              </div>
              <div>
                <p className="font-medium">Long-term potential</p>
                <p className="text-muted-foreground">{ipo.longTermPotential}</p>
              </div>
            </div>
            {ipo.peerComparison && (
              <p className="text-muted-foreground pt-1">
                <span className="font-medium text-foreground">Peers: </span>
                {ipo.peerComparison}
              </p>
            )}
            {ipo.leadManagers.length > 0 && (
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Lead managers: </span>
                {ipo.leadManagers.join(", ")}
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
