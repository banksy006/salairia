import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  CalculatorIcon,
  ScaleIcon,
  MessageCircleIcon,
  SparklesIcon,
  CompassIcon,
  BriefcaseIcon,
  RocketIcon,
  BuildingIcon,
  TargetIcon,
  ExternalLinkIcon,
  ShieldIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title:
    "Simulateurs de rémunération 2026 : portage, TJM, salaire net",
  description:
    "10 simulateurs gratuits pour calculer votre salaire net, TJM freelance, charges sociales et comparer les statuts (auto-entrepreneur, portage, SASU, EURL). Taux 2026.",
  alternates: {
    canonical: "/simulateurs",
  },
  openGraph: {
    title:
      "Simulateurs de rémunération 2026 : portage, TJM, salaire net | Salairia",
    description:
      "10 simulateurs gratuits pour calculer votre salaire net, TJM freelance, charges sociales et comparer les statuts (auto-entrepreneur, portage, SASU, EURL). Taux 2026.",
    url: "/simulateurs",
  },
};

interface SimulateurCard {
  nom: string;
  desc: string;
  motsCles: string;
  href: string;
  categorie: string;
}

const simulateurs: readonly SimulateurCard[] = [
  {
    nom: "Portage Salarial",
    desc: "Calculez votre salaire net en portage et comparez 9 sociétés.",
    motsCles:
      "salaire portage 500€, simulateur portage 2026, comparaison sociétés portage",
    href: "/simulateurs/portage-salarial",
    categorie: "Freelance",
  },
  {
    nom: "Salarié ou freelance ?",
    desc: "Votre net en CDI face à votre net en freelance (4 statuts), et le TJM exact à facturer pour ne rien perdre.",
    motsCles:
      "quitter son CDI pour devenir freelance, TJM équivalent salaire, salarié vs indépendant",
    href: "/simulateurs/salarie-ou-freelance",
    categorie: "Freelance",
  },
  {
    nom: "TJM Freelance",
    desc: "Quel TJM facturer pour atteindre votre revenu cible ? Comparaison auto-entrepreneur, portage, SASU et EURL.",
    motsCles:
      "calcul TJM freelance 2026, TJM développeur, TJM consultant",
    href: "/simulateurs/tjm-freelance",
    categorie: "Freelance",
  },
  {
    nom: "Auto-entrepreneur",
    desc: "Charges URSSAF, ACRE, TVA et revenu net pour micro-entrepreneurs et professions libérales.",
    motsCles:
      "charges auto-entrepreneur 2026, plafond AE, simulation micro-entreprise",
    href: "/simulateurs/auto-entrepreneur",
    categorie: "Auto-entrepreneur",
  },
  {
    nom: "SASU / EURL",
    desc: "Salaire vs dividendes, calcul IS, optimisation fiscale pour dirigeants assimilés salariés ou TNS.",
    motsCles: "SASU vs EURL, salaire dividende SASU, IS 2026",
    href: "/simulateurs/sasu-eurl",
    categorie: "Dirigeant",
  },
  {
    nom: "Salaire Brut/Net",
    desc: "Conversion instantanée brut↔net pour salariés du privé (cadres et non-cadres).",
    motsCles: "salaire brut net 2026, calcul fiche paie, smic net",
    href: "/simulateurs/salaire-brut-net",
    categorie: "Salarié",
  },
  {
    nom: "Net après impôt",
    desc: "Salaire net mensuel après prélèvement à la source selon votre taux personnalisé.",
    motsCles: "salaire net après impôt, prélèvement à la source 2026",
    href: "/simulateurs/net-apres-impot",
    categorie: "Tous statuts",
  },
  {
    nom: "Négociation salariale",
    desc: "Estimez votre marge de négociation à l'embauche selon votre métier et expérience.",
    motsCles: "négociation salaire, salaire à l'embauche, demander augmentation",
    href: "/simulateurs/negociation-salariale",
    categorie: "Salarié",
  },
  {
    nom: "Pouvoir d'achat ville",
    desc: "Salaire nécessaire pour vivre confortablement dans votre ville (loyer, transports, alimentation).",
    motsCles: "salaire vivre Paris, salaire vivre Lyon, coût de la vie ville",
    href: "/simulateurs/pouvoir-achat-ville",
    categorie: "Tous statuts",
  },
  {
    nom: "Mon salaire me situe où ?",
    desc: "Comparez votre salaire à la distribution française par âge, métier et région (données INSEE).",
    motsCles:
      "salaire médian France, salaire moyen métier, distribution salaires",
    href: "/simulateurs/ou-se-situe-mon-salaire",
    categorie: "Tous statuts",
  },
];

