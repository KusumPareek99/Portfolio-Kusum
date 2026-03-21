"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Epilogue:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap";
    l.rel = "stylesheet";
    document.head.appendChild(l);
  }, []);
}

const T = {
  bg:        "#040407",
  surface:   "#0A0A12",
  surfaceHi: "#10101C",
  border:    "#14142A",
  borderHi:  "#26264A",
  violet:    "#8B5CF6",
  cyan:      "#22D3EE",
  amber:     "#F59E0B",
  emerald:   "#10B981",
  rose:      "#F43F5E",
  textPri:   "#F0F0FF",
  textSec:   "#8888AA",
  textMut:   "#383858",
};

const EXPERIENCES = [
  {
    id: "dypatil",
    company: "Dr. D.Y. Patil School of Management & Research",
    shortName: "DY Patil",
    role: "Software Developer",
    type: "Full-time",
    period: "Jun 2025 – Present",
    duration: "Present",
    location: "Pune, Maharashtra",
    current: true,
    accent: T.violet,
    logoInitials: "DY",
    logoGrad: `linear-gradient(135deg, #8B5CF6, #6D28D9)`,
    logoShape: "rounded",
    domain: "ERP · LMS · Azure",
    highlights: [
      { icon: "⚙️", metric: "10+",  label: "ERP/LMS modules", detail: "Supporting real-time academic & admin workflows" },
      { icon: "⚡", metric: "~80%", label: "Query perf boost", detail: "Architected RESTful APIs & optimized SQL queries" },
      { icon: "☁️", metric: "Multi", label: "Azure deployments", detail: "CI/CD pipelines via publish profiles" },
      { icon: "📈", metric: "~40%", label: "Uptime improved",  detail: "Monitoring + rapid production incident fixes" },
      { icon: "🤝", metric: "→ C-suite", label: "Stakeholder delivery", detail: "Gathered requirements from Directors, HODs, Program Heads" },
    ],
    tags: ["Node.js", "Azure", "CI/CD", "SQL", "REST APIs", "ERP"],
    achievements: ["First full-time role post MCA", "Delivered 10+ modules end-to-end"],
  },
  {
    id: "cutecode",
    company: "CuteCode Street Style Store LLP",
    shortName: "CuteCode",
    role: "Software Developer Intern",
    type: "Internship",
    period: "Sep 2024 – Jan 2025",
    duration: "5 months",
    location: "Delhi, India",
    current: false,
    accent: T.emerald,
    logoInitials: "CC",
    logoGrad: `linear-gradient(135deg, #10B981, #059669)`,
    logoShape: "rounded",
    domain: "Backend · Email · APIs",
    highlights: [
      { icon: "📧", metric: "15+",  label: "Email templates", detail: "Personalized + A/B testing for marketing campaigns" },
      { icon: "📊", metric: "+35%", label: "Logging accuracy", detail: "Reliable monitoring, debugging & analytics" },
      { icon: "🚀", metric: "-25%", label: "Delivery latency", detail: "Optimized third-party API integrations" },
      { icon: "🔧", metric: "Auto", label: "Unsubscribe mgmt", detail: "Compliance, deliverability & system integrity" },
      { icon: "📡", metric: "Rate-limited", label: "Email utility service", detail: "Batching + logging + third-party API integration" },
    ],
    tags: ["Node.js", "Email APIs", "Batching", "Rate-Limiting", "Templates"],
    achievements: ["Built production email system from scratch", "35% improvement in logging accuracy"],
  },
  {
    id: "nielseniq",
    company: "NielsenIQ Pvt. Ltd.",
    shortName: "NielsenIQ",
    role: "Intern — EIT Technical Engineer",
    type: "Internship",
    period: "Jan 2023 – May 2023",
    duration: "5 months",
    location: "Pune, Maharashtra",
    current: false,
    accent: T.amber,
    logoInitials: "NIQ",
    logoGrad: `linear-gradient(135deg, #F59E0B, #D97706)`,
    logoShape: "pill",
    domain: "Support · SLA · Backend",
    highlights: [
      { icon: "🎫", metric: "200+", label: "Tickets resolved",   detail: "95% resolution rate with strict SLA compliance" },
      { icon: "⏱️", metric: "150+", label: "Tickets/month avg",  detail: "High-volume triage & resolution" },
      { icon: "🔻", metric: "-40%", label: "System downtime",    detail: "Backend & system-level diagnostics" },
      { icon: "⭐", metric: "4.8/5", label: "Customer CSAT",     detail: "Maintained throughout entire tenure" },
      { icon: "⚡", metric: "<24h",  label: "Complex resolutions", detail: "Collaborated with senior engineers" },
    ],
    tags: ["Production Support", "SLA", "Debugging", "Backend", "Incident Mgmt"],
    achievements: ["95% SLA resolution rate", "4.8/5 customer satisfaction maintained"],
  },
];

