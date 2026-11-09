import { Search } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { Band, Column } from "@/components/ui/Band";
import { ThemeToggle } from "../styles/ThemeToggle";
import { githubProfileUrl } from "@/lib/data";

export function Header() {
  return (
    <div className="sticky top-0 z-40 bg-bg">
      <div className="h-2 w-full border-b border-line" />

      <Band as="header" className="h-[43px]">
        <Column className="flex items-center justify-between border-x-0 pr-1.5 min-[705px]:border-x">
          <a href="/" aria-label="Home">
            <Image
              src="/assets/logo.png"
              alt="Portfolio logo"
              width={36}
              height={36}
              priority
            />
          </a>

          <div className="flex items-center gap-2">
            <a
              href="/"
              className="mr-2 text-[13.6px] font-semibold tracking-wide"
            >
              Portfolio
            </a>

            <button
              type="button"
              aria-label="Search (Ctrl K)"
              className="flex h-[30px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 text-muted"
            >
              <Search size={14} aria-hidden="true" />
              <kbd className="rounded bg-white/10 px-1.5 text-[11px] leading-[18px] text-muted">
                Ctrl K
              </kbd>
            </button>

            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex size-[26px] items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
            >
              <FaGithub size={15} aria-hidden="true" />
            </a>

            <ThemeToggle />
          </div>
        </Column>
      </Band>
    </div>
  );
}