import type { Metadata } from "next";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  CalculatorIcon,
  CoinIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  RocketIcon,
} from "@/components/icons";
import TJMApercuCard from "@/components/simulateurs/TJMApercuCard";
import { TJMProvider } from "@/components/simulateurs/TJMContext";
import TJMSimulator from "@/components/simulateurs/TJMSimulator";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title:
    "Simulateur TJM Freelance 2026 : quel tarif facturer ? (4 statuts comparés)",
  description:
    "Calculez le TJM idéal pour atteindre votre revenu net cible. Comparaison auto-entrepreneur, portage salarial, SASU et EURL avec les taux 2026.",
  alternates: {
    canonical: "/simulateurs/tjm-freelance",
  },
  openGraph: {
    title:
      "Simulateur TJM Freelance 2026 : quel tarif facturer ? (4 statuts comparés)",
    description:
      "Calculez le TJM idéal pour atteindre votre revenu net cible. Comparaison auto-entrepreneur, portage salarial, SASU et EURL avec les taux 2026.",
    url: "/simulateurs/tjm-freelance",
  },
};

const faq = [
  {
    q: "Quel est le meilleur statut pour démarrer en freelance ?",
    r: "Pour démarrer, l'auto-entrepreneur (micro-BNC) est presque toujours le meilleur choix : démarches en 10 minutes, cotisations simples (21,8 % en 2026), comptabilité minimale. Tant que votre CA annuel reste sous 77 700 € et que vous n'avez pas de gros frais professionnels, vous gardez la majorité de ce que vous facturez. Dès que vous dépassez ces seuils ou souhaitez déduire des frais importants (matériel, local, voiture), il devient pertinent de passer en SASU, EURL ou portage salarial.",
  },
  {
    q: "À partir de quel CA dois-je quitter l'auto-entrepreneur ?",
    r: "Techniquement, vous devez quitter le régime micro-BNC dès que votre chiffre d'affaires dépasse 77 700 € sur deux années consécutives. Économiquement, le calcul mérite d'être fait plus tôt : au-delà de 60 000 à 70 000 € de CA annuel, la SASU ou l'EURL deviennent souvent plus avantageuses grâce à la déduction des frais réels (matériel, comptable, local). Utilisez notre simulateur en mode « TJM cible » pour comparer.",
  },
  {
    q: "Comment passer de l'auto-entrepreneur à la SASU ?",
    r: "Il faut créer la société (SASU ou EURL) puis radier la micro-entreprise. La création de SASU coûte environ 200 à 400 € (publication annonce légale, greffe) + les honoraires du prestataire (Legalstart, Captain Contrat) ou de l'expert-comptable si vous en prenez un. Comptez 3 à 4 semaines de délai. La radiation de la micro est gratuite et se fait en ligne sur le guichet unique INPI.",
  },
  {
    q: "Quelle est la différence entre SASU et EURL ?",
    r: "La différence principale est le régime social : en SASU le président est assimilé salarié (régime général, ~65 % de cotisations totales mais meilleure protection sociale et droits retraite) ; en EURL le gérant est TNS (Travailleur Non Salarié, ~45 % de cotisations, protection plus limitée, surtout sur le chômage et la prévoyance). La SASU est souvent préférée pour son confort social ; l'EURL pour son coût plus faible quand le dirigeant se verse une petite rémunération et garde du cash dans la société.",
  },
  {
    q: "Combien faut-il facturer pour gagner 3 000 € net par mois ?",
    r: "Soit 36 000 € nets annuels. En auto-entrepreneur avec 18 jours facturables par mois et 200 € de frais pro mensuels, il faut environ 230 € de TJM (soit 49 700 € de CA HT annuel). En portage salarial, comptez plutôt 430 € de TJM pour le même net (93 000 € de CA). Utilisez notre simulateur en mode « Net cible » avec 36 000 € pour obtenir la réponse précise selon vos paramètres personnels.",
  },
  {
    q: "Le portage salarial est-il rentable par rapport à la SASU ?",
    r: "En termes de net pur, non : le portage salarial ponctionne environ 58 à 62 % du CA (frais de gestion + charges patronales + charges salariales), contre 48 à 52 % en SASU. Mais le portage offre un confort administratif total (pas de compta à gérer), des droits au chômage, et permet d'accepter des missions qui exigent un statut salarié. Pour un freelance qui veut se concentrer 100 % sur son métier, c'est un arbitrage coût/simplicité.",
  },
];

