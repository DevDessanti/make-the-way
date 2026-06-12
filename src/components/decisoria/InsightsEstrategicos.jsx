"use client";
import { useAppStore } from "@/store/useAppStore";
import { useApi } from "@/hooks/useApi";
import RevelarAoRolar from "@/components/common/RevelarAoRolar";
import { EsqueletoCard } from "@/components/common/EsqueletoDeCarregamento";
import TituloDeSecao from "@/components/common/TituloDeSecao";
import Icone from "@/components/common/Icone";
import Card from "@/components/ui/Card";

// Cores e ícones por tipo de insight (a API só manda o "tipo")
const ESTILO_POR_TIPO = {
  risco:          { cor: "var(--neg)",  corDifusa: "var(--neg-d)",  icone: ["M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"] },
  oportunidade:   { cor: "var(--pos)",  corDifusa: "var(--pos-d)",  icone: ["M12 2v4M12 18v4M2 12h4M18 12h4"] },
  confiabilidade: { cor: "var(--info)", corDifusa: "var(--info-d)", icone: [{ circulo: { cx: 12, cy: 12, r: 9 } }, "M12 8h.01M11 12h1v4h1"] },
};

/** Os 3 cards de inteligência estratégica no fim da camada decisória. */
export default function InsightsEstrategicos() {
  const definirCamada = useAppStore((s) => s.definirCamada);
  const { dados: insights, carregando } = useApi("/decisoria/insights");

  const executarAcao = (insight) => {
    if (insight.acao === "irParaOperacional") {
      definirCamada("operacional");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <TituloDeSecao titulo="Inteligência estratégica" dica="gerada de 1,48M de itens" />
      {carregando ? (
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((posicao) => <EsqueletoCard key={posicao} />)}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {(insights || []).map((insight, posicao) => {
            const estilo = ESTILO_POR_TIPO[insight.tipo];
            return (
              <RevelarAoRolar key={posicao} atrasoMs={posicao * 60}>
                <Card interativo className="card-insight p-5 h-full">
                  {/* brilho difuso no canto, na cor do tipo */}
                  <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5, background: `radial-gradient(180px 120px at 85% -10%,${estilo.corDifusa},transparent)` }} />

                  <span className="inline-flex items-center gap-1.5 uppercase font-semibold mb-3" style={{ fontSize: "10.5px", letterSpacing: ".12em", color: estilo.cor }}>
                    <Icone desenhos={estilo.icone} espessura={2.2} tamanho={13} />
                    {insight.etiqueta}
                  </span>

                  <h3 className="fonte-serif mb-2" style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.2 }}>{insight.titulo}</h3>
                  <p className="texto-secundario" style={{ fontSize: "12.5px", lineHeight: 1.55 }}>{insight.descricao}</p>

                  <span
                    className="acao-insight inline-flex items-center gap-1.5 mt-4 font-semibold cursor-pointer"
                    style={{ fontSize: "12.5px", color: estilo.cor }}
                    onClick={() => executarAcao(insight)}
                  >
                    {insight.textoDaAcao}
                    <Icone desenhos={["M5 12h14M13 6l6 6-6 6"]} espessura={2} tamanho={14} />
                  </span>
                </Card>
              </RevelarAoRolar>
            );
          })}
        </div>
      )}
    </div>
  );
}