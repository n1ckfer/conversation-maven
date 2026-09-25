import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, SectionTitle } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { dashboardStats, matches } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painel — Amora" },
      { name: "description", content: "Panorama dos seus matches, conversas e dates em um só lugar." },
      { property: "og:title", content: "Painel — Amora" },
      { property: "og:description", content: "Panorama dos seus matches, conversas e dates em um só lugar." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const destaque = matches.filter((m) => m.status === "POSSIBLE_DATE" || m.status === "DATE_SCHEDULED");
  const sugestao = matches[0];

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-flame">
            Precisa de atenção
          </p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-display text-[30px] font-bold leading-none">3</p>
              <p className="mt-1 text-[13px] text-primary-foreground/60">
                conversas aguardando resposta
              </p>
            </div>
            <Link
              to="/conversas"
              className="h-9 shrink-0 rounded-full bg-flame px-4 text-[12px] font-semibold leading-9 text-flame-foreground transition-transform hover:scale-[1.02]"
            >
              Ver agora
            </Link>
          </div>
          <div className="mt-4 flex gap-2">
            {destaque.map((m) => (
              <div key={m.id} className="flex-1 rounded-xl bg-primary-foreground/10 px-3 py-2">
                <p className="text-[11px] text-primary-foreground/60">{m.nome}</p>
                <p className="text-[12px] font-medium">
                  {m.status === "POSSIBLE_DATE" ? "Possível date detectado" : "Date sábado 20h"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>Panorama</SectionTitle>
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
            {dashboardStats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border p-3.5">
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
                <p
                  className={`mt-1 font-display text-[26px] font-bold leading-none ${
                    s.accent ? "text-flame" : ""
                  }`}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>Conversas</SectionTitle>
          <div className="space-y-2.5">
            {matches.map((m) => (
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
                  className="size-11 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] font-semibold">
                      {m.nome}, {m.idade}
                    </p>
                    <span
                      className={`size-1.5 rounded-full ${
                        m.status === "POSSIBLE_DATE" ? "bg-flame" : "bg-foreground"
                      }`}
                    />
                  </div>
                  <p className="truncate text-[12px] text-muted-foreground">{m.ultimaMensagem}</p>
                </div>
                <p className="shrink-0 text-[10px] text-muted-foreground">{m.horario}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between">
            <p className="font-display text-[14px] font-bold">Sugestão da IA · para {sugestao.nome}</p>
            <span className="text-[10px] font-semibold text-muted-foreground">Tom: Natural</span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-foreground/80">{sugestao.sugestaoIA}</p>
          <div className="mt-3 flex gap-2">
            <Link
              to="/conversas"
              search={{ id: sugestao.id }}
              className="h-9 rounded-full bg-primary px-4 text-[12px] font-semibold leading-9 text-primary-foreground"
            >
              Aprovar e enviar
            </Link>
            <Link
              to="/conversas"
              search={{ id: sugestao.id }}
              className="h-9 rounded-full border border-border px-4 text-[12px] font-semibold leading-9 text-muted-foreground"
            >
              Editar
            </Link>
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground">
            A análise da IA é uma sugestão, não uma certeza sobre o que a pessoa sente.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <StatusBadge status="NEW" />
        <StatusBadge status="ACTIVE" />
        <StatusBadge status="WAITING_REPLY" />
        <StatusBadge status="POSSIBLE_DATE" />
        <StatusBadge status="DATE_SCHEDULED" />
      </div>
    </AppShell>
  );
}
