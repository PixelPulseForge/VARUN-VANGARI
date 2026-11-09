"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { BadgeCheck } from "lucide-react";
import { Band, Column } from "@/components/ui/Band";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { assets, profile } from "@/lib/data";

const ANIMATION_CSS = `
@keyframes ph-rise {
  from { opacity: 0; transform: translate3d(0, 10px, 0); }
  to   { opacity: 1; transform: none; }
}

@keyframes ph-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes ph-pop {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: none; }
}

@keyframes ph-drop {
  0% {
    opacity: 0;
    transform: translate3d(-6px, -8px, 0) rotate(-8deg) scale(0.9);
  }
  70% {
    opacity: 1;
    transform: translate3d(0, 1px, 0) rotate(1deg) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

@keyframes ph-badge {
  0% {
    opacity: 0;
    transform: scale(0.65);
  }
  65% {
    opacity: 1;
    transform: scale(1.08);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

@keyframes ph-shimmer {
  100% { transform: translateX(100%); }
}

/* Rotating title animation */
@keyframes ph-title-enter {
  from {
    opacity: 0;
    transform: translate3d(0, 12px, 0);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }
}

@keyframes ph-title-exit {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -10px, 0);
    filter: blur(4px);
  }
}

.ph-anim {
  opacity: 0;
  animation-duration: 600ms;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  animation-fill-mode: forwards;
  animation-delay: var(--ph-d, 0ms);
}

.ph-rise {
  animation-name: ph-rise;
}

.ph-fade {
  animation-name: ph-fade;
  animation-duration: 800ms;
}

.ph-pop {
  animation-name: ph-pop;
  animation-duration: 700ms;
}

.ph-drop {
  animation-name: ph-drop;
  animation-duration: 650ms;
}

.ph-badge {
  animation-name: ph-badge;
  animation-duration: 600ms;
}

.ph-skeleton {
  overflow: hidden;
}

.ph-skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgb(var(--ink) / 0.08),
    transparent
  );
  animation: ph-shimmer 1.4s ease-in-out infinite;
}

.ph-title-enter {
  animation: ph-title-enter 450ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.ph-title-exit {
  animation: ph-title-exit 250ms ease-in both;
}

@media (prefers-reduced-motion: reduce) {
  .ph-anim,
  .ph-title-enter,
  .ph-title-exit {
    opacity: 1;
    animation: none;
    filter: none;
    transform: none;
  }

  .ph-skeleton::after {
    animation: none;
  }
}
`;

/** Tracks when the image inside the wrapper has finished loading. */
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

type RevealProps = {
  className?: string;
  children: (loaded: boolean) => ReactNode;
};

