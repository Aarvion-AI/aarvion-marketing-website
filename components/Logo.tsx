import Image from "next/image";

export function Logo({
  className = "",
  size = 34,
  showWordmark = true,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={size} />
      {showWordmark && (
        <span className="font-bold uppercase tracking-[0.05em] text-[19px] leading-none">
          Aarvion
        </span>
      )}
    </span>
  );
}

export function LogoMark({
  size = 34,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/aarvion-logo.png"
      alt="Aarvion"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      priority
    />
  );
}