const quizLinks = [
  {
    emoji: "💼",
    label: "Je suis salarié, je veux convertir mon brut en net",
    href: "#tous-simulateurs",
  },
  {
    emoji: "🚀",
    label: "Je suis freelance ou je veux le devenir",
    href: "/simulateurs/salarie-ou-freelance",
  },
  {
    emoji: "📦",
    label: "Je suis en portage salarial",
    href: "/simulateurs/portage-salarial",
  },
  {
    emoji: "🏢",
    label: "Je dirige une SASU ou EURL",
    href: "#tous-simulateurs",
  },
];

const faq = [
  {
    q: "Je suis salarié et je veux comprendre ma fiche de paie",
    r: "Le simulateur Salaire Brut/Net convertit dans les deux sens, détaille chaque cotisation de votre bulletin (Sécurité sociale, retraite complémentaire, CSG-CRDS) et compare cadre et non-cadre. Pour aller jusqu'au net réellement versé, le simulateur Net après impôt applique ensuite votre taux de prélèvement à la source.",
    lien: { label: "Ouvrir le simulateur brut/net", href: "/simulateurs/salaire-brut-net" },
  },
  {
    q: "Je suis freelance et je veux savoir quel TJM facturer",
    r: "Le simulateur TJM Freelance est fait pour vous. Vous pouvez soit indiquer votre revenu net cible (le simulateur calcule le TJM nécessaire pour chaque statut), soit indiquer votre TJM (le simulateur calcule votre net pour chaque statut). C'est le simulateur le plus complet de Salairia.",
    lien: { label: "Ouvrir le simulateur TJM", href: "/simulateurs/tjm-freelance" },
  },
  {
    q: "Je suis en portage salarial et je veux comparer les sociétés",
    r: "Le simulateur Portage Salarial compare automatiquement les 9 sociétés de portage dont les frais de gestion sont publics et identifie celle qui maximise votre net selon vos paramètres. Le comparateur dédié va plus loin, sur 10 sociétés et 8 critères.",
    lien: { label: "Ouvrir le simulateur portage", href: "/simulateurs/portage-salarial" },
  },
  {
    q: "Je veux créer une SASU ou une EURL",
    r: "Le simulateur SASU vs EURL compare les deux statuts côte à côte sur vos chiffres : IS, charges du dirigeant, flat tax sur les dividendes, et les trois répartitions salaire/dividendes possibles. Il signale aussi le piège des dividendes en EURL, soumis aux cotisations TNS au-delà de 10 % du capital.",
    lien: { label: "Ouvrir le simulateur SASU / EURL", href: "/simulateurs/sasu-eurl" },
  },
  {
    q: "Je suis auto-entrepreneur et je veux anticiper mes charges",
    r: "Le simulateur Auto-entrepreneur intègre les taux URSSAF 2026 par catégorie (vente, services, BNC, CIPAV), l'ACRE, le versement libératoire et les seuils de franchise de TVA, avec des alertes dès que vous approchez d'un plafond.",
    lien: { label: "Ouvrir le simulateur auto-entrepreneur", href: "/simulateurs/auto-entrepreneur" },
  },
  {
    q: "J'hésite entre garder mon salariat et passer freelance",
    r: "C'est exactement l'objet du comparateur Salarié ou freelance : il met votre net annuel en CDI face à votre net dans quatre statuts d'indépendant, calcule le TJM exact à facturer pour ne rien perdre, et liste ce que les chiffres ne disent pas — chômage, congés, retraite, mutuelle, capacité d'emprunt.",
    lien: { label: "Ouvrir le comparateur salarié ou freelance", href: "/simulateurs/salarie-ou-freelance" },
  },
];

