import { cn } from "@/lib/utils";

export type ChipOption<T extends string | number> = {
  label: string;
  value: T;
};

type ChipGroupProps<T extends string | number> = {
  label: string;
  options: ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  helper?: string;
  disabled?: boolean;
};

export const ChipGroup = <T extends string | number>({
  label,
  options,
  value,
  onChange,
  helper,
  disabled = false,
}: ChipGroupProps<T>) => (
  <fieldset className="flex flex-col gap-3">
    {label && <legend className="text-sm font-medium text-slate-700">{label}</legend>}
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            tabIndex={0}
            onClick={() => onChange(option.value)}
            disabled={disabled}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40",
              disabled && "cursor-not-allowed opacity-60",
              active
                ? "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
    {helper && <span className="text-xs text-slate-500">{helper}</span>}
  </fieldset>
);
