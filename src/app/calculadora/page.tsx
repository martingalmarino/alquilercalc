import type { Metadata } from "next";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";

export const metadata: Metadata = {
  title: "Calculadora de Alquiler 2026 — Simulador Aumento Alquiler Argentina",
  description:
    "Calculadora de aumento de alquiler online y gratuita. Ingresá tu contrato y calculá cuánto aumenta el alquiler en 2026 con ICL, IPC, UVA, Casa Propia y otros índices oficiales de Argentina.",
};

export default function CalculadoraPage() {
  return (
    <div>
      {/* ── Page Header ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-violet-500/15 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-16 text-center md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Simulador aumento alquiler — Gratis
          </span>
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Calculadora de{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              aumento de alquiler
            </span>
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-slate-300">
            Ingresá los datos de tu contrato y calculá cuánto aumenta el alquiler
            en 2026 con el índice que corresponda. Actualizaciones automáticas con datos oficiales.
          </p>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <CalculatorForm />
      </section>
    </div>
  );
}
