# Make the Way · Inteligência da Reforma Tributária

Plataforma web de análise do impacto da **Reforma Tributária brasileira (EC 132/2023 · LC 214/2025)** sobre a operação de empresas. Compara a carga do regime atual (IPI · PIS · COFINS · ICMS) com a projetada no novo regime (CBS · IBS · Imposto Seletivo), ao longo da transição 2026–2033.

> ⚠️ Dados atuais são de **demonstração** e não constituem aconselhamento fiscal ou jurídico.

---

## Stack

| Tecnologia | Papel |
|---|---|
| **Next.js (App Router)** | Framework React, roteamento, build e rotas de API |
| **React** | UI (componentes funcionais + hooks) |
| **JavaScript** | Linguagem (sem TypeScript) |
| **Tailwind CSS** | Layout, grid, responsividade |
| **CSS Variables** | Tokens de design (cores, fontes) em `globals.css` |
| **Zustand** | Estado global |
| **Recharts** | Gráfico da linha do tempo |
| **next/font** | Fontes Google (Fraunces, Hanken Grotesk, JetBrains Mono) |

---

## Como rodar

```bash
npm install
npm run dev          # desenvolvimento → http://localhost:3000
npm run build        # build de produção
npm start            # executa o build
```

Requisitos: Node.js 18+ e npm. Crie um arquivo `.env.local` na raiz (ver seção "Variáveis de ambiente").

---

## As duas camadas

O produto mostra os mesmos dados em **duas visões**, alternadas pelo seletor no topo (`SeletorDeCamada`).

### 🟢 Camada Decisória — `components/decisoria/`
Público: CFO, controladoria, conselho. Poucos números, alto sinal.

| Componente | Mostra |
|---|---|
| `HeroImpacto` | Impacto líquido projetado com contador animado + barras atual × reforma |
| `CardsIndicadores` | 4 KPIs: favorabilidade, seletivo, crédito, receita |
| `LinhaDoTempo` | Gráfico Recharts da carga 2026–2033; clicar num ano mostra a fase |
| `ComposicaoEFavorabilidade` | Barras por tributo + anel de favorabilidade |
| `InsightsEstrategicos` | 3 cards: risco, oportunidade, confiabilidade |

### 🟡 Camada Operacional — `components/operacional/`
Público: analista fiscal, contabilidade. Alta densidade, nível de item.

| Componente | Mostra |
|---|---|
| `IndicadoresOperacionais` | 4 cards de saúde da base |
| `BarraDeFiltros` | Filtros de Tipo doc e CNPJ (Severidade/Status marcados "Em breve") |
| `FilaDeExcecoes` | Exceções ordenadas por impacto; clicar seleciona |
| `TabelaDeItens` | Itens da exceção, com busca, seleção em lote e cards no mobile |

**Conexão entre camadas:** o insight "842 NCM sem cClassTrib" tem a ação "Resolver na operação", que troca para a camada operacional via store.

---

## Estrutura de pastas

