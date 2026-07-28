import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Salairia — accueil">
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
          <span className="flex flex-col gap-0.5">
            <span className="text-2xl font-bold leading-none tracking-tight text-primary">
              Salairia
            </span>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Votre rémunération, sans zone d&apos;ombre
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/simulateurs"
            className="text-foreground/70 transition hover:text-primary"
          >
            Simulateurs
          </Link>
          <Link
            href="/comparateurs"
            className="text-foreground/70 transition hover:text-primary"
          >
            Comparateurs
          </Link>
          <Link
            href="/guides"
            className="text-foreground/70 transition hover:text-primary"
          >
            Guides
          </Link>
        </nav>
      </div>
    </header>
  );
}
