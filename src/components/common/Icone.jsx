/**
 * Ícone SVG genérico desenhado por traços (stroke).
 * @param desenhos  Array onde cada item é um path SVG (string)
 *                  ou um círculo no formato { circulo: { cx, cy, r } }.
 * @param espessura Largura do traço (strokeWidth).
 * @param tamanho   Largura/altura em px.
 */
export default function Icone({ desenhos, espessura = 1.8, tamanho = 16, style }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={espessura} style={{ flex: "0 0 auto", ...style }}>
      {desenhos.map((desenho, i) =>
        desenho.circulo ? <circle key={i} {...desenho.circulo} /> : <path key={i} d={desenho} />
      )}
    </svg>
  );
}