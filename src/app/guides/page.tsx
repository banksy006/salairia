import type { Metadata } from "next";
import Link from "next/link";
import { CalendarIcon, CompassIcon, FileTextIcon } from "@/components/icons";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guides pratiques 2026",
  description:
    "Guides complets et indépendants sur la rémunération en France : portage salarial, statut freelance, fiche de paie, auto-entrepreneur. Sources officielles, données 2026.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Guides pratiques 2026 · Salairia",
    description:
      "Guides complets et indépendants sur la rémunération en France.",
    url: "/guides",
  },
};

const guides = [
  {
    titre: "Portage salarial",
    desc:
      "Le portage salarial convient aux consultants, formateurs et experts qui veulent facturer leurs clients tout en gardant le statut de salarié : CDI, protection sociale complète, droit au chômage. Ce guide couvre le fonctionnement tripartite, le calcul du salaire net, les cotisations détaillées, le chômage, les contrats CDI/CDD, les missions à l'international et le comparatif avec les autres statuts freelance.",
    href: "/guides/portage-salarial",
    audience: "Consultants, formateurs, experts, managers de transition",
    lecture: "12 min",
  },
  {
    titre: "Auto-entrepreneur",
    desc:
      "L'auto-entreprise (micro-entreprise) est le statut le plus simple et le moins coûteux pour démarrer une activité en France. Ce guide détaille la création, les quatre catégories de cotisations URSSAF (BIC vente, BIC services, BNC régime général, BNC CIPAV), l'ACRE 2026, les plafonds de chiffre d'affaires, les seuils de franchise TVA et le versement libératoire.",
    href: "/guides/auto-entrepreneur",
    audience: "Freelances qui démarrent, activités secondaires, petits CA",
    lecture: "10 min",
  },
  {
    titre: "SASU vs EURL",
    desc:
      "SASU et EURL sont les deux formes de société à un seul associé. Ce guide compare leur fonctionnement : charges sociales (assimilé-salarié vs TNS), impôt sur les sociétés, versement de dividendes, flat tax, protection sociale. Il couvre les trois scénarios types (100 % salaire, mix, 100 % dividendes) et précise le point de bascule qui avantage l'un ou l'autre selon votre situation.",
    href: "/guides/sasu-eurl",
    audience: "Dirigeants, freelances avec CA élevé, transition AE vers société",
    lecture: "11 min",
  },
  {
    titre: "Salaire brut et net",
    desc:
      "Ce guide explique ligne à ligne le passage du salaire brut au salaire net en France : cotisations salariales (sécurité sociale, retraite AGIRC-ARRCO, CSG/CRDS, APEC), tranches T1 et T2 selon le PASS, coût employeur, prélèvement à la source. Il couvre les différences cadre/non-cadre et donne les clés pour comprendre sa fiche de paie et négocier son salaire.",
    href: "/guides/salaire-brut-net",
    audience: "Salariés, candidats en négociation, dirigeants employeurs",
    lecture: "9 min",
  },
  {
    titre: "TJM freelance",
    desc:
      "Le Taux Journalier Moyen conditionne le revenu d'un freelance, son positionnement marché et sa capacité à encaisser les périodes creuses. Ce guide couvre la formule de calcul (3 méthodes), les grilles de TJM par métier en 2026 (dev, data, design, conseil), les variations par statut juridique et par zone géographique, et les leviers concrets pour négocier et augmenter son TJM.",
    href: "/guides/tjm-freelance",
    audience: "Freelances tech, consultants, designers, rédacteurs",
    lecture: "11 min",
  },
] as const;

export default function GuidesPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Guides Salairia 2026",
      itemListElement: guides.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${g.href}`,
        name: g.titre,
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
          <span className="text-foreground">Guides</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour avril 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Guides pratiques 2026
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          Comprendre votre rémunération, statut par statut
        </p>

        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-foreground/80">
          <p>
            Les guides Salairia expliquent en profondeur chacun des statuts et
            régimes de rémunération accessibles en France : portage salarial,
            auto-entreprise, SASU, EURL, salaire brut et net. Chaque guide est
            construit pour répondre à la même question sous deux angles —
            comprendre la mécanique (cotisations, plafonds, règles) et agir sur
            votre situation (choisir, simuler, comparer).
          </p>
          <p>
            Ces guides sont complémentaires de nos{" "}
            <Link href="/simulateurs" className="text-primary hover:underline">
              simulateurs
            </Link>
            . Un simulateur répond en quelques secondes à la question
            «&nbsp;combien ?&nbsp;» ; un guide répond au «&nbsp;comment ?&nbsp;»
            et au «&nbsp;pourquoi ?&nbsp;». Avant d&apos;utiliser un simulateur,
            le guide vous aide à savoir quel statut correspond à votre
            situation ; après, il vous donne les clés pour appliquer le
            résultat dans le monde réel.
          </p>
          <p>
            Tous nos guides reposent sur des sources officielles : URSSAF,
            BOSS.gouv.fr, Légifrance, Code du travail, INSEE, DARES. Les
            chiffres clés (taux de cotisations, plafonds, seuils, PASS) sont
            datés de 2026 et centralisés dans nos calculators pour garantir la
            cohérence entre chaque page.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {guides.map((g) => (
            <li key={g.titre}>
              <Link href={g.href} className="block h-full">
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-bold text-foreground">
                      {g.titre}
                    </h2>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                      <FileTextIcon className="h-3 w-3" />
                      {g.lecture}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {g.desc}
                  </p>
                  <p className="text-xs italic text-foreground/60">
                    Pour qui : {g.audience}
                  </p>
                  <span className="mt-auto pt-2 text-sm font-semibold text-primary">
                    Lire le guide →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-16 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
          <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight text-foreground">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CompassIcon className="h-4 w-4" />
            </span>
            Notre méthodologie
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/80">
            <p>
              Chaque guide Salairia est construit selon trois principes :
            </p>
            <ul className="space-y-2">
              <li>
                • <strong>Sources officielles uniquement</strong> — chaque
                chiffre (taux, plafond, seuil) provient des publications
                URSSAF, BOSS.gouv.fr, Legifrance, INSEE ou DARES. Les sources
                sont citées en bas de chaque guide.
              </li>
              <li>
                • <strong>Constantes centralisées</strong> — les taux et
                plafonds 2026 utilisés dans les guides sont les mêmes que ceux
                de nos simulateurs, garantissant la cohérence chiffre à chiffre
                entre les pages.
              </li>
              <li>
                • <strong>Revue annuelle</strong> — les guides sont relus
                chaque janvier pour intégrer les évolutions fiscales et
                sociales de l&apos;année. Les mises à jour intermédiaires sont
                faites dès publication d&apos;un texte réglementaire nouveau.
              </li>
            </ul>
            <p>
              Pour le détail complet des sources, du processus de rédaction et
              de la gestion des erreurs, voir notre{" "}
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
      </div>
    </>
  );
}
