import type { Metadata } from "next";
import Link from "next/link";
import { CalendarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Guides pratiques 2026",
  description:
    "Guides complets et indépendants sur la rémunération en France : portage salarial, statut freelance, fiche de paie, auto-entrepreneur. Données 2026.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Guides pratiques 2026 · Salairia",
    description:
      "Guides complets et indépendants sur la rémunération en France.",
    url: "/guides",
  },
};

const guides = [
  {
    titre: "Portage salarial",
    desc: "Fonctionnement, salaire, avantages, inconvénients, cotisations, chômage. Le guide de référence 2026.",
    href: "/guides/portage-salarial",
    dispo: true,
  },
  {
    titre: "Choisir son statut freelance",
    desc: "Auto-entrepreneur, portage, SASU ou EURL ? Comment choisir le bon statut pour votre activité.",
    dispo: false,
  },
  {
    titre: "Comprendre sa fiche de paie",
    desc: "Décryptage ligne par ligne de votre bulletin de salaire : brut, net, cotisations, PAS.",
    dispo: false,
  },
  {
    titre: "Guide auto-entrepreneur",
    desc: "Création, charges, plafonds, TVA, ACRE : tout savoir pour démarrer en micro-entreprise.",
    dispo: false,
  },
] as const;

export default function GuidesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <nav
        aria-label="Fil d'Ariane"
        className="flex items-center gap-2 text-sm text-foreground/70"
      >
        <Link href="/" className="transition hover:text-primary">
          Accueil
        </Link>
        <span aria-hidden>›</span>
        <span className="text-foreground">Guides</span>
      </nav>

      <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
        <CalendarIcon className="h-3.5 w-3.5" />
        À jour avril 2026
      </span>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Guides pratiques 2026
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Des guides complets, indépendants et à jour pour comprendre votre
        rémunération et prendre les bonnes décisions.
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {guides.map((g) => {
          const content = (
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold text-foreground">
                  {g.titre}
                </h2>
                {g.dispo ? (
                  <span className="inline-flex shrink-0 items-center rounded-full bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                    Disponible
                  </span>
                ) : (
                  <span className="inline-flex shrink-0 items-center rounded-full bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
                    Bientôt
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {g.desc}
              </p>
              {g.dispo ? (
                <span className="mt-auto pt-2 text-sm font-semibold text-primary">
                  Lire le guide →
                </span>
              ) : (
                <span className="mt-auto pt-2 text-sm italic text-muted-foreground">
                  Disponible prochainement
                </span>
              )}
            </div>
          );
          return (
            <li key={g.titre}>
              {g.dispo && "href" in g ? (
                <Link href={g.href} className="block h-full">
                  {content}
                </Link>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
