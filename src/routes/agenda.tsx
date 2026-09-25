import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { dateEvents } from "@/lib/mock-data";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda — Amora" },
      { name: "description", content: "Seus encontros por dia, semana e mês, com link para a conversa." },
      { property: "og:title", content: "Agenda — Amora" },
      { property: "og:description", content: "Seus encontros por dia, semana e mês, com link para a conversa." },
    ],
  }),
  component: AgendaPage,
});

const visoes = ["Dia", "Semana", "Mês"] as const;
const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function AgendaPage() {
  const [visao, setVisao] = useState<(typeof visoes)[number]>("Semana");

  return (
    <AppShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-[22px] font-bold tracking-tight">Agenda</h1>
          <p className="mt-1 text-[13px] text-muted-foreground">Semana de 28 de setembro a 4 de outubro</p>
        </div>
        <div className="flex gap-2">
          {visoes.map((v) => (
            <button
              key={v}
              onClick={() => setVisao(v)}
              className={`h-9 rounded-full px-4 text-[12px] font-semibold ${
                visao === v
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {visao === "Semana" && (
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {diasSemana.map((d) => {
            const evento = dateEvents.find((e) => e.diaSemana === d);
            return (
              <div key={d} className="min-h-28 rounded-xl border border-border p-2">
                <p className="text-[10px] font-semibold text-muted-foreground">{d}</p>
                {evento && (
                  <div className="mt-1.5 rounded-lg bg-primary p-1.5 text-primary-foreground">
                    <p className="text-[9px] opacity-70">{evento.horario}</p>
                    <p className="truncate text-[10px] font-semibold">{evento.nome.split(",")[0]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {visao === "Mês" && (
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((dia) => {
            const evento = dia === 2 ? dateEvents[1] : dia === 3 ? dateEvents[0] : undefined;
            return (
              <div key={dia} className="min-h-16 rounded-lg border border-border p-1.5">
                <p className="text-[10px] text-muted-foreground">{dia}</p>
                {evento && <span className="mt-1 block size-1.5 rounded-full bg-flame" />}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-5 space-y-2.5">
        <h2 className="font-display text-[16px] font-bold">
          {visao === "Dia" ? "Hoje" : "Próximos encontros"}
        </h2>
        {dateEvents.map((e) => (
          <div key={e.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
            <img
              src={e.foto}
              alt={e.nome}
              loading="lazy"
              width={816}
              height={816}
              className="size-11 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold">{e.nome}</p>
              <p className="text-[12px] text-muted-foreground">
                {e.data} · {e.horario} · {e.local}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{e.observacoes}</p>
            </div>
            <Link
              to="/conversas"
              search={{ id: e.matchId }}
              className="h-8 shrink-0 rounded-full border border-border px-3 text-[11px] font-semibold leading-8 text-muted-foreground"
            >
              Abrir conversa
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-border p-4">
        <p className="font-display text-[13px] font-bold">Google Calendar</p>
        <p className="mt-1 text-[12px] text-muted-foreground">
          A sincronização por OAuth será ativada quando a integração for conectada.
        </p>
        <button className="mt-3 h-9 rounded-full border border-border px-4 text-[12px] font-semibold text-muted-foreground">
          Conectar (em breve)
        </button>
      </div>
    </AppShell>
  );
}
