"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { certificates, badgeGroups } from "@/data/portfolio";

const T = {
  bg:      "#050508",
  surface: "#0D0D14",
  border:  "#1A1A2E",
  violet:  "#8B5CF6",
  cyan:    "#22D3EE",
  amber:   "#F59E0B",
  emerald: "#10B981",
  t1:      "#F0F0FF",
  t2:      "#A0A0C0",
  t3:      "#4A4A70",
};

const ISSUER_BG: Record<string, string> = {
  hackerrank:   "#00EA64",
  freecodecamp: "#0A0A23",
  google:       "#4285F4",
  coursera:     "#0056D2",
  jpmorgan:     "#003594",
  deloitte:     "#86BC25",
};
const ISSUER_TEXT: Record<string, string> = {
  hackerrank: "#000", freecodecamp: "#fff", google: "#fff",
  coursera:   "#fff", jpmorgan:     "#fff", deloitte: "#000",
};

const HIGHLIGHT_CARDS = [
  { label: "Gold Medalist", sub: "BCA · 90.29%", color: "#F59E0B" },
  { label: "5★ Python",     sub: "HackerRank",   color: "#00EA64" },
  { label: "4★ SQL",        sub: "HackerRank",   color: "#00EA64" },
  { label: "GSSoC '24",     sub: "Open Source",  color: "#8B5CF6" },
];

function ExternalLinkIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function CertCard({ cert }: { cert: typeof certificates[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={cert.link} target="_blank" rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "16px", borderRadius: 14, textDecoration: "none",
        background: hov ? "#0D0D1A" : T.surface,
        border: `1px solid ${hov ? "#2D2D52" : T.border}`,
        transition: "background 0.2s, border-color 0.25s",
      }}
    >
      {/* Issuer dot */}
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
        background: ISSUER_BG[cert.issuer]   || T.violet,
        color:      ISSUER_TEXT[cert.issuer] || "#fff",
      }}>
        {cert.issuerLabel.slice(0, 2).toUpperCase()}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 600,
          fontSize: 13, color: T.t1,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{cert.title}</div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, color: T.t3, marginTop: 2,
        }}>{cert.issuerLabel}</div>
      </div>

      {/* Arrow */}
      <span style={{ color: hov ? T.cyan : T.t3, flexShrink: 0, transition: "color 0.2s" }}>
        <ExternalLinkIcon size={12} />
      </span>
    </motion.a>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" style={{
      background: T.bg, position: "relative", zIndex: 1,
      padding: "96px 24px 80px",
    }}>
      {/* Top rule */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: `linear-gradient(90deg, transparent, ${T.border}, transparent)`,
      }}/>

      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>

        {/* ── Section header ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 52 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, letterSpacing: "0.22em", color: T.violet,
            background: T.violet + "0C", border: `1px solid ${T.violet}28`,
            borderRadius: 999, padding: "5px 14px", marginBottom: 16,
          }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2.2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: T.violet, display: "inline-block" }}/>
            RECOGNITION & LEARNING
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, margin: 0,
            fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, color: T.t1,
            marginBottom: 12,
          }}>
            Achievements &{" "}
            <span style={{
              background: `linear-gradient(135deg, ${T.violet}, ${T.cyan})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Certificates</span>
          </h2>
          <p style={{
            fontFamily: "'Epilogue', sans-serif",
            fontSize: 15, color: T.t2, margin: 0,
          }}>
            {certificates.length}+ certificates across platforms. Open source contributor. Gold Medalist.
          </p>
        </motion.div>

        {/* ── Highlight cards ──────────────────────────────── */}
        <div className="achievements-highlight-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16, marginBottom: 52,
        }}>
          {HIGHLIGHT_CARDS.map((b, i) => (
            <motion.div key={b.label}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              style={{
                padding: "20px 16px", borderRadius: 14, textAlign: "center",
                background: T.surface,
                border: `1px solid ${b.color}33`,
              }}
            >
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 16, color: b.color, marginBottom: 4,
              }}>{b.label}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, color: T.t3,
              }}>{b.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Certificates ─────────────────────────────────── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: "0.22em", color: T.t3,
            textTransform: "uppercase", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span>Certificates ({certificates.length})</span>
            <div style={{ flex: 1, height: 1, background: T.border }}/>
          </div>

          <div className="achievements-cert-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}>
            {certificates.map((cert, i) => (
              <motion.div key={cert.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <CertCard cert={cert} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Badge groups ─────────────────────────────────── */}
        {badgeGroups.map(group => (
          <div key={group.title} style={{ marginBottom: 36 }}>
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between", marginBottom: 16,
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, letterSpacing: "0.22em", color: T.t3,
                textTransform: "uppercase",
              }}>{group.title}</div>

              {group.leaderboardLink && (
                <motion.a
                  href={group.leaderboardLink} target="_blank" rel="noopener noreferrer"
                  whileHover={{ color: T.cyan }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11, color: T.violet, textDecoration: "none",
                    display: "flex", alignItems: "center", gap: 4,
                    transition: "color 0.2s",
                  }}
                >
                  Leaderboard <ExternalLinkIcon size={10} />
                </motion.a>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end" }}>
              {group.badges.map(badge => {
                const isBoard = badge.imageUrl.includes("holopin.me") ||
                                badge.name.toLowerCase().includes("board");
                return (
                  <motion.a key={badge.name}
                    href={badge.link || "#"} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, y: -4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    style={{ display: "block", textDecoration: "none" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={badge.imageUrl} alt={badge.name}
                      style={{
                        height: 64,
                        width: isBoard ? "auto" : 64,
                        maxWidth: isBoard ? 320 : 64,
                        borderRadius: 12,
                        objectFit: "contain",
                        background: T.surface,
                        border: `1px solid ${T.border}`,
                        padding: 4,
                        display: "block",
                      }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .achievements-cert-grid      { grid-template-columns: repeat(2, 1fr) !important; }
          .achievements-highlight-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .achievements-cert-grid      { grid-template-columns: 1fr !important; }
          .achievements-highlight-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