```
src/
├── app/
│   ├── globals.css              # Tokens de design + classes utilitárias + skeletons
│   ├── layout.jsx               # Raiz: fontes (next/font), metadata
│   ├── page.jsx                 # Monta menu + barra + camada ativa
│   └── api/                     # API FAKE (Route Handlers) — espelha o futuro Express
│       ├── _dadosMock.js        # Dados de demonstração (fonte única)
│       ├── decisoria/
│       │   ├── resumo/route.js
│       │   ├── indicadores/route.js
│       │   ├── linha-do-tempo/route.js
│       │   ├── composicao/route.js
│       │   └── insights/route.js
│       └── operacional/
│           ├── indicadores/route.js
│           ├── empresas/route.js
│           ├── excecoes/route.js
│           └── excecoes/[id]/itens/route.js
│
├── store/
│   └── useAppStore.js           # Estado global (Zustand)
│
├── hooks/
│   └── useApi.js                # Busca de dados com loading/erro
│
├── services/
│   └── clienteHttp.js           # Cliente HTTP único (ponto de troca mock → API real)
│
├── utils/
│   └── apresentacao.js          # formatarMilhoes + mapa de cores semânticas
│
└── components/
    ├── ui/                      # Biblioteca de blocos visuais própria
    │   ├── Botao.jsx            # variantes: padrao | primario
    │   ├── Card.jsx            # variantes: interativo | critico | selecionado
    │   ├── Chip.jsx           # variantes: padrao | destaque | desativado
    │   ├── Etiqueta.jsx        # tags de status por tom semântico
    │   ├── Selo.jsx           # selos com ponto luminoso
    │   ├── SeletorSuspenso.jsx # dropdown em formato de chip
    │   └── CampoDeBusca.jsx    # input com debounce
    │
    ├── common/                  # Reutilizáveis genéricos
    │   ├── Icone.jsx
    │   ├── RevelarAoRolar.jsx   # animação de entrada (IntersectionObserver)
    │   ├── CaixaDeSelecao.jsx   # checkbox custom
    │   ├── TituloDeSecao.jsx
    │   ├── BannerDeContexto.jsx
    │   ├── EsqueletoDeCarregamento.jsx  # skeletons por formato de seção
    │   └── hooks.js             # useContagemAnimada, useAtivarAposAtraso
    │
    ├── layout/
    │   ├── MenuLateral.jsx      # sidebar (oculta no mobile)
    │   ├── BarraSuperior.jsx    # topo: empresa, status, seletor
    │   └── SeletorDeCamada.jsx  # alternador Decisória ⇄ Operacional
    │
    ├── decisoria/               # (ver tabela acima)
    └── operacional/             # (ver tabela acima)
```

---

## Fluxo de dados (importante)

```
Componente  →  useApi("/rota")  →  clienteHttp  →  ${API_URL}/rota
                                                         │
                              HOJE: /api (Route Handlers, dados de _dadosMock.js)
                              AMANHÃ: API Node/Express → AWS
```

Regra central: **trocar a API fake pela real é mudar UMA variável de ambiente.** Nenhum componente muda.

### Estado global (Zustand) — `store/useAppStore.js`

| Estado | Quem escreve | Quem lê |
|---|---|---|
| `camadaAtiva` | SeletorDeCamada, InsightsEstrategicos | page, MenuLateral |
| `anoSelecionado` | LinhaDoTempo | LinhaDoTempo |
| `excecaoSelecionada` | FilaDeExcecoes | TabelaDeItens |
| `chavesSelecionadas` | TabelaDeItens (checkboxes) | TabelaDeItens (barra de lote) |
| `filtros` (busca, tipoDocumento, cnpj) | BarraDeFiltros, CampoDeBusca | TabelaDeItens (monta a rota) |

**Padrão obrigatório:** selecionar fatias do store, nunca o objeto inteiro.
```js
const camadaAtiva = useAppStore((s) => s.camadaAtiva);  // ✅
const tudo = useAppStore();                              // ❌ re-renderiza em tudo
```

### Como os filtros funcionam

A `TabelaDeItens` monta a rota com os filtros do store via query string. Quando um filtro muda, a rota muda, e o `useApi` rebusca sozinho. O filtro acontece **na API** (Route Handler hoje, Express amanhã) — os nomes dos parâmetros (`busca`, `tipoDocumento`, `cnpj`) e o valor `"todos"` (= sem filtro) fazem parte do contrato.

---

## Contrato de rotas (o que o Express deverá implementar)

| Método | Rota | Retorna |
|---|---|---|
| GET | `/decisoria/resumo` | Hero |
| GET | `/decisoria/indicadores` | 4 KPIs |
| GET | `/decisoria/linha-do-tempo` | Anos, cargas, fases |
| GET | `/decisoria/composicao` | Composição + favorabilidade |
| GET | `/decisoria/insights` | 3 insights |
| GET | `/operacional/indicadores` | 4 cards |
| GET | `/operacional/empresas` | Empresas (CNPJ) + tipos de doc |
| GET | `/operacional/excecoes` | Fila |
| GET | `/operacional/excecoes/:id/itens?busca=&tipoDocumento=&cnpj=` | Itens filtrados |

> O `_dadosMock.js` é o **contrato oficial de formatos**. O Express deve devolver os mesmos campos. As cores vêm **semânticas** (`"positivo"`, `"alerta"`...) — o backend nunca conhece hex.

---

## Design system — `globals.css`

### Tokens (CSS variables)

