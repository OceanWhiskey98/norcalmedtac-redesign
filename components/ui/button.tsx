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
    "border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700",
  secondary:
    "border-neutral-300 bg-white/70 text-charcoal hover:bg-neutral-100",
  outline:
    "border-neutral-300 bg-transparent text-charcoal hover:bg-neutral-100",
  ghost:
    "border-transparent bg-transparent text-charcoal hover:bg-neutral-100",
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
    "inline-flex items-center justify-center rounded-xl border font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted-gold",
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
