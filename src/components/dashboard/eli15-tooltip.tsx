"use client";

import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import type { FinancialTerm } from "@/types";

interface Eli15TooltipProps {
  term: string;
  children?: React.ReactNode;
}

export function Eli15Tooltip({ term, children }: Eli15TooltipProps) {
  const [definition, setDefinition] = useState<FinancialTerm | null>(null);

  useEffect(() => {
    fetch("/api/terms")
      .then((r) => r.json())
      .then((data) => {
        const found = data.terms?.find(
          (t: FinancialTerm) => t.term.toLowerCase() === term.toLowerCase()
        );
        setDefinition(found ?? null);
      })
      .catch(() => {});
  }, [term]);

  if (!definition) {
    return <>{children ?? <span className="underline decoration-dotted">{term}</span>}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-1 cursor-help border-b border-dotted border-muted-foreground">
            {children ?? term}
            <HelpCircle className="h-3 w-3 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-sm bg-card text-foreground border border-border p-4">
          <div className="space-y-2">
            <p className="font-semibold text-sm">{definition.term}</p>
            <p className="text-xs">{definition.simpleExplanation}</p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Why investors care: </span>
              {definition.whyInvestorsCare}
            </p>
            <p className="text-xs text-emerald-400">
              <span className="font-medium text-foreground">Example: </span>
              {definition.example}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
