"use client";
import { useAppStore } from "@/store/useAppStore";
import MenuLateral from "@/components/layout/MenuLateral";
import BarraSuperior from "@/components/layout/BarraSuperior";
import VisaoDecisoria from "@/components/decisoria/VisaoDecisoria";
import VisaoOperacional from "@/components/operacional/VisaoOperacional";

export default function Page() {
  const camadaAtiva = useAppStore((s) => s.camadaAtiva);
  return (
    <div className="mtw">
      <div className="relative z-10 flex">
        <MenuLateral />
        <div className="flex-1 min-w-0">
          <BarraSuperior />
          <div className="mx-auto px-4 sm:px-7 pt-5 sm:pt-7 pb-16" style={{ maxWidth: 1340 }}>
            {camadaAtiva === "decisoria" ? <VisaoDecisoria key="decisoria" /> : <VisaoOperacional key="operacional" />}
            <footer className="text-center texto-apagado mt-11 pt-5" style={{ fontSize: "11.5px", borderTop: "1px solid var(--hair)" }}>
              <b className="fonte-serif texto-secundario">Make the Way</b> · plataforma de inteligência da Reforma Tributária — EC 132/2023 · LC 214/2025<br />
              Paleta provisória sujeita ao manual de marca · dados de demonstração · não constituem aconselhamento fiscal ou jurídico
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}