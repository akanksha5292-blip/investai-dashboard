"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { WatchlistItem } from "@/types";
import { getScoreColor } from "@/lib/utils";
import { getWatchlist, removeFromWatchlist } from "@/lib/watchlist-client";
import { Star, Trash2 } from "lucide-react";

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    setItems(getWatchlist());
  }, []);

  const handleRemove = (id: number) => {
    removeFromWatchlist(id);
    setItems(getWatchlist());
  };

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      <div>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-emerald-400" />
          <h1 className="text-2xl font-bold">Watchlist</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Track your saved stocks, mutual funds, and themes
        </p>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Star className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your watchlist is empty</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add stocks from the Dashboard or Opportunities page
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.symbol}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{item.type.replace("_", " ")}</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-red-400"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                {item.theme && (
                  <Badge variant="outline" className="w-fit mt-2 text-emerald-400 border-emerald-500/30">
                    {item.theme}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {(item.confidenceScore != null || item.riskScore != null) && (
                  <div className="grid grid-cols-2 gap-4">
                    {item.confidenceScore != null && (
                      <div>
                        <p className="text-xs text-muted-foreground">Confidence</p>
                        <p className={`text-lg font-bold ${getScoreColor(item.confidenceScore)}`}>
                          {item.confidenceScore}%
                        </p>
                        <Progress
                          value={item.confidenceScore}
                          className="mt-1 h-1"
                          indicatorClassName="bg-emerald-500"
                        />
                      </div>
                    )}
                    {item.riskScore != null && (
                      <div>
                        <p className="text-xs text-muted-foreground">Risk</p>
                        <p className={`text-lg font-bold ${getScoreColor(item.riskScore, true)}`}>
                          {item.riskScore}%
                        </p>
                        <Progress
                          value={item.riskScore}
                          className="mt-1 h-1"
                          indicatorClassName="bg-amber-500"
                        />
                      </div>
                    )}
                  </div>
                )}

                {item.aiThesis && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">AI Thesis</p>
                    <p className="text-sm line-clamp-3">{item.aiThesis}</p>
                  </div>
                )}

                {item.themeExposure && item.themeExposure.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.themeExposure.map((theme) => (
                      <Badge key={theme} variant="outline" className="text-xs">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Added {new Date(item.addedAt).toLocaleDateString("en-IN")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
