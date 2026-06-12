"use client";

/** Checkbox customizado (quadradinho que preenche com a cor da marca). */
export default function CaixaDeSelecao({ marcado, aoClicar }) {
  const tratarClique = (evento) => {
    evento.stopPropagation();
    evento.preventDefault();
    aoClicar();
  };

  return (
    <span
      role="checkbox"
      aria-checked={marcado}
      onClick={tratarClique}
      className="inline-block cursor-pointer rounded transition"
      style={{
        width: 15,
        height: 15,
        border: "1.5px solid var(--hair-2)",
        background: marcado ? "var(--brand)" : "transparent",
        borderColor: marcado ? "var(--brand)" : undefined,
        flex: "0 0 auto",
      }}
    />
  );
}