import RevelarAoRolar from "./RevelarAoRolar";

/**
 * Faixa no topo de cada camada explicando para quem ela é e o que contém.
 * @param cor   Cor do ícone.
 * @param fundo Cor de fundo do quadrado do ícone.
 * @param icone Elemento <Icone /> a exibir.
 */
export default function BannerDeContexto({ cor, fundo, icone, children }) {
  return (
    <RevelarAoRolar>
      <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-2xl com-borda fundo-card texto-secundario" style={{ fontSize: "12.5px" }}>
        <div className="grid place-items-center rounded-lg" style={{ width: 30, height: 30, background: fundo, color: cor, flex: "0 0 auto" }}>
          {icone}
        </div>
        <div>{children}</div>
      </div>
    </RevelarAoRolar>
  );
}