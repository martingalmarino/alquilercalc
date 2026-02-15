"use client";

import { useEffect, useState } from "react";
import { addMonths, format, parseISO } from "date-fns";
import {
  Calculator,
  CalendarDays,
  DollarSign,
  BarChart3,
  Clock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { DateInput } from "@/components/ui/DateInput";
import { Input } from "@/components/ui/Input";
import { fetchIndexSeries, fetchIndicesList } from "@/lib/api";
import { computeSchedule, CalcResult } from "@/lib/calc";
import { formatCurrency } from "@/lib/format";
import { IndexCode, indexCodes, indexMeta } from "@data/mockIndices";
import { ResultsSummary } from "@/components/calculator/ResultsSummary";
import { ResultsTable } from "@/components/calculator/ResultsTable";
import { ResultsChart } from "@/components/calculator/ResultsChart";
import { ShareBar } from "@/components/calculator/ShareBar";

const LOCAL_STORAGE_KEY = "alquileres-calculator";

type FormErrors = Partial<Record<string, string>>;

export const CalculatorForm = ({ embedded = false }: { embedded?: boolean }) => {
  const [initialRentInput, setInitialRentInput] = useState("");
  const [initialRentValue, setInitialRentValue] = useState(0);
  const [contractStart, setContractStart] = useState("");
  const [frequencyMonths, setFrequencyMonths] = useState(12);
  const [indexCode, setIndexCode] = useState<IndexCode>("ICL");
  const [durationMonths, setDurationMonths] = useState(24);
  const [errors, setErrors] = useState<FormErrors>({});
  const [results, setResults] = useState<CalcResult | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [indicesLoaded, setIndicesLoaded] = useState(false);

  /* ── Persist form state ── */
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setInitialRentValue(parsed.initialRentValue ?? 0);
      setInitialRentInput(parsed.initialRentInput ?? "");
      setContractStart(parsed.contractStart ?? "");
      setFrequencyMonths(parsed.frequencyMonths ?? 12);
      setIndexCode(parsed.indexCode ?? "ICL");
      setDurationMonths(parsed.durationMonths ?? 24);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        initialRentValue,
        initialRentInput,
        contractStart,
        frequencyMonths,
        indexCode,
        durationMonths,
      })
    );
  }, [
    initialRentValue,
    initialRentInput,
    contractStart,
    frequencyMonths,
    indexCode,
    durationMonths,
  ]);

  /* ── Preload indices ── */
  useEffect(() => {
    fetchIndicesList()
      .then(() => setIndicesLoaded(true))
      .catch(() => setIndicesLoaded(true));
  }, []);

  /* ── Handlers ── */
  const handleRentChange = (value: string) => {
    const numeric = Number(value.replace(/\D/g, ""));
    setInitialRentValue(numeric);
    if (!value) {
      setInitialRentInput("");
    } else {
      setInitialRentInput(formatCurrency(numeric));
    }
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!initialRentValue || initialRentValue <= 0) {
      nextErrors.initialRent = "Ingresá un valor mayor a cero.";
    }
    if (!contractStart) {
      nextErrors.contractStart = "Seleccioná la fecha de inicio del contrato.";
    }
    if (!indexCode) {
      nextErrors.indexCode = "Elegí un índice de actualización.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCalculate = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const from = contractStart;
      const to = format(addMonths(parseISO(contractStart), durationMonths), "yyyy-MM-dd");
      const payload = await fetchIndexSeries(indexCode, from, to);
      const result = computeSchedule({
        initialRent: initialRentValue,
        contractStart,
        frequencyMonths,
        indexCode,
        durationMonths,
        rounding: "none",
        series: payload.series,
        lastUpdatedAt: payload.updatedAt,
      });
      setResults(result);
      const params = new URLSearchParams({
        initialRent: initialRentValue.toString(),
        contractStart,
        frequencyMonths: frequencyMonths.toString(),
        indexCode,
        durationMonths: durationMonths.toString(),
        rounding: "none",
      });
      setShareUrl(`${window.location.origin}/resultados?${params.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8">
      <Card className="overflow-hidden p-0">
        {/* ── Form sections ── */}
        <div className="flex flex-col divide-y divide-slate-100">
          {/* Section 1: Contract basics */}
          <div className="p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <DollarSign className="h-[18px] w-[18px]" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Datos del contrato</h3>
                <p className="text-xs text-slate-500">Alquiler inicial y fecha de inicio</p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Alquiler inicial (ARS)"
                placeholder="$ 250.000"
                value={initialRentInput}
                onChange={(event) => handleRentChange(event.target.value)}
                error={errors.initialRent}
              />
              <DateInput
                label="Fecha de inicio del contrato"
                value={contractStart}
                onChange={(event) => setContractStart(event.target.value)}
                error={errors.contractStart}
              />
            </div>
          </div>

          {/* Section 2: Index selection */}
          <div className="p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <BarChart3 className="h-[18px] w-[18px]" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Índice de actualización</h3>
                <p className="text-xs text-slate-500">Seleccioná el índice que establece tu contrato</p>
              </div>
            </div>
            <ChipGroup
              label=""
              value={indexCode}
              onChange={(value) => setIndexCode(value as IndexCode)}
              helper={indicesLoaded ? undefined : "Cargando índices..."}
              options={indexCodes.map((code) => ({
                label: code === "CasaPropia" ? "Casa Propia" : code,
                value: code,
              }))}
            />
            {indexCode && (
              <p className="mt-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{indexMeta[indexCode].name}</span>
                {" — "}
                {indexMeta[indexCode].description} Fuente: {indexMeta[indexCode].sourceName}.
              </p>
            )}
          </div>

          {/* Section 3: Frequency & Duration */}
          <div className="p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Clock className="h-[18px] w-[18px]" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Frecuencia y duración</h3>
                <p className="text-xs text-slate-500">Cada cuánto se ajusta y cuánto dura el contrato</p>
              </div>
            </div>
            <div className="grid gap-6">
              <ChipGroup
                label="Frecuencia de actualización"
                value={frequencyMonths}
                onChange={(value) => setFrequencyMonths(value)}
                options={[
                  { label: "Mensual", value: 1 },
                  { label: "Bimestral", value: 2 },
                  { label: "Trimestral", value: 3 },
                  { label: "Cuatrimestral", value: 4 },
                  { label: "Semestral", value: 6 },
                  { label: "Anual", value: 12 },
                ]}
              />
              <ChipGroup
                label="Duración del contrato"
                value={durationMonths}
                onChange={(value) => setDurationMonths(value)}
                options={[
                  { label: "12 meses", value: 12 },
                  { label: "24 meses", value: 24 },
                  { label: "36 meses", value: 36 },
                ]}
              />
            </div>
          </div>
        </div>

        {/* ── Submit ── */}
        <div className="flex items-center gap-4 border-t border-slate-100 bg-slate-50/50 px-6 py-5 md:px-8">
          <Button type="button" onClick={handleCalculate} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Calculando…
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4" />
                Calcular ajuste
              </>
            )}
          </Button>
          <p className="hidden text-xs text-slate-400 sm:block">
            Datos oficiales de BCRA, INDEC y datos.gob.ar.
          </p>
        </div>
      </Card>

      {/* ── Results ── */}
      {results && (
        <div className="grid gap-6">
          <ResultsSummary summary={results.summary} />
          <ShareBar shareUrl={shareUrl} rows={results.rows} />
          <ResultsChart rows={results.rows} />
          <ResultsTable rows={results.rows} />
        </div>
      )}

      {!results && embedded && (
        <Card className="border-dashed border-slate-300 bg-white/60">
          <div className="flex items-center gap-3 text-slate-500">
            <CalendarDays className="h-5 w-5 text-slate-400" />
            <p className="text-sm">
              Completá los datos para visualizar el cronograma y el gráfico.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
