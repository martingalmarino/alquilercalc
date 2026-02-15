import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/format";
import { ScheduleRow } from "@/lib/calc";

export const ResultsTable = ({ rows }: { rows: ScheduleRow[] }) => (
  <Card className="overflow-hidden p-0">
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-6 py-4">Inicio</th>
            <th className="px-6 py-4">Fin</th>
            <th className="px-6 py-4">Índice base</th>
            <th className="px-6 py-4">Índice fin</th>
            <th className="px-6 py-4">Factor</th>
            <th className="px-6 py-4">Alquiler</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.periodStart} className="border-t border-slate-100">
              <td className="px-6 py-4 font-medium text-slate-900">{row.periodStart}</td>
              <td className="px-6 py-4 text-slate-600">{row.periodEnd}</td>
              <td className="px-6 py-4 text-slate-600">{row.indexStart.toFixed(2)}</td>
              <td className="px-6 py-4 text-slate-600">{row.indexEnd.toFixed(2)}</td>
              <td className="px-6 py-4 text-slate-600">{row.factor.toFixed(4)}</td>
              <td className="px-6 py-4 font-semibold text-slate-900">
                {formatCurrency(row.rent)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);
