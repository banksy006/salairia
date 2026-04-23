import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  CalculatorIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  ScaleIcon,
} from "@/components/icons";
import BrutNetApercuCard from "@/components/simulateurs/BrutNetApercuCard";
import { BrutNetProvider } from "@/components/simulateurs/BrutNetContext";
import SalaireBrutNetSimulator from "@/components/simulateurs/SalaireBrutNetSimulator";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title:
    "Simulateur Salaire Brut Net 2026 — Cadre et non-cadre, mensuel et annuel",
  description:
    "Convertissez instantanément votre salaire brut en net ou net en brut. Cotisations 2026 à jour (sécurité sociale, AGIRC-ARRCO, CSG/CRDS). Mode cadre/non-cadre et prélèvement à la source.",
  alternates: { canonical: "/simulateurs/salaire-brut-net" },
  openGraph: {
    title:
      "Simulateur Salaire Brut Net 2026 — Cadre et non-cadre, mensuel et annuel",
    description:
      "Convertissez instantanément votre salaire brut en net ou net en brut. Cotisations 2026 à jour (sécurité sociale, AGIRC-ARRCO, CSG/CRDS). Mode cadre/non-cadre et prélèvement à la source.",
    url: "/simulateurs/salaire-brut-net",
  },
};

const faq = [
  {
    q: "Quelle est la différence entre salaire brut et salaire net ?",
    r: "Le salaire brut est le montant inscrit sur votre contrat de travail, avant toute déduction. Le salaire net est ce que vous recevez effectivement sur votre compte bancaire, après déduction des cotisations salariales (sécurité sociale, retraite complémentaire, CSG/CRDS). En France en 2026, un salarié non-cadre conserve environ 78 % de son brut ; un cadre environ 77 %.",
  },
  {
    q: "Comment passer du net au brut ?",
    r: "La formule exacte dépend de votre tranche de salaire (certaines cotisations sont plafonnées au PASS). En première approximation : brut ≈ net / 0,78 pour un non-cadre, net / 0,77 pour un cadre. Notre simulateur en mode « Net → Brut » utilise un calcul itératif précis qui tient compte de tous les seuils.",
  },
  {
    q: "Pourquoi mon net est différent de ce que me donne ce simulateur ?",
    r: "Plusieurs raisons possibles : votre convention collective prévoit des cotisations spécifiques (mutuelle obligatoire, prévoyance), votre entreprise applique un taux de cotisation AT/MP différent du taux moyen, ou vous avez des avantages en nature. Ce simulateur utilise les taux moyens 2026 et constitue une estimation. Votre fiche de paie reste la référence.",
  },
  {
    q: "Le prélèvement à la source est-il inclus dans le net affiché sur ma fiche de paie ?",
    r: "Votre fiche de paie affiche deux lignes distinctes : le « net à payer avant impôt » (c'est le net classique, après cotisations) et le « net à payer après PAS » (après déduction de l'impôt). Le « salaire net » au sens courant est généralement le net avant impôt. Notre simulateur calcule les deux.",
  },
  {
    q: "Les cotisations sont-elles les mêmes pour un cadre et un non-cadre ?",
    r: "Depuis la fusion AGIRC-ARRCO en 2019, les taux de retraite complémentaire sont identiques pour tous les salariés. La principale différence pour un cadre est la cotisation APEC (0,024 % salariale) et la prévoyance obligatoire (minimum 1,50 % patronale sur la tranche 1). En pratique, l'écart de net entre cadre et non-cadre est faible : environ 0,5 à 1 point de pourcentage.",
  },
  {
    q: "Comment connaître mon taux de prélèvement à la source ?",
    r: "Votre taux de PAS est visible sur votre dernier avis d'imposition, sur votre espace personnel impots.gouv.fr (rubrique « Gérer mon prélèvement à la source »), et sur chaque fiche de paie. Si vous ne le connaissez pas, laissez le curseur à 0 % dans notre simulateur pour obtenir le net avant impôt, puis appliquez mentalement votre taux.",
  },
];

const etapes = [
  {
    n: 1,
    t: "Salaire brut",
    d: "Le montant inscrit sur votre contrat de travail, avant toute déduction. C'est la base de calcul de toutes vos cotisations.",
  },
  {
    n: 2,
    t: "Cotisations sécurité sociale",
    d: "Assurance vieillesse (retraite de base). Environ 7,3 % de votre brut. Elles financent votre future pension.",
  },
  {
    n: 3,
    t: "Retraite complémentaire",
    d: "Cotisations AGIRC-ARRCO obligatoires depuis la fusion de 2019. Environ 4 % sur la tranche 1 (jusqu'à 4 005 €/mois). Au-delà, le taux monte à ~10 %.",
  },
  {
    n: 4,
    t: "CSG / CRDS",
    d: "Contribution Sociale Généralisée et Contribution au Remboursement de la Dette Sociale. 9,7 % calculés sur 98,25 % de votre brut. La CSG déductible (6,8 %) réduit votre base imposable.",
  },
];

const sourcesLinks = [
  {
    label: "URSSAF — taux de cotisations 2026",
    href: "https://www.urssaf.fr",
  },
  {
    label: "LégiSocial — tableau cotisations sociales 2026",
    href: "https://www.legisocial.fr",
  },
  {
    label: "service-public.fr — comprendre sa fiche de paie",
    href: "https://www.service-public.fr",
  },
  {
    label: "impots.gouv.fr — prélèvement à la source",
    href: "https://www.impots.gouv.fr",
  },
  {
    label: "AGIRC-ARRCO — taux retraite complémentaire",
    href: "https://www.agirc-arrco.fr",
  },
];

