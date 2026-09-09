import Image from "next/image";
import { IMAGES } from "@/lib/asset-manifest.generated";
import { IMAGE_SLOTS, type ImageSlotId } from "@/lib/images";
import { cn } from "@/lib/cn";
import { GenerativeVisual } from "./GenerativeVisual";

export function ImageSlot({
  id,
  className,
  fill = false,
  eager = false,
  sizes = "100vw",
}: {
  id: ImageSlotId;
  className?: string;
  fill?: boolean;
  eager?: boolean;
  sizes?: string;
}) {
  const slot = IMAGE_SLOTS[id];
  const src = IMAGES[id];

  return (
    <div
      className={cn("overflow-hidden", fill ? "absolute inset-0" : "relative", className)}
      style={fill ? undefined : { aspectRatio: slot.aspect }}
    >
      {src ? (
        <Image
          src={src}
          alt={slot.alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className="object-cover"
        />
      ) : (
        <GenerativeVisual variant={slot.variant} />
      )}
    </div>
  );
}
