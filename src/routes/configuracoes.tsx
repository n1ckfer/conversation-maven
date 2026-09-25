import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — Amora" },
      { name: "description", content: "Conta, integrações de mensagens, calendário e privacidade." },
      { property: "og:title", content: "Configurações — Amora" },
      { property: "og:description", content: "Conta, integrações de mensagens, calendário e privacidade." },
    ],
  }),
  component: ConfigPage,
});

const integracoes = [
  {
    nome: "Messaging Integration",
    descricao: "Conexão via API oficial. Nesta versão os dados são de demonstração.",
    estado: "Dados mockados",
  },
  {
    nome: "Google Calendar",
    descricao: "Sincroniza seus dates com o calendário via OAuth.",
    estado: "Não conectado",
  },
  {
    nome: "Modelo de IA",
    descricao: "As chaves ficam no servidor e nunca no navegador.",
    estado: "A configurar",
  },
];

function ConfigPage() {
  return (
    <AppShell>
      <h1 className="font-display text-[22px] font-bold tracking-tight">Configurações</h1>
      <p className="mt-1 text-[13px] text-muted-foreground">Conta, integrações e privacidade.</p>

      <section className="mt-5 rounded-2xl border border-border p-4">
        <h2 className="font-display text-[16px] font-bold">Conta</h2>
        <div className="mt-3 space-y-3">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-muted-foreground">Nome</span>
            <input
              defaultValue="Você"
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-foreground"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-muted-foreground">E-mail</span>
            <input
              defaultValue="voce@exemplo.com"
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-foreground"
            />
          </label>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-border p-4">
        <h2 className="font-display text-[16px] font-bold">Integrações</h2>
        <div className="mt-3 space-y-2.5">
          {integracoes.map((i) => (
            <div key={i.nome} className="flex items-center gap-3 rounded-xl border border-border p-3">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold">{i.nome}</p>
                <p className="text-[12px] text-muted-foreground">{i.descricao}</p>
              </div>
              <span className="shrink-0 rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {i.estado}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-border p-4">
        <h2 className="font-display text-[16px] font-bold">Privacidade</h2>
        <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
          Quando o backend for ativado, cada pessoa acessa somente os próprios dados, com regras de
          acesso por linha no banco. Integrações externas usam autenticação oficial e nenhuma chave
          fica exposta no navegador.
        </p>
      </section>
    </AppShell>
  );
}