| Grupo | Variáveis |
|---|---|
| **Marca** (provisória) | `--brand`, `--brand-2`, `--brand-deep`, `--brand-tint` |
| **Neutros** | `--ink*`, `--surface*`, `--hair*`, `--text*`, `--muted` |
| **Semânticos** | `--pos`, `--warn`, `--neg`, `--info` (+ `-d` difusas) |
| **Fontes** | `--serif`, `--sans`, `--mono` (do next/font) |

Trocar a paleta oficial = editar 4 variáveis `--brand*`. Toda a UI deriva delas.

### Convenção da pasta `ui/`

Precisa de botão/card/chip/tag/selo/dropdown/busca? **Use `components/ui/`** — nunca recrie inline. Variante nova (ex.: botão "perigo")? **Adicione a variante no componente da `ui/`**, não um estilo solto na tela.

---

## Responsividade

- **Mobile-first** com prefixos Tailwind (`sm:` ≥ 640px).
- Menu lateral: oculto no mobile (`hidden lg:flex`).
- Barra superior: selos somem no mobile, switch sempre visível.
- Filtros: scroll horizontal no mobile.
- Tabela de itens: **cards empilhados** no mobile, tabela tradicional no desktop (mesmo dado, dois formatos).
- Linha do tempo: eixo de anos com scroll horizontal; painel da fase empilha.

---

## Decisões técnicas

- **`"use client"`** em todo componente com hooks/store/eventos.
- **Componentes auxiliares fora do componente pai** (ex.: `BotaoDeCamada`) — declarar dentro causa "Cannot create components during render".
- **`key` na troca de camada** (`page.jsx`) força remontar a view e reinicia animações.
- **Rotas memoizadas** na `TabelaDeItens` (`useMemo`) — sem isso o `useApi` rebusca a cada render.
- **Seleção por `chave`** do item, não por índice (índice quebra ao rebuscar a lista).
- **`CampoDeBusca` com debounce + ref** — `aoBuscar` fora das dependências do efeito, senão re-renderiza em loop e limpa a seleção.
- **CSS no Tailwind v4:** `@import "tailwindcss"` deve ser a 1ª regra; fontes via `next/font`, nunca `@import url(...)` após outras regras.

---

## Variáveis de ambiente

`.env.local` (não versionado):
```bash
NEXT_PUBLIC_API_URL=/api
```
Quando o Express subir:
```bash
NEXT_PUBLIC_API_URL=https://sua-api.com/api
```
Versione um `.env.example` com o mesmo conteúdo (sem segredos).

---

## Roteiro de manutenção

| Tarefa | Onde |
|---|---|
| Trocar paleta da marca | 4 variáveis `--brand*` em `globals.css` |
| Novo KPI / exceção / item | objeto novo em `_dadosMock.js` |
| Ativar filtro "Em breve" | remover `emBreve`/desativado em `BarraDeFiltros.jsx` |
| Novo item de menu | `MENU_DECISORIA` / `MENU_OPERACIONAL` em `MenuLateral.jsx` |
| Plugar API real | trocar `NEXT_PUBLIC_API_URL` |
| Nova aba/camada | pasta em `components/`, registrar em `SeletorDeCamada` e no ternário do `page.jsx` |

---

## Evolução futura (recomendado, em breve)

1. **TypeScript** — tipagem dos dados da API; pega erros em build, não em runtime.
2. **TanStack Query (React Query)** no lugar do `useApi` caseiro — cache, revalidação, retry, dedupe.
3. **Testes** — Vitest + React Testing Library para os componentes de UI e o store.
4. **Paginação** na rota de itens (`?pagina=&porPagina=`) quando vierem os dados reais (842+ itens).
5. **Autenticação** — o lugar do token já está marcado em `clienteHttp.js`.

---

## Glossário fiscal

- **EC 132/2023** · **LC 214/2025** — Emenda e Lei da Reforma
- **CBS** — Contribuição sobre Bens e Serviços (substitui PIS/COFINS)
- **IBS** — Imposto sobre Bens e Serviços (substitui ICMS/ISS)
- **IVA Dual** — modelo CBS + IBS · **Imposto Seletivo** — sobre bens nocivos
- **NCM** — classificação de mercadorias · **CST** — Código de Situação Tributária
- **cClassTrib** — Código de Classificação Tributária (novo) · **CRT** — Regime Tributário (Simples)
```
