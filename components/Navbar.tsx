"use client";

import { useTheme } from "next-themes";
import { useMemo } from "react";
import CardNav from "./CardNav";

import logoDark from "@/public/logodark.svg";
import logoLight from "@/public/logolight.svg";

const Navbar = () => {
  const { theme, resolvedTheme } = useTheme();

  // Use resolvedTheme (best for SSR safety)
  const activeTheme = theme === "system" ? resolvedTheme : theme;

  const currentLogo = activeTheme === "dark" ? logoDark : logoLight;

  const bgColor = activeTheme === "dark" ? "#F90101" : "#0DA5F0";

  const items = useMemo(
    () => [
      {
        label: "About",
        bgColor,
        textColor: "#fff",
        links: [
          { label: "Events", href: "/events", ariaLabel: "Events" },
          { label: "Team", href: "/team", ariaLabel: "Team" },
          { label: "Gallery", href: "/careers", ariaLabel: "About Careers" },
        ],
      },
      {
        label: "Chapters",
        bgColor,
        textColor: "#fff",
        links: [
          {
            label: "HackShastra IPEC",
            href: "/featured",
            ariaLabel: "Featured Projects",
          },
          {
            label: "HackShastra Khalsa College",
            href: "/case-studies",
            ariaLabel: "Case Studies",
          },
          {
            label: "Open HackShastra Chapter",
            href: "/case-studies",
            ariaLabel: "Case Studies",
          },
        ],
      },
      {
        label: "Contact",
        bgColor,
        textColor: "#fff",
        links: [
          { label: "Email", href: "/contact", ariaLabel: "Email Us" },
          {
            label: "Instagram",
            href: "https://instagram.com/hackshastra",
            ariaLabel: "Instagram",
          },
          {
            label: "LinkedIn",
            href: "https://linkedin.com/company/hackshastraa",
            ariaLabel: "LinkedIn",
          },
        ],
      },
    ],
    [bgColor]
  );

  // Return null only until theme is available
  if (!activeTheme) return null;

  return (
    <CardNav
      logo={currentLogo}
      logoAlt="HackShastra Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      ease="power3.out"
    />
  );
};

export default Navbar;
