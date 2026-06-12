"use client";
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import { useAppStore } from "@/store/useAppStore";
import { useApi } from "@/hooks/useApi";
import RevelarAoRolar from "@/components/common/RevelarAoRolar";
import { EsqueletoGrafico } from "@/components/common/EsqueletoDeCarregamento";
import TituloDeSecao from "@/components/common/TituloDeSecao";
import Card from "@/components/ui/Card";
import { formatarMilhoes } from "@/utils/apresentacao";

function PontoDoAno({ cx, cy, payload, anoSelecionado, primeiroAno, ultimoAno }) {
  const estaSelecionado = payload.ano === anoSelecionado;
  if (!estaSelecionado) return <circle cx={cx} cy={cy} r={4} fill="var(--warn)" />;

  const ehUltimo = payload.ano === ultimoAno;
  const ehPrimeiro = payload.ano === primeiroAno;
  const ancoraDoTexto = ehUltimo ? "end" : ehPrimeiro ? "start" : "middle";
  const deslocamentoX = ehUltimo ? 8 : ehPrimeiro ? -8 : 0;

  return (
    <g>
      <text x={cx - deslocamentoX} y={cy - 14} fill="#fff" fontSize="13" fontFamily="var(--mono)" fontWeight="600" textAnchor={ancoraDoTexto}>
        R$ {formatarMilhoes(payload.regimeReforma)}M
      </text>
      <circle cx={cx} cy={cy} r={6.5} fill="#fff" stroke="var(--warn)" strokeWidth={3} />
    </g>
  );
}

