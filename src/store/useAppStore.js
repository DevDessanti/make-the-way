import { create } from "zustand";

/**
 * Estado global da aplicação (Zustand).
 */
export const useAppStore = create((set, get) => ({
  // "decisoria" | "operacional"
  camadaAtiva: "decisoria",

  // Ano-base selecionado na linha do tempo (2026–2033)
  anoSelecionado: 2033,

  // Id da exceção selecionada na fila
  excecaoSelecionada: 0,

  // Chaves dos itens marcados na tabela (ex.: ["3175…1000", "3175…1074"])
  // Usamos a chave do item — identidade estável — em vez do índice da linha.
  chavesSelecionadas: [],

  // Filtros da camada operacional. "todos" = sem filtro naquele campo.
  filtros: {
    busca: "",
    tipoDocumento: "todos",
    cnpj: "todos",
  },

  definirCamada: (camadaAtiva) => set({ camadaAtiva }),

  selecionarAno: (anoSelecionado) => set({ anoSelecionado }),

  /** Troca a exceção ativa e limpa a seleção (a lista muda). */
  selecionarExcecao: (excecaoSelecionada) =>
    set({ excecaoSelecionada, chavesSelecionadas: [] }),

/**
   * Atualiza um filtro. Se o valor realmente mudou, limpa a seleção
   * (a lista exibida vai mudar). Se for o mesmo valor, não faz nada —
   * evita limpar a seleção à toa.
   */
  definirFiltro: (nomeDoFiltro, valor) =>
    set((estado) => {
      if (estado.filtros[nomeDoFiltro] === valor) {
        return {}; // valor idêntico: não altera nada
      }
      return {
        filtros: { ...estado.filtros, [nomeDoFiltro]: valor },
        chavesSelecionadas: [],
      };
    }),

/** Marca/desmarca uma linha pela chave do item. */
  alternarLinha: (chaveDoItem) =>
    set((estado) => {
      const jaEstaSelecionada = estado.chavesSelecionadas.includes(chaveDoItem);
      return {
        chavesSelecionadas: jaEstaSelecionada
          ? estado.chavesSelecionadas.filter((cadaChave) => cadaChave !== chaveDoItem)
          : [...estado.chavesSelecionadas, chaveDoItem],
      };
    }),

  /**
   * Marca todas as chaves visíveis; se todas já estiverem marcadas, desmarca.
   * Recebe a lista de chaves atualmente exibida na tabela.
   */
  alternarTodasAsLinhas: (chavesVisiveis) => {
    const selecionadas = get().chavesSelecionadas;
    const todasJaMarcadas =
      chavesVisiveis.length > 0 && chavesVisiveis.every((chave) => selecionadas.includes(chave));
    set({ chavesSelecionadas: todasJaMarcadas ? [] : chavesVisiveis });
  },
}));