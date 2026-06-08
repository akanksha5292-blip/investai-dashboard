"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { Opportunity } from "@/types";
import { getScoreColor } from "@/lib/utils";
import { Star, ChevronRight } from "lucide-react";
import Link from "next/link";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onAddWatchlist?: (opp: Opportunity) => void;
}

export function OpportunityCard({ opportunity, onAddWatchlist }: OpportunityCardProps) {
  return (
    <Card className="group bg-card/50 backdrop-blur transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{opportunity.name}</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{opportunity.symbol}</p>
          </div>
          <div className="flex gap-1">
            <Badge variant="secondary">{opportunity.type === "stock" ? "Stock" : "MF"}</Badge>
            {onAddWatchlist && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onAddWatchlist(opportunity)}
              >
                <Star className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
        <Badge variant="outline" className="w-fit mt-2 text-emerald-400 border-emerald-500/30">
          {opportunity.theme}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Confidence</p>
            <p className={`text-lg font-bold ${getScoreColor(opportunity.confidenceScore)}`}>
              {opportunity.confidenceScore}%
            </p>
            <Progress
              value={opportunity.confidenceScore}
              className="mt-1 h-1"
              indicatorClassName="bg-emerald-500"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Risk</p>
            <p className={`text-lg font-bold ${getScoreColor(opportunity.riskScore, true)}`}>
              {opportunity.riskScore}%
            </p>
            <Progress
              value={opportunity.riskScore}
              className="mt-1 h-1"
              indicatorClassName="bg-amber-500"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Upside</p>
            <p className="text-lg font-bold text-emerald-400">
              {opportunity.potentialUpsideMin}–{opportunity.potentialUpsideMax}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">{opportunity.timeHorizon}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Why It Matters</p>
          <p className="text-sm leading-relaxed">{opportunity.whyItMatters}</p>
        </div>

        <Link
          href={`/opportunities?id=${opportunity.id}`}
          className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          View full analysis <ChevronRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}
