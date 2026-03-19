"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { socialLinks } from "@/data/portfolio";

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github size={16} />,
  Linkedin: <Linkedin size={16} />,
  Mail: <Mail size={16} />,
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-border bg-bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: copyright */}
        <div className="text-center sm:text-left">
          <p className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()}{" "}
            <span className="text-text-secondary">Kusum Pareek</span>
            {" "}— Built with Next.js · Tailwind · Framer Motion
          </p>
        </div>

        {/* Center: socials */}
        <div className="flex items-center gap-3">
          {socialLinks.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ y: -2, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-text-muted hover:text-accent-violet hover:border-border-glow transition-colors"
            >
              {iconMap[s.icon]}
            </motion.a>
          ))}
        </div>

        {/* Right: back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent-violet transition-colors"
        >
          <ArrowUp size={14} />
          Back to top
        </motion.button>
      </div>
    </footer>
  );
}