"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import StaggeredMenu from "./StaggeredMenu";
import { ThemeToggleButton } from "./ui/skiper-ui/skiper26";

const Navbar = () => {
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
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
  ];

  const socialItems = [
    { label: "Instagram", link: "https://instagram.com/hackshastra" },
    { label: "LinkedIn", link: "https://linkedin.com/company/hackshastraa" },
    { label: "Email", link: "mailto:collab@hackshastra.in" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-20 flex items-center px-4 sm:px-6 z-50 transition-transform duration-500`}
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
    </nav>
  );
};

export default Navbar;
