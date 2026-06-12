/**
 * Dados de demonstração servidos pelas rotas fake.
 * Este arquivo simula o que virá das queries na AWS via API Node/Express.
 * IMPORTANTE: as cores aqui são SEMÂNTICAS (ver utils/apresentacao.js) —
 * o backend real deve devolver exatamente estes formatos.
 */

/** Simula a latência da rede (deixa os skeletons visíveis em dev). */
export const simularLatencia = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const RESUMO_DECISORIA = {
  impactoLiquidoMilhoes: 10.73,
  crescimentoPercentualFormatado: "71,7%",
  alertaOperacoes: "43% das operações ficam desfavoráveis",
  deltaFormatado: "+R$ 10.725.309,04",
  barrasComparativas: [
    { rotulo: "Carga atual (IPI·PIS·COFINS·ICMS)", valorFormatado: "R$ 14,96M", larguraPercentual: 58,  cor: "positivo" },
    { rotulo: "Carga reforma (CBS·IBS·Seletivo)",  valorFormatado: "R$ 25,69M", larguraPercentual: 100, cor: "alerta" },
  ],
};

export const INDICADORES_DECISORIA = [
  { chave: "favorabilidade",    titulo: "Favorabilidade",      valor: "57",   unidade: "%", destaque: "284 favoráveis",  corDoDestaque: "positivo", complemento: "· 216 desfav.", cor: "positivo",   pontosDoGrafico: "0,30 25,24 50,26 75,14 100,8" },
  { chave: "impostoSeletivo",   titulo: "Imposto Seletivo",    valor: "6,65", unidade: "M", destaque: "NCM 24021000",    corDoDestaque: "negativo", complemento: "100% ·",        cor: "alerta",     pontosDoGrafico: "0,36 30,32 60,22 100,6", complementoAntes: true },
  { chave: "creditoRecuperavel",titulo: "Crédito recuperável", valor: "4,70", unidade: "M", destaque: "+88,6%",          corDoDestaque: "positivo", complemento: "vs atual",      cor: "info",       pontosDoGrafico: "0,34 30,28 60,20 100,9" },
  { chave: "receitaLiquida",    titulo: "Receita líq. reforma",valor: "47,7", unidade: "M", destaque: "+7,4%",           corDoDestaque: "positivo", complemento: "vs atual",      cor: "secundario", pontosDoGrafico: "0,28 30,26 60,22 100,16" },
];

export const LINHA_DO_TEMPO = {
  anos: [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033],
  cargaRegimeAtual:   [14.96, 14.96, 14.96, 14.96, 14.96, 14.96, 14.96, 14.96],
  cargaRegimeReforma: [15.1, 17.8, 19.2, 20.9, 22.4, 23.8, 24.9, 25.69],
  fases: {
    2026: { titulo: "Ano-teste",              descricao: "CBS a 0,9% e IBS a 0,1% para validação. Momento de calibrar cadastros (NCM, CST, cClassTrib)." },
    2027: { titulo: "CBS integral + Seletivo", descricao: "Extinção de PIS/COFINS. CBS com alíquota cheia e início do Imposto Seletivo. Primeiro salto de carga." },
    2028: { titulo: "Estabilização CBS",       descricao: "CBS consolidada; IBS ainda inicial. ICMS/ISS quase integrais." },
    2029: { titulo: "Início transição IBS",    descricao: "IBS a 10% e ICMS/ISS a 90%. Começa a substituição efetiva dos tributos estaduais e municipais." },
    2030: { titulo: "Transição 20/80",         descricao: "IBS 20%. Crédito financeiro amplo em vigor — revisar aproveitamento de insumos." },
    2031: { titulo: "Transição 30/70",         descricao: "IBS 30%. Cenários de precificação ganham peso." },
    2032: { titulo: "Transição 40/60",         descricao: "Último ano antes da virada. Janela final para ajustes contratuais e de portfólio." },
    2033: { titulo: "IVA Dual pleno",          descricao: "Fim de ICMS e ISS. IBS e CBS integrais. Carga projetada de R$ 25,69M." },
  },
};

