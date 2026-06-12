"use client";
import { useApi } from "@/hooks/useApi";
import RevelarAoRolar from "@/components/common/RevelarAoRolar";
import { EsqueletoGradeDeCards } from "@/components/common/EsqueletoDeCarregamento";
import Card from "@/components/ui/Card";
import { COR_SEMANTICA } from "@/utils/apresentacao";

/** Cards de estatística no topo da camada operacional. */
export default function IndicadoresOperacionais() {
  const { dados: indicadores, carregando } = useApi("/operacional/indicadores");

  if (carregando) return <EsqueletoGradeDeCards quantidade={4} />;
  if (!indicadores) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {indicadores.map((indicador, posicao) => (
        <RevelarAoRolar key={indicador.chave} atrasoMs={posicao * 50} className="h-full">
          <Card critico={indicador.critico} className="h-full" style={{ padding: "18px 20px" }}>
            <div className="flex items-center gap-2 texto-secundario" style={{ fontSize: "11.5px" }}>
              <span className="rounded-full" style={{ width: 8, height: 8, background: COR_SEMANTICA[indicador.corDoPonto] }} />
              {indicador.titulo}
            </div>
            <div className="fonte-mono font-semibold" style={{ fontSize: 30, margin: "10px 0 3px", letterSpacing: "-.02em", color: COR_SEMANTICA[indicador.corDoValor] }}>
              {indicador.valorFormatado}
              {indicador.sufixo && <small className="texto-apagado" style={{ fontSize: ".5em" }}>{indicador.sufixo}</small>}
            </div>
            <div className="texto-apagado" style={{ fontSize: "11.5px" }}>{indicador.descricao}</div>
          </Card>
        </RevelarAoRolar>
      ))}
    </div>
  );
}