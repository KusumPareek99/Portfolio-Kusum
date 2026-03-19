"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, defaultViewport } from "@/lib/animations";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string; // Part of title to render in gradient
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Consistent section header used across all portfolio sections.
 * Renders: eyebrow label → title (optionally with gradient word) → subtitle.
 *
 * @example
 * <SectionHeading
 *   eyebrow="what i've built"
 *   title="Selected"
 *   titleHighlight="Projects"
 *   subtitle="A mix of professional work and personal experiments."
 * />
 */
export default function SectionHeading({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={defaultViewport}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="section-label">{eyebrow}</p>
      )}

      <h2 className="section-title">
        {title}{" "}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </h2>

      {subtitle && (
        <p className={cn(
          "mt-4 font-body text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed",
          align === "center" && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}