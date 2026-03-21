"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCounter } from "@/hooks/useCounter";
import { stats, education } from "@/data/portfolio";

/* ─── Tokens ──────────────────────────────────────────────── */
const T = {
  bg: "#050508",
  surface: "#0D0D14",
  hover: "#13131E",
  border: "#1A1A2E",
  violet: "#8B5CF6",
  cyan: "#22D3EE",
  amber: "#F59E0B",
  emerald: "#10B981",
  t1: "#F0F0FF",
  t2: "#A0A0C0",
  t3: "#4A4A70",
};

/* ─── Badge chip ──────────────────────────────────────────── */
const badgeColors: Record<
  string,
  { color: string; bg: string; border: string }
> = {
  amber: { color: T.amber, bg: T.amber + "18", border: T.amber + "44" },
  violet: { color: T.violet, bg: T.violet + "18", border: T.violet + "44" },
  emerald: { color: T.emerald, bg: T.emerald + "18", border: T.emerald + "44" },
};

function BadgeChip({
  label,
  color = "violet",
}: {
  label: string;
  color?: string;
}) {
  const s = badgeColors[color] || badgeColors.violet;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 12px",
        borderRadius: 999,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        fontWeight: 500,
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.border}`,
      }}
    >
      {label}
    </span>
  );
}

/* ─── Stat card ───────────────────────────────────────────── */
function StatCard({
  value,
  label,
  suffix,
  inView,
}: {
  value: string;
  label: string;
  suffix?: string;
  inView: boolean;
}) {
  const isDecimal = value.includes(".");
  const numeric = parseFloat(value);
  const counted = useCounter(numeric, inView, 1200, isDecimal ? 2 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        padding: "24px 16px",
        textAlign: "center",
        transition: "border-color 0.25s",
      }}
      whileHover={{ borderColor: "#2D2D52", y: -4 }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900,
          fontSize: 38,
          background: `linear-gradient(135deg, ${T.violet}, ${T.cyan})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 6,
          lineHeight: 1,
        }}
      >
        {counted}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: T.t3,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

/* ─── Section heading ─────────────────────────────────────── */
function SectionHeading({
  eyebrow,
  title,
  highlight,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      style={{ marginBottom: 28 }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: T.violet,
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          margin: 0,
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          lineHeight: 1.1,
          color: T.t1,
        }}
      >
        {title}{" "}
        <span
          style={{
            background: `linear-gradient(135deg, ${T.violet}, ${T.cyan})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {highlight}
        </span>
      </h2>
    </motion.div>
  );
}

/* ─── Main component ──────────────────────────────────────── */
export default function About() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.2 });

  const staggerItem = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 } as const,
    transition: { duration: 0.55, delay, ease: [0.25, 0.4, 0.25, 1] as const },
  });

  return (
    <section
      id="about"
      style={{
        background: T.bg,
        position: "relative",
        zIndex: 1,
        padding: "80px 16px",
      }}
    >
      {/* Top rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${T.border}, transparent)`,
        }}
      />

      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        {/* Two-column grid */}
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Text ─────────────────────────────────── */}
          <div>
            <SectionHeading
              eyebrow="who i am"
              title="Building systems that"
              highlight="actually scale."
            />

            {/* Body text */}
            <motion.div
              {...staggerItem(0.1)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {[
                <>
                  I&apos;m a results-driven Software Development Engineer with
                  strong hands-on experience in backend and full-stack
                  development. I design, build, and deploy scalable systems
                  using <span style={{ color: T.t1 }}>Node.js</span>,{" "}
                  <span style={{ color: T.t1 }}>Python (Flask)</span>,{" "}
                  <span style={{ color: T.t1 }}>React</span>, and cloud
                  platforms.
                </>,
                <>
                  Currently at{" "}
                  <span style={{ color: T.violet }}>
                    Dr. D.Y. Patil School of Management
                  </span>
                  , architecting ERP/LMS modules that support real-time academic
                  workflows for thousands of users.
                </>,
                <>
                  Outside of work, I contribute to open source (GSSoC &apos;24),
                  earn certifications obsessively, and chase that 80%
                  performance improvement.
                </>,
              ].map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontSize: 15,
                    color: T.t2,
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              ))}
            </motion.div>

            {/* Badges */}
            <motion.div
              {...staggerItem(0.2)}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 32,
              }}
            >
              <BadgeChip label="🥇 Gold Medalist — BCA 90.29%" color="amber" />
              <BadgeChip label="MCA 9.36 GPA" color="violet" />
              <BadgeChip label="Open Source Contributor" color="emerald" />
            </motion.div>

            {/* Education cards */}
            <motion.div
              {...staggerItem(0.3)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {education.map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "14px 16px",
                    borderRadius: 14,
                    background: T.surface,
                    border: `1px solid ${T.border}`,
                  }}
                >
                  {/* Degree pill */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      flexShrink: 0,
                      background: `linear-gradient(135deg, ${T.violet}, ${T.cyan})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {edu.degree.split(" ")[0]}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        color: T.t1,
                        marginBottom: 3,
                        wordBreak: "break-word",
                      }}
                    >
                      {edu.degree}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: T.t3,
                        wordBreak: "break-word",
                      }}
                    >
                      {edu.institution} · {edu.score}
                    </div>
                    {edu.achievement && (
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          color: T.amber,
                          marginTop: 2,
                        }}
                      >
                        {edu.achievement}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Stats ───────────────────────────────── */}
          <div ref={ref}>
            {/* 2×2 stat grid */}
            <div
              className="about-stat-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 16,
              }}
            >
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} inView={inView} />
              ))}
            </div>

            {/* Availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 20px",
                borderRadius: 14,
                background: T.emerald + "0D",
                border: `1px solid ${T.emerald}33`,
              }}
            >
              {/* Pulsing dot */}
              <motion.div
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: T.emerald,
                  boxShadow: `0 0 10px ${T.emerald}88`,
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: T.emerald,
                    marginBottom: 2,
                  }}
                >
                  Available for Opportunities
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: T.t3,
                    wordBreak: "break-word",
                  }}
                >
                  Pune, Maharashtra · Open to remote
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Responsive: stack to single column on mobile */}
      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .about-grid { padding: 0; }
          /* Stat cards: shrink padding on tiny screens */
          .about-stat-grid > div {
            padding: 16px 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