export const COMPOSICAO_E_FAVORABILIDADE = {
  composicaoTributaria: [
    { tributo: "ICMS → IBS",       valorAtual: 6.74, valorReforma: 12.58, corAtual: "positivo", corReforma: "alerta" },
    { tributo: "COFINS → CBS",     valorAtual: 4.41, valorReforma: 6.46,  corAtual: "positivo", corReforma: "alerta" },
    { tributo: "IPI",              valorAtual: 2.86, valorReforma: 0,     corAtual: "positivo", corReforma: "apagado" },
    { tributo: "PIS",              valorAtual: 0.96, valorReforma: 0,     corAtual: "positivo", corReforma: "apagado" },
    { tributo: "Imposto Seletivo", valorAtual: 0,    valorReforma: 6.65,  corAtual: "apagado",  corReforma: "negativo" },
  ],
  favorabilidade: { totalOperacoes: 500, favoraveis: 284, desfavoraveis: 216 },
};

export const INSIGHTS_ESTRATEGICOS = [
  { tipo: "risco",          etiqueta: "Risco prioritário", titulo: "R$ 6,65M de Seletivo num único NCM", descricao: "Toda a exposição ao Seletivo está no NCM 24021000. Reenquadrar ou revisar essa linha é a maior alavanca da carteira.", textoDaAcao: "Simular reenquadramento", acao: "simular" },
  { tipo: "oportunidade",   etiqueta: "Oportunidade",      titulo: "Crédito fiscal cresce 88%",          descricao: "Aluguéis e energia geram R$ 4,70M de crédito recuperável na reforma, contra R$ 2,49M hoje. Mapear contratos antecipa o caixa.", textoDaAcao: "Ver natureza de crédito", acao: "verCredito" },
  { tipo: "confiabilidade", etiqueta: "Confiabilidade",    titulo: "842 NCM ainda sem cClassTrib",       descricao: "A projeção de +R$10,73M depende desse mapeamento. Há divergências abertas na camada operacional que afetam o número.", textoDaAcao: "Resolver na operação", acao: "irParaOperacional" },
];

export const INDICADORES_OPERACIONAIS = [
  { chave: "conciliados",   titulo: "Itens conciliados",           valorFormatado: "98,7", sufixo: "%", corDoPonto: "positivo", descricao: "1.463.118 de 1.482.301" },
  { chave: "divergencias",  titulo: "Divergências abertas",        valorFormatado: "2.628",             corDoPonto: "negativo", corDoValor: "negativo", descricao: "842 bloqueiam projeção IBS/CBS", critico: true },
  { chave: "creditoRisco",  titulo: "Crédito em risco",            valorFormatado: "R$ 612k",           corDoPonto: "alerta",   corDoValor: "alerta",   descricao: "não aproveitado em 318 itens" },
  { chave: "pendencias",    titulo: "Pendências de classificação", valorFormatado: "1.347",             corDoPonto: "info",     descricao: "NCM / cClassTrib / CST" },
];

export const FILA_DE_EXCECOES = [
  { id: 0, titulo: "NCM sem cClassTrib mapeado",          severidade: "alta",  quantidadeItens: 842, impactoFinanceiro: "R$ 6,65M", motivoBloqueio: "Bloqueia projeção IBS/CBS" },
  { id: 1, titulo: "CST divergente XML × cadastro",       severidade: "alta",  quantidadeItens: 631, impactoFinanceiro: "R$ 1,12M", motivoBloqueio: "Distorce tributação reforma" },
  { id: 2, titulo: "Crédito ICMS não aproveitado",        severidade: "media", quantidadeItens: 318, impactoFinanceiro: "R$ 214k",  motivoBloqueio: null },
  { id: 3, titulo: "Seletivo — NCM 24021000 s/ alíquota", severidade: "alta",  quantidadeItens: 96,  impactoFinanceiro: "R$ 6,65M", motivoBloqueio: "Exposição não confirmada" },
  { id: 4, titulo: "Alíquota efetiva fora da faixa",      severidade: "media", quantidadeItens: 487, impactoFinanceiro: "R$ 388k",  motivoBloqueio: null },
  { id: 5, titulo: "Fornecedor Simples sem flag CRT",     severidade: "media", quantidadeItens: 154, impactoFinanceiro: "R$ 96k",   motivoBloqueio: null },
  { id: 6, titulo: "Documento não conciliado (s/ chave)", severidade: "baixa", quantidadeItens: 203, impactoFinanceiro: "—",        motivoBloqueio: null },
];

