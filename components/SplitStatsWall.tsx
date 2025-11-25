"use client";
import { JSX, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import Image from "next/image";

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

// SVG ICONS FOR EACH STAT
const ICONS: Record<string, JSX.Element> = {
  "Social Media Reach": (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M18 2H6a2 2 0 00-2 2v16l4-4h10a2 2 0 002-2V4a2 2 0 00-2-2z" />
    </svg>
  ),

  "College Chapters": (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M21 10v6l-9 4-9-4v-6" />
    </svg>
  ),

  "Successful Events": (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),

  "Community Partners": (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0113 0" />
    </svg>
  ),

  "Brand Partnerships": (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M16 8a4 4 0 11-8 0 4 4 0 018 0z" />
      <path d="M12 12v8" />
      <path d="M8 20h8" />
    </svg>
  ),
};

export default function SplitStatsWall() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const secondaryColor = isDark ? "#FA0001" : "#0DA5F0";

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!resolvedTheme) return;

    const ctx = gsap.context(() => {
      // LEFT text + image animation
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

      // EACH STAT CARD ANIMATION
      gsap.utils.toArray(".stat-item").forEach((card: any) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [resolvedTheme]);

  if (!resolvedTheme) return null;

  return (
    <section ref={sectionRef} className="w-full py-14 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT SECTION */}
        <div ref={leftRef} className="space-y-10 order-1">
          {/* TAG */}
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

          {/* TITLE */}
          <div className="space-y-4 max-w-xl">
            <h1 className="left-animate text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
              HackShastra in Numbers
            </h1>

            <p className="left-animate text-lg opacity-70 font-medium leading-relaxed">
              From building communities to hosting energetic hackathons, these
              numbers define our journey.
            </p>
          </div>

          {/* IMAGE */}
          <div className="left-animate">
            <div
              className="p-0.5 rounded-2xl w-full max-w-md"
              style={{
                background: `linear-gradient(135deg, ${secondaryColor}, transparent 60%)`,
              }}
            >
              <Image
                src="/images/reach.JPG"
                alt="HackShastra Reach"
                width={10000}
                height={10000}
                className="w-full rounded-2xl shadow-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* RIGHT — GRID OF STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="stat-item p-6 rounded-xl border bg-white dark:bg-[#0e0e0e] shadow-sm hover:shadow-md transition-all duration-300"
              style={{ borderColor: `${secondaryColor}40` }}
            >
              <div className="flex items-start gap-4">
                {/* ICON */}
                <div className="text-[18px]" style={{ color: secondaryColor }}>
                  {ICONS[stat.label]}
                </div>

                {/* TEXT CONTENT */}
                <div>
                  <span className="text-xs opacity-60 uppercase font-semibold tracking-wider">
                    {stat.label}
                  </span>

                  <p
                    className="text-3xl sm:text-4xl font-bold mt-1"
                    style={{ color: secondaryColor }}
                  >
                    {stat.value}
                  </p>

                  <p className="text-sm opacity-60 mt-1">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
