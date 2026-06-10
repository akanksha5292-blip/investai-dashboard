import OpenAI from "openai";
import type {
  ChildFundInput,
  ChildFundResult,
  NewsAnalysis,
  Opportunity,
  StockResearch,
} from "@/types";
import { MOCK_NEWS } from "./mock-data";
import { getDiversifiedOpportunities } from "./diversified-opportunities";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

function isAiEnabled(): boolean {
  return !!openai && process.env.USE_MOCK_DATA !== "true";
}

async function chatJson<T>(system: string, user: string): Promise<T | null> {
  if (!openai) return null;
  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });
    const content = response.choices[0]?.message?.content;
    if (!content) return null;
    return JSON.parse(content) as T;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return null;
  }
}

export async function analyzeNewsArticle(
  title: string,
  summary: string
): Promise<NewsAnalysis | null> {
  if (!isAiEnabled()) {
    const mock = MOCK_NEWS.find((n) => n.title === title);
    return mock?.analysis ?? MOCK_NEWS[0].analysis ?? null;
  }

  return chatJson<NewsAnalysis>(
    `You are an expert investment analyst. Analyze financial news and return JSON with:
    eventSummary, positiveSectors (array), negativeSectors (array), importanceScore (0-100),
    confidenceScore (0-100), aiExplanation, reasoningChain (array of strings showing cause-effect chain).
    Always explain your reasoning clearly.`,
    `Analyze this news:\nTitle: ${title}\nSummary: ${summary}`
  );
}

export async function generateOpportunitiesFromNews(
  newsItems: { title: string; summary: string }[]
): Promise<Opportunity[] | null> {
  if (!isAiEnabled()) return null;

  const result = await chatJson<{ opportunities: Opportunity[] }>(
    `You are an expert investment research analyst for Indian markets. Convert news into investment opportunities.
    Return JSON with "opportunities" array. Each opportunity needs:
    id, name, symbol (Yahoo format like POLYCAB.NS), type (stock or mutual_fund), theme, sector,
    currentPrice (estimate), currency, confidenceScore (0-100), riskScore (0-100),
    potentialUpsideMin, potentialUpsideMax, timeHorizon, whyItMatters, whyNow (array),
    whyCouldFail (array), investmentThesis, bullCase, bearCase, disconfirmingEvidence (array),
    beneficiarySectors (array).
    CRITICAL: Pick stocks from DIFFERENT sectors — max one per industry (Banking, IT, Pharma, Defence, Power, FMCG, Auto, Realty, Metals, etc).
    Focus on opportunities BEFORE they become widely recognized. Always include whyCouldFail.`,
    `Generate 6-8 investment opportunities from DIFFERENT industries based on these news items:\n${newsItems
      .map((n) => `- ${n.title}: ${n.summary}`)
      .join("\n")}`
  );

  return result?.opportunities ?? null;
}

export async function researchStock(
  symbol: string,
  quoteData: Record<string, unknown>
): Promise<Partial<StockResearch> | null> {
  if (!isAiEnabled()) return null;

  return chatJson<Partial<StockResearch>>(
    `You are an expert equity research analyst. Analyze the stock and return JSON with:
    businessSummary, aiSummary, investmentThesis, riskAnalysis, potentialCatalysts (array),
    riskScore (0-100), confidenceScore (0-100).
    Be balanced — include both bull and bear perspectives.`,
    `Analyze stock ${symbol} with this data:\n${JSON.stringify(quoteData, null, 2)}`
  );
}

export async function generateChildFundPlan(
  input: ChildFundInput
): Promise<Partial<ChildFundResult> | null> {
  if (!isAiEnabled()) return null;

  return chatJson<Partial<ChildFundResult>>(
    `You are a certified financial planner specializing in child education planning for Indian investors.
    Return JSON with: recommendedPortfolio (array of {name, type, allocation, expectedReturn, funds}),
    explanation (string explaining the strategy).
    Consider risk appetite: conservative (more debt/gold), moderate (balanced), aggressive (more equity).
    Use real Indian mutual fund names where possible.`,
    `Create investment plan for:
    Child: ${input.childName}, Age: ${input.currentAge}, Monthly: ₹${input.monthlyInvestment},
    Target Age: ${input.targetAge}, Risk: ${input.riskAppetite}`
  );
}

export async function generateRiskExplanation(
  symbol: string,
  scores: Record<string, number>
): Promise<string | null> {
  if (!isAiEnabled()) {
    return `Overall risk score of ${scores.overallScore}/100 based on weighted analysis of valuation (${scores.valuationRisk}), debt (${scores.debtRisk}), business (${scores.businessRisk}), regulatory (${scores.regulatoryRisk}), sector (${scores.sectorRisk}), and execution (${scores.executionRisk}) factors.`;
  }

  const result = await chatJson<{ explanation: string }>(
    "Explain how the risk score was calculated in 2-3 sentences for a retail investor.",
    `Stock ${symbol} risk scores: ${JSON.stringify(scores)}`
  );
  return result?.explanation ?? null;
}

export async function generateConfidenceExplanation(
  symbol: string,
  scores: Record<string, number>
): Promise<string | null> {
  if (!isAiEnabled()) {
    return `Confidence score of ${scores.overallScore}% driven by news volume (${scores.newsVolume}%), earnings quality (${scores.earningsQuality}%), sector momentum (${scores.sectorMomentum}%), institutional interest (${scores.institutionalInterest}%), valuation (${scores.valuationAttractiveness}%), and historical theme success (${scores.historicalThemeSuccess}%).`;
  }

  const result = await chatJson<{ explanation: string }>(
    "Explain how the confidence score was calculated in 2-3 sentences for a retail investor.",
    `Stock ${symbol} confidence scores: ${JSON.stringify(scores)}`
  );
  return result?.explanation ?? null;
}
