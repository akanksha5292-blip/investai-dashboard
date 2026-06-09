import { NextRequest, NextResponse } from "next/server";
import { getCached } from "@/lib/cache";
import { refreshAllData } from "@/lib/refresh-data";
import { getMockDashboardData } from "@/lib/mock-data";
import type { DashboardData } from "@/types";

export const dynamic = "force-dynamic";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

export async function GET(request: NextRequest) {
  const forceRefresh = request.nextUrl.searchParams.get("refresh") === "true";

  try {
    if (forceRefresh) {
      await refreshAllData();
      const fresh = getCached<DashboardData>("dashboard_full");
      if (fresh) {
        return NextResponse.json(fresh, { headers: NO_CACHE_HEADERS });
      }
    }

    const cached = getCached<DashboardData>("dashboard_full");
    if (cached) {
      return NextResponse.json(cached, { headers: NO_CACHE_HEADERS });
    }

    await refreshAllData();
    const fresh = getCached<DashboardData>("dashboard_full");

    if (fresh) {
      return NextResponse.json(fresh, { headers: NO_CACHE_HEADERS });
    }

    return NextResponse.json(getMockDashboardData(), { headers: NO_CACHE_HEADERS });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(getMockDashboardData(), { headers: NO_CACHE_HEADERS });
  }
}
