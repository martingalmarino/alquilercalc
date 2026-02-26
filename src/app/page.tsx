import type { Metadata } from "next";
import {
  ChartBar,
  ArrowClockwise,
  ShareNetwork,
  DeviceMobile,
  MagnifyingGlass,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { PulseDot } from "@/components/ui/PulseDot";

export const metadata: Metadata = {
  title: "Calculadora de Alquiler Argentina 2026 — Cuánto Aumenta el Alquiler",
  description:
    "Calculadora de alquiler gratuita para Argentina. Calculá el aumento de alquiler 2026 con ICL, IPC, UVA y 8 índices oficiales. Simulador de actualización de alquiler con datos del BCRA e INDEC.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Alquiler Argentina — AlquilerCalc",
  description:
    "Calculadora de alquiler gratuita para Argentina. Calculá el aumento de alquiler 2026 con ICL, IPC, UVA y 8 índices oficiales.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.alquilercalc.com.ar",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "ARS",
  },
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ── */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/80 bg-slate-800/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-200">
              <PulseDot />
              Actualización en tiempo real
            </div>
            <h1 className="text-4xl font-semibold tracking-tighter leading-none md:text-6xl">
              Calculadora de alquiler para seguir tu actualización 2026
            </h1>
            <p className="text-base text-slate-300 leading-relaxed max-w-[65ch]">
              Simulá el aumento de alquiler en Argentina con índices oficiales y obtené un cronograma completo del contrato. Exportá el detalle en CSV o compartí el link con tu inmobiliaria.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticLink
                href="/calculadora"
                className="items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-[0_18px_36px_-24px_rgba(5,150,105,0.9)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-emerald-500 active:translate-y-[1px]"
              >
                Calcular aumento
              </MagneticLink>
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Datos oficiales. Fórmula transparente. Sin registros.
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/70 p-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.9)]">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
              Panorama de contrato
              <span className="text-emerald-300">Actualizado hoy</span>
            </div>
            <div className="mt-6 space-y-4">
              {[
                {
                  title: "Índices oficiales activos",
                  value: "ICL · IPC · UVA · Casa Propia",
                  icon: ChartBar,
                },
                {
                  title: "Cronograma de ajustes",
                  value: "Actualizaciones por período con trazabilidad",
                  icon: TrendUp,
                },
                {
                  title: "Exportación inmediata",
                  value: "CSV + link compartible para cada contrato",
                  icon: ShareNetwork,
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 border-t border-slate-800/80 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                    <item.icon size={20} weight="regular" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                    <p className="text-xs leading-relaxed text-slate-400">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Todo el aumento de alquiler en un solo tablero</h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-[65ch]">
              AlquilerCalc organiza cada etapa del contrato con un sistema claro de índices y ajustes. Cada cálculo queda documentado para que inquilinos y propietarios comparen escenarios sin dudas.
            </p>
          </div>
          <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200/80 bg-white">
            {[
              {
                title: "Índices oficiales por contrato",
                description: "Elegí ICL, IPC, UVA o Casa Propia con fuentes verificadas y trazabilidad por período.",
                icon: ChartBar,
              },
              {
                title: "Proyección precisa de ajustes",
                description: "Generá el cronograma completo con fechas, factores y valores actualizados automáticamente.",
                icon: ArrowClockwise,
              },
              {
                title: "Compartir y exportar",
                description: "Copiá el link, exportá CSV y guardá el historial con un único flujo.",
                icon: ShareNetwork,
              },
              {
                title: "Experiencia mobile-first",
                description: "Usá la calculadora desde el celular con la misma claridad que en escritorio.",
                icon: DeviceMobile,
              },
              {
                title: "Metodología abierta",
                description: "Accedé a la fórmula, fuentes y reglas de cálculo en un mismo lugar.",
                icon: MagnifyingGlass,
              },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-4 px-6 py-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <feature.icon size={20} weight="regular" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{feature.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Tres pasos claros para calcular el aumento</h2>
              <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200/80 bg-white">
                {[
                  {
                    step: "01",
                    title: "Cargá el contrato",
                    description: "Ingresá el alquiler inicial y la fecha de inicio con la frecuencia acordada.",
                  },
                  {
                    step: "02",
                    title: "Elegí el índice",
                    description: "Seleccioná el índice oficial correspondiente para la actualización.",
                  },
                  {
                    step: "03",
                    title: "Revisá el cronograma",
                    description: "Obtené el detalle de cada período con factor y monto actualizado.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 px-6 py-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold text-white">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.35)]">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Información clave</p>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Todo el contrato en un único panel de resultados
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                El cronograma muestra fechas, índices y valores ajustados con un formato que se puede imprimir o compartir. Las fuentes quedan registradas para que cada ajuste sea verificable.
              </p>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Incluye tabla detallada, gráfico de evolución y exportación inmediata en CSV.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="grid gap-6 rounded-3xl border border-slate-200/80 bg-white px-6 py-10 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.35)] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">¿Listo para calcular tu próximo ajuste?</h2>
            <p className="mt-2 text-sm text-slate-600 max-w-[60ch]">
              Usá la calculadora y generá el cronograma completo con datos oficiales, sin registro y con exportación inmediata.
            </p>
          </div>
          <MagneticLink
            href="/calculadora"
            className="items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-[0_18px_36px_-24px_rgba(5,150,105,0.9)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-emerald-500 active:translate-y-[1px]"
          >
            Calcular aumento
          </MagneticLink>
        </div>
      </section>
    </div>
  );
}
