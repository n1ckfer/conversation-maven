import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { matches, type ConversationStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Matches — Amora" },
      { name: "description", content: "Lista de matches com status, última mensagem e possíveis dates." },
      { property: "og:title", content: "Matches — Amora" },
      { property: "og:description", content: "Lista de matches com status, última mensagem e possíveis dates." },
    ],
  }),
  component: MatchesPage,
});

const filtros: { label: string; status: ConversationStatus | "ALL" }[] = [
  { label: "Todos", status: "ALL" },
  { label: "Novos", status: "NEW" },
  { label: "Conversando", status: "ACTIVE" },
  { label: "Aguardando resposta", status: "WAITING_REPLY" },
  { label: "Possível date", status: "POSSIBLE_DATE" },
  { label: "Date marcado", status: "DATE_SCHEDULED" },
  { label: "Arquivados", status: "ARCHIVED" },
];

function MatchesPage() {
  const [filtro, setFiltro] = useState<ConversationStatus | "ALL">("ALL");
  const [busca, setBusca] = useState("");

  const lista = matches.filter(
    (m) =>
      (filtro === "ALL" || m.status === filtro) &&
      m.nome.toLowerCase().includes(busca.trim().toLowerCase()),
  );

  return (
    <AppShell>
      <h1 className="font-display text-[22px] font-bold tracking-tight">Matches</h1>
      <p className="mt-1 text-[13px] text-muted-foreground">{matches.length} pessoas no seu radar.</p>

      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por nome"
        className="mt-4 h-10 w-full rounded-full border border-border bg-background px-4 text-[13px] outline-none focus:border-foreground"
      />

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filtros.map((f) => (
          <button
            key={f.label}
            onClick={() => setFiltro(f.status)}
            className={`h-9 shrink-0 rounded-full px-4 text-[12px] font-semibold transition-colors ${
              filtro === f.status
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-2.5 lg:grid-cols-2">
        {lista.map((m) => (
          <Link
            key={m.id}
            to="/conversas"
            search={{ id: m.id }}
            className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-secondary"
          >
            <img
              src={m.foto}
              alt={m.nome}
              loading="lazy"
              width={816}
              height={816}
              className="size-12 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-semibold">
                  {m.nome}, {m.idade}
                </p>
                {m.analise.possivelDate && (
                  <span className="text-[9px] font-semibold text-flame">POSSÍVEL DATE</span>
                )}
              </div>
              <p className="truncate text-[12px] text-muted-foreground">{m.ultimaMensagem}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <StatusBadge status={m.status} />
                <span className="text-[10px] text-muted-foreground">{m.horario}</span>
              </div>
            </div>
          </Link>
        ))}
        {lista.length === 0 && (
          <p className="text-[13px] text-muted-foreground">Nenhum match nesse filtro.</p>
        )}
      </div>
    </AppShell>
  );
}
