"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export interface BlinkingDotsProps {
  /** Number of grid cells across the shortest canvas axis or spacing factor */
  density?: number;
  /** Proportion of grid cells occupied by a dot (0 to 1) */
  coverage?: number;
  /** Rate of twinkle / blink cycle */
  twinkleSpeed?: number;
  /** Minimum opacity floor during twinkle (0 to 1) */
  twinkleDepth?: number;
  /** Base radius of dots in pixels */
  dotRadius?: number;
  /** Size multiplier variation between dots */
  sizeVariation?: number;
  /** Spatial jitter from exact grid intersection (0 to 1) */
  jitter?: number;
  /** Drift velocity along the canvas */
  driftSpeed?: number;
  /** Drift direction in radians */
  driftAngle?: number;
  /** Optional custom dot colors override [from, to] */
  colorFrom?: string;
  colorTo?: string;
  /** Optional custom color palette override (array of "r, g, b" strings) */
  colorPalette?: string[];
  /** Mouse cursor reaction radius */
  cursorRadius?: number;
  /** Mouse cursor displacement strength */
  cursorStrength?: number;
  /** Additional classes */
  className?: string;
}

interface Dot {
  gridX: number;
  gridY: number;
  jitterX: number;
  jitterY: number;
  radius: number;
  phase: number;
  speed: number;
  baseAlpha: number;
  isAccent: boolean;
  color: string;
}

