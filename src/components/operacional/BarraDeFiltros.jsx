"use client";
import { useAppStore } from "@/store/useAppStore";
import { useApi } from "@/hooks/useApi";
import RevelarAoRolar from "@/components/common/RevelarAoRolar";
import Chip from "@/components/ui/Chip";
import Selo from "@/components/ui/Selo";
import SeletorSuspenso from "@/components/ui/SeletorSuspenso";

/** Barra de filtros da fila de exceções. */
export default function BarraDeFiltros() {
  const filtros = useAppStore((estado) => estado.filtros);
  const definirFiltro = useAppStore((estado) => estado.definirFiltro);
  const { dados } = useApi("/operacional/empresas");

  const opcoesDeTipoDocumento = [
    { valor: "todos", rotulo: "Todos" },
    ...(dados?.tiposDeDocumento || []).map((tipo) => ({ valor: tipo, rotulo: tipo })),
  ];
  const opcoesDeCnpj = [
    { valor: "todos", rotulo: `Todos · ${dados?.empresas?.length ?? "…"}` },
    ...(dados?.empresas || []).map((empresa) => ({ valor: empresa.cnpj, rotulo: `${empresa.nome} · ${empresa.cnpj}` })),
  ];

return (
  <RevelarAoRolar>
    <div className="relative z-[100] w-full max-w-full overflow-hidden mb-4">
      <div
        className="
          flex w-full max-w-full items-center gap-2.5
          overflow-x-auto overflow-y-hidden
          pb-1
          sm:flex-wrap sm:overflow-visible
        "
        style={{ scrollbarWidth: "none" }}
      >
        <Chip variante="destaque" className="shrink-0">
          ⌗ Minha fila do dia
        </Chip>

        <div className="shrink-0">
          <SeletorSuspenso
            rotulo="Tipo doc"
            opcoes={opcoesDeTipoDocumento}
            valorSelecionado={filtros.tipoDocumento}
            aoSelecionar={(valor) => definirFiltro("tipoDocumento", valor)}
          />
        </div>

        <Chip variante="desativado" comSeta title="Em breve" className="shrink-0">
          Severidade{" "}
          <b className="texto-secundario" style={{ fontWeight: 600 }}>
            Alta
          </b>
          <Selo tom="marca" tamanho="mini" style={{ marginLeft: 4 }}>
            Em breve
          </Selo>
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
          Status{" "}
          <b className="texto-secundario" style={{ fontWeight: 600 }}>
            Aberto
          </b>
          <Selo tom="marca" tamanho="mini" style={{ marginLeft: 4 }}>
            Em breve
          </Selo>
        </Chip>
      </div>
    </div>
  </RevelarAoRolar>
);
}