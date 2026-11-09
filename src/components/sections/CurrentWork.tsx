import { Band, Column } from "@/components/ui/Band";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/TagList";
import { currentWork } from "@/lib/data";

export function CurrentWork() {
  const w = currentWork;
  return (
    <>
      <SectionHeading dot>Current Work</SectionHeading>
      <Band>
        <Column className="px-3.5 pb-[13px] pt-4">
          <AssetSlot name="project-quicktube" src={w.image} alt={`${w.title} preview`} className="aspect-video w-full rounded-lg" />
          <h3 className="mt-[25px] text-[14.4px] font-medium leading-[22px]">{w.title}</h3>
          <TagList tags={w.tags} className="mt-[9px]" />
          <p className="mt-4 text-[13.6px] leading-[22px] text-body">{w.description}</p>
        </Column>
      </Band>
    </>
  );
}
