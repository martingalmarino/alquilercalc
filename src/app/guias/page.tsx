import Link from "next/link";
import type { Metadata } from "next";
import {
  FileText,
  BarChart3,
  Calculator,
  Scale,
  Lightbulb,
  Share2,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Guías de Alquiler Argentina 2026 — Cómo Calcular Aumento de Alquiler",
  description:
    "Guías prácticas sobre actualización de alquiler en Argentina 2026. Aprené cómo calcular el aumento de alquiler, qué índice usar, marco legal vigente y consejos para tu contrato.",
};

const guides: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: FileText,
    title: "Cómo leer tu contrato de alquiler",
    desc: "Entendé las cláusulas de actualización de alquiler, plazos y derechos que tenés como inquilino o propietario en Argentina.",
  },
  {
    icon: BarChart3,
    title: "Guía de índices de alquiler hoy",
    desc: "Diferencias entre ICL, IPC, UVA, Casa Propia y otros índices. Cuándo usar cada uno para calcular el aumento de alquiler.",
  },
  {
    icon: Calculator,
    title: "Cómo calcular aumento de alquiler paso a paso",
    desc: "Tutorial completo para usar la calculadora de alquiler y generar el cronograma de aumento de alquiler 2026.",
  },
  {
    icon: Scale,
    title: "Marco legal: aumento alquiler 2026",
    desc: "Resumen del DNU 70/2023 y cómo afecta la actualización de alquiler en Argentina. Qué dice la ley sobre cuánto aumenta el alquiler.",
  },
  {
    icon: Lightbulb,
    title: "Consejos para negociar tu contrato",
    desc: "Tips prácticos para acordar el índice de alquiler, frecuencia de aumento y condiciones favorables para ambas partes.",
  },
  {
    icon: Share2,
    title: "Compartir y exportar resultados",
    desc: "Cómo enviar el cronograma de aumento de alquiler por link, exportar CSV y preparar documentación para tu contrato.",
  },
];

export default function GuiasPage() {
  return (
    <div>
      {/* ── Page Header ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-violet-500/15 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-indigo-300 sm:px-4 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Actualización alquiler Argentina
          </span>
          <h1 className="max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-5xl">
            Guías sobre{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              alquiler en Argentina
            </span>
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-slate-300">
            Recursos educativos sobre cómo calcular el aumento de alquiler, actualización de contratos y marco
            legal en Argentina 2026.
          </p>
        </div>
      </section>

      {/* ── Guides Grid ── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
            Próximamente
          </span>
          <p className="text-sm text-slate-500">
            Estamos preparando estas guías. ¡Volvé pronto!
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <div
              key={guide.title}
              className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm opacity-75 transition-all duration-200 hover:opacity-100 hover:shadow-lg hover:shadow-indigo-500/10 sm:p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <guide.icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">{guide.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {guide.desc}
              </p>
              <p className="mt-4 text-xs font-bold text-slate-400">
                Disponible pronto
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Mientras tanto, podés usar la calculadora o consultar la metodología.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link
              href="/calculadora"
              className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              Ir a la calculadora →
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
            >
              Ver preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
