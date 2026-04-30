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
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8 md:py-28 lg:px-10">
        {children}
      </div>
    </section>
  );
}
