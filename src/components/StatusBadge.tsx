import { statusLabel, type ConversationStatus } from "@/lib/mock-data";

const flameStatuses: ConversationStatus[] = ["POSSIBLE_DATE"];

export function StatusBadge({ status }: { status: ConversationStatus }) {
  const isFlame = flameStatuses.includes(status);
  return (
    <span
      className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
        isFlame
          ? "border-flame/30 bg-flame/10 text-flame"
          : "border-border bg-secondary text-muted-foreground"
      }`}
    >
      {statusLabel[status]}
    </span>
  );
}
