import { DollarSign, TrendingUp, BarChart3, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatPercent } from "@/lib/format";
import { CalcSummary } from "@/lib/calc";

export const ResultsSummary = ({ summary }: { summary: CalcSummary }) => (
  <div className="grid gap-4 md:grid-cols-4">
    <Card>
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <DollarSign className="h-4 w-4" />
      </div>
      <p className="text-sm text-slate-500">Próximo alquiler</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">
        {formatCurrency(summary.nextRent)}
      </p>
    </Card>
    <Card>
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <TrendingUp className="h-4 w-4" />
      </div>
      <p className="text-sm text-slate-500">Variación aplicada</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">
        {formatPercent(summary.pctChange)}
      </p>
    </Card>
    <Card>
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <BarChart3 className="h-4 w-4" />
      </div>
      <p className="text-sm text-slate-500">Índice y frecuencia</p>
      <p className="mt-1 text-lg font-bold text-slate-900">
        {summary.indexLabel}
      </p>
      <p className="text-sm text-slate-500">Cada {summary.frequencyMonths} meses</p>
    </Card>
    <Card>
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <RefreshCw className="h-4 w-4" />
      </div>
      <p className="text-sm text-slate-500">Datos actualizados</p>
      <p className="mt-1 text-lg font-bold text-slate-900">
        {summary.lastUpdatedAt}
      </p>
      <p className="text-xs text-slate-500">Última actualización del índice</p>
    </Card>
  </div>
);