function useIntersection(options: { once?: boolean; threshold?: number | number[]; rootMargin?: string } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      setRatio(e.intersectionRatio);
      if (e.isIntersecting && options.once) obs.unobserve(el);
    }, { threshold: options.threshold ?? [0, 0.1, 0.2, 0.5, 1], rootMargin: options.rootMargin ?? "0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [options.once, options.rootMargin]);

  return { ref, inView, ratio };
}

function CountUp({ value, duration = 1000 }: { value: string; duration?: number }) {
  const [display, setDisplay] = useState("0");
  const { ref, inView } = useIntersection({ once: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
    const suffix = value.match(/[^0-9.]+$/)?.[0] ?? "";
    if (isNaN(num)) { setDisplay(value); return; }

    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const cur = num <= 10 ? (ease * num).toFixed(1) : Math.round(ease * num);
      setDisplay(`${prefix}${cur}${suffix}`);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
}

type Experience = typeof EXPERIENCES[number];
type Highlight = Experience["highlights"][number];

function CompanyLogo({ exp, size = 52 }: { exp: Experience; size?: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        width: size, height: size, flexShrink: 0,
        borderRadius: exp.logoShape === "pill" ? size / 3 : size / 4,
        background: exp.logoGrad,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: exp.logoInitials.length > 2 ? size * 0.26 : size * 0.32,
        color: "#fff",
        letterSpacing: "-0.02em",
        boxShadow: `0 0 20px ${exp.accent}44, 0 4px 12px rgba(0,0,0,0.4)`,
        cursor: "default",
        userSelect: "none",
      }}
    >
      {exp.logoInitials}
    </motion.div>
  );
}

function MetricCard({ h, accent, index, inView }: { h: Highlight; accent: string; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16, scale: 0.95 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ delay: 0.15 + index * 0.08, type: "spring", stiffness: 180, damping: 22 }}
      whileHover={{ x: 4, borderColor: accent + "55", backgroundColor: accent + "08" }}
      style={{
        display: "flex", alignItems: "flex-start", gap: 12,
        padding: "12px 14px",
        background: T.surfaceHi,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        transition: "background 0.2s, border-color 0.2s",
        cursor: "default",
      }}
    >
      <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{h.icon}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 2 }}>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, fontSize: 18,
            color: accent, lineHeight: 1,
          }}>
            {inView ? <CountUp value={h.metric} /> : "0"}
          </span>
          <span style={{
            fontFamily: "'Epilogue', sans-serif",
            fontWeight: 600, fontSize: 12,
            color: T.textPri,
          }}>{h.label}</span>
        </div>
        <p style={{
          fontFamily: "'Epilogue', sans-serif",
          fontSize: 11.5, color: T.textSec,
          margin: 0, lineHeight: 1.5,
        }}>{h.detail}</p>
      </div>
    </motion.div>
  );
}

