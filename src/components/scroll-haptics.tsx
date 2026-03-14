"use client";

import { useEffect, useRef } from "react";

import { haptics } from "@/lib/haptics";

const SCROLL_MILESTONE_PX = 400;

export function ScrollHaptics() {
  const lastMilestone = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const milestone = Math.floor(current / SCROLL_MILESTONE_PX);
      if (milestone !== lastMilestone.current) {
        lastMilestone.current = milestone;
        haptics.light();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
