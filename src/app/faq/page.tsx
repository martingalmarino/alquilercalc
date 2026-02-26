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
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div className="space-y-4">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-slate-700/80 bg-slate-800/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-200">
              Aumento de alquiler 2026
            </span>
            <h1 className="text-3xl font-semibold tracking-tighter leading-none md:text-5xl">
              Preguntas frecuentes sobre el cálculo de alquiler
            </h1>
            <p className="text-base text-slate-300 leading-relaxed max-w-[60ch]">
              Respuestas claras sobre índices, fechas de actualización y el uso de la calculadora.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-sm text-slate-300">
            Si necesitás una guía rápida, consultá la metodología o probá la calculadora con un contrato real.
          </div>
        </div>
      </section>

      {/* ── FAQ List ── */}
      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)] transition-all open:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-4 text-left text-sm font-bold text-slate-900 transition hover:text-emerald-600 sm:gap-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2 sm:gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[10px] font-bold text-emerald-600 sm:h-8 sm:w-8 sm:text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {faq.q}
                </span>
                <span className="shrink-0 text-slate-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-slate-100 px-4 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4">
                <p className="pl-9 text-sm leading-relaxed text-slate-600 sm:pl-11">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 text-center sm:mt-12 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">¿Querés calcular cuánto aumenta tu alquiler?</h2>
          <p className="mt-2 text-sm text-slate-600">
            Usá nuestra calculadora de alquiler o revisá la metodología de cálculo de aumento.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link
              href="/metodologia"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-[0_18px_36px_-24px_rgba(5,150,105,0.9)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-emerald-500 active:translate-y-[1px]"
            >
              Ver metodología
            </Link>
            <Link
              href="/calculadora"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-[transform,border-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-emerald-200 hover:text-emerald-600 active:translate-y-[1px]"
            >
              Ir a la calculadora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
