import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "navy" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-brand via-electric to-brand-light text-white shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-electric/30 hover:brightness-105",
  outline:
    "border border-cool bg-surface text-ink hover:border-brand/40 hover:text-brand",
  navy: "bg-navy text-white hover:bg-navy-deep",
  whatsapp: "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 hover:brightness-105",
  ghost: "text-ink hover:bg-cool/60",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-7 text-base",
};

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
  /** Opens in a new tab when href is external. */
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
  "aria-label"?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  type = "button",
  onClick,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
