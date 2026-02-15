import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur",
      className
    )}
    {...props}
  />
);
