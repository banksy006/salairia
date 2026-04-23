import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  BarChartIcon,
  CalculatorIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import PercentileApercuCard from "@/components/simulateurs/PercentileApercuCard";
import { PercentileProvider } from "@/components/simulateurs/PercentileContext";
import PercentileSimulator from "@/components/simulateurs/PercentileSimulator";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title:
    "O\u00f9 se situe mon salaire ? Comparez \u00e0 la distribution fran\u00e7aise 2026",
  description:
    "Comparez votre salaire net mensuel aux percentiles INSEE. D\u00e9couvrez si vous gagnez plus ou moins que la m\u00e9diane fran\u00e7aise, par cat\u00e9gorie socioprofessionnelle et tranche d\u2019\u00e2ge.",
  alternates: {
    canonical: "/simulateurs/ou-se-situe-mon-salaire",
  },
  openGraph: {
    title:
      "O\u00f9 se situe mon salaire ? Comparez \u00e0 la distribution fran\u00e7aise 2026",
    description:
      "Comparez votre salaire net mensuel aux percentiles INSEE. D\u00e9couvrez si vous gagnez plus ou moins que la m\u00e9diane fran\u00e7aise.",
    url: "/simulateurs/ou-se-situe-mon-salaire",
  },
};

const faq = [
  {
    q: "Comment est calcul\u00e9 mon percentile ?",
    r: "Votre salaire net mensuel est compar\u00e9 \u00e0 la distribution des salaires publi\u00e9e par l\u2019INSEE (enqu\u00eate DADS). Nous interpolons entre les percentiles connus (P10, P25, P50, P75, P90) pour estimer votre position exacte. Un percentile de 70 signifie que vous gagnez plus que 70\u00a0% des salari\u00e9s \u00e0 temps plein.",
  },
  {
    q: "D\u2019o\u00f9 viennent les donn\u00e9es de salaires ?",
    r: "Les donn\u00e9es proviennent des D\u00e9clarations Annuelles de Donn\u00e9es Sociales (DADS) collect\u00e9es par l\u2019INSEE, derni\u00e8re ann\u00e9e disponible\u00a0: 2023. Elles couvrent l\u2019ensemble des salari\u00e9s du secteur priv\u00e9 \u00e0 temps plein en France m\u00e9tropolitaine. Les montants sont exprim\u00e9s en salaire net mensuel.",
  },
  {
    q: "Le salaire m\u00e9dian est-il le m\u00eame que le salaire moyen ?",
    r: "Non. Le salaire m\u00e9dian (P50) partage la population en deux\u00a0: 50\u00a0% gagnent moins, 50\u00a0% gagnent plus. Le salaire moyen est tir\u00e9 vers le haut par les tr\u00e8s hauts revenus et est donc g\u00e9n\u00e9ralement sup\u00e9rieur \u00e0 la m\u00e9diane. En France, le salaire net moyen est d\u2019environ 2\u00a0670\u00a0\u20ac contre une m\u00e9diane de 2\u00a0120\u00a0\u20ac.",
  },
  {
    q: "Pourquoi mon percentile change selon la cat\u00e9gorie ?",
    r: "Chaque cat\u00e9gorie socioprofessionnelle (cadres, employ\u00e9s, ouvriers\u2026) a sa propre distribution de salaires. Un salaire de 3\u00a0000\u00a0\u20ac vous place au P75 en population g\u00e9n\u00e9rale, mais seulement au P25 chez les cadres. Filtrer par CSP permet une comparaison plus pertinente avec vos pairs.",
  },
  {
    q: "Ces donn\u00e9es incluent-elles les primes et le 13e mois ?",
    r: "Oui, partiellement. Les donn\u00e9es DADS incluent les primes r\u00e9guli\u00e8res vers\u00e9es mensuellement et le 13e mois lorsqu\u2019il est liss\u00e9 sur 12 mois. Les primes exceptionnelles (int\u00e9ressement, participation) ne sont en revanche pas toujours prises en compte. Pour une comparaison optimale, utilisez votre salaire net mensuel hors primes exceptionnelles.",
  },
];

