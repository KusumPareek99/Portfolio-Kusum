"use client";

import { useRef, useState, useCallback, ReactNode, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticProps {
  children:   ReactNode;
  strength?:  number;
  radius?:    number;
  className?: string;
  style?:     React.CSSProperties;
}

/**
 * MagneticElement — element that gently follows the cursor when hovered.
 */
export function MagneticElement({
  children,
  strength  = 0.28,
  radius    = 80,
  className,
  style,
}: MagneticProps) {
  const ref  = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x    = useSpring(rawX, { stiffness: 220, damping: 24 });
  const y    = useSpring(rawY, { stiffness: 220, damping: 24 });

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el   = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = e.clientX - cx;
    const dy   = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) { rawX.set(dx * strength); rawY.set(dy * strength); }
  }, [radius, strength, rawX, rawY]);

  const onLeave = useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...style, x, y, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── GlowCard ─────────────────────────────────────────────── */
interface GlowCardProps {
  children:   ReactNode;
  color?:     string;
  intensity?: number;
  className?: string;
  style?:     React.CSSProperties;
}

function hexToRgb(hex: string): string {
  const c = hex.replace("#", "");
  return `${parseInt(c.slice(0,2),16)},${parseInt(c.slice(2,4),16)},${parseInt(c.slice(4,6),16)}`;
}

/**
 * GlowCard — spotlight glow that follows cursor over a card.
 */
export function GlowCard({ children, color = "#8B5CF6", intensity = 0.08, className, style }: GlowCardProps) {
  const ref   = useRef<HTMLDivElement>(null);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const [hov, setHov] = useState(false);

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top)  / rect.height) * 100);
  }, [glowX, glowY]);

  const bg = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle 180px at ${x}% ${y}%, rgba(${hexToRgb(color)},${intensity}), transparent 70%)`,
  );

  return (
    <motion.div ref={ref} onMouseMove={onMove}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className={className} style={{ ...style, position: "relative" }}>
      <motion.div aria-hidden="true" style={{
        position:"absolute",inset:0,borderRadius:"inherit",
        background: bg, opacity: hov ? 1 : 0,
        pointerEvents:"none", zIndex:1, transition:"opacity 0.3s",
      }}/>
      <div style={{ position:"relative", zIndex:2 }}>{children}</div>
    </motion.div>
  );
}