import type { SoftwareProject, Website, WebsiteCategory } from "@/components/site/portfolio-data";

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

/** Websites in a category (or all), whose name, place or address contains the search text. */
export function filterWebsites(list: Website[], category: WebsiteCategory | undefined, query: string): Website[] {
  const q = norm(query);
  return list.filter(
    (w) => (!category || w.category === category) && (!q || norm(`${w.name} ${w.place} ${w.url}`).includes(q)),
  );
}

/** Client systems of one system type (or all), whose client or system name contains the search text. */
export function filterSoftware(list: SoftwareProject[], code: string | undefined, query: string): SoftwareProject[] {
  const q = norm(query);
  return list.filter(
    (s) => (!code || s.code === code) && (!q || norm(`${s.client} ${s.code} ${s.system}`).includes(q)),
  );
}

/** System types with how many clients use each, most-used first. */
export function systemCounts(list: SoftwareProject[]): { code: string; count: number }[] {
  const m = new Map<string, number>();
  for (const s of list) m.set(s.code, (m.get(s.code) ?? 0) + 1);
  return [...m.entries()].map(([code, count]) => ({ code, count })).sort((a, b) => b.count - a.count || a.code.localeCompare(b.code));
}
