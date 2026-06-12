import { NextResponse } from "next/server";
import { INDICADORES_OPERACIONAIS, simularLatencia } from "../../_dadosMock";

export async function GET() {
  await simularLatencia();
  return NextResponse.json(INDICADORES_OPERACIONAIS);
}