"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  // AnimatePresence,
} from "framer-motion";

const tokens = {
  bg: "#04040A",
  surface: "#0C0C16",
  border: "#16162A",
  borderGlow: "#2A2A4A",
  violet: "#8B5CF6",
  cyan: "#22D3EE",
  amber: "#F59E0B",
  emerald: "#10B981",
  textPrimary: "#F0F0FF",
  textSecondary: "#9090B0",
  textMuted: "#454565",
};

const techStack = [
  { name: "Node.js", color: "#68A063", bg: "rgba(104,160,99,0.12)" },
  { name: "React", color: "#61DAFB", bg: "rgba(97,218,251,0.10)" },
  { name: "Python", color: "#3776AB", bg: "rgba(55,118,171,0.14)" },
  { name: "TypeScript", color: "#3178C6", bg: "rgba(49,120,198,0.13)" },
  { name: "Azure", color: "#0089D0", bg: "rgba(0,137,208,0.13)" },
  { name: "MongoDB", color: "#4DB33D", bg: "rgba(77,179,61,0.11)" },
  { name: "Express.js", color: "#A78BFA", bg: "rgba(167,139,250,0.12)" },
  { name: "PostgreSQL", color: "#336791", bg: "rgba(51,103,145,0.14)" },
  { name: "Flask", color: "#22D3EE", bg: "rgba(34,211,238,0.10)" },
  { name: "Git", color: "#F05032", bg: "rgba(240,80,50,0.12)" },
];

function useTypewriter(words: string[], speed = 80, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

function Particle({ x, y, size, color, duration, delay }: ParticleProps) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(1px)",
        pointerEvents: "none",
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 10, -10, 0],
        opacity: [0.4, 0.9, 0.4],
        scale: [1, 1.3, 1],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const DOT_SPACING = 28;
    const DOT_RADIUS = 1;
    const INFLUENCE = 120;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / DOT_SPACING) + 1;
      const rows = Math.ceil(canvas.height / DOT_SPACING) + 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * DOT_SPACING;
          const y = r * DOT_SPACING;
          const dist = Math.hypot(x - mx, y - my);
          const factor = Math.max(0, 1 - dist / INFLUENCE);
          const radius = DOT_RADIUS + factor * 2.5;
          const opacity = 0.12 + factor * 0.55;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          if (factor > 0.05) {
            const rr = Math.round(139 + (34 - 139) * factor);
            const gg = Math.round(92 + (211 - 92) * factor);
            const bb = Math.round(246 + (238 - 246) * factor);
            ctx.fillStyle = `rgba(${rr},${gg},${bb},${opacity})`;
          } else {
            ctx.fillStyle = `rgba(80,80,140,${opacity})`;
          }
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.7,
        pointerEvents: "all",
      }}
    />
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}

function MagneticButton({
  children,
  style,
  onClick,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.28);
    y.set((e.clientY - cy) * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 28px",
    borderRadius: 999,
    fontFamily: "'Epilogue', 'Segoe UI', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    border: "none",
    position: "relative",
    overflow: "hidden",
    transition: "box-shadow 0.3s",
  };

  const styles: React.CSSProperties =
    variant === "primary"
      ? {
          ...base,
          background: `linear-gradient(135deg, ${tokens.violet}, ${tokens.cyan})`,
          color: "#fff",
        }
      : {
          ...base,
          background: "transparent",
          color: tokens.textSecondary,
          border: `1px solid ${tokens.borderGlow}`,
        };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.06,
        boxShadow:
          variant === "primary"
            ? "0 0 32px rgba(139,92,246,0.45)"
            : "0 0 20px rgba(255,255,255,0.06)",
      }}
      whileTap={{ scale: 0.96 }}
      style={{ ...styles, x: springX, y: springY, ...style }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

interface TechBadgeProps {
  name: string;
  color: string;
  bg: string;
  index: number;
}

function TechBadge({ name, color, bg, index }: TechBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 1.1 + index * 0.055,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{ y: -4, scale: 1.08, boxShadow: `0 8px 24px ${color}33` }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 8,
        background: bg,
        border: `1px solid ${color}33`,
        cursor: "default",
        backdropFilter: "blur(8px)",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
          boxShadow: `0 0 6px ${color}`,
        }}
      />
      <span
        style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 11,
          fontWeight: 500,
          color,
          letterSpacing: "0.02em",
        }}
      >
        {name}
      </span>
    </motion.div>
  );
}

