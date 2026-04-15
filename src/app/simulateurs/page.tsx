import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Simulateurs de rémunération 2026",
  description:
    "Tous les simulateurs Salairia : calculez votre salaire net, votre TJM, votre rémunération en portage salarial ou en freelance.",
  openGraph: {
    title: "Simulateurs de rémunération 2026 · Salairia",
    description:
      "Tous les simulateurs Salairia : calculez votre salaire net, votre TJM, votre rémunération en portage salarial ou en freelance.",
  },
};

const simulateurs = [
  {
    href: "/simulateurs/portage-salarial",
    titre: "Portage salarial",
    description:
      "Calculez votre salaire net en portage à partir de votre TJM, et comparez 5 sociétés en un clic.",
    statut: "Disponible",
  },
  {
    href: "/simulateurs/tjm-freelance",
    titre: "TJM Freelance",
    description:
      "Quel TJM facturer pour atteindre votre net cible ? Comparaison auto-entrepreneur, portage, SASU et EURL.",
    statut: "Disponible",
  },
] as const;

export default function SimulateursPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <nav
        aria-label="Fil d'Ariane"
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <Link href="/" className="transition hover:text-primary">
          Accueil
        </Link>
        <span aria-hidden>›</span>
        <span className="text-foreground">Simulateurs</span>
      </nav>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Simulateurs de rémunération
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Des outils gratuits et neutres pour estimer votre salaire, votre TJM
        et votre rémunération réelle selon votre statut. Taux à jour 2026.
      </p>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {simulateurs.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                {s.statut}
              </span>
              <h2 className="text-xl font-semibold text-foreground">
                {s.titre}
              </h2>
              <p className="text-sm text-muted-foreground">{s.description}</p>
              <span className="mt-2 text-sm font-semibold text-primary">
                Lancer le simulateur →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
