import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-medical-red bg-medical-red text-white hover:bg-[#982c28] hover:border-[#982c28]",
  secondary:
    "border-field-olive bg-field-olive text-white hover:bg-[#3f4d32] hover:border-[#3f4d32]",
  outline:
    "border-charcoal/25 bg-transparent text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-white",
  ghost:
    "border-transparent bg-transparent text-charcoal hover:bg-warm-gray/55",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-md border font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted-gold",
    variants[variant],
    sizes[size],
    disabled ? "pointer-events-none cursor-not-allowed opacity-55" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link aria-disabled={disabled} className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} type={type}>
      {children}
    </button>
  );
}
