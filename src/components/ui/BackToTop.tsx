
"use client";

import { ArrowUp } from "lucide-react";
import { useScrolled } from "../hooks/useScrolled";

export function BackToTop() {
  const show = useScrolled(300);

  if (!show) return null;

  const onClick = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={onClick}
      className="fixed bottom-6 right-[37px] z-50 flex size-[38px] items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-muted hover:bg-white/[0.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    >
      <ArrowUp size={16} aria-hidden="true" />
    </button>
  );
}
