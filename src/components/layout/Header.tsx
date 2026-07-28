import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="border-b border-border bg-white">
      {/* Deux rangées sous sm : à 375 px, logo + 3 liens sur une seule ligne
          débordaient de ~50 px et faisaient scroller toute la page. */}
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            aria-label="Salairia — accueil"
          >
            <svg
              viewBox="0 0 32 32"
              className="h-9 w-9 shrink-0"
              aria-hidden="true"
              focusable="false"
            >
              <rect width="32" height="32" rx="7" fill="#1E40AF" />
              <rect x="7" y="17" width="4" height="8" rx="2" fill="#FFFFFF" fillOpacity="0.55" />
              <rect x="14" y="13" width="4" height="12" rx="2" fill="#FFFFFF" fillOpacity="0.8" />
              <rect x="21" y="8" width="4" height="17" rx="2" fill="#6EE7B7" />
            </svg>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-xl font-bold leading-none tracking-tight text-primary sm:text-2xl">
                Salairia
              </span>
              <span className="hidden truncate text-sm text-muted-foreground lg:inline">
                Votre rémunération, sans zone d&apos;ombre
              </span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <NavLinks />
          <Link
            href="/simulateurs"
            className="hidden shrink-0 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 lg:inline-flex"
          >
            Simuler
          </Link>
        </div>
      </div>
    </header>
  );
}
