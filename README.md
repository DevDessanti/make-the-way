# Make the Way · Frontend

Plataforma de **Inteligência da Reforma Tributária** (EC 132/2023 · LC 214/2025).
Next.js (App Router) + Zustand + Tailwind + Recharts. Duas camadas para dois
públicos: **Decisória** (CFO/conselho) e **Operacional** (analista fiscal).

> **Como liga no backend:** todo dado passa por um cliente HTTP único
> (`services/clienteHttp.js`). Trocar a API fake pela real é mudar **uma**
> variável: `NEXT_PUBLIC_API_URL`. Nenhum componente muda.

---

## Como rodar

```bash
npm install
# .env.local:
#   modo mock (Route Handlers do próprio Next):   NEXT_PUBLIC_API_URL=/api
#   modo API real (Flask local):                  NEXT_PUBLIC_API_URL=http://localhost:8000/api
npm run dev      # http://localhost:3000
```

Ao trocar o `.env.local`, **reinicie o `npm run dev`** (o Next inlina as
variáveis `NEXT_PUBLIC_` no boot).

---

## Estado atual da integração com o backend

O backend é uma **API Flask** (repo `backend-makeway-flask`) que lê a tabela
real `nota_avulsa.CalculoXMLGeral` no **AWS RDS**. Hoje, com a API real ligada:

**Vem do banco (real):**
- Linha do tempo da transição (`/decisoria/linha-do-tempo`)
- Favorabilidade — o card KPI e o anel (`/decisoria/indicadores`, `/decisoria/composicao`)
- Tabela operacional, com paginação e filtros (`/operacional/excecoes/:id/itens`)
- Opções de filtro de CNPJ e tipo de documento (`/operacional/empresas`)

**Ainda placeholder (estático no backend, fora de escopo por ora):**
- Hero de impacto, os outros 3 KPIs da decisória, composição por tributo, insights
- KPIs do operacional e a fila de exceções

Em modo `NEXT_PUBLIC_API_URL=/api`, tudo vem dos Route Handlers do Next (mock).

---

## Fluxo de dados

```
Componente  →  useApi("/rota")  →  clienteHttp  →  ${NEXT_PUBLIC_API_URL}/rota
                                                          │
                       /api            → Route Handlers do Next (mock, _dadosMock.js)
                       http://…:8000/api → API Flask → AWS RDS
```

- `hooks/useApi.js` — devolve `{ dados, carregando, erro }`; descarta resposta
  obsoleta (flag `ativo`) para evitar corrida quando a rota muda.
- `services/clienteHttp.js` — cliente único; ponto de troca mock→real e onde o
  **token de autenticação** entrará (slot já marcado).

### Estado global (Zustand) — `store/useAppStore.js`

| Estado | Escreve | Lê |
|---|---|---|
| `camadaAtiva` | SeletorDeCamada, InsightsEstrategicos | page, MenuLateral |
| `anoSelecionado` | LinhaDoTempo | LinhaDoTempo |
| `excecaoSelecionada` | FilaDeExcecoes | TabelaDeItens |
| `chavesSelecionadas` | TabelaDeItens | TabelaDeItens (barra de lote) |
| `filtros` (busca, tipoDocumento, cnpj) | BarraDeFiltros, CampoDeBusca | TabelaDeItens |

**Padrão obrigatório:** selecionar fatias do store, nunca o objeto inteiro
(`useAppStore((s) => s.camadaAtiva)`), senão re-renderiza em qualquer mudança.

---

## Contrato de rotas (implementado no backend Flask)

| Método | Rota | Fonte hoje |
|---|---|---|
| GET | `/decisoria/resumo` | estático |
| GET | `/decisoria/indicadores` | KPI de favorabilidade REAL; os outros 3 estáticos |
| GET | `/decisoria/linha-do-tempo` | **REAL** (RDS) |
| GET | `/decisoria/composicao` | favorabilidade REAL; composição por tributo estática |
| GET | `/decisoria/insights` | estático |
| GET | `/operacional/indicadores` | estático |
| GET | `/operacional/empresas` | **REAL** (distinct do RDS) |
| GET | `/operacional/excecoes` | estático |
| GET | `/operacional/excecoes/:id/itens?busca=&tipoDocumento=&cnpj=&pagina=&porPagina=` | **REAL** (RDS, paginado) |

As cores vêm **semânticas** (`"positivo"`, `"alerta"`...) — o front é quem
traduz para o tema. O backend nunca conhece hex.

