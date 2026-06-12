/**
 * Dados de demonstração da plataforma.
 * Valores monetários em R$ milhões, salvo indicação contrária.
 * Em produção, estes dados virão da API.
 */

// Anos da transição da Reforma Tributária (EC 132/2023 · LC 214/2025)
export const ANOS_DA_TRANSICAO = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];

// Carga tributária do regime atual, congelada como referência (por ano)
export const CARGA_REGIME_ATUAL = [14.96, 14.96, 14.96, 14.96, 14.96, 14.96, 14.96, 14.96];

// Carga projetada do novo regime (CBS + IBS + Imposto Seletivo), por ano
export const CARGA_REGIME_REFORMA = [15.1, 17.8, 19.2, 20.9, 22.4, 23.8, 24.9, 25.69];

// Descrição de cada fase da transição, indexada pelo ano
export const FASES_DA_TRANSICAO = {
  2026: { titulo: "Ano-teste", descricao: "CBS a 0,9% e IBS a 0,1% para validação. Momento de calibrar cadastros (NCM, CST, cClassTrib)." },
  2027: { titulo: "CBS integral + Seletivo", descricao: "Extinção de PIS/COFINS. CBS com alíquota cheia e início do Imposto Seletivo. Primeiro salto de carga." },
  2028: { titulo: "Estabilização CBS", descricao: "CBS consolidada; IBS ainda inicial. ICMS/ISS quase integrais." },
  2029: { titulo: "Início transição IBS", descricao: "IBS a 10% e ICMS/ISS a 90%. Começa a substituição efetiva dos tributos estaduais e municipais." },
  2030: { titulo: "Transição 20/80", descricao: "IBS 20%. Crédito financeiro amplo em vigor — revisar aproveitamento de insumos." },
  2031: { titulo: "Transição 30/70", descricao: "IBS 30%. Cenários de precificação ganham peso." },
  2032: { titulo: "Transição 40/60", descricao: "Último ano antes da virada. Janela final para ajustes contratuais e de portfólio." },
  2033: { titulo: "IVA Dual pleno", descricao: "Fim de ICMS e ISS. IBS e CBS integrais. Carga projetada de R$ 25,69M." },
};

// Composição da carga por tributo: comparação regime atual × reforma
export const COMPOSICAO_TRIBUTARIA = [
  { tributo: "ICMS → IBS",       valorAtual: 6.74, valorReforma: 12.58, corAtual: "var(--pos)",   corReforma: "var(--warn)" },
  { tributo: "COFINS → CBS",     valorAtual: 4.41, valorReforma: 6.46,  corAtual: "var(--pos)",   corReforma: "var(--warn)" },
  { tributo: "IPI",              valorAtual: 2.86, valorReforma: 0,     corAtual: "var(--pos)",   corReforma: "var(--muted)" },
  { tributo: "PIS",              valorAtual: 0.96, valorReforma: 0,     corAtual: "var(--pos)",   corReforma: "var(--muted)" },
  { tributo: "Imposto Seletivo", valorAtual: 0,    valorReforma: 6.65,  corAtual: "var(--muted)", corReforma: "var(--neg)" },
];

// Fila de exceções da camada operacional.
// severidade: "alta" | "media" | "baixa"
// motivoBloqueio: presente quando a exceção trava a projeção da camada decisória
export const FILA_DE_EXCECOES = [
  { id: 0, titulo: "NCM sem cClassTrib mapeado",           severidade: "alta",  quantidadeItens: 842, impactoFinanceiro: "R$ 6,65M", motivoBloqueio: "Bloqueia projeção IBS/CBS" },
  { id: 1, titulo: "CST divergente XML × cadastro",        severidade: "alta",  quantidadeItens: 631, impactoFinanceiro: "R$ 1,12M", motivoBloqueio: "Distorce tributação reforma" },
  { id: 2, titulo: "Crédito ICMS não aproveitado",         severidade: "media", quantidadeItens: 318, impactoFinanceiro: "R$ 214k",  motivoBloqueio: null },
  { id: 3, titulo: "Seletivo — NCM 24021000 s/ alíquota",  severidade: "alta",  quantidadeItens: 96,  impactoFinanceiro: "R$ 6,65M", motivoBloqueio: "Exposição não confirmada" },
  { id: 4, titulo: "Alíquota efetiva fora da faixa",       severidade: "media", quantidadeItens: 487, impactoFinanceiro: "R$ 388k",  motivoBloqueio: null },
  { id: 5, titulo: "Fornecedor Simples sem flag CRT",      severidade: "media", quantidadeItens: 154, impactoFinanceiro: "R$ 96k",   motivoBloqueio: null },
  { id: 6, titulo: "Documento não conciliado (s/ chave)",  severidade: "baixa", quantidadeItens: 203, impactoFinanceiro: "—",        motivoBloqueio: null },
];

// Itens exibidos na tabela de detalhes (valores em R$, formato brasileiro)
export const ITENS_DA_TABELA = [
  { participante: "Bari Imports Veículos", ncm: "87033210", cst: "00", valorOperacao: "148.900,00", tributoAtual: "17.868,00", tributoReforma: "31.806,00" },
  { participante: "Barigui Veículos",      ncm: "87042310", cst: "00", valorOperacao: "92.400,00",  tributoAtual: "11.088,00", tributoReforma: "19.778,40" },
  { participante: "BYD do Brasil",         ncm: "87038000", cst: "10", valorOperacao: "210.500,00", tributoAtual: "25.260,00", tributoReforma: "45.047,00" },
  { participante: "Omoda & Jaecoo",        ncm: "87033290", cst: "00", valorOperacao: "77.300,00",  tributoAtual: "9.276,00",  tributoReforma: "16.542,20" },
  { participante: "Bari Veículos",         ncm: "87112090", cst: "00", valorOperacao: "43.800,00",  tributoAtual: "5.256,00",  tributoReforma: "9.373,20" },
  { participante: "Barigui Oriente",       ncm: "87042290", cst: "00", valorOperacao: "61.200,00",  tributoAtual: "7.344,00",  tributoReforma: "13.096,80" },
  { participante: "Center Automóveis",     ncm: "87033210", cst: "00", valorOperacao: "129.000,00", tributoAtual: "15.480,00", tributoReforma: "27.606,00" },
  { participante: "Autobarigui",           ncm: "87042310", cst: "10", valorOperacao: "54.700,00",  tributoAtual: "6.564,00",  tributoReforma: "11.705,80" },
];

/** Formata um número como milhões no padrão brasileiro: 10.73 → "10,73" */
export const formatarMilhoes = (valor) => valor.toFixed(2).replace(".", ",");