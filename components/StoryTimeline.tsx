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
    year: "2023",
  },
  {
    title: "First Spark",
    description:
      "We hosted our first event with 50 hackers. The energy was synthetic, raw, and electric. We knew then that this was more than just a club.",
    year: "2023",
  },
  {
    title: "Foundations",
    description:
      "Architecting a permanent home for builders. We developed our core philosophy: Learn by doing, build by heart.",
    year: "2024",
  },
  {
    title: "The Forge",
    description:
      "Scaling the impact to 500+ builders across the region. Developing the tools and network that would support an nationwide movement.",
    year: "2024",
  },
  {
    title: "Neural Network",
    description:
      "Expansion into nationwide chapters. The HackShastra neural network begins to connect the brightest minds in tech.",
    year: "2025",
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
      className="relative w-full bg-[#fcfcfc] dark:bg-[#0c0c0c] overflow-hidden transition-colors duration-700 md:min-h-screen py-20 px-0"
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
                <div className="absolute -top-4 -left-4 md:-top-7 md:-left-7 w-12 h-12 md:w-20 md:h-20 rounded-full bg-[#0DA5F0] dark:bg-[#FA0001] flex items-center justify-center text-white font-black text-lg md:text-2xl shadow-xl z-20">
                  {m.year.slice(2)}
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
      <div className="absolute bottom-10 left-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none hidden lg:block">
        <span className="text-[15rem] font-black tracking-tighter select-none">
          ARCHITECTURE
        </span>
      </div>
    </div>
  );
};

export default StoryTimeline;