export const BlinkingDots: React.FC<BlinkingDotsProps> = ({
  density = 52,
  coverage = 0.62,
  twinkleSpeed = 0.035,
  twinkleDepth = 0.82,
  dotRadius = 1.45,
  sizeVariation = 0.85,
  jitter = 0.16,
  driftSpeed = 0.06,
  driftAngle = Math.PI / 4,
  colorFrom,
  colorTo,
  colorPalette,
  cursorRadius = 160,
  cursorStrength = 18,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    const isDark = resolvedTheme === "dark";

    // Theme color sets derived directly from the SHASTRA brand gradient:
    // Light Mode: from-[#0DA5F0] via-blue-700 (#1d4ed8) to-[#0DA5F0]
    // Dark Mode:  dark:from-[#ff2e2e] dark:via-red-800 (#991b1b) dark:to-[#ff2e2e]
    const primaryRgb = colorFrom || (isDark ? "255, 46, 46" : "13, 165, 240");
    const secondaryRgb = colorTo || (isDark ? "153, 27, 27" : "29, 78, 216");

    // Colors sampled directly along the SHASTRA text gradients
    const themePalettes = isDark
      ? [
          primaryRgb, // #ff2e2e (Shastra from/to)
          "239, 68, 68", // red-500
          "220, 38, 38", // red-600
          "185, 28, 28", // red-700
          secondaryRgb, // #991b1b (Shastra via red-800)
          "127, 29, 29", // red-900
        ]
      : [
          primaryRgb, // #0DA5F0 (Shastra from/to)
          "14, 142, 233", // intermediate cyan-blue
          "37, 99, 235", // blue-600
          secondaryRgb, // #1d4ed8 (Shastra via blue-700)
          "30, 64, 175", // blue-800
          "2, 132, 199", // sky-600
        ];

    const activePalette =
      colorPalette && colorPalette.length > 0 ? colorPalette : themePalettes;
    const neutralRgb = isDark ? "215, 220, 230" : "100, 116, 139";

    let dots: Dot[] = [];
    let driftX = 0;
    let driftY = 0;

    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;

    const buildGrid = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);

      const shortestAxis = Math.min(width, height);
      const cellSize = Math.max(16, Math.floor(shortestAxis / density));

      const cols = Math.ceil(width / cellSize) + 2;
      const rows = Math.ceil(height / cellSize) + 2;

      dots = [];

      for (let c = -1; c < cols; c++) {
        for (let r = -1; r < rows; r++) {
          // Identical dot coverage across both light and dark mode
          if (Math.random() > coverage) continue;

          // Equal colorful accent dot proportion across both themes
          const isAccent = Math.random() < 0.72;

          let chosenColor = neutralRgb;
          if (isAccent) {
            const paletteIndex = Math.floor(
              Math.random() * activePalette.length
            );
            chosenColor = activePalette[paletteIndex];
          }

          const sizeFactor = 1 + (Math.random() - 0.5) * sizeVariation;
          // Identical dot radius across both themes
          const radius = Math.max(
            0.75,
            dotRadius * (isAccent ? sizeFactor * 1.3 : sizeFactor * 0.9)
          );

          // Equal base alpha across both themes for identical perceived dot density
          const baseAlpha = isAccent
            ? 0.78 + Math.random() * 0.22
            : 0.35 + Math.random() * 0.18;

          dots.push({
            gridX: c * cellSize,
            gridY: r * cellSize,
            jitterX: (Math.random() - 0.5) * cellSize * jitter,
            jitterY: (Math.random() - 0.5) * cellSize * jitter,
            radius,
            phase: Math.random() * Math.PI * 2,
            speed: (0.6 + Math.random() * 0.8) * twinkleSpeed,
            baseAlpha,
            isAccent,
            color: chosenColor,
          });
        }
      }
    };

    buildGrid();

    const handleResize = () => {
      buildGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const cosAngle = Math.cos(driftAngle);
    const sinAngle = Math.sin(driftAngle);

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.666, 2.5);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.12 * dt;
      mouseY += (targetMouseY - mouseY) * 0.12 * dt;

      // Update drift
      driftX = (driftX + driftSpeed * cosAngle * dt) % width;
      driftY = (driftY + driftSpeed * sinAngle * dt) % height;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        dot.phase += dot.speed * dt;

        // Twinkle factor using smooth sine wave
        const wave = Math.sin(dot.phase);
        const twinkleFactor = 1 - Math.max(0, wave) * twinkleDepth;

        // Consistent floor across both themes so dot density is visually balanced
        const minAlphaFloor = 0.12;
        const currentAlpha = Math.max(minAlphaFloor, dot.baseAlpha * twinkleFactor);

        let posX = dot.gridX + dot.jitterX + driftX;
        let posY = dot.gridY + dot.jitterY + driftY;

        // Wrap around canvas smoothly
        if (posX < 0) posX += width;
        if (posX > width) posX -= width;
        if (posY < 0) posY += height;
        if (posY > height) posY -= height;

        // Interactive cursor reaction (subtle push away / magnetic glow)
        let drawRadius = dot.radius;
        let finalAlpha = currentAlpha;

        if (mouseX > 0 && mouseY > 0) {
          const dx = posX - mouseX;
          const dy = posY - mouseY;
          const distSq = dx * dx + dy * dy;
          const cursorRadiusSq = cursorRadius * cursorRadius;

          if (distSq < cursorRadiusSq) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / cursorRadius;
            const push = factor * cursorStrength;
            const angle = Math.atan2(dy, dx);

            posX += Math.cos(angle) * push;
            posY += Math.sin(angle) * push;

            // Extra brightness & size near cursor
            finalAlpha = Math.min(1, currentAlpha + factor * 0.4);
            drawRadius += factor * 0.8;
          }
        }

        // Draw crisp dot
        ctx.beginPath();
        ctx.arc(posX, posY, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot.color}, ${finalAlpha})`;
        ctx.fill();

        // High-impact glow halo for accent dots
        if (dot.isAccent && finalAlpha > 0.28) {
          ctx.beginPath();
          ctx.arc(
            posX,
            posY,
            drawRadius * 2.6,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(${dot.color}, ${finalAlpha * (isDark ? 0.22 : 0.25)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    density,
    coverage,
    twinkleSpeed,
    twinkleDepth,
    dotRadius,
    sizeVariation,
    jitter,
    driftSpeed,
    driftAngle,
    colorFrom,
    colorTo,
    colorPalette,
    cursorRadius,
    cursorStrength,
    resolvedTheme,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          maskImage:
            "radial-gradient(ellipse 95% 85% at 50% 40%, black 35%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 85% at 50% 40%, black 35%, transparent 92%)",
        }}
      />
    </div>
  );
};

export default BlinkingDots;
