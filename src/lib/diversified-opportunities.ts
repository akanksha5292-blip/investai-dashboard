import type { Opportunity } from "@/types";

/**
 * High-conviction picks in the Polycab mould:
 * sector leaders, structural tailwinds, clear thesis, not yet fully discovered.
 * One best name per industry — minimum 12 sectors in the pool, top 10 shown daily.
 */
export const DIVERSIFIED_STOCKS: Opportunity[] = [
  {
    id: "stk-electrical",
    name: "Polycab India",
    symbol: "POLYCAB.NS",
    type: "stock",
    theme: "Electrification & Data Centers",
    sector: "Electrical Equipment",
    currentPrice: 6842,
    currency: "INR",
    confidenceScore: 84,
    riskScore: 28,
    potentialUpsideMin: 25,
    potentialUpsideMax: 40,
    timeHorizon: "1–3 years",
    whyItMatters:
      "India's largest cable manufacturer — a direct beneficiary of data centers, grid upgrades, housing, and EV charging infrastructure.",
    whyNow: [
      "Data center cable orders accelerating",
      "Government power infrastructure push",
      "Copper prices stabilizing after correction",
      "Order books up 18% YoY with margin expansion",
    ],
    whyCouldFail: [
      "Government execution delays on infra projects",
      "Valuation already expanded 30% in past year",
      "Copper spike could compress margins",
    ],
    investmentThesis:
      "Polycab is the clearest play on India's electrification megatrend — market leader in a fragmented industry with premium mix shifting higher.",
    bullCase: "Data center + grid + housing wire demand creates a multi-year earnings cycle.",
    bearCase: "Cyclical industrial slowdown and import competition.",
    disconfirmingEvidence: ["Inventory days rose from 38 to 45 last quarter"],
    beneficiarySectors: ["Data Centers", "Power Infrastructure", "Housing"],
  },
  {
    id: "stk-manufacturing",
    name: "Dixon Technologies",
    symbol: "DIXON.NS",
    type: "stock",
    theme: "Electronics Manufacturing (PLI)",
    sector: "Manufacturing",
    currentPrice: 16800,
    currency: "INR",
    confidenceScore: 82,
    riskScore: 32,
    potentialUpsideMin: 22,
    potentialUpsideMax: 38,
    timeHorizon: "2–4 years",
    whyItMatters:
      "India's leading EMS player — Apple, Samsung, and Xiaomi manufacturing shifting to India under PLI schemes.",
    whyNow: [
      "PLI disbursements accelerating for electronics",
      "New smartphone and appliance capacity coming online",
      "Export hub strategy gaining traction",
    ],
    whyCouldFail: [
      "Customer concentration risk (top clients)",
      "Thin margins in contract manufacturing",
      "Execution risk on large capex projects",
    ],
    investmentThesis:
      "Proxy for India's manufacturing renaissance — as global brands localize production, Dixon captures the assembly value chain.",
    bullCase: "Revenue doubling every 3–4 years as capacity ramps.",
    bearCase: "Margin compression if competition intensifies.",
    disconfirmingEvidence: ["Working capital days increased recently"],
    beneficiarySectors: ["Manufacturing", "Electronics", "PLI"],
  },
  {
    id: "stk-defence",
    name: "Bharat Electronics",
    symbol: "BEL.NS",
    type: "stock",
    theme: "Defence Indigenization",
    sector: "Defence",
    currentPrice: 285,
    currency: "INR",
    confidenceScore: 86,
    riskScore: 30,
    potentialUpsideMin: 20,
    potentialUpsideMax: 35,
    timeHorizon: "2–4 years",
    whyItMatters:
      "Defence electronics monopoly with 2x order book-to-revenue — every rupee of defence budget flows through BEL's radar, communication, and weapons systems.",
    whyNow: [
      "Defence budget at record ₹6.2 lakh crore",
      "Atmanirbhar Bharat mandates 68% domestic procurement",
      "Export orders to friendly nations opening up",
    ],
    whyCouldFail: ["PSU execution delays", "Working capital strain", "Valuation rich vs historical"],
    investmentThesis: "Structural multi-year order book visibility — defence spending is non-discretionary and rising.",
    bullCase: "Order inflows sustain 20%+ growth for 5+ years.",
    bearCase: "Government payment delays and margin pressure on legacy orders.",
    disconfirmingEvidence: ["Order inflow moderated in latest quarter"],
    beneficiarySectors: ["Defence", "Aerospace"],
  },
  {
    id: "stk-auto-tech",
    name: "KPIT Technologies",
    symbol: "KPITTECH.NS",
    type: "stock",
    theme: "Auto Software & EV",
    sector: "Auto Technology",
    currentPrice: 1580,
    currency: "INR",
    confidenceScore: 80,
    riskScore: 30,
    potentialUpsideMin: 18,
    potentialUpsideMax: 32,
    timeHorizon: "2–3 years",
    whyItMatters:
      "Pure-play automotive software company riding the EV and autonomous driving wave — embedded systems for global OEMs.",
    whyNow: [
      "EV software content per car 3x vs ICE vehicles",
      "New deals with European and Japanese OEMs",
      "Subscription revenue model improving visibility",
    ],
    whyCouldFail: [
      "Auto cycle downturn reducing R&D spend",
      "Client concentration in few OEMs",
      "Competition from global Tier-1 suppliers",
    ],
    investmentThesis:
      "As cars become computers on wheels, KPIT captures the software layer — higher margins than traditional IT services.",
    bullCase: "EV transition multiplies addressable market per vehicle.",
    bearCase: "OEM budget cuts in recession.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Auto", "EV", "Software"],
  },
  {
    id: "stk-agrochemicals",
    name: "PI Industries",
    symbol: "PIIND.NS",
    type: "stock",
    theme: "Agrochemicals & CSM",
    sector: "Agrochemicals",
    currentPrice: 3850,
    currency: "INR",
    confidenceScore: 78,
    riskScore: 26,
    potentialUpsideMin: 15,
    potentialUpsideMax: 28,
    timeHorizon: "1–3 years",
    whyItMatters:
      "Custom synthesis manufacturing (CSM) leader — global agrochemical giants outsource molecule production to PI, creating sticky long-term contracts.",
    whyNow: [
      "New molecule commercializations ramping",
      "China+1 shifting agrochemical supply chains to India",
      "Strong R&D pipeline with patent protection",
    ],
    whyCouldFail: [
      "Weather-dependent agrochemical demand",
      "Regulatory bans on specific molecules",
      "Customer inventory destocking cycles",
    ],
    investmentThesis:
      "Boring but beautiful — PI makes the active ingredients in crop protection chemicals with 15+ year customer relationships.",
    bullCase: "CSM revenue growing 20%+ with expanding margins.",
    bearCase: "Global agrochemical downturn.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Agrochemicals", "Agriculture"],
  },
  {
    id: "stk-building",
    name: "Kajaria Ceramics",
    symbol: "KAJARIACER.NS",
    type: "stock",
    theme: "Premium Housing Recovery",
    sector: "Building Materials",
    currentPrice: 1280,
    currency: "INR",
    confidenceScore: 76,
    riskScore: 28,
    potentialUpsideMin: 16,
    potentialUpsideMax: 30,
    timeHorizon: "1–2 years",
    whyItMatters:
      "India's largest tile manufacturer — premium housing and commercial real estate recovery drives volume and mix improvement.",
    whyNow: [
      "Premium housing launches at decade-high levels",
      "Market share gains in organized tile segment",
      "New manufacturing capacity in Gujarat operational",
    ],
    whyCouldFail: [
      "Real estate slowdown if rates stay high",
      "Gas price volatility affecting margins",
      "Competition from unorganized players on price",
    ],
    investmentThesis:
      "Organized tiles penetration is only 35% in India — Kajaria benefits as the market shifts from unorganized to branded.",
    bullCase: "Housing upcycle drives 15%+ volume growth.",
    bearCase: "Interest rate sensitivity crushes housing demand.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Realty", "Building Materials"],
  },
  {
    id: "stk-healthcare",
    name: "Max Healthcare",
    symbol: "MAXHEALTH.NS",
    type: "stock",
    theme: "Hospital Expansion",
    sector: "Healthcare",
    currentPrice: 1085,
    currency: "INR",
    confidenceScore: 79,
    riskScore: 27,
    potentialUpsideMin: 18,
    potentialUpsideMax: 30,
    timeHorizon: "2–4 years",
    whyItMatters:
      "Fastest-growing hospital chain in India — bed capacity expansion in tier-1 and tier-2 cities with premium positioning.",
    whyNow: [
      "New hospitals in Lucknow, Nagpur, and Mumbai ramping occupancy",
      "ARPOB (revenue per bed) improving quarter on quarter",
      "Medical tourism recovering post-COVID",
    ],
    whyCouldFail: [
      "High capex intensity strains cash flows",
      "Doctor attrition at new facilities",
      "Regulatory price caps on procedures",
    ],
    investmentThesis:
      "Healthcare is India's most under-penetrated sector — Max is building the 'Marriott of hospitals' with premium pricing power.",
    bullCase: "Bed capacity doubles over 5 years with 25%+ ROCE.",
    bearCase: "Occupancy ramp slower than expected at new hospitals.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Healthcare", "Hospitals"],
  },
  {
    id: "stk-banking",
    name: "Federal Bank",
    symbol: "FEDERALBNK.NS",
    type: "stock",
    theme: "Mid-Cap Banking Turnaround",
    sector: "Banking",
    currentPrice: 195,
    currency: "INR",
    confidenceScore: 77,
    riskScore: 30,
    potentialUpsideMin: 20,
    potentialUpsideMax: 35,
    timeHorizon: "2–3 years",
    whyItMatters:
      "Under-the-radar private bank with new management transforming retail franchise — NIM expansion and credit growth inflection ahead.",
    whyNow: [
      "New CEO driving digital-first retail strategy",
      "Gross NPA at multi-year lows below 2%",
      "CASA ratio improving with premium customer acquisition",
    ],
    whyCouldFail: [
      "Competition from larger private banks",
      "Unsecured lending risks if economy slows",
      "Management execution risk on turnaround",
    ],
    investmentThesis:
      "Classic turnaround play — Federal Bank trades at discount to peers despite improving fundamentals, offering re-rating potential.",
    bullCase: "ROE expansion from 12% to 16%+ as retail mix grows.",
    bearCase: "Credit costs spike in downturn.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Banking", "Financial Services"],
  },
  {
    id: "stk-retail",
    name: "Trent",
    symbol: "TRENT.NS",
    type: "stock",
    theme: "Affordable Fashion",
    sector: "Retail",
    currentPrice: 6850,
    currency: "INR",
    confidenceScore: 81,
    riskScore: 32,
    potentialUpsideMin: 18,
    potentialUpsideMax: 30,
    timeHorizon: "2–4 years",
    whyItMatters:
      "Westside and Zudio are India's fastest-growing fashion retail formats — Zudio alone adding 100+ stores per year at ₹499 price point.",
    whyNow: [
      "Zudio store count crossing 600 with strong same-store sales",
      "Westside premium format profitable in top cities",
      "Tata Group backing enables aggressive expansion",
    ],
    whyCouldFail: [
      "Valuation extremely rich (80x+ earnings)",
      "Fashion trend risk and inventory obsolescence",
      "Competition from Zara, H&M, and online players",
    ],
    investmentThesis:
      "India's answer to Zara — Trent has cracked the affordable fashion code with Zudio, and the store rollout runway is enormous.",
    bullCase: "Zudio reaches 1000+ stores with industry-leading SSSG.",
    bearCase: "Premium valuation leaves no margin of safety.",
    disconfirmingEvidence: ["Same-store sales growth decelerating in latest quarter"],
    beneficiarySectors: ["Retail", "Consumer"],
  },
  {
    id: "stk-consumer",
    name: "Voltas",
    symbol: "VOLTAS.NS",
    type: "stock",
    theme: "AC & Cooling Demand",
    sector: "Consumer Durables",
    currentPrice: 1680,
    currency: "INR",
    confidenceScore: 75,
    riskScore: 26,
    potentialUpsideMin: 15,
    potentialUpsideMax: 28,
    timeHorizon: "1–2 years",
    whyItMatters:
      "Market leader in room air conditioners — India's AC penetration is only 6% vs 60%+ in China, with heat waves driving adoption.",
    whyNow: [
      "Record summer temperatures boosting AC demand",
      "Market share gains from Japanese competitors",
      "Unitary cooling segment (commercial) growing 25%+",
    ],
    whyCouldFail: [
      "Mild summer crushes seasonal demand",
      "Chinese import competition on pricing",
      "Electro-mechanical projects segment drag",
    ],
    investmentThesis:
      "Low penetration + rising incomes + climate change = multi-decade AC adoption cycle. Voltas is the market leader.",
    bullCase: "AC penetration doubles to 12% within 5 years.",
    bearCase: "Competitive pricing war erodes margins.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Consumer Durables", "Climate"],
  },
  {
    id: "stk-chemicals",
    name: "Aarti Industries",
    symbol: "AARTIIND.NS",
    type: "stock",
    theme: "Specialty Chemicals",
    sector: "Chemicals",
    currentPrice: 620,
    currency: "INR",
    confidenceScore: 77,
    riskScore: 29,
    potentialUpsideMin: 18,
    potentialUpsideMax: 32,
    timeHorizon: "2–3 years",
    whyItMatters:
      "Specialty chemical manufacturer with backward integration — supplies pharma, agrochemical, and polymer industries with high entry barriers.",
    whyNow: [
      "China+1 driving global buyers to Indian chemical suppliers",
      "New capacity for nitrochlorobenzene and hydrogenation coming online",
      "Long-term contracts with global MNCs provide visibility",
    ],
    whyCouldFail: [
      "China dumping depressing global chemical prices",
      "Environmental compliance costs rising",
      "Capex overruns on new plants",
    ],
    investmentThesis:
      "India is becoming the world's specialty chemical kitchen — Aarti has 30+ years of process chemistry expertise that's hard to replicate.",
    bullCase: "Export revenue growing 25%+ as global supply chains diversify.",
    bearCase: "Global chemical downcycle compresses margins.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Chemicals", "Pharma", "Agrochemicals"],
  },
  {
    id: "stk-logistics",
    name: "Container Corporation of India",
    symbol: "CONCOR.NS",
    type: "stock",
    theme: "Rail Logistics Monopoly",
    sector: "Logistics",
    currentPrice: 785,
    currency: "INR",
    confidenceScore: 74,
    riskScore: 24,
    potentialUpsideMin: 14,
    potentialUpsideMax: 25,
    timeHorizon: "1–3 years",
    whyItMatters:
      "Near-monopoly in rail container logistics — GST and dedicated freight corridors make rail transport cost-competitive vs road for the first time.",
    whyNow: [
      "Dedicated Freight Corridor (DFC) operational on key routes",
      "Rail share of freight increasing from 18% base",
      "Land monetization unlocking hidden asset value",
    ],
    whyCouldFail: [
      "Private rail operator competition after liberalization",
      "Government interference in pricing",
      "Slower-than-expected DFC adoption",
    ],
    investmentThesis:
      "Toll road of Indian logistics — CONCOR owns the terminals and rolling stock on a network that competitors can't easily replicate.",
    bullCase: "Volume growth accelerates as DFC cuts transit time by 40%.",
    bearCase: "Competition erodes monopoly rents.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Logistics", "Railways", "Infrastructure"],
  },
  {
    id: "stk-power-equip",
    name: "CG Power & Industrial",
    symbol: "CGPOWER.NS",
    type: "stock",
    theme: "Transformers & Power Equipment",
    sector: "Power Equipment",
    currentPrice: 720,
    currency: "INR",
    confidenceScore: 80,
    riskScore: 31,
    potentialUpsideMin: 22,
    potentialUpsideMax: 38,
    timeHorizon: "1–3 years",
    whyItMatters:
      "Turnaround story in transformers and switchgear — Murugappa Group acquisition cleaned up balance sheet; now riding power T&D capex wave.",
    whyNow: [
      "Transformer demand exceeding supply industry-wide",
      "Order book at multi-year highs",
      "Railway and metro electrification orders flowing in",
    ],
    whyCouldFail: [
      "Past governance issues linger in investor perception",
      "Copper and steel input cost volatility",
      "Execution on large EPC orders",
    ],
    investmentThesis:
      "Like Polycab but for transformers — CG Power is a direct play on grid expansion and industrial electrification with a cleaned-up balance sheet.",
    bullCase: "Earnings inflection as high-margin transformer orders execute.",
    bearCase: "Turnaround stalls if order execution slips.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Power Infrastructure", "Transformers", "Railways"],
  },
  {
    id: "stk-it",
    name: "Persistent Systems",
    symbol: "PERSISTENT.NS",
    type: "stock",
    theme: "Software Product Engineering",
    sector: "IT Services",
    currentPrice: 5850,
    currency: "INR",
    confidenceScore: 79,
    riskScore: 25,
    potentialUpsideMin: 16,
    potentialUpsideMax: 28,
    timeHorizon: "1–3 years",
    whyItMatters:
      "Mid-cap IT gem focused on software product engineering — higher margins than body-shopping IT services, with AI/ML capabilities.",
    whyNow: [
      "Product engineering deals growing faster than legacy IT",
      "Strategic acquisitions expanding healthcare and BFSI verticals",
      "Attrition lowest among mid-cap IT peers",
    ],
    whyCouldFail: [
      "US tech spending slowdown",
      "Acquisition integration risks",
      "Valuation premium to larger IT peers",
    ],
    investmentThesis:
      "Not your typical IT outsourcer — Persistent builds software products for ISVs and enterprises, commanding premium billing rates.",
    bullCase: "AI services revenue becomes meaningful growth driver.",
    bearCase: "Client budget cuts in US recession.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["IT Services", "Software"],
  },
];

