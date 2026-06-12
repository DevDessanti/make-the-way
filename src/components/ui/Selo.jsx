/**
 * Selo arredondado com ponto luminoso. Usado para status e avisos curtos.
 *
 * Tons: "positivo" (ex.: "Conciliado"), "marca" (ex.: "Em breve"),
 * "negativo" (ex.: alertas).
 *
 * Tamanhos:
 * - "normal": texto 11px (barra superior)
 * - "mini":   texto 8.5px em caixa alta (selo "Em breve" dos filtros)
 *
 * Exemplo:
 *   <Selo tom="positivo">Conciliado</Selo>
 *   <Selo tom="marca" tamanho="mini">Em breve</Selo>
 */
const CORES_POR_TOM = {
  positivo: { cor: "var(--pos)",   borda: "rgba(52,216,162,.3)",  fundo: "transparent" },
  marca:    { cor: "var(--brand)", borda: "rgba(26,198,162,.28)", fundo: "var(--brand-tint)" },
  negativo: { cor: "#ffaaa1",      borda: "rgba(255,106,92,.32)", fundo: "var(--neg-d)" },
};

export default function Selo({ tom = "positivo", tamanho = "normal", children, style = {} }) {
  const cores = CORES_POR_TOM[tom];
  const ehMini = tamanho === "mini";

  return (
    <span
      className={`inline-flex items-center rounded-full whitespace-nowrap ${ehMini ? "uppercase font-semibold" : ""}`}
      style={{
        fontSize: ehMini ? "8.5px" : 11,
        letterSpacing: ehMini ? ".12em" : undefined,
        padding: ehMini ? "2px 7px" : "3px 9px",
        color: cores.cor,
        border: `1px solid ${cores.borda}`,
        background: cores.fundo,
        ...style,
      }}
    >
      <span
        className="inline-block rounded-full mr-1.5"
        style={{
          width: ehMini ? 4 : 6,
          height: ehMini ? 4 : 6,
          background: cores.cor,
          boxShadow: `0 0 ${ehMini ? 6 : 8}px ${cores.cor}`,
          animation: ehMini ? undefined : "pulse 2s infinite",
        }}
      />
      {children}
    </span>
  );
}