// Empresas (CNPJs) do grupo — alimenta o filtro de CNPJ
export const EMPRESAS_DO_GRUPO = [
  { cnpj: "18.777.198/0001-80", nome: "Fórmula Matriz" },
  { cnpj: "18.777.198/0002-61", nome: "Fórmula Curitiba" },
  { cnpj: "18.777.198/0003-42", nome: "Fórmula Litoral" },
  { cnpj: "18.777.198/0004-23", nome: "Fórmula Norte" },
];

// Tipos de documento fiscal disponíveis no filtro
export const TIPOS_DE_DOCUMENTO = ["NF-e", "CT-e"];

// Itens da tabela — agora com tipoDocumento e cnpjDaEmpresa para os filtros
export const ITENS_DA_TABELA = [
  { chave: "3175…1000", data: "07/05/26", participante: "Bari Imports Veículos", ncm: "87033210", cst: "00", classTrib: null, valorOperacao: "148.900,00", tributoAtual: "17.868,00", tributoReforma: "31.806,00", status: "aberto", tipoDocumento: "NF-e", cnpjDaEmpresa: "18.777.198/0001-80" },
  { chave: "3175…1037", data: "07/05/26", participante: "Barigui Veículos",      ncm: "87042310", cst: "00", classTrib: null, valorOperacao: "92.400,00",  tributoAtual: "11.088,00", tributoReforma: "19.778,40", status: "aberto", tipoDocumento: "NF-e", cnpjDaEmpresa: "18.777.198/0002-61" },
  { chave: "3175…1074", data: "07/05/26", participante: "BYD do Brasil",         ncm: "87038000", cst: "10", classTrib: null, valorOperacao: "210.500,00", tributoAtual: "25.260,00", tributoReforma: "45.047,00", status: "aberto", tipoDocumento: "NF-e", cnpjDaEmpresa: "18.777.198/0001-80" },
  { chave: "3175…1111", data: "07/05/26", participante: "Omoda & Jaecoo",        ncm: "87033290", cst: "00", classTrib: null, valorOperacao: "77.300,00",  tributoAtual: "9.276,00",  tributoReforma: "16.542,20", status: "aberto", tipoDocumento: "CT-e", cnpjDaEmpresa: "18.777.198/0003-42" },
  { chave: "3175…1148", data: "07/05/26", participante: "Bari Veículos",         ncm: "87112090", cst: "00", classTrib: null, valorOperacao: "43.800,00",  tributoAtual: "5.256,00",  tributoReforma: "9.373,20",  status: "aberto", tipoDocumento: "NF-e", cnpjDaEmpresa: "18.777.198/0002-61" },
  { chave: "3175…1185", data: "07/05/26", participante: "Barigui Oriente",       ncm: "87042290", cst: "00", classTrib: null, valorOperacao: "61.200,00",  tributoAtual: "7.344,00",  tributoReforma: "13.096,80", status: "aberto", tipoDocumento: "CT-e", cnpjDaEmpresa: "18.777.198/0004-23" },
  { chave: "3175…1222", data: "07/05/26", participante: "Center Automóveis",     ncm: "87033210", cst: "00", classTrib: null, valorOperacao: "129.000,00", tributoAtual: "15.480,00", tributoReforma: "27.606,00", status: "aberto", tipoDocumento: "NF-e", cnpjDaEmpresa: "18.777.198/0003-42" },
  { chave: "3175…1259", data: "07/05/26", participante: "Autobarigui",           ncm: "87042310", cst: "10", classTrib: null, valorOperacao: "54.700,00",  tributoAtual: "6.564,00",  tributoReforma: "11.705,80", status: "aberto", tipoDocumento: "NF-e", cnpjDaEmpresa: "18.777.198/0001-80" },
];