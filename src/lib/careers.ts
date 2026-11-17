import { z } from "zod";
import {
  CAREERS_APPLY_URL,
  DEFAULT_DEPARTMENT_IMAGE,
  departmentAliases,
  departmentImages,
} from "@/components/site/data";

/** A job opening, already cleaned: every field is plain text, never HTML. */
export type Position = {
  id: string;
  title: string;
  department: string;
  departmentSlug: string;
  image: string;
  qualification: string;
  requirements: string;
  responsibilities: string;
};

export type Department = { slug: string; name: string; image: string; positions: Position[] };

const MAX_POSITIONS = 200;
const MAX_FIELD = 6000;
const ID_RE = /^\d{1,9}$/;

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'" };

/** Strips tags, scripts and control characters so feed text can only ever render as text. */
export function cleanText(value: unknown, max = MAX_FIELD): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|li|div|h\d)>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&(amp|lt|gt|quot|apos|nbsp|#39);/g, (_, e: string) => ENTITIES[e] ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, max);
}

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "general";

const KEEP_UPPER = new Set(["I", "II", "III", "IV", "V", "HR", "IT", "OIC", "UI", "UX", "SEO", "IOS"]);
const SMALL = new Set(["and", "of", "the", "for", "to", "in"]);

/** "SENIOR SOFTWARE/WEB DEVELOPER (OIC)" → "Senior Software/Web Developer (OIC)" */
export function titleCase(s: string): string {
  let first = true;
  return s.replace(/[A-Za-z’']+/g, (w) => {
    const upper = w.toUpperCase();
    const lower = w.toLowerCase();
    const out = KEEP_UPPER.has(upper)
      ? upper
      : !first && SMALL.has(lower)
        ? lower
        : lower.charAt(0).toUpperCase() + lower.slice(1);
    first = false;
    return out;
  });
}

export function departmentImage(name: string): string {
  const upper = name.toUpperCase().trim();
  const hit = departmentImages.find((d) => upper.includes(d.match) || d.match.includes(upper));
  return hit?.img ?? DEFAULT_DEPARTMENT_IMAGE;
}

const rawItem = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  position: z.string().min(1),
  office: z.string().nullish(),
  departments: z.string().nullish(),
  qualification: z.string().nullish(),
  requirements: z.string().nullish(),
  responsibilities: z.string().nullish(),
});

/** Validates the HR feed. Anything malformed is dropped instead of reaching the page. */
export function normalizePositions(payload: unknown): Position[] {
  const outer = z.object({ data: z.array(z.unknown()) }).safeParse(payload);
  if (!outer.success) return [];
  const out: Position[] = [];
  for (const item of outer.data.data.slice(0, MAX_POSITIONS)) {
    const r = rawItem.safeParse(item);
    if (!r.success || !ID_RE.test(r.data.id)) continue;
    const title = cleanText(r.data.position, 160);
    if (!title) continue;
    let deptRaw = cleanText(r.data.office || r.data.departments || "", 120).toUpperCase() || "GENERAL VACANCIES";
    deptRaw = departmentAliases[deptRaw] ?? deptRaw;
    out.push({
      id: r.data.id,
      title: titleCase(title),
      department: titleCase(deptRaw),
      departmentSlug: slugify(deptRaw),
      image: departmentImage(deptRaw),
      qualification: cleanText(r.data.qualification),
      requirements: cleanText(r.data.requirements),
      responsibilities: cleanText(r.data.responsibilities),
    });
  }
  return out;
}

export function groupByDepartment(positions: Position[]): Department[] {
  const map = new Map<string, Department>();
  for (const p of positions) {
    const d = map.get(p.departmentSlug) ?? { slug: p.departmentSlug, name: p.department, image: p.image, positions: [] };
    d.positions.push(p);
    map.set(p.departmentSlug, d);
  }
  return [...map.values()]
    .map((d) => ({ ...d, positions: [...d.positions].sort((a, b) => a.title.localeCompare(b.title)) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Apply link on the HR portal; only ever built from a numeric id, over HTTPS. */
export function applyUrl(id: string): string | null {
  if (!ID_RE.test(id)) return null;
  const url = new URL(CAREERS_APPLY_URL);
  url.searchParams.set("position_id", id);
  return url.toString();
}

export type ListItem = { text: string; sub: string[] };
export type Block =
  | { type: "heading"; text: string }
  | { type: "list"; items: ListItem[] }
  | { type: "para"; text: string };

const BULLET_RE = /^(\s*)(?:[•\-*·▪●◦]|o(?=\s))\s*(.*)$/;
const NUMBER_RE = /^\s*\d{1,2}[.)]\s*(.+)$/;

/** Turns the feed's plain-text descriptions (bullets, "1." items, CAPS headings) into structured blocks. */
export function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  const list = (): ListItem[] => {
    const last = blocks.at(-1);
    if (last?.type === "list") return last.items;
    const items: ListItem[] = [];
    blocks.push({ type: "list", items });
    return items;
  };
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim()) continue;
    const num = line.match(NUMBER_RE);
    if (num?.[1]) {
      list().push({ text: num[1].trim(), sub: [] });
      continue;
    }
    const bullet = line.match(BULLET_RE);
    if (bullet && bullet[2]?.trim()) {
      const items = list();
      const indented = (bullet[1]?.length ?? 0) >= 2 || /^\s*o\s/.test(line);
      const last = items.at(-1);
      if (indented && last) last.sub.push(bullet[2].trim());
      else items.push({ text: bullet[2].trim(), sub: [] });
      continue;
    }
    const t = line.trim();
    const isHeading = t.length <= 60 && /[A-Z]/.test(t) && t === t.toUpperCase() && !/[.!?]$/.test(t);
    blocks.push(isHeading ? { type: "heading", text: titleCase(t.replace(/:$/, "")) } : { type: "para", text: t });
  }
  return blocks;
}

/** The HR feed cuts long fields off mid-sentence; flag those so the page can point to the full posting. */
export const looksTruncated = (s: string) => s.length >= 250 && !/[.!?)]\s*$/.test(s);
