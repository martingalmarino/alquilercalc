import Link from "next/link";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import {
  FileText,
  ChartBar,
  Calculator,
  Scales,
  Lightbulb,
  ShareNetwork,
} from "@phosphor-icons/react/dist/ssr";
import { PulseDot } from "@/components/ui/PulseDot";

export const metadata: Metadata = {
  title: "Guías de Alquiler Argentina 2026 — Cómo Calcular Aumento de Alquiler",
  description:
    "Guías prácticas sobre actualización de alquiler en Argentina 2026. Aprené cómo calcular el aumento de alquiler, qué índice usar, marco legal vigente y consejos para tu contrato.",
};

type IconComponent = ComponentType<{
  size?: number;
  weight?: "regular" | "bold" | "light" | "thin" | "fill" | "duotone";
  className?: string;
}>;

const guides: { icon: IconComponent; title: string; desc: string }[] = [
  {
    icon: FileText,
    title: "Cómo leer tu contrato de alquiler",
    desc: "Entendé las cláusulas de actualización de alquiler, plazos y derechos que tenés como inquilino o propietario en Argentina.",
  },
  {
  icon: ChartBar,
    title: "Guía de índices de alquiler hoy",
    desc: "Diferencias entre ICL, IPC, UVA, Casa Propia y otros índices. Cuándo usar cada uno para calcular el aumento de alquiler.",
  },
  {
    icon: Calculator,
    title: "Cómo calcular aumento de alquiler paso a paso",
    desc: "Tutorial completo para usar la calculadora de alquiler y generar el cronograma de aumento de alquiler 2026.",
  },
  {
  icon: Scales,
    title: "Marco legal: aumento alquiler 2026",
    desc: "Resumen del DNU 70/2023 y cómo afecta la actualización de alquiler en Argentina. Qué dice la ley sobre cuánto aumenta el alquiler.",
  },
  {
    icon: Lightbulb,
    title: "Consejos para negociar tu contrato",
    desc: "Tips prácticos para acordar el índice de alquiler, frecuencia de aumento y condiciones favorables para ambas partes.",
  },
  {
  icon: ShareNetwork,
    title: "Compartir y exportar resultados",
    desc: "Cómo enviar el cronograma de aumento de alquiler por link, exportar CSV y preparar documentación para tu contrato.",
  },
];

export default function GuiasPage() {
  return (
    <div>
      {/* ── Page Header ── */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div className="space-y-4">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-slate-700/80 bg-slate-800/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-200">
              <PulseDot />
              Guías y recursos
            </span>
            <h1 className="text-3xl font-semibold tracking-tighter leading-none md:text-5xl">
              Guías prácticas para gestionar el alquiler en Argentina
            </h1>
            <p className="text-base text-slate-300 leading-relaxed max-w-[60ch]">
              Material de referencia para entender contratos, índices y el marco legal vigente. Estamos preparando nuevas guías en profundidad.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-sm text-slate-300">
            Próximamente vas a poder descargar plantillas y checklist de actualización de contratos.
          </div>
        </div>
      </section>

      {/* ── Guides Grid ── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
            Próximamente
          </span>
          <p className="text-sm text-slate-500">
            Estamos preparando estas guías. Volvé pronto.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          {guides.map((guide) => (
            <div
              key={guide.title}
              className="group relative rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.3)] opacity-80 transition-all duration-200 hover:opacity-100 sm:p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <guide.icon size={20} weight="regular" />
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
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-[0_18px_36px_-24px_rgba(5,150,105,0.9)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-emerald-500 active:translate-y-[1px]"
            >
              Ir a la calculadora →
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-[transform,border-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-emerald-200 hover:text-emerald-600 active:translate-y-[1px]"
            >
              Ver preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
