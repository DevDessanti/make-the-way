import { NextResponse } from "next/server";
import { EMPRESAS_DO_GRUPO, TIPOS_DE_DOCUMENTO, simularLatencia } from "../../_dadosMock";

/** Devolve as empresas (CNPJs) e tipos de documento para montar os filtros. */
export async function GET() {
  await simularLatencia(200);
  return NextResponse.json({
    empresas: EMPRESAS_DO_GRUPO,
    tiposDeDocumento: TIPOS_DE_DOCUMENTO,
  });
}