import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { dateEvents, followUpOpcoes, matches } from "@/lib/mock-data";

export const Route = createFileRoute("/dates")({
  head: () => ({
    meta: [
      { title: "Dates — Amora" },
      { name: "description", content: "Possíveis dates detectados pela IA e agendamento de encontros." },
      { property: "og:title", content: "Dates — Amora" },
      { property: "og:description", content: "Possíveis dates detectados pela IA e agendamento de encontros." },
    ],
  }),
  component: DatesPage,
});

function DatesPage() {
  const possiveis = matches.filter((m) => m.analise.possivelDate);
  const [pessoa, setPessoa] = useState(possiveis[0]?.nome ?? matches[0].nome);
  const [salvo, setSalvo] = useState(false);

  return (
    <AppShell>
      <h1 className="font-display text-[22px] font-bold tracking-tight">Dates</h1>
      <p className="mt-1 text-[13px] text-muted-foreground">
        A IA sinaliza mensagens sobre encontro, disponibilidade, sair ou café.
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <section className="space-y-2.5">
          <h2 className="font-display text-[16px] font-bold">Possíveis dates</h2>
          {possiveis.map((m) => (
            <div key={m.id} className="rounded-xl border border-flame/30 bg-flame/5 p-3">
              <div className="flex items-center gap-3">
                <img
                  src={m.foto}
                  alt={m.nome}
                  loading="lazy"
                  width={816}
                  height={816}
                  className="size-11 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold">
                    {m.nome}, {m.idade}
                  </p>
                  <p className="truncate text-[12px] text-muted-foreground">{m.ultimaMensagem}</p>
                </div>
                <span className="shrink-0 text-[9px] font-semibold text-flame">POSSÍVEL DATE</span>
              </div>
              <Link
                to="/conversas"
                search={{ id: m.id }}
                className="mt-2 inline-block text-[11px] font-semibold underline"
              >
                Abrir conversa
              </Link>
            </div>
          ))}

          <h2 className="pt-3 font-display text-[16px] font-bold">Dates marcados</h2>
          {dateEvents.map((d) => (
            <div key={d.id} className="rounded-xl border border-border p-3">
              <div className="flex items-center gap-3">
                <img
                  src={d.foto}
                  alt={d.nome}
                  loading="lazy"
                  width={816}
                  height={816}
                  className="size-11 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold">{d.nome}</p>
                  <p className="text-[12px] text-muted-foreground">
                    {d.data} · {d.horario} · {d.local}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">{d.observacoes}</p>
              <div className="mt-2 flex gap-2">
                <button className="h-8 rounded-full border border-border px-3 text-[11px] font-semibold text-muted-foreground">
                  Editar
                </button>
                <button className="h-8 rounded-full border border-border px-3 text-[11px] font-semibold text-muted-foreground">
                  Cancelar
                </button>
                <Link
                  to="/conversas"
                  search={{ id: d.matchId }}
                  className="h-8 rounded-full border border-border px-3 text-[11px] font-semibold leading-8 text-muted-foreground"
                >
                  Abrir conversa
                </Link>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-border p-4">
          <h2 className="font-display text-[16px] font-bold">Novo agendamento</h2>
          <div className="mt-3 space-y-3">
            <Field label="Pessoa">
              <select
                value={pessoa}
                onChange={(e) => setPessoa(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-foreground"
              >
                {matches.map((m) => (
                  <option key={m.id}>{m.nome}</option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Data">
                <input type="date" className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-foreground" />
              </Field>
              <Field label="Horário">
                <input type="time" className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-foreground" />
              </Field>
            </div>
            <Field label="Local">
              <input
                placeholder="Café da Aurora"
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-foreground"
              />
            </Field>
            <Field label="Observações">
              <textarea
                rows={3}
                placeholder="Detalhes úteis para o encontro"
                className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-[13px] outline-none focus:border-foreground"
              />
            </Field>
            <Field label="Lembrete de follow-up">
              <div className="flex flex-wrap gap-2">
                {followUpOpcoes.map((o) => (
                  <button
                    key={o}
                    className="h-8 rounded-full border border-border px-3 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
                  >
                    {o}
                  </button>
                ))}
              </div>
            </Field>
            <button
              onClick={() => setSalvo(true)}
              className="h-10 w-full rounded-full bg-primary text-[12px] font-semibold text-primary-foreground"
            >
              Adicionar à agenda
            </button>
            {salvo && (
              <p className="text-[11px] text-flame">
                Nesta versão de demonstração o agendamento não é salvo.
              </p>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
