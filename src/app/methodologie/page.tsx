import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  CalendarIcon,
  IconBadge,
  ExternalLinkIcon,
  CalculatorIcon,
  AlertTriangleIcon,
  SearchIcon,
  ZapIcon,
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title: "Méthodologie de Salairia : sources, calculs, mises à jour",
  description:
    "Comment Salairia calcule ses simulateurs : sources officielles (URSSAF, BOSS, INSEE), processus de vérification, fréquence de mise à jour. Transparence totale.",
  alternates: {
    canonical: "/methodologie",
  },
  openGraph: {
    title: "Méthodologie de Salairia : sources, calculs, mises à jour",
    description:
      "Comment Salairia calcule ses simulateurs : sources officielles (URSSAF, BOSS, INSEE), processus de vérification, fréquence de mise à jour.",
    url: "/methodologie",
  },
};

const sources = [
  {
    nom: "URSSAF",
    href: "https://www.urssaf.fr",
    desc: "Taux de cotisations sociales (patronales et salariales), barèmes officiels, plafonds annuels.",
  },
  {
    nom: "BOSS.gouv.fr",
    href: "https://boss.gouv.fr",
    desc: "Bulletin officiel de la Sécurité sociale : référence légale pour tous les calculs de cotisations.",
  },
  {
    nom: "Legifrance",
    href: "https://www.legifrance.gouv.fr",
    desc: "Conventions collectives, codes du travail, lois fiscales en vigueur.",
  },
  {
    nom: "INSEE",
    href: "https://www.insee.fr",
    desc: "Statistiques officielles sur les salaires moyens, médians, distributions par catégorie.",
  },
  {
    nom: "DARES",
    href: "https://dares.travail-emploi.gouv.fr",
    desc: "Études du Ministère du Travail sur les salaires par métier, secteur, région.",
  },
  {
    nom: "Grilles tarifaires publiques",
    href: null,
    desc: "Tarifs et frais publiés par les sociétés de portage, banques pro, services de comptabilité, vérifiés trimestriellement sur leurs sites officiels.",
  },
];

const etapes = [
  {
    n: 1,
    t: "Identification du barème officiel",
    d: "Pour chaque type de calcul (cotisations, impôt, TVA, ACRE), nous identifions le barème officiel en vigueur pour l'année en cours, en consultant directement la source primaire.",
  },
  {
    n: 2,
    t: "Codification dans le code source",
    d: "Les taux et formules sont stockés dans des fichiers TypeScript versionnés (Git), avec commentaires précisant la source et la date de mise à jour.",
  },
  {
    n: 3,
    t: "Tests de cohérence",
    d: "Chaque simulateur est testé contre des cas de référence connus (par exemple, fiches de paie types publiées par l'URSSAF) avant publication.",
  },
  {
    n: 4,
    t: "Transparence affichée",
    d: "Chaque page de simulateur indique clairement les hypothèses retenues, les sources, et la date de dernière mise à jour.",
  },
];

const frequences = [
  {
    icon: ZapIcon,
    titre: "Immédiate",
    desc: "Modification réglementaire majeure (loi de finances, PLFSS), correctif d'erreur signalée par un utilisateur ou expert.",
  },
  {
    icon: CalendarIcon,
    titre: "Trimestrielle",
    desc: "Révision systématique des grilles tarifaires des partenaires et acteurs cités (sociétés de portage, banques pro, etc.).",
  },
  {
    icon: CalendarIcon,
    titre: "Annuelle",
    desc: "Mise à jour complète de tous les barèmes au 1er janvier (PASS, SMIC, plafonds, taux URSSAF).",
  },
];

const tocItems = [
  { id: "sources", label: "Nos sources" },
  { id: "processus", label: "Processus de calcul" },
  { id: "frequence", label: "Mises à jour" },
  { id: "limites", label: "Limites" },
  { id: "erreur", label: "Signaler une erreur" },
] as const;

