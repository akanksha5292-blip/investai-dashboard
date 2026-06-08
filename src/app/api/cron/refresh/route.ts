import { NextRequest, NextResponse } from "next/server";
import { refreshAllData } from "@/lib/refresh-data";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // Vercel Cron sends this header; also allow manual trigger with secret
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    const vercelCron = request.headers.get("x-vercel-cron");
    if (!vercelCron) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await refreshAllData();
    return NextResponse.json({
      message: "Daily data refresh completed",
      ...result,
    });
  } catch (error) {
    console.error("Cron refresh failed:", error);
    return NextResponse.json(
      { error: "Refresh failed", details: String(error) },
      { status: 500 }
    );
  }
}
