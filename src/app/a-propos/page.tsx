import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  CalendarIcon,
  IconBadge,
  TargetIcon,
  SparklesIcon,
  MailIcon,
  SearchIcon,
  ScaleIcon,
  GraduationCapIcon,
  BriefcaseIcon,
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title: "À propos de Salairia : qui sommes-nous, notre mission, nos engagements",
  description:
    "Salairia est un projet indépendant français lancé en 2026 par Nizar Laghrifi pour aider les Français à comprendre leur rémunération. Découvrez nos engagements et notre mission.",
  alternates: {
    canonical: "/a-propos",
  },
  openGraph: {
    title:
      "À propos de Salairia : qui sommes-nous, notre mission, nos engagements",
    description:
      "Salairia est un projet indépendant français lancé en 2026 par Nizar Laghrifi pour aider les Français à comprendre leur rémunération.",
    url: "/a-propos",
  },
};

const engagements = [
  {
    icon: SearchIcon,
    titre: "Transparence des sources",
    texte:
      "Tous nos calculs s'appuient sur des sources officielles (URSSAF, BOSS.gouv.fr, Legifrance, INSEE, DARES) que nous citons systématiquement avec liens directs.",
  },
  {
    icon: CalendarIcon,
    titre: "Données toujours à jour",
    texte:
      "Les taux de cotisations, plafonds et barèmes sont vérifiés et mis à jour chaque trimestre. Chaque page affiche sa date de dernière mise à jour.",
  },
  {
    icon: ScaleIcon,
    titre: "Indépendance éditoriale",
    texte:
      "Nos comparatifs sont basés exclusivement sur les grilles publiques de chaque acteur. Notre classement n'est jamais influencé par d'éventuelles relations commerciales.",
  },
  {
    icon: GraduationCapIcon,
    titre: "Pédagogie avant tout",
    texte:
      "Chaque simulateur est accompagné d'explications claires sur le calcul, sans jargon technique inutile. Comprendre, c'est pouvoir décider.",
  },
];

const tocItems = [
  { id: "fondateur", label: "Le fondateur" },
  { id: "mission", label: "Notre mission" },
  { id: "engagements", label: "Nos engagements" },
  { id: "nom", label: "Pourquoi Salairia" },
  { id: "contact", label: "Contact" },
] as const;

