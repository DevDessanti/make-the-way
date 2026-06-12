import { NextResponse } from "next/server";
import { COMPOSICAO_E_FAVORABILIDADE, simularLatencia } from "../../_dadosMock";

export async function GET() {
  await simularLatencia();
  return NextResponse.json(COMPOSICAO_E_FAVORABILIDADE);
}