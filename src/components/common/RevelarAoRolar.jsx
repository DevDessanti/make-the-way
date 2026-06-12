"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Anima a entrada do conteúdo quando ele aparece na tela (fade + slide up).
 * Usa IntersectionObserver: ao entrar 10% no viewport, aplica a classe .visivel.
 * @param atrasoMs Atraso da transição, útil para efeito cascata em grids.
 */
export default function RevelarAoRolar({ children, atrasoMs = 0, className = "", style = {} }) {
  const elementoRef = useRef(null);
  const [estaVisivel, setEstaVisivel] = useState(false);

  useEffect(() => {
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setEstaVisivel(true);
          observador.disconnect(); // anima uma única vez
        }
      },
      { threshold: 0.1 }
    );
    if (elementoRef.current) observador.observe(elementoRef.current);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={elementoRef}
      className={`revelar ${estaVisivel ? "visivel" : ""} ${className}`}
      style={{ transitionDelay: `${atrasoMs}ms`, ...style }}
    >
      {children}
    </div>
  );
}