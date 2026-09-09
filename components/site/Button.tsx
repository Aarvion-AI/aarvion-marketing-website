import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-[background-color,color,transform,box-shadow,border-color] duration-200 ease-arrive disabled:cursor-wait disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-indigo-deep text-paper-bright shadow-lift hover:-translate-y-px hover:bg-indigo",
  secondary:
    "border border-line-strong bg-paper-bright text-ink hover:border-indigo-line hover:bg-panel",
  ghost: "text-ink hover:text-indigo",
  light: "bg-paper-bright text-night hover:bg-indigo-pale",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.85rem]",
  md: "h-11 px-5 text-[0.92rem]",
  lg: "h-[3.25rem] px-6 text-base",
};

type Props = {
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

export function Button({
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  disabled,
  onClick,
  ...aria
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...aria}>
        {children}
      </Link>
    );
  }

  if (href) {
    const isExternal = external ?? /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        {...aria}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...aria}>
      {children}
    </button>
  );
}