const chiffres = [
  { label: "SMIC net mensuel", value: "1\u00a0443\u00a0\u20ac", note: "Au 1er janvier 2026" },
  { label: "Salaire m\u00e9dian", value: "2\u00a0120\u00a0\u20ac", note: "50\u00a0% gagnent moins" },
  { label: "Salaire moyen", value: "~2\u00a0670\u00a0\u20ac", note: "Tir\u00e9 vers le haut par les hauts revenus" },
  { label: "D9 (90e percentile)", value: "3\u00a0850\u00a0\u20ac", note: "Top 10\u00a0% des salari\u00e9s" },
];

const etapesPercentile = [
  {
    n: 1,
    t: "Le percentile, c\u2019est quoi ?",
    d: "Un percentile indique le pourcentage de salari\u00e9s qui gagnent moins que vous. \u00catre au 70e percentile signifie que 70\u00a0% des salari\u00e9s \u00e0 temps plein gagnent moins que vous.",
  },
  {
    n: 2,
    t: "Comment lire la jauge ?",
    d: "La barre va de 0\u00a0% (les salaires les plus bas) \u00e0 100\u00a0% (les plus hauts). Votre position est marqu\u00e9e par un curseur. Plus vous \u00eates \u00e0 droite, plus votre salaire est \u00e9lev\u00e9 par rapport aux autres.",
  },
  {
    n: 3,
    t: "Pourquoi c\u2019est utile ?",
    d: "Savoir o\u00f9 vous vous situez permet de mieux n\u00e9gocier une augmentation, de comparer une offre d\u2019emploi, ou simplement de comprendre votre position dans l\u2019\u00e9chelle nationale des r\u00e9mun\u00e9rations.",
  },
];

const sources = [
  {
    label: "INSEE \u2014 D\u00e9clarations Annuelles de Donn\u00e9es Sociales (DADS)",
    href: "https://www.insee.fr/fr/statistiques/serie/001567530",
  },
  {
    label: "INSEE \u2014 Salaires dans le secteur priv\u00e9",
    href: "https://www.insee.fr/fr/statistiques/5371272",
  },
  {
    label: "DARES \u2014 \u00c9tudes sur les r\u00e9mun\u00e9rations",
    href: "https://dares.travail-emploi.gouv.fr",
  },
  {
    label: "Service-Public.fr \u2014 SMIC 2026",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2300",
  },
];

