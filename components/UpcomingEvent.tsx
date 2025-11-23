"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const UpcomingEvent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text stagger animation
      gsap.from(".animate-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
      });

      // Image scale and glow animation
      gsap.from(imageRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const eventDetails = [
    { label: "Date", value: "31 January – 1 February" },
    { label: "Venue", value: "IPEC, Ghaziabad" },
    { label: "Format", value: "24-Hour Offline Hackathon" },
    { label: "Details", value: "Multiple tracks, cash prizes, and workshops" },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full pt-28 pb-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">
          {/* RIGHT POSTER / VISUAL — now FIRST on mobile */}
          <div
            ref={imageRef}
            className="relative flex justify-center lg:justify-end w-full order-1 lg:order-2"
          >
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-3/4 rounded-3xl overflow-hidden bg-foreground/5 border border-foreground/10 shadow-2xl">
              {/* PRESENTS PNG AS POSTER */}
              <Image
                height={10000}
                width={10000}
                src="/images/Presents.png"
                alt="Poster"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* LEFT CONTENT — now SECOND on mobile */}
          <div ref={textRef} className="space-y-8 order-2 lg:order-1">
            {/* Tag */}
            <div className="animate-text">
              <span className="px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-full text-xs font-semibold tracking-widest uppercase">
                Upcoming Event
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-4">
              <h1 className="animate-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
                SnowHackIPEC
              </h1>
              <p className="animate-text text-base sm:text-lg md:text-xl opacity-70 font-medium leading-relaxed">
                IPEC&apos;s annual winter hackathon organized by HackShastra.
              </p>
            </div>

            {/* Event Details */}
            <div className="animate-text space-y-4 pt-2 sm:pt-4">
              {eventDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start space-x-4 group">
                  <div className="w-1.5 h-1.5 bg-foreground rounded-full mt-2.5 group-hover:scale-150 transition-all duration-300" />
                  <div>
                    <span className="text-xs sm:text-sm opacity-50 font-medium uppercase tracking-wider">
                      {detail.label}
                    </span>
                    <p className="text-base md:text-lg opacity-80 mt-0.5">
                      {detail.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="animate-text flex flex-wrap gap-4 pt-4 sm:pt-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-foreground text-background rounded-4xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Register Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-foreground/20 rounded-4xl font-semibold hover:border-foreground/40 transition-all duration-300"
              >
                Know More
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
