"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  label: string;
  value: string;
  description: string;
}

const STATS: Stat[] = [
  {
    label: "Social Media Reach",
    value: "500k+",
    description: "Active followers across platforms",
  },
  {
    label: "College Chapters",
    value: "4",
    description: "Growing communities across NCR",
  },
  {
    label: "Successful Events",
    value: "3",
    description: "Major hackathons & tech events",
  },
  {
    label: "Community Partners",
    value: "67",
    description: "Student clubs across Delhi NCR",
  },
  {
    label: "Brand Partnerships",
    value: "100+",
    description: "Industry collaborations & sponsors",
  },
];

export default function ImpactStats() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLElement | null>(null);
  const rightRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  const secondaryColor = isDark ? "#FA0001" : "#0DA5F0";
  const secondaryRGB = isDark ? "250,0,1" : "13,165,240";

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.from(".left-animate", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted, isDark]);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-start">
          {/* LEFT */}
          <div ref={leftRef} className="space-y-8 order-1">
            <div className="left-animate">
              <span
                className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  backgroundColor: `${secondaryColor}15`,
                  border: `1px solid ${secondaryColor}40`,
                  color: secondaryColor,
                }}
              >
                Our Impact
              </span>
            </div>

            <div className="space-y-4 max-w-xl">
              <h1 className="left-animate text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                HackShastra in Numbers
              </h1>

              <p className="left-animate text-base sm:text-lg md:text-xl opacity-70 font-medium leading-relaxed">
                From building communities to hosting energetic hackathons,
                these numbers define our journey.
              </p>
            </div>
          </div>

          {/* RIGHT — STATS */}
          <div ref={rightRef} className="space-y-6 order-2">
            {STATS.map((stat, index) => (
              <div
                key={index}
                className="stat-item flex items-start space-x-5 group"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2.5"
                  style={{
                    backgroundColor: secondaryColor,
                    boxShadow: `0 0 10px rgba(${secondaryRGB},0.6)`,
                  }}
                />

                <div>
                  <span className="text-xs sm:text-sm opacity-50 font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>

                  <p
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mt-1"
                    style={{
                      WebkitBackgroundClip: "text",
                      color: secondaryColor, 
                    }}
                  >
                    {stat.value}
                  </p>

                  <p className="text-sm sm:text-base opacity-60 mt-0.5">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
