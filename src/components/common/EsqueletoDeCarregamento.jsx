/**
 * Skeletons de carregamento que imitam o formato do conteúdo real.
 * Cada export corresponde a uma seção da tela, para a espera parecer
 * o "rascunho" do que vai aparecer, e não um buraco vazio.
 */

/** Bloco genérico (fallback). Use os específicos abaixo quando possível. */
export default function EsqueletoDeCarregamento({ altura = 120, className = "" }) {
  return <div className={`peca-esqueleto ${className}`} style={{ height: altura }} />;
}

/* ── HERO: número gigante à esquerda, barras à direita ── */
export function EsqueletoHero() {
  return (
    <div className="container-esqueleto rounded-2xl com-borda mb-5" style={{ padding: "32px 34px" }}>
      <div className="grid gap-8 items-center md:grid-cols-2">
        {/* Coluna esquerda */}
        <div>
          <div className="peca-esqueleto peca-linha" style={{ width: "70%", marginBottom: 20 }} />
          <div className="peca-esqueleto peca-numero-gigante" style={{ marginBottom: 18 }} />
          <div className="peca-esqueleto peca-linha" style={{ width: "92%", marginBottom: 8 }} />
          <div className="peca-esqueleto peca-linha" style={{ width: "80%", marginBottom: 8 }} />
          <div className="peca-esqueleto peca-linha" style={{ width: "55%", marginBottom: 20 }} />
          <div className="peca-esqueleto" style={{ width: 230, height: 34, borderRadius: 999 }} />
        </div>
        {/* Coluna direita: duas barras */}
        <div className="flex flex-col gap-5">
          {[0, 1].map((i) => (
            <div key={i}>
              <div className="flex justify-between" style={{ marginBottom: 8 }}>
                <div className="peca-esqueleto peca-linha" style={{ width: "55%" }} />
                <div className="peca-esqueleto peca-linha" style={{ width: 60 }} />
              </div>
              <div className="peca-esqueleto" style={{ height: 13, borderRadius: 7 }} />
            </div>
          ))}
          <div className="peca-esqueleto peca-linha" style={{ width: "40%" }} />
        </div>
      </div>
    </div>
  );
}

/* ── CARD de KPI: título, número, detalhe ── */
export function EsqueletoCard() {
  return (
    <div className="container-esqueleto rounded-2xl com-borda fundo-card p-5" style={{ minHeight: 150 }}>
      <div className="flex justify-between items-start" style={{ marginBottom: 26 }}>
        <div className="peca-esqueleto peca-linha" style={{ width: "50%" }} />
        <div className="peca-esqueleto peca-circulo" style={{ width: 32, height: 32, borderRadius: 9 }} />
      </div>
      <div className="peca-esqueleto" style={{ width: "55%", height: 30, marginBottom: 12 }} />
      <div className="peca-esqueleto peca-linha" style={{ width: "70%" }} />
    </div>
  );
}

/** Grade de N cards (KPIs decisória/operacional). */
export function EsqueletoGradeDeCards({ quantidade = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      {Array.from({ length: quantidade }).map((_, i) => <EsqueletoCard key={i} />)}
    </div>
  );
}

/* ── GRÁFICO de linha (timeline) ── */
export function EsqueletoGrafico() {
  return (
    <div className="container-esqueleto rounded-2xl com-borda fundo-card" style={{ padding: "26px 28px 22px" }}>
      <div className="flex gap-4" style={{ marginBottom: 18 }}>
        <div className="peca-esqueleto peca-linha" style={{ width: 120 }} />
        <div className="peca-esqueleto peca-linha" style={{ width: 140 }} />
      </div>
      <div className="peca-esqueleto" style={{ height: 200, borderRadius: 12, marginBottom: 14 }} />
      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="peca-esqueleto" style={{ height: 38, borderRadius: 10 }} />
        ))}
      </div>
    </div>
  );
}

/* ── LISTA (fila de exceções) ── */
export function EsqueletoLista({ itens = 5 }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="peca-esqueleto peca-linha" style={{ width: "60%", marginBottom: 6 }} />
      {Array.from({ length: itens }).map((_, i) => (
        <div key={i} className="container-esqueleto rounded-2xl com-borda fundo-card" style={{ padding: "14px 15px" }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
            <div className="peca-esqueleto peca-circulo" style={{ width: 8, height: 8 }} />
            <div className="peca-esqueleto peca-linha" style={{ flex: 1 }} />
            <div className="peca-esqueleto peca-linha" style={{ width: 36 }} />
          </div>
          <div className="peca-esqueleto peca-linha" style={{ width: "45%" }} />
        </div>
      ))}
    </div>
  );
}

/* ── TABELA (itens) ── */
export function EsqueletoTabela({ linhas = 6 }) {
  return (
    <div className="container-esqueleto rounded-2xl com-borda fundo-card overflow-hidden">
      <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--hair)" }}>
        <div className="peca-esqueleto peca-linha-titulo" style={{ width: "40%", marginBottom: 8 }} />
        <div className="peca-esqueleto peca-linha" style={{ width: "60%" }} />
      </div>
      <div className="p-4 flex flex-col gap-3">
        {Array.from({ length: linhas }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="peca-esqueleto" style={{ width: 15, height: 15, borderRadius: 4 }} />
            <div className="peca-esqueleto peca-linha" style={{ flex: 2 }} />
            <div className="peca-esqueleto peca-linha" style={{ flex: 1 }} />
            <div className="peca-esqueleto peca-linha" style={{ flex: 1 }} />
            <div className="peca-esqueleto peca-linha" style={{ width: 70 }} />
          </div>
        ))}
      </div>
    </div>
  );
}