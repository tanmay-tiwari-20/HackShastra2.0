"use client";
import FuzzyText from "@/components/FuzzyText";
import Navbar from "@/components/Navbar";

const Page = () => {
  const hoverIntensity = 0.5;

  return (
    <div className="relative">
      <Navbar isReady={true} />
      <div className="flex items-center justify-center h-screen text-[#0DA5F0]">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={hoverIntensity}
          enableHover={true}
        >
          Oops! Something went wrong
        </FuzzyText>
      </div>
    </div>
  );
};

export default Page;
