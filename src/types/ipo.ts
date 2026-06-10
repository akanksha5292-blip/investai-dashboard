export type IpoVerdict = "Subscribe" | "Avoid" | "Neutral" | "Listing Gains Only";

export type IpoStatus = "Upcoming" | "Open" | "Recently Listed" | "Filed";

export interface UpcomingIpo {
  id: string;
  companyName: string;
  sector: string;
  status: IpoStatus;
  expectedOpenDate?: string;
  expectedCloseDate?: string;
  priceBandMin?: number;
  priceBandMax?: number;
  issueSizeCr?: number;
  lotSize?: number;
  leadManagers: string[];
  businessSummary: string;
  honestTake: string;
  verdict: IpoVerdict;
  worthInvesting: boolean;
  upsideMin: number;
  upsideMax: number;
  downsideMin: number;
  downsideMax: number;
  riskScore: number;
  confidenceScore: number;
  listingGainPotential: string;
  longTermPotential: string;
  bullCase: string;
  bearCase: string;
  whySubscribe?: string[];
  whyAvoid?: string[];
  greyMarketPremium?: number;
  peerComparison?: string;
}
