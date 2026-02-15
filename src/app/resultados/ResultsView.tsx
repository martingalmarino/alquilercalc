"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { addMonths, format, parseISO } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { fetchIndexSeries } from "@/lib/api";
import { computeSchedule, roundingOptions, CalcResult } from "@/lib/calc";
import { ResultsSummary } from "@/components/calculator/ResultsSummary";
import { ResultsTable } from "@/components/calculator/ResultsTable";
import { ResultsChart } from "@/components/calculator/ResultsChart";
import { ShareBar } from "@/components/calculator/ShareBar";
import { IndexCode, indexCodes } from "@data/mockIndices";

const querySchema = z.object({
  initialRent: z.string(),
  contractStart: z.string(),
  frequencyMonths: z.string(),
  indexCode: z.enum(indexCodes),
  durationMonths: z.string(),
  rounding: z.enum(roundingOptions),
});

/* ── Shared page header ── */
function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-violet-500/15 blur-3xl" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-16 text-center md:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Resultados
        </span>
        <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-slate-300">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export default function ResultsView() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<CalcResult | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const params = useMemo(() => {
    const data = Object.fromEntries(searchParams.entries());
    const parsed = querySchema.safeParse(data);
    if (!parsed.success) {
      return null;
    }
    return parsed.data;
  }, [searchParams]);

  useEffect(() => {
    if (!params) {
      return;
    }
    const run = async () => {
      const from = params.contractStart;
      const to = format(
        addMonths(parseISO(params.contractStart), Number(params.durationMonths)),
        "yyyy-MM-dd"
      );
      const payload = await fetchIndexSeries(params.indexCode as IndexCode, from, to);
      const result = computeSchedule({
        initialRent: Number(params.initialRent),
        contractStart: params.contractStart,
        frequencyMonths: Number(params.frequencyMonths),
        indexCode: params.indexCode as IndexCode,
        durationMonths: Number(params.durationMonths),
        rounding: params.rounding,
        series: payload.series,
        lastUpdatedAt: payload.updatedAt,
      });
      setResults(result);
    };
    run().catch(() => setFetchError("No pudimos calcular el resultado."));
  }, [params]);

  const error = !params
    ? "Faltan parámetros en el enlace compartido."
    : fetchError;

  if (error) {
    return (
      <div>
        <PageHeader
          title="Resultado no disponible"
          subtitle="Hubo un problema al procesar tu solicitud."
        />
        <section className="mx-auto w-full max-w-4xl px-6 py-12">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Error</h2>
            <p className="mt-2 text-sm text-slate-600">{error}</p>
            <Link
              href="/calculadora"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              Volver a la calculadora
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (!results) {
    return (
      <div>
        <PageHeader
          title="Procesando resultados"
          subtitle="Estamos calculando tu cronograma de ajustes..."
        />
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 h-3 w-20 rounded bg-slate-200" />
                <div className="h-6 w-32 rounded bg-slate-200" />
              </div>
            ))}
          </div>
          <div className="mt-6 animate-pulse rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="h-48 rounded-xl bg-slate-100" />
          </div>
        </section>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div>
      <PageHeader
        title="Tu cronograma de ajustes"
        subtitle="Resumen generado automáticamente desde los parámetros del contrato."
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-6">
          <ResultsSummary summary={results.summary} />
          <ShareBar shareUrl={shareUrl} rows={results.rows} />
          <ResultsChart rows={results.rows} />
          <ResultsTable rows={results.rows} />
        </div>
      </section>
    </div>
  );
}
