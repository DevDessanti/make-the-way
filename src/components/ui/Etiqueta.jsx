/**
 * Tag pequena em fonte mono para status de dados nas tabelas.
 *
 * Tons disponíveis: "negativo" (ausente/erro), "alerta" (aberto/pendente),
 * "positivo" (resolvido/ok), "info".
 *
 * Exemplo:
 *   <Etiqueta tom="negativo">ausente</Etiqueta>
 */
const CORES_POR_TOM = {
  negativo: { background: "var(--neg-d)",  color: "#ffaaa1" },
  alerta:   { background: "var(--warn-d)", color: "var(--warn)" },
  positivo: { background: "var(--pos-d)",  color: "var(--pos)" },
  info:     { background: "var(--info-d)", color: "var(--info)" },
};

export default function Etiqueta({ tom = "alerta", children }) {
  return (
    <span
      className="fonte-mono font-semibold"
      style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, ...CORES_POR_TOM[tom] }}
    >
      {children}
    </span>
  );
}