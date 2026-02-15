import { addDays, addMonths, format, parseISO } from "date-fns";

export const indexCodes = [
  "ICL",
  "IPC",
  "CasaPropia",
  "CAC",
  "CER",
  "IS",
  "IPIM",
  "UVA",
] as const;

export type IndexCode = (typeof indexCodes)[number];

export type IndexFrequency = "daily" | "monthly";

export type IndexMeta = {
  name: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  frequency: IndexFrequency;
};

export type IndexSeriesPoint = {
  date: string;
  value: number;
};

const DAILY_CODES: IndexCode[] = ["ICL", "CER", "UVA"];

const MONTHLY_CODES: IndexCode[] = [
  "IPC",
  "IS",
  "IPIM",
  "CAC",
  "CasaPropia",
];

export const indexMeta: Record<IndexCode, IndexMeta> = {
  ICL: {
    name: "ICL (Índice de Contratos de Locación)",
    description: "Índice diario de variación salarial y de precios para contratos de alquiler.",
    sourceName: "BCRA",
    sourceUrl: "https://www.bcra.gob.ar/",
    frequency: "daily",
  },
  IPC: {
    name: "IPC (Índice de Precios al Consumidor)",
    description: "Inflación minorista publicada por INDEC.",
    sourceName: "INDEC",
    sourceUrl: "https://www.indec.gob.ar/",
    frequency: "monthly",
  },
  CasaPropia: {
    name: "Casa Propia",
    description: "Índice del programa Casa Propia para actualización de alquileres.",
    sourceName: "Ministerio de Desarrollo Territorial",
    sourceUrl: "https://www.argentina.gob.ar/",
    frequency: "monthly",
  },
  CAC: {
    name: "CAC (Cámara Argentina de la Construcción)",
    description: "Índice de costos de construcción utilizado en contratos.",
    sourceName: "CAC",
    sourceUrl: "https://www.camarco.org.ar/",
    frequency: "monthly",
  },
  CER: {
    name: "CER (Coeficiente de Estabilización de Referencia)",
    description: "Índice diario asociado a la inflación, publicado por BCRA.",
    sourceName: "BCRA",
    sourceUrl: "https://www.bcra.gob.ar/",
    frequency: "daily",
  },
  IS: {
    name: "IS (Índice Salarial)",
    description: "Índice de salarios publicado por INDEC.",
    sourceName: "INDEC",
    sourceUrl: "https://www.indec.gob.ar/",
    frequency: "monthly",
  },
  IPIM: {
    name: "IPIM (Índice de Precios Internos al por Mayor)",
    description: "Índice de precios mayoristas publicado por INDEC.",
    sourceName: "INDEC",
    sourceUrl: "https://www.indec.gob.ar/",
    frequency: "monthly",
  },
  UVA: {
    name: "UVA (Unidad de Valor Adquisitivo)",
    description: "Unidad diaria de referencia para créditos y ajustes.",
    sourceName: "BCRA",
    sourceUrl: "https://www.bcra.gob.ar/",
    frequency: "daily",
  },
};

const START_DATE = "2024-01-01";
const MONTHS = 20;

const generateDailySeries = (
  base: number,
  dailyRate: number,
  start = START_DATE,
  months = MONTHS
): IndexSeriesPoint[] => {
  const startDate = parseISO(start);
  const endDate = addMonths(startDate, months);
  const points: IndexSeriesPoint[] = [];
  let current = startDate;
  let index = 0;
  while (current <= endDate) {
    const value = base * Math.pow(1 + dailyRate, index);
    points.push({ date: format(current, "yyyy-MM-dd"), value: Number(value.toFixed(4)) });
    current = addDays(current, 1);
    index += 1;
  }
  return points;
};

const generateMonthlySeries = (
  base: number,
  monthlyRate: number,
  start = START_DATE,
  months = MONTHS
): IndexSeriesPoint[] => {
  const startDate = parseISO(start);
  const points: IndexSeriesPoint[] = [];
  for (let i = 0; i <= months; i += 1) {
    const value = base * Math.pow(1 + monthlyRate, i);
    points.push({
      date: format(addMonths(startDate, i), "yyyy-MM-01"),
      value: Number(value.toFixed(4)),
    });
  }
  return points;
};

export const mockIndexSeries: Record<IndexCode, IndexSeriesPoint[]> = {
  ICL: generateDailySeries(100, 0.0007),
  CER: generateDailySeries(95, 0.0006),
  UVA: generateDailySeries(102, 0.0005),
  IPC: generateMonthlySeries(120, 0.04),
  IS: generateMonthlySeries(110, 0.035),
  IPIM: generateMonthlySeries(115, 0.038),
  CAC: generateMonthlySeries(125, 0.045),
  CasaPropia: generateMonthlySeries(108, 0.03),
};

export const getIndexUpdatedAt = (code: IndexCode): string => {
  const series = mockIndexSeries[code];
  return series[series.length - 1]?.date ?? START_DATE;
};

export const isDailyIndex = (code: IndexCode) => DAILY_CODES.includes(code);

export const isMonthlyIndex = (code: IndexCode) => MONTHLY_CODES.includes(code);
