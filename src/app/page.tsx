import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Salairia : simulateurs et guides de rémunération en France 2026",
  description:
    "Calculez précisément votre salaire net, votre TJM, vos charges et choisissez le meilleur statut. Simulateurs gratuits et données 2026 vérifiées (URSSAF, INSEE, BOSS).",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Salairia : simulateurs et guides de rémunération en France 2026",
    description:
      "Calculez précisément votre salaire net, votre TJM, vos charges et choisissez le meilleur statut. Simulateurs gratuits et données 2026 vérifiées (URSSAF, INSEE, BOSS).",
    images: ["/og-home.png"],
    url: "/",
  },
};

const dataPoints = [
  { value: "1 443 €", label: "SMIC net mensuel 2026" },
  { value: "2 670 €", label: "Salaire net moyen FR (INSEE)" },
  { value: "4 005 €", label: "Plafond Sécu mensuel (PASS)" },
  { value: "+45%", label: "Charges patronales moyennes portage" },
];

const personas = [
  {
    emoji: "💼",
    nom: "Salarié",
    benefice:
      "Convertissez votre brut, comprenez votre fiche de paie, négociez mieux.",
    features: [
      "Brut/net en 1 clic",
      "Calcul après impôt",
      "Conseils négociation",
    ],
    href: "/simulateurs",
  },
  {
    emoji: "🚀",
    nom: "Freelance",
    benefice:
      "Déterminez votre TJM, choisissez votre statut, optimisez vos revenus.",
    features: [
      "Calcul TJM optimal",
      "Comparatif statuts",
      "Simulateurs portage",
    ],
    href: "/simulateurs/portage-salarial",
  },
  {
    emoji: "⚡",
    nom: "Auto-entrepreneur",
    benefice:
      "Calculez vos charges URSSAF, anticipez la TVA, planifiez votre activité.",
    features: [
      "Charges 2026 à jour",
      "Impact ACRE",
      "Versement libératoire",
    ],
    href: "/simulateurs",
  },
  {
    emoji: "🏢",
    nom: "Dirigeant",
    benefice:
      "Salaire vs dividendes, simulez votre SASU/EURL, optimisez votre fiscalité.",
    features: ["Salaire ou dividendes", "Calcul IS", "Comparatif SASU/EURL"],
    href: "/simulateurs",
  },
] as const;

const simulateurs = [
  {
    nom: "Portage Salarial",
    desc: "Calculez votre net en portage et comparez 5 sociétés",
    href: "/simulateurs/portage-salarial",
    dispo: true,
  },
  {
    nom: "TJM Freelance",
    desc: "Déterminez votre tarif journalier optimal selon votre statut",
    href: "/simulateurs/tjm-freelance",
    dispo: true,
  },
  {
    nom: "Auto-entrepreneur",
    desc: "Charges URSSAF, ACRE, TVA et revenu net",
    dispo: false,
  },
  {
    nom: "SASU / EURL",
    desc: "Salaire, dividendes, IS et revenu disponible",
    dispo: false,
  },
  {
    nom: "Salaire Brut/Net",
    desc: "Conversion instantanée brut↔net pour salariés",
    dispo: false,
  },
  {
    nom: "Net après impôt",
    desc: "Salaire net mensuel après prélèvement à la source",
    dispo: false,
  },
  {
    nom: "Négociation salariale",
    desc: "Estimez votre marge de négociation à l'embauche",
    dispo: false,
  },
  {
    nom: "Pouvoir d'achat",
    desc: "Salaire nécessaire pour vivre dans votre ville",
    dispo: false,
  },
  {
    nom: "Mon salaire me situe où ?",
    desc: "Comparez votre salaire à la distribution française",
    dispo: false,
  },
] as const;

const engagements = [
  {
    emoji: "🎯",
    titre: "Comparatifs indépendants",
    texte:
      "Nos classements sont basés exclusivement sur les grilles publiques et critères objectifs (frais, services). Aucune relation commerciale n'influence l'ordre des comparatifs.",
  },
  {
    emoji: "📊",
    titre: "Sources officielles",
    texte:
      "Tous nos calculs s'appuient sur l'URSSAF, BOSS.gouv.fr, Legifrance et l'INSEE. Date de mise à jour visible sur chaque simulateur.",
  },
  {
    emoji: "💬",
    titre: "Pensé par des indépendants",
    texte:
      "Salairia est édité par Nizar, fondateur de SprintJob.co. Nous comprenons les vraies questions des salariés, freelances et entrepreneurs.",
  },
];

