"use client";
import { useAppStore } from "@/store/useAppStore";
import RevelarAoRolar from "@/components/common/RevelarAoRolar";
import Card from "@/components/ui/Card";

// Estilo do ponto colorido conforme a severidade da exceção
const ESTILO_POR_SEVERIDADE = {
  alta:  { background: "var(--neg)", boxShadow: "0 0 8px var(--neg)" },
  media: { background: "var(--warn)" },
  baixa: { background: "var(--info)" },
};

/** Lista de exceções à esquerda; clicar seleciona e atualiza a tabela. */
export default function FilaDeExcecoes({ excecoes }) {
  const excecaoSelecionada = useAppStore((s) => s.excecaoSelecionada);
  const selecionarExcecao = useAppStore((s) => s.selecionarExcecao);

  return (
    <RevelarAoRolar>
      <div className="flex flex-col">
        <div className="texto-apagado uppercase px-1 pb-2" style={{ fontSize: 11, letterSpacing: ".12em" }}>
          Fila de exceções · ordenada por impacto
        </div>

        {/* Lista rolável (mantém a coluna alinhada à altura da tabela) */}
        <div className="flex flex-col gap-2 overflow-y-auto pr-1" style={{ maxHeight: 620 }}>
          {excecoes.map((excecao) => {
            const estaSelecionada = excecao.id === excecaoSelecionada;
            return (
              <Card
                key={excecao.id}
                selecionado={estaSelecionada}
                onClick={() => selecionarExcecao(excecao.id)}
                className={`cursor-pointer transition ${estaSelecionada ? "excecao-ativa" : ""}`}
                style={{ padding: "14px 15px", flex: "0 0 auto" }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="rounded-full" style={{ width: 8, height: 8, flex: "0 0 auto", ...ESTILO_POR_SEVERIDADE[excecao.severidade] }} />
                  <b className="flex-1" style={{ fontSize: 13, fontWeight: 600 }}>{excecao.titulo}</b>
                  <span className="fonte-mono" style={{ fontSize: 13 }}>{excecao.quantidadeItens}</span>
                </div>

                <div className="flex items-center gap-2 texto-apagado" style={{ fontSize: 11 }}>
                  impacto <span className="fonte-mono texto-negativo font-semibold">{excecao.impactoFinanceiro}</span>
                </div>

                {excecao.motivoBloqueio && (
                  <span className="inline-block mt-2" style={{ fontSize: 10, color: "var(--warn)", background: "var(--warn-d)", padding: "2px 7px", borderRadius: 6 }}>
                    ⚠ {excecao.motivoBloqueio}
                  </span>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </RevelarAoRolar>
  );
}