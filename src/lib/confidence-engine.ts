import type { ConfidenceBreakdown } from "@/types";

interface ConfidenceInputs {
  newsMentions?: number;
  earningsBeatRate?: number;
  sectorReturn3M?: number;
  institutionalHolding?: number;
  peVsSector?: number;
  themeHistoricalSuccess?: number;
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

export function calculateConfidenceScore(
  inputs: ConfidenceInputs
): ConfidenceBreakdown {
  const newsVolume = clamp(
    inputs.newsMentions !== undefined
      ? inputs.newsMentions > 20
        ? 90
        : inputs.newsMentions > 10
          ? 75
          : inputs.newsMentions > 5
            ? 60
            : 40
      : 55
  );

  const earningsQuality = clamp(
    inputs.earningsBeatRate !== undefined
      ? inputs.earningsBeatRate * 100
      : 65
  );

  const sectorMomentum = clamp(
    inputs.sectorReturn3M !== undefined
      ? 50 + inputs.sectorReturn3M * 5
      : 60
  );

  const institutionalInterest = clamp(
    inputs.institutionalHolding !== undefined
      ? inputs.institutionalHolding > 50
        ? 85
        : inputs.institutionalHolding > 30
          ? 70
          : 50
      : 60
  );

  const valuationAttractiveness = clamp(
    inputs.peVsSector !== undefined
      ? inputs.peVsSector < 0.8
        ? 85
        : inputs.peVsSector < 1.0
          ? 70
          : inputs.peVsSector < 1.3
            ? 50
            : 30
      : 55
  );

  const historicalThemeSuccess = clamp(inputs.themeHistoricalSuccess ?? 65);

  const overallScore = Math.round(
    newsVolume * 0.2 +
      earningsQuality * 0.2 +
      sectorMomentum * 0.15 +
      institutionalInterest * 0.15 +
      valuationAttractiveness * 0.15 +
      historicalThemeSuccess * 0.15
  );

  const explanation = `Confidence score of ${overallScore}% based on: News volume (${newsVolume}%), Earnings quality (${earningsQuality}%), Sector momentum (${sectorMomentum}%), Institutional interest (${institutionalInterest}%), Valuation attractiveness (${valuationAttractiveness}%), Historical theme success (${historicalThemeSuccess}%). ${
    overallScore >= 75
      ? "High conviction opportunity with multiple confirming signals."
      : overallScore >= 50
        ? "Moderate confidence — monitor for additional confirmation."
        : "Low confidence — proceed with caution."
  }`;

  return {
    newsVolume,
    earningsQuality,
    sectorMomentum,
    institutionalInterest,
    valuationAttractiveness,
    historicalThemeSuccess,
    overallScore,
    explanation,
  };
}
