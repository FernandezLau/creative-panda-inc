import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-chrome";

type Stat = { v: number; s?: string; l: string };

/**
 * Dark tech hero shared by inner pages. Uses the same `data-hero*` hooks as the homepage,
 * so useSiteAnimations plays the word-by-word intro and count-up stats.
 */
export function PageHero({
  eyebrow,
  words,
  accent,
  copy,
  actions,
  stats,
}: {
  eyebrow: string;
  words: string[];
  accent: string[];
  copy: ReactNode;
  actions?: ReactNode;
  stats: Stat[];
}) {
  return (
    <section data-hero-scope className="relative isolate overflow-hidden bg-forest-deep text-forest-foreground">
      <div aria-hidden className="absolute inset-0 -z-10 bg-tech-grid-fine" />
      <div aria-hidden data-hero-bg className="absolute -left-32 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full overflow-hidden">
        <div className="scan-beam absolute inset-x-0 h-24 animate-scan opacity-40" />
      </div>
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-10 lg:pb-24 lg:pt-20">
        <p data-hero="eyebrow" className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-accent">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-current" />
          </span>
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.02] sm:text-7xl">
          {words.map((w, i) => (
            <span key={`${w}-${i}`} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span data-hero="word" className="inline-block">
                {w}
              </span>
            </span>
          ))}
          {accent.map((w, i) => (
            <span key={`${w}-a${i}`} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span data-hero="word" className="accent-italic inline-block text-accent text-glow">
                {w}
              </span>
            </span>
          ))}
        </h1>
        <p data-hero="copy" className="mt-8 max-w-2xl text-lg leading-relaxed text-forest-foreground/75">
          {copy}
        </p>
        {actions && <div className="mt-10 flex flex-wrap gap-4">{actions}</div>}
        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-forest-foreground/20 pt-8 sm:grid-cols-4">
          {stats.map(({ v, s = "", l }) => (
            <div key={l} data-hero="stat">
              <dt className="font-display text-3xl font-bold tabular-nums sm:text-4xl" data-count={v} data-suffix={s}>
                {v}
                {s}
              </dt>
              <dd className="mt-1 text-sm text-forest-foreground/70">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
