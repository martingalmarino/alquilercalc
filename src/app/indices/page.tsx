import Link from "next/link";
import type { Metadata } from "next";
import { getIndexMetaList } from "@/lib/indices";
import { PulseDot } from "@/components/ui/PulseDot";

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
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div className="space-y-4">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-slate-700/80 bg-slate-800/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-200">
              <PulseDot />
              Índice de alquiler hoy
            </span>
            <h1 className="text-3xl font-semibold tracking-tighter leading-none md:text-5xl">
              Índices oficiales para actualizar alquileres
            </h1>
            <p className="text-base text-slate-300 leading-relaxed max-w-[60ch]">
              Consultá cada índice con su frecuencia, fuente oficial y descripción. Todas las fichas están listas para revisar antes de calcular un contrato.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-sm text-slate-300">
            Elegí el índice que corresponde al contrato y consultá su ficha con el detalle de la fuente pública.
          </div>
        </div>
      </section>

      {/* ── Index Grid ── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          {indices.map((index) => (
            <Link
              key={index.code}
              href={`/indices/${index.code.toLowerCase()}`}
              className="group relative rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.3)] transition-all duration-200 hover:-translate-y-1 sm:p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg font-bold text-emerald-600">
                {index.code.slice(0, 2)}
              </div>
              <h2 className="text-lg font-bold text-slate-900">{index.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {index.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
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
