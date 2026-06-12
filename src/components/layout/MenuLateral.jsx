"use client";
import { useAppStore } from "@/store/useAppStore";
import Icone from "@/components/common/Icone";

// Itens de menu de cada camada. "ativo" marca o item selecionado;
// "contador" é o badge numérico; "alerta" pinta o badge de vermelho.
const MENU_DECISORIA = [
  { rotulo: "Visão Executiva",      icone: ["M3 13h8V3H3zM13 21h8V3h-8zM3 21h8v-6H3z"], ativo: true },
  { rotulo: "Linha do Tempo",       icone: ["M3 3v18h18", "M19 9l-5 5-4-4-3 3"] },
  { rotulo: "Cenários & Simulação", icone: [{ circulo: { cx: 12, cy: 12, r: 9 } }, "M12 7v5l3 2"] },
  { rotulo: "Relatório p/ Conselho", icone: ["M14 3v5h5M7 3h7l5 5v13H7z", "M9 13h6"] },
];

const MENU_OPERACIONAL = [
  { rotulo: "Fila de Exceções",            icone: ["M9 11l3 3 8-8M4 12v7a1 1 0 0 0 1 1h14"], contador: "2.6K", alerta: true, ativo: true },
  { rotulo: "Itens & Documentos",          icone: ["M3 6h18M3 12h18M3 18h12"], contador: "1.4M" },
  { rotulo: "Conciliação",                 icone: ["M4 4h16v16H4z", "M4 9h16M9 4v16"], contador: "98.7%" },
  { rotulo: "Mapeamento NCM / cClassTrib", icone: [{ circulo: { cx: 11, cy: 11, r: 7 } }, "M21 21l-4.3-4.3"], contador: "842", alerta: true },
  { rotulo: "Trilha de Auditoria",         icone: ["M12 2v20M2 7l10-5 10 5"] },
];

/** Menu lateral fixo. Troca os itens conforme a camada ativa no store. */
export default function MenuLateral() {
  const camadaAtiva = useAppStore((s) => s.camadaAtiva);
  const itensDoMenu = camadaAtiva === "decisoria" ? MENU_DECISORIA : MENU_OPERACIONAL;

  return (
    <aside
      className="sticky top-0 hidden lg:flex flex-col gap-1 h-screen w-64 px-4 py-6"
      style={{ borderRight: "1px solid var(--hair)", background: "linear-gradient(180deg,rgba(26,198,162,.04),transparent)", backdropFilter: "blur(6px)" }}
    >
      {/* Logomarca */}
      <div className="flex items-center gap-3 px-2 pb-5">
        <div className="relative w-9 h-9 rounded-xl"
          style={{ background: "conic-gradient(from 200deg,var(--brand),var(--info),var(--brand-2),var(--brand))", boxShadow: "0 0 0 1px var(--hair-2),0 8px 22px rgba(26,198,162,.22)" }}>
          <div className="absolute rounded" style={{ inset: 8, background: "var(--ink-2)" }} />
        </div>
        <div>
          <b className="fonte-serif block text-lg leading-none" style={{ fontWeight: 600 }}>Make the Way</b>
          <span className="block texto-apagado uppercase" style={{ fontSize: "9.5px", letterSpacing: ".18em", marginTop: 3 }}>
            Inteligência da Reforma
          </span>
        </div>
      </div>

      <div className="texto-apagado uppercase px-2 pt-3 pb-1" style={{ fontSize: "9.5px", letterSpacing: ".18em" }}>
        {camadaAtiva === "decisoria" ? "Camada Decisória" : "Camada Operacional"}
      </div>

      {itensDoMenu.map((item, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm cursor-pointer transition ${item.ativo ? "menu-item-ativo texto-principal" : "texto-secundario"}`}
          style={{ background: item.ativo ? "var(--surface-2)" : undefined, border: `1px solid ${item.ativo ? "var(--hair)" : "transparent"}` }}
        >
          <span style={{ opacity: 0.85 }}><Icone desenhos={item.icone} /></span>
          <span className="flex-1" style={{ fontSize: 13 }}>{item.rotulo}</span>
          {item.contador && (
            <span className="fonte-mono rounded px-1.5"
              style={{ fontSize: "10.5px", background: item.alerta ? "var(--neg-d)" : "var(--ink-3)", color: item.alerta ? "var(--neg)" : "var(--muted)", padding: "1px 6px", borderRadius: 6 }}>
              {item.contador}
            </span>
          )}
        </div>
      ))}

      <div className="mt-auto px-2 pt-4 texto-apagado" style={{ borderTop: "1px solid var(--hair)", fontSize: 11 }}>
        Base conciliada<br />
        <b className="fonte-mono texto-secundario" style={{ fontWeight: 600 }}>01/2025 – 02/2026</b> · 1.482.301 itens
      </div>
    </aside>
  );
}