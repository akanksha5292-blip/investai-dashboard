import type { ChildFundInput, ChildFundResult, PortfolioAllocation, ProjectionPoint } from "@/types";
import { generateChildFundPlan } from "./ai";

const PORTFOLIOS: Record<string, PortfolioAllocation[]> = {
  conservative: [
    { name: "Debt Funds", type: "debt", allocation: 50, expectedReturn: 7, funds: ["HDFC Corporate Bond Fund", "ICICI Pru Short Term Fund"] },
    { name: "Large Cap Equity", type: "equity", allocation: 25, expectedReturn: 12, funds: ["Nippon India Large Cap Fund", "UTI Nifty 50 Index Fund"] },
    { name: "Gold ETF", type: "gold", allocation: 15, expectedReturn: 8, funds: ["SBI Gold ETF", "HDFC Gold ETF"] },
    { name: "Hybrid Funds", type: "hybrid", allocation: 10, expectedReturn: 10, funds: ["ICICI Pru Balanced Advantage"] },
  ],
  moderate: [
    { name: "Flexi Cap Equity", type: "equity", allocation: 45, expectedReturn: 14, funds: ["Parag Parikh Flexi Cap Fund", "Mirae Asset Flexi Cap Fund"] },
    { name: "Mid Cap Equity", type: "equity", allocation: 20, expectedReturn: 16, funds: ["Kotak Emerging Equity Fund", "HDFC Mid-Cap Fund"] },
    { name: "Debt Funds", type: "debt", allocation: 20, expectedReturn: 7, funds: ["HDFC Short Term Debt Fund"] },
    { name: "Gold ETF", type: "gold", allocation: 10, expectedReturn: 8, funds: ["SBI Gold ETF"] },
    { name: "International Equity", type: "equity", allocation: 5, expectedReturn: 12, funds: ["Motilal Oswal Nasdaq 100 FOF"] },
  ],
  aggressive: [
    { name: "Flexi Cap Equity", type: "equity", allocation: 30, expectedReturn: 14, funds: ["Parag Parikh Flexi Cap Fund"] },
    { name: "Mid Cap Equity", type: "equity", allocation: 25, expectedReturn: 16, funds: ["Kotak Emerging Equity Fund"] },
    { name: "Small Cap Equity", type: "equity", allocation: 25, expectedReturn: 18, funds: ["Nippon India Small Cap Fund", "SBI Small Cap Fund"] },
    { name: "Sectoral/Thematic", type: "equity", allocation: 10, expectedReturn: 17, funds: ["ICICI Pru Technology Fund"] },
    { name: "International Equity", type: "equity", allocation: 10, expectedReturn: 12, funds: ["Motilal Oswal Nasdaq 100 FOF"] },
  ],
};

function projectCorpus(
  monthlyInvestment: number,
  years: number,
  annualReturn: number
): number {
  const monthlyRate = annualReturn / 100 / 12;
  const months = years * 12;
  if (monthlyRate === 0) return monthlyInvestment * months;
  return (
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate)
  );
}

function generateProjections(
  input: ChildFundInput
): ProjectionPoint[] {
  const years = input.targetAge - input.currentAge;
  const points: ProjectionPoint[] = [];

  for (let y = 0; y <= years; y++) {
    points.push({
      year: y,
      age: input.currentAge + y,
      conservative: Math.round(projectCorpus(input.monthlyInvestment, y, 8)),
      moderate: Math.round(projectCorpus(input.monthlyInvestment, y, 12)),
      aggressive: Math.round(projectCorpus(input.monthlyInvestment, y, 15)),
    });
  }
  return points;
}

export async function calculateChildFund(input: ChildFundInput): Promise<ChildFundResult> {
  const years = input.targetAge - input.currentAge;
  const portfolio = PORTFOLIOS[input.riskAppetite];
  const weightedReturn =
    portfolio.reduce((sum, p) => sum + p.allocation * p.expectedReturn, 0) / 100;

  const aiPlan = await generateChildFundPlan(input);

  const projectionData = generateProjections(input);
  const finalProjection = projectionData[projectionData.length - 1];

  return {
    childName: input.childName,
    yearsToInvest: years,
    recommendedPortfolio: aiPlan?.recommendedPortfolio ?? portfolio,
    projectedCorpus: Math.round(projectCorpus(input.monthlyInvestment, years, weightedReturn)),
    conservativeScenario: finalProjection.conservative,
    moderateScenario: finalProjection.moderate,
    aggressiveScenario: finalProjection.aggressive,
    projectionData,
    explanation:
      aiPlan?.explanation ??
      `For ${input.childName} (age ${input.currentAge}), investing ₹${input.monthlyInvestment.toLocaleString("en-IN")}/month until age ${input.targetAge} (${years} years) with ${input.riskAppetite} risk profile. Weighted expected return: ${weightedReturn.toFixed(1)}% p.a.`,
  };
}
