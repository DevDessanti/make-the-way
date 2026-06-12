"use client";
import { useApi } from "@/hooks/useApi";
import Icone from "@/components/common/Icone";
import BannerDeContexto from "@/components/common/BannerDeContexto";
import { EsqueletoLista, EsqueletoTabela } from "@/components/common/EsqueletoDeCarregamento";
import IndicadoresOperacionais from "./IndicadoresOperacionais";
import BarraDeFiltros from "./BarraDeFiltros";
import FilaDeExcecoes from "./FilaDeExcecoes";
import TabelaDeItens from "./TabelaDeItens";

export default function VisaoOperacional() {
  const { dados: excecoes, carregando } = useApi("/operacional/excecoes");

  return (
    <section className="animacao-troca-camada">
      <BannerDeContexto
        cor="var(--warn)"
        fundo="var(--warn-d)"
        icone={<Icone desenhos={["M9 11l3 3 8-8M4 12v7a1 1 0 0 0 1 1h14"]} espessura={2} tamanho={15} />}
      >
        <b className="texto-principal">Para o analista fiscal e a contabilidade.</b> Alta densidade, nível de item: fila de exceções, validações de NCM/CST/cClassTrib e crédito, ações em lote e trilha de auditoria. É o que torna os números da camada decisória confiáveis.
      </BannerDeContexto>

      <IndicadoresOperacionais />
      <BarraDeFiltros />

      {carregando || !excecoes ? (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-[minmax(320px,380px)_minmax(0,1fr)] items-start">
          <EsqueletoLista itens={5} />
          <EsqueletoTabela linhas={6} />
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-[minmax(320px,380px)_minmax(0,1fr)] items-start">
          <FilaDeExcecoes excecoes={excecoes} />
          <TabelaDeItens excecoes={excecoes} />
        </div>
      )}
    </section>
  );
}