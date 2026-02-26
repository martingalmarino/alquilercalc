"use client";

import { useState } from "react";
import { LinkSimple, Download, Printer, Check } from "@phosphor-icons/react/dist/ssr";
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

export const ShareBar = ({ shareUrl = "", rows }: { shareUrl?: string; rows: ScheduleRow[] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const resolvedUrl =
      shareUrl || (typeof window !== "undefined" ? window.location.href : "");
    if (!resolvedUrl) return;
    await navigator.clipboard.writeText(resolvedUrl);
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
    <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
      <Button type="button" variant="outline" onClick={handleCopy} className="w-full sm:w-auto">
        {copied ? <Check size={16} weight="regular" /> : <LinkSimple size={16} weight="regular" />}
        {copied ? "Copiado" : "Copiar enlace"}
      </Button>
      <Button type="button" variant="outline" onClick={handleExport} className="w-full sm:w-auto">
        <Download size={16} weight="regular" />
        Exportar CSV
      </Button>
      <Button type="button" variant="ghost" onClick={() => window.print()} className="w-full sm:w-auto">
        <Printer size={16} weight="regular" />
        Imprimir
      </Button>
    </div>
  );
};
