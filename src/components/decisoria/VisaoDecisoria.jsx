"use client";
import Icone from "@/components/common/Icone";
import BannerDeContexto from "@/components/common/BannerDeContexto";
import HeroImpacto from "./HeroImpacto";
import CardsIndicadores from "./CardsIndicadores";
import LinhaDoTempo from "./LinhaDoTempo";
import ComposicaoEFavorabilidade from "./ComposicaoEFavorabilidade";
import InsightsEstrategicos from "./InsightsEstrategicos";

/** Camada Decisória: visão executiva para CFO, controladoria e conselho. */
export default function VisaoDecisoria() {
  return (
    <section className="animacao-troca-camada">
      <BannerDeContexto
        cor="var(--brand)"
        fundo="var(--brand-tint)"
        icone={<Icone desenhos={[{ circulo: { cx: 12, cy: 12, r: 10 } }, "M2 12h20"]} espessura={2} tamanho={15} />}
      >
        <b className="texto-principal">Para CFO, controladoria e conselho.</b> Poucos números, alto sinal: impacto financeiro, favorabilidade, transição e onde agir primeiro. As decisões aqui dependem da camada operacional manter os dados confiáveis.
      </BannerDeContexto>

      <HeroImpacto />
      <CardsIndicadores />
      <LinhaDoTempo />
      <ComposicaoEFavorabilidade />
      <InsightsEstrategicos />
    </section>
  );
}