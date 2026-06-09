"use client";

import type { RankedOpportunity } from "@/types/analytics";
import { RankedOpportunityCard } from "./ranked-opportunity-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy } from "lucide-react";

export function TopOpportunitiesSection({
  stocks,
  funds,
  themes,
}: {
  stocks: RankedOpportunity[];
  funds: RankedOpportunity[];
  themes: RankedOpportunity[];
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-emerald-400" />
        <h2 className="text-lg font-semibold">Top 10 Opportunities Today</h2>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Ranked by risk-adjusted return — best opportunities, not most speculative
      </p>
      <Tabs defaultValue="stocks">
        <TabsList>
          <TabsTrigger value="stocks">Stocks ({stocks.length})</TabsTrigger>
          <TabsTrigger value="funds">Mutual Funds ({funds.length})</TabsTrigger>
          <TabsTrigger value="themes">Themes ({themes.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="stocks" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {stocks.map((opp, i) => (
              <RankedOpportunityCard key={opp.id} opp={opp} rank={i + 1} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="funds" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {funds.map((opp, i) => (
              <RankedOpportunityCard key={opp.id} opp={opp} rank={i + 1} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="themes" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {themes.map((opp, i) => (
              <RankedOpportunityCard key={opp.id} opp={opp} rank={i + 1} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
