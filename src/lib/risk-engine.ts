import type { RiskBreakdown } from "@/types";

interface RiskInputs {
  peRatio?: number;
  debtToEquity?: number;
  profitMargin?: number;
  beta?: number;
  sectorVolatility?: number;
  regulatoryExposure?: number;
  revenueGrowth?: number;
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

export function calculateRiskScore(inputs: RiskInputs): RiskBreakdown {
  const valuationRisk = clamp(
    inputs.peRatio
      ? inputs.peRatio > 50
        ? 70
        : inputs.peRatio > 35
          ? 50
          : inputs.peRatio > 25
            ? 35
            : 20
      : 40
  );

  const debtRisk = clamp(
    inputs.debtToEquity !== undefined
      ? inputs.debtToEquity > 1.5
        ? 80
        : inputs.debtToEquity > 0.8
          ? 55
          : inputs.debtToEquity > 0.3
            ? 30
            : 15
      : 35
  );

  const businessRisk = clamp(
    inputs.profitMargin !== undefined
      ? inputs.profitMargin < 5
        ? 70
        : inputs.profitMargin < 10
          ? 45
          : 25
      : 40
  );

  const regulatoryRisk = clamp(inputs.regulatoryExposure ?? 30);

  const sectorRisk = clamp(
    inputs.sectorVolatility !== undefined
      ? inputs.sectorVolatility * 100
      : inputs.beta
        ? inputs.beta * 30
        : 35
  );

  const executionRisk = clamp(
    inputs.revenueGrowth !== undefined
      ? inputs.revenueGrowth < 0
        ? 65
        : inputs.revenueGrowth < 10
          ? 40
          : 25
      : 35
  );

  const overallScore = Math.round(
    valuationRisk * 0.2 +
      debtRisk * 0.15 +
      businessRisk * 0.2 +
      regulatoryRisk * 0.15 +
      sectorRisk * 0.15 +
      executionRisk * 0.15
  );

  const explanation = `Overall risk score of ${overallScore}/100 calculated as weighted average: Valuation (${valuationRisk}, 20%), Debt (${debtRisk}, 15%), Business (${businessRisk}, 20%), Regulatory (${regulatoryRisk}, 15%), Sector (${sectorRisk}, 15%), Execution (${executionRisk}, 15%). ${
    overallScore < 35
      ? "Low risk profile suitable for conservative investors."
      : overallScore < 60
        ? "Moderate risk — suitable for balanced portfolios."
        : "Elevated risk — requires careful position sizing."
  }`;

  return {
    valuationRisk,
    debtRisk,
    businessRisk,
    regulatoryRisk,
    sectorRisk,
    executionRisk,
    overallScore,
    explanation,
  };
}
