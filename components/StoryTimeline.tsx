"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    title: "The Vision",
    description:
      "Born in a college dorm, HackShastra started with a simple question: Why aren't we building more? We set out to create the catalyst for a new era of engineering.",
    month: "NOV",
    year: "2024",
  },
  {
    title: "First Spark",
    description:
      "We hosted our first tech event, a Pre-Meetup with 300+ students. The energy was raw, electric, and inspiring. This marked the true beginning of HackShastra’s community journey.",
    month: "JUL",
    year: "2025",
  },
  {
    title: "National Breakthrough",
    description:
      "Our first national hackathon brought together 3800+ students from across India. Builders, dreamers, and innovators united to create, compete, and collaborate.",
    month: "SEP",
    year: "2025",
  },
  {
    title: "The Expansion",
    description:
      "We began expanding HackShastra beyond a single campus by launching college chapters. Our mission started spreading across institutions and communities.",
    month: "OCT",
    year: "2025",
  },
  {
    title: "PAN India Movement",
    description:
      "In less than a year, HackShastra evolved into a PAN India community, connecting innovators across the country. The movement continues to grow stronger every day.",
    month: "JAN",
    year: "2026",
  },
];

const StoryTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const ctx = gsap.context(() => {
      // Horizontal Scroll only on Desktop (md and up)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const scrollWidth = scrollRef.current!.scrollWidth;
        const viewportWidth = window.innerWidth;
        const amountToScroll = scrollWidth - viewportWidth;

        gsap.to(scrollRef.current, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${amountToScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Staggered reveal for cards
        gsap.from(".timeline-card", {
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 30%",
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Simple vertical reveal on mobile
        gsap.utils.toArray(".timeline-card").forEach((card: any) => {
          gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="story-section"
      ref={containerRef}
      className="relative w-full bg-white dark:bg-[#0A0A0A] overflow-hidden transition-colors duration-700 md:min-h-screen py-20 px-0"
    >
      {/* Narrative Label */}
      <div className="absolute top-10 md:top-20 left-10 lg:left-20 z-10 flex items-center gap-4">
        <div className="w-8 md:w-12 h-px bg-[#0DA5F0] dark:bg-[#FA0001]" />
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] md:tracking-[0.8em] opacity-40">
          CHRONICLES OF BUILDERS
        </span>
      </div>

      <div className="flex items-start md:items-center pt-24 md:pt-0">
        <div
          ref={scrollRef}
          className="flex flex-col md:flex-row gap-10 md:gap-32 px-6 md:px-40 py-20 items-center md:items-center w-full md:w-auto"
        >
          {milestones.map((m, i) => (
            <div key={i} className="timeline-card w-full md:w-[500px] shrink-0">
              <div className="relative p-8 md:p-14 rounded-[2rem] md:rounded-[3.5rem] border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900/20 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-none">
                <div className="absolute -top-4 -left-4 md:-top-7 md:-left-7 w-14 h-14 md:w-24 md:h-24 rounded-full bg-[#0DA5F0] dark:bg-[#FA0001] flex flex-col items-center justify-center text-white font-black shadow-xl z-20">
                  <span className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-80 mb-0.5 md:mb-1">
                    {m.month}
                  </span>
                  <span className="text-xs md:text-xl font-bold leading-none">
                    {m.year}
                  </span>
                </div>

                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-20 block mb-3 md:mb-5">
                  EPOCH // 0{i + 1}
                </span>

                <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-black dark:text-white leading-[0.9] mb-6 md:mb-10">
                  {m.title}
                </h3>

                <p className="text-base md:text-xl opacity-60 dark:opacity-40 leading-relaxed tracking-tight font-medium">
                  {m.description}
                </p>

                {/* Industrial Grid Small Marker */}
                <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 w-8 h-8 md:w-12 md:h-12 opacity-10">
                  <div className="absolute top-0 right-0 w-1/2 h-px bg-current" />
                  <div className="absolute top-0 right-0 h-1/2 w-px bg-current" />
                </div>
              </div>
            </div>
          ))}

          {/* End Spacing for Desktop Horizontal Scroll */}
          <div className="hidden md:block w-[40vw] shrink-0" />
        </div>
      </div>

      {/* Background Decorative Text - Industrial */}
      <div className="absolute -bottom-10 left-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none hidden lg:block">
        <span className="text-[10rem] font-black tracking-tighter select-none">
          THE ARCHITECTS
        </span>
      </div>
    </div>
  );
};

export default StoryTimeline;
