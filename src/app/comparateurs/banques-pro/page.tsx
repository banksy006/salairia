import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  BuildingIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  InfoIcon,
  ScaleIcon,
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";
import data from "@/data/banques-pro.json";

export const metadata: Metadata = {
  title: "Comparatif banques pro freelance 2026 : 6 comptes comparés",
  description:
    "Comparatif indépendant des comptes pro pour freelances et micro-entrepreneurs : Blank, Propulse, Qonto, Shine, Finom, Revolut. Tarifs relevés en juillet 2026 sur les grilles officielles.",
  alternates: { canonical: "/comparateurs/banques-pro" },
  openGraph: {
    title: "Comparatif banques pro freelance 2026 : 6 comptes comparés",
    description:
      "Blank, Propulse, Qonto, Shine, Finom, Revolut — offres d'entrée comparées ligne à ligne, tarifs officiels de juillet 2026.",
    url: "/comparateurs/banques-pro",
  },
};

// Les acteurs dont la grille n'a pas pu être vérifiée sont relégués en fin de
// tableau : les classer par un prix supposé serait leur donner un rang qu'on
// ne peut pas justifier.
const banques = [...data.banques].sort(
  (a, b) => (a.prixMensuelHT ?? 9_999) - (b.prixMensuelHT ?? 9_999),
);

const faq = [
  {
    q: "Un compte pro est-il obligatoire pour un auto-entrepreneur ?",
    r: "Non, pas un compte « professionnel » au sens bancaire. La loi impose un compte bancaire dédié à l'activité dès que le chiffre d'affaires dépasse 10 000 € par an sur deux années civiles consécutives — mais un simple compte courant séparé suffit légalement. Un compte pro apporte en revanche un IBAN au nom de l'activité, des outils de facturation et une comptabilité plus simple à tenir.",
  },
  {
    q: "Pourquoi certains comptes sont-ils gratuits ?",
    r: "Les offres à 0 € financent leur modèle sur les paliers supérieurs, les options payantes (retraits, dépôt de chèques, cartes supplémentaires) et les commissions sur opérations. Shine Free inclut 5 virements SEPA par mois, au-delà chaque opération est facturée. Finom Solo plafonne les virements sortants gratuits à 2 500 €. Une offre gratuite convient à un démarrage ou à un faible volume, rarement à une activité établie.",
  },
  {
    q: "Ces comptes permettent-ils un dépôt de capital pour créer une SASU ?",
    r: "Plusieurs de ces acteurs proposent le dépôt de capital pour une création de société, généralement en option ou dans un pack dédié. Les modalités et les délais varient fortement, et ce service n'est pas inclus dans les offres d'entrée comparées ici. Vérifiez directement auprès de l'acteur si c'est votre besoin principal.",
  },
  {
    q: "Que valent les garanties de dépôt sur ces comptes ?",
    r: "La distinction importante est celle entre établissement de crédit et établissement de paiement. Un établissement de crédit relève de la garantie des dépôts (FGDR, jusqu'à 100 000 € par déposant). Un établissement de paiement doit cantonner les fonds de ses clients sur des comptes séparés, ce qui protège différemment. Propulse est adossé au Crédit Agricole ; les néobanques relèvent de statuts variables. Cette information figure dans les conditions générales de chaque acteur.",
  },
  {
    q: "Pourquoi Revolut Business apparaît-il sans tarif ?",
    r: "Revolut publie bien une grille tarifaire, mais son site bloque les relevés automatisés : nos tentatives du 28 juillet 2026 ont toutes renvoyé une erreur 403. Les tarifs relayés par les sites tiers vont de 10 à 90 €/mois selon le forfait, mais ils divergent entre eux — l'un annonce le forfait intermédiaire à 25 €, un autre à 30 €. Publier l'un de ces montants reviendrait à présenter comme vérifié un chiffre que nous n'avons pas pu contrôler à la source. Nous préférons afficher l'acteur et dire pourquoi la ligne est vide. Consultez sa page officielle, liée ci-dessous, pour le tarif exact.",
  },
  {
    q: "Comment ce comparatif est-il financé ?",
    r: "Salairia prévoit d'être financé par l'affiliation. Le classement ci-dessus est trié par prix de l'offre d'entrée, un critère objectif et vérifiable — il n'est pas influencé par une rémunération. Si des liens d'affiliation sont ajoutés, ils seront signalés et ne modifieront pas l'ordre.",
  },
];

