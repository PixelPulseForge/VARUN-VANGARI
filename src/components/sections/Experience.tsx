import { Band, Column } from "@/components/ui/Band";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoleAccordion } from "@/components/sections/RoleAccordion";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <>
      <SectionHeading>Experience</SectionHeading>
      {experience.map((c) => (
        <Band key={c.name}>
          <Column className="px-3.5 pb-3.5 pt-4">
            <div className="flex items-center gap-[10.5px]">
              {c.dot ? (
                <span aria-hidden="true" className="flex size-[22px] shrink-0 items-center justify-center">
                  <span className="size-2.5 rounded-full bg-faint" />
                </span>
              ) : (
                <AssetSlot
                  name={`logo-${c.name.toLowerCase()}`}
                  src={c.logo}
                  alt={`${c.name} logo`}
                  className={`size-[22px] shrink-0 ${c.logoRound ? "rounded-full" : ""}`}
                />
              )}
              <h3 className="font-sans text-base font-medium leading-[22px]">{c.name}</h3>
              {c.current && (
                <span role="img" aria-label="Current employer" className="flex size-[15px] items-center justify-center rounded-full bg-[#0b3b5c]">
                  <span className="size-[9px] rounded-full bg-[#0a8ae6]" />
                </span>
              )}
            </div>
            {c.roles.map((r, i) => (
              <RoleAccordion key={r.title} role={r} connectNext={c.dot && i < c.roles.length - 1} />
            ))}
          </Column>
        </Band>
      ))}
    </>
  );
}
