import { NextResponse } from "next/server";
import { INSIGHTS_ESTRATEGICOS, simularLatencia } from "../../_dadosMock";

export async function GET() {
  await simularLatencia();
  return NextResponse.json(INSIGHTS_ESTRATEGICOS);
}