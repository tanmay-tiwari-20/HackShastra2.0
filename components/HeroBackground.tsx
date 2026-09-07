"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { BlinkingDots } from "@/components/ui/blinking-dots";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: string;
}

export const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const isDark = resolvedTheme === "dark";

    // Set particle palette based on theme
    const primaryColor = isDark ? "255, 46, 46" : "13, 165, 240";
    const accentColor = isDark ? "255, 120, 50" : "59, 130, 246";
    const neutralColor = isDark ? "200, 200, 220" : "100, 116, 139";

    const numParticles = Math.min(Math.floor((width * height) / 16000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      const isSpecial = Math.random() < 0.35;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: isSpecial ? Math.random() * 2 + 1.5 : Math.random() * 1.5 + 0.8,
        baseAlpha: isSpecial ? 0.6 : 0.25,
        alpha: Math.random() * 0.5 + 0.2,
        color: isSpecial
          ? Math.random() > 0.5
            ? primaryColor
            : accentColor
          : neutralColor,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const maxDistance = 120;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (isDark ? 0.12 : 0.08);
            ctx.strokeStyle = `rgba(${primaryColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce from boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();

        // Extra soft glow for colored particles
        if (p.color === primaryColor) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.18})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Primary Atmospheric Radial Spotlights */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[85vw] max-w-[1100px] h-[500px] md:h-[650px] rounded-[100%] bg-radial from-blue-500/15 via-blue-600/5 to-transparent dark:from-red-600/20 dark:via-red-700/6 dark:to-transparent blur-[80px] md:blur-[110px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[800px] h-[400px] rounded-full bg-radial from-cyan-400/10 via-transparent to-transparent dark:from-orange-500/10 dark:via-transparent dark:to-transparent blur-[90px]" />

      {/* 2. Cyber Tech Grid with Radial Mask */}
      <div
        className="absolute inset-0 opacity-[0.28] dark:opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 65% at 50% 35%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 65% at 50% 35%, black 20%, transparent 80%)",
        }}
      />

      {/* CSS variable for theme-aware grid line */}
      <style jsx>{`
        div {
          --grid-line: rgba(0, 0, 0, 0.07);
        }
        :global(.dark) div {
          --grid-line: rgba(255, 255, 255, 0.08);
        }
      `}</style>

      {/* 3. React Bits Pro - Blinking Dots on Fixed Grid */}
      <BlinkingDots
        density={42}
        coverage={0.46}
        dotRadius={1.5}
        sizeVariation={0.7}
        jitter={0.06}
        twinkleSpeed={0.032}
        twinkleDepth={0.82}
        driftSpeed={0.04}
        cursorRadius={180}
        cursorStrength={14}
        className="opacity-90 dark:opacity-95"
      />

      {/* 4. Interactive Ambient Particle & Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 dark:opacity-75"
      />
      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white dark:from-black to-transparent" />
    </div>
  );
};
