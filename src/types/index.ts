export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  dailyChange: number;
  dailyChangePercent: number;
  weeklyChange: number;
  weeklyChangePercent: number;
  currency: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  link: string;
  source: string;
  publishedAt: string;
  summary?: string;
  analysis?: NewsAnalysis;
}

export interface NewsAnalysis {
  eventSummary: string;
  positiveSectors: string[];
  negativeSectors: string[];
  importanceScore: number;
  confidenceScore: number;
  aiExplanation: string;
  reasoningChain: string[];
}

export interface Opportunity {
  id: string;
  name: string;
  symbol: string;
  type: "stock" | "mutual_fund";
  theme: string;
  sector: string;
  currentPrice: number;
  currency: string;
  confidenceScore: number;
  riskScore: number;
  potentialUpsideMin: number;
  potentialUpsideMax: number;
  timeHorizon: string;
  whyItMatters: string;
  whyNow: string[];
  whyCouldFail: string[];
  investmentThesis: string;
  bullCase: string;
  bearCase: string;
  disconfirmingEvidence: string[];
  beneficiarySectors?: string[];
  riskBreakdown?: RiskBreakdown;
  confidenceBreakdown?: ConfidenceBreakdown;
}

export interface RiskBreakdown {
  valuationRisk: number;
  debtRisk: number;
  businessRisk: number;
  regulatoryRisk: number;
  sectorRisk: number;
  executionRisk: number;
  overallScore: number;
  explanation: string;
}

export interface ConfidenceBreakdown {
  newsVolume: number;
  earningsQuality: number;
  sectorMomentum: number;
  institutionalInterest: number;
  valuationAttractiveness: number;
  historicalThemeSuccess: number;
  overallScore: number;
  explanation: string;
}

export interface StockResearch {
  symbol: string;
  name: string;
  sector: string;
  currentPrice: number;
  currency: string;
  businessSummary: string;
  revenueGrowth: number;
  profitGrowth: number;
  roe: number;
  roce: number;
  debtToEquity: number;
  freeCashFlow: number;
  peRatio: number;
  pbRatio: number;
  dividendYield: number;
  aiSummary: string;
  investmentThesis: string;
  riskAnalysis: string;
  recentNews: NewsArticle[];
  potentialCatalysts: string[];
  riskScore: number;
  confidenceScore: number;
}

export interface WatchlistItem {
  id: number;
  symbol: string;
  name: string;
  type: "stock" | "mutual_fund" | "theme";
  theme?: string;
  riskScore?: number;
  confidenceScore?: number;
  latestNews?: string;
  aiThesis?: string;
  themeExposure?: string[];
  addedAt: string;
}

export interface ChildFundInput {
  childName: string;
  currentAge: number;
  monthlyInvestment: number;
  targetAge: number;
  riskAppetite: "conservative" | "moderate" | "aggressive";
}

export interface ChildFundResult {
  childName: string;
  yearsToInvest: number;
  recommendedPortfolio: PortfolioAllocation[];
  projectedCorpus: number;
  conservativeScenario: number;
  moderateScenario: number;
  aggressiveScenario: number;
  projectionData: ProjectionPoint[];
  explanation: string;
}

export interface PortfolioAllocation {
  name: string;
  type: "equity" | "debt" | "gold" | "hybrid";
  allocation: number;
  expectedReturn: number;
  funds: string[];
}

export interface ProjectionPoint {
  year: number;
  age: number;
  conservative: number;
  moderate: number;
  aggressive: number;
}

export interface FinancialTerm {
  term: string;
  definition: string;
  simpleExplanation: string;
  whyInvestorsCare: string;
  example: string;
}

import type { AnalyticsData } from "@/types/analytics";

export interface DashboardData {
  marketOverview: MarketIndex[];
  topOpportunities: Opportunity[];
  newsArticles: NewsArticle[];
  analytics: AnalyticsData;
  lastUpdated: string;
  dataSource: "live" | "mock";
}

export type { AnalyticsData, RankedOpportunity } from "./analytics";
