import { createServerFn } from "@tanstack/react-start";
import { CAREERS_API_URL } from "@/components/site/data";
import { normalizePositions, type Position } from "@/lib/careers";

export type CareersResult = { positions: Position[]; error: "unavailable" | null };

const MAX_BYTES = 1_000_000;

/** Reads open positions from the HR system on the server; the browser never talks to the feed directly. */
export const getOpenPositions = createServerFn({ method: "GET" }).handler(async (): Promise<CareersResult> => {
  try {
    const res = await fetch(CAREERS_API_URL, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`Careers feed failed [${res.status}]: ${(await res.text()).slice(0, 300)}`);
      return { positions: [], error: "unavailable" };
    }
    const body = await res.text();
    if (body.length > MAX_BYTES) {
      console.error(`Careers feed too large: ${body.length} bytes`);
      return { positions: [], error: "unavailable" };
    }
    return { positions: normalizePositions(JSON.parse(body)), error: null };
  } catch (error) {
    console.error("Careers feed error", error);
    return { positions: [], error: "unavailable" };
  }
});
