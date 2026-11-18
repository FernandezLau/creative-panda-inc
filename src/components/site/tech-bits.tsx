import { Lock } from "lucide-react";

/** Four accent corner brackets that grow when the parent `group` is hovered. */
export function Corners() {
  const base = "pointer-events-none absolute h-4 w-4 border-accent transition-all duration-300 group-hover:h-6 group-hover:w-6";
  return (
    <>
      <span aria-hidden className={`${base} left-3 top-3 border-l-2 border-t-2`} />
      <span aria-hidden className={`${base} right-3 top-3 border-r-2 border-t-2`} />
      <span aria-hidden className={`${base} bottom-3 left-3 border-b-2 border-l-2`} />
      <span aria-hidden className={`${base} bottom-3 right-3 border-b-2 border-r-2`} />
    </>
  );
}

/** Browser-window top bar with traffic-light dots and an address pill. */
export function BrowserBar({ url, dark }: { url: string; dark?: boolean | undefined }) {
  return (
    <div
      className={`flex items-center gap-1.5 border-b px-4 py-2.5 ${
        dark ? "border-forest-foreground/10 bg-forest-deep/80" : "border-border bg-card"
      }`}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-chart-4/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      <span
        className={`ml-3 flex min-w-0 items-center gap-1.5 truncate rounded-full px-3 py-0.5 text-xs ${
          dark ? "bg-forest-foreground/10 text-forest-foreground/60" : "bg-muted text-muted-foreground"
        }`}
      >
        <Lock className="h-3 w-3 shrink-0" />
        <span className="truncate">{url}</span>
      </span>
    </div>
  );
}

export const host = (u: string) => u.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
