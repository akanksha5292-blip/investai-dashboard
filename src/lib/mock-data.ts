import type {
  DashboardData,
  FinancialTerm,
  MarketIndex,
  NewsArticle,
  Opportunity,
  StockResearch,
} from "@/types";

export const MOCK_MARKET_DATA: MarketIndex[] = [
  {
    symbol: "^NSEI",
    name: "Nifty 50",
    value: 24512.4,
    dailyChange: 186.3,
    dailyChangePercent: 0.77,
    weeklyChange: 412.5,
    weeklyChangePercent: 1.71,
    currency: "INR",
  },
  {
    symbol: "^BSESN",
    name: "Sensex",
    value: 80621.15,
    dailyChange: 598.2,
    dailyChangePercent: 0.75,
    weeklyChange: 1345.8,
    weeklyChangePercent: 1.7,
    currency: "INR",
  },
  {
    symbol: "^IXIC",
    name: "Nasdaq",
    value: 19845.32,
    dailyChange: -42.18,
    dailyChangePercent: -0.21,
    weeklyChange: 156.4,
    weeklyChangePercent: 0.79,
    currency: "USD",
  },
  {
    symbol: "^GSPC",
    name: "S&P 500",
    value: 5892.45,
    dailyChange: 12.34,
    dailyChangePercent: 0.21,
    weeklyChange: 78.9,
    weeklyChangePercent: 1.35,
    currency: "USD",
  },
  {
    symbol: "GC=F",
    name: "Gold",
    value: 2345.6,
    dailyChange: 18.4,
    dailyChangePercent: 0.79,
    weeklyChange: 32.1,
    weeklyChangePercent: 1.39,
    currency: "USD",
  },
  {
    symbol: "CL=F",
    name: "Crude Oil",
    value: 72.45,
    dailyChange: -1.23,
    dailyChangePercent: -1.67,
    weeklyChange: -2.8,
    weeklyChangePercent: -3.72,
    currency: "USD",
  },
  {
    symbol: "INR=X",
    name: "USD/INR",
    value: 83.42,
    dailyChange: 0.08,
    dailyChangePercent: 0.1,
    weeklyChange: -0.15,
    weeklyChangePercent: -0.18,
    currency: "INR",
  },
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    name: "Polycab India",
    symbol: "POLYCAB.NS",
    type: "stock",
    theme: "AI Infrastructure",
    sector: "Electrical Equipment",
    currentPrice: 6842.5,
    currency: "INR",
    confidenceScore: 82,
    riskScore: 28,
    potentialUpsideMin: 25,
    potentialUpsideMax: 40,
    timeHorizon: "1–3 years",
    whyItMatters:
      "Government AI infrastructure spending drives demand for power cables, transformers, and data center wiring.",
    whyNow: [
      "Government announced ₹10,000 crore AI infrastructure fund this month",
      "Data center capacity additions accelerating across India",
      "Copper prices stabilizing after recent correction",
      "Order books for cable manufacturers up 18% YoY",
    ],
    whyCouldFail: [
      "Government project execution delays are common in India",
      "Valuation multiples already expanded 30% in past year",
      "Competition from imports if tariffs are reduced",
      "Copper price spike could compress margins",
    ],
    investmentThesis:
      "AI infrastructure buildout creates a multi-year demand cycle for power and data cables. Polycab is India's largest cable manufacturer with strong distribution and brand.",
    bullCase:
      "Data center boom + grid modernization + EV charging infrastructure creates sustained cable demand. Market share gains in premium segments.",
    bearCase:
      "Cyclical industrial slowdown, margin pressure from raw materials, and execution risk on large government orders.",
    disconfirmingEvidence: [
      "Recent quarterly margins declined 120bps",
      "Inventory days increased to 45 from 38",
    ],
    beneficiarySectors: [
      "Data Centers",
      "Power Infrastructure",
      "Transformers",
      "Cables",
    ],
    riskBreakdown: {
      valuationRisk: 35,
      debtRisk: 15,
      businessRisk: 25,
      regulatoryRisk: 20,
      sectorRisk: 30,
      executionRisk: 25,
      overallScore: 28,
      explanation:
        "Low overall risk due to strong balance sheet (D/E < 0.1), market leadership, and secular demand tailwinds. Valuation is the primary concern.",
    },
    confidenceBreakdown: {
      newsVolume: 85,
      earningsQuality: 80,
      sectorMomentum: 88,
      institutionalInterest: 78,
      valuationAttractiveness: 72,
      historicalThemeSuccess: 75,
      overallScore: 82,
      explanation:
        "High news volume around AI infrastructure, strong earnings track record, and positive sector momentum drive confidence.",
    },
  },
  {
    id: "opp-2",
    name: "KEI Industries",
    symbol: "KEI.NS",
    type: "stock",
    theme: "AI Infrastructure",
    sector: "Electrical Equipment",
    currentPrice: 4125.8,
    currency: "INR",
    confidenceScore: 78,
    riskScore: 32,
    potentialUpsideMin: 20,
    potentialUpsideMax: 35,
    timeHorizon: "1–3 years",
    whyItMatters:
      "Specialty cable manufacturer benefiting from data center and industrial electrification trends.",
    whyNow: [
      "Large EPC contracts for data centers being awarded",
      "Export orders growing 25% YoY",
      "Capacity expansion on track for Q3",
    ],
    whyCouldFail: [
      "Smaller scale vs Polycab limits pricing power",
      "Working capital intensity increasing",
      "Raw material volatility",
    ],
    investmentThesis:
      "KEI is a high-growth cable play with strong EPC relationships and expanding capacity for data center-grade cables.",
    bullCase: "Premium cable segment growth and export market expansion.",
    bearCase: "Margin compression and competitive intensity in commodity cables.",
    disconfirmingEvidence: ["Receivable days increased in last quarter"],
    beneficiarySectors: ["Data Centers", "Power Infrastructure", "Cables"],
  },
  {
    id: "opp-3",
    name: "Parag Parikh Flexi Cap Fund",
    symbol: "122639",
    type: "mutual_fund",
    theme: "Quality Growth",
    sector: "Flexi Cap",
    currentPrice: 82.45,
    currency: "INR",
    confidenceScore: 85,
    riskScore: 22,
    potentialUpsideMin: 12,
    potentialUpsideMax: 18,
    timeHorizon: "3–5 years",
    whyItMatters:
      "Diversified quality portfolio with global exposure, ideal for long-term wealth creation.",
    whyNow: [
      "Market correction created entry opportunity",
      "Fund has consistent top-quartile performance",
      "Global diversification reduces India-specific risk",
    ],
    whyCouldFail: [
      "USD strength could hurt international holdings",
      "Large cap concentration risk",
      "Redemption pressure in market downturns",
    ],
    investmentThesis:
      "Proven fund house with disciplined value investing approach and meaningful international allocation.",
    bullCase: "Compounding through quality businesses at reasonable prices.",
    bearCase: "Underperformance in momentum-driven markets.",
    disconfirmingEvidence: ["Recent 1-year returns below category average"],
    beneficiarySectors: ["Diversified"],
  },
  {
    id: "opp-4",
    name: "Havells India",
    symbol: "HAVELLS.NS",
    type: "stock",
    theme: "Power Infrastructure",
    sector: "Consumer Durables",
    currentPrice: 1892.3,
    currency: "INR",
    confidenceScore: 75,
    riskScore: 30,
    potentialUpsideMin: 15,
    potentialUpsideMax: 28,
    timeHorizon: "1–2 years",
    whyItMatters:
      "Diversified electrical products company benefiting from infrastructure and consumer demand.",
    whyNow: [
      "Rural electrification programs accelerating",
      "Lloyd consumer segment turning profitable",
      "Cables division gaining market share",
    ],
    whyCouldFail: [
      "Consumer durables cyclicality",
      "Lloyd turnaround may take longer",
      "Premium valuation vs peers",
    ],
    investmentThesis:
      "Multi-product electrical giant with strong brand and distribution, positioned for India's infrastructure boom.",
    bullCase: "Infrastructure + consumer recovery + cables growth.",
    bearCase: "Consumer slowdown and Lloyd drag on profitability.",
    disconfirmingEvidence: ["Lloyd segment still loss-making"],
    beneficiarySectors: ["Power Infrastructure", "Consumer Durables"],
  },
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: "news-1",
    title: "Government announces ₹10,000 crore AI infrastructure expansion fund",
    link: "#",
    source: "Economic Times",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    summary:
      "India allocates major funding for AI data centers, computing infrastructure, and skill development.",
    analysis: {
      eventSummary:
        "Government announces ₹10,000 crore AI infrastructure expansion fund targeting data centers, GPU clusters, and AI research facilities across India.",
      positiveSectors: [
        "Data Centers",
        "Power Infrastructure",
        "Electrical Equipment",
        "IT Services",
        "Semiconductors",
      ],
      negativeSectors: ["Traditional IT Outsourcing", "Legacy Hardware"],
      importanceScore: 92,
      confidenceScore: 88,
      aiExplanation:
        "This is a structural policy shift signaling India's commitment to AI leadership. Similar to China's cloud infrastructure push in 2015, this creates a multi-year investment cycle benefiting infrastructure enablers before AI application companies.",
      reasoningChain: [
        "AI Infrastructure",
        "→ Data Centers",
        "→ Electricity Demand",
        "→ Transformers",
        "→ Copper",
        "→ Wire & Cable Manufacturers",
      ],
    },
  },
  {
    id: "news-2",
    title: "RBI holds rates steady, signals gradual easing path",
    link: "#",
    source: "Business Standard",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    summary:
      "Reserve Bank maintains repo rate at 6.5%, hints at potential cuts in H2 2026.",
    analysis: {
      eventSummary:
        "RBI maintains accommodative stance with potential rate cuts ahead, supporting credit growth and asset prices.",
      positiveSectors: [
        "Real Estate",
        "Banking",
        "Auto",
        "Consumer Discretionary",
      ],
      negativeSectors: ["Banking NIMs (short-term)", "Fixed Income"],
      importanceScore: 78,
      confidenceScore: 82,
      aiExplanation:
        "Rate stability with easing bias is bullish for rate-sensitive sectors. Historical pattern shows real estate and autos outperform 6-12 months after rate cut cycles begin.",
      reasoningChain: [
        "Rate Cut Cycle",
        "→ Lower EMIs",
        "→ Housing Demand",
        "→ Real Estate & Cement",
        "→ Banking Credit Growth",
      ],
    },
  },
  {
    id: "news-3",
    title: "SEBI proposes tighter norms for small-cap mutual funds",
    link: "#",
    source: "Mint",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    summary:
      "New regulations may limit small-cap fund allocations and increase disclosure requirements.",
    analysis: {
      eventSummary:
        "SEBI considers stricter norms for small-cap mutual fund investments to protect retail investors.",
      positiveSectors: ["Large Cap Funds", "Index Funds", "Blue Chip Stocks"],
      negativeSectors: ["Small Cap Stocks", "Small Cap Mutual Funds"],
      importanceScore: 65,
      confidenceScore: 70,
      aiExplanation:
        "Regulatory tightening on small-cap funds may cause short-term outflows from small caps, benefiting large-cap quality names and index strategies.",
      reasoningChain: [
        "SEBI Regulation",
        "→ Small Cap Outflows",
        "→ Large Cap Rotation",
        "→ Nifty 50 Outperformance",
      ],
    },
  },
];

