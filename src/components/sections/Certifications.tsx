
"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { ArrowUpRight, IdCard } from "lucide-react";
import { SiCoursera } from "react-icons/si";

import { Band, Column } from "@/components/ui/Band";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, type Certification } from "@/lib/data";

const CERT_CSS = `
@keyframes cr-safe {
  to {
    opacity: 1;
    transform: none;
  }
}

/* Scroll reveal */
.cr-r {
  opacity: 0;
  transform: translate3d(0, 8px, 0);
  transition:
    opacity 650ms cubic-bezier(0.22, 1, 0.36, 1) var(--cr-d, 0ms),
    transform 650ms cubic-bezier(0.22, 1, 0.36, 1) var(--cr-d, 0ms);

  animation: cr-safe 1ms linear 2s forwards;
}

.cr-in .cr-r {
  opacity: 1;
  transform: none;
}

/* Interactive row */
.cr-row {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  outline: none;

  transition:
    background-color 350ms ease,
    box-shadow 350ms ease,
    border-color 350ms ease,
    transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* Shimmer sweep */
.cr-row::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  background: linear-gradient(
    110deg,
    transparent 15%,
    rgba(255, 255, 255, 0.045) 48%,
    transparent 80%
  );

  transform: translateX(-110%);

  transition:
    transform 850ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* Bottom highlight */
.cr-row::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 54px;
  right: 0;
  height: 1px;
  pointer-events: none;

  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );

  opacity: 0;

  transition: opacity 350ms ease;
}

/* Icon */
.cr-ico {
  transition:
    color 350ms ease,
    background-color 350ms ease;
}

.cr-icon-inner {
  transition:
    transform 450ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 350ms ease;
}

/* Title */
.cr-title {
  transition:
    color 350ms ease,
    transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* Metadata */
.cr-meta {
  transition: color 350ms ease;
}

/* Arrow */
.cr-arrow {
  transition:
    transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
    color 350ms ease;
}

/* Hover effects */
@media (hover: hover) {
  .cr-row:hover {
    background-color: rgba(255, 255, 255, 0.035);

    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.055),
      0 4px 18px rgba(0, 0, 0, 0.08);
  }

  .cr-row:hover::before {
    transform: translateX(110%);
  }

  .cr-row:hover::after {
    opacity: 1;
  }

  .cr-row:hover .cr-ico {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.025);
  }

  .cr-row:hover .cr-icon-inner {
    transform: scale(1.13) rotate(-5deg);
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.2));
  }

  .cr-row:hover .cr-title {
    color: #fff;
    transform: translateX(2px);
  }

  .cr-row:hover .cr-meta {
    color: rgba(255, 255, 255, 0.68);
  }

  .cr-row:hover .cr-arrow {
    transform: translate3d(3px, -3px, 0);
    color: #fff;
  }
}

/* Click feedback */
.cr-row:active {
  background-color: rgba(255, 255, 255, 0.06);
  transform: scale(0.995);
}

/* Keyboard accessibility */
.cr-row:focus-visible {
  background-color: rgba(255, 255, 255, 0.04);

  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.45);
}

.cr-row:focus-visible .cr-ico,
.cr-row:focus-visible .cr-title,
.cr-row:focus-visible .cr-arrow {
  color: #fff;
}

.cr-row:focus-visible .cr-arrow {
  transform: translate3d(2px, -2px, 0);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .cr-r {
    opacity: 1;
    transform: none;
    transition: none;
    animation: none;
  }

  .cr-row,
  .cr-row::before,
  .cr-row::after,
  .cr-ico,
  .cr-icon-inner,
  .cr-title,
  .cr-meta,
  .cr-arrow {
    transition: none;
  }

  .cr-row:active {
    transform: none;
  }

  .cr-row:hover .cr-icon-inner,
  .cr-row:hover .cr-title,
  .cr-row:hover .cr-arrow,
  .cr-row:focus-visible .cr-arrow {
    transform: none;
  }
}
`;

/** Adds cr-in once, when the row enters the viewport. */
function RevealRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return undefined;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
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
        threshold: 0.3,
        rootMargin: "0px 0px -4% 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={shown ? "cr-in" : undefined}>
      {children}
    </div>
  );
}

type RowProps = {
  c: Certification;
  index: number;
};

function Row({ c, index }: RowProps) {
  const base = index < 3 ? index * 80 : 0;

  const delay = (offset: number): CSSProperties =>
    ({
      "--cr-d": `${base + offset}ms`,
    }) as CSSProperties;

  const body = (
    <>
      {/* Certificate Icon */}
      <span className="cr-ico flex w-[54px] shrink-0 items-center justify-center self-stretch border-r border-line text-muted">
        <span className="cr-r cr-icon-inner flex" style={delay(0)}>
          {c.icon === "id" ? (
            <IdCard size={16} aria-hidden="true" />
          ) : (
            <SiCoursera size={17} aria-hidden="true" />
          )}
        </span>
      </span>

      {/* Certificate Information */}
      <span className="min-w-0 flex-1 pl-3.5 font-sans">
        <span
          className="cr-r cr-title block truncate text-sm font-medium leading-5"
          style={delay(60)}
        >
          {c.title}
        </span>

        <span
          className="cr-r cr-meta mt-1 flex items-center gap-2 text-[13px] leading-[18px] text-muted"
          style={delay(110)}
        >
          <span>{c.issuer}</span>

          {c.date && (
            <>
              <span
                aria-hidden="true"
                className="h-3 w-px bg-white/15"
              />
              <span>{c.date}</span>
            </>
          )}
        </span>
      </span>

      {/* Arrow */}
      <span
        className="cr-r mx-3.5 flex shrink-0"
        style={delay(150)}
      >
        <ArrowUpRight
          size={13}
          className="cr-arrow shrink-0 text-muted"
          aria-hidden="true"
        />
      </span>
    </>
  );

  const cls = "flex h-[72px] items-center";

  return c.href ? (
    <a
      href={c.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View certificate: ${c.title}`}
      className={`cr-row ${cls}`}
    >
      {body}
    </a>
  ) : (
    <div className={cls}>
      {body}
    </div>
  );
}

export function Certifications() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CERT_CSS }} />

      <SectionHeading count={certifications.length}>
        Certifications
      </SectionHeading>

      {certifications.map((c, i) => (
        <RevealRow key={c.title}>
          <Band>
            <Column>
              <Row c={c} index={i} />
            </Column>
          </Band>
        </RevealRow>
      ))}
    </>
  );
}
