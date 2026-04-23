import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  CalculatorIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  BarChartIcon,
  InfoIcon,
  LightbulbIcon,
  ShieldIcon,
} from "@/components/icons";
import NetImpotApercuCard from "@/components/simulateurs/NetImpotApercuCard";
import { NetImpotProvider } from "@/components/simulateurs/NetImpotContext";
import NetApresImpotSimulator from "@/components/simulateurs/NetApresImpotSimulator";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title:
    "Simulateur Net après impôt 2026 — Prélèvement à la source | Salairia",
  description:
    "Calculez votre salaire net après prélèvement à la source (PAS) en 2026. Barème taux neutre officiel ou taux personnalisé. Résultat instantané, mensuel et annuel.",
  alternates: { canonical: "/simulateurs/net-apres-impot" },
  openGraph: {
    title:
      "Simulateur Net après impôt 2026 — Prélèvement à la source | Salairia",
    description:
      "Calculez votre salaire net après prélèvement à la source (PAS) en 2026. Barème taux neutre officiel ou taux personnalisé. Résultat instantané, mensuel et annuel.",
    url: "/simulateurs/net-apres-impot",
  },
};

const faq = [
  {
    q: "Comment connaître mon taux de prélèvement à la source ?",
    r: "Votre taux de PAS figure sur votre dernier avis d\u2019imposition, sur votre espace personnel impots.gouv.fr (rubrique « Gérer mon prélèvement à la source ») et sur chaque fiche de paie. Si vous ne le connaissez pas encore, utilisez le mode « taux neutre » de notre simulateur pour obtenir une première estimation.",
  },
  {
    q: "Quelle est la différence entre taux neutre et taux personnalisé ?",
    r: "Le taux neutre (ou taux par défaut) est calculé à partir d\u2019une grille officielle qui ne tient compte que du montant de votre salaire net imposable. Le taux personnalisé, lui, est calculé par l\u2019administration fiscale à partir de votre dernière déclaration de revenus : il prend en compte votre situation familiale, vos autres revenus et vos charges déductibles. Le taux personnalisé est donc plus précis.",
  },
  {
    q: "Le prélèvement à la source change-t-il mon impôt total ?",
    r: "Non. Le prélèvement à la source est un mode de recouvrement, pas un impôt supplémentaire. Il étale le paiement de votre impôt sur le revenu tout au long de l\u2019année. Le montant total de l\u2019impôt reste le même : si trop a été prélevé, vous recevez un remboursement ; si pas assez, vous payez un complément lors de la régularisation en septembre.",
  },
  {
    q: "Mon employeur connaît-il mes revenus avec le taux personnalisé ?",
    r: "Non. L\u2019administration fiscale transmet uniquement le taux à votre employeur, pas le détail de vos revenus ni votre situation familiale. Votre employeur ne sait pas si votre taux vient de revenus fonciers, d\u2019un conjoint ou d\u2019une autre source. Si vous préférez ne rien révéler, vous pouvez opter pour le taux neutre (individualisé) directement sur impots.gouv.fr.",
  },
  {
    q: "Comment modifier mon taux de prélèvement à la source ?",
    r: "Connectez-vous à votre espace personnel sur impots.gouv.fr, rubrique « Gérer mon prélèvement à la source ». Vous pouvez y déclarer un changement de situation (mariage, naissance, divorce), actualiser vos revenus estimés ou opter pour le taux individualisé. La modification prend effet dans un délai de un à trois mois selon votre employeur.",
  },
];

const etapes = [
  {
    n: 1,
    icon: <CalculatorIcon className="h-5 w-5" />,
    t: "Votre net imposable",
    d: "Le net imposable mensuel est la base de calcul du prélèvement à la source. Il figure sur votre fiche de paie, juste au-dessus de la ligne « Net à payer avant impôt ».",
  },
  {
    n: 2,
    icon: <BarChartIcon className="h-5 w-5" />,
    t: "Application du taux",
    d: "L\u2019administration applique votre taux de PAS (neutre ou personnalisé) à votre net imposable. Le résultat est le montant prélevé chaque mois sur votre salaire.",
  },
  {
    n: 3,
    icon: <ShieldIcon className="h-5 w-5" />,
    t: "Net après impôt",
    d: "Votre salaire net après impôt (le montant viré sur votre compte) est simplement : net avant impôt − montant du PAS. C\u2019est ce montant que notre simulateur affiche.",
  },
];