const tocItems = [
  { id: "comparatif", label: "Le comparatif" },
  { id: "lire", label: "Comment lire" },
  { id: "choisir", label: "Comment choisir" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function ComparateurBanquesProPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Comparatif des banques pro pour freelances 2026",
      description:
        "Comparatif indépendant des offres d'entrée de 6 comptes pro pour indépendants.",
      author: {
        "@type": "Person",
        name: "Nizar Laghrifi",
        url: `${SITE_URL}/a-propos`,
      },
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      datePublished: "2026-07-28",
      dateModified: "2026-07-28",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/comparateurs/banques-pro`,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Comptes pro pour freelances 2026",
      numberOfItems: banques.length,
      itemListElement: banques.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.nom,
        url: `${SITE_URL}/comparateurs/banques-pro#${b.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.r },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Comparateurs", item: `${SITE_URL}/comparateurs` },
        { "@type": "ListItem", position: 3, name: "Banques pro", item: `${SITE_URL}/comparateurs/banques-pro` },
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
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-foreground/70">
          <Link href="/" className="transition hover:text-primary">Accueil</Link>
          <span aria-hidden>›</span>
          <Link href="/comparateurs" className="transition hover:text-primary">Comparateurs</Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">Banques pro</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour juillet 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Comparatif des banques pro pour freelances
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          Six comptes, leurs offres d&apos;entrée, sans classement acheté
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">
          Nous comparons ici l&apos;<strong>offre d&apos;entrée</strong> de chaque
          acteur — le palier qui concerne réellement un freelance ou une
          micro-entreprise. Les tarifs ont été relevés le{" "}
          {new Date(data.dateReleve).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          sur les grilles publiques de chaque éditeur, dont les liens figurent
          en bas de page.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="space-y-16">
            <section id="comparatif" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
                Le comparatif
              </h2>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
                <table className="w-full min-w-[46rem] text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4">Compte</th>
                      <th className="px-5 py-4">Offre d&apos;entrée</th>
                      <th className="px-5 py-4 text-right">Prix / mois HT</th>
                      <th className="px-5 py-4">Virements inclus</th>
                      <th className="px-5 py-4">Carte physique</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banques.map((b) => (
                      <tr
                        key={b.slug}
                        id={b.slug}
                        className={`border-b border-border last:border-b-0 transition hover:bg-muted/50 ${
                          b.gratuit ? "bg-accent/5" : ""
                        }`}
                      >
                        <td className={`px-5 py-4 font-semibold text-foreground ${b.gratuit ? "border-l-4 border-accent" : ""}`}>
                          {b.nom}
                        </td>
                        <td className="px-5 py-4 text-muted-foreground">{b.offreEntree}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-right text-lg font-bold tabular-nums">
                          {b.prixMensuelHT === null ? (
                            <span className="text-sm font-normal italic text-muted-foreground">
                              Non vérifié
                            </span>
                          ) : b.prixMensuelHT === 0 ? (
                            <span className="text-accent">Gratuit</span>
                          ) : (
                            EUR.format(b.prixMensuelHT)
                          )}
                        </td>
                        <td className="px-5 py-4 text-foreground/80">{b.virementsInclus}</td>
                        <td className="px-5 py-4 text-foreground/80">{b.cartePhysique}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs italic text-muted-foreground">
                Trié par prix croissant de l&apos;offre d&apos;entrée. Tarifs HT
                relevés le{" "}
                {new Date(data.dateReleve).toLocaleDateString("fr-FR")} sur les
                grilles officielles — ils évoluent, vérifiez avant de souscrire.
              </p>

              <div className="mt-8 space-y-4">
                {banques.map((b) => (
                  <div
                    key={b.slug}
                    className="rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="text-lg font-bold text-foreground">
                        {b.nom} · {b.offreEntree}
                      </h3>
                      <span className="text-sm font-semibold text-primary">
                        {b.cible}
                      </span>
                    </div>
                    <p className="mt-2 text-base leading-relaxed text-foreground/80">
                      {b.specificite}.
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Autres paliers : {b.autresPaliers}
                    </p>
                    <a
                      href={b.urlTarifs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Grille tarifaire officielle
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section id="lire" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
                Comment lire ce comparatif
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  <strong>Nous comparons les offres d&apos;entrée, pas les
                  acteurs dans l&apos;absolu.</strong> Chaque éditeur propose
                  plusieurs paliers, et le moins cher n&apos;est pas
                  automatiquement le meilleur : une offre gratuite qui facture
                  chaque virement au-delà de cinq par mois coûte plus cher
                  qu&apos;un forfait à 6 € dès que l&apos;activité tourne.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">
                  Le bon réflexe est de partir de <strong>ton volume réel de
                  virements mensuels</strong>. En dessous de cinq, une offre
                  gratuite suffit. Entre cinq et trente, les forfaits à 6-9 €
                  deviennent souvent moins chers que le paiement à
                  l&apos;opération. Au-delà, il faut regarder les paliers
                  supérieurs.
                </p>
                <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
                  <p className="text-sm leading-relaxed">
                    Ce comparatif ne couvre pas le dépôt de capital, les
                    garanties de dépôt ni les tarifs à l&apos;international, qui
                    varient trop d&apos;un palier à l&apos;autre pour être
                    résumés honnêtement en une ligne. Si l&apos;un de ces points
                    est déterminant pour toi, vérifie-le directement sur la
                    grille de l&apos;acteur.
                  </p>
                </div>
              </div>
            </section>

            <section id="choisir" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><BuildingIcon className="w-4 h-4" /></IconBadge>
                Quel compte selon ta situation
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="font-semibold text-foreground">Tu démarres</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Une offre gratuite couvre le besoin tant que le volume est
                    faible. Vérifie surtout le nombre de virements inclus et le
                    coût unitaire au-delà, c&apos;est là que la facture arrive.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="font-semibold text-foreground">
                    Tu es micro-entrepreneur établi
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Les fonctionnalités qui font gagner du temps — déclaration
                    URSSAF, facturation, scan de justificatifs — pèsent plus que
                    trois euros d&apos;écart mensuel. Notre{" "}
                    <Link href="/simulateurs/auto-entrepreneur" className="text-primary underline-offset-4 hover:underline">
                      simulateur auto-entrepreneur
                    </Link>{" "}
                    t&apos;aide à situer tes charges.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="font-semibold text-foreground">
                    Tu passes en société
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Le compte pro devient obligatoire, et le dépôt de capital
                    entre en jeu. Regarde d&apos;abord si le statut te convient
                    avec notre{" "}
                    <Link href="/simulateurs/sasu-eurl" className="text-primary underline-offset-4 hover:underline">
                      comparatif SASU / EURL
                    </Link>
                    .
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="font-semibold text-foreground">
                    Tu hésites encore sur ton statut
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Le choix du compte vient après celui du statut. Commence par
                    le{" "}
                    <Link href="/simulateurs/tjm-freelance" className="text-primary underline-offset-4 hover:underline">
                      simulateur TJM freelance
                    </Link>{" "}
                    qui compare les quatre statuts sur le net réel.
                  </p>
                </div>
              </div>
            </section>

            <section id="faq" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><MessageCircleIcon className="w-4 h-4" /></IconBadge>
                Questions fréquentes
              </h2>
              <div className="mt-6 space-y-3">
                {faq.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg"
                  >
                    <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-semibold text-foreground">
                      {f.q}
                      <span
                        aria-hidden
                        className="mt-1 shrink-0 text-xl leading-none text-primary transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-base leading-relaxed text-foreground/80">
                      {f.r}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section id="sources" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><ExternalLinkIcon className="w-4 h-4" /></IconBadge>
                Sources
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <ul className="space-y-3">
                  {banques.map((b) => (
                    <li key={b.slug}>
                      <a
                        href={b.urlTarifs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        {b.nom} — grille tarifaire officielle
                        <span aria-hidden> ↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs italic text-muted-foreground">
                  Dernière mise à jour : juillet 2026. Comparatif limité aux
                  offres d&apos;entrée. Salairia n&apos;est ni un établissement
                  bancaire ni un intermédiaire : ces informations sont
                  documentaires et ne constituent pas un conseil. Une erreur ?{" "}
                  <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                    Signale-la
                  </Link>
                  , c&apos;est corrigé en priorité.
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
