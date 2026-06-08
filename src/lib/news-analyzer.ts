import type { NewsAnalysis } from "@/types";

const SECTOR_KEYWORDS: Record<string, string[]> = {
  "Data Centers": ["ai", "data center", "cloud", "gpu", "computing", "semiconductor"],
  "Power Infrastructure": ["power", "electricity", "grid", "transformer", "renewable", "solar", "wind"],
  "Electrical Equipment": ["cable", "wire", "electrical", "havells", "polycab"],
  "Banking": ["rbi", "repo rate", "interest rate", "bank", "credit", "npa", "lending"],
  "Real Estate": ["real estate", "housing", "property", "cement", "construction"],
  "IT Services": ["it services", "software", "tech", "infosys", "tcs", "wipro"],
  "Auto": ["auto", "ev", "electric vehicle", "maruti", "tata motors"],
  "Pharma": ["pharma", "drug", "fda", "medicine", "healthcare"],
  "Defence": ["defence", "defense", "military", "hal", "bel"],
  "Oil & Gas": ["crude", "oil", "ongc", "petroleum", "gas"],
  "Consumer": ["fmcg", "consumer", "retail", "demand"],
  "Small Cap": ["small cap", "small-cap", "midcap"],
};

const NEGATIVE_PATTERNS: Record<string, string[]> = {
  "Small Cap Stocks": ["sebi", "small cap", "regulation", "tighter norms"],
  "Banking NIMs (short-term)": ["rate cut", "rbi cut", "lower rates"],
  "Traditional IT Outsourcing": ["ai automation", "job cuts", "disruption"],
  "Legacy Hardware": ["cloud migration", "obsolete"],
};

function scoreSectors(text: string): { positive: string[]; negative: string[] } {
  const lower = text.toLowerCase();
  const positive: string[] = [];
  const negative: string[] = [];

  for (const [sector, keywords] of Object.entries(SECTOR_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      positive.push(sector);
    }
  }

  for (const [sector, keywords] of Object.entries(NEGATIVE_PATTERNS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      negative.push(sector);
    }
  }

  if (positive.length === 0) positive.push("General Market");
  return { positive: [...new Set(positive)], negative: [...new Set(negative)] };
}

function buildReasoningChain(positiveSectors: string[]): string[] {
  const chains: Record<string, string[]> = {
    "Data Centers": ["Policy News", "→ Data Centers", "→ Electricity Demand", "→ Power Infrastructure", "→ Electrical Equipment"],
    "Banking": ["Rate Decision", "→ Lower EMIs", "→ Housing Demand", "→ Real Estate & Cement"],
    "Power Infrastructure": ["Infrastructure Push", "→ Power Demand", "→ Transformers", "→ Cables & Equipment"],
    "Defence": ["Defence Budget", "→ Order Books", "→ Defence PSUs", "→ Aerospace Suppliers"],
  };

  for (const sector of positiveSectors) {
    if (chains[sector]) return chains[sector];
  }
  return ["News Event", "→ Sector Impact", "→ Related Companies", "→ Investment Opportunity"];
}

function scoreImportance(title: string, summary: string): number {
  const text = `${title} ${summary}`.toLowerCase();
  let score = 50;
  if (text.match(/government|budget|policy|rbi|sebi|cabinet/)) score += 25;
  if (text.match(/billion|crore|₹|percent|%|record/)) score += 15;
  if (text.match(/nifty|sensex|market|stock|invest/)) score += 10;
  return Math.min(score, 95);
}

export function analyzeNewsFree(title: string, summary: string): NewsAnalysis {
  const text = `${title}. ${summary}`;
  const { positive, negative } = scoreSectors(text);
  const importanceScore = scoreImportance(title, summary);
  const confidenceScore = Math.min(importanceScore + 5, 90);

  return {
    eventSummary: summary || title,
    positiveSectors: positive,
    negativeSectors: negative,
    importanceScore,
    confidenceScore,
    aiExplanation:
      `Based on keyword analysis of "${title}", the most affected sectors are ${positive.join(", ")}.` +
      (negative.length ? ` Sectors that may face headwinds: ${negative.join(", ")}.` : "") +
      " This is rule-based analysis — always verify with your own research.",
    reasoningChain: buildReasoningChain(positive),
  };
}
