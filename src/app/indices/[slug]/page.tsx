import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { indexMeta, indexCodes, IndexCode } from "@data/mockIndices";
import { PulseDot } from "@/components/ui/PulseDot";

const slugToCode = (slug: string): IndexCode | null => {
  const match = indexCodes.find((code) => code.toLowerCase() === slug.toLowerCase());
  return match ?? null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const code = slugToCode(slug);
  if (!code) return {};
  const meta = indexMeta[code];
  return {
    title: `${meta.name} (${code}) Hoy — Índice de Alquiler Argentina 2026`,
    description: `Valor del ${meta.name} (${code}) hoy para calcular el aumento de alquiler en Argentina. Fuente: ${meta.sourceName}. Frecuencia: ${meta.frequency}. Datos actualizados para actualización de alquiler 2026.`,
  };
}

export async function generateStaticParams() {
  return indexCodes.map((code) => ({ slug: code.toLowerCase() }));
}

export default async function IndexDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const code = slugToCode(slug);
  if (!code) {
    notFound();
  }
  const meta = indexMeta[code];

  return (
    <div>
      {/* ── Page Header ── */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div className="space-y-4">
            <nav className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/indices" className="transition hover:text-emerald-300">
                Índices
              </Link>
              <span>/</span>
              <span className="text-slate-300">{meta.name}</span>
            </nav>
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-slate-700/80 bg-slate-800/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-200">
              <PulseDot />
              {code}
            </span>
            <h1 className="text-3xl font-semibold tracking-tighter leading-none md:text-5xl">
              Índice {meta.name} para alquileres
            </h1>
            <p className="text-base text-slate-300 leading-relaxed max-w-[60ch]">
              {meta.description} Este índice se usa para ajustar contratos según la frecuencia pactada.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-sm text-slate-300">
            Fuente oficial: {meta.sourceName}. Frecuencia de publicación: {meta.frequency}.
          </div>
        </div>
      </section>

      {/* ── Detail Cards ── */}
      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.3)] sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Código
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{code}</p>
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.3)] sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Frecuencia
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{meta.frequency}</p>
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.3)] sm:p-6 sm:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Fuente
            </p>
            <a
              href={meta.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-lg font-bold text-emerald-600 transition hover:text-emerald-500"
            >
              {meta.sourceName}
              <span className="text-sm">↗</span>
            </a>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            href="/indices"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 transition-[transform,border-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-emerald-200 hover:text-emerald-600 active:translate-y-[1px]"
          >
            ← Volver a todos los índices
          </Link>
        </div>
      </section>
    </div>
  );
}
