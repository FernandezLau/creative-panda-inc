import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Landmark,
  Database,
  Palette,
  Search,
  LifeBuoy,
  Smartphone,
  MousePointerClick,
  TrendingUp,
  MessageCircle,
  Target,
  Wallet,
  Play,
  Mail,
  Lock,
  Terminal,
  Cpu,
} from "lucide-react";

import { useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import digitalHero from "@/assets/digital-hero.jpg";
import { useSiteAnimations } from "@/components/site/use-site-animations";
import { SpotlightCard } from "@/components/site/spotlight-card";
import {
  GREETING_COVER,
  LOGO_URL,
  SALES_EMAIL,
  YOUTUBE_URL,
  clients,
  greetings,
  nav,
  projects,
  systems,
} from "@/components/site/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Creative Panda — Websites for Philippine Towns & Brands" },
      {
        name: "description",
        content:
          "Since 2006, My Creative Panda designs and builds responsive, SEO-friendly websites and systems for LGUs, agencies and businesses across the Philippines.",
      },
      { property: "og:title", content: "My Creative Panda — Websites for Philippine Towns & Brands" },
      {
        property: "og:description",
        content:
          "Responsive websites, government portals and custom systems — crafted by a Philippine studio since 2006.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSiteAnimations(rootRef);
  return (
    <div ref={rootRef} className="min-h-screen overflow-x-hidden">
      <Hero />
      <ClientMarquee />
      <About />
      <Services />
      <Responsive />
      <Work />
      <Systems />
      <WhyUs />
      <Greetings />
      <JoinAndSupport />
      <Footer />
    </div>
  );
}

/* ---------------- Header + Hero ---------------- */

function Header() {
  return (
    <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
      <a href="#" className="flex items-center gap-3">
        <img src={LOGO_URL} alt="My Creative Panda logo" width={44} height={44} className="h-11 w-11 rounded-full bg-forest-foreground p-0.5" />
        <span className="font-display text-lg font-bold tracking-tight text-forest-foreground">
          My Creative Panda
        </span>
      </a>
      <nav className="hidden items-center gap-8 md:flex">
        {nav.map((n) => (
          <a key={n.href} href={n.href} className="text-sm font-medium text-forest-foreground/80 transition-colors hover:text-accent">
            {n.label}
          </a>
        ))}
      </nav>
      <Button asChild variant="lime" size="lg">
        <a href="#contact">Contact us</a>
      </Button>
    </header>
  );
}

const heroWords = ["We", "grow", "websites", "that"];
const heroAccent = ["stand", "tall."];
const floaters = [
  "left-[8%] top-[30%]",
  "left-[22%] top-[72%]",
  "left-[46%] top-[18%]",
  "left-[58%] top-[64%]",
  "left-[72%] top-[34%]",
  "left-[86%] top-[78%]",
  "left-[92%] top-[22%]",
];