const etapes = [
  {
    n: 1,
    t: "Définir votre objectif",
    d: "Soit vous partez d'un net annuel cible (ex. 50 000 € nets), soit vous partez d'un TJM facturé (ex. 500 € / jour). Le simulateur fonctionne dans les deux sens.",
  },
  {
    n: 2,
    t: "Calcul du chiffre d'affaires",
    d: "CA HT annuel = TJM × jours travaillés par mois × 12. Les « jours travaillés » excluent les congés, jours fériés et intercontrats.",
  },
  {
    n: 3,
    t: "Déduction des cotisations",
    d: "Elles varient fortement selon le statut : 21,8 % en auto-entrepreneur, ~45 % en EURL (TNS), ~55 % en SASU (assimilé salarié), ~60 % en portage salarial.",
  },
  {
    n: 4,
    t: "Soustraction des frais pro",
    d: "Matériel, logiciels, local, téléphone, comptable. Déductibles en SASU, EURL et portage. Non déductibles en auto-entrepreneur (frais forfaitaires via l'abattement).",
  },
  {
    n: 5,
    t: "Détermination du net",
    d: "Ce qui reste effectivement disponible, avant impôt sur le revenu. C'est la ligne « Net annuel » de notre tableau comparatif.",
  },
  {
    n: 6,
    t: "Application du PAS",
    d: "Le prélèvement à la source (PAS) est retenu directement. Pour l'estimer, utilisez votre taux personnel (disponible sur impots.gouv.fr).",
  },
];

const secteurs = [
  {
    secteur: "Tech / IT",
    revenu: "60 000 – 100 000 €",
    tjm: "500 – 800 €",
  },
  {
    secteur: "Conseil / management",
    revenu: "55 000 – 90 000 €",
    tjm: "600 – 1 200 €",
  },
  {
    secteur: "Création / design",
    revenu: "35 000 – 60 000 €",
    tjm: "350 – 600 €",
  },
  {
    secteur: "Communication / marketing",
    revenu: "40 000 – 65 000 €",
    tjm: "400 – 700 €",
  },
  {
    secteur: "Rédaction / traduction",
    revenu: "30 000 – 50 000 €",
    tjm: "300 – 500 €",
  },
];

const partners = [
  {
    category: "Société de portage",
    desc: "ITG, Cadres en Mission, OpenWork, ABC Portage, CEGELEM.",
    ctaLabel: "Voir notre comparatif portage",
    href: "/simulateurs/portage-salarial",
    internal: true,
  },
  {
    category: "Compte bancaire pro",
    desc: "Qonto, Shine, Propulse — essentiel dès la création d'une SASU ou EURL.",
    ctaLabel: "Découvrir Qonto",
    href: "https://www.qonto.com",
    internal: false,
  },
  {
    category: "Comptabilité freelance",
    desc: "Indy, L-Expert-Comptable, Dougs — automatisation de la compta et des déclarations.",
    ctaLabel: "Découvrir Indy",
    href: "https://www.indy.fr",
    internal: false,
  },
  {
    category: "Création de société",
    desc: "Legalstart, Captain Contrat, Indy — SASU / EURL en quelques clics.",
    ctaLabel: "Découvrir Legalstart",
    href: "https://www.legalstart.fr",
    internal: false,
  },
];

const sources = [
  {
    label: "URSSAF — cotisations indépendants 2026",
    href: "https://www.urssaf.fr",
  },
  {
    label: "BOSS.gouv.fr — Bulletin officiel de la Sécurité sociale",
    href: "https://boss.gouv.fr",
  },
  {
    label: "Legifrance — statuts juridiques et codes",
    href: "https://www.legifrance.gouv.fr",
  },
  {
    label: "Service-Public.fr — régimes BNC, SASU, EURL",
    href: "https://www.service-public.fr",
  },
  {
    label: "INSEE — statistiques travailleurs indépendants",
    href: "https://www.insee.fr",
  },
  {
    label: "DARES — études travailleurs indépendants",
    href: "https://dares.travail-emploi.gouv.fr",
  },
];

