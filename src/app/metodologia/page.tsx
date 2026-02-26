import type { Metadata } from "next";
import { Ruler, Bank, CalendarDots, Check } from "@phosphor-icons/react/dist/ssr";
import { PulseDot } from "@/components/ui/PulseDot";

export const metadata: Metadata = {
  title: "Cómo Calcular Aumento de Alquiler — Metodología y Fórmula Argentina 2026",
  description:
    "Aprené cómo calcular el aumento de alquiler en Argentina paso a paso. Fórmula, índices oficiales (ICL, IPC, UVA) y método de actualización de alquiler explicado. Guía completa 2026.",
};

export default function MetodologiaPage() {
  return (
    <div>
      {/* ── Page Header ── */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div className="space-y-4">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-slate-700/80 bg-slate-800/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-200">
              <PulseDot />
              Metodología abierta
            </span>
            <h1 className="text-3xl font-semibold tracking-tighter leading-none md:text-5xl">
              Cómo calculamos el aumento de alquiler
            </h1>
            <p className="text-base text-slate-300 leading-relaxed max-w-[60ch]">
              Documentamos cada paso del cálculo, las fuentes oficiales y el tratamiento de faltantes para que puedas auditar cada ajuste.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-sm text-slate-300">
            Fórmula pública, fuentes verificadas y reglas de respaldo para fechas sin datos oficiales.
          </div>
        </div>
      </section>

      {/* ── Content Sections ── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="space-y-8">
          {/* Formula */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.35)] sm:p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Ruler size={20} weight="regular" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Fórmula para calcular el aumento de alquiler</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              El alquiler se ajusta multiplicando el valor actual por el factor del índice
              correspondiente al período. Así se calcula cuánto aumenta el alquiler:
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 font-mono text-xs font-semibold text-emerald-700 sm:px-5 sm:py-4 sm:text-sm">
              nuevoAlquiler = alquilerAnterior × (ÍndiceFin / ÍndiceInicio)
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              El cálculo se realiza por períodos definidos por la frecuencia seleccionada
              (mensual, trimestral, semestral, etc.).
            </p>
          </div>

          {/* Sources */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.35)] sm:p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Bank size={20} weight="regular" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Fuentes de datos: índices de alquiler oficiales</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Los índices de alquiler se obtienen de fuentes oficiales de Argentina para garantizar la precisión del cálculo de aumento:
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { source: "BCRA", indices: "ICL, CER y UVA" },
                { source: "INDEC", indices: "IPC, IS e IPIM" },
                { source: "Min. Desarrollo Territorial", indices: "Casa Propia" },
                { source: "CAC", indices: "Índice de la construcción" },
              ].map((item) => (
                <li
                  key={item.source}
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check size={14} weight="bold" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.source}</p>
                    <p className="text-xs text-slate-500">{item.indices}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Frequency & Dates */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.35)] sm:p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CalendarDots size={20} weight="regular" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Frecuencia y fechas de actualización de alquiler</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                Para índices diarios se usa el último dato disponible en o antes de la fecha
                objetivo. Para índices mensuales se toma el valor del primer día del mes de
                referencia, o el último disponible si faltara.
              </p>
              <p>
                Cuando un período cae en un día inexistente (por ejemplo 31/02), se ajusta
                al último día del mes correspondiente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
