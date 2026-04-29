type SectionTone = "light" | "warm" | "dark";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  tone?: SectionTone;
  className?: string;
};

const tones: Record<SectionTone, string> = {
  light: "bg-off-white text-charcoal",
  warm: "bg-warm-gray/65 text-charcoal",
  dark: "bg-charcoal text-white",
};

export function Section({
  children,
  id,
  tone = "light",
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {children}
      </div>
    </section>
  );
}
