import Link from "next/link";

const footerLinks = [
  "FAQs",
  "Policies",
  "Waivers",
  "Refund & Cancellation Policy",
  "Instructor Credentials",
  "Gallery",
  "Blog / Resources",
  "Reading List",
  "Contact",
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold">NorCal MedTac</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
            Professional medical, defensive, firearms-related, workplace, and
            group training in Northern California.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="grid gap-3 text-sm text-white/76 sm:grid-cols-2 lg:grid-cols-3">
            {footerLinks.map((label) => (
              <li key={label}>
                <Link
                  className="transition-colors hover:text-white"
                  href={label === "Contact" ? "/contact" : "#"}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
