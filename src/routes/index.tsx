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
} from "lucide-react";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import bambooHero from "@/assets/bamboo-hero.jpg";
import {
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
  return (
    <div className="min-h-screen overflow-x-hidden">
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

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-forest-foreground">
      <img
        src={bambooHero}
        alt=""
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-forest-fade" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-forest-overlay" />

      <Header />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10 lg:pb-32 lg:pt-24">
        <p className="eyebrow animate-rise text-accent">Web design & development · Est. 2006</p>
        <h1 className="animate-rise mt-6 max-w-4xl text-5xl font-bold leading-[0.95] sm:text-7xl lg:text-[6.5rem]">
          We grow websites that <span className="serif-accent text-accent">stand tall.</span>
        </h1>
        <p className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-forest-foreground/80 [animation-delay:150ms]">
          A Philippine creative studio building responsive, user-friendly and SEO-ready websites and
          systems for municipalities, national agencies and growing businesses.
        </p>
        <div className="animate-rise mt-10 flex flex-wrap gap-4 [animation-delay:250ms]">
          <Button asChild variant="lime" size="xl">
            <a href="#work">
              See our work <ArrowRight />
            </a>
          </Button>
          <Button asChild variant="ghostLight" size="xl">
            <a href="#about">Who are we?</a>
          </Button>
        </div>

        <dl className="mt-20 grid max-w-3xl grid-cols-3 gap-6 border-t border-forest-foreground/20 pt-8">
          {[
            ["2006", "Founded"],
            ["20 yrs", "Of crafting the web"],
            ["100%", "Responsive builds"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="font-display text-3xl font-bold sm:text-4xl">{v}</dt>
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
    <div className="border-b border-border bg-accent py-5 text-accent-foreground">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((c, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg font-semibold">
            {c}
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent-foreground" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- About ---------------- */

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-bold leading-[1.02] sm:text-6xl">{title}</h2>
      {children && <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-12 lg:px-10">
      <div className="lg:col-span-5">
        <p className="eyebrow text-primary">Who are we?</p>
        <h2 className="mt-4 text-4xl font-bold leading-[1.02] sm:text-6xl">
          From business cards to <span className="serif-accent text-primary">city portals.</span>
        </h2>
      </div>
      <div className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-7 lg:pt-10">
        <p className="font-display text-2xl font-medium leading-snug text-foreground">
          <em className="serif-accent text-primary">My Creative Panda</em> was established in 2006.
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
    <section id="services" className="bg-secondary py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead eyebrow="Services we offer" title={<>Where imagination takes <span className="serif-accent text-primary">vibrant form.</span></>}>
            Tailored services that turn your ideas into a digital home — welcome to endless creativity and
            limitless possibilities.
          </SectionHead>
          <Button asChild variant="ink" size="xl">
            <a href="https://mycreativepanda.com/services/">
              All services <ArrowRight />
            </a>
          </Button>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, body }, i) => (
            <article key={title} className="group relative bg-card p-8 transition-colors hover:bg-forest hover:text-forest-foreground lg:p-10">
              <span className="font-display text-sm font-semibold text-muted-foreground group-hover:text-accent">
                0{i + 1}
              </span>
              <Icon className="mt-8 h-9 w-9 text-primary transition-colors group-hover:text-accent" strokeWidth={1.6} />
              <h3 className="mt-6 text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-muted-foreground group-hover:text-forest-foreground/75">{body}</p>
            </article>
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
    <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 lg:grid-cols-2 lg:px-10">
      <div className="relative">
        <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-accent" aria-hidden />
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="ml-3 truncate text-xs text-muted-foreground">talibon.gov.ph</span>
          </div>
          <img src={projects[0].img} alt="Municipality of Talibon website" loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
        </div>
        <div className="absolute -bottom-10 right-6 w-32 overflow-hidden rounded-2xl border-4 border-foreground bg-card shadow-lift sm:w-40">
          <img src={projects[4].img} alt="National Academy of Sports website on mobile" loading="lazy" className="aspect-[9/16] w-full object-cover object-left-top" />
        </div>
      </div>

      <div>
        <SectionHead eyebrow="Built for every screen" title={<>Digital experiences that <span className="serif-accent text-primary">adapt to you.</span></>}>
          From smartphones to desktops, every site we ship adapts flawlessly to the screen — easy
          navigation and visually stunning content, wherever your visitors are.
        </SectionHead>
        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {feats.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 font-semibold">
              <Icon className="h-5 w-5 text-primary" /> {label}
            </li>
          ))}
        </ul>
        <blockquote className="mt-10 border-l-4 border-accent pl-6 font-serif text-3xl italic leading-snug">
          “We make the best output for your website!”
        </blockquote>
      </div>
    </section>
  );
}

/* ---------------- Work ---------------- */

function Work() {
  const [featured, ...rest] = projects;
  return (
    <section id="work" className="bg-forest-deep py-28 text-forest-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow text-accent">Latest website projects</p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.02] sm:text-6xl">
              Proudly powering towns <span className="serif-accent text-accent">across the islands.</span>
            </h2>
          </div>
          <Button asChild variant="lime" size="xl">
            <a href="https://mycreativepanda.com/portfolio/">
              See all portfolio <ArrowRight />
            </a>
          </Button>
        </div>

        <ProjectCard p={featured} large />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      className={`group block overflow-hidden rounded-3xl border border-forest-foreground/15 bg-forest transition-transform hover:-translate-y-1 ${large ? "mt-16" : ""}`}
    >
      <div className="overflow-hidden">
        <img
          src={p.img}
          alt={`${p.name} website`}
          loading="lazy"
          className={`w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 ${large ? "aspect-[21/9]" : "aspect-[16/10]"}`}
        />
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
    <section id="systems" className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <SectionHead eyebrow="Trusted partnerships" title={<>Systems that keep <span className="serif-accent text-primary">institutions running.</span></>}>
        We proudly introduce the partners who have been instrumental in our journey and continue to
        contribute to our shared success.
      </SectionHead>
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {systems.map((s) => (
          <figure key={s.name} className="group">
            <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-card">
              <img src={s.img} alt={`${s.name} system`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            </div>
            <figcaption className="mt-4 font-display text-lg font-semibold leading-tight">{s.name}</figcaption>
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
    <section className="bg-accent py-28 text-accent-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow">Why My Creative Panda</p>
        <h2 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.02] sm:text-6xl">
          The myriad benefits of <span className="serif-accent">choosing the panda.</span>
        </h2>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-3xl bg-background p-8 text-foreground shadow-lift">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest text-accent">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-8 text-2xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
            </article>
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
        <SectionHead eyebrow="Greetings for our clients" title={<>Video greetings, <span className="serif-accent text-primary">brought to life.</span></>}>
          A visual treat from the Creative Panda team, made for our esteemed clients to spark imagination
          and leave everyone inspired.
        </SectionHead>
        <Button asChild variant="ink" size="xl">
          <a href={YOUTUBE_URL} target="_blank" rel="noreferrer">
            Watch on YouTube <Play />
          </a>
        </Button>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {greetings.map((g) => (
          <a key={g.name} href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-3xl bg-forest">
            <img src={g.img} alt={`${g.name} video greeting`} loading="lazy" className="aspect-[4/5] w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-forest-overlay opacity-80" />
            <span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:scale-110">
              <Play className="h-5 w-5 fill-current" />
            </span>
            <h3 className="absolute bottom-5 left-5 right-5 text-xl font-bold text-forest-foreground">{g.name}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Join + support ---------------- */

function JoinAndSupport() {
  return (
    <section id="careers" className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="flex flex-col justify-between rounded-[2rem] border border-border bg-secondary p-10 lg:p-14">
          <div>
            <p className="eyebrow text-primary">Careers</p>
            <h3 className="mt-4 text-4xl font-bold">Join our community.</h3>
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

        <article id="contact" className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-forest p-10 text-forest-foreground lg:p-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-2xl" aria-hidden />
          <div className="relative">
            <p className="eyebrow text-accent">Support & projects</p>
            <h3 className="mt-4 text-4xl font-bold">Looking for support?</h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-forest-foreground/75">
              Reliable IT infrastructure is vital to your success. We work closely with you to design
              custom solutions that match your goals and boost efficiency.
            </p>
          </div>
          <div className="relative mt-10 flex flex-wrap gap-4">
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

function Footer() {
  return (
    <footer className="bg-forest-deep text-forest-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-20 lg:px-10">
        <p className="font-display text-[14vw] font-extrabold leading-none tracking-tighter text-forest-foreground/10 lg:text-[11rem]">
          creative panda
        </p>
        <div className="flex flex-col gap-8 border-t border-forest-foreground/15 py-10 md:flex-row md:items-center md:justify-between">
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
