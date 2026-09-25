import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { estilosIA, followUpOpcoes, matches, modosIA } from "@/lib/mock-data";

export const Route = createFileRoute("/ia")({
  head: () => ({
    meta: [
      { title: "IA — Amora" },
      { name: "description", content: "Estilos de resposta, modo de operação e fila de aprovação da IA." },
      { property: "og:title", content: "IA — Amora" },
      { property: "og:description", content: "Estilos de resposta, modo de operação e fila de aprovação da IA." },
    ],
  }),
  component: IAPage,
});

const criterios = [
  "Histórico da conversa",
  "Últimas mensagens",
  "Contexto",
  "Tom da pessoa",
  "Assuntos já discutidos",
  "Perguntas ainda não respondidas",
  "Informações já descobertas",
  "Possibilidade de encontro",
];

function IAPage() {
  const [modo, setModo] = useState<(typeof modosIA)[number]>("Aprovação");
  const [estilo, setEstilo] = useState<string>(estilosIA[0]);
  const fila = matches.filter((m) => m.aguardandoAprovacao);

  return (
    <AppShell>
      <h1 className="font-display text-[22px] font-bold tracking-tight">IA</h1>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Como a IA analisa as conversas e sugere respostas.
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-border p-4">
          <h2 className="font-display text-[16px] font-bold">Modo de operação</h2>
          <div className="mt-3 space-y-2">
            {modosIA.map((m) => (
              <button
                key={m}
                onClick={() => setModo(m)}
                className={`flex w-full items-center justify-between rounded-xl border p-3 text-left ${
                  modo === m ? "border-foreground bg-secondary" : "border-border"
                }`}
              >
                <span className="text-[13px] font-semibold">{m}</span>
                <span className="text-[11px] text-muted-foreground">
                  {m === "Manual"
                    ? "Você escreve tudo"
                    : m === "Aprovação"
                      ? "IA sugere, você aprova"
                      : "Só com integração que permita"}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            O modo automático só funciona quando habilitado e permitido pela integração utilizada.
          </p>
        </section>

        <section className="rounded-2xl border border-border p-4">
          <h2 className="font-display text-[16px] font-bold">Estilo de resposta</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {estilosIA.map((e) => (
              <button
                key={e}
                onClick={() => setEstilo(e)}
                className={`h-9 rounded-full px-4 text-[12px] font-semibold ${
                  estilo === e
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
          <h3 className="mt-5 font-display text-[13px] font-bold">O que a IA considera</h3>
          <ul className="mt-2 grid gap-1 text-[12px] text-muted-foreground sm:grid-cols-2">
            {criterios.map((c) => (
              <li key={c}>· {c}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border p-4 lg:col-span-2">
          <h2 className="font-display text-[16px] font-bold">Aguardando aprovação</h2>
          <div className="mt-3 space-y-2.5">
            {fila.map((m) => (
              <div key={m.id} className="rounded-xl border border-border p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={m.foto}
                    alt={m.nome}
                    loading="lazy"
                    width={816}
                    height={816}
                    className="size-9 rounded-full object-cover"
                  />
                  <p className="text-[13px] font-semibold">
                    {m.nome}, {m.idade}
                  </p>
                  <span className="ml-auto text-[10px] font-semibold text-muted-foreground">
                    Tom: {estilo}
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-foreground/80">{m.sugestaoIA}</p>
                <div className="mt-2 flex gap-2">
                  <button className="h-8 rounded-full bg-primary px-3 text-[11px] font-semibold text-primary-foreground">
                    Aprovar e enviar
                  </button>
                  <button className="h-8 rounded-full border border-border px-3 text-[11px] font-semibold text-muted-foreground">
                    Editar
                  </button>
                  <button className="h-8 rounded-full border border-border px-3 text-[11px] font-semibold text-muted-foreground">
                    Regenerar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border p-4 lg:col-span-2">
          <h2 className="font-display text-[16px] font-bold">Follow-up automático</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Lembretes para retomar conversas paradas.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {followUpOpcoes.map((o) => (
              <span
                key={o}
                className="h-8 rounded-full border border-border px-3 text-[11px] font-semibold leading-8 text-muted-foreground"
              >
                {o}
              </span>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
