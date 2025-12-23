"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";

const Skiper28 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  /**
   * RESPONSIVE MOTION
   * Smaller translate values to prevent overflow
   */
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [28, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.6], [220, 0]);
  const translateZ = useTransform(scrollYProgress, [0, 0.6], [-80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 1]);

  const transform = useMotionTemplate`
    rotateX(${rotateX}deg)
    translateY(${translateY}px)
    translateZ(${translateZ}px)
  `;

  return (
    <ReactLenis root>
      {/* OUTER WRAPPER — prevents horizontal overflow */}
      <section
        ref={targetRef}
        className="relative h-[140vh] w-full overflow-hidden"
      >
        {/* STICKY SCENE */}
        <div
          className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
          style={{
            perspective: "800px",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            style={{
              transform,
              opacity,
              transformStyle: "preserve-3d",
            }}
            className="relative px-6 text-center"
          >
            {/* BACK DEPTH LAYER */}
            <div
              className="pointer-events-none absolute inset-0 translate-y-4 font-extrabold tracking-tight text-black/10 dark:text-gray-300/10 blur-sm"
              style={{
                transform: "translateZ(-50px)",
                fontSize: "clamp(2rem, 7vw, 4.5rem)",
              }}
            >
              HackShastra Events Be Like....
            </div>

            {/* MAIN TEXT */}
            <h1
              className="font-geist font-extrabold tracking-tight text-transparent bg-clip-text 
    animate-gradient
    bg-size-[200%_200%]
    bg-linear-to-r 
    dark:from-[#ff2e2e] dark:via-[#990000] dark:to-[#ff2e2e]
    from-[#0DA5F0] via-[#0055AA] to-[#0DA5F0]"
              style={{
                fontSize: "clamp(2.2rem, 7.5vw, 5rem)",
                lineHeight: 1.05,
              }}
            >
              HackShastra Events Be Like....
            </h1>

            {/* FADE — SAFE (no negative positioning) */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b " />
          </motion.div>
        </div>
      </section>
    </ReactLenis>
  );
};

export { Skiper28 };
