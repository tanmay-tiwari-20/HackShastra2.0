"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function DynamicFavicon() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    const iconUrl = isDark ? "/logo1.svg" : "/logo2.svg";

    // Update all matching favicon links or create one if none exists
    const existingIcons = document.querySelectorAll<HTMLLinkElement>(
      "link[rel='icon'], link[rel='shortcut icon']"
    );

    if (existingIcons.length > 0) {
      existingIcons.forEach((link) => {
        link.href = iconUrl;
        link.type = "image/svg+xml";
        // Remove media queries once client-side theme is active to avoid OS override
        link.removeAttribute("media");
      });
    } else {
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      link.href = iconUrl;
      document.head.appendChild(link);
    }
  }, [resolvedTheme]);

  return null;
}
