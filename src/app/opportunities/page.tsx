"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreBreakdown } from "@/components/dashboard/score-breakdown";
import { Skeleton } from "@/components/ui/skeleton";
import type { Opportunity } from "@/types";
import { formatCurrency, getScoreColor } from "@/lib/utils";
import {
  Target,
  TrendingUp,
  AlertTriangle,
  XCircle,
  CheckCircle2,
} from "lucide-react";

function OpportunitiesContent() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Opportunity | null>(null);

  useEffect(() => {
    fetch("/api/opportunities")
      .then((r) => r.json())
      .then((data) => {
        setOpportunities(data.opportunities);
        if (selectedId) {
          const found = data.opportunities.find((o: Opportunity) => o.id === selectedId);
          setSelected(found ?? data.opportunities[0]);
        } else {
          setSelected(data.opportunities[0]);
        }
      })
      .finally(() => setLoading(false));
  }, [selectedId]);

  if (loading) {
    return (
      <div className="space-y-4 pt-12 lg:pt-0">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      <div>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-emerald-400" />
          <h1 className="text-2xl font-bold">Opportunity Discovery</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          AI converts news into actionable investment opportunities with full reasoning
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {opportunities.map((opp) => (
          <button
            key={opp.id}
            onClick={() => setSelected(opp)}
            className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
              selected?.id === opp.id
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                : "border-border hover:bg-accent"
            }`}
          >
            {opp.name}
          </button>
        ))}
      </div>

      {selected && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle className="text-xl">{selected.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selected.symbol} · {selected.sector}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                      {selected.theme}
                    </Badge>
                    <Badge variant="secondary">
                      {formatCurrency(selected.currentPrice, selected.currency)}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className={`text-2xl font-bold ${getScoreColor(selected.confidenceScore)}`}>
                      {selected.confidenceScore}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Risk</p>
                    <p className={`text-2xl font-bold ${getScoreColor(selected.riskScore, true)}`}>
                      {selected.riskScore}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Upside</p>
                    <p className="text-2xl font-bold text-emerald-400">
                      {selected.potentialUpsideMin}–{selected.potentialUpsideMax}%
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  Investment Thesis
                </h3>
                <p className="text-sm leading-relaxed">{selected.investmentThesis}</p>
              </div>

              {selected.beneficiarySectors && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Beneficiary Sectors</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.beneficiarySectors.map((s) => (
                      <Badge key={s} variant="success">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <h3 className="text-sm font-semibold flex items-center gap-2 mb-2 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Bull Case
                  </h3>
                  <p className="text-sm">{selected.bullCase}</p>
                </div>
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                  <h3 className="text-sm font-semibold flex items-center gap-2 mb-2 text-red-400">
                    <XCircle className="h-4 w-4" />
                    Bear Case
                  </h3>
                  <p className="text-sm">{selected.bearCase}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  Why Now?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selected.whyNow.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  Why This Could Fail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selected.whyCouldFail.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {selected.disconfirmingEvidence.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Disconfirming Evidence</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selected.disconfirmingEvidence.map((evidence, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-amber-400">⚠</span>
                      {evidence}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {selected.riskBreakdown && (
              <ScoreBreakdown title="Risk Engine" type="risk" data={selected.riskBreakdown} />
            )}
            {selected.confidenceBreakdown && (
              <ScoreBreakdown title="Confidence Engine" type="confidence" data={selected.confidenceBreakdown} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 rounded-xl mt-12" />}>
      <OpportunitiesContent />
    </Suspense>
  );
}
