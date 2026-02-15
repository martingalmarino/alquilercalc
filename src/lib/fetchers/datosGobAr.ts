/**
 * Fetcher for the datos.gob.ar Time Series API.
 * Docs: https://datosgobar.github.io/series-tiempo-ar-api/
 *
 * Used for: CER, UVA, IPC, IPIM, IS (RIPTE)
 */

import { IndexSeriesPoint } from "@data/mockIndices";

const BASE_URL = "https://apis.datos.gob.ar/series/api/series/";
const MAX_LIMIT = 1000;

type DatosGobArRow = [string, number | null];

interface DatosGobArResponse {
  data: DatosGobArRow[];
  count: number;
  meta: Array<Record<string, unknown>>;
}

/**
 * Fetch a single time series from datos.gob.ar.
 *
 * @param seriesId  – The unique series identifier (e.g. "94.2_CD_D_0_0_10")
 * @param startDate – ISO date string "YYYY-MM-DD"
 * @param endDate   – ISO date string "YYYY-MM-DD"
 * @returns Array of { date, value } sorted ascending by date.
 */
export async function fetchDatosGobArSeries(
  seriesId: string,
  startDate: string,
  endDate: string,
): Promise<IndexSeriesPoint[]> {
  const allPoints: IndexSeriesPoint[] = [];
  let start = 0;
  let hasMore = true;

  while (hasMore) {
    const url = new URL(BASE_URL);
    url.searchParams.set("ids", seriesId);
    url.searchParams.set("start_date", startDate);
    url.searchParams.set("end_date", endDate);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", String(MAX_LIMIT));
    url.searchParams.set("start", String(start));

    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!res.ok) {
      throw new Error(
        `datos.gob.ar API error ${res.status}: ${await res.text()}`,
      );
    }

    const json = (await res.json()) as DatosGobArResponse;

    for (const [date, value] of json.data) {
      if (date && value !== null && value !== undefined) {
        allPoints.push({
          date: date.slice(0, 10), // normalise to YYYY-MM-DD
          value: Number(value),
        });
      }
    }

    // Check if there are more pages
    if (json.data.length < MAX_LIMIT) {
      hasMore = false;
    } else {
      start += MAX_LIMIT;
    }
  }

  return allPoints;
}
