"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Simulateurs", href: "/simulateurs" },
  { label: "Comparateurs", href: "/comparateurs" },
  { label: "Guides", href: "/guides" },
  { label: "Actualités", href: "/actualites" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation principale"
      // flex-wrap plutôt qu'overflow-x : avec 4 rubriques la barre déborde sous
      // 400 px, et un scroll horizontal masquerait la dernière sans le signaler.
      className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 sm:gap-x-2"
    >
      {links.map((l) => {
        const actif = pathname === l.href || pathname.startsWith(`${l.href}/`);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={actif ? "page" : undefined}
            className={`rounded-lg px-2.5 py-2 text-sm font-semibold transition sm:px-3 sm:text-base ${
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
