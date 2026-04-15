import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-primary"
        >
          Salairia
        </Link>
        <span className="text-sm text-muted-foreground">
          Votre rémunération, sans zone d&apos;ombre
        </span>
      </div>
    </header>
  );
}
