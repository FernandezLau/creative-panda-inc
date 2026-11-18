import { describe, expect, it } from "vitest";
import { softwareProjects, websites } from "@/components/site/portfolio-data";
import { filterSoftware, filterWebsites, systemCounts } from "@/lib/portfolio";

describe("portfolio filters", () => {
  it("shows only websites from the chosen category", () => {
    const nga = filterWebsites(websites, "nga", "");
    expect(nga.length).toBeGreaterThan(0);
    expect(nga.every((w) => w.category === "nga")).toBe(true);
  });

  it("finds a town by name regardless of accents or case", () => {
    expect(filterWebsites(websites, undefined, "penaranda").map((w) => w.name)).toEqual(["Municipality of Peñaranda"]);
  });

  it("lists every client using a system type", () => {
    expect(filterSoftware(softwareProjects, "EBIS", "").map((s) => s.client)).toEqual([
      "Municipality of Porac, Pampanga",
      "Municipality of Mexico, Pampanga",
      "Municipality of Bislig, Surigao del Sur",
      "Municipality of Capas, Tarlac",
    ]);
  });

  it("counts clients per system type, most used first", () => {
    expect(systemCounts(softwareProjects).slice(0, 2)).toEqual([
      { code: "EBIS", count: 4 },
      { code: "EHRIS", count: 4 },
    ]);
  });
});