export default function MethodologiePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "Méthodologie de Salairia : sources, calculs, mises à jour",
      description:
        "Processus de calcul, sources officielles et fréquence de mise à jour des simulateurs Salairia.",
      inLanguage: "fr-FR",
      datePublished: "2026-04-15",
      dateModified: "2026-04-15",
      author: {
        "@type": "Person",
        name: "Nizar Laghrifi",
        url: `${SITE_URL}/a-propos`,
      },
      publisher: {
        "@type": "Organization",
        name: "Salairia",
        url: `${SITE_URL}`,
      },
      url: `${SITE_URL}/methodologie`,
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
          name: "Méthodologie",
          item: `${SITE_URL}/methodologie`,
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
        {/* Hero */}
        <section>
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center gap-2 text-sm text-foreground/70"
          >
            <Link href="/" className="transition hover:text-primary">
              Accueil
            </Link>
            <span aria-hidden>›</span>
            <span className="text-foreground">Méthodologie</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
            <CalendarIcon className="w-3.5 h-3.5" />
            Mis à jour avril 2026
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Notre méthodologie
          </h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-foreground/80">
            Comment nous calculons, vérifions et mettons à jour les données de
            Salairia.
          </p>

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-foreground/80">
            La rémunération est un sujet sensible (YMYL — <em>Your Money Your
            Life</em> selon Google) qui exige rigueur et transparence. Voici
            comment nous garantissons la fiabilité de chaque chiffre publié
            sur Salairia.
          </p>
        </section>

        <div className="mt-16 flex gap-12">
          <div className="min-w-0 flex-1 space-y-16">
            {/* Sources */}
            <section id="sources" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <IconBadge><ExternalLinkIcon className="w-4 h-4" /></IconBadge>
                Nos sources
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
                Toutes nos données proviennent exclusivement de sources
                officielles ou de publications publiques vérifiables.
              </p>

              <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                {sources.map((s) => (
                  <li
                    key={s.nom}
                    className="rounded-2xl border border-border bg-white p-6 shadow-sm"
                  >
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xl font-bold text-primary underline-offset-4 transition hover:underline"
                      >
                        {s.nom}
                        <span aria-hidden className="text-sm">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <h3 className="text-xl font-bold text-foreground">
                        {s.nom}
                      </h3>
                    )}
                    <p className="mt-3 text-base leading-relaxed text-foreground/80">
                      {s.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Processus de calcul */}
            <section id="processus" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
                Notre processus de calcul
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
                Quatre étapes systématiques avant la publication de chaque
                simulateur.
              </p>

              <ol className="mt-10 grid gap-4 md:grid-cols-2">
                {etapes.map((e) => (
                  <li
                    key={e.n}
                    className="flex gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm"
                  >
                    <div
                      aria-hidden
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-sm"
                    >
                      {e.n}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {e.t}
                      </h3>
                      <p className="mt-1 text-base leading-relaxed text-foreground/80">
                        {e.d}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Fréquence de mise à jour */}
            <section id="frequence" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
                Quand nous mettons à jour
              </h2>

              <div className="mt-8 rounded-2xl bg-muted/50 p-8 sm:p-10">
                <ul className="flex flex-col gap-6">
                  {frequences.map((f) => (
                    <li key={f.titre} className="flex gap-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-primary/10 text-primary">
                        <f.icon className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="text-lg font-bold text-foreground">
                          {f.titre}
                        </p>
                        <p className="mt-1 text-base leading-relaxed text-foreground/80">
                          {f.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Limites */}
            <section id="limites" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
                Limites de nos calculs
              </h2>

              <div className="mt-8 rounded-r-xl border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900 sm:p-8">
                <p className="text-base leading-relaxed">
                  Tous les calculs proposés sur Salairia sont des{" "}
                  <strong>estimations indicatives</strong> basées sur les barèmes
                  standards. Ils ne tiennent pas compte de votre situation
                  personnelle complète :
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed">
                  <li>
                    Conventions collectives spécifiques (parfois plus avantageuses)
                  </li>
                  <li>
                    Exonérations et dispositifs particuliers (ZRR, LODEOM, ACRE
                    étendue, etc.)
                  </li>
                  <li>
                    Avantages négociés (mutuelle, prévoyance, intéressement)
                  </li>
                  <li>
                    Spécificités fiscales personnelles (parts fiscales, crédits
                    d&apos;impôt)
                  </li>
                </ul>
                <p className="mt-4 text-base leading-relaxed">
                  Pour des décisions importantes (changement de statut,
                  négociation salariale, choix de société), nous recommandons
                  toujours de consulter un expert-comptable ou un conseiller
                  spécialisé.
                </p>
              </div>
            </section>

            {/* Signaler une erreur */}
            <section id="erreur" className="scroll-mt-24 mb-8">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <IconBadge><SearchIcon className="w-4 h-4" /></IconBadge>
                Vous avez détecté une erreur ?
              </h2>

              <div className="mt-8 rounded-2xl border border-border bg-white p-8 shadow-sm sm:p-10">
                <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
                  Nous prenons très au sérieux la qualité de nos données. Si vous
                  identifiez une erreur de calcul, une source obsolète ou une
                  amélioration possible, écrivez-nous à{" "}
                  <a
                    href="mailto:contact@salairia.com"
                    className="font-semibold text-primary underline-offset-4 transition hover:underline"
                  >
                    contact@salairia.com
                  </a>{" "}
                  avec le détail. Nous corrigeons sous 48h ouvrées et créditons
                  systématiquement le contributeur (avec accord).
                </p>
              </div>
            </section>
          </div>

          <TocSidebar items={tocItems} />
        </div>
      </div>
    </>
  );
}
