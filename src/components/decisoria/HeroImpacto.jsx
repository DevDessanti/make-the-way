"use client";
import { useApi } from "@/hooks/useApi";
import RevelarAoRolar from "@/components/common/RevelarAoRolar";
import { EsqueletoHero } from "@/components/common/EsqueletoDeCarregamento";
import Icone from "@/components/common/Icone";
import Card from "@/components/ui/Card";
import { useContagemAnimada } from "@/components/common/hooks";
import { formatarMilhoes } from "@/utils/apresentacao";

// Gradientes das barras por cor semântica vinda da API
const GRADIENTE_POR_COR = {
  positivo: "linear-gradient(90deg,rgba(52,216,162,.5),var(--pos))",
  alerta: "linear-gradient(90deg,rgba(243,177,60,.5),var(--warn))",
};

/** Destaque principal: impacto líquido projetado com contador animado. */
export default function HeroImpacto() {
  const { dados, carregando, erro } = useApi("/decisoria/resumo");
  const impactoAnimado = useContagemAnimada(dados?.impactoLiquidoMilhoes ?? 0, 1400, Boolean(dados));

  if (carregando) return <EsqueletoHero />;
  if (erro || !dados) return null;

  return (
    <RevelarAoRolar>
      <Card
        className="mb-5"
        style={{
          padding: "32px 34px",
          background: "radial-gradient(700px 320px at 88% -30%,var(--neg-d),transparent 70%),linear-gradient(135deg,rgba(255,255,255,.045),rgba(255,255,255,.012))",
          boxShadow: "0 24px 60px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.05)",
        }}
      >
        <div className="grid gap-8 items-center md:grid-cols-2">
          {/* Coluna esquerda: número de impacto */}
          <div>
            <span className="rotulo-de-secao">Impacto líquido projetado · cenário integral 2033</span>
            <div className="numero-impacto my-2">
              <span className="texto-negativo font-semibold" style={{ fontSize: ".38em", verticalAlign: ".55em", fontFamily: "var(--sans)", WebkitTextFillColor: "var(--neg)" }}>
                +R$
              </span>
              {formatarMilhoes(impactoAnimado)} M
            </div>
            <p className="texto-secundario" style={{ fontSize: 14, maxWidth: "48ch" }}>
              A carga tributária deve <b className="texto-negativo" style={{ fontWeight: 600 }}>crescer {dados.crescimentoPercentualFormatado}</b> com o IVA Dual (CBS + IBS) somado ao Imposto Seletivo, sobre a mesma base de operações do regime atual.
            </p>
            <div
              className="inline-flex items-center gap-2 mt-4 rounded-full font-semibold"
              style={{ padding: "7px 14px", background: "var(--neg-d)", border: "1px solid rgba(255,106,92,.32)", color: "#ffaaa1", fontSize: "12.5px" }}
            >
              <Icone desenhos={["M12 2v14M6 10l6 6 6-6M4 22h16"]} espessura={2} tamanho={14} />
              {dados.alertaOperacoes}
            </div>
          </div>

          {/* Coluna direita: barras comparativas */}
          <div className="flex flex-col gap-4">
            {dados.barrasComparativas.map((barra) => (
              <div key={barra.rotulo}>
                <div className="flex justify-between mb-1.5" style={{ fontSize: "12.5px" }}>
                  <span className="texto-secundario">{barra.rotulo}</span>
                  <b className="fonte-mono" style={{ fontSize: 13 }}>{barra.valorFormatado}</b>
                </div>
                <div className="overflow-hidden rounded-lg" style={{ height: 13, background: "rgba(255,255,255,.05)" }}>
                  <div className="barra-comparacao" style={{ background: GRADIENTE_POR_COR[barra.cor], width: `${barra.larguraPercentual}%` }} />
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4 mt-1 texto-apagado" style={{ fontSize: 11 }}>
              <i className="inline-flex items-center gap-1.5 not-italic"><span className="inline-block rounded" style={{ width: 9, height: 9, background: "var(--pos)" }} />Vigente</i>
              <i className="inline-flex items-center gap-1.5 not-italic"><span className="inline-block rounded" style={{ width: 9, height: 9, background: "var(--warn)" }} />Pós-reforma</i>
              <i className="ml-auto not-italic texto-negativo">Δ {dados.deltaFormatado}</i>
            </div>
          </div>
        </div>
      </Card>
    </RevelarAoRolar>
  );
}