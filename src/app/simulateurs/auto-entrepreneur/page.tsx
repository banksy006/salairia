import type { Metadata } from "next";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  CalculatorIcon,
  AlertTriangleIcon,
  RocketIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import AEApercuCard from "@/components/simulateurs/AEApercuCard";
import { AEProvider } from "@/components/simulateurs/AEContext";
import AutoEntrepreneurSimulator from "@/components/simulateurs/AutoEntrepreneurSimulator";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title:
    "Simulateur Auto-entrepreneur 2026 : charges URSSAF, ACRE, TVA et revenu net",
  description:
    "Calculez précisément vos cotisations URSSAF d'auto-entrepreneur en 2026 selon votre catégorie (BIC/BNC). Intègre l'ACRE réduite à 25%, le versement libératoire et les plafonds TVA.",
  alternates: {
    canonical: "/simulateurs/auto-entrepreneur",
  },
  openGraph: {
    title:
      "Simulateur Auto-entrepreneur 2026 : charges URSSAF, ACRE, TVA et revenu net",
    description:
      "Calculez précisément vos cotisations URSSAF d'auto-entrepreneur en 2026 selon votre catégorie (BIC/BNC). Intègre l'ACRE réduite à 25%, le versement libératoire et les plafonds TVA.",
    url: "/simulateurs/auto-entrepreneur",
  },
};

const faq = [
  {
    q: "Quelle est la différence entre BIC et BNC ?",
    r: "BIC (Bénéfices Industriels et Commerciaux) concerne les activités commerciales et artisanales : vente de marchandises, restauration, hébergement (BIC Vente, taux URSSAF 12,3 %) ou prestations de services commerciales et artisanales (BIC Services, taux 21,2 %). BNC (Bénéfices Non Commerciaux) concerne les professions libérales : consultants, développeurs, coachs, formateurs, etc. (25,6 % en régime général ou 23,2 % pour les professions CIPAV). La catégorie est déterminée par la nature de votre activité, pas par votre choix.",
  },
  {
    q: "Quand dois-je quitter l'auto-entrepreneur ?",
    r: "Vous devez quitter le régime micro-entreprise si votre CA annuel dépasse le plafond de votre catégorie (83 600 € pour les services et BNC, 203 100 € pour la vente) deux années consécutives. Économiquement, il peut être avantageux de passer en SASU ou EURL plus tôt, dès que vos frais réels dépassent 30 % du CA (non déductibles en AE). Notre simulateur TJM Freelance vous aide à comparer les quatre statuts.",
  },
  {
    q: "L'ACRE a-t-elle encore un intérêt en 2026 ?",
    r: "Oui, mais moins qu'avant. Depuis le 1er janvier 2026, l'ACRE ne réduit plus les taux URSSAF de 50 % mais de 25 % seulement, pendant 12 mois. Pour un auto-entrepreneur BNC à 40 000 € de CA, l'économie est d'environ 2 560 € sur la première année (au lieu de 5 120 € avec l'ancien taux). L'ACRE reste intéressante, surtout pour le démarrage d'activité, mais l'économie est divisée par deux.",
  },
  {
    q: "Le versement libératoire est-il avantageux pour moi ?",
    r: "Le versement libératoire (VL) remplace l'impôt sur le revenu classique par un prélèvement proportionnel sur le CA : 1 % en BIC Vente, 1,7 % en BIC Services, 2,2 % en BNC. Il est avantageux si votre taux d'imposition marginal est supérieur à ces taux (donc si vous payez au moins 11 % d'IR). Attention : le VL est accessible uniquement si le revenu fiscal de référence du foyer ne dépasse pas un certain seuil (environ 28 800 € par part en 2026).",
  },
  {
    q: "À partir de quand dois-je facturer la TVA ?",
    r: "Vous bénéficiez de la franchise TVA tant que votre CA annuel reste sous 37 500 € (services et BNC) ou 85 000 € (vente). Au-delà, vous devez facturer la TVA à 20 % à vos clients. Un seuil de tolérance existe (41 250 € pour les services, 93 500 € pour la vente) : si vous le dépassez, la TVA s'applique dès le premier jour de l'année suivante. Important : la TVA collectée sur vos ventes est reversée à l'État, mais vous pouvez récupérer la TVA sur vos achats professionnels.",
  },
  {
    q: "Que se passe-t-il si je dépasse le plafond de CA ?",
    r: "Si vous dépassez le plafond une seule année, vous restez auto-entrepreneur l'année suivante. Si vous dépassez deux années consécutives, vous basculez automatiquement au régime réel (entreprise individuelle au réel, ou création d'une SASU/EURL). Ce basculement implique une comptabilité complète, un expert-comptable, et des cotisations calculées différemment. Anticipez en utilisant notre simulateur TJM Freelance pour comparer dès maintenant.",
  },
];

