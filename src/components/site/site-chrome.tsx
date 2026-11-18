import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LOGO_URL, YOUTUBE_URL, nav } from "@/components/site/data";

/** Menu link: real pages go through the router, homepage sections use plain anchors. */
const pages = ["/careers", "/portfolio", "/products"] as const;
const isPage = (href: string): href is (typeof pages)[number] => (pages as readonly string[]).includes(href);

function NavLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  if (isPage(href)) {
    return (
      <Link to={href} className={className} activeProps={{ className: "text-accent" }}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
      <Link to="/" className="flex items-center gap-3">
        <img src={LOGO_URL} alt="My Creative Panda logo" width={44} height={44} className="h-11 w-11 rounded-full bg-forest-foreground p-0.5" />
        <span className="font-display text-lg font-bold tracking-tight text-forest-foreground">My Creative Panda</span>
      </Link>
      <nav className="hidden items-center gap-8 md:flex">
        {nav.map((n) => (
          <NavLink key={n.href} href={n.href} className="text-sm font-medium text-forest-foreground/80 transition-colors hover:text-accent">
            {n.label}
          </NavLink>
        ))}
      </nav>
      <Button asChild variant="lime" size="lg">
        <a href="/#contact">Contact us</a>
      </Button>
    </header>
  );
}

export function TechTag({ children, index, dark }: { children: ReactNode; index?: string | undefined; dark?: boolean | undefined }) {
  return (
    <p
      className={`eyebrow inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 ${
        dark ? "border-accent/30 bg-accent/10 text-accent" : "border-primary/25 bg-primary/10 text-primary"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-60" />
        <span className="relative h-2 w-2 rounded-full bg-current" />
      </span>
      {index && <span className="opacity-60">{index} /</span>}
      {children}
    </p>
  );
}

const Letters = ({ text, className }: { text: string; className: string }) => (
  <span data-reveal-group className="block">
    {Array.from(text).map((ch, i) => (
      <span key={i} className={`inline-block ${className}`}>
        {ch === " " ? "\u00A0" : ch}
      </span>
    ))}
  </span>
);

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-forest-deep text-forest-foreground">
      <div aria-hidden className="absolute inset-0 -z-10 bg-tech-grid-fine" />
      <div aria-hidden className="absolute bottom-24 left-1/2 -z-10 h-64 w-[60rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 pt-20 lg:px-10">
        <p aria-label="My Creative Panda" className="font-display text-[15vw] font-extrabold leading-[0.9] tracking-tighter lg:text-[10.5rem]">
          <Letters text="My Creative" className="text-outline" />
          <Letters text="Panda." className="text-accent text-glow" />
        </p>
        <div className="mt-10 flex flex-col gap-8 border-t border-forest-foreground/15 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="" width={36} height={36} loading="lazy" className="h-9 w-9 rounded-full bg-forest-foreground p-0.5" />
            <span className="text-sm text-forest-foreground/70">
              © {new Date().getFullYear()} My Creative Panda. Crafting the web since 2006.
            </span>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm">
            {nav.map((n) => (
              <NavLink key={n.href} href={n.href} className="text-forest-foreground/70 hover:text-accent">
                {n.label}
              </NavLink>
            ))}
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="text-forest-foreground/70 hover:text-accent">
              YouTube
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
