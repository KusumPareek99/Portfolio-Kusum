"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/data/portfolio";

/* ─── Tokens ──────────────────────────────────────────────── */
const T = {
  bg:        "#050508",
  surface:   "#0D0D14",
  border:    "#1A1A2E",
  borderGlow:"#2D2D52",
  violet:    "#8B5CF6",
  cyan:      "#22D3EE",
  t1:        "#F0F0FF",
  t2:        "#A0A0C0",
  hover:     "#13131E",
};

/* ─── Download icon ───────────────────────────────────────── */
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

/* ─── Hamburger icon ──────────────────────────────────────── */
const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [hoveredNav,  setHoveredNav]  = useState<string | null>(null);
  const [resumeHov,   setResumeHov]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  /* ── Header styles ────────────────────────────────────────── */
  const headerStyle: React.CSSProperties = {
    position:   "fixed",
    top:        0,
    left:       0,
    right:      0,
    zIndex:     9000,
    transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
    background: scrolled ? "rgba(5,5,8,0.85)" : "transparent",
    borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
  };

  const innerStyle: React.CSSProperties = {
    maxWidth:       "80rem",
    margin:         "0 auto",
    padding:        "0 1.5rem",
    height:         "64px",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
    gap:            "1rem",
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        style={headerStyle}
      >
        <div style={innerStyle}>

          {/* ── Logo ───────────────────────────────────────── */}
          <motion.a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `linear-gradient(135deg, ${T.violet}, ${T.cyan})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Syne', sans-serif", fontWeight: 900,
              fontSize: 13, color: "#fff",
              boxShadow: `0 0 16px ${T.violet}55`,
              flexShrink: 0,
            }}>KP</div>
            <span style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: 15, color: T.t1,
              display: "none",    // hidden on mobile, shown via JS below
            }}
              className="navbar-brand-name"
            >kusumpareek</span>
          </motion.a>

          {/* ── Desktop Nav ────────────────────────────────── */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}
               className="navbar-desktop-nav">
            {navItems.map(item => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => setHoveredNav(item.href)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{
                  background:  "none",
                  border:      "none",
                  padding:     "4px 0",
                  fontFamily:  "'Epilogue', sans-serif",
                  fontWeight:  500,
                  fontSize:    14,
                  color:       hoveredNav === item.href ? T.t1 : T.t2,
                  position:    "relative",
                  transition:  "color 0.2s",
                  whiteSpace:  "nowrap",
                }}
              >
                {item.label}
                {/* Underline sweep */}
                <motion.span
                  animate={{ scaleX: hoveredNav === item.href ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                  style={{
                    position:    "absolute",
                    bottom:      -2, left: 0, right: 0,
                    height:      1.5,
                    background:  `linear-gradient(90deg, ${T.violet}, ${T.cyan})`,
                    transformOrigin: "left",
                    display:     "block",
                  }}
                />
              </button>
            ))}
          </nav>

          {/* ── Right: Resume + Hamburger ──────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>

            {/* Resume button — hidden on small screens */}
            <motion.button
              className="navbar-resume-btn"
              onClick={() => window.open("/Kusum-Pareek-SDE-Resume.pdf", "_blank")}
              onMouseEnter={() => setResumeHov(true)}
              onMouseLeave={() => setResumeHov(false)}
              whileTap={{ scale: 0.96 }}
              style={{
                display:     "inline-flex",
                alignItems:  "center",
                gap:         "6px",
                padding:     "8px 16px",
                borderRadius: 999,
                border:      `1px solid ${resumeHov ? T.violet : T.borderGlow}`,
                background:  "transparent",
                fontFamily:  "'Epilogue', sans-serif",
                fontWeight:  600,
                fontSize:    13,
                color:       resumeHov ? T.t1 : T.t2,
                transition:  "border-color 0.2s, color 0.2s",
                whiteSpace:  "nowrap",
              }}
            >
              <DownloadIcon />
              Resume
            </motion.button>

            {/* Hamburger — only on mobile */}
            <motion.button
              className="navbar-hamburger"
              onClick={() => setMobileOpen(v => !v)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
              style={{
                width:      36, height: 36, borderRadius: 10,
                border:     `1px solid ${T.border}`,
                background: "transparent",
                display:    "flex", alignItems: "center", justifyContent: "center",
                color:      T.t2, flexShrink: 0,
              }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 8900,
                background: "rgba(5,5,8,0.7)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "fixed", top: 72, left: 16, right: 16, zIndex: 9100,
                background: T.surface,
                border:     `1px solid ${T.border}`,
                borderRadius: 20,
                padding:    "24px",
                boxShadow:  "0 24px 64px rgba(0,0,0,0.5)",
              }}
            >
              <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(item.href)}
                    style={{
                      textAlign:   "left",
                      padding:     "12px 16px",
                      borderRadius: 12,
                      background:  "transparent",
                      border:      "none",
                      fontFamily:  "'Epilogue', sans-serif",
                      fontSize:    15,
                      color:       T.t2,
                      transition:  "background 0.15s, color 0.15s",
                      width:       "100%",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = T.hover;
                      (e.currentTarget as HTMLElement).style.color = T.t1;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = T.t2;
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${T.border}` }}>
                <motion.button
                  whileTap={{ scale: 0.97 }}    
                  onClick={() => { window.open("/Kusum-Pareek-SDE-Resume.pdf", "_blank"); setMobileOpen(false); }}
                  style={{
                    width:       "100%",
                    display:     "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding:     "13px 24px",
                    borderRadius: 12,
                    background:  `linear-gradient(135deg, ${T.violet}, #6D28D9)`,
                    border:      "none",
                    fontFamily:  "'Syne', sans-serif",
                    fontWeight:  700, fontSize: 14,
                    color:       "#fff",
                    boxShadow:   `0 8px 24px ${T.violet}44`,
                  }}
                >
                  <DownloadIcon />
                  Download Resume
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Responsive overrides via <style> — guaranteed to work regardless of Tailwind */}
      <style>{`
        /* Desktop: show brand name + nav, hide hamburger */
        @media (min-width: 768px) {
          .navbar-brand-name   { display: block !important; }
          .navbar-desktop-nav  { display: flex !important; }
          .navbar-resume-btn   { display: inline-flex !important; }
          .navbar-hamburger    { display: none !important; }
        }
        /* Mobile: hide desktop nav + resume, show hamburger */
        @media (max-width: 767px) {
          .navbar-brand-name   { display: none !important; }
          .navbar-desktop-nav  { display: none !important; }
          .navbar-resume-btn   { display: none !important; }
          .navbar-hamburger    { display: flex !important; }
        }
      `}</style>
    </>
  );
}
