import { describe, expect, it } from "vitest";
import { computeSchedule } from "./calc";

const series = [
  { date: "2024-01-01", value: 100 },
  { date: "2025-01-01", value: 120 },
  { date: "2026-01-01", value: 150 },
];

describe("computeSchedule", () => {
  it("computes a two-period schedule", () => {
    const result = computeSchedule({
      initialRent: 100,
      contractStart: "2024-01-01",
      frequencyMonths: 12,
      indexCode: "IPC",
      durationMonths: 24,
      rounding: "none",
      series,
      lastUpdatedAt: "2026-01-01",
    });

    expect(result.rows).toHaveLength(2);
    expect(result.rows[0].rent).toBeCloseTo(120);
    expect(result.rows[1].rent).toBeCloseTo(150);
    expect(result.summary.nextRent).toBeCloseTo(120);
  });
});