const etapes = [
  {
    n: 1,
    t: "Identifier votre catégorie",
    d: "BIC vente, BIC services, BNC libéral ou BNC CIPAV. Chaque catégorie a son taux URSSAF et ses plafonds propres.",
  },
  {
    n: 2,
    t: "Cotisations URSSAF",
    d: "Calculées en % du CA encaissé. Le taux varie de 12,3 % (vente) à 25,6 % (BNC libéral). C'est la part la plus importante des charges.",
  },
  {
    n: 3,
    t: "CFP",
    d: "Contribution Formation Professionnelle, 0,1 % à 0,3 % du CA selon votre catégorie. Vous ouvre des droits au CPF.",
  },
  {
    n: 4,
    t: "ACRE (optionnel)",
    d: "Réduction de 25 % des taux URSSAF pendant 12 mois la 1re année, sous conditions. Demande à faire dans les 45 jours après création.",
  },
  {
    n: 5,
    t: "Frais professionnels",
    d: "Contrairement à la SASU, les frais réels ne sont pas déductibles en auto-entrepreneur. Un abattement forfaitaire est appliqué automatiquement pour le calcul de l'impôt (34 % BNC, 50 % BIC services, 71 % BIC vente).",
  },
  {
    n: 6,
    t: "Impôt sur le revenu",
    d: "Soit intégré via le versement libératoire (1 % / 1,7 % / 2,2 %), soit calculé classiquement selon votre tranche après abattement forfaitaire.",
  },
];

const plafonds = [
  {
    cat: "BIC Vente de marchandises",
    plafond: "203 100 €",
    taux: "12,3 %",
    tva: "85 000 €",
  },
  {
    cat: "BIC Prestation de services",
    plafond: "83 600 €",
    taux: "21,2 %",
    tva: "37 500 €",
  },
  {
    cat: "BNC Profession libérale (régime général)",
    plafond: "83 600 €",
    taux: "25,6 %",
    tva: "37 500 €",
  },
  {
    cat: "BNC Profession libérale (CIPAV)",
    plafond: "83 600 €",
    taux: "23,2 %",
    tva: "37 500 €",
  },
];

const sourcesLinks = [
  {
    label: "URSSAF auto-entrepreneur",
    href: "https://www.autoentrepreneur.urssaf.fr",
  },
  {
    label: "economie.gouv.fr — cotisations sociales AE 2026",
    href: "https://www.economie.gouv.fr",
  },
  {
    label: "service-public.fr — régime micro-entrepreneur",
    href: "https://www.service-public.fr",
  },
  {
    label: "impots.gouv.fr — versement libératoire",
    href: "https://www.impots.gouv.fr",
  },
  {
    label: "BOSS.gouv.fr — référence sécurité sociale",
    href: "https://boss.gouv.fr",
  },
];

