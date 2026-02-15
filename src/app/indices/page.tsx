import Link from "next/link";
import type { Metadata } from "next";
import { getIndexMetaList } from "@/lib/indices";

export const metadata: Metadata = {
  title: "Índice de Alquiler Hoy — ICL, IPC, UVA y Más | Actualización Alquiler Argentina",
  description:
    "Consultá el índice de alquiler hoy en Argentina: ICL, IPC, UVA, CER, Casa Propia, CAC, IS e IPIM. Datos actualizados del BCRA e INDEC para calcular el aumento de alquiler 2026.",
};

export default function IndicesPage() {
  const indices = getIndexMetaList();

  return (
    <div>
      {/* ── Page Header ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-violet-500/15 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-indigo-300 sm:px-4 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Índice de alquiler hoy
          </span>
          <h1 className="max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-5xl">
            Índices de{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              actualización de alquiler
            </span>
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-slate-300">
            Consultá el valor del índice de alquiler hoy. Fichas y fuentes oficiales
            de cada indicador para la actualización de alquileres en Argentina 2026.
          </p>
        </div>
      </section>

      {/* ── Index Grid ── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {indices.map((index) => (
            <Link
              key={index.code}
              href={`/indices/${index.code.toLowerCase()}`}
              className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/10 sm:p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600 transition-colors group-hover:bg-indigo-100">
                {index.code.slice(0, 2)}
              </div>
              <h2 className="text-lg font-bold text-slate-900">{index.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {index.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 transition-colors group-hover:text-indigo-500">
                Ver ficha completa
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
