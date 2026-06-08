import { NextResponse } from "next/server";
import { FINANCIAL_TERMS } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ terms: FINANCIAL_TERMS });
}
