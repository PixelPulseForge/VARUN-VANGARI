import { Band, Column } from "@/components/ui/Band";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { personalProjects } from "@/lib/data";

export function PersonalProjects() {
  return (
    <>
      <SectionHeading count={personalProjects.length}>Personal Projects</SectionHeading>
      <Band>
        <Column className="grid grid-cols-1 gap-4 px-3.5 pb-3.5 pt-4 sm:grid-cols-2">
          {personalProjects.map((p) => (
            <article key={p.id} className="overflow-hidden rounded-[10px] border border-white/5 bg-[#111113]">
              <AssetSlot name={`personal-${p.id}`} src={p.image} alt={`${p.title} preview`} className="aspect-[16/10] w-full" />
              <div className="flex h-[42px] items-center gap-2 px-3">
                <AssetSlot name={`personal-${p.id}-icon`} src={p.icon} alt="" fit="contain" className="size-[18px] shrink-0" />
                <h3 className="truncate font-sans text-[13px] font-medium">{p.title}</h3>
              </div>
            </article>
          ))}
        </Column>
      </Band>
    </>
  );
}
