import { NextResponse } from "next/server";
import { INDICADORES_DECISORIA, simularLatencia } from "../../_dadosMock";

export async function GET() {
  await simularLatencia();
  return NextResponse.json(INDICADORES_DECISORIA);
}