import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Classes", href: "/classes" },
  { label: "Calendar", href: "/calendar" },
  { label: "Group Training", href: "/group-training" },
  { label: "About", href: "/about" },
  { label: "Merch", href: "/merch" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-charcoal text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link className="font-semibold tracking-[0.02em]" href="/">
            NorCal MedTac
          </Link>
          <Button
            className="lg:hidden"
            href="/classes"
            size="sm"
            variant="primary"
          >
            View Upcoming Classes
          </Button>
        </div>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/82">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="transition-colors hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button className="hidden lg:inline-flex" href="/classes" variant="primary">
          View Upcoming Classes
        </Button>
      </div>
    </header>
  );
}
