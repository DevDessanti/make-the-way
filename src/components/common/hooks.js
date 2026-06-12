import { useEffect, useState } from "react";

/**
 * Anima um número de 0 até valorFinal com easing suave (ease-out cúbico).
 * Usado no contador do hero ("+R$ 10,73 M").
 * @param iniciar Só começa a contagem quando true (ex.: após a página carregar).
 */
export function useContagemAnimada(valorFinal, duracaoMs = 1400, iniciar = false) {
  const [valorAtual, setValorAtual] = useState(0);

  useEffect(() => {
    if (!iniciar) return;
    let frame;
    const inicio = performance.now();

    const passo = (agora) => {
      const progresso = Math.min((agora - inicio) / duracaoMs, 1);
      const progressoSuavizado = 1 - Math.pow(1 - progresso, 3); // ease-out cúbico
      setValorAtual(valorFinal * progressoSuavizado);
      if (progresso < 1) frame = requestAnimationFrame(passo);
    };

    frame = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(frame);
  }, [valorFinal, duracaoMs, iniciar]);

  return valorAtual;
}

/**
 * Retorna false e vira true após o atraso informado.
 * Usado para disparar animações de barras/anéis logo depois da montagem.
 */
export function useAtivarAposAtraso(atrasoMs = 300) {
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const temporizador = setTimeout(() => setAtivo(true), atrasoMs);
    return () => clearTimeout(temporizador);
  }, [atrasoMs]);

  return ativo;
}