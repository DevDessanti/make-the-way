import { NextResponse } from "next/server";
import { LINHA_DO_TEMPO, simularLatencia } from "../../_dadosMock";

export async function GET() {
  await simularLatencia();
  return NextResponse.json(LINHA_DO_TEMPO);
}