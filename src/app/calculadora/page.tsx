import type { Metadata } from "next";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { PulseDot } from "@/components/ui/PulseDot";

export const metadata: Metadata = {
  title: "Calculadora de Alquiler 2026 — Simulador Aumento Alquiler Argentina",
  description:
    "Calculadora de aumento de alquiler online y gratuita. Ingresá tu contrato y calculá cuánto aumenta el alquiler en 2026 con ICL, IPC, UVA, Casa Propia y otros índices oficiales de Argentina.",
};

export default function CalculadoraPage() {
  return (
    <div>
      {/* ── Page Header ── */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div className="space-y-4">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-slate-700/80 bg-slate-800/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-200">
              <PulseDot />
              Simulador gratuito
            </span>
            <h1 className="text-3xl font-semibold tracking-tighter leading-none md:text-5xl">
              Calculadora de aumento de alquiler con índices oficiales
            </h1>
            <p className="text-base text-slate-300 leading-relaxed max-w-[60ch]">
              Ingresá los datos del contrato y generá el cronograma completo con valores ajustados, fechas y factores de cada período.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-sm text-slate-300">
            La herramienta calcula automáticamente la actualización según el índice pactado y guarda la última fecha de publicación disponible.
          </div>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <CalculatorForm />
      </section>
    </div>
  );
}
