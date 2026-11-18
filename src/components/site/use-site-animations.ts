import { useEffect, type RefObject } from "react";

/**
 * Page-wide motion powered by Anime.js (https://animejs.com).
 * - [data-hero]        hero intro timeline (words, copy, buttons, stats)
 * - [data-count]       numbers that count up in the hero
 * - [data-float]       glowing dots that drift in the hero
 * - [data-reveal]      fade/rise when scrolled into view
 * - [data-reveal-group] children rise one after another when scrolled into view
 * Anime.js is loaded inside the effect so it never runs during server rendering.
 */
export function useSiteAnimations(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    void import("animejs").then(({ animate, createTimeline, stagger, utils }) => {
      if (cancelled) return;
      const running: { revert: () => unknown }[] = [];

      /* ---- Hero intro ---- */
      const hero = root.querySelector<HTMLElement>("[data-hero-scope]");
      if (hero) {
        hero.classList.add("anim-on");
        const tl = createTimeline({ defaults: { ease: "outExpo", duration: 1100 } });
        tl.add(hero.querySelectorAll("[data-hero='eyebrow']"), { opacity: [0, 1], x: [-30, 0] })
          .add(
            hero.querySelectorAll("[data-hero='word']"),
            { opacity: [0, 1], y: ["110%", "0%"], rotate: [6, 0], delay: stagger(70) },
            "-=900",
          )
          .add(hero.querySelectorAll("[data-hero='copy']"), { opacity: [0, 1], y: [30, 0] }, "-=800")
          .add(
            hero.querySelectorAll("[data-hero='cta']"),
            { opacity: [0, 1], y: [24, 0], scale: [0.9, 1], delay: stagger(90) },
            "-=900",
          )
          .add(
            hero.querySelectorAll("[data-hero='stat']"),
            { opacity: [0, 1], y: [30, 0], delay: stagger(110) },
            "-=900",
          );
        running.push(tl);

        hero.querySelectorAll<HTMLElement>("[data-count]").forEach((el, i) => {
          const end = Number(el.dataset['count']);
          const suffix = el.dataset['suffix'] ?? "";
          const counter = { v: end > 1000 ? end - 40 : 0 };
          running.push(
            animate(counter, {
              v: end,
              duration: 1800,
              delay: 700 + i * 120,
              ease: "outQuart",
              modifier: utils.round(0),
              onUpdate: () => {
                el.textContent = `${counter.v}${suffix}`;
              },
            }),
          );
        });

        hero.querySelectorAll<HTMLElement>("[data-float]").forEach((el, i) => {
          running.push(
            animate(el, {
              y: [0, utils.random(-40, -14)],
              x: [0, utils.random(-18, 18)],
              opacity: [0.25, 0.9],
              duration: utils.random(2600, 4200),
              delay: i * 180,
              alternate: true,
              loop: true,
              ease: "inOutSine",
            }),
          );
        });

        const glow = hero.querySelector<HTMLElement>("[data-hero-bg]");
        if (glow) {
          running.push(
            animate(glow, { scale: [1.08, 1], duration: 2400, ease: "outQuart" }),
          );
        }
      }

      /* ---- Scroll reveals ---- */
      const singles = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
      const groups = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-group]"));
      utils.set(singles, { opacity: 0, y: 40 });
      groups.forEach((g) => utils.set(Array.from(g.children), { opacity: 0, y: 50 }));

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            io.unobserve(el);
            if (el.hasAttribute("data-reveal-group")) {
              animate(Array.from(el.children), {
                opacity: [0, 1],
                y: [50, 0],
                delay: stagger(90),
                duration: 900,
                ease: "outExpo",
              });
            } else {
              animate(el, { opacity: [0, 1], y: [40, 0], duration: 1000, ease: "outExpo" });
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
      );
      [...singles, ...groups].forEach((el) => io.observe(el));

      cleanup = () => {
        io.disconnect();
        running.forEach((a) => a.revert());
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [rootRef]);
}

/**
 * Re-plays a short staggered rise on `[data-item]` children of `ref` whenever `key` changes
 * (filters, tabs, steps). Only the first `limit` items animate so long grids stay snappy.
 */
export function useStaggerIn(ref: RefObject<HTMLElement | null>, key: string, limit = 12) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    void import("animejs").then(({ animate, stagger }) => {
      if (cancelled) return;
      const items = Array.from(el.querySelectorAll<HTMLElement>("[data-item]")).slice(0, limit);
      if (items.length) animate(items, { opacity: [0, 1], y: [28, 0], delay: stagger(50), duration: 700, ease: "outExpo" });
    });
    return () => {
      cancelled = true;
    };
  }, [ref, key, limit]);
}
