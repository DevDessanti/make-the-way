import RevelarAoRolar from "./RevelarAoRolar";

/** Título de seção em serifada, com dica opcional alinhada à direita. */
export default function TituloDeSecao({ titulo, dica }) {
  return (
    <RevelarAoRolar>
      <div className="flex items-baseline gap-3" style={{ margin: "32px 0 15px" }}>
        <h2 className="fonte-serif" style={{ fontWeight: 500, fontSize: 24, letterSpacing: "-.01em" }}>{titulo}</h2>
        {dica && <span className="ml-auto texto-apagado" style={{ fontSize: "12.5px" }}>{dica}</span>}
      </div>
    </RevelarAoRolar>
  );
}