const recherches = [
  { label: "Quel salaire net pour 50 000 € brut ?", href: "/simulateurs" },
  {
    label: "Combien je gagne en portage avec 500 € de TJM ?",
    href: "/simulateurs/portage-salarial",
  },
  { label: "TJM développeur freelance 2026", href: "/simulateurs" },
  { label: "SASU vs EURL : quel statut choisir ?", href: "/simulateurs" },
  { label: "Charges auto-entrepreneur 2026", href: "/simulateurs" },
  { label: "Salaire moyen Paris vs province", href: "/simulateurs" },
  {
    label: "Calcul net après prélèvement à la source",
    href: "/simulateurs",
  },
  {
    label: "Portage salarial ou auto-entrepreneur ?",
    href: "/simulateurs/portage-salarial",
  },
  { label: "Comment négocier son salaire ?", href: "/simulateurs" },
  { label: "Plafond auto-entrepreneur 2026", href: "/simulateurs" },
  {
    label: "Salaire net consultant en portage",
    href: "/simulateurs/portage-salarial",
  },
  { label: "ACRE auto-entrepreneur : impact réel", href: "/simulateurs" },
];

export default function HomePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Salairia",
      url: "https://salairia.fr",
      logo: "https://salairia.fr/logo.png",
      description:
        "Simulateurs, guides et comparatifs neutres de rémunération en France.",
      founder: {
        "@type": "Person",
        name: "Nizar",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Salairia",
      url: "https://salairia.fr",
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://salairia.fr/recherche?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
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
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
              <span aria-hidden>📅</span>
              À jour avril 2026
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Salaire, TJM, charges — sachez ce que vous touchez vraiment
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-foreground/80 sm:text-xl">
              Simulateurs interactifs, comparatifs neutres et guides clairs
              pour comprendre votre rémunération en France. Salariés,
              freelances, auto-entrepreneurs, dirigeants.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="#simulateurs"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Simuler ma rémunération →
              </a>
              <Link
                href="/simulateurs"
                className="inline-flex items-center justify-center rounded-xl border-2 border-primary bg-transparent px-6 py-3.5 text-base font-semibold text-primary transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Comparer les statuts
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-md">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Données de référence 2026
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-6">
                {dataPoints.map((d) => (
                  <div key={d.label}>
                    <dd className="text-3xl font-bold tabular-nums text-primary">
                      {d.value}
                    </dd>
                    <dt className="mt-1 text-sm leading-snug text-muted-foreground">
                      {d.label}
                    </dt>
                  </div>
                ))}
              </dl>

              <p className="mt-6 text-xs italic text-muted-foreground">
                Sources : URSSAF, INSEE, BOSS.gouv.fr, Legifrance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            👤 Quel est votre statut ?
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Salairia couvre les 4 grandes situations de rémunération en France.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {personas.map((p) => (
            <li key={p.nom}>
              <Link
                href={p.href}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span aria-hidden className="text-4xl">
                  {p.emoji}
                </span>
                <h3 className="text-xl font-bold text-foreground">{p.nom}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {p.benefice}
                </p>
                <ul className="mt-auto space-y-2 text-sm">
                  {p.features.map((f) => (
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
                <span className="mt-2 text-sm font-semibold text-primary transition group-hover:translate-x-0.5">
                  Découvrir →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Simulateurs */}
      <section
        id="simulateurs"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-16"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            🧮 Nos simulateurs
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            9 simulateurs gratuits pour calculer précisément votre rémunération
            selon votre statut. Mis à jour avec les taux 2026.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {simulateurs.map((s) => {
            const content = (
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-foreground">
                    {s.nom}
                  </h3>
                  {s.dispo ? (
                    <span className="inline-flex shrink-0 items-center rounded-full bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                      Disponible
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center rounded-full bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
                      Bientôt
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                {s.dispo ? (
                  <span className="mt-auto pt-2 text-sm font-semibold text-primary">
                    Lancer le simulateur →
                  </span>
                ) : (
                  <span className="mt-auto pt-2 text-sm italic text-muted-foreground">
                    Disponible prochainement
                  </span>
                )}
              </div>
            );

            return (
              <li key={s.nom}>
                {s.dispo && s.href ? (
                  <Link href={s.href} className="block h-full">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Pourquoi Salairia */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            💎 Pourquoi Salairia ?
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Trois engagements qui font notre différence.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {engagements.map((e) => (
            <li
              key={e.titre}
              className="rounded-2xl border border-border bg-white p-8 shadow-md"
            >
              <span aria-hidden className="text-4xl">
                {e.emoji}
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

      {/* Recherches populaires */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            🔍 Recherches populaires
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Les questions de rémunération qui reviennent le plus souvent.
          </p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recherches.map((r) => (
            <li key={r.label}>
              <Link
                href={r.href}
                className="group flex items-center justify-between gap-3 rounded-xl bg-muted/50 p-4 text-sm font-medium text-foreground transition hover:bg-muted hover:text-primary"
              >
                <span>{r.label}</span>
                <span
                  aria-hidden
                  className="text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Bandeau confiance */}
      <section className="bg-muted/50">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Données vérifiées sur les sources officielles
          </p>
          <p className="mt-4 text-base font-medium tracking-wide text-muted-foreground">
            URSSAF <span aria-hidden className="mx-2">·</span> BOSS.gouv.fr
            <span aria-hidden className="mx-2">·</span> INSEE
            <span aria-hidden className="mx-2">·</span> DARES
            <span aria-hidden className="mx-2">·</span> Legifrance
          </p>
        </div>
      </section>
    </>
  );
}
