import Link from "next/link";
import { IconBadge, FileTextIcon } from "@/components/icons";
import data from "@/data/actualites.json";

/**
 * Bandeau « Ce qui a changé récemment » sur la home. Le but est de rendre
 * visible la fraîcheur du site : sur une niche où les taux bougent en cours
 * d'année, c'est un signal de confiance autant qu'un signal de crawl.
 */
export default function ActualitesTeaser({ limite = 2 }: { limite?: number }) {
  const articles = [...data.articles]
    .sort((a, b) => b.datePublication.localeCompare(a.datePublication))
    .slice(0, limite);

  if (articles.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <IconBadge><FileTextIcon className="w-4 h-4" /></IconBadge>
            Ce qui a changé récemment
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Les taux et barèmes bougent en cours d&apos;année, souvent sans
            bruit. On documente chaque changement, sourcé et chiffré.
          </p>
        </div>
        <Link
          href="/actualites"
          className="shrink-0 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:border-primary hover:shadow-md"
        >
          Toutes les actualités →
        </Link>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {articles.map((a) => (
          <article
            key={a.slug}
            className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg"
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
            </div>
            <h3 className="mt-3 text-lg font-bold leading-snug text-foreground">
              <Link
                href={`/actualites/${a.slug}`}
                className="transition hover:text-primary"
              >
                {a.titre}
              </Link>
            </h3>
            <p className="mt-2 flex-1 text-base leading-relaxed text-foreground/80">
              {a.chapo}
            </p>
            <Link
              href={`/actualites/${a.slug}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Lire <span aria-hidden>→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
