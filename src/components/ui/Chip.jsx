import Icone from "@/components/common/Icone";

/**
 * Pílula de informação ou filtro.
 *
 * Variantes:
 * - "padrao":     borda fina, texto secundário (filtros clicáveis, infos)
 * - "destaque":   cor da marca (filtro salvo/ativo, ex.: "Minha fila do dia")
 * - "desativado": apagado e sem clique (funcionalidades "Em breve")
 *
 * Props:
 * - comSeta: exibe a setinha de dropdown à direita
 *
 * Exemplo:
 *   <Chip comSeta>Tipo doc <b>NF-e</b></Chip>
 */
const VISUAL_POR_VARIANTE = {
  padrao: {
    classes: "texto-secundario com-borda fundo-card cursor-pointer",
    estilo: {},
  },
  destaque: {
    classes: "cursor-pointer",
    estilo: { border: "1px solid var(--brand)", color: "var(--brand)", background: "var(--brand-tint)" },
  },
  desativado: {
    classes: "com-borda select-none",
    estilo: { background: "var(--surface)", color: "var(--muted)", cursor: "not-allowed", opacity: 0.7 },
  },
};

export default function Chip({ variante = "padrao", comSeta = false, children, className = "", style = {}, ...outrasProps }) {
  const visual = VISUAL_POR_VARIANTE[variante];
  const setaApagada = variante === "desativado";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-xl ${visual.classes} ${className}`}
      style={{ fontSize: 12, padding: "7px 12px", ...visual.estilo, ...style }}
      {...outrasProps}
    >
      {children}
      {comSeta && <Icone desenhos={["M6 9l6 6 6-6"]} espessura={2} tamanho={12} style={{ opacity: setaApagada ? 0.35 : 0.6 }} />}
    </span>
  );
}