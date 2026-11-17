import { describe, expect, it } from "vitest";
import { applyUrl, cleanText, groupByDepartment, normalizePositions, parseBlocks } from "@/lib/careers";

const feed = {
  ok: true,
  data: [
    { id: "9", position: "ADMINISTRATIVE OFFICER III", office: "ADMIN DEPARTMENT / COMPANY DRIVER", qualification: "•\tA" },
    { id: "31", position: "HR ASSISTANT", office: "HR DEPARTMENT" },
    { id: "24", position: "HUMAN RESOURCE ASSISTANT", office: "HUMAN RESOURCE DEPARTMENT" },
    { id: "1 OR 1=1", position: "BAD ID", office: "X" },
    { id: "5", position: "<img src=x onerror=alert(1)>DEV", office: "TECHNICAL SUPPORT DEPARTMENT" },
  ],
};

describe("careers feed", () => {
  it("drops positions whose id is not a plain number", () => {
    expect(normalizePositions(feed).map((p) => p.id)).toEqual(["9", "31", "24", "5"]);
  });

  it("strips HTML from feed text so it can never run as code", () => {
    expect(normalizePositions(feed).find((p) => p.id === "5")?.title).toBe("Dev");
    expect(cleanText("<script>alert(1)</script>Hi")).toBe("Hi");
  });

  it("groups HR DEPARTMENT together with Human Resource Department", () => {
    const hr = groupByDepartment(normalizePositions(feed)).find((d) => d.slug === "human-resource-department");
    expect(hr?.positions.map((p) => p.id)).toEqual(["31", "24"]);
  });

  it("builds the apply link over HTTPS only for numeric ids", () => {
    expect(applyUrl("9")).toBe("https://mcpehris.mycreativepanda.ph/online-job-application/?position_id=9");
    expect(applyUrl("9&x=1")).toBeNull();
  });

  it("splits numbered items and their 'o' sub-points", () => {
    const blocks = parseBlocks("1. Recruitment:\n     o\tPosting jobs.\n     o\tScreening.");
    expect(blocks).toEqual([{ type: "list", items: [{ text: "Recruitment:", sub: ["Posting jobs.", "Screening."] }] }]);
  });
});
