
"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialDark =
      savedTheme === "dark" ||
      (!savedTheme && prefersDark);

    setDark(initialDark);
    document.documentElement.classList.toggle(
      "dark",
      initialDark
    );

    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextDark = !dark;

    setDark(nextDark);

    document.documentElement.classList.toggle(
      "dark",
      nextDark
    );

    localStorage.setItem(
      "theme",
      nextDark ? "dark" : "light"
    );
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Loading theme"
        className="flex size-9 items-center justify-center rounded-lg border border-line bg-chip"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      aria-pressed={dark}
      className="group relative flex size-9 items-center justify-center overflow-hidden rounded-lg border border-line bg-chip text-foreground shadow-sm transition-all duration-300 hover:border-muted hover:shadow-md active:scale-90"
    >
      <span
        key={dark ? "sun" : "moon"}
        className="animate-theme-icon flex items-center justify-center"
      >
        {dark ? (
          <Sun size={17} />
        ) : (
          <Moon size={17} />
        )}
      </span>
    </button>
  );
}
