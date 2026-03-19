"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Tokens ─────────────────────────────────────────────── */
const VIOLET  = "#8B5CF6";
const CYAN    = "#22D3EE";
const BG      = "#050508";
const SURFACE = "#0D0D14";

/* ─── Animated logo mark ──────────────────────────────────── */
function LogoMark({ progress }: { progress: number }) {
  return (
    <svg
      width="64" height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <motion.circle
        cx="32" cy="32" r="28"
        stroke={VIOLET}
        strokeWidth="1.5"
        strokeDasharray={`${2 * Math.PI * 28}`}
        initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
        animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - progress) }}
        transition={{ duration: 0.05 }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "32px 32px" }}
        opacity={0.5}
      />
      {/* KP monogram */}
      <motion.text
        x="32" y="38"
        textAnchor="middle"
        fill={VIOLET}
        fontSize="20"
        fontWeight="800"
        fontFamily="Syne, sans-serif"
        letterSpacing="-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 0.2 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        KP
      </motion.text>
    </svg>
  );
}

/* ─── Counter display ─────────────────────────────────────── */
function Counter({ value }: { value: number }) {
  return (
    <motion.div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: VIOLET,
        opacity: 0.7,
        letterSpacing: "0.1em",
        marginTop: 20,
      }}
    >
      {String(Math.round(value)).padStart(3, "0")} %
    </motion.div>
  );
}

/* ─── Main loader ─────────────────────────────────────────── */
export default function PageLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [done,     setDone]     = useState(false);

  useEffect(() => {
    // Fast initial ramp, slows near 100 for dramatic feel
    const durations = [
      { to: 40,  ms: 400  },
      { to: 70,  ms: 500  },
      { to: 90,  ms: 400  },
      { to: 100, ms: 300  },
    ];

    let current = 0;
    let cancelled = false;

    async function run() {
      for (const { to, ms } of durations) {
        if (cancelled) return;
        const from      = current;
        const steps     = 30;
        const stepTime  = ms / steps;
        const stepValue = (to - from) / steps;

        for (let i = 0; i < steps; i++) {
          if (cancelled) return;
          await new Promise(r => setTimeout(r, stepTime));
          current += stepValue;
          setProgress(Math.min(current, 100));
        }
      }

      // Brief pause at 100 before exit
      await new Promise(r => setTimeout(r, 220));
      if (!cancelled) setDone(true);
    }

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: BG,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Animated background lines */}
          <div style={{
            position: "absolute", inset: 0, overflow: "hidden",
            pointerEvents: "none",
          }}>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.04 }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: 0, right: 0,
                  top: `${15 + i * 14}%`,
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)`,
                  transformOrigin: "left",
                }}
              />
            ))}
          </div>

          {/* Logo + ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.06, 0.64, 1] }}
          >
            <LogoMark progress={progress / 100} />
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: "#F0F0FF",
              marginTop: 16,
              letterSpacing: "-0.02em",
            }}
          >
            Kusum Pareek
          </motion.div>

          <Counter value={progress} />

          {/* Bottom progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: 2,
              background: SURFACE,
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: `linear-gradient(90deg, ${VIOLET}, ${CYAN})`,
                width: `${progress}%`,
                transition: "width 0.05s linear",
                boxShadow: `0 0 12px ${VIOLET}88`,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}