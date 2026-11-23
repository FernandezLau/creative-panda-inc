import { Link, createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  Code2,
  LifeBuoy,
  MessageCircle,
  Palette,
  ShieldCheck,
  Target,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter, TechTag } from "@/components/site/site-chrome";
import { useSiteAnimations } from "@/components/site/use-site-animations";
import { clients, projects, SALES_EMAIL, systems } from "@/components/site/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About My Creative Panda — Our Story" },
      {
        name: "description",
        content:
          "Established in 2006, My Creative Panda grew from small creative projects into a Philippine studio building websites, portals and custom systems.",
      },
      { property: "og:title", content: "About My Creative Panda — Our Story" },
      {
        property: "og:description",
        content: "A creative studio helping clients grow through thoughtful design and technology since 2006.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: MessageCircle,
    title: "Advice that starts with listening",
    body: "We offer a thoughtful first conversation, learn what you are trying to achieve, and help shape a practical direction.",
  },
  {
    icon: Target,
    title: "Your success is the goal",
    body: "We keep your business and marketing goals in view throughout the project, and work to earn the trust you place in us.",
  },
  {
    icon: Wallet,
    title: "Great work at fair rates",
    body: "We keep our costs focused and our talent strong, so you get capable solutions without unnecessary overhead.",
  },
];

const processSteps = [
  {
    icon: ClipboardList,
    title: "Understand the need",
    body: "We discuss your goals, gather requirements, and check that the proposed solution is practical.",
  },
  {
    icon: Palette,
    title: "Plan the experience",
    body: "We map the scope and milestones, then shape the design and user experience around your audience.",
  },
  {
    icon: Code2,
    title: "Build together",
    body: "We develop in focused iterations, share progress, and use feedback to refine the work.",
  },
  {
    icon: ShieldCheck,
    title: "Test and launch",
    body: "We check the finished work, prepare the platform, and make sure everything is ready to go live.",
  },
  {
    icon: LifeBuoy,
    title: "Keep it working",
    body: "After launch, we can help with maintenance, updates, and technical support as your needs grow.",
  },
];

function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSiteAnimations(rootRef);

  return (
    <div ref={rootRef} className="min-h-screen overflow-x-hidden">
      <PageHero
        eyebrow="About My Creative Panda"
        words={["Creative work,", "built around"]}
        accent={["your goals."]}
        copy="Established in 2006, My Creative Panda has grown from small design projects into a Philippine studio building websites, portals and custom systems."
        actions={
          <>
            <Button asChild variant="lime" size="xl" data-hero="cta">
              <Link to="/portfolio">
                See our work <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="ghostLight" size="xl" data-hero="cta">
              <a href={`mailto:${SALES_EMAIL}`}>Talk to our team</a>
            </Button>
          </>
        }
        stats={[
          { v: 2006, l: "Established" },
          { v: projects.length, l: "Featured websites" },
          { v: systems.length, l: "Showcase systems" },
          { v: clients.length, l: "Clients & communities" },
        ]}
      />

      <section id="story" className="relative isolate overflow-hidden py-24">
        <div aria-hidden className="absolute inset-0 -z-10 bg-circuit-light" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div data-reveal>
            <TechTag>Our story</TechTag>
            <h2 className="mt-6 text-4xl font-bold leading-[1.02] sm:text-6xl">
              Small beginnings. <span className="accent-italic text-primary">Bigger possibilities.</span>
            </h2>
          </div>
          <div data-reveal-group className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p className="font-display text-2xl font-medium leading-snug text-foreground">
              My Creative Panda began with a simple idea: use creativity and technology to help people move
              forward.
            </p>
            <p>
              The journey started with small projects — logos, website templates, business cards, flyers and
              postcards. As clients recommended us to others, the work grew into larger websites and digital
              solutions.
            </p>
            <p>
              Today, we bring design and development together to create useful, engaging experiences. Whether
              you need a single site or a tailored system, we focus on your goals and build a solution that
              fits.
            </p>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-forest-deep py-24 text-forest-foreground">
        <div aria-hidden className="absolute inset-0 -z-10 bg-tech-grid-fine" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div data-reveal className="max-w-3xl">
            <TechTag dark>What guides us</TechTag>
            <h2 className="mt-6 text-4xl font-bold leading-[1.02] sm:text-6xl">
              Good work comes from <span className="accent-italic text-accent text-glow">good partnerships.</span>
            </h2>
          </div>
          <div data-reveal-group className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-3xl border border-forest-foreground/10 bg-forest-foreground/5 p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-lime">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed text-forest-foreground/70">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="relative isolate overflow-hidden py-24">
        <div aria-hidden className="absolute inset-0 -z-10 bg-circuit-light" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div data-reveal className="max-w-3xl">
            <TechTag>Our development process</TechTag>
            <h2 className="mt-6 text-4xl font-bold leading-[1.02] sm:text-6xl">
              From first conversation to <span className="accent-italic text-primary">ongoing support.</span>
            </h2>
          </div>
          <div data-reveal-group className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-bold">{title}</h3>
                </div>
                <p className="mt-4 leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div data-reveal className="flex flex-col gap-8 rounded-[2rem] bg-accent p-8 text-accent-foreground sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <TechTag>Have a project in mind?</TechTag>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Let’s build something that works for you.</h2>
          </div>
          <Button asChild variant="ink" size="xl">
            <Link to="/portfolio">
              Explore our work <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
