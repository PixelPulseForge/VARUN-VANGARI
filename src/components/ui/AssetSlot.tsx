
import Image from "next/image";

interface AssetSlotProps {
  name: string;
  src?: string | null;
  alt: string;
  className?: string;
  fit?: "contain" | "cover";
  priority?: boolean;
  sizes?: string;
}

export function AssetSlot({
  name,
  src = null,
  alt,
  className = "",
  fit = "cover",
  priority = false,
  sizes = "(max-width: 640px) 100vw, 50vw",
}: AssetSlotProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={`${alt} placeholder`}
        data-asset={name}
        className={`relative overflow-hidden bg-white/[0.04] ${className}`}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={
          fit === "contain"
            ? "object-contain"
            : "object-cover"
        }
      />
    </div>
  );
}
