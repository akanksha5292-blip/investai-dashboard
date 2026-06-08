"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsArticle } from "@/types";
import { ArrowRight } from "lucide-react";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const analysis = article.analysis;

  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-sm font-medium leading-snug">
            {article.title}
          </CardTitle>
          {analysis && (
            <Badge
              variant={analysis.importanceScore >= 80 ? "success" : analysis.importanceScore >= 60 ? "warning" : "secondary"}
            >
              {analysis.importanceScore}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {article.source} · {new Date(article.publishedAt).toLocaleString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            month: "short",
          })}
        </p>
      </CardHeader>
      {analysis && (
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{analysis.eventSummary}</p>

          <div className="flex flex-wrap gap-1.5">
            {analysis.positiveSectors.map((sector) => (
              <Badge key={sector} variant="success" className="text-xs">
                + {sector}
              </Badge>
            ))}
            {analysis.negativeSectors.map((sector) => (
              <Badge key={sector} variant="danger" className="text-xs">
                − {sector}
              </Badge>
            ))}
          </div>

          {analysis.reasoningChain.length > 0 && (
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">Reasoning Chain</p>
              <div className="flex flex-wrap items-center gap-1 text-xs">
                {analysis.reasoningChain.map((step, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                    <span className={step.startsWith("→") ? "text-emerald-400" : ""}>
                      {step.replace(/^→\s*/, "")}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs leading-relaxed text-muted-foreground italic">
            {analysis.aiExplanation}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
