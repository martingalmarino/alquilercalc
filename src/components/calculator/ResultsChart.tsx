"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";
import { TrendUp } from "@phosphor-icons/react/dist/ssr";
import { Card } from "@/components/ui/Card";
import { ScheduleRow } from "@/lib/calc";
import { formatCurrency } from "@/lib/format";

export const ResultsChart = ({ rows }: { rows: ScheduleRow[] }) => (
  <Card className="p-4 sm:p-6">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
        <TrendUp size={16} weight="regular" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-900 sm:text-base">Evolución del alquiler</h3>
        <p className="text-xs text-slate-500">Visualización por período de actualización</p>
      </div>
    </div>
    <div className="h-56 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows} margin={{ left: 0, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="periodStart" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
          <YAxis
            tickFormatter={(value) => formatCurrency(Number(value))}
            tick={{ fontSize: 11 }}
            width={80}
          />
          <RechartsTooltip
            formatter={(value) => formatCurrency(Number(value))}
            labelFormatter={(label) => `Inicio ${label}`}
          />
          <Line
            type="monotone"
            dataKey="rent"
            stroke="#059669"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Card>
);
