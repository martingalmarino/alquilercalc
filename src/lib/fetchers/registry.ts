/**
 * Registry: maps each IndexCode to its real data source.
 *
 * Data sources:
 *  ┌────────────┬─────────────────────────────┬───────────────────────┐
 *  │ Index      │ Source                      │ Series ID             │
 *  ├────────────┼─────────────────────────────┼───────────────────────┤
 *  │ ICL        │ Seed (BCRA API unavailable) │ —                     │
 *  │ CER        │ datos.gob.ar                │ 94.2_CD_D_0_0_10      │
 *  │ UVA        │ datos.gob.ar                │ 94.2_UVAD_D_0_0_10    │
 *  │ IPC        │ datos.gob.ar                │ 148.3_INIVELNAL_…_26  │
 *  │ IS (RIPTE) │ datos.gob.ar                │ 158.1_REPTE_0_0_5     │
 *  │ IPIM       │ datos.gob.ar                │ 450.1_NIVEL_…_13_92   │
 *  │ CAC        │ Seed (manual)               │ —                     │
 *  │ CasaPropia │ Seed (manual)               │ —                     │
 *  └────────────┴─────────────────────────────┴───────────────────────┘
 */

import { IndexCode, IndexSeriesPoint } from "@data/mockIndices";
import { iclSeed, cacSeed, casaPropiaSeed, SeedPoint } from "@data/seeds";
import { fetchDatosGobArSeries } from "./datosGobAr";

// ── datos.gob.ar series IDs ──────────────────────────────────
const DATOS_GOB_AR_IDS: Partial<Record<IndexCode, string>> = {
  CER: "94.2_CD_D_0_0_10",
  UVA: "94.2_UVAD_D_0_0_10",
  IPC: "148.3_INIVELNAL_DICI_M_26",
  IS: "158.1_REPTE_0_0_5",
  IPIM: "450.1_NIVEL_GENERAL_0_0_13_92",
};

// ── Seed data lookup ─────────────────────────────────────────
const SEED_DATA: Partial<Record<IndexCode, SeedPoint[]>> = {
  ICL: iclSeed,
  CAC: cacSeed,
  CasaPropia: casaPropiaSeed,
};

/** Filter seed points to a date range. */
function filterSeedRange(
  seed: SeedPoint[],
  from?: string,
  to?: string,
): IndexSeriesPoint[] {
  return seed
    .filter((p) => {
      if (from && p.date < from) return false;
      if (to && p.date > to) return false;
      return true;
    })
    .map((p) => ({ date: p.date, value: p.value }));
}

/**
 * Fetch the real index series for the given code and date range.
 * Tries datos.gob.ar first, falls back to seed data.
 */
export async function fetchRealIndexSeries(
  code: IndexCode,
  from: string,
  to: string,
): Promise<IndexSeriesPoint[]> {
  // 1) Try datos.gob.ar
  const datosId = DATOS_GOB_AR_IDS[code];
  if (datosId) {
    try {
      const series = await fetchDatosGobArSeries(datosId, from, to);
      if (series.length > 0) return series;
    } catch (err) {
      console.error(`[fetchRealIndexSeries] datos.gob.ar error for ${code}:`, err);
      // Fall through to seed
    }
  }

  // 2) Try seed data
  const seed = SEED_DATA[code];
  if (seed) {
    const filtered = filterSeedRange(seed, from, to);
    if (filtered.length > 0) return filtered;
  }

  // 3) Nothing available
  throw new Error(
    `No data available for index ${code} in range ${from}–${to}. ` +
    `Please update the seed data or check the datos.gob.ar API.`,
  );
}

/**
 * Get the last updated date for an index.
 */
export async function getLastUpdated(code: IndexCode): Promise<string> {
  // For datos.gob.ar indices, fetch the latest point
  const datosId = DATOS_GOB_AR_IDS[code];
  if (datosId) {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const series = await fetchDatosGobArSeries(datosId, "2025-01-01", today);
      if (series.length > 0) {
        return series[series.length - 1].date;
      }
    } catch {
      // fall through
    }
  }

  // For seed-based indices
  const seed = SEED_DATA[code];
  if (seed && seed.length > 0) {
    return seed[seed.length - 1].date;
  }

  return new Date().toISOString().slice(0, 10);
}
