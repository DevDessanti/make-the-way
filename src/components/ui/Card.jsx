/**
 * Card padrão da aplicação: cantos arredondados, fundo translúcido, borda fina.
 *
 * Props de variante (todas opcionais):
 * - interativo:  ganha efeito de hover (eleva e clareia)
 * - critico:     borda e fundo avermelhados (indicadores em alerta)
 * - selecionado: borda e fundo na cor da marca (item ativo de uma lista)
 *
 * Exemplo:
 *   <Card interativo className="p-5">conteúdo</Card>
 */
export default function Card({
  interativo = false,
  critico = false,
  selecionado = false,
  className = "",
  style = {},
  children,
  ...outrasProps
}) {
  const ehVariantePadrao = !critico && !selecionado;

  const classes = [
    "relative overflow-hidden rounded-2xl",
    ehVariantePadrao ? "com-borda fundo-card" : "",
    interativo ? "card-interativo" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const estiloDaVariante = critico
    ? { border: "1px solid rgba(255,106,92,.3)", background: "linear-gradient(135deg,var(--neg-d),transparent)" }
    : selecionado
    ? { border: "1px solid var(--brand)", background: "var(--brand-tint)" }
    : {};

  return (
    <div className={classes} style={{ ...estiloDaVariante, ...style }} {...outrasProps}>
      {children}
    </div>
  );
}