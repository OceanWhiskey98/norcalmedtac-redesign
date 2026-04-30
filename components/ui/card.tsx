type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <article
      className={`group rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl ${className}`}
    >
      {children}
    </article>
  );
}
