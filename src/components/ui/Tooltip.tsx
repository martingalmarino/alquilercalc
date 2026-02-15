import { ReactNode } from "react";

type TooltipProps = {
  label: string;
  children: ReactNode;
};

export const Tooltip = ({ label, children }: TooltipProps) => (
  <span className="group relative inline-flex items-center">
    {children}
    <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
      {label}
    </span>
  </span>
);
