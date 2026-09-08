"use client";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import StaggeredMenu from "./StaggeredMenu";
import { ThemeToggleButton } from "./ui/skiper-ui/skiper26";

const Navbar = ({ isReady = true }: { isReady?: boolean }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
    lastScrollYRef.current = window.scrollY;
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollYRef.current;
    const diff = latest - previous;

    // Small movement threshold to prevent flickering
    if (Math.abs(diff) < 8) return;

    if (!hasScrolled) {
      setHasScrolled(true);
    }

    // Check if near bottom of page (avoid bounce/overscroll glitches)
    if (typeof document !== "undefined") {
      const isBottom =
        window.innerHeight + latest >=
        document.documentElement.scrollHeight - 20;
      if (isBottom) {
        lastScrollYRef.current = latest;
        return;
      }
    }

    if (latest <= 50) {
      // Near top: always show navbar
      setIsVisible(true);
    } else if (diff > 0) {
      // Scrolling down: hide navbar
      setIsVisible(false);
    } else if (diff < 0) {
      // Scrolling up: show navbar
      setIsVisible(true);
    }

    lastScrollYRef.current = latest > 0 ? latest : 0;
  });

  if (!mounted) return null;

  const logo = theme === "light" ? "/logo2.svg" : "/logo1.svg";

  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about us", link: "/about" },
    { label: "Events", ariaLabel: "View our events", link: "/events" },
    { label: "Gallery", ariaLabel: "Gallery of our events", link: "/gallery" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
  ];

  const socialItems = [
    { label: "Instagram", link: "https://instagram.com/hackshastra" },
    { label: "LinkedIn", link: "https://linkedin.com/company/hackshastraa" },
    { label: "Email", link: "mailto:thehackshastra@gmail.com" },
  ];

  const isNavbarShown = isReady && (isVisible || isMenuOpen);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={
        isNavbarShown
          ? { y: 0, opacity: 1 }
          : { y: -100, opacity: 0 }
      }
      transition={{
        duration: hasScrolled ? 0.35 : 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: hasScrolled ? 0 : 0.1,
      }}
      className={`fixed top-0 left-0 w-full h-20 flex items-center px-4 sm:px-6 z-50 ${
        isNavbarShown ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="w-full">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering
          menuButtonColor={theme === "light" ? "#000" : "#fff"}
          openMenuButtonColor={theme === "light" ? "#000" : "#fff"}
          changeMenuColorOnOpen
          colors={["#F90101", "#0DA5F0"]}
          logoUrl={logo}
          accentColor="#F90101"
          isFixed={true}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
          headerActions={<ThemeToggleButton variant="circle" start="center" />}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