const tocItems = [
  { id: "simulateur", label: "Simulateur" },
  { id: "comparatif", label: "Comparatif statuts" },
  { id: "services", label: "Choisir une solution" },
  { id: "etapes", label: "Comprendre le calcul" },
  { id: "combien", label: "Revenus moyens" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function TJMFreelancePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Simulateur TJM Freelance 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      description:
        "Simulateur gratuit pour calculer le TJM d'un freelance selon son revenu net cible, avec comparaison auto-entrepreneur, portage, SASU et EURL.",
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
          name: "TJM Freelance",
          item: "https://salairia.fr/simulateurs/tjm-freelance",
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
        <TJMProvider>
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
                <span className="text-foreground">TJM Freelance</span>
              </nav>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
                <CalendarIcon className="w-3.5 h-3.5" />
                À jour avril 2026
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Simulateur TJM Freelance 2026
              </h1>
              <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
                Quel tarif facturer ?
              </p>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  Quel tarif journalier moyen dois-je facturer pour atteindre
                  50 000 € nets par an ? Faut-il choisir
                  l&apos;auto-entrepreneur, le portage, la SASU ou
                  l&apos;EURL ? Ce simulateur compare automatiquement les
                  quatre statuts les plus courants pour les freelances
                  français, avec les taux 2026.
                </p>
                <p>
                  Indiquez soit votre revenu net cible, soit votre TJM, et
                  obtenez instantanément la comparaison la plus rentable pour
                  votre situation. Taux issus de l&apos;URSSAF, de BOSS.gouv.fr
                  et de Legifrance.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <TJMApercuCard />
            </div>
          </section>

          <div className="mt-16 flex gap-12">
            <div className="min-w-0 flex-1 space-y-16">
              <TJMSimulator />

              <section id="services" className="scroll-mt-24">
                <div className="rounded-2xl bg-muted/50 p-6 sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><RocketIcon className="w-4 h-4" /></IconBadge>
                    Choisir votre solution
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Vous avez identifié le statut qui vous convient ? Voici
                    les services partenaires les plus utilisés par les
                    freelances français en 2026.
                  </p>

                  <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {partners.map((p) => (
                      <li
                        key={p.category}
                        className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-6 shadow-sm"
                      >
                        <h3 className="text-lg font-bold text-foreground">
                          {p.category}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {p.desc}
                        </p>
                        {p.internal ? (
                          <Link
                            href={p.href}
                            className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary transition hover:underline"
                          >
                            {p.ctaLabel} →
                          </Link>
                        ) : (
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary transition hover:underline"
                          >
                            {p.ctaLabel} ↗
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-sm italic text-muted-foreground">
                    Salairia est un projet éditorial indépendant. Ces services
                    sont sélectionnés sur la base de leur popularité auprès
                    des freelances français en 2026 et de critères objectifs
                    (frais, services inclus, qualité de
                    l&apos;accompagnement).
                  </p>
                </div>
              </section>

              <section id="etapes" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
                    Comprendre le calcul du TJM
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Voici les 6 étapes qui transforment votre chiffre
                    d&apos;affaires en revenu net disponible. Les taux
                    diffèrent selon le statut choisi.
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

              <section id="combien" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><CoinIcon className="w-4 h-4" /></IconBadge>
                    Combien gagne un freelance en France ?
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
                    Selon les données INSEE et DARES 2024-2025 (les plus
                    récentes disponibles), le revenu médian d&apos;un
                    freelance français en activité depuis plus de 3 ans se
                    situe entre 40 000 € et 70 000 € nets annuels selon le
                    secteur :
                  </p>

                  <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <tr>
                          <th className="px-6 py-4">Secteur</th>
                          <th className="whitespace-nowrap px-6 py-4">
                            Revenu net annuel
                          </th>
                          <th className="whitespace-nowrap px-6 py-4">
                            TJM moyen
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {secteurs.map((s) => (
                          <tr
                            key={s.secteur}
                            className="border-b border-border last:border-b-0"
                          >
                            <td className="px-6 py-4 font-semibold text-foreground">
                              {s.secteur}
                            </td>
                            <td className="px-6 py-4 tabular-nums text-foreground/80">
                              {s.revenu}
                            </td>
                            <td className="px-6 py-4 tabular-nums text-foreground/80">
                              {s.tjm}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                    Ces chiffres varient fortement selon
                    l&apos;expérience, la spécialisation et la zone
                    géographique. Sources : INSEE (études économiques
                    freelance), DARES (enquête travailleurs indépendants).
                  </p>
                </div>
              </section>

              <section id="faq" className="scroll-mt-24">
                <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                  <IconBadge><MessageCircleIcon className="w-4 h-4" /></IconBadge>
                  Questions fréquentes
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                  Les questions qu&apos;on nous pose le plus souvent sur le
                  choix du TJM et du statut freelance.
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
                    Les taux et données utilisés dans ce simulateur
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
                            ↗
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs italic text-muted-foreground">
                    Dernière mise à jour : avril 2026. Calcul indicatif.
                    Pour une optimisation fiscale précise, consultez un
                    expert-comptable.
                  </p>
                </div>
              </section>
            </div>

            <TocSidebar items={tocItems} />
          </div>
        </TJMProvider>
      </div>
    </>
  );
}