const sourcesLinks = [
  {
    label: "impots.gouv.fr — prélèvement à la source",
    href: "https://www.impots.gouv.fr",
  },
  {
    label: "BOFiP — barème du taux neutre",
    href: "https://bofip.impots.gouv.fr",
  },
  {
    label: "service-public.fr — comprendre le PAS",
    href: "https://www.service-public.fr",
  },
];

const tocItems = [
  { id: "simulateur", label: "Simulateur" },
  { id: "etapes", label: "Comprendre le PAS" },
  { id: "bareme", label: "Barème taux neutre" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function NetApresImpotPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Simulateur Net après impôt 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      description:
        "Calculez votre salaire net après prélèvement à la source avec le barème taux neutre 2026 ou votre taux personnalisé.",
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
          name: "Net après impôt",
          item: `${SITE_URL}/simulateurs/net-apres-impot`,
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
        <NetImpotProvider>
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
                <span className="text-foreground">Net après impôt</span>
              </nav>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
                <CalendarIcon className="h-3.5 w-3.5" />
                À jour avril 2026
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Simulateur Net après impôt 2026
              </h1>
              <p className="mt-3 text-2xl font-semibold text-accent sm:text-3xl">
                Combien il te reste vraiment après le prélèvement à la source
              </p>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  Depuis janvier 2019, l&apos;impôt sur le revenu est prélevé
                  directement sur votre salaire chaque mois. Le montant retenu
                  dépend de votre taux de prélèvement à la source (PAS), qui
                  peut être le taux neutre officiel ou votre taux personnalisé
                  calculé par l&apos;administration fiscale.
                </p>
                <p>
                  Ce simulateur vous permet de visualiser instantanément votre
                  salaire net après impôt, avec le barème taux neutre 2026 ou
                  votre propre taux. Les tranches sont issues du BOFiP,
                  vérifiées sur impots.gouv.fr.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <NetImpotApercuCard />
            </div>
          </section>

          <div className="mt-16 flex gap-12">
            <div className="min-w-0 flex-1 space-y-16">
              <NetApresImpotSimulator />

              <section id="etapes" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge>
                      <CalculatorIcon className="h-4 w-4" />
                    </IconBadge>
                    Comprendre le prélèvement à la source en 3 étapes
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Du net avant impôt au net après impôt : voici comment le
                    PAS transforme votre salaire.
                  </p>

                  <ol className="mt-8 grid gap-4 md:grid-cols-3">
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

              <section id="bareme" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge>
                      <BarChartIcon className="h-4 w-4" />
                    </IconBadge>
                    Barème taux neutre 2026
                  </h2>

                  <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                    <p>
                      Le taux neutre (aussi appelé taux par défaut ou taux non
                      personnalisé) est une grille progressive publiée chaque
                      année par l&apos;administration fiscale. Il s&apos;applique
                      automatiquement si vous n&apos;avez pas encore de taux
                      personnalisé, par exemple lors d&apos;un premier emploi ou
                      si vous en faites la demande.
                    </p>
                    <p>
                      Ce taux ne tient compte que du montant de votre salaire
                      net imposable mensuel, sans considérer votre situation
                      familiale ni vos autres revenus. Il est donc souvent
                      moins avantageux que le taux personnalisé pour les
                      couples avec un seul revenu ou les foyers avec enfants.
                    </p>
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                    <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm text-foreground/80">
                      Si le taux neutre conduit à un prélèvement insuffisant
                      par rapport à votre impôt réel, vous devrez verser un
                      complément lors de la régularisation annuelle (septembre).
                      Inversement, un trop-perçu vous sera remboursé.
                    </p>
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4">
                    <LightbulbIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm text-foreground/80">
                      Pour obtenir un taux plus proche de votre impôt réel,
                      connectez-vous à impots.gouv.fr et activez votre taux
                      personnalisé. C&apos;est gratuit et modifiable à tout moment.
                    </p>
                  </div>
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
                  Les questions les plus courantes sur le prélèvement à la
                  source.
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
                    basée sur le barème taux neutre métropole 2026. Le montant
                    exact dépend de votre situation fiscale (revenus du foyer,
                    nombre de parts, charges déductibles). Consultez votre
                    espace impots.gouv.fr pour votre taux réel.
                  </p>
                </div>
              </section>
            </div>

            <TocSidebar items={tocItems} />
          </div>
        </NetImpotProvider>
      </div>
    </>
  );
}
