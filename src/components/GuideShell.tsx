import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  IconBadge,
  CalendarIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export interface GuideFaqItem {
  q: string;
  r: string;
}
export interface GuideSource {
  label: string;
  href: string;
}
export interface GuideMeta {
  slug: string;
  titre: string;
  sousTitre: string;
  chapo: string;
  filAriane: string;
  datePublished: string;
  dateModified: string;
  faq: GuideFaqItem[];
  sources: GuideSource[];
  tocItems: readonly { id: string; label: string }[];
}

/**
 * Chrome commun des guides : fil d'Ariane, badge, titres, sommaire flottant,
 * FAQ, sources et JSON-LD (Article + FAQPage + BreadcrumbList). Les sections
 * de contenu arrivent en children — la page ne porte que sa matière.
 */
export default function GuideShell({
  meta,
  children,
}: {
  meta: GuideMeta;
  children: React.ReactNode;
}) {
  const url = `${SITE_URL}/guides/${meta.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.titre,
      description: meta.chapo,
      author: { "@type": "Person", name: "Nizar Laghrifi", url: `${SITE_URL}/a-propos` },
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      datePublished: meta.datePublished,
      dateModified: meta.dateModified,
      inLanguage: "fr-FR",
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: meta.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.r },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: meta.filAriane, item: url },
      ],
    },
  ];

  const tocComplet = [
    ...meta.tocItems,
    { id: "faq", label: "FAQ" },
    { id: "sources", label: "Sources" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <Link href="/" className="transition hover:text-primary">Accueil</Link>
          <span aria-hidden>›</span>
          <Link href="/guides" className="transition hover:text-primary">Guides</Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">{meta.filAriane}</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour août 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {meta.titre}
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          {meta.sousTitre}
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">
          {meta.chapo}
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="space-y-16">
            {children}

            <section id="faq" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><MessageCircleIcon className="w-4 h-4" /></IconBadge>
                Questions fréquentes
              </h2>
              <div className="mt-6 space-y-3">
                {meta.faq.map((f) => (
                  <details key={f.q} className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg">
                    <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-semibold text-foreground">
                      {f.q}
                      <span aria-hidden className="mt-1 shrink-0 text-xl leading-none text-primary transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 text-base leading-relaxed text-foreground/80">{f.r}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id="sources" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><ExternalLinkIcon className="w-4 h-4" /></IconBadge>
                Sources
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <ul className="space-y-3">
                  {meta.sources.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                        {s.label}<span aria-hidden> ↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs italic text-muted-foreground">
                  Dernière mise à jour : août 2026. Les montants affichés sont
                  calculés par nos simulateurs à partir des taux 2026 — ils sont
                  indicatifs et ne constituent ni un conseil juridique ni un
                  conseil fiscal. Une erreur ?{" "}
                  <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                    Signalez-la
                  </Link>
                  .
                </p>
              </div>
            </section>
          </div>

          <TocSidebar items={tocComplet} />
        </div>
      </div>
    </>
  );
}
