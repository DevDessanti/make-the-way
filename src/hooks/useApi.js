"use client";
import { useEffect, useState } from "react";
import { buscarDaApi } from "@/services/clienteHttp";

/**
 * Hook de busca de dados com estados de carregamento e erro.
 * @param rota Caminho relativo da API (ex.: "/decisoria/resumo").
 *             Passe null para não buscar.
 * @returns { dados, carregando, erro }
 */
export function useApi(rota) {
  // Um único objeto de estado evita várias chamadas de setState
  // seguidas dentro do efeito (que disparam o aviso do linter).
  const [estado, setEstado] = useState({
    dados: null,
    erro: null,
    carregando: Boolean(rota),
  });

  useEffect(() => {
    if (!rota) return;

    // "ativo" descarta respostas obsoletas se a rota mudar ou o
    // componente desmontar antes da resposta chegar.
    let ativo = true;

    buscarDaApi(rota)
      .then((resposta) => {
        if (ativo) setEstado({ dados: resposta, erro: null, carregando: false });
      })
      .catch((excecao) => {
        if (ativo) setEstado({ dados: null, erro: excecao, carregando: false });
      });

    return () => { ativo = false; };
  }, [rota]);

  return estado;
}