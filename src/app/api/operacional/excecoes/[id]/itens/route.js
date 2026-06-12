import { NextResponse } from "next/server";
import { ITENS_DA_TABELA, simularLatencia } from "../../../../_dadosMock";

/**
 * Itens da exceção, com filtros via query string:
 *   ?busca=byd            → procura em chave, NCM e participante
 *   ?tipoDocumento=NF-e   → "todos" não filtra
 *   ?cnpj=18.777...       → "todos" não filtra
 *
 * A API Node/Express deverá aceitar exatamente estes parâmetros.
 */
export async function GET(requisicao, { params }) {
  const { id } = await params;
  await simularLatencia(300);

  const parametros = requisicao.nextUrl.searchParams;
  const busca = (parametros.get("busca") || "").trim().toLowerCase();
  const tipoDocumento = parametros.get("tipoDocumento") || "todos";
  const cnpj = parametros.get("cnpj") || "todos";

  let itensFiltrados = ITENS_DA_TABELA;

  if (tipoDocumento !== "todos") {
    itensFiltrados = itensFiltrados.filter((item) => item.tipoDocumento === tipoDocumento);
  }
  if (cnpj !== "todos") {
    itensFiltrados = itensFiltrados.filter((item) => item.cnpjDaEmpresa === cnpj);
  }
  if (busca) {
    itensFiltrados = itensFiltrados.filter((item) =>
      `${item.chave} ${item.ncm} ${item.participante}`.toLowerCase().includes(busca)
    );
  }

  return NextResponse.json({ excecaoId: Number(id), itens: itensFiltrados });
}