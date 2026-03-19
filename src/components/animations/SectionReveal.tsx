"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface SectionRevealProps {
  children:   ReactNode;
  direction?: Direction;
  delay?:     number;
  duration?:  number;
  distance?:  number;
  blur?:      boolean;
  once?:      boolean;
  threshold?: number;
  className?: string;
  style?:     React.CSSProperties;
  as?:        keyof JSX.IntrinsicElements;
}

function makeVariants(
  direction: Direction,
  distance: number,
  duration: number,
  delay: number,
  blur: boolean,
): Variants {
  const axis: Record<Direction, { x?: number; y?: number }> = {
    up:    { y:  distance },
    down:  { y: -distance },
    left:  { x:  distance },
    right: { x: -distance },
    none:  {},
  };
  const hidden: any = {
    opacity: 0,
    ...axis[direction],
    ...(blur ? { filter: "blur(6px)" } : {}),
  };
  const show: any = {
    opacity: 1,
    x: 0, y: 0,
    ...(blur ? { filter: "blur(0px)" } : {}),
    transition: {
      duration,
      delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  };
  return { hidden, show };
}

/**
 * SectionReveal
 * -------------
 * Drop-in wrapper that fires a scroll-triggered entrance animation
 * when the element enters the viewport. Uses IntersectionObserver
 * directly (not Framer's whileInView) so it works reliably with Lenis.
 *
 * @example
 * <SectionReveal direction="up" delay={0.1}>
 *   <MySection />
 * </SectionReveal>
 */
export default function SectionReveal({
  children,
  direction  = "up",
  delay      = 0,
  duration   = 0.65,
  distance   = 32,
  blur       = false,
  once       = true,
  threshold  = 0.12,
  className,
  style,
  as         = "div",
}: SectionRevealProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold]);

  const variants = makeVariants(direction, distance, duration, delay, blur);
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Tag
      ref={ref as any}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}

/* ─── Stagger children variant ────────────────────────────── */
interface StaggerRevealProps {
  children:        ReactNode;
  staggerChildren?: number;
  delayChildren?:  number;
  threshold?:      number;
  className?:      string;
  style?:          React.CSSProperties;
}

/**
 * StaggerReveal
 * -------------
 * Container that staggers its direct motion children.
 * Each child should have its own `variants` prop (e.g. fadeUp).
 */
export function StaggerReveal({
  children,
  staggerChildren = 0.07,
  delayChildren   = 0.05,
  threshold       = 0.1,
  className,
  style,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren, delayChildren },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}