### Paginação (tabela operacional)

A `TabelaDeItens` envia `pagina` e `porPagina` (padrão **20**; opções 20/50/100/200,
teto 200 na API) e lê `total` / `totalPaginas` da resposta. Trocar exceção ou
filtro volta para a página 1.

---

## Estrutura de pastas

```
src/
├── app/
│   ├── globals.css              # tokens de design + utilitários + skeletons
│   ├── layout.jsx · page.jsx    # raiz e montagem da camada ativa
│   └── api/                     # API FAKE (Route Handlers) — usada quando NEXT_PUBLIC_API_URL=/api
│       ├── _dadosMock.js
│       ├── decisoria/{resumo,indicadores,linha-do-tempo,composicao,insights}/route.js
│       └── operacional/{indicadores,empresas,excecoes,excecoes/[id]/itens}/route.js
├── store/useAppStore.js         # estado global (Zustand)
├── hooks/useApi.js              # busca com loading/erro
├── services/clienteHttp.js      # cliente HTTP único (ponto de troca mock→API real)
├── utils/apresentacao.js        # formatarMilhoes + mapa de cores semânticas
└── components/
    ├── ui/        # Botao, Card, Chip, Etiqueta, Selo, SeletorSuspenso, CampoDeBusca
    ├── common/    # Icone, RevelarAoRolar, CaixaDeSelecao, TituloDeSecao, Esqueletos
    ├── layout/    # MenuLateral, BarraSuperior, SeletorDeCamada
    ├── decisoria/ # HeroImpacto, CardsIndicadores, LinhaDoTempo, ComposicaoEFavorabilidade, InsightsEstrategicos
    └── operacional/ # BarraDeFiltros, FilaDeExcecoes, IndicadoresOperacionais, TabelaDeItens
```

---

## Design system — `globals.css`

| Grupo | Variáveis |
|---|---|
| Marca | `--brand`, `--brand-2`, `--brand-deep`, `--brand-tint` |
| Neutros | `--ink*`, `--surface*`, `--hair*`, `--text*`, `--muted` |
| Semânticos | `--pos`, `--warn`, `--neg`, `--info` (+ `-d`) |
| Fontes | `--serif`, `--sans`, `--mono` (next/font) |

Trocar a paleta = editar as 4 variáveis `--brand*`. Precisa de botão/card/chip/
tag/dropdown/busca? Use `components/ui/` — não recrie inline.

Responsividade mobile-first (`sm:` ≥ 640px): menu some no mobile, filtros com
scroll horizontal, e a tabela vira **cards empilhados** no mobile.

---

## Decisões técnicas

- `"use client"` em todo componente com hooks/store/eventos.
- Componentes auxiliares **fora** do componente pai (evita "Cannot create components during render").
- `key` na troca de camada (`page.jsx`) força remontar a view e reiniciar animações.
- Rota memoizada (`useMemo`) na `TabelaDeItens` — sem isso o `useApi` rebusca a cada render.
- **Identidade da linha = `item.id`** (uuid), não a `chave` — a chave da NF-e
  se repete entre itens da mesma nota; a chave só é exibida (truncada).
- Reset de página **sem `useEffect`**: ajuste de estado durante a renderização
  comparando a "assinatura" dos filtros (padrão recomendado pelo React).
- `CampoDeBusca` com debounce + ref para não re-renderizar em loop.

---

## Variáveis de ambiente

`.env.local` (não versionado):
```bash
# dev local com a API Flask:
NEXT_PUBLIC_API_URL=http://localhost:8000/api
# produção:
# NEXT_PUBLIC_API_URL=https://api.suaempresa.com/api
```

---

## Evolução futura

1. **TypeScript** — tipar os dados da API (erros em build, não em runtime).
2. **TanStack Query** no lugar do `useApi` caseiro — cache, revalidação, retry, dedupe.
3. **Testes** — Vitest + React Testing Library (UI e store).
4. **Autenticação** — token no `clienteHttp.js` (slot já marcado).
5. **Ligar as áreas estáticas** ao backend conforme entrarem em escopo.

---

## Glossário fiscal

EC 132/2023 · LC 214/2025 — Emenda e Lei da Reforma · **CBS** (substitui PIS/COFINS) ·
**IBS** (substitui ICMS/ISS) · **IVA Dual** (CBS+IBS) · **Imposto Seletivo** ·
**NCM** · **CST** · **cClassTrib** · **CRT** (Simples).
