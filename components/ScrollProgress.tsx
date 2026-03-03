"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollProgress() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || pathname === "/gallery") return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#0DA5F0] dark:bg-[#FA0001] origin-left z-[9999] hidden md:block"
      style={{ scaleX }}
    />
  );
}
