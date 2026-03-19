"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaTarget: number;
  color: string;
  life: number;
  maxLife: number;
}

const COLORS = [
  "139,92,246",   // violet
  "34,211,238",   // cyan
  "139,92,246",   // violet (weighted higher)
];

const PARTICLE_COUNT     = 55;
const CONNECTION_DIST    = 120;
const MOUSE_REPEL_RADIUS = 140;
const MOUSE_REPEL_FORCE  = 0.012;

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced-motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let width  = 0;
    let height = 0;
    let rafId  = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    const particles: Particle[] = [];

    function resize() {
      width  = canvas!.width  = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }

    function randomColor() {
      return COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    function makeParticle(forceX?: number, forceY?: number): Particle {
      const color   = randomColor();
      const maxLife = 300 + Math.random() * 400;
      return {
        x:           forceX ?? Math.random() * width,
        y:           forceY ?? Math.random() * height,
        vx:          (Math.random() - 0.5) * 0.35,
        vy:          (Math.random() - 0.5) * 0.35,
        radius:      Math.random() * 1.8 + 0.8,
        alpha:       0,
        alphaTarget: Math.random() * 0.45 + 0.15,
        color,
        life:        0,
        maxLife,
      };
    }

    function init() {
      resize();
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = makeParticle();
        p.alpha = p.alphaTarget;
        p.life  = Math.random() * p.maxLife;
        particles.push(p);
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Fade in/out with lifecycle
        p.life++;
        if (p.life > p.maxLife) {
          // Reset particle at a random position
          const np = makeParticle();
          Object.assign(p, np);
          continue;
        }

        const lifePct = p.life / p.maxLife;
        const fadePct = lifePct < 0.1
          ? lifePct / 0.1
          : lifePct > 0.8
            ? 1 - (lifePct - 0.8) / 0.2
            : 1;
        p.alpha = p.alphaTarget * fadePct;

        // Mouse repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
          const force = (MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS;
          p.vx += (dx / dist) * force * MOUSE_REPEL_FORCE;
          p.vy += (dy / dist) * force * MOUSE_REPEL_FORCE;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Soft boundary wrap
        if (p.x < -20)      p.x = width + 20;
        if (p.x > width+20) p.x = -20;
        if (p.y < -20)       p.y = height + 20;
        if (p.y > height+20) p.y = -20;

        // Draw dot
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx!.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx   = a.x - b.x;
          const dy   = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const lineAlpha =
              (1 - dist / CONNECTION_DIST) *
              Math.min(a.alpha, b.alpha) *
              0.35;

            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${a.color},${lineAlpha})`;
            ctx!.lineWidth   = 0.6;
            ctx!.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    // Event listeners
    const onResize = () => { resize(); };
    const onMouse  = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onLeave  = () => { mouseX = -9999; mouseY = -9999; };

    window.addEventListener("resize",      onResize,  { passive: true });
    window.addEventListener("mousemove",   onMouse,   { passive: true });
    window.addEventListener("mouseleave",  onLeave,   { passive: true });

    init();
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize",     onResize);
      window.removeEventListener("mousemove",  onMouse);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.65,
      }}
    />
  );
}