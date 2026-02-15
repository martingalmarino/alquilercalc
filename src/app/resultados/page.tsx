import type { Metadata } from "next";
import { Suspense } from "react";
import ResultsView from "@/app/resultados/ResultsView";

export const metadata: Metadata = {
  title: "Resultado del Aumento de Alquiler 2026 — Cuánto Aumenta el Alquiler",
  description:
    "Resultados del cálculo de aumento de alquiler en Argentina 2026. Consultá el cronograma completo de actualización con índices oficiales y compartilo con tu inquilino o propietario.",
  robots: { index: false, follow: false },
};

export default function ResultadosPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-4xl px-6 py-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Cargando resultados...</p>
          </div>
        </div>
      }
    >
      <ResultsView />
    </Suspense>
  );
}