function ExperienceCard({ exp, index, isLast }: { exp: Experience; index: number; isLast: boolean }) {
  const [expanded, setExpanded] = useState(index === 0);
  const { ref, inView } = useIntersection({ once: true, threshold: 0.12 });

  const cardVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.97 },
    show: {
      opacity: 1, x: 0, scale: 1,
      transition: { type: "spring" as const, stiffness: 90, damping: 20, delay: 0.1 },
    },
  };

  return (
    <div ref={ref} style={{ display: "flex", gap: 0, position: "relative" }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        width: 48, flexShrink: 0, paddingTop: 28,
      }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 250, damping: 18, delay: 0.05 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <motion.div
            animate={exp.current ? {
              boxShadow: [`0 0 0 0 ${exp.accent}44`, `0 0 0 10px ${exp.accent}00`]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            style={{
              width: 20, height: 20, borderRadius: "50%",
              background: T.bg,
              border: `2px solid ${exp.accent}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}
          >
            <motion.div
              animate={exp.current ? { scale: [1, 0.7, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: exp.current
                  ? exp.accent
                  : `linear-gradient(135deg, ${exp.accent}99, ${exp.accent}55)`,
              }}
            />
          </motion.div>

          {exp.current && (
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              style={{
                position: "absolute", inset: -4, borderRadius: "50%",
                border: `1px solid ${exp.accent}`,
                pointerEvents: "none",
              }}
            />
          )}
        </motion.div>

        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            style={{
              width: 2, flex: 1, marginTop: 8,
              background: `linear-gradient(to bottom, ${exp.accent}80, ${T.border})`,
              transformOrigin: "top",
              borderRadius: 1,
            }}
          />
        )}
      </div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        style={{
          flex: 1, marginLeft: 16,
          marginBottom: isLast ? 0 : 32,
          paddingBottom: 8,
        }}
      >
        <motion.div
          whileHover={{ borderColor: exp.accent + "44" }}
          style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 20,
            overflow: "hidden",
            transition: "border-color 0.3s",
            boxShadow: exp.current
              ? `0 0 40px ${exp.accent}0D, 0 4px 24px rgba(0,0,0,0.3)`
              : "0 4px 20px rgba(0,0,0,0.25)",
          }}
        >
          {exp.current && (
            <div style={{
              height: 3,
              background: `linear-gradient(90deg, ${exp.accent}, ${T.cyan}, transparent)`,
            }}/>
          )}

          <div style={{ padding: "22px 24px 0" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <CompanyLogo exp={exp} size={50} />

              <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800, fontSize: 18,
                    color: T.textPri, margin: 0, lineHeight: 1.15,
                  }}>{exp.role}</h3>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, letterSpacing: "0.14em",
                    color: exp.accent,
                    background: exp.accent + "18",
                    border: `1px solid ${exp.accent}33`,
                    borderRadius: 999, padding: "2px 9px",
                  }}>{exp.type}</span>
                  {exp.current && (
                    <motion.span
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9, letterSpacing: "0.14em",
                        color: T.emerald,
                        background: T.emerald + "15",
                        border: `1px solid ${T.emerald}33`,
                        borderRadius: 999, padding: "2px 9px",
                      }}
                    >● CURRENT</motion.span>
                  )}
                </div>

                <p style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontWeight: 600, fontSize: 14,
                  color: exp.accent, margin: "0 0 6px",
                }}>{exp.company}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11, color: T.textSec,
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {exp.period}
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11, color: T.textMut,
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    </svg>
                    {exp.location}
                  </span>
                  {!exp.current && (
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11, color: T.textMut,
                    }}>· {exp.duration}</span>
                  )}
                </div>
              </div>

              <motion.button
                onClick={() => setExpanded(v => !v)}
                whileHover={{ scale: 1.08, borderColor: exp.accent + "60" }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: "transparent",
                  border: `1px solid ${T.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: T.textSec,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </motion.button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "14px 0 0" }}>
              {exp.tags.map(t => (
                <span key={t} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, fontWeight: 500,
                  color: exp.accent,
                  background: exp.accent + "12",
                  border: `1px solid ${exp.accent}28`,
                  borderRadius: 6, padding: "3px 9px",
                }}>{t}</span>
              ))}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ height: { type: "spring", stiffness: 220, damping: 30 }, opacity: { duration: 0.22 } }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ padding: "20px 24px 24px" }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, letterSpacing: "0.22em",
                    color: T.textMut, textTransform: "uppercase",
                    marginBottom: 14,
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span>Key Contributions</span>
                    <div style={{ flex: 1, height: 1, background: T.border }}/>
                    <span>{exp.highlights.length} items</span>
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 8, marginBottom: 20,
                  }}>
                    {exp.highlights.map((h, i) => (
                      <MetricCard key={i} h={h} accent={exp.accent} index={i} inView={expanded} />
                    ))}
                  </div>

                  {exp.achievements?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      style={{
                        padding: "12px 16px",
                        background: exp.accent + "0C",
                        border: `1px solid ${exp.accent}28`,
                        borderRadius: 12,
                        display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center",
                      }}
                    >
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9, letterSpacing: "0.18em",
                        color: exp.accent, textTransform: "uppercase",
                        flexShrink: 0,
                      }}>✦ Highlights</span>
                      {exp.achievements.map((a, i) => (
                        <span key={i} style={{
                          fontFamily: "'Epilogue', sans-serif",
                          fontSize: 12, color: T.textSec,
                          display: "flex", alignItems: "center", gap: 5,
                        }}>
                          <span style={{ color: exp.accent, fontSize: 10 }}>→</span> {a}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!expanded && (
            <div style={{
              padding: "8px 24px 16px",
              fontFamily: "'Epilogue', sans-serif", fontSize: 12,
              color: T.textMut, fontStyle: "italic",
            }}>
              Click ↑ to see {exp.highlights.length} key contributions…
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

function TimelineProgressBar({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 18 });

  return (
    <div style={{
      position: "sticky", top: 120,
      width: 160, flexShrink: 0,
      display: "flex", flexDirection: "column", gap: 0,
      alignSelf: "flex-start",
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9, letterSpacing: "0.22em",
        color: T.textMut, textTransform: "uppercase",
        marginBottom: 20,
      }}>Experience</div>

      {EXPERIENCES.map((exp, i) => (
        <div key={exp.id} style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 16 }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
              background: exp.accent + "80",
              border: `1.5px solid ${exp.accent}`,
              boxShadow: `0 0 8px ${exp.accent}44`,
            }}/>
            {i < EXPERIENCES.length - 1 && (
              <div style={{
                width: 1, flex: 1, minHeight: 40,
                background: `linear-gradient(to bottom, ${exp.accent}40, ${EXPERIENCES[i+1].accent}20)`,
                margin: "4px 0",
              }}/>
            )}
          </div>

          <div style={{ paddingBottom: i < EXPERIENCES.length - 1 ? 24 : 0, paddingTop: 0 }}>
            <div style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: 12, color: exp.current ? exp.accent : T.textSec,
              marginBottom: 2,
            }}>{exp.shortName}</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9.5, color: T.textMut,
            }}>{exp.period.split("–")[0].trim()}</div>
            {exp.current && (
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8.5, color: T.emerald,
                marginTop: 2,
              }}>● Now</div>
            )}
          </div>
        </div>
      ))}

      <div style={{
        marginTop: 24,
        padding: "14px",
        background: T.surfaceHi,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
      }}>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: 22, color: T.violet,
          background: `linear-gradient(135deg, ${T.violet}, ${T.cyan})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>2+ yrs</div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, color: T.textMut,
          letterSpacing: "0.12em", textTransform: "uppercase",
          marginTop: 2,
        }}>Total Experience</div>
      </div>
    </div>
  );
}

function SectionHeader({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      style={{ marginBottom: 60 }}
    >
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, letterSpacing: "0.22em", color: T.violet,
        background: T.violet + "0C",
        border: `1px solid ${T.violet}28`,
        borderRadius: 999, padding: "5px 14px", marginBottom: 16,
      }}>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: "50%", background: T.violet, display: "inline-block" }}
        />
        {EXPERIENCES.length} ROLES · PROFESSIONAL JOURNEY
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, margin: 0,
          fontSize: "clamp(2.2rem, 5vw, 4rem)",
          lineHeight: 1.05, color: T.textPri,
        }}>
          Work{" "}
          <span style={{
            background: `linear-gradient(135deg, ${T.violet}, ${T.cyan})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Experience</span>
        </h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { n: "3", l: "Companies" },
            { n: "2+", l: "Years" },
            { n: "1", l: "Current Role" },
          ].map(s => (
            <div key={s.l} style={{
              padding: "10px 16px", borderRadius: 12,
              background: T.surface, border: `1px solid ${T.border}`,
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20,
                background: `linear-gradient(135deg, ${T.violet}, ${T.cyan})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{s.n}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, color: T.textMut,
                letterSpacing: "0.12em", textTransform: "uppercase",
              }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function EducationStrip({ inView }: { inView: boolean }) {
  const edus = [
    { degree: "MCA", inst: "Dr. D.Y. Patil Institute", score: "9.36 GPA", year: "2021–2023", accent: T.violet },
    { degree: "BCA", inst: "Lachoo Memorial College", score: "90.29% · 🥇 Gold Medal", year: "2018–2021", accent: T.amber },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4, duration: 0.6 }}
      style={{ marginTop: 48 }}
    >
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9, letterSpacing: "0.22em",
        color: T.textMut, textTransform: "uppercase",
        marginBottom: 16,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <span>Education</span>
        <div style={{ flex: 1, height: 1, background: T.border }}/>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {edus.map((e, i) => (
          <motion.div
            key={e.degree}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 160 }}
            whileHover={{ borderColor: e.accent + "50", y: -3 }}
            style={{
              display: "flex", gap: 14, alignItems: "center",
              padding: "16px 18px",
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 14,
              transition: "border-color 0.25s",
              cursor: "default",
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: `linear-gradient(135deg, ${e.accent}30, ${e.accent}10)`,
              border: `1px solid ${e.accent}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 14, color: e.accent,
            }}>{e.degree}</div>
            <div>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 13, color: T.textPri, marginBottom: 2,
              }}>{e.inst}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, color: e.accent, marginBottom: 2,
              }}>{e.score}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, color: T.textMut,
              }}>{e.year}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  useFonts();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, inView: headerInView } = useIntersection({ once: true, threshold: 0.2 });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });

  const particles = [
    { x: 8,  y: 12, c: T.violet, d: 5.5, dl: 0   },
    { x: 90, y: 20, c: T.cyan,   d: 4.8, dl: 0.8  },
    { x: 85, y: 65, c: T.violet, d: 6.2, dl: 1.4  },
    { x: 6,  y: 70, c: T.amber,  d: 5.0, dl: 0.5  },
    { x: 50, y: 5,  c: T.cyan,   d: 5.8, dl: 1.8  },
    { x: 94, y: 44, c: T.emerald,d: 4.6, dl: 1.0  },
  ];

  return (
    <section
      id="experience"
      style={{
        background: T.bg, minHeight: "100vh",
        padding: "80px 16px 80px",
        position: "relative", overflow: "hidden",
        fontFamily: "'Epilogue', sans-serif",
      }}
    >
      <div ref={sectionRef as React.RefObject<HTMLDivElement>} style={{ position:"absolute", top:0, left:0, width:1, height:1, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:"-8%", right:"-4%", width:"40%", height:"50%",
        background:`radial-gradient(ellipse, ${T.violet}0C 0%, transparent 70%)`,
        borderRadius:"50%", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-8%", left:"-4%", width:"35%", height:"45%",
        background:`radial-gradient(ellipse, ${T.cyan}07 0%, transparent 70%)`,
        borderRadius:"50%", pointerEvents:"none" }} />

      {particles.map((p, i) => (
        <motion.div key={i}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: p.d, delay: p.dl, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
            width: 3, height: 3, borderRadius: "50%",
            background: p.c, filter: "blur(0.5px)", pointerEvents: "none",
          }}
        />
      ))}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={headerInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.25, 0.4, 0.25, 1] }}
        style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: `linear-gradient(90deg, transparent, ${T.violet}, ${T.cyan}, transparent)`,
          transformOrigin: "left",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={headerRef as React.RefObject<HTMLDivElement>}>
          <SectionHeader inView={headerInView} />
        </div>

        <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
          <div style={{ display: "none", width: 160, flexShrink: 0 }} className="timeline-sidebar">
            <TimelineProgressBar scrollYProgress={scrollYProgress} />
          </div>

          <div ref={timelineRef} style={{ flex: 1, minWidth: 0 }}>
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={i}
                isLast={i === EXPERIENCES.length - 1}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                display: "flex", gap: 0, alignItems: "center",
                paddingLeft: 14, marginTop: 8,
              }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: "50%",
                border: `2px dashed ${T.textMut}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginLeft: 14,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.textMut }} />
              </div>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, color: T.textMut,
                marginLeft: 28,
              }}>The journey continues…</span>
            </motion.div>

            <EducationStrip inView={headerInView} />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .timeline-sidebar { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
