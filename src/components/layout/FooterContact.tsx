"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { ArrowRight } from "lucide-react";
import { Band, Column } from "@/components/ui/Band";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { contact } from "@/lib/data";

/**
 * Scoped styles (opacity / transform / background-size only).
 *
 * - Scroll reveal: each side of the contact block reveals once when it scrolls
 *   into view (title, subtitle and CTA in sequence; blurb, avatars and the
 *   "inquired" text in sequence). Avatars pop in one by one. A CSS fail-safe
 *   forces everything visible after 2s if JS or the observer fails.
 * - CTA: the label gets an underline that draws in, the arrow slides forward,
 *   and keyboard focus shows a clear outline. Hover effects only run on
 *   devices that can hover.
 * - Avatars: shimmer skeleton until each image has loaded.
 * - Reduced motion: final state immediately, no movement or shimmer.
 */
const CONTACT_CSS = `
@keyframes cf-safe {
  to { opacity: 1; transform: none; }
}
@keyframes cf-shimmer {
  100% { transform: translateX(100%); }
}

/* Scroll reveal */
.cf-r {
  opacity: 0;
  transform: translate3d(0, 8px, 0);
  transition:
    opacity 650ms cubic-bezier(0.22, 1, 0.36, 1) var(--cf-d, 0ms),
    transform 650ms cubic-bezier(0.22, 1, 0.36, 1) var(--cf-d, 0ms);
  animation: cf-safe 1ms linear 2s forwards;
}
.cf-pop {
  transform: scale(0.6);
}
.cf-in .cf-r {
  opacity: 1;
  transform: none;
}

/* CTA */
.cf-cta {
  outline: none;
}
.cf-cta:focus-visible {
  outline: 1px solid rgba(255, 255, 255, 0.4);
  outline-offset: 4px;
  border-radius: 4px;
}
.cf-ul {
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 0% 1px;
  transition: background-size 300ms cubic-bezier(0.22, 1, 0.36, 1);
}
.cf-arrow {
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

@media (hover: hover) {
  .cf-cta:hover .cf-ul {
    background-size: 100% 1px;
  }
  .cf-cta:hover .cf-arrow {
    transform: translateX(3px);
  }
}
.cf-cta:focus-visible .cf-ul {
  background-size: 100% 1px;
}
.cf-cta:focus-visible .cf-arrow {
  transform: translateX(3px);
}
.cf-cta:active .cf-arrow {
  transform: translateX(1px);
  transition-duration: 120ms;
}

/* Avatar skeleton */
.cf-skeleton {
  overflow: hidden;
}
.cf-skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: cf-shimmer 1.4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .cf-r {
    opacity: 1;
    transform: none;
    transition: none;
    animation: none;
  }
  .cf-ul,
  .cf-arrow {
    transition: none;
  }
  .cf-cta:hover .cf-arrow,
  .cf-cta:focus-visible .cf-arrow,
  .cf-cta:active .cf-arrow {
    transform: none;
  }
  .cf-skeleton::after {
    animation: none;
  }
}
`;

/** Flips to `shown` once, the first time the element scrolls into view. */
function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
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
      { threshold: 0.3, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

/** Tracks when the <img> rendered inside the wrapper has finished loading. */
function useImageLoaded<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = ref.current?.querySelector("img");

    // No <img> found (e.g. placeholder slot): don't leave the skeleton forever.
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

/** Light tap feedback on touch devices that support vibration. */
function hapticTap(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "touch") return;
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try {
    navigator.vibrate(8);
  } catch {
    /* vibration unsupported or blocked: ignore */
  }
}

const delay = (ms: number): CSSProperties =>
  ({ "--cf-d": `${ms}ms` }) as CSSProperties;

function Avatar({ src, index }: { src: string | null | undefined; index: number }) {
  const { ref, loaded } = useImageLoaded<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className="cf-r cf-pop relative size-5 shrink-0"
      style={delay(150 + index * 50)}
    >
      <AssetSlot
        name={`contact-avatar-${index + 1}`}
        src={src}
        alt=""
        className={`size-5 rounded-full border border-white/10 bg-chip transition-opacity duration-500 ease-out motion-reduce:transition-none ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <span
        aria-hidden="true"
        className={`cf-skeleton pointer-events-none absolute inset-0 rounded-full bg-chip transition-opacity duration-500 ease-out ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
    </li>
  );
}

export function FooterContact() {
  const left = useRevealOnce<HTMLDivElement>();
  const right = useRevealOnce<HTMLDivElement>();

  const cta = (
    <>
      <span className="cf-ul">{contact.cta}</span>
      <ArrowRight size={14} className="cf-arrow" aria-hidden="true" />
    </>
  );
  const ctaCls =
    "cf-cta cf-r mt-3.5 flex h-5 items-center gap-2.5 font-sans text-[13px] font-medium";

  return (
    <Band>
      <style dangerouslySetInnerHTML={{ __html: CONTACT_CSS }} />

      <Column className="flex flex-col justify-between gap-6 px-[15px] pb-7 pt-[44px] font-sans sm:flex-row">
        <div ref={left.ref} className={left.shown ? "cf-in" : undefined}>
          <h2
            className="cf-r text-[15px] font-medium leading-[22px]"
            style={delay(0)}
          >
            {contact.title}
          </h2>
          <p
            className="cf-r text-xs leading-[18px] text-muted"
            style={delay(70)}
          >
            {contact.subtitle}
          </p>
          {contact.ctaHref ? (
            <a
              href={contact.ctaHref}
              onPointerDown={hapticTap}
              className={ctaCls}
              style={delay(140)}
            >
              {cta}
            </a>
          ) : (
            <button
              type="button"
              onPointerDown={hapticTap}
              className={ctaCls}
              style={delay(140)}
            >
              {cta}
            </button>
          )}
        </div>

        <div
          ref={right.ref}
          className={`max-w-[292px] sm:text-right ${right.shown ? "cf-in" : ""}`}
        >
          <p
            className="cf-r text-xs leading-[18px] text-muted"
            style={delay(80)}
          >
            {contact.blurb}
          </p>
          <div className="mt-[9px] flex items-center gap-3 sm:justify-end">
            <ul className="flex gap-1.5" aria-hidden="true">
              {contact.avatars.map((src, i) => (
                <Avatar key={i} src={src} index={i} />
              ))}
            </ul>
            <span
              className="cf-r text-xs text-muted"
              style={delay(150 + contact.avatars.length * 50)}
            >
              {contact.inquired}
            </span>
          </div>
        </div>
      </Column>
    </Band>
  );
}