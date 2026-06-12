"use client";
import { useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useApi } from "@/hooks/useApi";
import { EsqueletoTabela } from "@/components/common/EsqueletoDeCarregamento";
import Icone from "@/components/common/Icone";
import CaixaDeSelecao from "@/components/common/CaixaDeSelecao";
import Card from "@/components/ui/Card";
import Botao from "@/components/ui/Botao";
import Etiqueta from "@/components/ui/Etiqueta";
import Chip from "@/components/ui/Chip";
import Selo from "@/components/ui/Selo";
import SeletorSuspenso from "@/components/ui/SeletorSuspenso";
import CampoDeBusca from "@/components/ui/CampoDeBusca";

const ESTILO_CABECALHO = {
  padding: "11px 14px", fontSize: "10.5px", letterSpacing: ".07em", textTransform: "uppercase",
  color: "var(--muted)", borderBottom: "1px solid var(--hair)", whiteSpace: "nowrap", textAlign: "left",
};
const ESTILO_CELULA = { padding: "11px 14px", borderBottom: "1px solid var(--hair)", whiteSpace: "nowrap" };

/** Linha da tabela no formato de card (usado só no mobile). */
function CartaoDeItem({ item, marcada, aoMarcar }) {
  return (
    <div className="rounded-xl com-borda" style={{ padding: "12px 14px", background: marcada ? "var(--brand-tint)" : "var(--surface)" }}>
      <div className="flex items-center gap-2 mb-2">
        <CaixaDeSelecao marcado={marcada} aoClicar={aoMarcar} />
        <b className="fonte-mono flex-1" style={{ fontSize: 12.5 }}>{item.chave}</b>
        <Etiqueta tom="alerta">{item.status}</Etiqueta>
      </div>
      <div className="texto-principal" style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{item.participante}</div>
      <div className="grid grid-cols-2 gap-y-1.5 gap-x-3" style={{ fontSize: "11.5px" }}>
        <div className="texto-apagado">NCM</div>
        <div className="fonte-mono text-right">{item.ncm}</div>
        <div className="texto-apagado">cClassTrib</div>
        <div className="text-right">
          {item.classTrib ? <span className="fonte-mono">{item.classTrib}</span> : <Etiqueta tom="negativo">ausente</Etiqueta>}
        </div>
        <div className="texto-apagado">Valor</div>
        <div className="fonte-mono text-right">{item.valorOperacao}</div>
        <div className="texto-apagado">Trib. atual</div>
        <div className="fonte-mono texto-positivo text-right">{item.tributoAtual}</div>
        <div className="texto-apagado">Trib. reforma</div>
        <div className="fonte-mono texto-alerta text-right">{item.tributoReforma}</div>
      </div>
    </div>
  );
}

