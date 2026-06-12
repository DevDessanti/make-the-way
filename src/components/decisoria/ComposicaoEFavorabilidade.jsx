"use client";
import { useApi } from "@/hooks/useApi";
import RevelarAoRolar from "@/components/common/RevelarAoRolar";
import TituloDeSecao from "@/components/common/TituloDeSecao";
import Card from "@/components/ui/Card";
import { formatarMilhoes, COR_SEMANTICA } from "@/utils/apresentacao";

const CIRCUNFERENCIA_DO_ANEL = 503; // 2 * π * raio(80)

function EsqueletoComposicao() {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <TituloDeSecao titulo="Composição tributária" />
        <div className="container-esqueleto rounded-2xl com-borda fundo-card" style={{ padding: "22px 24px" }}>
          <div className="flex flex-col gap-5">
            {[0, 1, 2, 3, 4].map((posicao) => (
              <div key={posicao}>
                <div className="peca-esqueleto peca-linha" style={{ width: "50%", marginBottom: 8 }} />
                <div className="peca-esqueleto" style={{ height: 9, borderRadius: 6 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <TituloDeSecao titulo="Favorabilidade" />
        <div className="container-esqueleto flex flex-col items-center rounded-2xl com-borda fundo-card p-6">
          <div className="peca-esqueleto peca-circulo" style={{ width: 190, height: 190 }} />
        </div>
      </div>
    </div>
  );
}

/** Duas seções lado a lado: barras por tributo e anel de favorabilidade. */
export default function ComposicaoEFavorabilidade() {
  const { dados, carregando } = useApi("/decisoria/composicao");

  if (carregando) return <EsqueletoComposicao />;
  if (!dados) return null;

  const { composicaoTributaria, favorabilidade } = dados;
  const maiorValor = Math.max(...composicaoTributaria.flatMap((linha) => [linha.valorAtual, linha.valorReforma]));
  const percentualFavoravel = favorabilidade.favoraveis / favorabilidade.totalOperacoes;

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Composição tributária (3/5 da largura) */}
      <div className="lg:col-span-3">
        <TituloDeSecao titulo="Composição tributária" />
        <RevelarAoRolar>
          <Card style={{ padding: "22px 24px" }}>
            <div className="flex flex-col gap-4 mt-1">
              {composicaoTributaria.map((linha) => (
                <div key={linha.tributo}>
                  <div className="flex justify-between mb-1.5" style={{ fontSize: "12.5px" }}>
                    <span>{linha.tributo}</span>
                    <b className="fonte-mono">
                      <span style={{ color: COR_SEMANTICA[linha.corAtual] }}>{linha.valorAtual ? formatarMilhoes(linha.valorAtual) : "—"}</span>
                      {" → "}
                      <span style={{ color: COR_SEMANTICA[linha.corReforma] }}>{linha.valorReforma ? formatarMilhoes(linha.valorReforma) : "—"}</span> M
                    </b>
                  </div>
                  <div className="flex overflow-hidden rounded-md" style={{ height: 9, background: "rgba(255,255,255,.04)" }}>
                    <div className="segmento-barra" style={{ background: COR_SEMANTICA[linha.corAtual], width: `${(linha.valorAtual / maiorValor) * 50}%` }} />
                    <div className="segmento-barra" style={{ background: COR_SEMANTICA[linha.corReforma], marginLeft: 2, width: `${(linha.valorReforma / maiorValor) * 50}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </RevelarAoRolar>
      </div>

      {/* Anel de favorabilidade (2/5 da largura) */}
      <div className="lg:col-span-2">
        <TituloDeSecao titulo="Favorabilidade" />
        <RevelarAoRolar>
          <Card className="flex flex-col items-center text-center p-6">
            <div className="relative" style={{ width: 190, height: 190 }}>
              <svg width="190" height="190" viewBox="0 0 190 190" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="95" cy="95" r="80" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="15" />
                <circle cx="95" cy="95" r="80" fill="none" stroke="var(--pos)" strokeWidth="15" strokeLinecap="round"
                  strokeDasharray={CIRCUNFERENCIA_DO_ANEL}
                  strokeDashoffset={CIRCUNFERENCIA_DO_ANEL * (1 - percentualFavoravel)}
                  style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(.16,1,.3,1)" }} />
              </svg>
              <div className="absolute inset-0 grid place-content-center text-center">
                <b className="fonte-serif" style={{ fontSize: 44, fontWeight: 500, lineHeight: 1 }}>{favorabilidade.totalOperacoes}</b>
                <span className="texto-apagado uppercase" style={{ fontSize: 11, letterSpacing: ".1em" }}>operações</span>
              </div>
            </div>
            <div className="flex gap-6 mt-4">
              <div className="text-center"><b className="block fonte-mono texto-positivo" style={{ fontSize: 18 }}>{favorabilidade.favoraveis}</b><span className="texto-secundario" style={{ fontSize: 11 }}>Favorável</span></div>
              <div className="text-center"><b className="block fonte-mono texto-negativo" style={{ fontSize: 18 }}>{favorabilidade.desfavoraveis}</b><span className="texto-secundario" style={{ fontSize: 11 }}>Desfavorável</span></div>
            </div>
          </Card>
        </RevelarAoRolar>
      </div>
    </div>
  );
}