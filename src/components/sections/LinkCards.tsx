"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiDailydotdev } from "react-icons/si";
import { Band, Column } from "@/components/ui/Band";
import { links } from "@/lib/data";
import type { LinkId, LinkItem } from "@/types";

const tiles: Record<LinkId, { cls: string; glow: string; icon: ReactNode }> = {
  linkedin: {
    cls: "bg-[#0a66c2]",
    glow: "rgba(10, 102, 194, 0.55)",
    icon: <FaLinkedinIn size={26} aria-hidden="true" />,
  },
  github: {
    cls: "border border-white/10 bg-[#0d1117]",
    glow: "rgba(255, 255, 255, 0.16)",
    icon: <FaGithub size={30} aria-hidden="true" />,
  },
  x: {
    cls: "border border-white/10 bg-black",
    glow: "rgba(255, 255, 255, 0.16)",
    icon: <FaXTwitter size={24} aria-hidden="true" />,
  },
  dailydev: {
    cls: "border border-white/10 bg-[#0e1217]",
    glow: "rgba(255, 255, 255, 0.16)",
    icon: <SiDailydotdev size={26} aria-hidden="true" />,
  },
};

const LINK_CARDS_CSS = `
@keyframes lc-safe {
  to { opacity: 1; transform: none; }
}

/* Scroll reveal */
.lc-r {
  opacity: 0;
  transform: translate3d(0, 8px, 0);
  transition:
    opacity 650ms cubic-bezier(0.22, 1, 0.36, 1) var(--lc-d, 0ms),
    transform 650ms cubic-bezier(0.22, 1, 0.36, 1) var(--lc-d, 0ms);
  animation: lc-safe 1ms linear 2s forwards;
}
.lc-in .lc-r {
  opacity: 1;
  transform: none;
}

/* Tile + arrow micro-interactions */
.lc-tile {
  transition:
    transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 350ms ease;
  will-change: transform;
}
.lc-arrow {
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), color 300ms ease;
}

@media (hover: hover) {
  .lc-card:hover .lc-tile {
    transform: translateY(-2px) scale(1.06) rotate(-3deg);
    box-shadow: 0 10px 22px -8px var(--lc-glow, rgba(255, 255, 255, 0.16));
  }
  .lc-card:hover .lc-arrow {
    transform: translate3d(2px, -2px, 0);
    color: #fff;
  }
}

/* Keyboard focus mirrors hover */
.lc-card:focus-visible .lc-tile {
  transform: translateY(-2px) scale(1.06) rotate(-3deg);
  box-shadow: 0 10px 22px -8px var(--lc-glow, rgba(255, 255, 255, 0.16));
}
.lc-card:focus-visible .lc-arrow {
  transform: translate3d(2px, -2px, 0);
  color: #fff;
}

/* Press feedback */
.lc-card:active .lc-tile {
  transform: scale(0.94);
  box-shadow: none;
  transition-duration: 120ms;
}

@media (prefers-reduced-motion: reduce) {
  .lc-r {
    opacity: 1;
    transform: none;
    transition: none;
    animation: none;
  }
  .lc-tile,
  .lc-arrow {
    transition: none;
  }
  .lc-card:hover .lc-tile,
  .lc-card:focus-visible .lc-tile,
  .lc-card:active .lc-tile,
  .lc-card:hover .lc-arrow,
  .lc-card:focus-visible .lc-arrow {
    transform: none;
  }
}
`;

/** Adds `lc-in` to the element once, the first time it scrolls into view. */
function RevealRow({ children }: { children: ReactNode }) {
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
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={shown ? "lc-in" : undefined}>{children}</div>;
}

/** Light tap feedback on touch devices that support vibration. */
function hapticTap(e: PointerEvent<HTMLAnchorElement>) {
  if (e.pointerType !== "touch") return;
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try {
    navigator.vibrate(8);
  } catch {
    /* vibration unsupported or blocked: ignore */
  }
}

type CardProps = {
  item: LinkItem;
  side: "l" | "r";
  /** Stagger offset in ms, derived from the card's position. */
  baseDelay: number;
};

function Card({ item, side, baseDelay }: CardProps) {
  const t = tiles[item.id];
  const delay = (offset: number): CSSProperties =>
    ({ "--lc-d": `${baseDelay + offset}ms` }) as CSSProperties;

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={hapticTap}
      className={`lc-card flex h-[72px] items-center gap-4 px-3.5 font-sans outline-none transition-colors duration-300 focus-visible:bg-white/[0.04] focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/40 [@media(hover:hover)]:hover:bg-white/[0.025] ${
        side === "l" ? "sm:border-r sm:border-line" : "sm:border-l sm:border-line"
      }`}
    >
      {/* Brand tile */}
      <span className="lc-r flex shrink-0" style={delay(0)}>
        <span
          className={`lc-tile flex size-11 shrink-0 items-center justify-center rounded-[10px] text-white ${t.cls}`}
          style={{ "--lc-glow": t.glow } as CSSProperties}
        >
          {t.icon}
        </span>
      </span>

      {/* Label + handle */}
      <span className="min-w-0 flex-1">
        <span
          className="lc-r block truncate text-[15px] font-medium leading-5"
          style={delay(70)}
        >
          {item.label}
        </span>
        <span
          className="lc-r block truncate text-[13px] leading-5 text-muted"
          style={delay(130)}
        >
          {item.handle}
        </span>
      </span>

      {/* Arrow */}
      <span className="lc-r flex shrink-0" style={delay(180)}>
        <ArrowUpRight
          size={13}
          className="lc-arrow shrink-0 text-muted"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}

export function LinkCards() {
  const rows: LinkItem[][] = [];
  for (let i = 0; i < links.length; i += 2) rows.push(links.slice(i, i + 2));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LINK_CARDS_CSS }} />

      {rows.map((row, i) => (
        <RevealRow key={i}>
          {i > 0 && (
            <Band className="h-4">
              <Column />
            </Band>
          )}
          <Band>
            <Column className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              {row.map((l, j) => (
                <Card
                  key={l.id}
                  item={l}
                  side={j === 0 ? "l" : "r"}
                  baseDelay={j * 60}
                />
              ))}
            </Column>
          </Band>
        </RevealRow>
      ))}
    </>
  );
}