import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { IconBadge, CalendarIcon, ExternalLinkIcon } from "@/components/icons";

export interface ArticleMeta {
  slug: string;
  titre: string;
  chapo: string;
  datePublication: string;
  dateModification: string;
  categorie: string;
  tempsLecture: number;
  sources: { label: string; url: string }[];
  liens: { label: string; url: string }[];
}

export function articleJsonLd(a: ArticleMeta) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: a.titre,
      description: a.chapo,
      author: {
        "@type": "Person",
        name: "Nizar Laghrifi",
        url: `${SITE_URL}/a-propos`,
      },
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      datePublished: a.datePublication,
      dateModified: a.dateModification,
      inLanguage: "fr-FR",
      url: `${SITE_URL}/actualites/${a.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Actualités", item: `${SITE_URL}/actualites` },
        { "@type": "ListItem", position: 3, name: a.titre, item: `${SITE_URL}/actualites/${a.slug}` },
      ],
    },
  ];
}

export default function ArticleShell({
  article,
  filAriane,
  children,
}: {
  article: ArticleMeta;
  /** Libellé court du fil d'Ariane, le titre complet étant trop long. */
  filAriane: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />

      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <Link href="/" className="transition hover:text-primary">Accueil</Link>
          <span aria-hidden>›</span>
          <Link href="/actualites" className="transition hover:text-primary">Actualités</Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">{filAriane}</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
            {article.categorie}
          </span>
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <CalendarIcon className="h-3.5 w-3.5" />
            <time dateTime={article.datePublication}>
              {new Date(article.datePublication).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </span>
          <span className="text-muted-foreground">· {article.tempsLecture} min</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {article.titre}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/80">
          {article.chapo}
        </p>

        <div className="mt-10 space-y-12">
          {children}

          {article.liens.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-foreground">
                Vérifier sur ta situation
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {article.liens.map((l) => (
                  <Link
                    key={l.url}
                    href={l.url}
                    className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                  >
                    {l.label} →
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="flex items-center text-2xl font-bold text-foreground">
              <IconBadge><ExternalLinkIcon className="w-4 h-4" /></IconBadge>
              Sources
            </h2>
            <ul className="mt-4 space-y-3">
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {s.label}
                    <span aria-hidden> ↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs italic text-muted-foreground">
              Publié le{" "}
              {new Date(article.datePublication).toLocaleDateString("fr-FR")}. Les
              montants cités sont calculés par nos simulateurs à partir des taux
              2026. Une erreur ?{" "}
              <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                Signale-la
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
