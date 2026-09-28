"use client";

import AboutSection from "@/components/AboutSection";
import Cards from "@/components/Cards";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import SplitStatsWall from "@/components/SplitStatsWall";
import { Skiper28 } from "@/components/ui/skiper-ui/skiper28";
import UpcomingEvent from "@/components/UpcomingEvent";
import Sponsors from "@/components/Sponsors";
import { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type Event } from "@/lib/types";

interface HomeClientProps {
  initialEvent?: Event | null;
}

export default function HomeClient({ initialEvent }: HomeClientProps) {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");
    if (hasSeenPreloader) {
      setShowPreloader(false);
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        window.dispatchEvent(new Event("resize"));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("hasSeenPreloader", "true");
    setShowPreloader(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event("resize"));
    }, 100);
  };

  return (
    <div className="relative">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div
        className={
          showPreloader
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500 bg-white dark:bg-black"
        }
      >
        <Navbar isReady={!showPreloader} />
        <Hero isReady={!showPreloader} />
        <UpcomingEvent initialEvent={initialEvent} />
        <SplitStatsWall />
        <AboutSection />
        <Sponsors />
        <Cards />
        <Skiper28 />
      </div>
    </div>
  );
}
