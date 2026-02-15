import { DollarSign, TrendingUp, BarChart3, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatPercent } from "@/lib/format";
import { CalcSummary } from "@/lib/calc";

export const ResultsSummary = ({ summary }: { summary: CalcSummary }) => (
  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
    <Card className="p-4 sm:p-6">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <DollarSign className="h-4 w-4" />
      </div>
      <p className="text-xs text-slate-500 sm:text-sm">Próximo alquiler</p>
      <p className="mt-1 text-lg font-bold text-slate-900 sm:text-2xl">
        {formatCurrency(summary.nextRent)}
      </p>
    </Card>
    <Card className="p-4 sm:p-6">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <TrendingUp className="h-4 w-4" />
      </div>
      <p className="text-xs text-slate-500 sm:text-sm">Variación aplicada</p>
      <p className="mt-1 text-lg font-bold text-slate-900 sm:text-2xl">
        {formatPercent(summary.pctChange)}
      </p>
    </Card>
    <Card className="p-4 sm:p-6">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <BarChart3 className="h-4 w-4" />
      </div>
      <p className="text-xs text-slate-500 sm:text-sm">Índice y frecuencia</p>
      <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
        {summary.indexLabel}
      </p>
      <p className="text-xs text-slate-500 sm:text-sm">Cada {summary.frequencyMonths} meses</p>
    </Card>
    <Card className="p-4 sm:p-6">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <RefreshCw className="h-4 w-4" />
      </div>
      <p className="text-xs text-slate-500 sm:text-sm">Datos actualizados</p>
      <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
        {summary.lastUpdatedAt}
      </p>
      <p className="text-xs text-slate-500">Última actualización del índice</p>
    </Card>
  </div>
);
