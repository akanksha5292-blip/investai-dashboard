import { NextResponse } from "next/server";
import { getUpcomingIpos, IPO_DATA_AS_OF } from "@/lib/ipo-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date();
  const ipos = getUpcomingIpos(now);
  const openCount = ipos.filter((i) => i.status === "Open").length;
  const datedCount = ipos.filter((i) => i.openDate).length;

  return NextResponse.json({
    ipos,
    lastUpdated: now.toISOString(),
    dataAsOf: IPO_DATA_AS_OF,
    openCount,
    datedCount,
    disclaimer:
      "Honest opinions for education only. Not IPO advice. Always read the RHP and consult a financial advisor.",
  });
}