export const DIVERSIFIED_FUNDS: Opportunity[] = [
  {
    id: "mf-flexi",
    name: "Parag Parikh Flexi Cap Fund",
    symbol: "122639",
    type: "mutual_fund",
    theme: "Quality Growth",
    sector: "Flexi Cap",
    currentPrice: 82.45,
    currency: "INR",
    confidenceScore: 86,
    riskScore: 20,
    potentialUpsideMin: 12,
    potentialUpsideMax: 18,
    timeHorizon: "3–5 years",
    whyItMatters: "Gold standard flexi cap fund — global diversification, value discipline, and consistent top-quartile returns over 10 years.",
    whyNow: ["Consistent long-term outperformance", "Global allocation reduces India risk", "Reasonable entry after correction"],
    whyCouldFail: ["USD strength hurts international holdings", "Large cap concentration"],
    investmentThesis: "The fund every serious Indian investor should consider as a core holding.",
    bullCase: "Compounding through quality at reasonable prices.",
    bearCase: "Underperformance in momentum markets.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Diversified"],
  },
  {
    id: "mf-largecap",
    name: "Mirae Asset Large Cap Fund",
    symbol: "118825",
    type: "mutual_fund",
    theme: "Blue Chip Stability",
    sector: "Large Cap",
    currentPrice: 112.3,
    currency: "INR",
    confidenceScore: 82,
    riskScore: 18,
    potentialUpsideMin: 10,
    potentialUpsideMax: 16,
    timeHorizon: "3–5 years",
    whyItMatters: "Consistent large cap performer — ideal core holding for stable equity exposure to India's best companies.",
    whyNow: ["Large caps undervalued vs mid/small caps", "Institutional flows favoring quality"],
    whyCouldFail: ["Underperforms if small caps rally sharply"],
    investmentThesis: "Bedrock equity allocation for conservative long-term investors.",
    bullCase: "Nifty 50 earnings recovery drives returns.",
    bearCase: "Style rotation away from large caps.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Large Cap"],
  },
  {
    id: "mf-midcap",
    name: "Kotak Emerging Equity Fund",
    symbol: "100377",
    type: "mutual_fund",
    theme: "Mid Cap Growth",
    sector: "Mid Cap",
    currentPrice: 98.5,
    currency: "INR",
    confidenceScore: 80,
    riskScore: 28,
    potentialUpsideMin: 14,
    potentialUpsideMax: 22,
    timeHorizon: "3–5 years",
    whyItMatters: "Proven mid cap stock-picker — many Polycab-style discoveries in portfolio before they became large caps.",
    whyNow: ["Mid cap earnings growth outpacing large caps", "Domestic economy recovery play"],
    whyCouldFail: ["Mid cap valuations elevated", "Liquidity risk in corrections"],
    investmentThesis: "Access to India's next generation of large caps through experienced managers.",
    bullCase: "Domestic capex and consumption benefit mid caps.",
    bearCase: "Small/mid cap correction risk.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Mid Cap"],
  },
  {
    id: "mf-smallcap",
    name: "Nippon India Small Cap Fund",
    symbol: "118778",
    type: "mutual_fund",
    theme: "Small Cap Alpha",
    sector: "Small Cap",
    currentPrice: 142.8,
    currency: "INR",
    confidenceScore: 75,
    riskScore: 35,
    potentialUpsideMin: 16,
    potentialUpsideMax: 28,
    timeHorizon: "5+ years",
    whyItMatters: "Where Polycab-style multibaggers are found — high-conviction small cap fund for aggressive investors.",
    whyNow: ["Manufacturing PLI beneficiaries in portfolio", "Small cap earnings cycle turning up"],
    whyCouldFail: ["SEBI small cap regulation risk", "Liquidity crunch in sell-offs"],
    investmentThesis: "Highest return potential for investors with 5+ year horizon and stomach for volatility.",
    bullCase: "India manufacturing boom lifts small caps.",
    bearCase: "Valuations at historical highs.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Small Cap"],
  },
  {
    id: "mf-index",
    name: "UTI Nifty 50 Index Fund",
    symbol: "120716",
    type: "mutual_fund",
    theme: "Passive Investing",
    sector: "Index Fund",
    currentPrice: 168.2,
    currency: "INR",
    confidenceScore: 78,
    riskScore: 15,
    potentialUpsideMin: 10,
    potentialUpsideMax: 15,
    timeHorizon: "5+ years",
    whyItMatters: "Lowest-cost way to own India's top 50 companies — no fund manager risk, just market returns.",
    whyNow: ["Expense ratio under 0.2%", "Passive investing gaining adoption in India"],
    whyCouldFail: ["No alpha generation", "Concentrated in few large names"],
    investmentThesis: "Set-and-forget core holding for every investor.",
    bullCase: "India GDP growth drives index returns.",
    bearCase: "Active funds outperform in stock-picker markets.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Index"],
  },
  {
    id: "mf-gold",
    name: "SBI Gold ETF",
    symbol: "115585",
    type: "mutual_fund",
    theme: "Gold Hedge",
    sector: "Gold ETF",
    currentPrice: 68.5,
    currency: "INR",
    confidenceScore: 72,
    riskScore: 12,
    potentialUpsideMin: 8,
    potentialUpsideMax: 15,
    timeHorizon: "3–5 years",
    whyItMatters: "Portfolio insurance — 5-10% gold allocation reduces volatility and hedges rupee depreciation.",
    whyNow: ["Gold at support levels", "Central banks buying globally", "Geopolitical uncertainty"],
    whyCouldFail: ["Real rates rising", "USD strength", "Risk-on equity rally"],
    investmentThesis: "Every portfolio needs a gold hedge — this is the simplest way to get it.",
    bullCase: "Geopolitical tensions support gold.",
    bearCase: "Equity rally reduces safe-haven demand.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Gold"],
  },
  {
    id: "mf-international",
    name: "Motilal Oswal Nasdaq 100 FOF",
    symbol: "149030",
    type: "mutual_fund",
    theme: "US Tech Exposure",
    sector: "International",
    currentPrice: 42.8,
    currency: "INR",
    confidenceScore: 74,
    riskScore: 30,
    potentialUpsideMin: 12,
    potentialUpsideMax: 22,
    timeHorizon: "3–5 years",
    whyItMatters: "Own Apple, Microsoft, Nvidia, and Google through an Indian mutual fund — geographic diversification.",
    whyNow: ["AI revolution driven by US tech giants", "Rupee diversification benefit"],
    whyCouldFail: ["USD-INR currency risk", "US recession", "Tech valuation correction"],
    investmentThesis: "Don't put all eggs in the India basket — 10-15% global exposure is prudent.",
    bullCase: "AI capex cycle benefits Nasdaq constituents.",
    bearCase: "US rate hikes compress tech multiples.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["International", "Technology"],
  },
  {
    id: "mf-banking",
    name: "ICICI Pru Banking & Financial Services",
    symbol: "120594",
    type: "mutual_fund",
    theme: "Financial Sector",
    sector: "Sectoral - Banking",
    currentPrice: 22.5,
    currency: "INR",
    confidenceScore: 76,
    riskScore: 26,
    potentialUpsideMin: 12,
    potentialUpsideMax: 20,
    timeHorizon: "2–3 years",
    whyItMatters: "Sectoral bet on India's financial services growth — banks, NBFCs, and insurance in one fund.",
    whyNow: ["Credit growth cycle intact", "Financial inclusion expanding", "Insurance penetration low"],
    whyCouldFail: ["Credit cycle downturn", "NBFC liquidity issues"],
    investmentThesis: "India's credit-to-GDP ratio has massive room to grow vs developed markets.",
    bullCase: "Rate cut cycle boosts financial sector earnings.",
    bearCase: "Rising NPAs in unsecured lending.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Banking", "NBFC"],
  },
  {
    id: "mf-hybrid",
    name: "ICICI Pru Balanced Advantage Fund",
    symbol: "120364",
    type: "mutual_fund",
    theme: "Dynamic Asset Allocation",
    sector: "Hybrid",
    currentPrice: 72.4,
    currency: "INR",
    confidenceScore: 80,
    riskScore: 16,
    potentialUpsideMin: 9,
    potentialUpsideMax: 14,
    timeHorizon: "3–5 years",
    whyItMatters: "Automatically shifts between equity and debt based on market valuations — sleeps well at night fund.",
    whyNow: ["Equity valuations elevated — fund reducing equity exposure", "Lower volatility than pure equity"],
    whyCouldFail: ["Underperforms in strong bull markets"],
    investmentThesis: "Ideal for moderate risk investors who want equity upside with downside protection.",
    bullCase: "Dynamic allocation protects in corrections.",
    bearCase: "Misses full upside in raging bull market.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["Hybrid"],
  },
  {
    id: "mf-elss",
    name: "Axis Long Term Equity Fund",
    symbol: "120503",
    type: "mutual_fund",
    theme: "Tax Saving",
    sector: "ELSS",
    currentPrice: 88.6,
    currency: "INR",
    confidenceScore: 78,
    riskScore: 24,
    potentialUpsideMin: 11,
    potentialUpsideMax: 17,
    timeHorizon: "3+ years (lock-in)",
    whyItMatters: "Best ELSS fund for tax saving under Section 80C — equity growth plus ₹46,800 tax savings (in 30% bracket).",
    whyNow: ["Tax-saving season Jan–Mar", "Consistent ELSS category performer"],
    whyCouldFail: ["3-year lock-in traps capital in downturn"],
    investmentThesis: "Kill two birds — save tax and build wealth through equity.",
    bullCase: "Tax saving + equity compounding.",
    bearCase: "Lock-in period risk.",
    disconfirmingEvidence: [],
    beneficiarySectors: ["ELSS", "Tax Saving"],
  },
];

