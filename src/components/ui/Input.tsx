import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helper?: string;
  error?: string;
};

export const Input = ({ label, helper, error, className, ...props }: InputProps) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
    {label && <span>{label}</span>}
    <input
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/25",
        error && "border-rose-300 focus:border-rose-400 focus:ring-rose-200",
        className
      )}
      {...props}
    />
    {helper && !error && <span className="text-xs text-slate-500">{helper}</span>}
    {error && <span className="text-xs text-rose-500">{error}</span>}
  </label>
);
