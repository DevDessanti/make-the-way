"use client";
import { useApi } from "@/hooks/useApi";
import RevelarAoRolar from "@/components/common/RevelarAoRolar";
import { EsqueletoGradeDeCards } from "@/components/common/EsqueletoDeCarregamento";
import Icone from "@/components/common/Icone";
import Card from "@/components/ui/Card";
import { COR_SEMANTICA } from "@/utils/apresentacao";

// Ícones ficam no frontend (a API só manda a "chave" do indicador)
const ICONE_POR_CHAVE = {
  favorabilidade:     ["M7 10v12M2 12h5v10H2zM7 10l4-7a2 2 0 0 1 3 2l-1 5h6a2 2 0 0 1 2 2.5l-2 7a2 2 0 0 1-2 1.5H7"],
  impostoSeletivo:    ["M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.4 7.2 17.9l.9-5.4L4.2 8.7l5.4-.8z"],
  creditoRecuperavel: ["M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
  receitaLiquida:     ["M7 11V7a5 5 0 0 1 10 0v4", "M3 11h18v10H3z"],
};

/** Grade dos 4 cards de KPI abaixo do hero. */
export default function CardsIndicadores() {
  const { dados: indicadores, carregando } = useApi("/decisoria/indicadores");

  if (carregando) return <EsqueletoGradeDeCards quantidade={4} />;
  if (!indicadores) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      {indicadores.map((indicador, posicao) => (
        <RevelarAoRolar key={indicador.chave} atrasoMs={posicao * 50} className="h-full">
          <Card interativo className="p-5 h-full">
            <div className="flex justify-between items-start">
              <div className="texto-secundario" style={{ fontSize: 12 }}>{indicador.titulo}</div>
              <div className="grid place-items-center rounded-lg com-borda" style={{ width: 32, height: 32, color: COR_SEMANTICA[indicador.cor] }}>
                <Icone desenhos={ICONE_POR_CHAVE[indicador.chave]} tamanho={15} />
              </div>
            </div>

            <div className="fonte-serif" style={{ fontSize: 33, fontWeight: 500, letterSpacing: "-.01em", margin: "13px 0 2px" }}>
              {indicador.valor}
              <small className="fonte-mono texto-apagado" style={{ fontSize: ".45em", fontWeight: 400 }}>{indicador.unidade}</small>
            </div>

            <div className="flex items-center gap-1.5 texto-apagado" style={{ fontSize: "11.5px" }}>
              {indicador.complementoAntes && <span>{indicador.complemento}</span>}
              <span style={{ color: COR_SEMANTICA[indicador.corDoDestaque] }}>{indicador.destaque}</span>
              {!indicador.complementoAntes && <span>{indicador.complemento}</span>}
            </div>

            {/* Mini linha de tendência decorativa */}
            <svg className="absolute right-0 bottom-0" style={{ width: "58%", height: 40, opacity: 0.5 }} viewBox="0 0 100 40" preserveAspectRatio="none">
              <polyline points={indicador.pontosDoGrafico} fill="none" stroke={COR_SEMANTICA[indicador.cor]} strokeWidth="2" />
            </svg>
          </Card>
        </RevelarAoRolar>
      ))}
    </div>
  );
}