/** Tabela de itens da exceção: cabeçalho + busca + filtros + lista/tabela. */
export default function TabelaDeItens({ excecoes }) {
  const excecaoSelecionada = useAppStore((estado) => estado.excecaoSelecionada);
  const filtros = useAppStore((estado) => estado.filtros);
  const definirFiltro = useAppStore((estado) => estado.definirFiltro);
  const chavesSelecionadas = useAppStore((estado) => estado.chavesSelecionadas);
  const alternarLinha = useAppStore((estado) => estado.alternarLinha);
  const alternarTodasAsLinhas = useAppStore((estado) => estado.alternarTodasAsLinhas);

  // Empresas e tipos de documento para os dropdowns
  const { dados: cadastros } = useApi("/operacional/empresas");
  const opcoesDeTipoDocumento = [
    { valor: "todos", rotulo: "Todos" },
    ...(cadastros?.tiposDeDocumento || []).map((tipo) => ({ valor: tipo, rotulo: tipo })),
  ];
  const opcoesDeCnpj = [
    { valor: "todos", rotulo: `Todos · ${cadastros?.empresas?.length ?? "…"}` },
    ...(cadastros?.empresas || []).map((empresa) => ({ valor: empresa.cnpj, rotulo: `${empresa.nome} · ${empresa.cnpj}` })),
  ];

  const rotaDosItens = useMemo(() => {
    const parametros = new URLSearchParams({
      busca: filtros.busca,
      tipoDocumento: filtros.tipoDocumento,
      cnpj: filtros.cnpj,
    }).toString();
    return `/operacional/excecoes/${excecaoSelecionada}/itens?${parametros}`;
  }, [excecaoSelecionada, filtros.busca, filtros.tipoDocumento, filtros.cnpj]);

  const { dados, carregando } = useApi(rotaDosItens);

  const excecao = excecoes.find((cadaExcecao) => cadaExcecao.id === excecaoSelecionada);
  const itens = dados?.itens || [];
  const chavesVisiveis = itens.map((item) => item.chave);
  const todasMarcadas = chavesVisiveis.length > 0 && chavesVisiveis.every((chave) => chavesSelecionadas.includes(chave));

  if (!excecao) return null;

  return (
    <Card className="flex flex-col">
      {/* ── Cabeçalho ── */}
      <div className="px-4 sm:px-5 py-4" style={{ borderBottom: "1px solid var(--hair)" }}>
        {/* Título + botões: empilha no mobile, lado a lado no desktop */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
          <div className="min-w-0 flex-1">
            <b className="block" style={{ fontSize: 14, lineHeight: 1.3 }}>{excecao.titulo}</b>
            <span className="block texto-apagado mt-0.5" style={{ fontSize: "11.5px" }}>
              {excecao.quantidadeItens} itens · {excecao.motivoBloqueio ? `${excecao.motivoBloqueio} · ` : ""}impacto {excecao.impactoFinanceiro}
            </span>
          </div>
          <div className="flex gap-2 shrink-0">
            <Botao icone={["M12 5v14M5 12h14"]} className="flex-1 sm:flex-none justify-center">Justificar</Botao>
            <Botao variante="primario" icone={["M9 11l3 3 8-8"]} className="flex-1 sm:flex-none justify-center">
              <span className="hidden sm:inline">Corrigir em lote</span>
              <span className="sm:hidden">Corrigir</span>
            </Botao>
          </div>
        </div>

        {/* Busca + filtros (tudo que filtra esta tabela, junto) */}
        <div className="mt-3 flex flex-col gap-2.5">
          <CampoDeBusca
            placeholder="Buscar chave, NCM, participante…"
            aoBuscar={(texto) => definirFiltro("busca", texto)}
          />

          {/* Filtros em faixa rolável (mobile) / em linha (desktop) */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 sm:flex-wrap" style={{ scrollbarWidth: "none" }}>
            <div className="shrink-0">
              <SeletorSuspenso
                rotulo="Tipo doc"
                opcoes={opcoesDeTipoDocumento}
                valorSelecionado={filtros.tipoDocumento}
                aoSelecionar={(valor) => definirFiltro("tipoDocumento", valor)}
              />
            </div>

            <Chip variante="desativado" comSeta title="Em breve" className="shrink-0">
              Severidade <b className="texto-secundario" style={{ fontWeight: 600 }}>Alta</b>
              <Selo tom="marca" tamanho="mini" style={{ marginLeft: 4 }}>Em breve</Selo>
            </Chip>

            <div className="shrink-0">
              <SeletorSuspenso
                rotulo="CNPJ"
                opcoes={opcoesDeCnpj}
                valorSelecionado={filtros.cnpj}
                aoSelecionar={(valor) => definirFiltro("cnpj", valor)}
              />
            </div>

            <Chip variante="desativado" comSeta title="Em breve" className="shrink-0">
              Status <b className="texto-secundario" style={{ fontWeight: 600 }}>Aberto</b>
              <Selo tom="marca" tamanho="mini" style={{ marginLeft: 4 }}>Em breve</Selo>
            </Chip>
          </div>
        </div>
      </div>

      {/* Barra de ações em lote */}
      {chavesSelecionadas.length > 0 && (
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3" style={{ background: "var(--brand-tint)", borderBottom: "1px solid var(--hair)", fontSize: "12.5px" }}>
          <Icone desenhos={["M9 11l3 3 8-8"]} espessura={2} tamanho={14} style={{ color: "var(--brand)" }} />
          <span>
            <b className="fonte-mono texto-marca">{chavesSelecionadas.length}</b> selecionados —{" "}
            <span className="texto-marca font-semibold cursor-pointer">atribuir cClassTrib</span> ·{" "}
            <span className="hidden sm:inline"><span className="texto-marca font-semibold cursor-pointer">escalar</span> · </span>
            <span className="texto-marca font-semibold cursor-pointer">exportar</span>
          </span>
        </div>
      )}

      {carregando ? (
        <div className="p-4"><EsqueletoTabela linhas={6} /></div>
      ) : itens.length === 0 ? (
        <div className="flex flex-col items-center gap-2 text-center" style={{ padding: "48px 20px" }}>
          <Icone desenhos={[{ circulo: { cx: 11, cy: 11, r: 7 } }, "M21 21l-4.3-4.3"]} espessura={1.6} tamanho={28} style={{ color: "var(--muted)" }} />
          <b style={{ fontSize: 14 }}>Nenhum item encontrado</b>
          <span className="texto-apagado" style={{ fontSize: "12.5px", maxWidth: "36ch" }}>
            Ajuste a busca ou os filtros de tipo de documento e CNPJ para ver resultados.
          </span>
        </div>
      ) : (
        <>
          {/* MOBILE: cards empilhados */}
          <div className="sm:hidden flex flex-col gap-2.5 p-3">
            {itens.map((item) => (
              <CartaoDeItem
                key={item.chave}
                item={item}
                marcada={chavesSelecionadas.includes(item.chave)}
                aoMarcar={() => alternarLinha(item.chave)}
              />
            ))}
          </div>

          {/* DESKTOP: tabela tradicional */}
          <div className="hidden sm:block overflow-auto" style={{ maxHeight: 560 }}>
            <table className="w-full" style={{ borderCollapse: "collapse", fontSize: "12.5px" }}>
              <thead>
                <tr>
                  <th style={{ ...ESTILO_CABECALHO, width: 36 }}>
                    <CaixaDeSelecao marcado={todasMarcadas} aoClicar={() => alternarTodasAsLinhas(chavesVisiveis)} />
                  </th>
                  <th style={ESTILO_CABECALHO}>Chave</th>
                  <th style={ESTILO_CABECALHO}>Data</th>
                  <th style={ESTILO_CABECALHO}>Doc</th>
                  <th style={ESTILO_CABECALHO}>Participante</th>
                  <th style={ESTILO_CABECALHO}>NCM</th>
                  <th style={ESTILO_CABECALHO}>CST</th>
                  <th style={ESTILO_CABECALHO}>cClassTrib</th>
                  <th style={{ ...ESTILO_CABECALHO, textAlign: "right" }}>Valor</th>
                  <th style={{ ...ESTILO_CABECALHO, textAlign: "right" }}>Trib. atual</th>
                  <th style={{ ...ESTILO_CABECALHO, textAlign: "right" }}>Trib. reforma</th>
                  <th style={ESTILO_CABECALHO}>Status</th>
                  <th style={ESTILO_CABECALHO}></th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item) => {
                  const estaMarcada = chavesSelecionadas.includes(item.chave);
                  return (
                    <tr key={item.chave}>
                      <td style={ESTILO_CELULA}>
                        <CaixaDeSelecao marcado={estaMarcada} aoClicar={() => alternarLinha(item.chave)} />
                      </td>
                      <td className="fonte-mono texto-secundario" style={ESTILO_CELULA}>{item.chave}</td>
                      <td className="fonte-mono" style={ESTILO_CELULA}>{item.data}</td>
                      <td className="fonte-mono texto-secundario" style={ESTILO_CELULA}>{item.tipoDocumento}</td>
                      <td style={ESTILO_CELULA}>{item.participante}</td>
                      <td className="fonte-mono" style={ESTILO_CELULA}>{item.ncm}</td>
                      <td className="fonte-mono" style={ESTILO_CELULA}>{item.cst}</td>
                      <td style={ESTILO_CELULA}>
                        {item.classTrib ? <span className="fonte-mono">{item.classTrib}</span> : <Etiqueta tom="negativo">ausente</Etiqueta>}
                      </td>
                      <td className="fonte-mono" style={{ ...ESTILO_CELULA, textAlign: "right" }}>{item.valorOperacao}</td>
                      <td className="fonte-mono texto-positivo" style={{ ...ESTILO_CELULA, textAlign: "right" }}>{item.tributoAtual}</td>
                      <td className="fonte-mono texto-alerta" style={{ ...ESTILO_CELULA, textAlign: "right" }}>{item.tributoReforma}</td>
                      <td style={ESTILO_CELULA}><Etiqueta tom="alerta">{item.status}</Etiqueta></td>
                      <td style={ESTILO_CELULA}><span className="texto-marca font-semibold cursor-pointer" style={{ fontSize: 12 }}>resolver</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Card>
  );
} 