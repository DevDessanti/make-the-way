"use client";
import SeletorDeCamada from "./SeletorDeCamada";
import Chip from "@/components/ui/Chip";
import Selo from "@/components/ui/Selo";

/** Barra fixa do topo: identificação da empresa, status e seletor de camada. */
export default function BarraSuperior() {
  return (
    <div
      className="sticky top-0 z-30 flex items-center gap-2 sm:gap-4 px-4 sm:px-7 py-3"
      style={{ borderBottom: "1px solid var(--hair)", background: "rgba(9,16,19,.74)", backdropFilter: "blur(16px) saturate(140%)" }}
    >
      {/* Empresa selecionada */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div
          className="grid place-items-center w-9 h-9 rounded-xl fonte-serif texto-marca shrink-0"
          style={{ background: "linear-gradient(140deg,#16282b,#0d181b)", border: "1px solid var(--hair-2)", fontWeight: 600 }}
        >
          G
        </div>
        <div className="min-w-0">
          <b className="block truncate" style={{ fontSize: 14 }}>Grupo Fórmula · Concessionárias</b>
          <span className="block fonte-mono texto-apagado truncate" style={{ fontSize: "10.5px" }}>18.777.198/0001-80</span>
        </div>
      </div>

      {/* Selos: só a partir de sm (somem no celular para dar espaço) */}
      <div className="hidden sm:flex items-center gap-4">
        <Chip style={{ fontSize: 11, padding: "3px 9px" }}>12 CNPJs</Chip>
        <Selo tom="positivo">Conciliado</Selo>
      </div>

      <div className="ml-auto shrink-0">
        <SeletorDeCamada />
      </div>
    </div>
  );
}