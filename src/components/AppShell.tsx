import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Início" },
  { to: "/matches", label: "Matches" },
  { to: "/conversas", label: "Conversas" },
  { to: "/dates", label: "Dates" },
  { to: "/agenda", label: "Agenda" },
  { to: "/ia", label: "IA" },
  { to: "/configuracoes", label: "Configurações" },
] as const;

const bottomItems = navItems.slice(0, 5);

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-flame" />
            <span className="font-display text-[15px] font-bold tracking-tight">Amora</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/ia" className="text-[11px] font-semibold text-muted-foreground">
              IA modo: Aprovação
            </Link>
            <div className="grid size-8 place-items-center rounded-full bg-cream text-[10px] font-semibold text-muted-foreground outline-1 -outline-offset-1 outline-border">
              VC
            </div>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 pb-3 no-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="h-9 shrink-0 rounded-full border border-border px-4 text-[12px] font-semibold leading-9 text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{
                className:
                  "h-9 shrink-0 rounded-full border border-primary bg-primary px-4 text-[12px] font-semibold leading-9 text-primary-foreground",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-5 pb-24 md:pb-10">{children}</main>

      <nav className="sticky bottom-0 z-40 border-t border-border bg-background md:hidden">
        <div className="grid grid-cols-5">
          {bottomItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="flex flex-col items-center gap-1 py-3 text-muted-foreground"
              activeProps={{ className: "flex flex-col items-center gap-1 py-3 text-foreground" }}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`size-2 rounded-full ${isActive ? "bg-flame" : "bg-muted-foreground/40"}`}
                  />
                  <span className={`text-[10px] ${isActive ? "font-semibold" : ""}`}>{item.label}</span>
                </>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 font-display text-[16px] font-bold">{children}</h2>;
}
