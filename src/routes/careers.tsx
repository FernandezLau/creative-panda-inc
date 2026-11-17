import { Link, createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useEffect, useMemo, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  Layers,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { SiteFooter, SiteHeader, TechTag } from "@/components/site/site-chrome";
import { useSiteAnimations } from "@/components/site/use-site-animations";
import { SALES_EMAIL } from "@/components/site/data";
import { getOpenPositions } from "@/lib/careers.functions";
import {
  applyUrl,
  groupByDepartment,
  looksTruncated,
  parseBlocks,
  type Department,
  type Position,
} from "@/lib/careers";

const careersQuery = queryOptions({
  queryKey: ["careers", "open-positions"],
  queryFn: () => getOpenPositions(),
  staleTime: 5 * 60_000,
});

const searchSchema = z.object({
  dept: z.string().regex(/^[a-z0-9-]{1,80}$/).optional().catch(undefined),
  job: z.string().regex(/^\d{1,9}$/).optional().catch(undefined),
});

export const Route = createFileRoute("/careers")({
  validateSearch: zodValidator(searchSchema),
  loader: ({ context }) => context.queryClient.ensureQueryData(careersQuery),
  head: () => ({
    meta: [
      { title: "Careers at My Creative Panda — Open Positions" },
      {
        name: "description",
        content:
          "Join My Creative Panda. Browse open positions in admin, finance, HR, sales, support and web development, then apply online.",
      },
      { property: "og:title", content: "Careers at My Creative Panda — Open Positions" },
      {
        property: "og:description",
        content: "Build websites and systems for towns, agencies and brands across the Philippines. See our open roles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSiteAnimations(rootRef);
  const { data } = useSuspenseQuery(careersQuery);
  const departments = useMemo(() => groupByDepartment(data.positions), [data.positions]);

  return (
    <div ref={rootRef} className="min-h-screen overflow-x-hidden">
      <CareersHero roles={data.positions.length} teams={departments.length} />
      <Finder departments={departments} positions={data.positions} failed={data.error !== null} />
      <Perks />
      <SiteFooter />
    </div>
  );
}

/* ---------------- Hero ---------------- */

function CareersHero({ roles, teams }: { roles: number; teams: number }) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-forest-foreground">
      <div aria-hidden className="absolute inset-0 -z-10 bg-tech-grid-fine" />
      <div aria-hidden className="absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div aria-hidden className="absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
      <SiteHeader />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-12 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:px-10 lg:pt-20">
        <div data-reveal>
          <TechTag dark>We're hiring</TechTag>
          <h1 className="mt-6 text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl">
            Build the web <span className="accent-italic text-accent text-glow">with us.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest-foreground/75">
            We'd love you to join our vibrant, imaginative community of developers and professionals.
            We believe in the power of creativity to produce outstanding work for our clients.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="lime" size="xl">
              <a href="#open-roles">
                See open roles <ArrowRight />
              </a>
            </Button>
          </div>
        </div>

        <div data-reveal className="rounded-2xl border border-accent/25 bg-forest/70 p-6 font-mono text-sm shadow-lime backdrop-blur">
          <div className="mb-4 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-chart-4/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="ml-3 text-xs text-forest-foreground/50">hiring.sh</span>
          </div>
          <p className="text-forest-foreground/60">$ panda careers --status</p>
          <p className="mt-3">
            <span className="text-accent">open_roles</span> = <span className="text-forest-foreground">{roles}</span>
          </p>
          <p>
            <span className="text-accent">teams</span> = <span className="text-forest-foreground">{teams}</span>
          </p>
          <p>
            <span className="text-accent">location</span> = <span className="text-forest-foreground">"Philippines"</span>
          </p>
          <p className="mt-3 text-forest-foreground/60">
            ready to apply<span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" />
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Department → Position → Details ---------------- */

function Finder({ departments, positions, failed }: { departments: Department[]; positions: Position[]; failed: boolean }) {
  const { dept, job } = Route.useSearch();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const position = job ? positions.find((p) => p.id === job) : undefined;
  const department = departments.find((d) => d.slug === (position?.departmentSlug ?? dept));
  const step = position ? 3 : department ? 2 : 1;
  const viewKey = `${step}-${department?.slug ?? ""}-${position?.id ?? ""}`;

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (!firstRender.current && panel.getBoundingClientRect().top < 0) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    firstRender.current = false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    void import("animejs").then(({ animate, stagger }) => {
      if (cancelled) return;
      animate(panel.querySelectorAll("[data-item]"), {
        opacity: [0, 1],
        y: [28, 0],
        delay: stagger(60),
        duration: 700,
        ease: "outExpo",
      });
    });
    return () => {
      cancelled = true;
    };
  }, [viewKey]);

  return (
    <section id="open-roles" className="relative isolate scroll-mt-6 overflow-hidden py-24">
      <div aria-hidden className="absolute inset-0 -z-10 bg-circuit-light" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div data-reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <TechTag index="01">Open positions</TechTag>
            <h2 className="mt-6 text-4xl font-bold leading-[1.02] sm:text-6xl">
              Find your <span className="accent-italic text-primary">place.</span>
            </h2>
          </div>
          <Steps step={step} />
        </div>

        <div ref={panelRef} className="mt-12 scroll-mt-6">
          {failed ? (
            <Notice
              title="We couldn't load our open roles right now."
              body="Please try again in a few minutes, or send your CV to our team by email."
            />
          ) : departments.length === 0 ? (
            <Notice title="No open roles at the moment." body="We're always happy to hear from talented people — send us your CV." />
          ) : step === 3 && position && department ? (
            <Details position={position} department={department} />
          ) : step === 2 && department ? (
            <PositionList department={department} />
          ) : (
            <>
              {job && <p className="mb-6 text-sm text-muted-foreground">That role is no longer open. Here's what's available now.</p>}
              <DepartmentGrid departments={departments} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Steps({ step }: { step: number }) {
  const labels = ["Department", "Position", "Details"];
  return (
    <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" aria-label="Progress">
      {labels.map((l, i) => {
        const n = i + 1;
        const on = n <= step;
        return (
          <li key={l} className="flex items-center gap-2" aria-current={n === step ? "step" : undefined}>
            <span
              className={`flex h-8 items-center gap-2 rounded-full border px-3 transition-colors ${
                on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"
              }`}
            >
              <span className="opacity-70">0{n}</span> {l}
            </span>
            {n < labels.length && <span className={`h-px w-4 ${n < step ? "bg-primary" : "bg-border"}`} />}
          </li>
        );
      })}
    </ol>
  );
}

function DepartmentGrid({ departments }: { departments: Department[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {departments.map((d, i) => (
        <Link
          key={d.slug}
          to="/careers"
          search={{ dept: d.slug }}
          resetScroll={false}
          data-item
          className="group relative block overflow-hidden rounded-3xl bg-forest-deep text-forest-foreground ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lime hover:ring-accent/60"
        >
          <div className="relative h-48 overflow-hidden">
            <img src={d.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-forest-deep/80 px-3 py-1 font-mono text-xs text-accent ring-1 ring-accent/30">
              DEPT-{String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="relative flex items-end justify-between gap-4 p-6 pt-0">
            <div>
              <h3 className="text-xl font-bold leading-tight">{d.name}</h3>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-forest-foreground/70">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {d.positions.length} {d.positions.length === 1 ? "open position" : "open positions"}
              </p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function BackLink({ search, children }: { search: { dept?: string }; children: string }) {
  return (
    <Link
      to="/careers"
      search={search}
      resetScroll={false}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
    >
      <ArrowLeft className="h-4 w-4" /> {children}
    </Link>
  );
}

function PositionList({ department }: { department: Department }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <BackLink search={{}}>All departments</BackLink>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{department.positions.length}</span> open in {department.name}
        </p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {department.positions.map((p) => (
          <Link
            key={p.id}
            to="/careers"
            search={{ dept: department.slug, job: p.id }}
            resetScroll={false}
            data-item
            className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card"
          >
            <div className="relative h-40 overflow-hidden">
              <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div aria-hidden className="absolute inset-x-0 top-0 h-full -translate-y-full scan-beam opacity-0 group-hover:animate-scan group-hover:opacity-100" />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 p-6">
              <div>
                <p className="font-mono text-xs text-primary">JOB-{p.id.padStart(3, "0")}</p>
                <h3 className="mt-2 text-lg font-bold leading-snug">{p.title}</h3>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                View role <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Details({ position, department }: { position: Position; department: Department }) {
  const href = applyUrl(position.id);
  const sections = [
    { title: "Qualifications", icon: CheckCircle2, text: position.qualification },
    { title: "Requirements", icon: ClipboardList, text: position.requirements },
    { title: "Responsibilities", icon: Layers, text: position.responsibilities },
  ].filter((s) => s.text);
  const truncated = sections.some((s) => looksTruncated(s.text));

  return (
    <div>
      <BackLink search={{ dept: department.slug }}>{`Back to ${department.name}`}</BackLink>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <article data-item className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative h-44 overflow-hidden bg-forest-deep">
            <img src={position.image} alt="" className="h-full w-full object-cover opacity-50" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-forest-foreground sm:p-8">
              <p className="font-mono text-xs text-accent">JOB-{position.id.padStart(3, "0")} · {department.name}</p>
              <h3 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{position.title}</h3>
            </div>
          </div>
          <div className="space-y-10 p-6 sm:p-10">
            {sections.length === 0 && <p className="text-muted-foreground">Full details are on the application page.</p>}
            {sections.map((s) => (
              <section key={s.title}>
                <h4 className="flex items-center gap-3 text-xl font-bold">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  {s.title}
                </h4>
                <div className="mt-5">
                  <RichText text={s.text} />
                </div>
              </section>
            ))}
            {truncated && (
              <p className="rounded-2xl bg-secondary px-5 py-4 text-sm text-muted-foreground">
                Some details are shortened here — the complete job description is shown when you apply.
              </p>
            )}
          </div>
        </article>

        <aside data-item className="lg:sticky lg:top-6 lg:self-start">
          <div className="relative isolate overflow-hidden rounded-3xl bg-forest-deep p-8 text-forest-foreground ring-1 ring-accent/25">
            <div aria-hidden className="absolute inset-0 -z-10 bg-tech-grid-fine" />
            <div aria-hidden className="absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-accent/25 blur-3xl" />
            <Briefcase className="h-8 w-8 text-accent" />
            <h4 className="mt-5 text-2xl font-bold">Interested in this role?</h4>
            <p className="mt-3 text-sm leading-relaxed text-forest-foreground/70">
              You'll fill in your application on our HR portal. It takes a few minutes.
            </p>
            {href ? (
              <Button asChild variant="lime" size="xl" className="mt-7 w-full">
                <a href={href} target="_blank" rel="noopener noreferrer">
                  Apply now <ArrowUpRight />
                </a>
              </Button>
            ) : null}
            <p className="mt-5 flex items-center gap-2 text-xs text-forest-foreground/60">
              <ShieldCheck className="h-4 w-4 text-accent" /> Secure connection to our HR portal
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

/** Renders feed text as React text nodes only — no HTML is ever injected. */
function RichText({ text }: { text: string }) {
  const blocks = useMemo(() => parseBlocks(text), [text]);
  return (
    <div className="space-y-4 leading-relaxed text-foreground/85">
      {blocks.map((b, i) =>
        b.type === "heading" ? (
          <p key={i} className="pt-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {b.text}
          </p>
        ) : b.type === "list" ? (
          <ul key={i} className="space-y-3">
            {b.items.map((it, j) => (
              <li key={j} className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent ring-2 ring-primary/30" />
                <div>
                  <span>{it.text}</span>
                  {it.sub.length > 0 && (
                    <ul className="mt-2 space-y-1.5 border-l border-border pl-4 text-muted-foreground">
                      {it.sub.map((s, k) => (
                        <li key={k}>{s}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p key={i}>{b.text}</p>
        ),
      )}
    </div>
  );
}

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <div data-item className="rounded-3xl border border-dashed border-primary/40 bg-card p-10 text-center">
      <Sparkles className="mx-auto h-8 w-8 text-primary" />
      <h3 className="mt-4 text-2xl font-bold">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">{body}</p>
      <Button asChild variant="ink" size="lg" className="mt-6">
        <a href={`mailto:${SALES_EMAIL}?subject=${encodeURIComponent("Job application")}`}>
          <Mail /> {SALES_EMAIL}
        </a>
      </Button>
    </div>
  );
}

/* ---------------- Why join ---------------- */

const perks = [
  { icon: Users, title: "Creative community", text: "Work alongside developers, designers and professionals who love what they build." },
  { icon: Layers, title: "Real public impact", text: "Ship websites and systems used by towns, agencies and businesses across the Philippines." },
  { icon: Sparkles, title: "Room to grow", text: "Learn new tools and take on bigger projects as you build your skills with us." },
];

function Perks() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
      <div data-reveal-group className="grid gap-6 md:grid-cols-3">
        {perks.map((p, i) => (
          <SpotlightCard key={p.title} className="rounded-3xl bg-forest-deep p-8 text-forest-foreground ring-1 ring-accent/15">
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <p.icon className="h-6 w-6" />
              </span>
              <span className="font-mono text-sm text-forest-foreground/40">[0{i + 1}]</span>
            </div>
            <h3 className="mt-6 text-xl font-bold">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-forest-foreground/70">{p.text}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