const tocItems = [
  { id: "simulateur", label: "Simulateur" },
  { id: "etapes", label: "Comprendre le calcul" },
  { id: "plafonds", label: "Plafonds et seuils" },
  { id: "passer-sasu", label: "Passer en SASU ?" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function AutoEntrepreneurPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Simulateur Auto-entrepreneur 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      description:
        "Simulateur gratuit pour calculer les charges URSSAF, l'ACRE et le revenu net d'un auto-entrepreneur en 2026.",
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
          name: "Auto-entrepreneur",
          item: "https://salairia.fr/simulateurs/auto-entrepreneur",
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
        <AEProvider>
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
                <span className="text-foreground">Auto-entrepreneur</span>
              </nav>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
                <CalendarIcon className="w-3.5 h-3.5" />
                À jour avril 2026
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Simulateur Auto-entrepreneur 2026
              </h1>
              <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
                Calculez vos charges et votre net
              </p>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  Combien de charges allez-vous payer en auto-entrepreneur
                  cette année ? Quel sera votre revenu net réel ? Ce
                  simulateur calcule précisément vos cotisations URSSAF,
                  votre CFP, l&apos;impact éventuel de l&apos;ACRE et du
                  versement libératoire, pour toutes les catégories
                  d&apos;activités.
                </p>
                <p>
                  BIC vente, BIC services, BNC libéral, BNC CIPAV : les taux
                  2026 utilisés ici sont les taux officiels vérifiés sur les
                  sources URSSAF et economie.gouv.fr.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <AEApercuCard />
            </div>
          </section>

          <div className="mt-16 flex gap-12">
            <div className="min-w-0 flex-1 space-y-16">
              <AutoEntrepreneurSimulator />

              <section id="etapes" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
                    Comprendre le calcul en auto-entrepreneur
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Les 6 étapes qui transforment votre chiffre d&apos;affaires
                    en revenu net disponible. Chaque catégorie a ses propres
                    taux.
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

              <section id="plafonds" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
                    Plafonds et seuils 2026
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Tableau récapitulatif des 4 catégories d&apos;activités
                    auto-entrepreneur.
                  </p>

                  <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <tr>
                          <th className="px-6 py-4">Catégorie</th>
                          <th className="whitespace-nowrap px-6 py-4 text-right">
                            Plafond CA
                          </th>
                          <th className="whitespace-nowrap px-6 py-4 text-right">
                            Taux URSSAF
                          </th>
                          <th className="whitespace-nowrap px-6 py-4 text-right">
                            Seuil TVA
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {plafonds.map((p) => (
                          <tr
                            key={p.cat}
                            className="border-b border-border last:border-b-0"
                          >
                            <td className="px-6 py-4 font-semibold text-foreground">
                              {p.cat}
                            </td>
                            <td className="px-6 py-4 text-right tabular-nums text-foreground/80">
                              {p.plafond}
                            </td>
                            <td className="px-6 py-4 text-right tabular-nums text-foreground/80">
                              {p.taux}
                            </td>
                            <td className="px-6 py-4 text-right tabular-nums text-foreground/80">
                              {p.tva}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-6 text-sm text-muted-foreground">
                    Ces plafonds sont valables pour 2026 et jusqu&apos;à fin
                    2028. Les dépasser 2 années consécutives entraîne la
                    sortie du régime micro-entreprise.
                  </p>
                </div>
              </section>

              <section id="passer-sasu" className="scroll-mt-24">
                <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-md sm:p-12">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><RocketIcon className="w-4 h-4" /></IconBadge>
                    Quand passer de l&apos;auto-entrepreneur à la SASU ?
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
                    L&apos;auto-entrepreneur est simple mais plafonné. À
                    partir d&apos;un certain niveau de CA, la SASU devient
                    plus avantageuse fiscalement et socialement.
                  </p>

                  <ul className="mt-6 flex flex-col gap-2 text-base">
                    {[
                      "Votre CA approche ou dépasse 60 000 € (BNC/services) ou 150 000 € (vente)",
                      "Vos frais professionnels réels dépassent 30 % de votre CA (non déductibles en AE)",
                      "Vous voulez pouvoir vous verser des dividendes",
                      "Vous avez un projet d'embauche ou de développement",
                      "Vous voulez une protection sociale plus complète (indemnités journalières, retraite)",
                    ].map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-foreground/80"
                      >
                        <span
                          aria-hidden
                          className="mt-0.5 font-bold text-accent"
                        >
                          ✓
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/simulateurs/tjm-freelance"
                    className="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Comparer AE vs SASU vs EURL →
                  </Link>
                </div>
              </section>

              <section id="faq" className="scroll-mt-24">
                <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                  <IconBadge><MessageCircleIcon className="w-4 h-4" /></IconBadge>
                  Questions fréquentes
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                  Les questions qu&apos;on nous pose le plus souvent sur le
                  régime auto-entrepreneur.
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
                    <IconBadge><ExternalLinkIcon className="w-4 h-4" /></IconBadge>
                    Sources
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Les taux utilisés dans ce simulateur proviennent
                    exclusivement de sources officielles.
                  </p>
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
                    Dernière mise à jour : avril 2026. Calculs indicatifs
                    basés sur les taux 2026 officiels URSSAF. Pour votre
                    situation personnelle (ACRE restante, DOM-TOM, CIPAV
                    spécifique), vérifiez sur autoentrepreneur.urssaf.fr ou
                    consultez un expert-comptable.
                  </p>
                </div>
              </section>
            </div>

            <TocSidebar items={tocItems} />
          </div>
        </AEProvider>
      </div>
    </>
  );
}
