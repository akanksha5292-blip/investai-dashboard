import { NextResponse } from "next/server";
import { getCached } from "@/lib/cache";
import { refreshAllData } from "@/lib/refresh-data";
import { getMockDashboardData } from "@/lib/mock-data";
import type { DashboardData } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cached = getCached<DashboardData>("dashboard_full");
    if (cached) {
      return NextResponse.json(cached);
    }

    await refreshAllData();
    const fresh = getCached<DashboardData>("dashboard_full");

    if (fresh) {
      return NextResponse.json(fresh);
    }

    return NextResponse.json(getMockDashboardData());
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(getMockDashboardData());
  }
}
