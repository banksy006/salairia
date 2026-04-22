import type { Metadata } from "next";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  CalculatorIcon,
  LightbulbIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  SearchIcon,
  TargetIcon,
  ShieldIcon,
  SparklesIcon,
} from "@/components/icons";
import NegociationApercuCard from "@/components/simulateurs/NegociationApercuCard";
import { NegociationProvider } from "@/components/simulateurs/NegociationContext";
import NegociationSimulator from "@/components/simulateurs/NegociationSimulator";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title:
    "Négociation salariale 2026 : estimez votre fourchette par métier | Salairia",
  description:
    "Découvrez la fourchette salariale de votre métier en 2026 (20 profils, IDF/Province, 4 niveaux). Comparez votre salaire au marché et préparez votre négociation.",
  alternates: {
    canonical: "/simulateurs/negociation-salariale",
  },
  openGraph: {
    title:
      "Négociation salariale 2026 : estimez votre fourchette par métier | Salairia",
    description:
      "Découvrez la fourchette salariale de votre métier en 2026 (20 profils, IDF/Province, 4 niveaux). Comparez votre salaire au marché et préparez votre négociation.",
    url: "/simulateurs/negociation-salariale",
  },
};

const faq = [
  {
    q: "D\u2019où viennent les données de salaires par métier ?",
    r: "Les fourchettes sont compilées à partir du Baromètre cadres APEC 2024, des statistiques INSEE (DADS / DSN), des données Glassdoor France et du guide des salaires Robert Half 2025. Ces sources couvrent les salaires bruts annuels de cadres et non-cadres en France métropolitaine. Nous les mettons à jour chaque année.",
  },
  {
    q: "Comment négocier une augmentation avec ces chiffres ?",
    r: "Commencez par identifier votre position : si vous êtes sous la fourchette, vous avez un argument objectif de rattrapage. Préparez un dossier avec vos réalisations concrètes (projets menés, CA généré, économies réalisées), ajoutez la fourchette marché comme référence externe, et demandez un entretien dédié à votre manager. Visez le haut de la fourchette si votre bilan le justifie.",
  },
  {
    q: "La fourchette inclut-elle les primes et avantages ?",
    r: "Non. Les fourchettes affichées concernent le salaire brut annuel fixe. Les primes variables (bonus, participation, intéressement), avantages en nature (voiture, tickets-restaurant) et épargne salariale ne sont pas inclus. En les ajoutant, votre rémunération totale est généralement 10 à 20 % supérieure au fixe brut.",
  },
  {
    q: "Pourquoi l\u2019écart Île-de-France / Province ?",
    r: "L\u2019écart reflète principalement le coût de la vie (logement, transports) et la concentration de sièges sociaux et d\u2019entreprises tech en région parisienne. En moyenne, les salaires en Île-de-France sont 10 à 20 % plus élevés que dans le reste de la France, selon l\u2019INSEE. Le télétravail tend à réduire cet écart, mais il reste significatif en 2026.",
  },
  {
    q: "Ces données s\u2019appliquent-elles aux freelances ?",
    r: "Pas directement. Les fourchettes concernent les salaires bruts annuels de salariés. Un freelance doit ajouter ses cotisations sociales, ses frais professionnels et sa marge. En règle générale, le TJM d\u2019un freelance correspond à 1,5 à 2 fois le salaire brut annuel équivalent divisé par 218 jours ouvrés. Utilisez notre simulateur TJM Freelance pour un calcul précis.",
  },
];

const etapes = [
  {
    n: 1,
    t: "Sélectionnez votre métier",
    d: "Choisissez parmi les 20 profils proposés. Les fourchettes sont spécifiques à chaque métier et reflètent les données du marché français.",
  },
  {
    n: 2,
    t: "Indiquez votre expérience et région",
    d: "Les salaires varient fortement selon le niveau d\u2019expérience (junior à expert) et la localisation (Île-de-France vs Province).",
  },
  {
    n: 3,
    t: "Comparez avec votre salaire actuel",
    d: "Entrez votre salaire brut annuel actuel. L\u2019outil vous indique si vous êtes dans, sous ou au-dessus de la fourchette du marché.",
  },
];

