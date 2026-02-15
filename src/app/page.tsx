import Link from "next/link";
import type { Metadata } from "next";
import {
  BarChart3,
  RefreshCw,
  Share2,
  Smartphone,
  Search,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Calculadora de Alquiler Argentina 2026 — Cuánto Aumenta el Alquiler",
  description:
    "Calculadora de alquiler gratuita para Argentina. Calculá el aumento de alquiler 2026 con ICL, IPC, UVA y 8 índices oficiales. Simulador de actualización de alquiler con datos del BCRA e INDEC.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Alquiler Argentina — Alquileres+AR",
  description:
    "Calculadora de alquiler gratuita para Argentina. Calculá el aumento de alquiler 2026 con ICL, IPC, UVA y 8 índices oficiales.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alquilercalc.vercel.app",
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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center md:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Simulador aumento alquiler — Gratis
          </span>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl">
            Calculadora de alquiler:{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              calculá tu aumento 2026
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-300">
            ¿Cuánto aumenta el alquiler? Simulá la actualización de tu alquiler en Argentina
            con ICL, IPC, Casa Propia y más índices oficiales. Proyectá toda la vida del
            contrato, exportá CSV y compartí resultados.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/calculadora"
              className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 hover:shadow-indigo-400/30"
            >
              Ir a la calculadora →
            </Link>
            <Link
              href="/metodologia"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:text-white"
            >
              Ver metodología
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Cómo calcular el aumento de alquiler en Argentina
          </h2>
          <p className="mt-3 text-slate-500">
            Nuestra calculadora de alquiler está diseñada para inquilinos, propietarios e inmobiliarias.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <BarChart3 className="h-5 w-5" />,
              title: "8 índices de alquiler hoy",
              description:
                "Consultá el índice de alquiler hoy: ICL, IPC, Casa Propia, CAC, CER, IS, IPIM y UVA con datos actualizados.",
            },
            {
              icon: <RefreshCw className="h-5 w-5" />,
              title: "Simulador aumento alquiler",
              description:
                "Simulá el aumento de alquiler 2026 período por período: índice, factor y monto actualizados automáticamente.",
            },
            {
              icon: <TrendingUp className="h-5 w-5" />,
              title: "Cronograma de actualización",
              description:
                "Tabla y gráfico con la evolución del alquiler a lo largo de todo el contrato. Sabé cuánto aumenta el alquiler cada período.",
            },
            {
              icon: <Share2 className="h-5 w-5" />,
              title: "Compartí y exportá",
              description:
                "Generá un link con los resultados, descargá el cronograma en CSV o imprimí el resumen del aumento de alquiler.",
            },
            {
              icon: <Smartphone className="h-5 w-5" />,
              title: "Calculadora mobile-first",
              description:
                "La calculadora de alquiler funciona perfecto en celular, tablet y escritorio. Rápida y accesible.",
            },
            {
              icon: <Search className="h-5 w-5" />,
              title: "Transparente y confiable",
              description:
                "Fórmula abierta, fuentes oficiales documentadas (BCRA, INDEC) y metodología de cálculo explicada.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                {feature.icon}
              </span>
              <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Cómo calcular aumento de alquiler en 3 pasos</h2>
            <p className="mt-3 text-slate-500">Usá nuestro simulador de aumento de alquiler y obtené resultados en segundos.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Cargá los datos del contrato",
                description:
                  "Ingresá el alquiler inicial, la fecha de inicio y la frecuencia de actualización pactada.",
              },
              {
                step: "02",
                title: "Elegí el índice de alquiler",
                description:
                  "Seleccioná entre ICL, IPC, Casa Propia, CAC y otros índices para calcular el aumento de alquiler.",
              },
              {
                step: "03",
                title: "Consultá cuánto aumenta",
                description:
                  "Obtené la proyección completa del aumento de alquiler 2026 con tabla, gráfico y exportación a CSV.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-bold text-white">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-px overflow-hidden rounded-2xl bg-slate-200 md:grid-cols-3">
          {[
            { value: "8", label: "Índices cubiertos" },
            { value: "12", label: "Frecuencias disponibles" },
            { value: "100%", label: "Código abierto" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 bg-white px-8 py-10">
              <span className="text-4xl font-extrabold text-indigo-600">{stat.value}</span>
              <span className="text-sm font-medium text-slate-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-16 text-center shadow-xl shadow-indigo-600/20">
          <h2 className="text-3xl font-bold text-white">¿Cuánto aumenta el alquiler en 2026?</h2>
          <p className="max-w-md text-indigo-100">
            Usá nuestra calculadora de alquiler y obtené una proyección clara del aumento en segundos.
          </p>
          <Link
            href="/calculadora"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
          >
            Abrir la calculadora de alquiler →
          </Link>
        </div>
      </section>
    </div>
  );
}