function Hero() {
  return (
    <section data-hero-scope className="relative isolate overflow-hidden bg-forest-deep text-forest-foreground">
      <img
        data-hero-bg
        src={digitalHero}
        alt=""
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 -z-10 bg-forest-fade" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-forest-overlay" />
      <div className="absolute inset-0 -z-10 bg-tech-grid opacity-40" aria-hidden />
      {floaters.map((pos) => (
        <span
          key={pos}
          data-float
          aria-hidden
          className={`pointer-events-none absolute -z-10 h-2 w-2 rounded-full bg-accent shadow-lime ${pos}`}
        />
      ))}

      <Header />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10 lg:pb-32 lg:pt-24">
        <p data-hero="eyebrow" className="eyebrow text-accent">
          Web design & development · Est. 2006
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.02] sm:text-7xl lg:text-[5.75rem]">
          {heroWords.map((w) => (
            <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span data-hero="word" className="inline-block">
                {w}
              </span>
            </span>
          ))}
          {heroAccent.map((w) => (
            <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span data-hero="word" className="accent-italic inline-block text-accent">
                {w}
              </span>
            </span>
          ))}
        </h1>
        <p data-hero="copy" className="mt-8 max-w-xl text-lg leading-relaxed text-forest-foreground/80">
          A Philippine creative studio building responsive, user-friendly and SEO-ready websites and
          systems for municipalities, national agencies and growing businesses.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild variant="lime" size="xl" data-hero="cta">
            <a href="#work">
              See our work <ArrowRight />
            </a>
          </Button>
          <Button asChild variant="ghostLight" size="xl" data-hero="cta">
            <a href="#about">Who are we?</a>
          </Button>
        </div>

        <dl className="mt-20 grid max-w-3xl grid-cols-3 gap-6 border-t border-forest-foreground/20 pt-8">
          {[
            { v: 2006, s: "", l: "Founded" },
            { v: 20, s: " yrs", l: "Of crafting the web" },
            { v: 100, s: "%", l: "Responsive builds" },
          ].map(({ v, s, l }) => (
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

function ClientMarquee() {
  const row = [...clients, ...clients];
  return (
    <div className="relative border-y border-accent/30 bg-forest py-5 text-forest-foreground">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-accent/60" />
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((c, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg font-semibold">
            {c}
            <span aria-hidden className="h-2 w-2 rotate-45 bg-accent shadow-lime" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Shared bits ---------------- */

function TechTag({ children, index, dark }: { children: ReactNode; index?: string | undefined; dark?: boolean | undefined }) {
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

function SectionHead({
  eyebrow,
  index,
  title,
  dark,
  children,
}: {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <div data-reveal className="max-w-3xl">
      <TechTag index={index} dark={dark}>
        {eyebrow}
      </TechTag>
      <h2 className="mt-6 text-4xl font-bold leading-[1.02] sm:text-6xl">{title}</h2>
      {children && (
        <p className={`mt-6 text-lg leading-relaxed ${dark ? "text-forest-foreground/70" : "text-muted-foreground"}`}>
          {children}
        </p>
      )}
    </div>
  );
}

function Corners() {
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

function BrowserBar({ url, dark }: { url: string; dark?: boolean }) {
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

const host = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

/* ---------------- About ---------------- */

function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-circuit-light" />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <div data-reveal>
            <TechTag index="01">Who are we?</TechTag>
            <h2 className="mt-6 text-4xl font-bold leading-[1.02] sm:text-6xl">
              From business cards to <span className="accent-italic text-primary">city portals.</span>
            </h2>
          </div>

          <div data-reveal className="mt-10 overflow-hidden rounded-2xl border border-forest bg-forest-deep text-forest-foreground shadow-lift">
            <div className="flex items-center gap-1.5 border-b border-forest-foreground/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-chart-4/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="ml-3 flex items-center gap-1.5 text-xs text-forest-foreground/60">
                <Terminal className="h-3.5 w-3.5" /> panda.config
              </span>
            </div>
            <div data-reveal-group className="space-y-1.5 p-6 text-sm leading-relaxed sm:text-base">
              <p>
                <span className="text-accent">const</span> panda = {"{"}
              </p>
              <p className="pl-6">
                founded: <span className="text-accent">2006</span>,
              </p>
              <p className="pl-6">
                home: <span className="text-chart-4">"Philippines"</span>,
              </p>
              <p className="pl-6">
                builds: [<span className="text-chart-4">"websites"</span>, <span className="text-chart-4">"portals"</span>,{" "}
                <span className="text-chart-4">"systems"</span>],
              </p>
              <p className="pl-6">
                clients: <span className="text-chart-4">"happy"</span>,
              </p>
              <p>
                {"}"}
                <span aria-hidden className="ml-1 inline-block h-4 w-2 animate-blink bg-accent align-middle" />
              </p>
            </div>
          </div>
        </div>

        <div data-reveal-group className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-7 lg:pt-20">
          <p className="font-display text-2xl font-medium leading-snug text-foreground">
            <em className="accent-italic text-primary">My Creative Panda</em> was established in 2006.
          </p>
          <p>
            A dream that started by accepting small projects — logo designs, website templates, business
            cards, flyers, postcards. One thing led to the other, and we realised we were taking on bigger
            projects.
          </p>
          <p>
            Our clients were so happy with our service that they recommended us to their friends. That's
            what keeps us pursuing what we wanted in the first place.
          </p>
          <a href="https://mycreativepanda.com/about-us/" className="inline-flex items-center gap-2 font-semibold text-foreground underline decoration-accent decoration-4 underline-offset-8 hover:text-primary">
            Read our story <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */

const services = [
  { icon: Code2, title: "Website design & development", body: "Custom, fast websites built to grow with your organisation." },
  { icon: Landmark, title: "Government web portals", body: "Transparency-ready LGU and agency sites citizens can actually use." },
  { icon: Database, title: "Custom systems", body: "HR, records and online services — tailored information systems." },
  { icon: Palette, title: "Branding & graphic design", body: "Logos, print and visual identities, where it all began for us." },
  { icon: Search, title: "SEO & visibility", body: "Clean structure and content that helps people find you." },
  { icon: LifeBuoy, title: "IT support", body: "Reliable infrastructure aligned with your business goals." },
];

function Services() {
  return (
    <section id="services" className="relative isolate overflow-hidden bg-forest-deep py-28 text-forest-foreground">
      <div aria-hidden className="absolute inset-0 -z-10 bg-tech-grid-fine" />
      <div aria-hidden className="absolute -right-40 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl" />
      <div aria-hidden className="absolute -left-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead dark index="02" eyebrow="Services we offer" title={<>Where imagination takes <span className="accent-italic text-accent text-glow">vibrant form.</span></>}>
            Tailored services that turn your ideas into a digital home — welcome to endless creativity and
            limitless possibilities.
          </SectionHead>
          <Button asChild variant="lime" size="xl">
            <a href="https://mycreativepanda.com/services/">
              All services <ArrowRight />
            </a>
          </Button>
        </div>

        <div data-reveal-group className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, body }, i) => (
            <SpotlightCard
              key={title}
              decor={<Corners />}
              className="rounded-2xl border border-forest-foreground/10 bg-forest/60 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lime lg:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/30 transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <span className="font-display text-sm font-semibold tabular-nums text-forest-foreground/40 group-hover:text-accent">
                  [0{i + 1}]
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-forest-foreground/65">{body}</p>
              <div className="mt-8 h-px w-full bg-forest-foreground/10">
                <div className="h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Responsive ---------------- */

function Responsive() {
  const feats = [
    { icon: Smartphone, label: "100% Responsive" },
    { icon: MousePointerClick, label: "User friendly" },
    { icon: TrendingUp, label: "SEO friendly" },
  ];
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-circuit-light" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 lg:grid-cols-2 lg:px-10">
        <div data-reveal className="relative">
          <div aria-hidden className="absolute -left-10 -top-10 h-56 w-56 animate-spin-slow rounded-full border-2 border-dashed border-primary/30" />
          <div aria-hidden className="absolute -left-4 -top-4 h-44 w-44 rounded-full bg-accent/60 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <BrowserBar url="talibon.gov.ph" />
            <div className="relative overflow-hidden">
              <img src={projects[0].img} alt="Municipality of Talibon website" loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
              <div aria-hidden className="absolute inset-x-0 top-0 h-1/6 animate-scan scan-beam" />
            </div>
          </div>
          <div className="absolute -bottom-10 right-6 w-32 overflow-hidden rounded-2xl border-4 border-foreground bg-card shadow-lift sm:w-40">
            <img src={projects[4].img} alt="National Academy of Sports website on mobile" loading="lazy" className="aspect-[9/16] w-full object-cover object-left-top" />
          </div>
          <div className="absolute -left-4 bottom-8 flex items-center gap-2 rounded-full bg-forest-deep px-4 py-2 text-xs font-semibold text-forest-foreground shadow-lift">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            Live · Mobile ready
          </div>
        </div>

        <div>
          <SectionHead index="03" eyebrow="Built for every screen" title={<>Digital experiences that <span className="accent-italic text-primary">adapt to you.</span></>}>
            From smartphones to desktops, every site we ship adapts flawlessly to the screen — easy
            navigation and visually stunning content, wherever your visitors are.
          </SectionHead>
          <ul data-reveal-group className="mt-10 grid gap-3 sm:grid-cols-3">
            {feats.map(({ icon: Icon, label }) => (
              <li key={label} className="group flex flex-col gap-3 rounded-2xl border border-border bg-card px-4 py-5 font-semibold transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-forest text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                {label}
              </li>
            ))}
          </ul>
          <blockquote data-reveal className="mt-10 border-l-4 border-accent pl-6 text-3xl font-light italic leading-snug">
            “We make the best output for your website!”
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Work ---------------- */

function Work() {
  const [featured, ...rest] = projects;
  return (
    <section id="work" className="relative isolate overflow-hidden bg-forest-deep py-28 text-forest-foreground">
      <div aria-hidden className="absolute inset-0 -z-10 bg-tech-grid-fine" />
      <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead dark index="04" eyebrow="Latest website projects" title={<>Proudly powering towns <span className="accent-italic text-accent text-glow">across the islands.</span></>} />
          <Button asChild variant="lime" size="xl">
            <a href="https://mycreativepanda.com/portfolio/">
              See all portfolio <ArrowRight />
            </a>
          </Button>
        </div>

        <div data-reveal>
          <ProjectCard p={featured} large />
        </div>
        <div data-reveal-group className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, large }: { p: (typeof projects)[number]; large?: boolean }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      className={`group block overflow-hidden rounded-2xl border border-forest-foreground/15 bg-forest transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lime ${large ? "mt-16" : ""}`}
    >
      <BrowserBar url={host(p.url)} dark />
      <div className="relative overflow-hidden">
        <img
          src={p.img}
          alt={`${p.name} website`}
          loading="lazy"
          className={`w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 ${large ? "aspect-[21/9]" : "aspect-[16/10]"}`}
        />
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/4 scan-beam opacity-0 transition-opacity group-hover:animate-scan group-hover:opacity-100" />
      </div>
      <div className="flex items-center justify-between gap-4 p-5">
        <div>
          <h3 className={`font-bold ${large ? "text-2xl sm:text-3xl" : "text-lg"}`}>{p.name}</h3>
          <p className="text-sm text-forest-foreground/60">{p.place}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest-foreground/10 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

/* ---------------- Systems / partners ---------------- */

function Systems() {
  return (
    <section id="systems" className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-circuit-light" />
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <SectionHead index="05" eyebrow="Trusted partnerships" title={<>Systems that keep <span className="accent-italic text-primary">institutions running.</span></>}>
          We proudly introduce the partners who have been instrumental in our journey and continue to
          contribute to our shared success.
        </SectionHead>
        <div data-reveal-group className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {systems.map((s, i) => (
            <figure key={s.name} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5 text-xs font-semibold">
                <span className="flex items-center gap-2 text-primary">
                  <Cpu className="h-3.5 w-3.5" /> SYS-0{i + 1}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Partner system
                </span>
              </div>
              <div className="relative overflow-hidden bg-muted">
                <img src={s.img} alt={`${s.name} system`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div aria-hidden className="absolute inset-0 bg-forest-deep/0 transition-colors duration-300 group-hover:bg-forest-deep/10" />
              </div>
              <figcaption className="p-5 font-display text-lg font-semibold leading-tight">{s.name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-14">
          <Button asChild variant="ink" size="xl">
            <a href="https://mycreativepanda.com/portfolio/">
              View all our partners <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why us ---------------- */

function WhyUs() {
  const items = [
    { icon: MessageCircle, title: "Advice solutions", body: "We offer free consultation — especially if you're just making a name for yourself on the World Wide Web." },
    { icon: Target, title: "#1 goal", body: "Keeping our clients happy is our number one goal. It matters that you can trust us with your project." },
    { icon: Wallet, title: "Affordable rates", body: "We keep our costs low and our talent high, so you pay for great results." },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-accent py-28 text-accent-foreground">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-ink" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p data-reveal className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-accent-foreground/25 px-3.5 py-1.5">
          <span className="h-2 w-2 rounded-full bg-accent-foreground" /> 06 / Why My Creative Panda
        </p>
        <h2 data-reveal className="mt-6 max-w-4xl text-4xl font-bold leading-[1.02] sm:text-6xl">
          The myriad benefits of <span className="accent-italic">choosing the panda.</span>
        </h2>
        <div data-reveal-group className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, body }, i) => (
            <SpotlightCard key={title} decor={<Corners />} className="rounded-3xl bg-forest-deep p-8 text-forest-foreground shadow-lift transition-transform duration-300 hover:-translate-y-1.5">
              <div className="flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-lime">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-outline font-display text-6xl font-extrabold leading-none">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-2xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-forest-foreground/70">{body}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Greetings ---------------- */

function Greetings() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHead index="07" eyebrow="Greetings for our clients" title={<>Video greetings, <span className="accent-italic text-primary">brought to life.</span></>}>
          A visual treat from the Creative Panda team, made for our esteemed clients to spark imagination
          and leave everyone inspired.
        </SectionHead>
        <Button asChild variant="ink" size="xl">
          <a href={YOUTUBE_URL} target="_blank" rel="noreferrer">
            Watch on YouTube <Play />
          </a>
        </Button>
      </div>
      <div data-reveal-group className="mt-16 grid items-stretch gap-6 lg:grid-cols-5">
        <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-3xl bg-forest ring-1 ring-border transition-shadow hover:glow-ring lg:col-span-3">
          <img src={GREETING_COVER} alt="Collage of client video greetings" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute left-6 top-6 grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-foreground shadow-lime transition-transform group-hover:scale-110">
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-accent/50" />
            <Play className="relative h-6 w-6 fill-current" />
          </span>
          <span className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-forest-deep/85 px-4 py-2 text-xs font-semibold text-forest-foreground backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-destructive" /> REC · Client greetings
          </span>
        </a>
        <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card lg:col-span-2">
          {greetings.map((g, i) => (
            <li key={g} className="flex-1">
              <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="group flex h-full items-center justify-between gap-4 px-8 py-7 transition-colors hover:bg-forest-deep hover:text-forest-foreground">
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-sm text-muted-foreground group-hover:text-accent">0{i + 1}</span>
                  <span className="font-display text-2xl font-bold">{g}</span>
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-accent transition-all group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Play className="h-4 w-4 fill-current" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Join + support ---------------- */

function JoinAndSupport() {
  return (
    <section id="careers" className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
      <div data-reveal-group className="grid gap-6 lg:grid-cols-2">
        <article className="relative isolate flex flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-secondary p-10 lg:p-14">
          <div aria-hidden className="absolute inset-0 -z-10 bg-circuit-light" />
          <div>
            <TechTag index="08">Careers</TechTag>
            <h3 className="mt-6 text-4xl font-bold">Join our community.</h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              We'd love you to join our vibrant, imaginative community of developers and professionals.
              We believe in the power of creativity to produce outstanding work for our clients.
            </p>
          </div>
          <div className="mt-10">
            <Button asChild variant="ink" size="xl">
              <a href="https://mycreativepanda.com/career/">
                See open roles <ArrowRight />
              </a>
            </Button>
          </div>
        </article>

        <article id="contact" className="relative isolate flex flex-col justify-between overflow-hidden rounded-[2rem] bg-forest-deep p-10 text-forest-foreground ring-1 ring-accent/20 lg:p-14">
          <div aria-hidden className="absolute inset-0 -z-10 bg-tech-grid-fine" />
          <div aria-hidden className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
          <div>
            <TechTag dark index="09">Support & projects</TechTag>
            <h3 className="mt-6 text-4xl font-bold">Looking for support?</h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-forest-foreground/75">
              Reliable IT infrastructure is vital to your success. We work closely with you to design
              custom solutions that match your goals and boost efficiency.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="lime" size="xl">
              <a href={`mailto:${SALES_EMAIL}`}>
                <Mail /> {SALES_EMAIL}
              </a>
            </Button>
            <Button asChild variant="ghostLight" size="xl">
              <a href="https://mycreativepanda.com/contact-us/">Contact page</a>
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

const Letters = ({ text, className }: { text: string; className: string }) => (
  <span data-reveal-group className="block">
    {Array.from(text).map((ch, i) => (
      <span key={i} className={`inline-block ${className}`}>
        {ch === " " ? "\u00A0" : ch}
      </span>
    ))}
  </span>
);

function Footer() {
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
              <a key={n.href} href={n.href} className="text-forest-foreground/70 hover:text-accent">
                {n.label}
              </a>
            ))}
            <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="text-forest-foreground/70 hover:text-accent">
              YouTube
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
