"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { type ReactNode, type MouseEvent } from "react";

type MagneticLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  strength?: number;
  ariaLabel?: string;
};

export const MagneticLink = ({
  href,
  className,
  children,
  strength = 18,
  ariaLabel,
}: MagneticLinkProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set((offsetX / rect.width) * strength);
    y.set((offsetY / rect.height) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-flex"
    >
      <Link href={href} aria-label={ariaLabel} className={cn("inline-flex", className)}>
        {children}
      </Link>
    </motion.div>
  );
};
