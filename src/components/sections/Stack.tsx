"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Band, Column } from "@/components/ui/Band";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stack } from "@/lib/stack";

/**
 * Scoped styles (opacity / transform / filter only).
 *
 * - Scroll reveal: icons pop in with a short stagger the first time the list
 *   scrolls into view. A CSS fail-safe forces them visible after 2s, so they
 *   are never stuck hidden if JS or the observer fails.
 * - Hover (hover devices only): the icon lifts and scales with a soft glow in
 *   its own brand colour, while the other icons dim slightly (spotlight).
 * - Press: the icon dips slightly on click or tap.
 * - Placeholders (no icon yet) get a slow shimmer skeleton.
 * - Reduced motion: final state immediately, no movement, glow or shimmer.
 */
const STACK_CSS = `
@keyframes st-safe {
  to { opacity: 1; transform: none; }
}
@keyframes st-shimmer {
  100% { transform: translateX(100%); }
}

/* Scroll reveal */
.st-r {
  opacity: 0;
  transform: translate3d(0, 6px, 0) scale(0.8);
  transition:
    opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) var(--st-d, 0ms),
    transform 500ms cubic-bezier(0.22, 1, 0.36, 1) var(--st-d, 0ms);
  animation: st-safe 1ms linear 2s forwards;
}
.st-in .st-r {
  opacity: 1;
  transform: none;
}

/* Hover layer (separate element so it never fights the reveal transition) */
.st-i {
  transition:
    transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1),
    filter 320ms ease,
    opacity 300ms ease;
  will-change: transform;
}

@media (hover: hover) {
  .st-i:hover {
    transform: translateY(-3px) scale(1.18);
    filter: drop-shadow(
      0 6px 8px color-mix(in srgb, var(--st-glow, #ffffff) 45%, transparent)
    );
  }
  .st-list:has(.st-i:hover) .st-i:not(:hover) {
    opacity: 0.5;
  }
}
.st-i:active {
  transform: scale(0.94);
  transition-duration: 120ms;
}

/* Skeleton shimmer for placeholder slots */
.st-skeleton {
  position: relative;
  overflow: hidden;
}
.st-skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.08),
    transparent
  );
  animation: st-shimmer 1.8s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .st-r {
    opacity: 1;
    transform: none;
    transition: none;
    animation: none;
  }
  .st-i {
    transition: none;
  }
  .st-i:hover,
  .st-i:active {
    transform: none;
    filter: none;
  }
  .st-list:has(.st-i:hover) .st-i:not(:hover) {
    opacity: 1;
  }
  .st-skeleton::after {
    animation: none;
  }
}
`;

/** Adds `st-in` once, the first time the list scrolls into view. */
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
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

export function Stack() {
  const { ref, shown } = useRevealOnce<HTMLUListElement>();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STACK_CSS }} />

      <SectionHeading>Stack</SectionHeading>
      <Band>
        <Column className="px-3.5 pb-3.5 pt-4">
          <ul
            ref={ref}
            className={`st-list flex flex-wrap gap-4 ${shown ? "st-in" : ""}`}
          >
            {stack.map(({ name, Icon, color }, i) => {
              // Short stagger, capped so long lists don't feel slow.
              const delay = Math.min(i * 35, 600);
              const itemStyle = {
                "--st-d": `${delay}ms`,
              } as CSSProperties;
              const glowStyle = color
                ? ({ "--st-glow": color } as CSSProperties)
                : undefined;

              return (
                <li
                  key={i}
                  className="st-r flex size-7 items-center justify-center"
                  style={itemStyle}
                  title={name ?? undefined}
                >
                  {Icon ? (
                    <span
                      className="st-i flex size-7 items-center justify-center"
                      style={glowStyle}
                    >
                      <Icon
                        size={28}
                        color={color}
                        role="img"
                        aria-label={name ?? undefined}
                      />
                    </span>
                  ) : (
                    <span className="st-skeleton flex size-7 rounded-md bg-chip">
                      <AssetSlot
                        name={`stack-${i + 1}`}
                        src={null}
                        alt=""
                        className="size-7"
                      />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </Column>
      </Band>
    </>
  );
}