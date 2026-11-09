
import { Band, Column } from "@/components/ui/Band";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  dot?: boolean;
  count?: number;
}

export function SectionHeading({
  children,
  dot = false,
  count,
}: SectionHeadingProps) {
  return (
    <Band>
      <Column className="flex flex-row items-center justify-between px-3.5">
        <h2 className="flex items-center gap-2 text-[25.6px] font-semibold leading-8">
          {children}

          {dot && (
            <span
              aria-hidden="true"
              className="size-[7px] rounded-full bg-verified"
            />
          )}
        </h2>

        {count !== undefined && (
          <span className="text-sm font-medium text-muted">
            {count}
          </span>
        )}
      </Column>
    </Band>
  );
}
