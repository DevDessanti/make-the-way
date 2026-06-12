import { NextResponse } from "next/server";
import { FILA_DE_EXCECOES, simularLatencia } from "../../_dadosMock";

export async function GET() {
  await simularLatencia();
  return NextResponse.json(FILA_DE_EXCECOES);
}