export const MOCK_STOCK_RESEARCH: Record<string, StockResearch> = {
  POLYCAB: {
    symbol: "POLYCAB.NS",
    name: "Polycab India",
    sector: "Electrical Equipment",
    currentPrice: 6842.5,
    currency: "INR",
    businessSummary:
      "Polycab India is the largest manufacturer of wires and cables in India, offering over 90,000 SKUs across power, control, and specialty cables for residential, commercial, and industrial use.",
    revenueGrowth: 18.5,
    profitGrowth: 22.3,
    roe: 24.8,
    roce: 28.5,
    debtToEquity: 0.08,
    freeCashFlow: 1250,
    peRatio: 42.5,
    pbRatio: 8.2,
    dividendYield: 0.35,
    aiSummary:
      "High-quality compounder in a secular growth sector. Premium valuation justified by market leadership and margin profile, but limited margin of safety at current levels.",
    investmentThesis:
      "India's infrastructure and electrification megatrend creates sustained demand for cables. Polycab's brand, distribution, and product breadth create a durable competitive moat.",
    riskAnalysis:
      "Key risks include copper price volatility, cyclical industrial demand, and premium valuation. Monitor quarterly margins and order book trends.",
    recentNews: MOCK_NEWS.slice(0, 2),
    potentialCatalysts: [
      "Data center cable orders",
      "Government infrastructure spending",
      "Market share gains in FMEG",
      "Export market expansion",
    ],
    riskScore: 28,
    confidenceScore: 82,
  },
};