const engagements = [
  {
    emoji: "🎯",
    titre: "Comparatifs indépendants",
    texte:
      "Nos classements sont basés exclusivement sur les grilles publiques et critères objectifs (frais, services). Aucune relation commerciale n'influence l'ordre des comparatifs.",
  },
  {
    emoji: "🔗",
    titre: "Sources officielles",
    texte:
      "Tous nos calculs s'appuient sur l'URSSAF, BOSS.gouv.fr, Legifrance et l'INSEE. Date de mise à jour visible sur chaque simulateur.",
  },
  {
    emoji: "🛡️",
    titre: "Aucun cookie, aucune collecte",
    texte:
      "Vos données restent dans votre navigateur. Salairia n'enregistre rien de ce que vous saisissez. Politique no-cookie totale.",
  },
];

export default function SimulateursPage() {
  const jsonLd = [
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
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Simulateurs de rémunération Salairia 2026",
      itemListElement: simulateurs.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.nom,
        description: s.desc,
        url: s.href
          ? `${SITE_URL}${s.href}`
          : `${SITE_URL}/simulateurs`,
      })),
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
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        {/* Hero */}
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
              <span className="text-foreground">Simulateurs</span>
            </nav>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
              <CalendarIcon className="w-3.5 h-3.5" />
              Mis à jour août 2026
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Tous nos simulateurs de rémunération
            </h1>
            <p className="mt-4 text-xl leading-relaxed text-foreground/80 sm:text-2xl">
              10 outils gratuits pour calculer précisément votre salaire net,
              votre TJM, vos charges et choisir le statut le plus rentable.
            </p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
              <p>
                Que vous soyez salarié, freelance, dirigeant ou
                auto-entrepreneur, comprendre votre rémunération réelle (et
                celle des autres statuts) est la première étape pour prendre
                les bonnes décisions financières et professionnelles.
              </p>
              <p>
                Tous nos simulateurs s&apos;appuient sur les taux 2026
                vérifiés sur les sources officielles (URSSAF, BOSS,
                Legifrance, INSEE). Aucun cookie, aucun email demandé :
                utilisez-les librement.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-md">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                  <CompassIcon className="w-4 h-4" /> Aide-toi en 10 secondes
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                  Quel simulateur est fait pour toi ?
                </h2>

                <ul className="mt-6 flex flex-col gap-3">
                  {quizLinks.map((q) => (
                    <li key={q.label}>
                      {q.href.startsWith("#") ? (
                        <a
                          href={q.href}
                          className="flex w-full items-start gap-3 rounded-xl border border-border bg-white p-4 text-left text-base font-medium text-foreground transition hover:border-primary hover:bg-primary/5"
                        >
                          <span aria-hidden className="text-xl">
                            {{"💼": <BriefcaseIcon className="w-5 h-5 text-primary" />, "🚀": <RocketIcon className="w-5 h-5 text-primary" />, "📦": <BriefcaseIcon className="w-5 h-5 text-primary" />, "🏢": <BuildingIcon className="w-5 h-5 text-primary" />}[q.emoji] ?? q.emoji}
                          </span>
                          <span className="flex-1">{q.label}</span>
                          <span
                            aria-hidden
                            className="text-muted-foreground"
                          >
                            →
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={q.href}
                          className="flex w-full items-start gap-3 rounded-xl border border-border bg-white p-4 text-left text-base font-medium text-foreground transition hover:border-primary hover:bg-primary/5"
                        >
                          <span aria-hidden className="text-xl">
                            {{"💼": <BriefcaseIcon className="w-5 h-5 text-primary" />, "🚀": <RocketIcon className="w-5 h-5 text-primary" />, "📦": <BriefcaseIcon className="w-5 h-5 text-primary" />, "🏢": <BuildingIcon className="w-5 h-5 text-primary" />}[q.emoji] ?? q.emoji}
                          </span>
                          <span className="flex-1">{q.label}</span>
                          <span
                            aria-hidden
                            className="text-muted-foreground"
                          >
                            →
                          </span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tous nos simulateurs */}
        <section
          id="tous-simulateurs"
          className="mt-20 scroll-mt-24"
        >
          <div className="max-w-2xl">
            <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
              Les 10 simulateurs Salairia
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Cliquez sur un simulateur pour le lancer. Les dix outils sont
              en ligne et calculent avec les taux et barèmes 2026.
            </p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {simulateurs.map((s) => {
              const content = (
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-foreground">
                      {s.nom}
                    </h3>
                    <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                      {s.categorie}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  <p className="text-xs italic text-muted-foreground/80">
                    Mots-clés : {s.motsCles}
                  </p>
                  <span className="mt-auto pt-2 text-sm font-semibold text-primary">
                    Lancer →
                  </span>
                </div>
              );

              return (
                <li key={s.nom}>
                  <Link href={s.href} className="block h-full">
                    {content}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Comparer plusieurs statuts */}
        <section className="mt-20">
          <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
            Hésitez entre plusieurs statuts ?
          </h2>

          <div className="mt-8 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-md sm:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  Le simulateur TJM Freelance compare 4 statuts d&apos;un
                  coup
                </h3>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">
                  Auto-entrepreneur, portage salarial, SASU et EURL : entrez
                  votre revenu net cible <em>ou</em> votre TJM, et obtenez
                  instantanément la comparaison la plus rentable pour votre
                  situation. Idéal pour décider d&apos;un changement de
                  statut.
                </p>
                <ul className="mt-6 flex flex-col gap-2 text-base">
                  {[
                    "4 statuts comparés simultanément",
                    "2 modes : net cible ou TJM cible",
                    "Détection automatique des dépassements de plafonds",
                    "Identification du statut le plus rentable",
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
                  Lancer le simulateur TJM →
                </Link>
              </div>

              <div className="rounded-xl border border-border bg-white p-6 shadow-md">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Exemple : pour 50 000 € net annuel
                </p>
                <ul className="mt-5 flex flex-col gap-3 text-base">
                  <li className="flex items-center justify-between gap-4 rounded-lg bg-accent/5 px-4 py-3">
                    <span className="flex items-center gap-2 font-semibold text-foreground">
                      <span aria-hidden>🏆</span>
                      Auto-entrepreneur
                    </span>
                    <span className="text-lg font-bold tabular-nums text-foreground">
                      375 € / j
                    </span>
                  </li>
                  <li className="flex items-center justify-between gap-4 px-4 py-1">
                    <span className="flex items-center gap-2 text-foreground/80">
                      <span aria-hidden>🏢</span>
                      EURL
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      427 € / j
                    </span>
                  </li>
                  <li className="flex items-center justify-between gap-4 px-4 py-1">
                    <span className="flex items-center gap-2 text-foreground/80">
                      <span aria-hidden>🏢</span>
                      SASU
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      532 € / j
                    </span>
                  </li>
                  <li className="flex items-center justify-between gap-4 px-4 py-1">
                    <span className="flex items-center gap-2 text-foreground/80">
                      <span aria-hidden>📦</span>
                      Portage salarial
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      702 € / j
                    </span>
                  </li>
                </ul>
                <p className="mt-5 text-xs italic text-muted-foreground">
                  Aperçu illustratif basé sur 18 jours travaillés/mois et
                  200 €/mois de frais pro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ guide */}
        <section className="mt-20">
          <div className="max-w-2xl">
            <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <IconBadge><MessageCircleIcon className="w-4 h-4" /></IconBadge>
              Quel simulateur pour mon cas ?
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Les questions les plus fréquentes pour bien choisir
              l&apos;outil adapté à votre situation.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4">
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
                {"lien" in item && item.lien && (
                  <Link
                    href={item.lien.href}
                    className="mt-4 inline-flex items-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                  >
                    {item.lien.label} →
                  </Link>
                )}
              </details>
            ))}
          </div>
        </section>

        {/* Pourquoi nos simulateurs sont différents */}
        <section className="mt-20">
          <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <IconBadge><SparklesIcon className="w-4 h-4" /></IconBadge>
            Pourquoi nos simulateurs sont différents
          </h2>

          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {engagements.map((e) => (
              <li
                key={e.titre}
                className="rounded-2xl border border-border bg-white p-8 shadow-md"
              >
                <span aria-hidden className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  {{"🎯": <TargetIcon className="w-6 h-6" />, "🔗": <ExternalLinkIcon className="w-6 h-6" />, "🛡️": <ShieldIcon className="w-6 h-6" />}[e.emoji] ?? e.emoji}
                </span>
                <h3 className="mt-4 text-xl font-bold text-foreground">
                  {e.titre}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/80">
                  {e.texte}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
