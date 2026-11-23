import { Link, createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Boxes, Mail, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter, TechTag } from "@/components/site/site-chrome";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { BrowserBar, Corners, host } from "@/components/site/tech-bits";
import { useSiteAnimations } from "@/components/site/use-site-animations";
import { SALES_EMAIL } from "@/components/site/data";
import { products, softwareProjects, type Product } from "@/components/site/portfolio-data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Government & Business Systems | My Creative Panda" },
      {
        name: "description",
        content:
          "EBIS, EBPLS, ELIS, EHRIS, EWBS and more — ready-to-deploy information systems for barangays, LGUs, cooperatives, schools and businesses.",
      },
      { property: "og:title", content: "Products — Government & Business Systems | My Creative Panda" },
      {
        property: "og:description",
        content: "Ready-to-deploy systems for records, permits, HR, billing, logistics and more. Try the live demos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

/** How many client deployments each product has in the software portfolio. */
const clientsUsing = (code: string) => softwareProjects.filter((s) => s.code === code).length;

function ProductsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSiteAnimations(rootRef);
  const demos = products.filter((p) => p.demoUrl).length;
  return (
    <div ref={rootRef} className="min-h-screen overflow-x-hidden">
      <PageHero
        eyebrow="Products & systems"
        words={["Transforming", "ideas", "into"]}
        accent={["reality."]}
        copy="One innovation at a time. Discover our range of systems designed to simplify work and enhance service — from cutting-edge tech solutions to elegant designs, crafted with care for your everyday operations."
        actions={
          <>
            <Button asChild variant="lime" size="xl" data-hero="cta">
              <a href="#catalog">
                Explore systems <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="ghostLight" size="xl" data-hero="cta">
              <Link to="/portfolio" search={{ view: "software" }}>
                See client deployments
              </Link>
            </Button>
          </>
        }
        stats={[
          { v: products.length, l: "Ready-made systems" },
          { v: demos, l: "Live demos" },
          { v: softwareProjects.length, l: "Client deployments" },
          { v: 2006, l: "Building since" },
        ]}
      />
      <Catalog />
      <Cta />
      <SiteFooter />
    </div>
  );
}

function Catalog() {
  const [first, second, ...rest] = products;
  return (
    <section id="catalog" className="relative isolate scroll-mt-4 overflow-hidden py-24">
      <div aria-hidden className="absolute inset-0 -z-10 bg-circuit-light" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div data-reveal className="max-w-3xl">
          <TechTag>System catalog</TechTag>
          <h2 className="mt-6 text-4xl font-bold leading-[1.02] sm:text-6xl">
            Built for the way <span className="accent-italic text-primary">public service works.</span>
          </h2>
        </div>

        <div data-reveal-group className="mt-14 grid gap-6 lg:grid-cols-2">
          {first && <ProductCard p={first} index={0} featured />}
          {second && <ProductCard p={second} index={1} featured />}
        </div>
        <div data-reveal-group className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <ProductCard key={p.code} p={p} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, index, featured }: { p: Product; index: number; featured?: boolean }) {
  const used = clientsUsing(p.code);
  return (
    <SpotlightCard
      decor={<Corners />}
      className="flex flex-col rounded-3xl bg-forest-deep text-forest-foreground ring-1 ring-forest-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lime hover:ring-accent/50"
    >
      <div className="flex h-full flex-col">
        <div className="m-3 mb-0 overflow-hidden rounded-2xl ring-1 ring-forest-foreground/10">
          <BrowserBar url={p.demoUrl ? host(p.demoUrl) : `${p.code.toLowerCase()}.mycreativepanda.ph`} dark />
          <div className="relative overflow-hidden bg-forest">
            <img
              src={p.img}
              alt={`${p.name} (${p.code}) screen`}
              loading="lazy"
              decoding="async"
              className={`w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}
            />
            <div aria-hidden className="absolute inset-x-0 top-0 h-1/4 scan-beam opacity-0 transition-opacity group-hover:animate-scan group-hover:opacity-100" />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-7">
          <div className="flex items-start justify-between gap-4">
            <p className={`font-display font-extrabold leading-none tracking-tight text-accent text-glow ${featured ? "text-5xl" : "text-4xl"}`}>{p.code}</p>
            <span className="font-mono text-sm text-forest-foreground/40">[{String(index + 1).padStart(2, "0")}]</span>
          </div>
          <h3 className={`mt-3 font-bold leading-snug ${featured ? "text-2xl" : "text-lg"}`}>{p.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-forest-foreground/70">{p.description}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-forest-foreground/10 pt-5">
            {used > 0 ? (
              <Link
                to="/portfolio"
                search={{ view: "software", sys: p.code }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-forest-foreground/70 hover:text-accent"
              >
                <Users className="h-4 w-4 text-accent" /> Used by {used} {used === 1 ? "client" : "clients"}
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 text-xs text-forest-foreground/50">
                <ShieldCheck className="h-4 w-4" /> Ready to deploy
              </span>
            )}
            {p.demoUrl ? (
              <Button asChild variant="lime" size="sm" className="rounded-full px-4">
                <a href={p.demoUrl} target="_blank" rel="noopener noreferrer">
                  Visit demo <ArrowUpRight />
                </a>
              </Button>
            ) : (
              <Button asChild variant="ghostLight" size="sm" className="px-4">
                <a href={`mailto:${SALES_EMAIL}?subject=${encodeURIComponent(`${p.code} demo request`)}`}>Request a demo</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

function Cta() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
      <div data-reveal className="relative isolate overflow-hidden rounded-[2rem] border border-border bg-secondary p-10 lg:p-16">
        <div aria-hidden className="absolute inset-0 -z-10 bg-circuit-light" />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <TechTag>Custom builds</TechTag>
            <h2 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
              Need a system <span className="accent-italic text-primary">made for you?</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              We tailor each system to your office's process — tell us what you need and we'll show you a demo.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="ink" size="xl">
              <a href={`mailto:${SALES_EMAIL}?subject=${encodeURIComponent("System inquiry")}`}>
                <Mail /> {SALES_EMAIL}
              </a>
            </Button>
            <Button asChild variant="outline" size="xl" className="rounded-full bg-transparent font-semibold">
              <Link to="/portfolio">
                <Boxes /> View portfolio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
