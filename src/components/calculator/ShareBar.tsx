"use client";

import { useState } from "react";
import { Link2, Download, Printer, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScheduleRow } from "@/lib/calc";
import { formatCurrency } from "@/lib/format";

const buildCsv = (rows: ScheduleRow[]) => {
  const header = [
    "period_start",
    "period_end",
    "index_start",
    "index_end",
    "factor",
    "rent",
  ];
  const lines = rows.map((row) => [
    row.periodStart,
    row.periodEnd,
    row.indexStart.toFixed(4),
    row.indexEnd.toFixed(4),
    row.factor.toFixed(4),
    formatCurrency(row.rent),
  ]);
  return [header, ...lines].map((line) => line.join(",")).join("\n");
};

export const ShareBar = ({ shareUrl, rows }: { shareUrl: string; rows: ScheduleRow[] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const blob = new Blob([buildCsv(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "alquileres-resultados.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button" variant="outline" onClick={handleCopy}>
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        {copied ? "¡Copiado!" : "Copiar enlace"}
      </Button>
      <Button type="button" variant="outline" onClick={handleExport}>
        <Download className="h-4 w-4" />
        Exportar CSV
      </Button>
      <Button type="button" variant="ghost" onClick={() => window.print()}>
        <Printer className="h-4 w-4" />
        Imprimir
      </Button>
    </div>
  );
};