export default function AProposPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Nizar Laghrifi",
      jobTitle: "Fondateur de Salairia",
      description:
        "Fondateur de Salairia, projet indépendant français de simulateurs et guides de rémunération. Également fondateur de SprintJob.co.",
      url: `${SITE_URL}/a-propos`,
      sameAs: ["https://www.linkedin.com/in/nizar-laghrifi/"],
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Rennes School of Business",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Sheffield Hallam University",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Salairia",
      url: `${SITE_URL}`,
      description:
        "Simulateurs, guides et comparatifs neutres de rémunération en France.",
      foundingDate: "2026",
      founder: {
        "@type": "Person",
        name: "Nizar Laghrifi",
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
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "À propos",
          item: `${SITE_URL}/a-propos`,
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
            <span className="text-foreground">À propos</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
            <CalendarIcon className="w-3.5 h-3.5" />
            Mis à jour avril 2026
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            À propos de Salairia
          </h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-foreground/80">
            Un projet indépendant français pour comprendre la rémunération
            sans zone d&apos;ombre.
          </p>
        </section>

        <div className="mt-16 flex gap-12">
          <div className="min-w-0 flex-1 space-y-16">
            {/* Fondateur */}
            <section id="fondateur" className="scroll-mt-24">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Le fondateur
              </h2>

              <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                    <div className="flex justify-center">
                      <div
                        aria-hidden
                        className="flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-6xl font-bold text-primary-foreground shadow-inner"
                      >
                        N
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-xl font-bold text-foreground">
                        Nizar Laghrifi
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Fondateur de Salairia
                      </p>
                    </div>

                    <div className="my-6 border-t border-border" />

                    <ul className="flex flex-col gap-3 text-sm">
                      <li>
                        <a
                          href="https://www.linkedin.com/in/nizar-laghrifi/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition hover:bg-muted hover:text-primary"
                        >
                          <BriefcaseIcon className="w-5 h-5" />
                          <span className="font-medium">LinkedIn</span>
                          <span aria-hidden className="ml-auto text-xs">
                            ↗
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:contact@salairia.com"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition hover:bg-muted hover:text-primary"
                        >
                          <MailIcon className="w-5 h-5" />
                          <span className="font-medium">
                            contact@salairia.com
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <div className="space-y-5 text-base leading-relaxed text-foreground sm:text-lg">
                    <p>
                      Nizar est diplômé en 2025 d&apos;un Master Grande École en
                      Responsable de Projet Innovant à Rennes School of Business.
                      Cette formation a été enrichie par un échange Erasmus à la
                      Sheffield Hallam University (Royaume-Uni), spécialisé en
                      International Strategic &amp; Brand Management.
                    </p>
                    <p>
                      Salairia est né d&apos;un constat simple : malgré
                      l&apos;abondance d&apos;outils en ligne sur la rémunération
                      en France, aucun ne combine vraiment neutralité, précision
                      et clarté pédagogique. La plupart des simulateurs sont
                      édités par des sociétés commerciales (banques, plateformes
                      de portage, cabinets comptables) qui ont un intérêt direct
                      à orienter les résultats.
                    </p>
                    <p>
                      Salairia est un projet indépendant, lancé en avril 2026,
                      dont l&apos;unique objectif est d&apos;aider les Français —
                      salariés, freelances, auto-entrepreneurs et dirigeants — à
                      comprendre précisément ce qu&apos;ils touchent vraiment et
                      à prendre les meilleures décisions pour leur situation.
                    </p>
                    <p>
                      Nizar est également fondateur de{" "}
                      <a
                        href="https://sprintjob.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-4 transition hover:underline"
                      >
                        SprintJob.co
                      </a>
                      , un outil d&apos;optimisation de CV par intelligence
                      artificielle pour candidats francophones.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Mission */}
            <section id="mission" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <IconBadge><TargetIcon className="w-4 h-4" /></IconBadge>
                Notre mission
              </h2>

              <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center shadow-md sm:p-12">
                <p className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                  Donner aux Français des outils gratuits, neutres et précis pour
                  comprendre et optimiser leur rémunération.
                </p>
                <p className="mt-5 text-sm text-muted-foreground">
                  Quel que soit votre statut, vous méritez une information claire
                  et indépendante sur ce que vous touchez vraiment.
                </p>
              </div>
            </section>

            {/* Engagements */}
            <section id="engagements" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <IconBadge><SparklesIcon className="w-4 h-4" /></IconBadge>
                Nos engagements
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Quatre principes qui guident chaque page de Salairia.
              </p>

              <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                {engagements.map((e) => (
                  <li
                    key={e.titre}
                    className="rounded-2xl border border-border bg-white p-6 shadow-sm"
                  >
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <e.icon className="w-6 h-6" />
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

            {/* Pourquoi Salairia */}
            <section id="nom" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <IconBadge><SparklesIcon className="w-4 h-4" /></IconBadge>
                Pourquoi le nom « Salairia » ?
              </h2>
              <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
                <p>
                  Salairia est la contraction de « salaire » et du suffixe « -ia »
                  qui évoque les domaines de référence en latin (encyclopédie,
                  académie). Notre ambition : devenir la référence française sur
                  les questions de rémunération, accessible à tous, du SMIC au
                  TJM premium freelance.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section id="contact" className="scroll-mt-24 mb-8">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <IconBadge><MailIcon className="w-4 h-4" /></IconBadge>
                Contact
              </h2>

              <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-muted/50 p-8 text-center sm:p-12">
                <p className="text-lg leading-relaxed text-foreground">
                  Une question, une suggestion, ou vous êtes journaliste à la
                  recherche de données fiables sur la rémunération en France ?
                </p>
                <a
                  href="mailto:contact@salairia.com"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Nous contacter
                </a>
                <p className="mt-4 text-sm text-muted-foreground">
                  Réponse sous 48h ouvrées.
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
