type BadgeTone = "olive" | "red" | "gold" | "graphite" | "neutral";

type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const tones: Record<BadgeTone, string> = {
  olive: "border-field-olive/20 bg-field-olive/10 text-field-olive",
  red: "border-medical-red/20 bg-medical-red/10 text-medical-red",
  gold: "border-muted-gold/25 bg-muted-gold/15 text-[#75581f]",
  graphite: "border-graphite bg-graphite text-white",
  neutral: "border-charcoal/10 bg-warm-gray/45 text-charcoal",
};

export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