export const FINANCIAL_TERMS: FinancialTerm[] = [
  {
    term: "ROE",
    definition:
      "Return on Equity measures how effectively a company uses shareholders' money to generate profits.",
    simpleExplanation:
      "If you give a company ₹100 of your money, ROE tells you how many rupees of profit they make from it each year.",
    whyInvestorsCare:
      "Higher ROE usually means the company is efficient and growing wealth for shareholders. Consistent ROE above 15% is often considered good.",
    example:
      "Polycab has ROE of ~25%, meaning for every ₹100 of shareholder money, it generates ₹25 in annual profit.",
  },
  {
    term: "P/E Ratio",
    definition:
      "Price-to-Earnings ratio compares a company's stock price to its earnings per share.",
    simpleExplanation:
      "It tells you how many years of current profits you'd need to 'pay back' the stock price. Lower can mean cheaper, higher can mean expensive or high growth expected.",
    whyInvestorsCare:
      "Helps compare if a stock is expensive or cheap relative to its earnings and peers. Context matters — growth stocks typically have higher P/E.",
    example:
      "A stock at ₹100 earning ₹5/share has P/E of 20. You pay 20x annual earnings for the stock.",
  },
  {
    term: "Market Cap",
    definition:
      "Total market value of a company's outstanding shares, calculated as share price × total shares.",
    simpleExplanation:
      "It's what the stock market thinks the entire company is worth right now.",
    whyInvestorsCare:
      "Helps categorize companies (large/mid/small cap) and understand size relative to peers. Larger caps tend to be more stable.",
    example:
      "If a company has 10 crore shares at ₹500 each, market cap is ₹5,000 crore.",
  },
  {
    term: "Debt-to-Equity",
    definition:
      "Ratio of total debt to shareholders' equity, measuring financial leverage.",
    simpleExplanation:
      "Shows how much the company borrows compared to money from owners. Higher means more debt relative to equity.",
    whyInvestorsCare:
      "High debt increases risk during downturns. Companies with low D/E are generally safer but may grow slower.",
    example:
      "D/E of 0.5 means the company has ₹50 of debt for every ₹100 of shareholder equity.",
  },
  {
    term: "Free Cash Flow",
    definition:
      "Cash a company generates after paying for operations and capital expenditures.",
    simpleExplanation:
      "Real money left over after running the business and investing in growth. It's what can pay dividends or reduce debt.",
    whyInvestorsCare:
      "Positive FCF indicates financial health. Companies with growing FCF can reward shareholders sustainably.",
    example:
      "A company earning ₹100 crore but spending ₹30 crore on new equipment has FCF of ₹70 crore.",
  },
  {
    term: "NAV",
    definition:
      "Net Asset Value is the per-unit value of a mutual fund's holdings minus liabilities.",
    simpleExplanation:
      "The actual worth of one unit of a mutual fund based on what it owns.",
    whyInvestorsCare:
      "NAV tells you the current value of your mutual fund investment. It changes daily based on market prices.",
    example:
      "If a fund's total assets are ₹1000 crore and it has 10 crore units, NAV is ₹100 per unit.",
  },
];

export function getMockDashboardData(): DashboardData {
  return {
    marketOverview: MOCK_MARKET_DATA,
    topOpportunities: MOCK_OPPORTUNITIES,
    newsArticles: MOCK_NEWS,
    lastUpdated: new Date().toISOString(),
    dataSource: "mock",
  };
}
