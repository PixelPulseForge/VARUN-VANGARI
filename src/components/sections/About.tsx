"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Band, Column } from "@/components/ui/Band";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutParagraphs } from "@/lib/data";

/**
 * Scoped styles.
 *
 * - Focus-in reveal ("text loading" effect): when a paragraph scrolls into
 *   view it fades in from a soft blur while sliding up a few pixels, then a
 *   single light sweep passes across the text left to right, like it just
 *   finished loading. The text is always real, selectable DOM text, so
 *   there is no skeleton and no layout shift.
 * - Fail-safe: a CSS fallback forces the text visible after 2s, so it is never
 *   stuck hidden if JS or the observer fails.
 * - Reading focus (hover devices only): while hovering a paragraph, the others
 *   dim slightly.
 * - Reduced motion: final state immediately, no blur, movement, sweep or dimming.
 */
const ABOUT_CSS = `
@keyframes ab-safe {
  to { opacity: 1; transform: none; filter: none; }
}

.ab-r {
  opacity: 0;
  transform: translate3d(0, 10px, 0);
  filter: blur(3px);
  transition:
    opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) var(--ab-d, 0ms),
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1) var(--ab-d, 0ms),
    filter 700ms cubic-bezier(0.22, 1, 0.36, 1) var(--ab-d, 0ms);
  animation: ab-safe 1ms linear 2s forwards;
}
.ab-r.ab-in {
  opacity: 1;
  transform: none;
  filter: none;
}

.ab-p {
  transition: opacity 300ms ease;
}

/* One-time light sweep across the text once it has been revealed.
   Both ends of the gradient are currentColor, so the resting state looks
   identical to normal text. Only applied where background-clip: text works. */
@supports ((-webkit-background-clip: text) or (background-clip: text)) {
  @keyframes ab-sweep {
    from {
      background-image: linear-gradient(
        100deg,
        currentColor 0%,
        currentColor 44%,
        #fff 50%,
        currentColor 56%,
        currentColor 100%
      );
      background-size: 300% 100%;
      background-position: 100% 0;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    to {
      background-image: linear-gradient(
        100deg,
        currentColor 0%,
        currentColor 44%,
        #fff 50%,
        currentColor 56%,
        currentColor 100%
      );
      background-size: 300% 100%;
      background-position: 0% 0;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .ab-in .ab-p {
    animation: ab-sweep 1400ms cubic-bezier(0.4, 0, 0.2, 1)
      calc(var(--ab-d, 0ms) + 250ms) backwards;
  }
}

@media (hover: hover) {
  .ab-list:has(.ab-p:hover) .ab-p:not(:hover) {
    opacity: 0.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ab-r {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
    animation: none;
  }
  .ab-in .ab-p {
    animation: none;
  }
  .ab-p {
    transition: none;
  }
  .ab-list:has(.ab-p:hover) .ab-p:not(:hover) {
    opacity: 1;
  }
}
`;

type ParagraphProps = {
  text: string;
  index: number;
};

/** Reveals once, the first time the paragraph scrolls into view. */
function RevealParagraph({ text, index }: ParagraphProps) {
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
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Only the first few paragraphs (likely visible together on load) stagger;
  // later ones reveal immediately when scrolled into view.
  const delay = index < 3 ? index * 90 : 0;

  return (
    <div
      ref={ref}
      className={`ab-r ${shown ? "ab-in" : ""}`}
      style={{ "--ab-d": `${delay}ms` } as CSSProperties}
    >
      <p className="ab-p mb-[15px] text-[13.6px] leading-[22px] text-body selection:bg-white/15 selection:text-white">
        {text}
      </p>
    </div>
  );
}

export function About() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ABOUT_CSS }} />

      <SectionHeading>About</SectionHeading>
      <Band>
        <Column className="ab-list px-3.5 pt-[14px]">
          {aboutParagraphs.map((p, i) => (
            <RevealParagraph key={p} text={p} index={i} />
          ))}
        </Column>
      </Band>
    </>
  );
}