"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PulseDotProps = {
  className?: string;
};

export const PulseDot = memo(({ className }: PulseDotProps) => (
  <motion.span
    className={cn("relative flex h-2.5 w-2.5", className)}
    initial={{ scale: 0.9, opacity: 0.65 }}
    animate={{ scale: 1.15, opacity: 1 }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 20,
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1.8,
    }}
  >
    <span className="absolute inset-0 rounded-full bg-emerald-500/30" />
    <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
  </motion.span>
));

PulseDot.displayName = "PulseDot";
