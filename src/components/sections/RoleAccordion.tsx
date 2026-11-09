"use client";
import { useId, useState } from "react";
import { ChevronsDownUp, ChevronsUpDown, Code, GraduationCap } from "lucide-react";
import { TagList } from "@/components/ui/TagList";
import type { Role } from "@/lib/data";

export function RoleAccordion({ role, connectNext }: { role: Role; connectNext?: boolean }) {
  const [open, setOpen] = useState(role.defaultOpen ?? true);
  const RoleIcon = role.icon === "education" ? GraduationCap : Code;
  const panelId = useId();
  const Chevrons = open ? ChevronsDownUp : ChevronsUpDown;
  return (
    <div className="relative mt-4">
      {connectNext && <span aria-hidden="true" className="absolute bottom-[-16px] left-[10.5px] top-[22px] w-px bg-white/15" />}
      <div className="flex items-center gap-[10.5px]">
        <span className="relative flex size-[22px] shrink-0 items-center justify-center rounded-md border border-white/10 bg-chip text-muted">
          <RoleIcon size={13} aria-hidden="true" />
        </span>
        <h4 className="min-w-0 flex-1 font-sans text-sm font-medium leading-5">{role.title}</h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? "Collapse" : "Expand"} ${role.title}`}
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 p-1 text-muted"
        >
          <Chevrons size={14} aria-hidden="true" />
        </button>
      </div>
      <p className="ml-[32.5px] mt-1 flex items-center gap-2 font-sans text-[13px] leading-[18px] text-muted">
        {role.type && (
          <>
            <span>{role.type}</span>
            <span aria-hidden="true" className="h-3 w-px bg-white/15" />
          </>
        )}
        <span>{role.period}</span>
      </p>
      <div id={panelId} hidden={!open} className="ml-[32.5px]">
        <ul className="mt-[11px] list-disc pl-[25px] marker:text-faint">
          {role.bullets.map((b) => (
            <li key={b} className="mb-0.5 text-[12.25px] leading-[22.5px] text-body">
              {b}
            </li>
          ))}
        </ul>
        {/* <TagList tags={role.tags} className="mt-[11px]" /> */}
      </div>
    </div>
  );
}
