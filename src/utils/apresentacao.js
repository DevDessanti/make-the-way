/** Formata um número como milhões no padrão brasileiro: 10.73 → "10,73" */
export const formatarMilhoes = (valor) => valor.toFixed(2).replace(".", ",");

/**
 * A API devolve cores SEMÂNTICAS ("positivo", "alerta"...) em vez de
 * hex/variáveis CSS — assim o backend não conhece o design system.
 * Este mapa traduz o nome semântico para o token visual.
 */
export const COR_SEMANTICA = {
  positivo: "var(--pos)",
  negativo: "var(--neg)",
  alerta: "var(--warn)",
  info: "var(--info)",
  apagado: "var(--muted)",
  secundario: "var(--text-2)",
  marca: "var(--brand)",
};