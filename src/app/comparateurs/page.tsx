import type { Metadata } from "next";
import Link from "next/link";
import { CalendarIcon, CompassIcon, ScaleIcon } from "@/components/icons";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Comparateurs indépendants 2026",
  description:
    "Comparatifs indépendants de services pour freelances et entrepreneurs : portage salarial, banques pro, comptabilité, création de société. Méthodologie publique, données 2026.",
  alternates: { canonical: "/comparateurs" },
  openGraph: {
    title: "Comparateurs indépendants 2026 · Salairia",
    description:
      "Comparatifs indépendants de services pour freelances et entrepreneurs : portage salarial, banques pro, comptabilité, création de société.",
    url: "/comparateurs",
  },
};

const comparateurs = [
  {
    titre: "Portage salarial",
    desc:
      "10 sociétés analysées sur 8 critères objectifs : frais de gestion (4 à 10 %), label PEPS, avance sur salaire, services inclus (mutuelle, prévoyance, RC pro), frais professionnels refacturables, chèques cadeau, avis des portés. Données sourcées sur les grilles tarifaires publiques.",
    href: "/comparateurs/portage-salarial",
    dispo: true,
    acteurs: "ITG, Cadres en Mission, OpenWork, ABC Portage, CEGELEM, et 5 autres",
    critereCount: 8,
    lastUpdate: "avril 2026",
  },
  {
    titre: "Banques pro freelance",
    desc:
      "Comparatif des néobanques pro pour micro-entrepreneurs et freelances : Qonto, Shine, Propulse, Revolut Business, Finom, Blank. Frais mensuels, frais par opération, plafonds, dépôt de capital, carte et virements internationaux, intégrations comptables.",
    dispo: false,
    acteurs: "Qonto, Shine, Propulse, Revolut Business, Finom, Blank",
    critereCount: 12,
  },
  {
    titre: "Comptabilité freelance",
    desc:
      "Comparatif des solutions de comptabilité en ligne adaptées aux indépendants : Indy, Dougs, L'Expert-Comptable.com, Pennylane, Keobiz. Prix mensuel, périmètre (micro, SASU, EURL), fonctionnalités TVA et liasse fiscale, intégrations bancaires, support.",
    dispo: false,
    acteurs: "Indy, Dougs, L'Expert-Comptable, Pennylane, Keobiz",
    critereCount: 10,
  },
  {
    titre: "Création SASU / EURL",
    desc:
      "Comparatif des plateformes de création de société : Legalstart, Captain Contrat, Indy, Dougs, Qonto Créateur. Prix du pack, périmètre des services inclus (statuts, dépôt de capital, annonce légale, Kbis), support, offres bundle avec compta ou banque.",
    dispo: false,
    acteurs: "Legalstart, Captain Contrat, Indy, Dougs, Qonto",
    critereCount: 9,
  },
] as const;

