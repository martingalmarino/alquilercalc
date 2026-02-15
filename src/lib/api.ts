import { IndexCode, IndexMeta, IndexSeriesPoint } from "@data/mockIndices";

export type IndicesListResponse = {
  data: Array<IndexMeta & { code: IndexCode }>;
  updatedAt: string;
};

export type IndexSeriesResponse = {
  code: IndexCode;
  series: IndexSeriesPoint[];
  updatedAt: string;
};

export const fetchIndicesList = async () => {
  const response = await fetch("/api/indices");
  if (!response.ok) throw new Error("Error al cargar índices");
  return (await response.json()) as IndicesListResponse;
};

export const fetchIndexSeries = async (code: IndexCode, from: string, to: string) => {
  const response = await fetch(`/api/indices/${code}?from=${from}&to=${to}`);
  if (!response.ok) throw new Error("Error al cargar serie");
  return (await response.json()) as IndexSeriesResponse;
};
