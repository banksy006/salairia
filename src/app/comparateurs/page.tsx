import type { Metadata } from "next";
import Link from "next/link";
import { CalendarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Comparateurs indépendants 2026",
  description:
    "Comparatifs indépendants de services pour freelances et entrepreneurs : portage salarial, banques pro, comptabilité, création de société. Données 2026.",
  alternates: { canonical: "/comparateurs" },
  openGraph: {
    title: "Comparateurs indépendants 2026 · Salairia",
    description:
      "Comparatifs indépendants de services pour freelances et entrepreneurs : portage salarial, banques pro, comptabilité, création de société.",
    url: "/comparateurs",
  },
};

const comparateurs = [
  {
    titre: "Portage salarial",
    desc: "10 sociétés analysées sur 8 critères objectifs : frais, avis, services, label PEPS.",
    href: "/comparateurs/portage-salarial",
    dispo: true,
  },
  {
    titre: "Banques pro freelance",
    desc: "Qonto, Shine, Propulse, Revolut Business : laquelle choisir pour votre activité ?",
    dispo: false,
  },
  {
    titre: "Comptabilité freelance",
    desc: "Indy, Dougs, L-Expert-Comptable, Pennylane : tarifs, fonctionnalités et avis.",
    dispo: false,
  },
  {
    titre: "Création SASU",
    desc: "Legalstart, Captain Contrat, Indy : comparez les services de création de société.",
    dispo: false,
  },
] as const;

export default function ComparateursPage() {
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
        <span className="text-foreground">Comparateurs</span>
      </nav>

      <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
        <CalendarIcon className="h-3.5 w-3.5" />
        À jour avril 2026
      </span>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Comparateurs indépendants 2026
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Des analyses neutres basées sur des données publiques et vérifiables.
        Aucun classement n&apos;est influencé par des relations commerciales.
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {comparateurs.map((c) => {
          const content = (
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold text-foreground">
                  {c.titre}
                </h2>
                {c.dispo ? (
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
                {c.desc}
              </p>
              {c.dispo ? (
                <span className="mt-auto pt-2 text-sm font-semibold text-primary">
                  Voir le comparatif →
                </span>
              ) : (
                <span className="mt-auto pt-2 text-sm italic text-muted-foreground">
                  Disponible prochainement
                </span>
              )}
            </div>
          );

          return (
            <li key={c.titre}>
              {c.dispo && "href" in c ? (
                <Link href={c.href} className="block h-full">
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