const tocItems = [
  { id: "simulateur", label: "Simulateur" },
  { id: "chiffres-cles", label: "Chiffres cl\u00e9s" },
  { id: "comprendre", label: "Comprendre" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function OuSeSitueMonSalairePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Simulateur \u00ab O\u00f9 se situe mon salaire ? \u00bb 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      description:
        "Simulateur gratuit pour comparer votre salaire net mensuel \u00e0 la distribution fran\u00e7aise. Percentiles INSEE par CSP et tranche d\u2019\u00e2ge.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.r,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Simulateurs",
          item: `${SITE_URL}/simulateurs`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "O\u00f9 se situe mon salaire ?",
          item: `${SITE_URL}/simulateurs/ou-se-situe-mon-salaire`,
        },
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
        <PercentileProvider>
          <section className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <nav
                aria-label="Fil d'Ariane"
                className="flex items-center gap-2 text-sm text-foreground/70"
              >
                <Link href="/" className="transition hover:text-primary">
                  Accueil
                </Link>
                <span aria-hidden>&rsaquo;</span>
                <Link
                  href="/simulateurs"
                  className="transition hover:text-primary"
                >
                  Simulateurs
                </Link>
                <span aria-hidden>&rsaquo;</span>
                <span className="text-foreground">
                  O&ugrave; se situe mon salaire ?
                </span>
              </nav>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
                <CalendarIcon className="h-3.5 w-3.5" />
                &Agrave; jour avril 2026
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                O&ugrave; se situe mon salaire en France ?
              </h1>
              <p className="mt-3 text-2xl font-semibold text-accent sm:text-3xl">
                Comparez votre r&eacute;mun&eacute;ration &agrave; la
                distribution nationale
              </p>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  Vous vous demandez si votre salaire est dans la moyenne ?
                  Notre simulateur compare votre r&eacute;mun&eacute;ration
                  nette mensuelle aux donn&eacute;es officielles de
                  l&apos;INSEE (enqu&ecirc;te DADS, derni&egrave;re
                  ann&eacute;e disponible). Vous obtenez instantan&eacute;ment
                  votre percentile, c&apos;est-&agrave;-dire le pourcentage de
                  salari&eacute;s &agrave; temps plein qui gagnent moins que
                  vous.
                </p>
                <p>
                  Affinez par cat&eacute;gorie socioprofessionnelle (cadres,
                  employ&eacute;s, ouvriers&hellip;) ou par tranche
                  d&apos;&acirc;ge pour une comparaison plus fine. Toutes les
                  donn&eacute;es utilis&eacute;es sont publiques et
                  r&eacute;f&eacute;renc&eacute;es en bas de page.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PercentileApercuCard />
            </div>
          </section>

          <div className="mt-16 flex gap-12">
            <div className="min-w-0 flex-1 space-y-16">
              <PercentileSimulator />

              <section id="chiffres-cles" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge>
                      <BarChartIcon className="h-4 w-4" />
                    </IconBadge>
                    Salaires en France : les chiffres cl&eacute;s 2026
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Les rep&egrave;res essentiels pour situer votre
                    r&eacute;mun&eacute;ration. Source : INSEE, salaires nets
                    mensuels temps plein.
                  </p>

                  <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {chiffres.map((c) => (
                      <li
                        key={c.label}
                        className="flex flex-col gap-1 rounded-xl border border-border bg-background p-5"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {c.label}
                        </span>
                        <span className="text-2xl font-bold tabular-nums text-primary">
                          {c.value}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {c.note}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-xs italic text-muted-foreground">
                    Source : INSEE DADS 2023, salaires nets mensuels des
                    salari&eacute;s &agrave; temps plein du secteur
                    priv&eacute;.
                  </p>
                </div>
              </section>

              <section id="comprendre" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge>
                      <CalculatorIcon className="h-4 w-4" />
                    </IconBadge>
                    Comment lire un percentile ?
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    En trois &eacute;tapes simples, comprenez ce que signifie
                    votre position dans la distribution.
                  </p>

                  <ol className="mt-8 grid gap-4 md:grid-cols-3">
                    {etapesPercentile.map((step) => (
                      <li
                        key={step.n}
                        className="group flex flex-col gap-4 rounded-xl border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                      >
                        <div
                          aria-hidden
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-sm"
                        >
                          {step.n}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {step.t}
                          </h3>
                          <p className="mt-1 text-base leading-relaxed text-foreground/80">
                            {step.d}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section id="faq" className="scroll-mt-24">
                <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                  <IconBadge>
                    <MessageCircleIcon className="h-4 w-4" />
                  </IconBadge>
                  Questions fr&eacute;quentes
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                  Les questions qu&apos;on nous pose le plus souvent sur les
                  percentiles de salaire.
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  {faq.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-foreground">
                        <span>{item.q}</span>
                        <span
                          aria-hidden
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xl text-primary transition group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-4 text-base leading-relaxed text-foreground/80">
                        {item.r}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              <section id="sources" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-2xl font-bold tracking-tight text-foreground">
                    <IconBadge>
                      <ExternalLinkIcon className="h-4 w-4" />
                    </IconBadge>
                    Sources
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Les donn&eacute;es utilis&eacute;es dans ce simulateur
                    proviennent exclusivement de publications officielles.
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {sources.map((s) => (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary underline-offset-4 transition hover:underline"
                        >
                          {s.label}
                          <span aria-hidden className="ml-1 text-xs">
                            &nearr;
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs italic text-muted-foreground">
                    Derni&egrave;re mise &agrave; jour : avril 2026. Calcul
                    indicatif. Pour une &eacute;valuation pr&eacute;cise de
                    votre r&eacute;mun&eacute;ration, consultez un conseiller
                    en ressources humaines ou un expert-comptable.
                  </p>
                </div>
              </section>
            </div>

            <TocSidebar items={tocItems} />
          </div>
        </PercentileProvider>
      </div>
    </>
  );
}
