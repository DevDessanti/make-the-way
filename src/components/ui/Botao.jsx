import Icone from "@/components/common/Icone";

/**
 * Botão padrão da aplicação.
 *
 * Variantes:
 * - "padrao":   fundo translúcido com borda fina (ações secundárias)
 * - "primario": fundo na cor da marca (ação principal da tela)
 *
 * Exemplo:
 *   <Botao variante="primario" icone={["M9 11l3 3 8-8"]}>Corrigir em lote</Botao>
 */
const VISUAL_POR_VARIANTE = {
  padrao: {
    classes: "texto-secundario com-borda fundo-card",
    estilo: {},
  },
  primario: {
    classes: "font-semibold",
    estilo: { background: "var(--brand)", border: "1px solid var(--brand)", color: "#04221c" },
  },
};

export default function Botao({ variante = "padrao", icone, children, className = "", style = {}, ...outrasProps }) {
  const visual = VISUAL_POR_VARIANTE[variante];

  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-lg cursor-pointer ${visual.classes} ${className}`}
      style={{ fontSize: 12, padding: "7px 13px", fontFamily: "var(--sans)", ...visual.estilo, ...style }}
      {...outrasProps}
    >
      {icone && <Icone desenhos={icone} espessura={2} tamanho={13} />}
      {children}
    </button>
  );
}