export function calcRiskAdjustedReturn(opp: Opportunity): number {
  const upsideMid = (opp.potentialUpsideMin + opp.potentialUpsideMax) / 2;
  return Math.round((upsideMid / Math.max(opp.riskScore, 1)) * 10) / 10;
}

/** Pick top N opportunities with at most one per sector/category */
export function pickDiversified(
  pool: Opportunity[],
  count: number,
  groupBy: "sector" | "theme" = "sector"
): Opportunity[] {
  const sorted = [...pool].sort(
    (a, b) => calcRiskAdjustedReturn(b) - calcRiskAdjustedReturn(a)
  );

  const seen = new Set<string>();
  const result: Opportunity[] = [];

  for (const opp of sorted) {
    const key = groupBy === "sector" ? opp.sector : opp.theme;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(opp);
    if (result.length >= count) break;
  }

  if (result.length < count) {
    for (const opp of sorted) {
      if (result.find((r) => r.id === opp.id)) continue;
      result.push(opp);
      if (result.length >= count) break;
    }
  }

  return result;
}

/** Daily stock picks: 10 high-conviction names from 10 different industries */
export function getDailyStockPicks(extraOpportunities: Opportunity[] = []): Opportunity[] {
  const merged = [...DIVERSIFIED_STOCKS];
  for (const opp of extraOpportunities) {
    if (opp.type !== "stock") continue;
    if (!merged.find((m) => m.sector === opp.sector)) {
      merged.push(opp);
    }
  }
  return pickDiversified(merged, 10, "sector");
}

/** Daily fund picks: 10 funds from different categories */
export function getDailyFundPicks(extraOpportunities: Opportunity[] = []): Opportunity[] {
  const merged = [...DIVERSIFIED_FUNDS];
  for (const opp of extraOpportunities) {
    if (opp.type !== "mutual_fund") continue;
    if (!merged.find((m) => m.sector === opp.sector)) {
      merged.push(opp);
    }
  }
  return pickDiversified(merged, 10, "sector");
}

/** Combined daily recommendations */
export function getDiversifiedOpportunities(aiOpportunities: Opportunity[] = []): Opportunity[] {
  const stocks = getDailyStockPicks(aiOpportunities);
  const funds = getDailyFundPicks(aiOpportunities);
  return [...stocks, ...funds];
}
