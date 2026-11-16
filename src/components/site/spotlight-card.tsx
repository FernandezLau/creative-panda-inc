import type { HTMLAttributes, PointerEvent, ReactNode } from "react";

/** Card with a lime glow that follows the pointer (CSS vars --mx / --my feed the `spotlight` utility). */
export function SpotlightCard({
  className = "",
  children,
  decor,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { decor?: ReactNode }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div onPointerMove={onMove} className={`group relative overflow-hidden ${className}`} {...rest}>
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {decor}
      <div className="relative h-full">{children}</div>
    </div>
  );
}
