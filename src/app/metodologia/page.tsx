import type { Metadata } from "next";
import { Ruler, Landmark, CalendarDays, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo Calcular Aumento de Alquiler — Metodología y Fórmula Argentina 2026",
  description:
    "Aprené cómo calcular el aumento de alquiler en Argentina paso a paso. Fórmula, índices oficiales (ICL, IPC, UVA) y método de actualización de alquiler explicado. Guía completa 2026.",
};

export default function MetodologiaPage() {
  return (
    <div>
      {/* ── Page Header ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-violet-500/15 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-16 text-center md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Cómo calcular aumento de alquiler
          </span>
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Metodología de{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              cálculo de alquiler
            </span>
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-slate-300">
            Cómo calculamos el aumento de alquiler, qué índices usamos y cómo tratamos
            los faltantes. Fórmula abierta y transparente.
          </p>
        </div>
      </section>

      {/* ── Content Sections ── */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="space-y-8">
          {/* Formula */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Ruler className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Fórmula para calcular el aumento de alquiler</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              El alquiler se ajusta multiplicando el valor actual por el factor del índice
              correspondiente al período. Así se calcula cuánto aumenta el alquiler:
            </p>
            <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/50 px-5 py-4 font-mono text-sm font-semibold text-indigo-700">
              nuevoAlquiler = alquilerAnterior × (ÍndiceFin / ÍndiceInicio)
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              El cálculo se realiza por períodos definidos por la frecuencia seleccionada
              (mensual, trimestral, semestral, etc.).
            </p>
          </div>

          {/* Sources */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Landmark className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Fuentes de datos: índices de alquiler oficiales</h2>
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
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <Check className="h-3.5 w-3.5" />
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
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <CalendarDays className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Frecuencia y fechas de actualización de alquiler</h2>
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
