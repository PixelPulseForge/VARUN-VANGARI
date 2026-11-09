"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Briefcase,
  MapPin,
  Mail,
  Mars,
  Code,
  Phone,
  Globe,
  type LucideIcon,
} from "lucide-react";

import { Band, Column } from "@/components/ui/Band";
import { infoLeft, infoRight } from "@/lib/data";
import type { InfoIcon, InfoItem } from "@/types";

const icons: Record<InfoIcon, LucideIcon> = {
  briefcase: Briefcase,
  pin: MapPin,
  mail: Mail,
  gender: Mars,
  code: Code,
  phone: Phone,
  globe: Globe,
};

/**
 * Scoped reveal styles (transform + opacity only).
 *
 * Fail-safe: content starts hidden, but a delayed CSS animation forces it
 * visible after 2s, so text never stays hidden if JS or the observer fails.
 * Reduced-motion users get the final state immediately.
 */
const REVEAL_CSS = `
@keyframes ig-safe {
  to { opacity: 1; transform: none; }
}
.ig-r {
  opacity: 0;
  transform: translate3d(0, 8px, 0);
  transition:
    opacity 650ms cubic-bezier(0.22, 1, 0.36, 1) var(--ig-d, 0ms),
    transform 650ms cubic-bezier(0.22, 1, 0.36, 1) var(--ig-d, 0ms);
  animation: ig-safe 1ms linear 2s forwards;
}
.ig-in .ig-r {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .ig-r {
    opacity: 1;
    transform: none;
    transition: none;
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
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

function RevealList({ children }: { children: ReactNode }) {
  const { ref, shown } = useRevealOnce<HTMLUListElement>();

  return (
    <ul
      ref={ref}
      className={`flex min-w-0 flex-col divide-y divide-white/[0.06] sm:divide-y-0 ${
        shown ? "ig-in" : ""
      }`}
    >
      {children}
    </ul>
  );
}

type RowProps = {
  item: InfoItem;
  index: number;
  side: "left" | "right";
};

function Row({ item, index, side }: RowProps) {
  const Icon = icons[item.icon];
  const hasCompany = Boolean(item.strong);
  const isLink = Boolean(item.href);

  // Rows stagger down the list; the right column trails the left slightly.
  const base = index * 70 + (side === "right" ? 40 : 0);
  const delay = (offset: number): CSSProperties =>
    ({ "--ig-d": `${base + offset}ms` }) as CSSProperties;

  // Link-only hover affordances: color shift + animated underline.
  const linkColor = isLink
    ? "transition-colors duration-300 [@media(hover:hover)]:group-hover/link:text-white"
    : "";
  const underline = isLink
    ? "box-decoration-clone bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat transition-[background-size,color] duration-300 ease-out [@media(hover:hover)]:group-hover/link:bg-[length:100%_1px]"
    : "";

  const content = (
    <span className="flex min-w-0 flex-col gap-0.5">
      {hasCompany ? (
        <>
          <span
            className="ig-r block break-words text-[13px] leading-[18px] text-body sm:text-[13.6px]"
            style={delay(60)}
          >
            <span className={`${linkColor} ${underline}`}>
              {item.text.replace(/\s*@\s*$/, "")}
            </span>
          </span>

          <strong
            className="ig-r block break-words text-[13px] font-semibold leading-[18px] text-white sm:text-[13.6px]"
            style={delay(120)}
          >
            @ {item.strong}
          </strong>
        </>
      ) : (
        <span
          className="ig-r block break-all text-[13px] leading-[20px] text-body sm:break-words sm:text-[13.6px]"
          style={delay(60)}
        >
          <span className={`${linkColor} ${underline}`}>{item.text}</span>
        </span>
      )}
    </span>
  );

  return (
    <li className="group/row grid min-w-0 grid-cols-[24px_minmax(0,1fr)] items-center gap-3 py-2">
      {/* Icon */}
      <span className="ig-r flex size-[24px] shrink-0" style={delay(0)}>
        <span
          className={`flex size-[24px] shrink-0 items-center justify-center rounded-md border border-white/10 bg-chip text-muted transition-colors duration-300 ${
            isLink
              ? "[@media(hover:hover)]:group-hover/row:border-white/25 [@media(hover:hover)]:group-hover/row:text-white"
              : ""
          }`}
        >
          <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </span>

      {/* Information */}
      {item.href ? (
        <a
          href={item.href}
          className="group/link block min-w-0 rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-white/40"
        >
          {content}
        </a>
      ) : (
        <span className="block min-w-0">{content}</span>
      )}
    </li>
  );
}

export function InfoGrid() {
  return (
    <Band>
      <style dangerouslySetInnerHTML={{ __html: REVEAL_CSS }} />

      <Column className="grid grid-cols-1 gap-y-1 px-3.5 py-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-0 sm:py-4">
        {/* Left Column */}
        <RevealList>
          {infoLeft.map((item, i) => (
            <Row key={item.text} item={item} index={i} side="left" />
          ))}
        </RevealList>

        {/* Right Column */}
        <RevealList>
          {infoRight.map((item, i) => (
            <Row key={item.text} item={item} index={i} side="right" />
          ))}
        </RevealList>
      </Column>
    </Band>
  );
}