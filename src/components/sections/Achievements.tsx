"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerFast, staggerNormal, scaleIn, fadeUp, defaultViewport } from "@/lib/animations";
import { certificates, badgeGroups } from "@/data/portfolio";
import { ExternalLink } from "lucide-react";

const issuerColors: Record<string, string> = {
  hackerrank:   "#00EA64",
  freecodecamp: "#0A0A23",
  google:       "#4285F4",
  coursera:     "#0056D2",
  jpmorgan:     "#003594",
  deloitte:     "#86BC25",
};

// Text contrast for dark issuer backgrounds
const issuerTextColors: Record<string, string> = {
  hackerrank:   "#000",
  freecodecamp: "#fff",
  google:       "#fff",
  coursera:     "#fff",
  jpmorgan:     "#fff",
  deloitte:     "#000",
};

export default function Achievements() {
  return (
    <section id="achievements" className="section-wrapper max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="recognition & learning"
        title="Achievements &"
        titleHighlight="Certificates"
        subtitle="14+ certificates across platforms. Open source contributor. Gold Medalist."
      />

      {/* Highlight stat cards */}
      <motion.div
        variants={staggerNormal}
        initial="hidden"
        whileInView="show"
        viewport={defaultViewport}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {[
          { label: "Gold Medalist", sub: "BCA · 90.29%",  color: "#F59E0B" },
          { label: "5★ Python",     sub: "HackerRank",    color: "#00EA64" },
          { label: "4★ SQL",        sub: "HackerRank",    color: "#00EA64" },
          { label: "GSSoC '24",     sub: "Open Source",   color: "#8B5CF6" },
        ].map((b) => (
          <motion.div
            key={b.label}
            variants={scaleIn}
            className="card text-center"
            style={{ borderColor: `${b.color}33` }}
          >
            <div
              className="font-display font-bold text-base mb-1"
              style={{ color: b.color }}
            >
              {b.label}
            </div>
            <div className="font-mono text-xs text-text-muted">{b.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Certificates grid */}
      <div className="mb-12">
        <h3 className="font-mono text-xs text-text-muted tracking-widest uppercase mb-6">
          Certificates ({certificates.length})
        </h3>
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {certificates.map((cert) => (
            <motion.a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              whileHover={{ y: -3, borderColor: "#2D2D52" }}
              className="card flex items-center gap-3 group no-underline"
            >
              <div
                className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center font-mono text-[10px] font-bold"
                style={{
                  background:  issuerColors[cert.issuer]     || "#8B5CF6",
                  color:       issuerTextColors[cert.issuer] || "#fff",
                }}
              >
                {cert.issuerLabel.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm font-medium text-text-primary truncate">
                  {cert.title}
                </div>
                <div className="font-mono text-xs text-text-muted">
                  {cert.issuerLabel}
                </div>
              </div>
              <ExternalLink
                size={12}
                className="text-text-muted group-hover:text-accent-cyan transition-colors flex-shrink-0"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Badge groups */}
      {badgeGroups.map((group) => (
        <div key={group.title} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs text-text-muted tracking-widest uppercase">
              {group.title}
            </h3>
            {group.leaderboardLink && (
              <a
                href={group.leaderboardLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-accent-violet hover:text-accent-cyan transition-colors flex items-center gap-1"
              >
                Leaderboard <ExternalLink size={10} />
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-3 items-end">
            {group.badges.map((badge) => {
              // Holopin returns a wide board image, not a square badge
              const isBoard =
                badge.imageUrl.includes("holopin.me") ||
                badge.name.toLowerCase().includes("board");

              return (
                <motion.a
                  key={badge.name}
                  href={badge.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.06, y: -4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={badge.imageUrl}
                    alt={badge.name}
                    className={
                      isBoard
                        ? // Wide board image — let it breathe
                          "h-16 w-auto max-w-xs rounded-xl object-contain bg-bg-surface border border-border p-1"
                        : // Square badge
                          "w-16 h-16 rounded-xl object-contain bg-bg-surface border border-border p-1"
                    }
                    onError={(e) => {
                      // Hide broken images gracefully
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </motion.a>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
