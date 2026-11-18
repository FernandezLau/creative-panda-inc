import { Link, createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Cpu, Globe, Mail, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter, TechTag } from "@/components/site/site-chrome";
import { BrowserBar, host } from "@/components/site/tech-bits";
import { useSiteAnimations, useStaggerIn } from "@/components/site/use-site-animations";
import { SALES_EMAIL } from "@/components/site/data";
import {
  softwareProjects,
  websiteCategories,
  websites,
  type SoftwareProject,
  type Website,
} from "@/components/site/portfolio-data";
import { filterSoftware, filterWebsites, systemCounts } from "@/lib/portfolio";

const categoryIds = websiteCategories.map((c) => c.id) as [string, ...string[]];

const searchSchema = z.object({
  view: z.enum(["websites", "software"]).optional().catch(undefined),
  cat: z.enum(categoryIds).optional().catch(undefined),
  sys: z.string().regex(/^[A-Z]{2,10}$/).optional().catch(undefined),
});

export const Route = createFileRoute("/portfolio")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Portfolio — Websites & Systems by My Creative Panda" },
      {
        name: "description",
        content: `See ${websites.length} websites and ${softwareProjects.length} systems My Creative Panda built for LGUs, national agencies, schools, cooperatives and businesses across the Philippines.`,
      },
      { property: "og:title", content: "Portfolio — Websites & Systems by My Creative Panda" },
      {
        property: "og:description",
        content: "Government portals, school websites and custom systems built by a Philippine studio since 2006.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSiteAnimations(rootRef);
  return (
    <div ref={rootRef} className="min-h-screen overflow-x-hidden">
      <PageHero
        eyebrow="Our portfolio"
        words={["Elevating", "creativity", "through"]}
        accent={["digital", "innovation."]}
        copy="Welcome to our portfolio, where innovation meets design. Explore projects that fuse cutting-edge technology with creative imagination — remarkable digital experiences for towns, agencies and brands."
        actions={
          <>
            <Button asChild variant="lime" size="xl" data-hero="cta">
              <a href="#projects">
                Browse projects <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="ghostLight" size="xl" data-hero="cta">
              <Link to="/products">Our products</Link>
            </Button>
          </>
        }
        stats={[
          { v: websites.length, l: "Websites launched" },
          { v: softwareProjects.length, l: "Client systems" },
          { v: websiteCategories.length, l: "Sectors served" },
          { v: 2006, l: "Building since" },
        ]}
      />
      <Projects />
      <Cta />
      <SiteFooter />
    </div>
  );
}

/* ---------------- Projects explorer ---------------- */