function FloatingCodeCard() {
  const lines = [
    {
      indent: 0,
      tokens: [
        { t: "const ", c: "#A78BFA" },
        { t: "kusum", c: "#22D3EE" },
        { t: " = {", c: "#F0F0FF" },
      ],
    },
    {
      indent: 1,
      tokens: [
        { t: "role:", c: "#94A3B8" },
        { t: ' "SDE"', c: "#F59E0B" },
        { t: ",", c: "#64748B" },
      ],
    },
    {
      indent: 1,
      tokens: [
        { t: "stack:", c: "#94A3B8" },
        { t: " [", c: "#F0F0FF" },
      ],
    },
    {
      indent: 2,
      tokens: [
        { t: '"Node"', c: "#68A063" },
        { t: ", ", c: "#64748B" },
        { t: '"React"', c: "#61DAFB" },
        { t: ",", c: "#64748B" },
      ],
    },
    {
      indent: 2,
      tokens: [
        { t: '"Python"', c: "#3776AB" },
        { t: ", ", c: "#64748B" },
        { t: '"Azure"', c: "#0089D0" },
      ],
    },
    { indent: 1, tokens: [{ t: "],", c: "#F0F0FF" }] },
    {
      indent: 1,
      tokens: [
        { t: "gpa:", c: "#94A3B8" },
        { t: " 9.36", c: "#F59E0B" },
        { t: ",", c: "#64748B" },
      ],
    },
    {
      indent: 1,
      tokens: [
        { t: "medal:", c: "#94A3B8" },
        { t: ' "🥇"', c: "#F59E0B" },
      ],
    },
    { indent: 0, tokens: [{ t: "}", c: "#F0F0FF" }] },
  ];

  return (
    <motion.div
      animate={{ y: [0, -12, 0], rotate: [0, 0.5, -0.5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        borderRadius: 16,
        padding: "20px 24px",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 12.5,
        lineHeight: 1.85,
        boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${tokens.border}, inset 0 1px 0 rgba(255,255,255,0.04)`,
        minWidth: 280,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 16,
        }}
      >
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: c,
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 8,
            fontFamily: "inherit",
            fontSize: 10,
            color: tokens.textMuted,
            letterSpacing: "0.05em",
          }}
        >
          kusum.ts
        </span>
      </div>

      {lines.map((line, li) => (
        <motion.div
          key={li}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + li * 0.08 }}
          style={{ display: "flex", paddingLeft: line.indent * 14 }}
        >
          {line.tokens.map((tok, ti) => (
            <span key={ti} style={{ color: tok.c }}>
              {tok.t}
            </span>
          ))}
        </motion.div>
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139,92,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{
          display: "inline-block",
          width: 2,
          height: 14,
          background: tokens.violet,
          marginLeft: 2,
          borderRadius: 1,
          verticalAlign: "middle",
        }}
      />
    </motion.div>
  );
}

interface StatPillProps {
  value: string;
  label: string;
  color: string;
  delay: number;
}

function StatPill({ value, label, color, delay }: StatPillProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px 20px",
        borderRadius: 12,
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        minWidth: 80,
      }}
    >
      <span
        style={{
          fontFamily: "'Syne', 'Segoe UI', sans-serif",
          fontSize: 22,
          fontWeight: 800,
          background: `linear-gradient(135deg, ${color}, ${tokens.cyan})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: tokens.textMuted,
          marginTop: 2,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4 }}
      style={{
        position: "absolute",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: tokens.textMuted,
          letterSpacing: "0.25em",
        }}
      >
        SCROLL
      </span>
      <div
        style={{
          width: 20,
          height: 32,
          border: `1.5px solid ${tokens.borderGlow}`,
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 3,
            height: 8,
            borderRadius: 2,
            background: tokens.violet,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const roleText = useTypewriter(
    [
      "Software Development Engineer",
      "Backend Architect",
      "Full Stack Developer",
      "Azure Cloud Practitioner",
    ],
    75,
    2400,
  );

  useEffect(() => {
    setMounted(true);
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Epilogue:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      try {
        document.head.removeChild(link);
      } catch {}
    };
  }, []);

  const particles: ParticleProps[] = [
    { x: 12, y: 20, size: 4, color: tokens.violet, duration: 5.2, delay: 0 },
    { x: 85, y: 15, size: 3, color: tokens.cyan, duration: 4.8, delay: 0.6 },
    { x: 70, y: 75, size: 5, color: tokens.violet, duration: 6.1, delay: 1.1 },
    { x: 25, y: 80, size: 3, color: tokens.cyan, duration: 4.4, delay: 0.3 },
    { x: 55, y: 10, size: 4, color: tokens.amber, duration: 5.8, delay: 0.9 },
    { x: 92, y: 55, size: 3, color: tokens.violet, duration: 5.0, delay: 1.5 },
    { x: 8, y: 55, size: 2, color: tokens.cyan, duration: 4.6, delay: 0.7 },
    { x: 45, y: 88, size: 4, color: tokens.violet, duration: 5.5, delay: 1.8 },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
  };

  const itemUp = {
    hidden: { opacity: 0, y: 36 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 90, damping: 18 },
    },
  };

  const itemBlur = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: tokens.bg,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <DotGrid />

      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-5%",
          width: "55%",
          height: "65%",
          background: `radial-gradient(ellipse, rgba(139,92,246,0.13) 0%, transparent 65%)`,
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-8%",
          width: "45%",
          height: "55%",
          background: `radial-gradient(ellipse, rgba(34,211,238,0.08) 0%, transparent 65%)`,
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "40%",
          width: "30%",
          height: "30%",
          background: `radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)`,
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />

      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${tokens.violet}, ${tokens.cyan}, transparent)`,
          transformOrigin: "left",
        }}
      />

      <div
        className="hero-grid"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "100px 20px 80px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 64,
          alignItems: "center",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          style={{ display: "flex", flexDirection: "column", gap: 0 }}
        >
          <motion.div variants={itemBlur} style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(139,92,246,0.08)",
                border: `1px solid rgba(139,92,246,0.2)`,
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: tokens.emerald,
                  boxShadow: `0 0 8px ${tokens.emerald}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: tokens.violet,
                  fontWeight: 500,
                }}
              >
                AVAILABLE FOR WORK · PUNE, INDIA
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemUp} style={{ marginBottom: 8 }}>
            <h1
              style={{
                fontFamily: "'Syne', 'Segoe UI', sans-serif",
                fontWeight: 800,
                margin: 0,
                lineHeight: 1.02,
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #F0F0FF 30%, #B8B8E8 70%, #8B5CF6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Kusum
              </span>
              <br />
              <span style={{ color: tokens.textPrimary }}>Pareek</span>
            </h1>
          </motion.div>

          <motion.div
            variants={itemBlur}
            style={{ marginBottom: 24, minHeight: 32 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                  fontWeight: 500,
                  color: tokens.textSecondary,
                }}
              >
                {roleText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{
                  display: "inline-block",
                  width: 2.5,
                  height: "1.1em",
                  background: tokens.violet,
                  borderRadius: 2,
                  verticalAlign: "middle",
                }}
              />
            </div>
          </motion.div>

          <motion.p
            variants={itemUp}
            style={{
              fontFamily: "'Epilogue', sans-serif",
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              lineHeight: 1.8,
              color: tokens.textSecondary,
              maxWidth: 560,
              margin: "0 0 32px",
            }}
          >
            Results-driven SDE building{" "}
            <span style={{ color: tokens.textPrimary, fontWeight: 500 }}>
              production-grade APIs
            </span>
            ,{" "}
            <span style={{ color: tokens.textPrimary, fontWeight: 500 }}>
              scalable ERP systems
            </span>
            , and{" "}
            <span style={{ color: tokens.textPrimary, fontWeight: 500 }}>
              full-stack apps
            </span>
            . Optimized systems for{" "}
            <span style={{ color: tokens.cyan, fontWeight: 600 }}>
              80% performance gains
            </span>
            . Gold Medalist · MCA 9.36 GPA.
          </motion.p>

          <motion.div
            variants={itemUp}
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 36,
            }}
          >
            {[
              { value: "10+", label: "ERP Modules", color: tokens.violet },
              { value: "80%", label: "Perf Boost", color: tokens.cyan },
              { value: "200+", label: "Tickets Solved", color: tokens.amber },
              { value: "9.36", label: "MCA GPA", color: tokens.emerald },
            ].map((s, i) => (
              <StatPill key={s.label} {...s} delay={0.9 + i * 0.1} />
            ))}
          </motion.div>

          <motion.div
            variants={itemUp}
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: 44,
            }}
          >
            <MagneticButton
              variant="primary"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 10l5 5-5 5" />
                <path d="M4 4v7a4 4 0 004 4h12" />
              </svg>
              View Projects
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() =>
                window.open("/Kusum-Pareek-SDE-Resume.pdf", "_blank")
              }
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download CV
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div variants={itemUp}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: tokens.textMuted,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Tech Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {techStack.map((tech, i) => (
                <TechBadge key={tech.name} {...tech} index={i} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-code-card"
          initial={{ opacity: 0, x: 48, scale: 0.92 }}
          animate={mounted ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignSelf: "center",
          }}
        >
          <FloatingCodeCard />

          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "GitHub", href: "https://github.com/KusumPareek99" },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/kusum-p-a54759191",
              },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -3,
                  borderColor: tokens.violet,
                  color: tokens.textPrimary,
                }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: tokens.textMuted,
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: `1px solid ${tokens.border}`,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  display: "inline-block",
                }}
              >
                {s.label} ↗
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 100px 20px 80px !important;
          }
          .hero-code-card {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .hero-grid {
            padding: 90px 16px 60px !important;
          }
        }
        /* Fix magnetic button touch interaction on mobile */
        @media (hover: none) {
          .hero-grid button {
            transform: none !important;
          }
        }
      `}</style>
      <ScrollIndicator />
    </div>
  );
}
