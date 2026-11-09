"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { Band, Column } from "@/components/ui/Band";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { FooterContact } from "@/components/layout/FooterContact";
import { assets, footerText, profile } from "@/lib/data";

const FOOTER_TITLES = [
  "Full Stack Developer",
  "UI / UX Designer",
  "Web Designer",
  "Web Developer",
];

const FOOTER_CSS = `
@keyframes ft-safe {
  to {
    opacity: 1;
    transform: none;
    filter: none;
  }
}

@keyframes ft-shimmer {
  100% {
    transform: translateX(100%);
  }
}

@keyframes ft-title-enter {
  from {
    opacity: 0;
    transform: translate3d(0, 9px, 0);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }
}

@keyframes ft-title-exit {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -7px, 0);
    filter: blur(4px);
  }
}

.ft-r {
  opacity: 0;
  transform: translate3d(0, 10px, 0);
  transition:
    opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) var(--ft-d, 0ms),
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1) var(--ft-d, 0ms),
    filter 700ms cubic-bezier(0.22, 1, 0.36, 1) var(--ft-d, 0ms);
  animation: ft-safe 1ms linear 2s forwards;
}

.ft-blur {
  filter: blur(3px);
}

.ft-in .ft-r {
  opacity: 1;
  transform: none;
  filter: none;
}

/* Animated footer title */
.ft-title-wrap {
  position: relative;
  display: grid;
  min-height: 20px;
  place-items: center;
  overflow: hidden;
}

.ft-title {
  grid-area: 1 / 1;
  display: block;
  white-space: nowrap;
  transition:
    color 300ms ease,
    text-shadow 300ms ease;
}

.ft-title-enter {
  animation: ft-title-enter 550ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.ft-title-exit {
  animation: ft-title-exit 350ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@media (hover: hover) {
  .ft-title-wrap:hover .ft-title {
    color: white;
    text-shadow: 0 0 14px rgba(255,255,255,0.16);
  }
}

/* Logo */
.ft-logo {
  transition:
    transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 500ms ease;
}

@media (hover: hover) {
  .ft-logo-wrap:hover .ft-logo {
    transform: scale(1.04);
    filter: brightness(1.08);
  }
}

.ft-skeleton {
  overflow: hidden;
}

.ft-skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.07),
    transparent
  );
  animation: ft-shimmer 1.6s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .ft-r {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
    animation: none;
  }

  .ft-logo {
    transition: none;
  }

  .ft-logo-wrap:hover .ft-logo {
    transform: none;
  }

  .ft-skeleton::after {
    animation: none;
  }

  .ft-title-enter,
  .ft-title-exit {
    animation: none;
  }
}
`;

/** Adds ft-in once when the block enters the viewport. */
function RevealBlock({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -4% 0px",
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={shown ? "ft-in" : undefined}>
      {children}
    </div>
  );
}

/** Tracks image loading. */
function useImageLoaded<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = ref.current?.querySelector("img");

    if (!img) {
      const timer = window.setTimeout(() => setLoaded(true), 1200);
      return () => window.clearTimeout(timer);
    }

    if (img.complete) {
      setLoaded(true);
      return undefined;
    }

    const done = () => setLoaded(true);

    img.addEventListener("load", done);
    img.addEventListener("error", done);

    return () => {
      img.removeEventListener("load", done);
      img.removeEventListener("error", done);
    };
  }, []);

  return { ref, loaded };
}

const delay = (ms: number): CSSProperties =>
  ({ "--ft-d": `${ms}ms` }) as CSSProperties;

/** Rotating footer title with smooth transitions. */
function AnimatedFooterTitle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % FOOTER_TITLES.length;

        setPreviousIndex(current);

        return next;
      });
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="ft-title-wrap font-sans text-[13px] leading-[20px] text-muted"
      aria-label={FOOTER_TITLES[activeIndex]}
    >
      {previousIndex !== null && (
        <span
          key={`old-${previousIndex}`}
          aria-hidden="true"
          className="ft-title ft-title-exit pointer-events-none"
        >
          {FOOTER_TITLES[previousIndex]}
        </span>
      )}

      <span
        key={activeIndex}
        aria-live="polite"
        aria-atomic="true"
        className="ft-title ft-title-enter"
      >
        {FOOTER_TITLES[activeIndex]}
      </span>
    </div>
  );
}

/** Footer logo with loading animation. */
function FooterLogo() {
  const { ref, loaded } = useImageLoaded<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="ft-logo-wrap relative h-[200px] w-[200px] shrink-0"
    >
      <div className="ft-logo h-full w-full">
        <AssetSlot
          name="footer-logo"
          src={assets.logo}
          alt="Logo"
          fit="contain"
          className={`h-full w-full transition-[opacity,filter] duration-700 ease-out motion-reduce:transition-none ${
            loaded
              ? "opacity-100 blur-0"
              : "opacity-0 blur-sm"
          }`}
        />
      </div>

      <div
        aria-hidden="true"
        className={`ft-skeleton pointer-events-none absolute inset-0 rounded-2xl bg-white/[0.03] transition-opacity duration-500 ease-out ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_CSS }} />

      {/* Footer Logo */}
      <RevealBlock>
        <Band>
          <Column className="dots flex justify-center pb-[3px] pt-1.5">
            <div className="ft-r" style={delay(0)}>
              <FooterLogo />
            </div>
          </Column>
        </Band>
      </RevealBlock>

      {/* Profile Information */}
      <RevealBlock>
        <Band>
          <Column className="dots flex h-[82px] flex-col items-center pt-9 text-center">

            {/* Profile Name */}
            <p
              className="ft-r ft-blur font-sans text-[23px] font-medium leading-7"
              style={delay(0)}
            >
              <span aria-hidden="true">
                {profile.displayName}
              </span>

              <span className="sr-only">
                {profile.accessibleName}
              </span>
            </p>

            {/* Animated Titles */}
            <div className="ft-r ft-blur" style={delay(120)}>
              <AnimatedFooterTitle />
            </div>

          </Column>
        </Band>
      </RevealBlock>

      {/* Decorative Spacing */}
      <Band className="h-7">
        <Column className="dots" />
      </Band>

      <Band hatch className="h-[30px]" />

      {/* Contact */}
      <FooterContact />

      {/* Copyright */}
      <RevealBlock>
        <Band>
          <Column className="flex h-12 items-center justify-between px-[15px] font-sans text-xs text-muted">
            <span className="ft-r" style={delay(0)}>
              {footerText.left}
            </span>

            <span className="ft-r" style={delay(100)}>
              {footerText.right}
            </span>
          </Column>
        </Band>
      </RevealBlock>
    </footer>
  );
}