/** Image wrapper with a shimmer loading skeleton. */
function Reveal({ className = "", children }: RevealProps) {
  const { ref, loaded } = useImageLoaded<HTMLDivElement>();

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children(loaded)}

      <div
        aria-hidden="true"
        className={`ph-skeleton pointer-events-none absolute inset-0 bg-chip transition-opacity duration-500 ease-out ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

const imageReveal = (loaded: boolean) =>
  `h-full w-full transition-[opacity,transform,filter] duration-700 ease-out motion-reduce:transition-none ${
    loaded
      ? "scale-100 opacity-100 blur-0"
      : "scale-110 opacity-0 blur-sm"
  }`;

/** Animated profile title. */
function AnimatedProfileTitle() {
  const titles = Array.isArray(profile.title)
    ? profile.title
    : [profile.title];

  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (titles.length <= 1) return;

    const interval = window.setInterval(() => {
      setVisible(false);

      const timeout = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % titles.length);
        setVisible(true);
      }, 250);

      return () => window.clearTimeout(timeout);
    }, 2500);

    return () => window.clearInterval(interval);
  }, [titles.length]);

  return (
    <p
      className="flex min-h-[26px] items-center overflow-hidden px-2 py-1 text-[11px] leading-tight text-faint transition-colors duration-300 sm:px-3 sm:text-[13.6px]"
      aria-live="polite"
    >
      <span
        key={activeIndex}
        className={
          visible
            ? "ph-title-enter inline-block"
            : "ph-title-exit inline-block"
        }
      >
        {titles[activeIndex]}
      </span>
    </p>
  );
}

export function ProfileHeader() {
  return (
    <Band className="min-h-[152px]">
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_CSS }} />

      <Column className="relative flex flex-row items-center gap-0">

        {/* Avatar Container */}
        <div
          className="ph-anim ph-pop group relative z-20 h-[110px] w-[110px] shrink-0 sm:h-[150px] sm:w-[150px]"
          style={{ "--ph-d": "0ms" } as React.CSSProperties}
        >
          {/* Profile Image */}
          <div className="absolute inset-0 overflow-hidden rounded-full border border-white/20 bg-chip transition-colors duration-300 [@media(hover:hover)]:group-hover:border-white/40">
            <Reveal className="h-full w-full">
              {(loaded) => (
                <div className="h-full w-full transition-transform duration-500 ease-out motion-reduce:transform-none [@media(hover:hover)]:group-hover:scale-[1.06]">
                  <AssetSlot
                    name="avatar"
                    src={assets.avatar}
                    alt={profile.accessibleName}
                    fit="cover"
                    priority
                    sizes="(max-width: 640px) 110px, 150px"
                    className={imageReveal(loaded)}
                  />
                </div>
              )}
            </Reveal>
          </div>

          {/* India Flag */}
          <div
            className="ph-anim ph-drop absolute left-0 top-0 z-50"
            style={{ "--ph-d": "350ms" } as React.CSSProperties}
          >
            <div className="h-[34px] w-[48px] overflow-hidden rounded-md border border-white/20 bg-transparent shadow-md transition-transform duration-300 ease-out motion-reduce:transform-none sm:h-[42px] sm:w-[58px] [@media(hover:hover)]:group-hover:-translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:-rotate-3">
              <Reveal className="h-full w-full">
                {(loaded) => (
                  <AssetSlot
                    name="flag"
                    src={assets.flag}
                    alt="India flag"
                    fit="contain"
                    sizes="58px"
                    className={imageReveal(loaded)}
                  />
                )}
              </Reveal>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="relative z-10 flex min-h-[110px] min-w-0 flex-1 flex-col justify-center border-l border-line sm:min-h-[150px]">

          {/* Background Pattern */}
          <div
            className="ph-anim ph-fade hatch min-h-[20px] flex-1"
            style={{ "--ph-d": "150ms" } as React.CSSProperties}
          />

          {/* Name and Verified Badge */}
          <div className="flex min-h-[42px] min-w-0 items-center gap-1 border-y border-line px-2 transition-colors duration-300 sm:gap-1.5 sm:px-3 [@media(hover:hover)]:hover:bg-white/[0.02]">

            {/* Profile Name */}
            <h1
              aria-label={profile.accessibleName}
              className="ph-anim ph-rise w-fit min-w-0 whitespace-normal break-words text-[clamp(14px,3.5vw,17px)] font-medium leading-tight sm:text-[22.4px]"
              style={{ "--ph-d": "250ms" } as React.CSSProperties}
            >
              <span aria-hidden="true">
                {profile.displayName}
              </span>
            </h1>

            {/* Verified Badge */}
            <span
              role="img"
              aria-label="Verified"
              className="ph-anim ph-badge group/badge relative inline-flex shrink-0 items-center justify-center border-0 outline-none"
              style={{ "--ph-d": "450ms" } as React.CSSProperties}
            >
              <BadgeCheck
                size={17}
                strokeWidth={2.5}
                aria-hidden="true"
                className="size-[15px] shrink-0 border-0 fill-verified text-bg drop-shadow-none transition-transform duration-300 ease-out motion-reduce:transform-none sm:size-[19px] [@media(hover:hover)]:group-hover/badge:scale-110"
              />
            </span>
          </div>

          {/* Animated Profile Title */}
          <AnimatedProfileTitle />

        </div>
      </Column>
    </Band>
  );
}