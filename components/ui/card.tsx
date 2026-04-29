type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <article
      className={`rounded-lg border border-charcoal/10 bg-white shadow-sm ${className}`}
    >
      {children}
    </article>
  );
}
