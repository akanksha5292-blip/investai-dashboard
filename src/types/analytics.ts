export interface HeatmapStock {
  symbol: string;
  name: string;
  changePercent: number;
  marketCap: number;
}

export interface SectorStrength {
  sector: string;
  return1D: number;
  return1W: number;
  return1M: number;
  return3M: number;
}

export interface SectorRotation {
  from: string;
  to: string;
  strength: number;
  description: string;
}

export interface RelativePerformance {
  name: string;
  symbol: string;
  return1M: number;
  return3M: number;
  return6M: number;
  return1Y: number;
  return3Y: number;
}

export interface SmartMoneyFlow {
  category: string;
  netFlow: number;
  trend: "inflow" | "outflow" | "neutral";
  changePercent: number;
}

export interface SmartMoneyStock {
  symbol: string;
  name: string;
  netFlow: number;
  type: "accumulated" | "sold";
}

export interface ThemePerformance {
  theme: string;
  themeScore: number;
  momentumScore: number;
  riskScore: number;
  newsVolume: number;
  institutionalInterest: number;
}

export interface FunnelStage {
  label: string;
  count: number;
  description: string;
}

export interface RiskRewardPoint {
  symbol: string;
  name: string;
  risk: number;
  upside: number;
  quadrant: "low-low" | "low-high" | "high-low" | "high-high";
  riskAdjustedReturn: number;
}

export interface MarketBreadth {
  advancing: number;
  declining: number;
  unchanged: number;
  newHighs: number;
  newLows: number;
  advanceDeclineRatio: number;
  health: "bullish" | "neutral" | "bearish";
}

export interface ConvictionScore {
  score: number;
  label: "Exceptional" | "High Conviction" | "Watchlist" | "Avoid";
  fundamentals: number;
  valuation: number;
  news: number;
  sectorMomentum: number;
  institutionalInterest: number;
  managementQuality: number;
}

export interface InvestmentScorecard {
  businessQuality: number;
  valuation: number;
  growth: number;
  risk: number;
  momentum: number;
  management: number;
  news: number;
  overall: number;
  rating: string;
}

export interface FundManagerView {
  whyBuy: string;
  whyAvoid: string;
  assumptions: string[];
  invalidators: string[];
}

export interface RankedOpportunity {
  id: string;
  name: string;
  symbol: string;
  type: "stock" | "mutual_fund" | "theme";
  theme: string;
  sector: string;
  currentPrice?: number;
  currency?: string;
  confidenceScore: number;
  riskScore: number;
  convictionScore: number;
  potentialUpsideMin: number;
  potentialUpsideMax: number;
  riskAdjustedReturn: number;
  timeHorizon: string;
  whyItMatters: string;
  whyNow: string[];
  whyCouldFail: string[];
  investmentThesis: string;
  bullCase: string;
  bearCase: string;
  scorecard: InvestmentScorecard;
  fundManagerView: FundManagerView;
}

export interface DailyMemo {
  date: string;
  headline: string;
  yesterdaySummary: string;
  topNews: string[];
  emergingThemes: string[];
  topRisks: string[];
  topOpportunitiesSummary: string[];
  fullMemo: string;
}

export interface AnalyticsData {
  heatmap: HeatmapStock[];
  sectorStrength: SectorStrength[];
  strongestSector: string;
  weakestSector: string;
  sectorRotation: {
    rotations: SectorRotation[];
    emerging: string[];
    cooling: string[];
  };
  relativePerformance: RelativePerformance[];
  smartMoney: {
    flows: SmartMoneyFlow[];
    accumulated: SmartMoneyStock[];
    sold: SmartMoneyStock[];
  };
  themePerformance: ThemePerformance[];
  opportunityFunnel: FunnelStage[];
  riskRewardMatrix: RiskRewardPoint[];
  marketBreadth: MarketBreadth;
  topStocks: RankedOpportunity[];
  topFunds: RankedOpportunity[];
  topThemes: RankedOpportunity[];
  dailyMemo: DailyMemo;
}