function Projects() {
  const { view = "websites", cat, sys } = Route.useSearch();
  const [query, setQuery] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

  const category = websiteCategories.find((c) => c.id === cat)?.id;
  const shownSites = useMemo(() => filterWebsites(websites, category, query), [category, query]);
  const shownSoftware = useMemo(() => filterSoftware(softwareProjects, sys, query), [sys, query]);
  const systems = useMemo(() => systemCounts(softwareProjects), []);
  const count = view === "websites" ? shownSites.length : shownSoftware.length;

  useStaggerIn(gridRef, `${view}-${cat ?? ""}-${sys ?? ""}-${query}`);

  return (
    <section id="projects" className="relative isolate scroll-mt-4 overflow-hidden py-24">
      <div aria-hidden className="absolute inset-0 -z-10 bg-circuit-light" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div data-reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <TechTag index="01">All client projects</TechTag>
            <h2 className="mt-6 text-4xl font-bold leading-[1.02] sm:text-6xl">
              Proudly powering <span className="accent-italic text-primary">the Philippines.</span>
            </h2>
          </div>

          {/* Websites / Software switch */}
          <div role="tablist" aria-label="Project type" className="inline-flex rounded-full border border-border bg-card p-1.5 shadow-card">
            {(
              [
                { id: "websites", label: "Websites", icon: Globe, n: websites.length },
                { id: "software", label: "Software", icon: Cpu, n: softwareProjects.length },
              ] as const
            ).map((t) => {
              const on = view === t.id;
              return (
                <Link
                  key={t.id}
                  role="tab"
                  aria-selected={on}
                  to="/portfolio"
                  search={{ view: t.id }}
                  resetScroll={false}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    on ? "bg-forest-deep text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <t.icon className="h-4 w-4" /> {t.label}
                  <span className={`rounded-full px-2 py-0.5 text-xs ${on ? "bg-accent/15" : "bg-muted"}`}>{t.n}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {view === "websites" ? (
              <>
                <Chip on={!category} to={{ view: "websites" }} label="All" n={websites.length} />
                {websiteCategories.map((c) => (
                  <Chip
                    key={c.id}
                    on={category === c.id}
                    to={{ view: "websites", cat: c.id }}
                    label={c.label}
                    title={c.long}
                    n={websites.filter((w) => w.category === c.id).length}
                  />
                ))}
              </>
            ) : (
              <>
                <Chip on={!sys} to={{ view: "software" }} label="All" n={softwareProjects.length} />
                {systems.map((s) => (
                  <Chip key={s.code} on={sys === s.code} to={{ view: "software", sys: s.code }} label={s.code} n={s.count} mono />
                ))}
              </>
            )}
          </div>
          <label className="relative flex w-full items-center lg:w-80">
            <span className="sr-only">Search projects</span>
            <Search className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              maxLength={60}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={view === "websites" ? "Search town, agency, school…" : "Search client or system…"}
              className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 rounded-full p-1 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground" aria-live="polite">
          &gt; showing <span className="text-primary">{count}</span> {view === "websites" ? "websites" : "systems"}
          {category && ` · ${websiteCategories.find((c) => c.id === category)?.long}`}
          {sys && ` · ${softwareProjects.find((s) => s.code === sys)?.system ?? sys}`}
        </p>

        <div ref={gridRef} className="mt-6">
          {count === 0 ? (
            <div className="rounded-3xl border border-dashed border-primary/40 bg-card p-12 text-center">
              <p className="text-lg font-semibold">No projects match “{query}”.</p>
              <button type="button" onClick={() => setQuery("")} className="mt-3 text-sm font-semibold text-primary underline underline-offset-4">
                Clear search
              </button>
            </div>
          ) : view === "websites" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shownSites.map((w) => (
                <WebsiteCard key={`${w.category}-${w.url}`} w={w} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shownSoftware.map((s) => (
                <SoftwareCard key={s.url} s={s} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Chip({
  on,
  to,
  label,
  n,
  title,
  mono,
}: {
  on: boolean;
  to: { view: "websites" | "software"; cat?: string; sys?: string };
  label: string;
  n: number;
  title?: string;
  mono?: boolean;
}) {
  return (
    <Link
      to="/portfolio"
      search={to}
      resetScroll={false}
      title={title}
      aria-pressed={on}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${mono ? "font-mono text-xs" : ""} ${
        on
          ? "border-primary bg-primary text-primary-foreground shadow-card"
          : "border-border bg-card text-foreground/80 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
      }`}
    >
      {label}
      <span className={`text-xs ${on ? "opacity-80" : "text-muted-foreground"}`}>{n}</span>
    </Link>
  );
}

const catLabel = (id: string) => websiteCategories.find((c) => c.id === id)?.label ?? id;

function WebsiteCard({ w }: { w: Website }) {
  return (
    <a
      data-item
      href={w.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lift"
    >
      <BrowserBar url={host(w.url)} />
      <div className="relative overflow-hidden bg-muted">
        <img
          src={w.img}
          alt={`${w.name} website`}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/4 scan-beam opacity-0 transition-opacity group-hover:animate-scan group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-forest-deep/85 px-2.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-accent ring-1 ring-accent/30 backdrop-blur">
          {catLabel(w.category)}
        </span>
      </div>
      <div className="flex flex-1 items-center justify-between gap-4 p-5">
        <div className="min-w-0">
          <h3 className="font-bold leading-snug">{w.name}</h3>
          {w.place && <p className="mt-1 text-sm text-muted-foreground">{w.place}</p>}
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

function SoftwareCard({ s }: { s: SoftwareProject }) {
  return (
    <a
      data-item
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-forest-deep text-forest-foreground ring-1 ring-forest-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lime hover:ring-accent/60"
    >
      <div className="flex items-center justify-between border-b border-forest-foreground/10 px-4 py-2.5 text-xs font-semibold">
        <span className="flex items-center gap-2 font-mono text-accent">
          <Cpu className="h-3.5 w-3.5" /> {s.code}
        </span>
        <span className="flex items-center gap-1.5 text-forest-foreground/60">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Live system
        </span>
      </div>
      <div className="relative overflow-hidden">
        <img
          src={s.img}
          alt={`${s.system} for ${s.client}`}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div>
          <h3 className="font-bold leading-snug">{s.client}</h3>
          <p className="mt-1 text-sm text-forest-foreground/65">{s.system}</p>
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
          View system <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}

/* ---------------- CTA ---------------- */

function Cta() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
      <div data-reveal className="relative isolate overflow-hidden rounded-[2rem] bg-forest-deep p-10 text-forest-foreground ring-1 ring-accent/20 lg:p-16">
        <div aria-hidden className="absolute inset-0 -z-10 bg-tech-grid-fine" />
        <div aria-hidden className="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <TechTag dark>Your project next</TechTag>
            <h2 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
              Want your website <span className="accent-italic text-accent text-glow">on this list?</span>
            </h2>
            <p className="mt-5 text-lg text-forest-foreground/75">
              Tell us about your town, agency, school or business — we'll plan the website or system that fits.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="lime" size="xl">
              <a href={`mailto:${SALES_EMAIL}?subject=${encodeURIComponent("Project inquiry")}`}>
                <Mail /> Start a project
              </a>
            </Button>
            <Button asChild variant="ghostLight" size="xl">
              <Link to="/products">See our products</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
