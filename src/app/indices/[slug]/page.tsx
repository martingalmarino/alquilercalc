import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { indexMeta, indexCodes, IndexCode } from "@data/mockIndices";

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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-violet-500/15 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
          {/* Breadcrumb */}
          <nav className="mb-2 flex items-center gap-2 text-xs text-slate-400">
            <Link href="/indices" className="transition hover:text-indigo-300">
              Índices
            </Link>
            <span>/</span>
            <span className="text-slate-300">{meta.name}</span>
          </nav>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-xl font-bold text-indigo-300">
            {code.slice(0, 2)}
          </div>
          <h1 className="max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-5xl">
            Índice {meta.name} ({code}) — Alquiler Hoy
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-slate-300">
            {meta.description} — Usado para calcular el aumento de alquiler en Argentina.
          </p>
        </div>
      </section>

      {/* ── Detail Cards ── */}
      <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Código
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{code}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Frecuencia
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{meta.frequency}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Fuente
            </p>
            <a
              href={meta.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-lg font-bold text-indigo-600 transition hover:text-indigo-500"
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
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
          >
            ← Volver a todos los índices
          </Link>
        </div>
      </section>
    </div>
  );
}
