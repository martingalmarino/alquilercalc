import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.35)]",
      className
    )}
    {...props}
  />
);