const conseils = [
  {
    icon: SearchIcon,
    titre: "Faites vos recherches",
    desc: "Arrivez avec des données chiffrées : fourchettes marché, benchmarks sectoriels. Un argument factuel vaut dix arguments émotionnels.",
  },
  {
    icon: CalendarIcon,
    titre: "Choisissez le bon timing",
    desc: "Privilégiez l\u2019entretien annuel, la fin d\u2019un projet réussi, ou une promotion. Évitez les périodes de gel budgétaire.",
  },
  {
    icon: TargetIcon,
    titre: "Négociez le package global",
    desc: "Si le fixe est bloqué, négociez le variable, les jours de télétravail, la formation, les RTT ou le titre de poste.",
  },
  {
    icon: ShieldIcon,
    titre: "Préparez votre BATNA",
    desc: "Ayez une alternative crédible (offre concurrente, projet freelance). La meilleure négociation, c\u2019est celle où vous pouvez dire non.",
  },
  {
    icon: SparklesIcon,
    titre: "La technique du silence",
    desc: "Après avoir annoncé votre demande, laissez un silence. La pression du vide pousse l\u2019autre partie à répondre, souvent en votre faveur.",
  },
];

const sources = [
  {
    label: "APEC — Baromètre cadres 2024",
    href: "https://www.apec.fr",
  },
  {
    label: "INSEE — DADS / DSN, statistiques salariales",
    href: "https://www.insee.fr",
  },
  {
    label: "Glassdoor France — données de salaires",
    href: "https://www.glassdoor.fr",
  },
  {
    label: "Robert Half — Guide des salaires 2025",
    href: "https://www.roberthalf.fr",
  },
];

const tocItems = [
  { id: "simulateur", label: "Simulateur" },
  { id: "utilisation", label: "Comment utiliser" },
  { id: "conseils", label: "Conseils négo" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function NegociationSalarialePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Simulateur Négociation salariale 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      description:
        "Estimez la fourchette salariale de votre métier en 2026. Comparez votre salaire actuel au marché et préparez votre négociation.",
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
          item: "https://salairia.fr/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Simulateurs",
          item: "https://salairia.fr/simulateurs",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Négociation salariale",
          item: "https://salairia.fr/simulateurs/negociation-salariale",
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
        <NegociationProvider>
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
                <span className="text-foreground">Négociation salariale</span>
              </nav>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
                <CalendarIcon className="h-3.5 w-3.5" />
                À jour avril 2026
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Négociation salariale 2026
              </h1>
              <p className="mt-3 text-2xl font-semibold text-accent sm:text-3xl">
                Estimez votre fourchette par métier et expérience
              </p>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  Vous préparez un entretien annuel, une embauche ou un
                  changement de poste ? Cet outil vous permet de situer votre
                  salaire brut annuel par rapport aux fourchettes du marché
                  français, pour 20 métiers courants.
                </p>
                <p>
                  Les données sont issues de l&apos;APEC, de l&apos;INSEE et de
                  Glassdoor, ventilées par niveau d&apos;expérience (junior à
                  expert) et par zone géographique (Île-de-France ou Province).
                  Vous saurez immédiatement si vous avez une marge de
                  négociation.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <NegociationApercuCard />
            </div>
          </section>

          <div className="mt-16 flex gap-12">
            <div className="min-w-0 flex-1 space-y-16">
              <NegociationSimulator />

              <section id="utilisation" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge>
                      <CalculatorIcon className="h-4 w-4" />
                    </IconBadge>
                    Comment utiliser cet outil
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Trois étapes suffisent pour connaître votre position sur le
                    marché.
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

              <section id="conseils" className="scroll-mt-24">
                <div className="rounded-2xl bg-muted/50 p-6 sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge>
                      <LightbulbIcon className="h-4 w-4" />
                    </IconBadge>
                    Conseils pour négocier
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Les 5 leviers qui font la différence lors d&apos;une
                    négociation salariale.
                  </p>

                  <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {conseils.map((c) => {
                      const Icon = c.icon;
                      return (
                        <li
                          key={c.titre}
                          className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </span>
                          <h3 className="text-lg font-bold text-foreground">
                            {c.titre}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {c.desc}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
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
                  Les questions les plus courantes sur la négociation salariale
                  et les données de marché.
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
                    Les fourchettes salariales utilisées dans cet outil
                    proviennent de publications reconnues.
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
                            ↗
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs italic text-muted-foreground">
                    Dernière mise à jour : avril 2026. Données indicatives.
                    Votre salaire réel dépend de votre entreprise, secteur et
                    compétences spécifiques.
                  </p>
                </div>
              </section>
            </div>

            <TocSidebar items={tocItems} />
          </div>
        </NegociationProvider>
      </div>
    </>
  );
}
