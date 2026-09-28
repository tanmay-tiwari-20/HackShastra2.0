"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";

interface Skiper28Props {
  showPeeps?: boolean;
}

const Skiper28: React.FC<Skiper28Props> = ({ showPeeps = true }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  /**
   * RESPONSIVE MOTION
   * Rotate into place while scrolling through the sticky section
   */
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [28, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.45], [60, 0]);
  const translateZ = useTransform(scrollYProgress, [0, 0.45], [-80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 1]);

  const transform = useMotionTemplate`
    rotateX(${rotateX}deg)
    translateY(${translateY}px)
    translateZ(${translateZ}px)
  `;

  return (
    <section
      ref={targetRef}
      className="relative min-h-screen h-[135vh] sm:h-[145vh] w-full overflow-hidden z-10"
    >
      <div
        className="sticky top-0 flex h-screen items-center justify-center translate-y-16 sm:translate-y-24 md:translate-y-32 overflow-hidden z-20 pointer-events-none"
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
          className="relative px-6 text-center z-30 pointer-events-auto"
        >
          <div
            className="pointer-events-none absolute inset-0 translate-y-4 font-extrabold tracking-tight text-black/10 dark:text-gray-300/10 blur-sm"
            style={{
              transform: "translateZ(-50px)",
              fontSize: "clamp(2rem, 7vw, 4.5rem)",
            }}
          >
            HackShastra Events Be Like....
          </div>
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
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b" />
        </motion.div>
      </div>

      {showPeeps && (
        <CrowdCanvas src="/all-peeps.png" rows={15} cols={7} className="z-10" />
      )}
    </section>
  );
};

export { Skiper28 };
