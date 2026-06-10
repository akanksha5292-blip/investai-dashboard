import type { IpoStatus, UpcomingIpo } from "@/types/ipo";

/** Curated from Moneycontrol / Zerodha IPO calendar — refresh weekly */
const IPO_CATALOG: UpcomingIpo[] = [
  // ── Open / opening this week (Jun 2026) ──────────────────────────────────
  {
    id: "utkal-speciality",
    companyName: "Utkal Speciality Industries",
    sector: "Packaging / Paper",
    status: "Upcoming",
    openDate: "2026-06-10",
    closeDate: "2026-06-12",
    listingDate: "2026-06-17",
    expectedOpenDate: "10–12 Jun 2026",
    priceBandMin: 62,
    priceBandMax: 66,
    issueSizeCr: 34.54,
    lotSize: 2000,
    leadManagers: ["Affinity Global Capital"],
    businessSummary:
      "Kolkata-based SME making paper-based packaging and sustainable consumer products — tissues, cups, and food packaging for retail and HoReCa.",
    honestTake:
      "Typical SME packaging play riding the 'sustainable alternatives' narrative. GMP was volatile (₹6–₹13) ahead of open — suggests listing pop possible but unreliable. ₹1.32L minimum ticket is high for retail. Only for listing-day traders who understand SME liquidity risk; not a long-term hold.",
    verdict: "Listing Gains Only",
    worthInvesting: false,
    upsideMin: 15,
    upsideMax: 35,
    downsideMin: 20,
    downsideMax: 45,
    riskScore: 72,
    confidenceScore: 42,
    listingGainPotential: "Moderate — GMP implied ~20% pop but SME premiums swing wildly",
    longTermPotential: "Poor — low float, no analyst coverage, packaging is commoditized",
    bullCase: "Sustainability tailwind. Low issue size can drive short-term pop. Paper alternatives growing vs plastic.",
    bearCase: "SME graveyard track record. High minimum lot. Volatile GMP. No institutional anchor demand.",
    whySubscribe: ["Listing-day trade only with strict exit plan"],
    whyAvoid: ["Never hold SME IPOs long term", "₹1.32L minimum is steep for speculative bet"],
    greyMarketPremium: 13,
    peerComparison: "Similar to recent packaging SME IPOs — pop on day 1, fade within months",
  },
  {
    id: "susan-electricals",
    companyName: "Susan Electricals India",
    sector: "Electrical Equipment",
    status: "Upcoming",
    openDate: "2026-06-11",
    closeDate: "2026-06-15",
    listingDate: "2026-06-18",
    expectedOpenDate: "11–15 Jun 2026",
    priceBandMin: 120,
    priceBandMax: 127,
    issueSizeCr: 70.38,
    lotSize: 1000,
    leadManagers: ["To be announced"],
    businessSummary:
      "Rajasthan-based manufacturer of LT panels, busbars, and electrical distribution equipment for industrial and infrastructure clients.",
    honestTake:
      "Infrastructure capex theme is real, but this is a small ₹70 Cr SME with promoter OFS in the mix — they're partially cashing out. Electrical panel makers are plentiful; moat is weak. Subscribe only if GMP stays strong and you plan to sell on listing. ₹2.54L retail minimum limits participation to HNIs anyway.",
    verdict: "Listing Gains Only",
    worthInvesting: false,
    upsideMin: 12,
    upsideMax: 30,
    downsideMin: 22,
    downsideMax: 40,
    riskScore: 68,
    confidenceScore: 48,
    listingGainPotential: "Moderate — infra theme helps sentiment on listing day",
    longTermPotential: "Low — fragmented sector, no pricing power, cyclical order book",
    bullCase: "India infra and data-centre capex driving panel demand. Fresh issue funds capacity expansion.",
    bearCase: "Promoter selling 8L shares via OFS. SME liquidity trap. Competition from Havells, Schneider ecosystem players.",
    whySubscribe: ["If GMP >15% and you can exit on listing day"],
    whyAvoid: ["Promoter exit in same issue", "Better infra exposure via Polycab or ABB in secondary market"],
    greyMarketPremium: 8,
    peerComparison: "No direct listed peer at this scale — compare to SME electrical IPOs that faded post-listing",
  },
  {
    id: "horizon-reclaim",
    companyName: "Horizon Reclaim (India)",
    sector: "Waste Management / Recycling",
    status: "Upcoming",
    openDate: "2026-06-12",
    closeDate: "2026-06-16",
    listingDate: "2026-06-19",
    expectedOpenDate: "12–16 Jun 2026",
    priceBandMin: 98,
    priceBandMax: 103,
    issueSizeCr: 54.27,
    lotSize: 1200,
    leadManagers: ["To be announced"],
    businessSummary:
      "Waste management and material reclaim company — recycling industrial waste, e-waste processing, and circular-economy services.",
    honestTake:
      "ESG and circular economy are hot themes, which helps listing-day narrative. But waste management in India is fragmented, contract-dependent, and margin-thin. Pure fresh issue (no OFS) is a positive — promoters still believe. Still an SME with all the usual risks. Neutral-to-slightly-positive for listing pop only.",
    verdict: "Neutral",
    worthInvesting: false,
    upsideMin: 10,
    upsideMax: 28,
    downsideMin: 18,
    downsideMax: 38,
    riskScore: 65,
    confidenceScore: 50,
    listingGainPotential: "Moderate — ESG theme can attract retail hype on SME segment",
    longTermPotential: "Uncertain — depends on municipal contracts and regulatory enforcement of waste norms",
    bullCase: "Circular economy tailwind. 100% fresh issue — growth capital, not exit. Government push on waste rules.",
    bearCase: "Low-margin business. Execution risk on new plants. SME segment lacks institutional support.",
    whySubscribe: ["If you want ESG-themed listing pop and can sell early"],
    whyAvoid: ["Long-term hold in waste SME is untested", "Contract revenue can be lumpy"],
    greyMarketPremium: 5,
    peerComparison: "No listed pure-play waste reclaim peer in India at this size",
  },

  // ── SEBI approved / DRHP filed — dates TBA ─────────────────────────────
  {
    id: "incred-holdings",
    companyName: "InCred Holdings",
    sector: "NBFC / Fintech",
    status: "Filed",
    expectedOpenDate: "Date TBA (SEBI approved)",
    issueSizeCr: 1250,
    leadManagers: ["IIFL Capital", "InCred Capital", "Kotak Mahindra Capital", "Nomura", "UBS"],
    businessSummary:
      "KKR-backed diversified financial services group — InCred Finance NBFC (₹14,448 Cr AUM), wealth, and insurance distribution. PAT grew 85% CAGR FY23–FY25.",
    honestTake:
      "One of the stronger NBFC IPO candidates in the 2026 pipeline. Fast growth, low NNPA (0.7%), and KKR pedigree. But NBFC sector is under RBI scrutiny and the issue includes a large OFS (KKR selling). If priced below 4x book, genuinely interesting for 3+ year hold. Above 5x, skip.",
    verdict: "Neutral",
    worthInvesting: false,
    upsideMin: 12,
    upsideMax: 30,
    downsideMin: 15,
    downsideMax: 28,
    riskScore: 42,
    confidenceScore: 68,
    listingGainPotential: "Moderate — KKR name + NBFC growth story will draw demand",
    longTermPotential: "Good if priced reasonably — diversified lender with strong growth metrics",
    bullCase: "85% PAT CAGR. Low NPAs. KKR operational expertise. Diversified beyond unsecured.",
    bearCase: "KKR partial exit via OFS. RBI tightening on unsecured lending. NBFC sector sentiment fragile.",
    whySubscribe: ["If P/B below 4x — rare quality NBFC IPO"],
    whyAvoid: ["If priced at premium to Cholamandalam", "OFS signals partial PE exit"],
    peerComparison: "Cholamandalam at ~4x book, Bajaj Finance at ~6x — fair zone is 4–5x",
  },
  {
    id: "rk-steel",
    companyName: "RK Steel Manufacturing",
    sector: "Steel Pipes / Infrastructure",
    status: "Filed",
    expectedOpenDate: "Date TBA (SEBI approved Apr 2026)",
    leadManagers: ["To be announced"],
    businessSummary:
      "Tamil Nadu-based manufacturer of steel tubes and pipes for water, oil & gas, and construction infrastructure projects.",
    honestTake:
      "Pure play on India's infra capex cycle — pipes go into every highway, water, and gas project. Business is cyclical and commodity-linked; margins depend on steel prices. Wait for price band — if issued at <12x earnings with visible order book, worth a look for aggressive investors.",
    verdict: "Neutral",
    worthInvesting: false,
    upsideMin: 10,
    upsideMax: 25,
    downsideMin: 18,
    downsideMax: 35,
    riskScore: 55,
    confidenceScore: 52,
    listingGainPotential: "Unknown until price band — infra theme helps",
    longTermPotential: "Moderate — tied to govt capex; cyclical",
    bullCase: "Infrastructure super-cycle. Water and gas pipeline demand rising. SEBI approval secured.",
    bearCase: "Steel price volatility. Cyclical earnings. Small-cap liquidity risk post-listing.",
    whySubscribe: ["If priced below 12x P/E with strong order book visibility"],
    whyAvoid: ["Commodity cyclical at wrong point in cycle", "Better large-cap infra via L&T"],
  },
  {
    id: "tata-capital",
    companyName: "Tata Capital",
    sector: "NBFC / Financial Services",
    status: "Filed",
    expectedOpenDate: "Date TBA (H2 2026)",
    issueSizeCr: 15000,
    leadManagers: ["To be announced"],
    businessSummary:
      "Tata Group's NBFC — consumer loans, SME lending, wealth management, and insurance distribution. ₹1.5 lakh Cr+ AUM with Tata brand backing.",
    honestTake:
      "Tata brand is gold and the lending book is solid. But ₹15,000 Cr is enormous — one of the largest NBFC IPOs ever. Retail will bid for Tata loyalty; institutions will price it rationally. Subscribe only if valuation is at or below Bajaj Finance. Otherwise, buy Bajaj Finance in secondary market instead.",
    verdict: "Neutral",
    worthInvesting: false,
    upsideMin: 10,
    upsideMax: 22,
    downsideMin: 12,
    downsideMax: 25,
    riskScore: 40,
    confidenceScore: 65,
    listingGainPotential: "Moderate — Tata brand drives retail oversubscription",
    longTermPotential: "Good compounder if priced right — Tata trust + diversified NBFC",
    bullCase: "Tata brand. Diversified lending. Strong parent. Institutional quality.",
    bearCase: "Massive issue size. NBFC regulatory risk. Tata premium may inflate pricing.",
    whySubscribe: ["If at discount to Bajaj Finance P/B"],
    whyAvoid: ["If Tata premium pushes valuation above peers", "Huge supply from large issue"],
    peerComparison: "Bajaj Finance ~6x book — Tata should price between Chola and Bajaj",
  },
  {
    id: "nse",
    companyName: "National Stock Exchange (NSE)",
    sector: "Financial Services / Exchange",
    status: "Filed",
    expectedOpenDate: "Date TBA (pending final SEBI clearance)",
    issueSizeCr: 10000,
    leadManagers: ["To be announced"],
    businessSummary:
      "India's largest stock exchange — near-monopoly in equity derivatives (99%+ share). Among the most profitable financial institutions in India with 50%+ net margins.",
    honestTake:
      "The most anticipated IPO in Indian market history. NSE prints money — but regulatory risk is real (SEBI penalties, colocation history). Pricing is everything: below 30x earnings = generational opportunity; above 40x = hype tax. Do not commit until price band is announced.",
    verdict: "Neutral",
    worthInvesting: false,
    upsideMin: 15,
    upsideMax: 40,
    downsideMin: 10,
    downsideMax: 25,
    riskScore: 30,
    confidenceScore: 75,
    listingGainPotential: "High if priced reasonably — massive pent-up demand",
    longTermPotential: "Very high at fair price — monopoly cash flows, India market growth",
    bullCase: "Near-monopoly. Derivatives cash cow. India financialisation megatrend.",
    bearCase: "Regulatory overhang. Aggressive pricing risk given hype. BSE already trades at premium.",
    whySubscribe: ["Only if P/E below 30x — rare monopoly asset"],
    whyAvoid: ["If P/E above 40x — you're paying for headlines"],
    peerComparison: "BSE trades ~55x — NSE deserves premium but not unlimited",
  },
  {
    id: "reliance-jio",
    companyName: "Reliance Jio Platforms",
    sector: "Telecom / Digital",
    status: "Filed",
    expectedOpenDate: "Date TBA (H2 2026)",
    issueSizeCr: 50000,
    leadManagers: ["To be announced"],
    businessSummary:
      "India's largest telecom and digital platform — 500M+ subscribers, JioFiber, JioMart, and enterprise digital services. Potential largest IPO in Indian history.",
    honestTake:
      "Jio changed Indian telecom forever, but this IPO is about Ambani monetising a crown jewel. Issue size could exceed ₹50,000 Cr — liquidity will be fine but listing pop may be muted due to size. Long-term hold depends entirely on pricing and whether you believe Jio can monetise beyond telecom (fintech, commerce, AI). Wait for DRHP and price band.",
    verdict: "Neutral",
    worthInvesting: false,
    upsideMin: 10,
    upsideMax: 25,
    downsideMin: 12,
    downsideMax: 22,
    riskScore: 38,
    confidenceScore: 70,
    listingGainPotential: "Moderate — size caps pop but brand ensures oversubscription",
    longTermPotential: "High if digital monetisation succeeds — India's largest consumer platform",
    bullCase: "500M users. Telecom monopoly profits fund digital bets. Ambani execution track record.",
    bearCase: "Partial monetisation for Reliance — not pure growth raise. Extreme issue size. Digital bets unproven at scale.",
    whySubscribe: ["If priced below global telecom/digital comps"],
    whyAvoid: ["If valuation assumes perfect execution on JioMart/fintech", "You already have Reliance exposure"],
    peerComparison: "No direct comp — global telcos trade 12–18x earnings; Jio will demand premium",
  },
  {
    id: "phonepe",
    companyName: "PhonePe",
    sector: "Fintech / Payments",
    status: "Filed",
    expectedOpenDate: "Date TBA (H2 2026)",
    issueSizeCr: 10000,
    leadManagers: ["To be announced"],
    businessSummary:
      "India's largest UPI payments app — also offers insurance, mutual funds, and merchant services. Walmart-backed with dominant UPI market share.",
    honestTake:
      "PhonePe wins on UPI volume but profits are thin — payments is a low-margin utility. The IPO story is 'financial services cross-sell' (insurance, wealth). Paytm's disastrous listing is the cautionary tale. Only subscribe if profitability path is clear in DRHP and valuation is below 8x revenue.",
    verdict: "Neutral",
    worthInvesting: false,
    upsideMin: 12,
    upsideMax: 30,
    downsideMin: 20,
    downsideMax: 40,
    riskScore: 55,
    confidenceScore: 58,
    listingGainPotential: "Moderate — fintech hype vs Paytm scar tissue",
    longTermPotential: "Depends on monetisation — payments alone won't justify valuation",
    bullCase: "UPI leader. Cross-sell into high-margin insurance and wealth. Walmart backing.",
    bearCase: "Paytm fell 80% post-listing. Payments margins near zero. Walmart may sell via OFS.",
    whySubscribe: ["If profitable on operating level and priced below 8x revenue"],
    whyAvoid: ["Paytm precedent", "Payments is a commodity — no moat on UPI rails"],
    peerComparison: "Paytm trades at fraction of IPO price — fintech sentiment destroyed",
  },
  {
    id: "zepto",
    companyName: "Zepto",
    sector: "Quick Commerce",
    status: "Filed",
    expectedOpenDate: "Date TBA (2026)",
    issueSizeCr: 11000,
    leadManagers: ["To be announced"],
    businessSummary:
      "10-minute grocery delivery unicorn — competing with Blinkit and Swiggy Instamart. Rapid revenue growth but still loss-making.",
    honestTake:
      "Quick commerce is growing 100%+ but nobody has proven sustainable unit economics yet. Zepto's IPO is a bet that scale leads to profitability — same thesis that destroyed Zomato holders for years. High risk. Only for those who believe quick commerce is India's next structural shift and can stomach 40% drawdowns.",
    verdict: "Avoid",
    worthInvesting: false,
    upsideMin: 15,
    upsideMax: 40,
    downsideMin: 30,
    downsideMax: 55,
    riskScore: 72,
    confidenceScore: 45,
    listingGainPotential: "Unpredictable — growth story could pop or flop like Delhivery",
    longTermPotential: "Uncertain — winner-take-most market but profits unproven",
    bullCase: "Quick commerce adoption exploding. Zepto gaining share. Path to EBITDA positive by FY27.",
    bearCase: "Still loss-making. Delhivery down 50% from listing. Cash burn in price wars.",
    whySubscribe: ["Only if you accept venture-capital risk in a public stock"],
    whyAvoid: ["No proven profitability", "Blinkit/Swiggy competition intensifying", "Loss-making IPOs rarely reward long-term holders"],
    peerComparison: "Delhivery and Zomato — growth without profits destroyed shareholder wealth",
  },
  {
    id: "boat",
    companyName: "boAt",
    sector: "Consumer Electronics / D2C",
    status: "Filed",
    expectedOpenDate: "Date TBA (SEBI approved)",
    issueSizeCr: 1500,
    leadManagers: ["To be announced"],
    businessSummary:
      "India's largest D2C audio and wearables brand — earbuds, smartwatches, and speakers. SEBI-approved IPO with ₹500 Cr fresh issue + ₹1,000 Cr OFS.",
    honestTake:
      "boAt built a genuine brand in affordable audio, but Chinese competition (Noise, Realme) is fierce and margins are thin. The ₹1,000 Cr OFS means promoters are cashing out heavily. At 3-4x revenue it could work; above 5x it's priced for perfection in a commoditised category.",
    verdict: "Listing Gains Only",
    worthInvesting: false,
    upsideMin: 10,
    upsideMax: 25,
    downsideMin: 20,
    downsideMax: 35,
    riskScore: 58,
    confidenceScore: 52,
    listingGainPotential: "Moderate — consumer brand IPOs get retail attention",
    longTermPotential: "Low — audio/wearables is hyper-competitive with no durable moat",
    bullCase: "Brand recall among youth. Wearables growing faster than audio. Omnichannel distribution.",
    bearCase: "67% OFS is promoter exit. Chinese brands undercut on price. Low switching costs for consumers.",
    whySubscribe: ["Listing-day pop play on brand hype"],
    whyAvoid: ["Massive promoter OFS", "No moat in consumer electronics", "Better consumer plays exist in secondary market"],
    peerComparison: "No listed Indian D2C audio peer — global comps trade 2-4x revenue",
  },
  {
    id: "physicswallah",
    companyName: "PhysicsWallah",
    sector: "EdTech",
    status: "Filed",
    expectedOpenDate: "Date TBA (H2 2026)",
    issueSizeCr: 3500,
    leadManagers: ["To be announced"],
    businessSummary:
      "Profitable EdTech — 5M+ paid students for JEE, NEET, and UPSC prep. Founder-led, affordable pricing, unlike loss-making peers.",
    honestTake:
      "The anti-Byju's. Actually profitable with positive unit economics and a teacher-brand moat (Alakh Pandey). If priced below 15x revenue, this is the most interesting consumer IPO in the pipeline. EdTech stigma from Byju's collapse means you may get a discount — that's the opportunity.",
    verdict: "Subscribe",
    worthInvesting: true,
    upsideMin: 20,
    upsideMax: 45,
    downsideMin: 15,
    downsideMax: 30,
    riskScore: 48,
    confidenceScore: 72,
    listingGainPotential: "High — profitable EdTech is a rare narrative",
    longTermPotential: "High if 50%+ growth sustains — massive underpenetrated test-prep market",
    bullCase: "Profitable. Founder-led. Affordable mass-market model. 5M students with ARPU upside.",
    bearCase: "EdTech sector stigma. Free YouTube competes. Scaling beyond test prep unproven.",
    whySubscribe: [
      "Rare profitable EdTech with real moat",
      "Mass-market affordable education",
      "Founder has skin in the game",
    ],
    whyAvoid: ["EdTech sentiment risk", "Growth deceleration as base grows"],
    peerComparison: "No profitable listed EdTech peer — could redefine sector valuation",
  },
  {
    id: "payu",
    companyName: "PayU (Prosus)",
    sector: "Fintech / Payments",
    status: "Filed",
    expectedOpenDate: "Date TBA",
    issueSizeCr: 5000,
    leadManagers: ["To be announced"],
    businessSummary:
      "Digital payments gateway and lending platform — strong in merchant acquiring, BNPL, and cross-border payments. Prosus (Naspers) backed.",
    honestTake:
      "PayU is the B2B payments infrastructure play vs PhonePe's B2C UPI story. More defensible (merchant switching costs) but growth is slower. Prosus IPO is partially an exit. Interesting only if priced as infrastructure (12-15x earnings), not as fintech growth (30x+).",
    verdict: "Neutral",
    worthInvesting: false,
    upsideMin: 10,
    upsideMax: 22,
    downsideMin: 15,
    downsideMax: 30,
    riskScore: 50,
    confidenceScore: 55,
    listingGainPotential: "Low to moderate — B2B fintech lacks retail hype",
    longTermPotential: "Moderate — merchant payments is stickier than UPI consumer apps",
    bullCase: "Merchant acquiring moat. Prosus global expertise. Lending cross-sell.",
    bearCase: "Prosus partial exit. Razorpay competition. RBI fintech regulation tightening.",
    whySubscribe: ["If priced as payments infrastructure, not growth fintech"],
    whyAvoid: ["Fintech IPO fatigue after Paytm", "Prosus selling stake"],
  },
  {
    id: "kent-ro",
    companyName: "Kent RO Systems",
    sector: "Consumer Durables / Water Purifiers",
    status: "Filed",
    expectedOpenDate: "Date TBA",
    leadManagers: ["To be announced"],
    businessSummary:
      "Market leader in residential water purifiers and kitchen appliances — strong brand in tier 1/2 cities with expanding distribution.",
    honestTake:
      "Kent is a real business with brand recall, unlike many D2C IPOs. Water purifier penetration in India is still low. But it's a mature category and Kent's growth has slowed. Fair IPO if priced at 25-30x earnings; expensive above 40x. Decent but not exciting — buy Voltas or Havells if you want consumer durables exposure today.",
    verdict: "Neutral",
    worthInvesting: false,
    upsideMin: 8,
    upsideMax: 18,
    downsideMin: 12,
    downsideMax: 25,
    riskScore: 45,
    confidenceScore: 58,
    listingGainPotential: "Low to moderate — consumer brand but no hype factor",
    longTermPotential: "Moderate — steady compounder if priced fairly",
    bullCase: "Brand leader in water purifiers. Low penetration. Recurring filter replacement revenue.",
    bearCase: "Growth slowing. Competition from Aquaguard, Pureit. Not a high-growth story.",
    whySubscribe: ["If P/E below 30x — steady consumer compounder"],
    whyAvoid: ["Mature business at growth valuation", "Havells/AO Smith better diversified"],
    peerComparison: "Havells ~60x P/E but growing faster — Kent should trade at discount",
  },
];

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function resolveStatus(ipo: UpcomingIpo, today: Date): IpoStatus {
  if (ipo.openDate && ipo.closeDate) {
    const open = startOfDay(new Date(ipo.openDate));
    const close = startOfDay(new Date(ipo.closeDate));
    if (today >= open && today <= close) return "Open";
    if (today < open) return "Upcoming";
  }
  return ipo.status;
}

function isActiveIpo(ipo: UpcomingIpo, today: Date): boolean {
  if (ipo.closeDate) {
    const close = startOfDay(new Date(ipo.closeDate));
    if (today > close) return false;
  }
  return true;
}

function sortIpos(a: UpcomingIpo, b: UpcomingIpo): number {
  const statusOrder: Record<IpoStatus, number> = {
    Open: 0,
    Upcoming: 1,
    Filed: 2,
    "Recently Listed": 3,
  };
  const statusDiff = statusOrder[a.status] - statusOrder[b.status];
  if (statusDiff !== 0) return statusDiff;

  if (a.openDate && b.openDate) {
    return new Date(a.openDate).getTime() - new Date(b.openDate).getTime();
  }
  if (a.openDate) return -1;
  if (b.openDate) return 1;
  return a.companyName.localeCompare(b.companyName);
}

export function getUpcomingIpos(asOf: Date = new Date()): UpcomingIpo[] {
  const today = startOfDay(asOf);

  return IPO_CATALOG.filter((ipo) => isActiveIpo(ipo, today))
    .map((ipo) => ({
      ...ipo,
      status: resolveStatus(ipo, today),
    }))
    .sort(sortIpos);
}

export const IPO_DATA_AS_OF = "2026-06-08";
