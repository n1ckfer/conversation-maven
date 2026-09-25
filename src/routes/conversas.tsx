import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { detectaDate, estilosIA, matches, type Message } from "@/lib/mock-data";

type Search = { id?: string };

export const Route = createFileRoute("/conversas")({
  validateSearch: (search: Record<string, unknown>): Search =>
    typeof search['id'] === "string" ? { id: search['id'] } : {},
  head: () => ({
    meta: [
      { title: "Conversas — Amora" },
      { name: "description", content: "Chat com histórico, memória da conversa e sugestões de resposta da IA." },
      { property: "og:title", content: "Conversas — Amora" },
      { property: "og:description", content: "Chat com histórico, memória da conversa e sugestões de resposta da IA." },
    ],
  }),
  component: ConversasPage,
});

function ConversasPage() {
  const { id } = Route.useSearch();
  const ativo = matches.find((m) => m.id === id) ?? matches[0]!;

  const [mensagens, setMensagens] = useState<Message[]>(ativo.mensagens);
  const [rascunho, setRascunho] = useState("");
  const [sugestao, setSugestao] = useState(ativo.sugestaoIA);
  const [estilo, setEstilo] = useState<string>(estilosIA[0]);
  const [gerando, setGerando] = useState(false);

  useEffect(() => {
    setMensagens(ativo.mensagens);
    setSugestao(ativo.sugestaoIA);
    setRascunho("");
  }, [ativo]);

  const enviar = (texto: string) => {
    if (!texto.trim()) return;
    setMensagens((m) => [
      ...m,
      { id: String(m.length + 1), author: "me", text: texto.trim(), time: "agora" },
    ]);
    setRascunho("");
  };

  const regenerar = () => {
    setGerando(true);
    window.setTimeout(() => {
      setSugestao(
        `${ativo.sugestaoIA} (${estilo.toLowerCase()})`.replace(" (natural)", ""),
      );
      setGerando(false);
    }, 700);
  };

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-[260px_1fr_300px]">
        {/* Lista de conversas */}
        <aside className="space-y-2 lg:max-h-[70vh] lg:overflow-y-auto">
          {matches.map((m) => (
            <Link
              key={m.id}
              to="/conversas"
              search={{ id: m.id }}
              className={`flex items-center gap-2.5 rounded-xl border p-2.5 transition-colors ${
                m.id === ativo.id ? "border-foreground bg-secondary" : "border-border hover:bg-secondary"
              }`}
            >
              <img
                src={m.foto}
                alt={m.nome}
                loading="lazy"
                width={816}
                height={816}
                className="size-9 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-semibold">
                  {m.nome}, {m.idade}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">{m.ultimaMensagem}</p>
              </div>
              {m.analise.possivelDate && <span className="size-1.5 shrink-0 rounded-full bg-flame" />}
            </Link>
          ))}
        </aside>

        {/* Chat */}
        <section className="rounded-2xl border border-border">
          <div className="flex items-center gap-3 border-b border-border p-3">
            <img
              src={ativo.foto}
              alt={ativo.nome}
              loading="lazy"
              width={816}
              height={816}
              className="size-9 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="font-display text-[14px] font-bold">
                {ativo.nome}, {ativo.idade}
              </p>
              <p className="text-[10px] text-muted-foreground">{ativo.plataforma}</p>
            </div>
            <StatusBadge status={ativo.status} />
          </div>

          <div className="space-y-2 p-3.5">
            {mensagens.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-[13px] ${
                  msg.author === "me"
                    ? "ml-auto rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md bg-secondary text-secondary-foreground"
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`mt-1 text-[9px] ${
                    msg.author === "me" ? "text-primary-foreground/50" : "text-muted-foreground"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            ))}
            {detectaDate(mensagens[mensagens.length - 1]?.text ?? "") && (
              <div className="rounded-xl border border-flame/30 bg-flame/10 px-3 py-2 text-[11px] font-semibold text-flame">
                Possível date detectado nesta conversa.{" "}
                <Link to="/dates" className="underline">
                  Agendar
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-border p-3.5">
            <div className="flex items-center justify-between">
              <p className="font-display text-[13px] font-bold">Sugestão da IA</p>
              <select
                value={estilo}
                onChange={(e) => setEstilo(e.target.value)}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold text-muted-foreground outline-none"
              >
                {estilosIA.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </select>
            </div>
            <textarea
              value={gerando ? "" : sugestao}
              onChange={(e) => setSugestao(e.target.value)}
              rows={2}
              className="mt-2 w-full resize-none rounded-xl border border-border bg-secondary px-3 py-2 text-[13px] leading-relaxed outline-none focus:border-foreground"
              placeholder={gerando ? "Gerando resposta..." : ""}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => enviar(sugestao)}
                className="h-9 rounded-full bg-primary px-4 text-[12px] font-semibold text-primary-foreground"
              >
                Aprovar e enviar
              </button>
              <button
                onClick={regenerar}
                className="h-9 rounded-full border border-border px-4 text-[12px] font-semibold text-muted-foreground"
              >
                Regenerar
              </button>
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={rascunho}
                onChange={(e) => setRascunho(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && enviar(rascunho)}
                placeholder="Escrever mensagem"
                className="h-10 flex-1 rounded-full border border-border bg-background px-4 text-[13px] outline-none focus:border-foreground"
              />
              <button
                onClick={() => enviar(rascunho)}
                className="h-10 rounded-full bg-primary px-4 text-[12px] font-semibold text-primary-foreground"
              >
                Enviar
              </button>
            </div>
          </div>
        </section>

        {/* Informações e análise */}
        <aside className="space-y-3">
          <div className="rounded-2xl border border-border p-4">
            <p className="font-display text-[13px] font-bold">Memória da conversa</p>
            <dl className="mt-2 space-y-1.5 text-[12px]">
              <Info label="Trabalho" value={ativo.memoria.trabalho} />
              <Info label="Cidade" value={ativo.memoria.cidade} />
              <Info label="Interesses" value={ativo.memoria.interesses.join(", ")} />
              <Info label="Assuntos" value={ativo.memoria.assuntos.join(", ")} />
              <Info label="Importante" value={ativo.memoria.importantes.join(" · ")} />
            </dl>
            <button className="mt-3 h-8 rounded-full border border-border px-3 text-[11px] font-semibold text-muted-foreground">
              Editar memória
            </button>
          </div>

          <div className="rounded-2xl border border-border p-4">
            <p className="font-display text-[13px] font-bold">Análise da IA</p>
            <dl className="mt-2 space-y-1.5 text-[12px]">
              <Info label="Interesse aparente" value={ativo.analise.interesse} />
              <Info label="Última interação" value={ativo.analise.ultimaInteracao} />
              <Info label="Próximo objetivo" value={ativo.analise.proximoObjetivo} />
              <Info label="Possível date" value={ativo.analise.possivelDate ? "Sim" : "Não"} />
              <Info
                label="Perguntas em aberto"
                value={ativo.analise.perguntasAbertas.join(" · ") || "Nenhuma"}
              />
            </dl>
            <p className="mt-2 text-[12px] leading-relaxed text-foreground/80">{ativo.analise.sugestao}</p>
            <p className="mt-2 text-[10px] text-muted-foreground">
              Isto é uma sugestão da IA, não uma certeza sobre o que a pessoa sente.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-28 shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 flex-1">{value}</dd>
    </div>
  );
}
