"use client";

import { useEffect, useRef, useState } from "react";

export default function SeletorSuspenso({
  rotulo,
  opcoes,
  valorSelecionado,
  aoSelecionar,
}) {
  const [aberto, setAberto] = useState(false);
  const [posicao, setPosicao] = useState({ top: 0, left: 0, width: 220 });
  const botaoRef = useRef(null);
  const menuRef = useRef(null);

  const opcaoAtual = opcoes.find((opcao) => opcao.valor === valorSelecionado);

  function alternarMenu() {
    if (!botaoRef.current) return;

    const rect = botaoRef.current.getBoundingClientRect();

    const larguraMenu = 220;
    const margemTela = 12;

    setPosicao({
      top: rect.bottom + 6,
      left: Math.min(rect.left, window.innerWidth - larguraMenu - margemTela),
      width: larguraMenu,
    });

    setAberto((valor) => !valor);
  }

  useEffect(() => {
    if (!aberto) return;

    function fecharAoRolar() {
      setAberto(false);
    }

    function fecharAoClicarFora(evento) {
      const clicouNoBotao = botaoRef.current?.contains(evento.target);
      const clicouNoMenu = menuRef.current?.contains(evento.target);

      if (!clicouNoBotao && !clicouNoMenu) {
        setAberto(false);
      }
    }

    window.addEventListener("scroll", fecharAoRolar, true);
    window.addEventListener("resize", fecharAoRolar);
    document.addEventListener("mousedown", fecharAoClicarFora);
    document.addEventListener("touchstart", fecharAoClicarFora);

    return () => {
      window.removeEventListener("scroll", fecharAoRolar, true);
      window.removeEventListener("resize", fecharAoRolar);
      document.removeEventListener("mousedown", fecharAoClicarFora);
      document.removeEventListener("touchstart", fecharAoClicarFora);
    };
  }, [aberto]);

  return (
    <div className="relative inline-block">
      <button
        ref={botaoRef}
        type="button"
        onClick={alternarMenu}
        className="
          inline-flex h-[34px] max-w-[160px] items-center gap-1.5
          rounded-xl com-borda
          px-3
          whitespace-nowrap
          bg-transparent
          text-[12px]
          leading-none
          text-[var(--text-2)]
        "
      >
        <span className="shrink-0 text-[12px]">
          {rotulo}
        </span>

        <span className="truncate text-[12px] font-semibold text-[var(--text)]">
          {opcaoAtual?.rotulo ?? "Todos"}
        </span>

        <span className="shrink-0 text-[10px] opacity-70">
          ˅
        </span>
      </button>

      {aberto && (
        <div
          ref={menuRef}
          className="
            fixed z-[9999]
            max-h-[220px]
            overflow-y-auto
            rounded-xl com-borda
            bg-[var(--ink-2)]
            shadow-[rgba(0,0,0,0.45)_0px_14px_32px]
          "
          style={{
            top: posicao.top,
            left: posicao.left,
            width: posicao.width,
          }}
        >
          {opcoes.map((opcao) => (
            <button
              key={opcao.valor}
              type="button"
              onClick={() => {
                aoSelecionar(opcao.valor);
                setAberto(false);
              }}
              className="
                block w-full
                cursor-pointer
                truncate
                px-3 py-2
                text-left
                text-[12px]
                leading-snug
                text-[var(--text)]
                hover:bg-white/5
              "
            >
              {opcao.rotulo}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}