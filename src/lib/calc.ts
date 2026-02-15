import { addMonths, format, parseISO } from "date-fns";
import { z } from "zod";
import { indexMeta, indexCodes, IndexSeriesPoint } from "@data/mockIndices";

export const roundingOptions = ["none", "peso", "100", "1000"] as const;

export const calcInputSchema = z.object({
  initialRent: z.number().positive(),
  contractStart: z.string().regex(/\d{4}-\d{2}-\d{2}/),
  frequencyMonths: z.number().min(1).max(12),
  indexCode: z.enum(indexCodes),
  durationMonths: z.number().min(12).max(36).default(24),
  rounding: z.enum(roundingOptions).default("peso"),
  series: z.array(
    z.object({
      date: z.string().regex(/\d{4}-\d{2}-\d{2}/),
      value: z.number(),
    })
  ),
  lastUpdatedAt: z.string().regex(/\d{4}-\d{2}-\d{2}/),
});

export type CalcInput = z.infer<typeof calcInputSchema>;

export type ScheduleRow = {
  periodStart: string;
  periodEnd: string;
  indexStart: number;
  indexEnd: number;
  factor: number;
  rent: number;
};

export type CalcSummary = {
  nextRent: number;
  pctChange: number;
  indexLabel: string;
  frequencyMonths: number;
  lastUpdatedAt: string;
};

export type CalcResult = {
  rows: ScheduleRow[];
  summary: CalcSummary;
};

const roundValue = (value: number, rounding: CalcInput["rounding"]) => {
  if (rounding === "none") return value;
  if (rounding === "peso") return Math.round(value);
  if (rounding === "100") return Math.round(value / 100) * 100;
  return Math.round(value / 1000) * 1000;
};

const getIndexValue = (
  series: IndexSeriesPoint[],
  frequency: "daily" | "monthly",
  targetDate: string
) => {
  if (!series.length) return 1;
  if (frequency === "monthly") {
    const monthKey = `${targetDate.slice(0, 7)}-01`;
    const match = [...series].reverse().find((point) => point.date <= monthKey);
    return match?.value ?? series[0].value;
  }
  const match = [...series].reverse().find((point) => point.date <= targetDate);
  return match?.value ?? series[0].value;
};

export const computeSchedule = (input: CalcInput): CalcResult => {
  const parsed = calcInputSchema.parse(input);
  const { initialRent, contractStart, frequencyMonths, indexCode, durationMonths, rounding } =
    parsed;

  const frequency = indexMeta[indexCode]?.frequency ?? "monthly";
  const periods = Math.ceil(durationMonths / frequencyMonths);
  const rows: ScheduleRow[] = [];
  let currentRent = initialRent;
  let startDate = parseISO(contractStart);

  for (let i = 0; i < periods; i += 1) {
    const endDate = addMonths(startDate, frequencyMonths);
    const periodStart = format(startDate, "yyyy-MM-dd");
    const periodEnd = format(endDate, "yyyy-MM-dd");
    const indexStart = getIndexValue(parsed.series, frequency, periodStart);
    const indexEnd = getIndexValue(parsed.series, frequency, periodEnd);
    const factor = indexEnd / indexStart;
    const updatedRent = roundValue(currentRent * factor, rounding);

    rows.push({
      periodStart,
      periodEnd,
      indexStart,
      indexEnd,
      factor,
      rent: updatedRent,
    });

    currentRent = updatedRent;
    startDate = endDate;
  }

  const first = rows[0];
  const nextRent = first?.rent ?? initialRent;
  const pctChange = first ? (first.rent / initialRent - 1) * 100 : 0;

  return {
    rows,
    summary: {
      nextRent,
      pctChange,
      indexLabel: indexMeta[indexCode]?.name ?? indexCode,
      frequencyMonths,
      lastUpdatedAt: parsed.lastUpdatedAt,
    },
  };
};
