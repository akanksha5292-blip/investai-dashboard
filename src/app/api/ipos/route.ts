import { NextResponse } from "next/server";
import { getUpcomingIpos } from "@/lib/ipo-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const ipos = getUpcomingIpos();
  return NextResponse.json({
    ipos,
    lastUpdated: new Date().toISOString(),
    disclaimer:
      "Honest opinions for education only. Not IPO advice. Always read the RHP and consult a financial advisor.",
  });
}
