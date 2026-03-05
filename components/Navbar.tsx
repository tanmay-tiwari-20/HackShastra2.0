"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StaggeredMenu from "./StaggeredMenu";
import { ThemeToggleButton } from "./ui/skiper-ui/skiper26";

const Navbar = ({ isReady = false }: { isReady?: boolean }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
  }, []);

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

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={isReady ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed top-0 left-0 w-full h-20 flex items-center px-4 sm:px-6 z-50"
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
          headerActions={<ThemeToggleButton variant="circle" start="center" />}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
