import { NextResponse } from "next/server";
import { RESUMO_DECISORIA, simularLatencia } from "../../_dadosMock";

export async function GET() {
  await simularLatencia();
  return NextResponse.json(RESUMO_DECISORIA);
}