"use client";
import AboutSection from "@/components/AboutSection";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import UpcomingEvent from "@/components/UpcomingEvent";
// import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39";
import { useState } from "react";

const Page = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <div className="relative">
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}
      <div
        className={
          showPreloader
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        <Navbar />
        <Hero />
        <UpcomingEvent />
        <AboutSection />
      </div>
    </div>
  );
};

export default Page;

{
  /* <CrowdCanvas src="all-peeps.png" rows={15} cols={7} /> */
}