function TooltipDoGrafico({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const regimeAtual = payload.find((serie) => serie.dataKey === "regimeAtual");
  const regimeReforma = payload.find((serie) => serie.dataKey === "regimeReforma");
  return (
    <div className="rounded-xl com-borda" style={{ background: "var(--ink-2)", padding: "10px 14px", fontSize: 12, boxShadow: "0 12px 30px rgba(0,0,0,.5)" }}>
      <b className="block fonte-mono mb-1" style={{ fontSize: 13 }}>{label}</b>
      {regimeAtual && <div className="texto-secundario">Atual: <b className="fonte-mono texto-positivo">R$ {formatarMilhoes(regimeAtual.value)}M</b></div>}
      {regimeReforma && <div className="texto-secundario">Reforma: <b className="fonte-mono texto-alerta">R$ {formatarMilhoes(regimeReforma.value)}M</b></div>}
    </div>
  );
}

export default function LinhaDoTempo() {
  const anoSelecionado = useAppStore((estado) => estado.anoSelecionado);
  const selecionarAno = useAppStore((estado) => estado.selecionarAno);
  const { dados, carregando } = useApi("/decisoria/linha-do-tempo");

  if (carregando) {
    return (
      <div>
        <TituloDeSecao titulo="Linha do tempo da transição" dica="selecione o ano-base" />
        <EsqueletoGrafico />
      </div>
    );
  }
  if (!dados) return null;

  const { anos, cargaRegimeAtual, cargaRegimeReforma, fases } = dados;
  const dadosDoGrafico = anos.map((ano, indice) => ({
    ano,
    regimeAtual: cargaRegimeAtual[indice],
    regimeReforma: cargaRegimeReforma[indice],
  }));

  const primeiroAno = anos[0];
  const ultimoAno = anos[anos.length - 1];
  const indiceDoAno = anos.indexOf(anoSelecionado);
  const diferencaVsAtual = cargaRegimeReforma[indiceDoAno] - cargaRegimeAtual[0];
  const fase = fases[anoSelecionado];

  return (
    <div>
      <TituloDeSecao titulo="Linha do tempo da transição" dica="selecione o ano-base" />
      <RevelarAoRolar>
        <Card className="p-4 sm:p-6">
          <div className="flex flex-wrap gap-x-5 gap-y-1 mb-2 texto-secundario" style={{ fontSize: 12 }}>
            <i className="inline-flex items-center gap-1.5 not-italic"><span className="inline-block rounded" style={{ width: 9, height: 9, background: "var(--pos)" }} />Atual (congelada)</i>
            <i className="inline-flex items-center gap-1.5 not-italic"><span className="inline-block rounded" style={{ width: 9, height: 9, background: "var(--warn)" }} />Reforma — projetada</i>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={dadosDoGrafico} margin={{ top: 32, right: 40, bottom: 0, left: 16 }} onClick={(evento) => evento?.activeLabel && selecionarAno(evento.activeLabel)}>
              <defs>
                <linearGradient id="gradienteReforma" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(243,177,60,.28)" />
                  <stop offset="1" stopColor="rgba(243,177,60,0)" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,.05)" vertical={false} />
              <XAxis dataKey="ano" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12, fontFamily: "var(--mono)" }} />
              <YAxis hide domain={[14, 27]} />
              <Tooltip content={<TooltipDoGrafico />} cursor={{ stroke: "var(--warn)", strokeOpacity: 0.3 }} />
              <ReferenceLine x={anoSelecionado} stroke="var(--warn)" strokeOpacity={0.4} />
              <Area type="monotone" dataKey="regimeReforma" stroke="none" fill="url(#gradienteReforma)" />
              <Line type="monotone" dataKey="regimeAtual" stroke="var(--pos)" strokeWidth={2.2} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="regimeReforma" stroke="var(--warn)" strokeWidth={3}
                dot={<PontoDoAno anoSelecionado={anoSelecionado} primeiroAno={primeiroAno} ultimoAno={ultimoAno} />}
                activeDot={{ r: 6, fill: "#fff", stroke: "var(--warn)", strokeWidth: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>

          {/* Eixo de anos: rola na horizontal no mobile, com largura mínima por item */}
          <div className="overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            <div className="grid grid-cols-8 mt-1" style={{ minWidth: 520 }}>
              {anos.map((ano) => {
                const estaSelecionado = ano === anoSelecionado;
                return (
                  <div
                    key={ano}
                    onClick={() => selecionarAno(ano)}
                    className="text-center cursor-pointer rounded-xl transition"
                    style={{
                      padding: "7px 2px",
                      background: estaSelecionado ? "var(--warn-d)" : undefined,
                      border: `1px solid ${estaSelecionado ? "rgba(243,177,60,.3)" : "transparent"}`,
                    }}
                  >
                    <b className="block fonte-mono" style={{ fontSize: 13 }}>{ano}</b>
                    <span className="texto-apagado" style={{ fontSize: 10 }}>
                      {ano === primeiroAno ? "teste" : ano === ultimoAno ? "pleno" : "transição"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Painel da fase: empilha no mobile, lado a lado no desktop */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 mt-4 rounded-xl com-borda" style={{ padding: "15px 18px", background: "var(--ink-2)" }}>
            <div className="fonte-serif texto-alerta" style={{ fontSize: 29, fontWeight: 500, lineHeight: 1 }}>{anoSelecionado}</div>
            <div className="flex-1">
              <b style={{ fontSize: 14 }}>{fase.titulo}</b>
              <p className="texto-secundario mt-1" style={{ fontSize: "12.5px" }}>{fase.descricao}</p>
            </div>
            <div className="flex gap-6 text-left sm:text-right">
              <div>
                <span className="block texto-apagado uppercase" style={{ fontSize: "9.5px", letterSpacing: ".08em" }}>Carga proj.</span>
                <b className="fonte-mono texto-alerta" style={{ fontSize: 15 }}>R$ {formatarMilhoes(cargaRegimeReforma[indiceDoAno])}M</b>
              </div>
              <div>
                <span className="block texto-apagado uppercase" style={{ fontSize: "9.5px", letterSpacing: ".08em" }}>Δ vs atual</span>
                <b className="fonte-mono" style={{ fontSize: 15, color: diferencaVsAtual >= 0 ? "var(--neg)" : "var(--pos)" }}>
                  {diferencaVsAtual >= 0 ? "+" : ""}{formatarMilhoes(diferencaVsAtual)}M
                </b>
              </div>
            </div>
          </div>
        </Card>
      </RevelarAoRolar>
    </div>
  );
}