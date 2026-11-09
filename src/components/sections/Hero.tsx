import { Band, Column } from "@/components/ui/Band";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { assets } from "@/lib/data";

export function Hero() {
  return (
    <Band className="h-[250px]">
      <Column className="flex items-center justify-center">
        <AssetSlot name="logo" src={assets.logo} alt="Logo" fit="contain" className="h-[300px] w-[300px]" />
      </Column>
    </Band>
  );
}
