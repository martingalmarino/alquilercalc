import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes — Aumento Alquiler 2026, Índices y Calculadora",
  description:
    "Preguntas frecuentes sobre el aumento de alquiler en Argentina 2026. Cómo calcular el aumento, qué índice usar (ICL, IPC, UVA), cada cuánto se actualiza el alquiler y más.",
};

const faqs = [
  {
    q: "¿Cómo calcular el aumento de alquiler en Argentina?",
    a: "Usá nuestra calculadora de alquiler: ingresá el monto inicial, la fecha de inicio del contrato, el índice pactado y la frecuencia de actualización. La calculadora aplica la fórmula oficial (alquiler × índice fin / índice inicio) y te muestra cuánto aumenta el alquiler en cada período.",
  },
  {
    q: "¿Qué índice de alquiler debo usar para mi contrato?",
    a: "Depende de tu contrato. Los contratos firmados desde julio 2020 bajo la Ley 27.551 usaban el ICL del BCRA. Desde diciembre 2023, con el DNU 70/2023, las partes pueden pactar libremente el índice de alquiler (IPC, ICL, Casa Propia, UVA, etc.).",
  },
  {
    q: "¿Cada cuánto se actualiza el alquiler en 2026?",
    a: "La frecuencia del aumento de alquiler depende de lo pactado en el contrato. Lo más común es trimestral, cuatrimestral o semestral. Nuestra calculadora de aumento de alquiler soporta frecuencias de 1 a 12 meses.",
  },
  {
    q: "¿Los datos de los índices de alquiler son oficiales?",
    a: "Sí. Los datos de ICL, CER y UVA provienen de datos.gob.ar (BCRA). IPC e IPIM se obtienen del INDEC. IS se aproxima con RIPTE. CAC y CasaPropia se actualizan manualmente desde sus fuentes oficiales.",
  },
  {
    q: "¿Cuánto aumenta el alquiler con ICL en 2026?",
    a: "El aumento de alquiler con ICL depende del período de tu contrato. Usá nuestro simulador de aumento de alquiler para calcular el porcentaje exacto según las fechas de tu contrato. El ICL se publica diariamente por el BCRA.",
  },
  {
    q: "¿Puedo compartir los resultados del cálculo de aumento?",
    a: "Sí. La calculadora de alquiler genera un enlace único con todos los parámetros. También podés exportar el cronograma de aumento de alquiler en CSV o imprimirlo directamente.",
  },
  {
    q: "¿Qué pasa si el índice de alquiler no tiene dato para una fecha?",
    a: "Usamos el último dato disponible antes de esa fecha. Para índices mensuales, tomamos el valor del primer día del mes de referencia.",
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* ── Page Header ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-violet-500/15 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-16 text-center md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Aumento alquiler 2026
          </span>
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Preguntas frecuentes sobre{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              aumento de alquiler
            </span>
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-slate-300">
            Respuestas sobre cómo calcular el aumento de alquiler, qué índice usar
            y cómo funciona la calculadora de alquiler.
          </p>
        </div>
      </section>

      {/* ── FAQ List ── */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all open:shadow-lg open:shadow-indigo-500/10"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-sm font-bold text-slate-900 transition hover:text-indigo-600 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {faq.q}
                </span>
                <span className="shrink-0 text-slate-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-slate-100 px-6 pb-5 pt-4">
                <p className="pl-11 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">¿Querés calcular cuánto aumenta tu alquiler?</h2>
          <p className="mt-2 text-sm text-slate-600">
            Usá nuestra calculadora de alquiler o revisá la metodología de cálculo de aumento.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/metodologia"
              className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              Ver metodología
            </Link>
            <Link
              href="/calculadora"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
            >
              Ir a la calculadora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
