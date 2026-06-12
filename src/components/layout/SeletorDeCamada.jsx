"use client";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import Icone from "@/components/common/Icone";

/**
 * Botão individual do seletor. Declarado FORA do componente principal
 * para o React não recriá-lo a cada render (evita o erro
 * "Cannot create components during render").
 */
function BotaoDeCamada({ id, rotulo, icone, refBotao, ativo, aoSelecionar }) {
  return (
    <button
      ref={refBotao}
      onClick={() => aoSelecionar(id)}
      className="relative z-10 flex items-center gap-1.5 sm:gap-2 rounded-full cursor-pointer border-0 bg-transparent font-semibold"
      style={{
        fontFamily: "var(--sans)",
        fontSize: "12.5px",
        padding: "7px 12px",
        color: ativo ? "var(--ink)" : "var(--text-2)",
        transition: "color .25s",
      }}
    >
      <Icone desenhos={icone} espessura={2} tamanho={14} />
      <span className="hidden xs:inline sm:inline">{rotulo}</span>
    </button>
  );
}

/**
 * Alternador Decisória ⇄ Operacional do topo da página.
 * O "indicador" é a pílula verde que desliza por baixo do botão ativo —
 * medimos a posição/largura do botão via refs e animamos com CSS transition.
 */
export default function SeletorDeCamada() {
  const camadaAtiva = useAppStore((s) => s.camadaAtiva);
  const definirCamada = useAppStore((s) => s.definirCamada);

  const refBotaoDecisoria = useRef(null);
  const refBotaoOperacional = useRef(null);
  const [indicador, setIndicador] = useState({ esquerda: 4, largura: 0 });

  // Reposiciona o indicador quando a camada muda ou a janela é redimensionada
  useEffect(() => {
    const medirBotaoAtivo = () => {
      const botao = camadaAtiva === "decisoria" ? refBotaoDecisoria.current : refBotaoOperacional.current;
      if (botao) setIndicador({ esquerda: botao.offsetLeft, largura: botao.offsetWidth });
    };
    medirBotaoAtivo();
    window.addEventListener("resize", medirBotaoAtivo);
    return () => window.removeEventListener("resize", medirBotaoAtivo);
  }, [camadaAtiva]);

  const selecionarCamada = (camada) => {
    definirCamada(camada);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="relative ml-auto flex items-center rounded-full"
      style={{ border: "1px solid var(--hair-2)", background: "var(--ink-3)", padding: 4 }}
    >
      {/* pílula deslizante */}
      <span
        className="absolute rounded-full"
        style={{
          top: 4, bottom: 4,
          left: indicador.esquerda,
          width: indicador.largura,
          background: "var(--brand)",
          boxShadow: "0 4px 16px rgba(26,198,162,.4)",
          transition: ".32s cubic-bezier(.16,1,.3,1)",
        }}
      />
      <BotaoDeCamada id="decisoria" rotulo="Decisória" refBotao={refBotaoDecisoria} ativo={camadaAtiva === "decisoria"} aoSelecionar={selecionarCamada} icone={["M3 3v18h18M7 14l4-4 3 3 5-6"]} />
      <BotaoDeCamada id="operacional" rotulo="Operacional" refBotao={refBotaoOperacional} ativo={camadaAtiva === "operacional"} aoSelecionar={selecionarCamada} icone={["M4 6h16M4 12h16M4 18h10"]} />
    </div>
  );
}