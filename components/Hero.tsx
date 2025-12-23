"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

const Hero = () => {
  const { resolvedTheme } = useTheme();

  // Light/Dark Alternate Logo
  const logo = resolvedTheme === "dark" ? "/logo1.svg" : "/logo2.svg";

  return (
    <section className="text-center mt-40 px-4">
      {/* LOGO */}
      <div className="mx-auto w-24 sm:w-32 md:w-40">
        <Image
          src={logo}
          alt="Hackshastra Logo"
          width={160}
          height={160}
          className="w-full object-contain select-none"
          draggable={false}
        />
      </div>

      {/* TITLE */}
      <h1
        className="
    text-4xl sm:text-5xl md:text-7xl lg:text-9xl 
    font-bold tracking-wider mt-6
    text-transparent bg-clip-text 
    animate-gradient
    bg-size-[200%_200%]
    bg-linear-to-r 
    dark:from-[#ff2e2e] dark:via-[#990000] dark:to-[#ff2e2e]
    from-[#0DA5F0] via-[#0055AA] to-[#0DA5F0]
  "
      >
        HACKSHASTRA
      </h1>

      {/* SUBTITLE */}
      <p
        className="
        text-base sm:text-lg md:text-xl mt-6 max-w-2xl mx-auto 
        text-black dark:text-white 
        transition-colors duration-300
      "
      >
        Code Like a God, Innovate Like a Sage, and Conquer Challenges — Unleash
        Your Divine Potential
      </p>

      {/* BUTTON */}
      <a
        href="https://unstop.com/hackathons/snowhackipec-hackshastra-1613746"
        target="_blank"
        className="
          group inline-flex items-center mt-6 gap-2
          px-5 md:px-6 py-2 md:py-3 
         dark:bg-[#FA0001] dark:hover:bg-[#FA0001]/90 
          bg-[#0DA5F0] hover:bg-[#0DA5F0]/90
          transition rounded-full text-white font-semibold 
          text-base md:text-lg shadow-lg 
          hover:scale-105 duration-300
        "
      >
        Register Now on
        <Image
          src="/unstop-white.png"
          alt="Unstop"
          width={80}
          height={40}
          className="w-16 h-auto object-contain"
        />
      </a>
    </section>
  );
};

export default Hero;
