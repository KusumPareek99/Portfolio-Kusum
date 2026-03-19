"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerNormal, fadeUp, defaultViewport } from "@/lib/animations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCounter } from "@/hooks/useCounter";
import { stats, education } from "@/data/portfolio";
import { BadgeChip } from "@/components/ui/Chips";

// ─── STAT CARD ────────────────────────────────────────────────────────────

function StatCard({ value, label, suffix, inView }: {
  value: string;
  label: string;
  suffix?: string;
  inView: boolean;
}) {
  const isDecimal = value.includes(".");
  const numericValue = parseFloat(value);
  const counted = useCounter(numericValue, inView, 1200, isDecimal ? 2 : 0);

  return (
    <motion.div
      variants={fadeUp}
      className="card text-center hover:border-border-glow"
    >
      <div className="font-display font-black text-4xl gradient-text mb-1">
        {counted}{suffix}
      </div>
      <div className="font-mono text-[11px] text-text-muted uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────

export default function About() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="about" className="section-wrapper max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: text */}
        <motion.div
          variants={staggerNormal}
          initial="hidden"
          whileInView="show"
          viewport={defaultViewport}
        >
          <SectionHeading
            eyebrow="who i am"
            title="Building systems that"
            titleHighlight="actually scale."
          />

          <motion.div variants={fadeUp} className="space-y-4 text-text-secondary font-body leading-relaxed">
            <p>
              I&apos;m a results-driven Software Development Engineer with strong hands-on
              experience in backend and full-stack development. I design, build, and deploy
              scalable systems using{" "}
              <span className="text-text-primary">Node.js</span>,{" "}
              <span className="text-text-primary">Python (Flask)</span>,{" "}
              <span className="text-text-primary">React</span>, and cloud platforms.
            </p>
            <p>
              Currently at <span className="text-accent-violet">Dr. D.Y. Patil School of Management</span>,
              architecting ERP/LMS modules that support real-time academic workflows for
              thousands of users.
            </p>
            <p>
              Outside of work, I contribute to open source (GSSoC &apos;24),
              earn certifications obsessively, and chase that 80% performance improvement.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
            <BadgeChip label="🥇 Gold Medalist — BCA 90.29%" color="amber" />
            <BadgeChip label="MCA 9.36 GPA" color="violet" />
            <BadgeChip label="Open Source Contributor" color="emerald" />
          </motion.div>

          {/* Education quick view */}
          <motion.div variants={fadeUp} className="mt-8 space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-start gap-3 p-3 rounded-xl bg-bg-surface border border-border">
                <div className="w-8 h-8 rounded-lg bg-grad-primary flex-shrink-0 flex items-center justify-center font-mono text-[10px] font-bold text-white">
                  {edu.degree.split(" ")[0]}
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-text-primary">{edu.degree}</div>
                  <div className="font-mono text-xs text-text-muted mt-0.5">{edu.institution} · {edu.score}</div>
                  {edu.achievement && (
                    <div className="font-mono text-xs text-accent-amber mt-0.5">{edu.achievement}</div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: stat cards */}
        <div ref={ref}>
          <motion.div
            variants={staggerNormal}
            initial="hidden"
            whileInView="show"
            viewport={defaultViewport}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} inView={inView} />
            ))}
          </motion.div>

          {/* Availability card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={defaultViewport}
            className="mt-4 p-4 rounded-xl bg-accent-emerald/5 border border-accent-emerald/20 flex items-center gap-3"
          >
            <span className="availability-dot flex-shrink-0" />
            <div>
              <div className="font-display text-sm font-semibold text-accent-emerald">Available for Opportunities</div>
              <div className="font-mono text-xs text-text-muted">Pune, Maharashtra · Open to remote</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}