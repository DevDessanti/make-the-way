"use client";
import { useAppStore } from "@/store/useAppStore";

const ITENS_FIXOS = ["AAA", "BBB", "CCC"];

export default function TesteSelecao() {
  const chavesSelecionadas = useAppStore((estado) => estado.chavesSelecionadas);
  const alternarLinha = useAppStore((estado) => estado.alternarLinha);

  return (
    <div style={{ padding: 30, color: "#fff" }}>
      <h3>Teste de seleção</h3>
      <p>Selecionadas: {JSON.stringify(chavesSelecionadas)}</p>
      {ITENS_FIXOS.map((chave) => (
        <div key={chave} style={{ margin: 8 }}>
          <button
            onClick={() => alternarLinha(chave)}
            style={{
              padding: "8px 16px",
              background: chavesSelecionadas.includes(chave) ? "#1ac6a2" : "#333",
              color: "#fff",
              border: "1px solid #666",
              cursor: "pointer",
            }}
          >
            {chave} {chavesSelecionadas.includes(chave) ? "✓ marcado" : "vazio"}
          </button>
        </div>
      ))}
    </div>
  );
}