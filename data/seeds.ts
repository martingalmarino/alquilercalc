/**
 * Static seed data for indices that don't have a public API.
 *
 * Sources:
 *  - ICL: BCRA – daily. Known value: 30.26 on 2026-02-14 (base 30/06/2020 = 1).
 *         Historical daily growth ~0.07% (≈ annual ~29%).
 *  - CAC: Cámara Argentina de la Construcción – monthly.
 *         Published manually. Base oct-2017 = 100.
 *  - CasaPropia: Secretaría de Desarrollo Territorial – monthly.
 *         Published manually. Base mar-2021 = 1.
 *
 * Data generated from known public values and growth rates.
 * In production these should be updated periodically from official PDF/XLSX publications.
 */

export interface SeedPoint {
  date: string; // YYYY-MM-DD
  value: number;
}

// ──────────────────────────────────────────────────────────────
//  ICL – daily, base 30/06/2020 = 1
//  Current: ~30.26 on 2026-02-14
//  We generate daily points from 2024-01-01 using back-calculation.
//  Daily growth ≈ 0.00065 (≈ 26.7% anual)
// ──────────────────────────────────────────────────────────────
function generateICLSeed(): SeedPoint[] {
  const knownDate = new Date("2026-02-14");
  const knownValue = 30.26;
  const dailyRate = 0.00065;
  const startDate = new Date("2024-01-01");

  // How many days from startDate to knownDate
  const diffDays = Math.round(
    (knownDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const startValue = knownValue / Math.pow(1 + dailyRate, diffDays);

  const points: SeedPoint[] = [];
  const current = new Date(startDate);
  let idx = 0;

  while (current <= knownDate) {
    const value = startValue * Math.pow(1 + dailyRate, idx);
    points.push({
      date: current.toISOString().slice(0, 10),
      value: Number(value.toFixed(4)),
    });
    current.setDate(current.getDate() + 1);
    idx++;
  }

  return points;
}

// ──────────────────────────────────────────────────────────────
//  CAC – monthly, base oct-2017 = 100
//  Approximate monthly values sourced from public Cámara reports.
//  Growth rate ~4% monthly in high-inflation periods, ~2.5% more recently.
// ──────────────────────────────────────────────────────────────
function generateCACSeed(): SeedPoint[] {
  // Anchor: ~85,000 for Jan 2026 (estimated from public reports)
  const anchorDate = new Date("2026-01-01");
  const anchorValue = 85000;
  const startDate = new Date("2024-01-01");

  const monthlyRates: Record<number, number> = {
    2024: 0.035, // ~3.5% monthly in 2024
    2025: 0.025, // ~2.5% monthly in 2025
    2026: 0.02,  // ~2.0% monthly in 2026
  };

  // Back-calculate from anchor to start
  const months: SeedPoint[] = [];
  const current = new Date(startDate);

  // First calculate the start value
  const tempDateCAC = new Date(startDate);
  let totalMultiplier = 1;
  while (tempDateCAC < anchorDate) {
    const rate = monthlyRates[tempDateCAC.getFullYear()] ?? 0.025;
    totalMultiplier *= 1 + rate;
    tempDateCAC.setMonth(tempDateCAC.getMonth() + 1);
  }
  const startValue = anchorValue / totalMultiplier;

  // Now generate forward
  let value = startValue;
  const endDate = new Date("2026-02-01");
  while (current <= endDate) {
    months.push({
      date: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-01`,
      value: Number(value.toFixed(2)),
    });
    const rate = monthlyRates[current.getFullYear()] ?? 0.025;
    value *= 1 + rate;
    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

// ──────────────────────────────────────────────────────────────
//  CasaPropia – monthly, base mar-2021 = 1
//  Growth rate ~3% monthly.
// ──────────────────────────────────────────────────────────────
function generateCasaPropiaSeed(): SeedPoint[] {
  // Anchor: ~4.8 for Jan 2026 (estimated)
  const anchorDate = new Date("2026-01-01");
  const anchorValue = 4.8;
  const startDate = new Date("2024-01-01");

  const monthlyRates: Record<number, number> = {
    2024: 0.03,
    2025: 0.025,
    2026: 0.02,
  };

  const tempDateCP = new Date(startDate);
  let totalMultiplierCP = 1;
  while (tempDateCP < anchorDate) {
    const rate = monthlyRates[tempDateCP.getFullYear()] ?? 0.025;
    totalMultiplierCP *= 1 + rate;
    tempDateCP.setMonth(tempDateCP.getMonth() + 1);
  }
  const startValueCP = anchorValue / totalMultiplierCP;

  const months: SeedPoint[] = [];
  const current = new Date(startDate);
  let value = startValueCP;
  const endDate = new Date("2026-02-01");

  while (current <= endDate) {
    months.push({
      date: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-01`,
      value: Number(value.toFixed(4)),
    });
    const rate = monthlyRates[current.getFullYear()] ?? 0.025;
    value *= 1 + rate;
    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

// Export pre-computed seed data
export const iclSeed = generateICLSeed();
export const cacSeed = generateCACSeed();
export const casaPropiaSeed = generateCasaPropiaSeed();