const tocItems = [
  { id: "simulateur", label: "Simulateur" },
  { id: "etapes", label: "Comprendre le calcul" },
  { id: "cadre-vs-non-cadre", label: "Cadre vs Non-cadre" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function SalaireBrutNetPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Simulateur Salaire Brut Net 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      description:
        "Convertissez instantanément votre salaire brut en net ou net en brut avec les cotisations 2026.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.r },
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
          name: "Salaire brut/net",
          item: `${SITE_URL}/simulateurs/salaire-brut-net`,
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
        <BrutNetProvider>
          <section className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <nav
                aria-label="Fil d'Ariane"
                className="flex items-center gap-2 text-sm text-foreground/70"
              >
                <Link href="/" className="transition hover:text-primary">
                  Accueil
                </Link>
                <span aria-hidden>›</span>
                <Link
                  href="/simulateurs"
                  className="transition hover:text-primary"
                >
                  Simulateurs
                </Link>
                <span aria-hidden>›</span>
                <span className="text-foreground">Salaire brut/net</span>
              </nav>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
                <CalendarIcon className="h-3.5 w-3.5" />
                À jour avril 2026
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Simulateur Salaire Brut Net 2026
              </h1>
              <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
                Cadre et non-cadre, mensuel et annuel
              </p>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  Convertissez instantanément votre salaire brut en net, ou
                  votre net en brut. Ce simulateur intègre toutes les
                  cotisations salariales 2026 (sécurité sociale, retraite
                  complémentaire AGIRC-ARRCO, CSG/CRDS) et le prélèvement à
                  la source.
                </p>
                <p>
                  Disponible en mode cadre et non-cadre, mensuel et annuel.
                  Taux vérifiés sur les sources officielles URSSAF et
                  LégiSocial.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <BrutNetApercuCard />
            </div>
          </section>

          <div className="mt-16 flex gap-12">
            <div className="min-w-0 flex-1 space-y-16">
              <SalaireBrutNetSimulator />

              <section id="etapes" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge>
                      <CalculatorIcon className="h-4 w-4" />
                    </IconBadge>
                    Comprendre la conversion en 4 étapes
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Du brut au net : voici les déductions successives qui
                    transforment votre salaire contractuel en montant perçu.
                  </p>

                  <ol className="mt-8 grid gap-4 md:grid-cols-2">
                    {etapes.map((step) => (
                      <li
                        key={step.n}
                        className="group flex gap-4 rounded-xl border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
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

              <section id="cadre-vs-non-cadre" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge>
                      <ScaleIcon className="h-4 w-4" />
                    </IconBadge>
                    Cadre vs Non-cadre : quelle différence ?
                  </h2>

                  <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <tr>
                          <th className="px-6 py-4" />
                          <th className="px-6 py-4">Non-cadre</th>
                          <th className="px-6 py-4">Cadre</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Cotisation APEC", "Non", "Oui (0,024 %)"],
                          [
                            "Prévoyance obligatoire",
                            "Selon convention",
                            "Min 1,50 % T1 (employeur)",
                          ],
                          [
                            "Retraite complémentaire T1",
                            "Identique",
                            "Identique",
                          ],
                          ["Taux effectif global", "~22 %", "~23 %"],
                          [
                            "Net pour 3 000 € brut",
                            "~2 376 €",
                            "~2 352 €",
                          ],
                        ].map(([label, nc, c]) => (
                          <tr
                            key={label}
                            className="border-b border-border last:border-b-0"
                          >
                            <td className="px-6 py-4 font-semibold text-foreground">
                              {label}
                            </td>
                            <td className="px-6 py-4 text-foreground/80">
                              {nc}
                            </td>
                            <td className="px-6 py-4 text-foreground/80">
                              {c}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-6 text-sm text-muted-foreground">
                    Depuis la fusion AGIRC-ARRCO en 2019, les taux de
                    retraite complémentaire sont identiques pour tous les
                    salariés. La principale différence pour un cadre est la
                    cotisation APEC et la prévoyance obligatoire.
                  </p>
                </div>
              </section>

              <section id="faq" className="scroll-mt-24">
                <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                  <IconBadge>
                    <MessageCircleIcon className="h-4 w-4" />
                  </IconBadge>
                  Questions fréquentes
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                  Les questions les plus courantes sur le salaire brut et net.
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  {faq.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-foreground">
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
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {sourcesLinks.map((s) => (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary underline-offset-4 transition hover:underline"
                        >
                          {s.label}
                          <span aria-hidden className="ml-1 text-xs">
                            ↗
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs italic text-muted-foreground">
                    Dernière mise à jour : avril 2026. Estimation indicative
                    basée sur les taux moyens 2026. Le montant exact dépend
                    de votre convention collective, de votre mutuelle
                    d&apos;entreprise et de votre situation fiscale.
                    Consultez votre fiche de paie pour les montants exacts.
                  </p>
                </div>
              </section>
            </div>

            <TocSidebar items={tocItems} />
          </div>
        </BrutNetProvider>
      </div>
    </>
  );
}
