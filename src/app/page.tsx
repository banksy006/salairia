import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-6">
          <span className="text-2xl font-bold tracking-tight text-primary">
            Salairia
          </span>
          <span className="text-sm text-muted-foreground">
            Votre rémunération, sans zone d&apos;ombre
          </span>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Votre rémunération,
            <br />
            <span className="text-primary">sans zone d&apos;ombre</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Simulateurs gratuits, guides clairs, comparatifs neutres pour
            salariés, freelances, dirigeants et auto-entrepreneurs.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/simulateurs"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Découvrir les simulateurs
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Salairia — Tous droits réservés.
        </div>
      </footer>
    </>
  );
}
