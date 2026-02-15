import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/format";
import { ScheduleRow } from "@/lib/calc";

export const ResultsTable = ({ rows }: { rows: ScheduleRow[] }) => (
  <Card className="overflow-hidden p-0">
    <div className="-mx-px overflow-x-auto">
      <table className="w-full min-w-[540px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-3 py-3 sm:px-5 sm:py-4">Inicio</th>
            <th className="px-3 py-3 sm:px-5 sm:py-4">Fin</th>
            <th className="px-3 py-3 sm:px-5 sm:py-4">Índ. base</th>
            <th className="px-3 py-3 sm:px-5 sm:py-4">Índ. fin</th>
            <th className="px-3 py-3 sm:px-5 sm:py-4">Factor</th>
            <th className="px-3 py-3 sm:px-5 sm:py-4">Alquiler</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.periodStart} className="border-t border-slate-100">
              <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-slate-900 sm:px-5 sm:py-4 sm:text-sm">{row.periodStart}</td>
              <td className="whitespace-nowrap px-3 py-3 text-xs text-slate-600 sm:px-5 sm:py-4 sm:text-sm">{row.periodEnd}</td>
              <td className="whitespace-nowrap px-3 py-3 text-xs text-slate-600 sm:px-5 sm:py-4 sm:text-sm">{row.indexStart.toFixed(2)}</td>
              <td className="whitespace-nowrap px-3 py-3 text-xs text-slate-600 sm:px-5 sm:py-4 sm:text-sm">{row.indexEnd.toFixed(2)}</td>
              <td className="whitespace-nowrap px-3 py-3 text-xs text-slate-600 sm:px-5 sm:py-4 sm:text-sm">{row.factor.toFixed(4)}</td>
              <td className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-slate-900 sm:px-5 sm:py-4 sm:text-sm">
                {formatCurrency(row.rent)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);
