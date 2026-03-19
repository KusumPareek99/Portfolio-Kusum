"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { liftHover } from "@/lib/animations";

// ─── TECH TAG ─────────────────────────────────────────────────────────────

interface TechTagProps {
  label: string;
  className?: string;
}

/**
 * Small monospace tag for project/experience tech stacks.
 * Violet tinted bg + border.
 */
export function TechTag({ label, className }: TechTagProps) {
  return (
    <span className={cn("tech-tag", className)}>
      {label}
    </span>
  );
}

// ─── SKILL CHIP ───────────────────────────────────────────────────────────

interface SkillChipProps {
  name: string;
  color: string; // dot color
  className?: string;
  onClick?: () => void;
}

/**
 * Interactive skill chip with colored indicator dot.
 * Used in the Skills section grid.
 */
export function SkillChip({ name, color, className, onClick }: SkillChipProps) {
  return (
    <motion.button
      whileHover={liftHover}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn("skill-chip", className)}
      style={
        {
          "--dot-color": color,
        } as React.CSSProperties
      }
    >
      {/* Colored dot matching official tech color */}
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span>{name}</span>
    </motion.button>
  );
}

// ─── BADGE CHIP ───────────────────────────────────────────────────────────

interface BadgeChipProps {
  label: string;
  color?: "violet" | "cyan" | "amber" | "emerald";
  className?: string;
}

const colorMap = {
  violet: "text-accent-violet border-accent-violet/30 bg-accent-violet/10",
  cyan: "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10",
  amber: "text-accent-amber border-accent-amber/30 bg-accent-amber/10",
  emerald: "text-accent-emerald border-accent-emerald/30 bg-accent-emerald/10",
};

/**
 * Colored status/achievement badge.
 * Used for "Gold Medalist", "Featured", "Open to Work" etc.
 */
export function BadgeChip({
  label,
  color = "violet",
  className,
}: BadgeChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full",
        "font-mono text-[10px] font-medium border",
        colorMap[color],
        className
      )}
    >
      {label}
    </span>
  );
}