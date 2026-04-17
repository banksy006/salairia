import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex flex-col gap-0.5">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-primary"
          >
            Salairia
          </Link>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Votre rémunération, sans zone d&apos;ombre
          </span>
        </div>
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
