/**
 * Index data layer — connects API routes to real data sources.
 *
 * Uses:
 *  - datos.gob.ar for CER, UVA, IPC, IS (RIPTE), IPIM
 *  - Seed data for ICL, CAC, CasaPropia
 *  - File-based + in-memory cache for performance
 */

import {
  indexMeta,
  IndexCode,
  IndexSeriesPoint,
} from "@data/mockIndices";
import { getCached } from "@/lib/cache";
import { fetchRealIndexSeries, getLastUpdated } from "@/lib/fetchers/registry";

export type IndexSeriesResponse = {
  code: IndexCode;
  series: IndexSeriesPoint[];
  updatedAt: string;
};

/** List all available index metadata (no data fetching). */
export const getIndexMetaList = () =>
  Object.entries(indexMeta).map(([code, meta]) => ({
    code: code as IndexCode,
    ...meta,
  }));

/**
 * Fetch a real index series for the given code and date range.
 * Results are cached for 15 minutes (in-memory + disk).
 */
export const getSeriesRange = async (
  code: IndexCode,
  from?: string,
  to?: string,
): Promise<IndexSeriesPoint[]> => {
  const fromDate = from ?? "2024-01-01";
  const toDate = to ?? new Date().toISOString().slice(0, 10);
  const cacheKey = `real-series:${code}:${fromDate}:${toDate}`;

  return getCached(
    cacheKey,
    () => fetchRealIndexSeries(code, fromDate, toDate),
    15 * 60 * 1000, // 15 min TTL
  );
};

/**
 * Get the last update date for an index.
 * Cached for 1 hour.
 */
export const getIndexUpdatedAt = async (code: IndexCode): Promise<string> => {
  const cacheKey = `last-updated:${code}`;
  return getCached(
    cacheKey,
    () => getLastUpdated(code),
    60 * 60 * 1000, // 1 hour TTL
  );
};
