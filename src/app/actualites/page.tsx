import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import { IconBadge, CalendarIcon, FileTextIcon } from "@/components/icons";
import data from "@/data/actualites.json";

export const metadata: Metadata = {
  title: "Actualités de la rémunération",
  description:
    "Veille réglementaire sur la rémunération en France : revalorisations du SMIC, barèmes fiscaux, taux de cotisations. Chaque changement sourcé et chiffré.",
  alternates: { canonical: "/actualites" },
  openGraph: {
    title: "Actualités de la rémunération | Salairia",
    description:
      "Chaque changement de taux, plafond ou barème, documenté avec sa source officielle et son impact chiffré.",
    url: "/actualites",
  },
};

const articles = [...data.articles].sort((a, b) =>
  b.datePublication.localeCompare(a.datePublication),
);

export default function ActualitesPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Actualités de la rémunération",
      description:
        "Veille réglementaire : chaque changement de taux, plafond ou barème avec sa source officielle.",
      url: `${SITE_URL}/actualites`,
      inLanguage: "fr-FR",
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.titre,
        url: `${SITE_URL}/actualites/${a.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Actualités", item: `${SITE_URL}/actualites` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-foreground/70">
          <Link href="/" className="transition hover:text-primary">Accueil</Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">Actualités</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          Veille réglementaire
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Actualités de la rémunération
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          Ce qui change, quand, et ce que ça coûte
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">
          Les taux et barèmes qui déterminent ta rémunération bougent en cours
          d&apos;année, souvent sans bruit. On documente ici chaque changement
          officiel : sa date d&apos;effet, sa source, et son impact chiffré sur
          une fiche de paie ou un revenu de freelance.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Pas de conseils génériques ni de listes d&apos;astuces : uniquement des
          changements réglementaires vérifiables, reliés à nos simulateurs.
        </p>

        <section className="mt-12">
          <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
            <IconBadge><FileTextIcon className="w-4 h-4" /></IconBadge>
            Derniers articles
          </h2>

          <div className="mt-6 space-y-5">
            {articles.map((a) => (
              <article
                key={a.slug}
                className="rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                    {a.categorie}
                  </span>
                  <time dateTime={a.datePublication} className="text-muted-foreground">
                    {new Date(a.datePublication).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <span className="text-muted-foreground">
                    · {a.tempsLecture} min de lecture
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
                  <Link
                    href={`/actualites/${a.slug}`}
                    className="transition hover:text-primary"
                  >
                    {a.titre}
                  </Link>
                </h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/80">
                  {a.chapo}
                </p>
                <Link
                  href={`/actualites/${a.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Lire l&apos;article <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