export default function ComparateursPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Comparateurs", item: `${SITE_URL}/comparateurs` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Comparateurs Salairia 2026",
      itemListElement: comparateurs
        .filter((c) => c.dispo)
        .map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${"href" in c ? c.href : ""}`,
          name: c.titre,
        })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <nav
          aria-label="Fil d'Ariane"
          className="flex items-center gap-2 text-sm text-foreground/70"
        >
          <Link href="/" className="transition hover:text-primary">
            Accueil
          </Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">Comparateurs</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour avril 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Comparateurs indépendants 2026
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          Analyses neutres des services pour freelances et dirigeants
        </p>

        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-foreground/80">
          <p>
            Les comparateurs Salairia analysent côte à côte les services qui
            structurent la vie d&apos;un freelance ou d&apos;un dirigeant de
            petite société : portage salarial, banque professionnelle,
            comptabilité en ligne, création de société. Chaque comparatif met
            en face les mêmes critères objectifs (frais, services inclus,
            périmètre, qualité) pour les acteurs du marché.
          </p>
          <p>
            Notre engagement : l&apos;ordre d&apos;un comparateur n&apos;est
            jamais influencé par une relation commerciale. Lorsqu&apos;un lien
            d&apos;affiliation est présent, il est signalé sur la page
            concernée et ne modifie pas le classement. L&apos;affiliation
            finance le site ; elle ne dicte pas l&apos;avis. C&apos;est le même
            principe que Wirecutter ou Selectra.
          </p>
          <p>
            Les données publiées proviennent des <strong>grilles tarifaires
            publiques</strong> et des conditions générales de service de
            chaque acteur. Elles sont relevées manuellement et mises à jour au
            moins <strong>une fois par trimestre</strong>, ou à chaque
            changement majeur annoncé par un acteur du marché. La date de
            dernière vérification est affichée sur chaque comparatif.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {comparateurs.map((c) => {
            const content = (
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold text-foreground">
                    {c.titre}
                  </h2>
                  {c.dispo ? (
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
                  {c.desc}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-foreground/60">
                  <span className="rounded-md bg-muted/60 px-2 py-1">
                    {c.critereCount} critères
                  </span>
                  {c.dispo && "lastUpdate" in c && (
                    <span className="rounded-md bg-muted/60 px-2 py-1">
                      Mis à jour : {c.lastUpdate}
                    </span>
                  )}
                </div>
                <p className="text-xs italic text-foreground/60">
                  Acteurs : {c.acteurs}
                </p>
                {c.dispo && "href" in c ? (
                  <span className="mt-auto pt-2 text-sm font-semibold text-primary">
                    Voir le comparatif →
                  </span>
                ) : (
                  <span className="mt-auto pt-2 text-sm italic text-muted-foreground">
                    Disponible prochainement
                  </span>
                )}
              </div>
            );

            return (
              <li key={c.titre}>
                {c.dispo && "href" in c ? (
                  <Link href={c.href} className="block h-full">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>

        <section className="mt-16 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
          <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight text-foreground">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ScaleIcon className="h-4 w-4" />
            </span>
            Notre méthodologie de comparaison
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/80">
            <p>
              Chaque comparateur Salairia suit la même méthodologie :
            </p>
            <ul className="space-y-2">
              <li>
                • <strong>Critères publics et objectifs</strong> — la grille
                de critères utilisée pour le classement est affichée sur
                chaque comparatif avant le classement lui-même. Les critères
                sont factuels (prix, fonctionnalités, couverture), pas
                subjectifs.
              </li>
              <li>
                • <strong>Données sourcées</strong> — chaque chiffre (frais,
                plafond, délai) est vérifiable via le site du service concerné
                ou ses conditions générales publiques. Les sources sont
                citées.
              </li>
              <li>
                • <strong>Mise à jour trimestrielle</strong> — nous relevons
                les tarifs et offres une fois par trimestre minimum. Les
                changements majeurs annoncés par un acteur sont intégrés sous
                48 heures.
              </li>
              <li>
                • <strong>Indépendance du classement</strong> — aucun accord
                commercial, paiement ou partenariat ne modifie l&apos;ordre
                d&apos;un comparatif. Les liens d&apos;affiliation sont
                signalés explicitement quand ils existent, mais ils ne
                déplacent pas un service vers le haut du classement.
              </li>
            </ul>
            <p>
              Pour le détail complet du processus éditorial et des sources,
              voir notre{" "}
              <Link
                href="/methodologie"
                className="text-primary hover:underline"
              >
                page méthodologie
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center sm:p-10">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CompassIcon className="h-5 w-5" />
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Un comparateur manque à l&apos;appel ?
          </h2>
          <p className="max-w-2xl text-base text-foreground/80">
            Signalez-nous le service ou le domaine à couvrir en priorité. Nous
            arbitrons chaque trimestre la prochaine catégorie à publier en
            fonction des demandes reçues et du volume de recherche.
          </p>
          <a
            href="mailto:contact@salairia.com"
            className="inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Proposer un comparateur →
          </a>
        </section>
      </div>
    </>
  );
}
