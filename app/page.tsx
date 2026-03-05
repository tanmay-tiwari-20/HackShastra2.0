"use client";
import AboutSection from "@/components/AboutSection";
import Cards from "@/components/Cards";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import SplitStatsWall from "@/components/SplitStatsWall";
import { Skiper28 } from "@/components/ui/skiper-ui/skiper28";
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";
import UpcomingEvent from "@/components/UpcomingEvent";
import Sponsors from "@/components/Sponsors";
import { useState, useEffect } from "react";

const Page = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");
    if (hasSeenPreloader) {
      setShowPreloader(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("hasSeenPreloader", "true");
    setShowPreloader(false);
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
        <UpcomingEvent />
        <SplitStatsWall />
        <AboutSection />
        <Sponsors />
        <Cards />
        <Skiper28 />
        <CrowdCanvas src="all-peeps.png" rows={15} cols={7} />
      </div>
    </div>
  );
};

export default Page;
