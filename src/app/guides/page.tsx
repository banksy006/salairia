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
  },
  {
    titre: "Auto-entrepreneur",
    desc: "Création, charges URSSAF, ACRE, TVA, plafonds, versement libératoire. Tout savoir pour démarrer.",
    href: "/guides/auto-entrepreneur",
  },
  {
    titre: "SASU vs EURL",
    desc: "Charges sociales, IS, dividendes, protection sociale. Comparatif détaillé pour choisir le bon statut.",
    href: "/guides/sasu-eurl",
  },
  {
    titre: "Salaire brut et net",
    desc: "Cotisations, fiche de paie, prélèvement à la source. Tout comprendre sur votre rémunération.",
    href: "/guides/salaire-brut-net",
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
        {guides.map((g) => (
          <li key={g.titre}>
            <Link href={g.href} className="block h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md">
                <h2 className="text-xl font-bold text-foreground">
                  {g.titre}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {g.desc}
                </p>
                <span className="mt-auto pt-2 text-sm font-semibold text-primary">
                  Lire le guide →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
