"use client";
import { useEffect, useRef, useState } from "react";
import Icone from "@/components/common/Icone";

/**
 * Campo de busca com "debounce": só dispara a busca depois que a pessoa
 * para de digitar (evita uma chamada por tecla).
 */
export default function CampoDeBusca({ placeholder, aoBuscar, atrasoMs = 400 }) {
  const [textoDigitado, setTextoDigitado] = useState("");

  // Guardamos aoBuscar numa ref para acessar sempre a versão mais recente
  // SEM colocá-la nas dependências do efeito. Assim o debounce só dispara
  // quando o TEXTO muda — e não toda vez que o componente pai re-renderiza
  // (o que recriava a função aoBuscar e disparava buscas indevidas).
  const aoBuscarRef = useRef(aoBuscar);
  useEffect(() => { aoBuscarRef.current = aoBuscar; }, [aoBuscar]);

  // Não dispara na montagem inicial (texto vazio)
  const ehPrimeiraRenderizacao = useRef(true);

  useEffect(() => {
    if (ehPrimeiraRenderizacao.current) {
      ehPrimeiraRenderizacao.current = false;
      return;
    }

    const temporizador = setTimeout(() => aoBuscarRef.current(textoDigitado), atrasoMs);
    return () => clearTimeout(temporizador);
  }, [textoDigitado, atrasoMs]); // ← só "textoDigitado" dispara; aoBuscar saiu daqui

  return (
    <label
      className="inline-flex items-center gap-2 rounded-xl com-borda fundo-card cursor-text"
      style={{ fontSize: "12.5px", padding: "7px 12px", minWidth: 240 }}
    >
      <Icone desenhos={[{ circulo: { cx: 11, cy: 11, r: 7 } }, "M21 21l-4.3-4.3"]} espessura={2} tamanho={14} style={{ color: "var(--muted)" }} />
      <input
        type="text"
        value={textoDigitado}
        onChange={(evento) => setTextoDigitado(evento.target.value)}
        placeholder={placeholder}
        className="bg-transparent border-0 outline-none flex-1"
        style={{ fontSize: "12.5px", color: "var(--text)", fontFamily: "var(--sans)" }}
      />
    </label>
  );
}