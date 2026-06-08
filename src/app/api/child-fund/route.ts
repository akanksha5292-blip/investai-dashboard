import { NextRequest, NextResponse } from "next/server";
import { calculateChildFund } from "@/lib/child-fund";
import type { ChildFundInput } from "@/types";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChildFundInput;

    if (
      !body.childName ||
      body.currentAge == null ||
      !body.monthlyInvestment ||
      !body.targetAge ||
      !body.riskAppetite
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (body.targetAge <= body.currentAge) {
      return NextResponse.json(
        { error: "Target age must be greater than current age" },
        { status: 400 }
      );
    }

    const result = await calculateChildFund(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Child fund API error:", error);
    return NextResponse.json(
      { error: "Failed to calculate child fund plan" },
      { status: 500 }
    );
  }
}
