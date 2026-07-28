"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Simulateurs", href: "/simulateurs" },
  { label: "Comparateurs", href: "/comparateurs" },
  { label: "Guides", href: "/guides" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation principale"
      className="flex items-center justify-center gap-1 sm:gap-2"
    >
      {links.map((l) => {
        const actif = pathname === l.href || pathname.startsWith(`${l.href}/`);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={actif ? "page" : undefined}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition sm:text-base ${
              actif
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-muted hover:text-primary"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
