"use client";

import { useEffect, useState } from "react";
import { IpoCard } from "@/components/dashboard/ipo-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UpcomingIpo } from "@/types/ipo";
import { Rocket, AlertCircle } from "lucide-react";

export default function IposPage() {
  const [ipos, setIpos] = useState<UpcomingIpo[]>([]);
  const [dataAsOf, setDataAsOf] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ipos")
      .then((r) => r.json())
      .then((data) => {
        setIpos(data.ipos);
        setDataAsOf(data.dataAsOf ?? null);
      })
      .finally(() => setLoading(false));
  }, []);

  const openNow = ipos.filter((i) => i.status === "Open");
  const subscribe = ipos.filter((i) => i.verdict === "Subscribe");
  const avoid = ipos.filter((i) => i.verdict === "Avoid");
  const neutral = ipos.filter(
    (i) => i.verdict === "Neutral" || i.verdict === "Listing Gains Only"
  );

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      <div>
        <div className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-emerald-400" />
          <h1 className="text-2xl font-bold">Upcoming Indian IPOs</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Honest opinions — upside, downside, risk, and whether each IPO is worth your money.
          Past IPOs are hidden automatically; pipeline names show even without confirmed dates.
        </p>
        {dataAsOf && (
          <p className="text-xs text-muted-foreground mt-1">
            Calendar curated as of {new Date(dataAsOf).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-amber-400">Not financial advice</p>
          <p className="text-muted-foreground mt-1">
            These are research opinions to help you think clearly. Most IPOs are priced for the seller, not the buyer.
            Always read the RHP, check final pricing, and never invest money you cannot afford to lose.
          </p>
        </div>
      </div>

      {!loading && (
        <div className="flex flex-wrap gap-2">
          {openNow.length > 0 && (
            <Badge variant="success">{openNow.length} Open now</Badge>
          )}
          <Badge variant="success">{subscribe.length} Subscribe</Badge>
          <Badge variant="warning">{neutral.length} Neutral / Listing only</Badge>
          <Badge variant="danger">{avoid.length} Avoid</Badge>
          <Badge variant="secondary">{ipos.length} Active IPOs</Badge>
        </div>
      )}

      {!loading && openNow.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-emerald-400">Open for subscription</h2>
          {openNow.map((ipo) => (
            <IpoCard key={ipo.id} ipo={ipo} />
          ))}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-xl" />
          ))}
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({ipos.length})</TabsTrigger>
            <TabsTrigger value="subscribe">Subscribe ({subscribe.length})</TabsTrigger>
            <TabsTrigger value="neutral">Neutral ({neutral.length})</TabsTrigger>
            <TabsTrigger value="avoid">Avoid ({avoid.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 space-y-4">
            {ipos.map((ipo) => (
              <IpoCard key={ipo.id} ipo={ipo} />
            ))}
          </TabsContent>
          <TabsContent value="subscribe" className="mt-4 space-y-4">
            {subscribe.length ? subscribe.map((ipo) => <IpoCard key={ipo.id} ipo={ipo} />) : (
              <p className="text-sm text-muted-foreground">No clear subscribe recommendations right now.</p>
            )}
          </TabsContent>
          <TabsContent value="neutral" className="mt-4 space-y-4">
            {neutral.map((ipo) => (
              <IpoCard key={ipo.id} ipo={ipo} />
            ))}
          </TabsContent>
          <TabsContent value="avoid" className="mt-4 space-y-4">
            {avoid.map((ipo) => (
              <IpoCard key={ipo.id} ipo={ipo} />
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
