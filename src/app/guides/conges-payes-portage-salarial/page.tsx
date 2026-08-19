import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  ScaleIcon,
  CalculatorIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  AlertTriangleIcon,
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";
import { calculerPortage } from "@/lib/calculators/portage";

export const metadata: Metadata = {
  title: "Congés payés en portage salarial : comment ça marche en 2026",
  description:
    "Le salarié porté acquiert 2,5 jours ouvrables par mois. L'indemnité vaut le plus avantageux entre 10 % de la rémunération brute et le maintien de salaire. Ce que dit la convention collective et ce que ça change concrètement.",
  alternates: { canonical: "/guides/conges-payes-portage-salarial" },
  openGraph: {
    title: "Congés payés en portage salarial : comment ça marche en 2026",
    description:
      "2,5 jours par mois, indemnité au plus avantageux des deux calculs. Et une nuance qui change tout : en portage, partir en congés ne crée pas de revenu supplémentaire.",
    url: "/guides/conges-payes-portage-salarial",
  },
};

const TAUX_INDEMNITE = 0.1;
const JOURS_PAR_MOIS = 2.5;
const TJM = 500;
const JOURS = 18;

const portage = calculerPortage({
  tjm: TJM,
  joursTravailles: JOURS,
  tauxFraisGestion: 8,
  fraisProRefacturables: 0,
  fraisProNonRefacturables: 0,
  statut: "senior",
  tauxPAS: 0,
});
const brutMensuel = portage.salaireBrut;
const indemniteMensuelle = brutMensuel * TAUX_INDEMNITE;

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const faq = [
  {
    q: "Le salarié porté a-t-il vraiment droit aux congés payés ?",
    r: `Oui. Le salarié porté est un salarié de plein exercice : il acquiert ${JOURS_PAR_MOIS} jours ouvrables de congés payés par mois de travail effectif, soit 30 jours ouvrables — cinq semaines — sur une année complète. La période de référence court du 1er juin au 31 mai de l'année suivante, et les congés peuvent être pris dès l'embauche.`,
  },
  {
    q: "Comment l'indemnité de congés payés est-elle calculée ?",
    r: "La convention collective du portage salarial retient le plus avantageux des deux calculs : soit un dixième de la rémunération brute perçue pendant la période de référence, soit le maintien du salaire que vous auriez touché en travaillant. En pratique, pour un salarié porté dont l'activité est régulière, ces deux méthodes donnent des résultats proches.",
  },
  {
    q: "L'indemnité est-elle versée chaque mois ou au moment des congés ?",
    r: "Les deux existent. La convention prévoit que l'indemnité soit versée au salarié ou précomptée chaque mois, et les modalités précises doivent figurer dans votre contrat de travail. Certaines sociétés de portage la versent mensuellement — vous voyez alors une ligne de 10 % sur chaque bulletin — d'autres la mettent en réserve et la débloquent au moment du congé. Lisez votre contrat sur ce point : cela change votre trésorerie, pas votre rémunération totale.",
  },
  {
    q: "Est-ce que je gagne plus en prenant mes congés ?",
    r: "Non, et c'est la nuance qui déroute le plus. En portage, votre rémunération provient de ce que vous facturez. L'indemnité de congés payés est prélevée sur cette même rémunération, pas ajoutée par un employeur qui aurait un budget distinct. Prendre des congés ne crée donc aucun revenu supplémentaire : cela redistribue dans le temps une somme que vous avez déjà générée. Le mécanisme reste utile, puisqu'il lisse vos revenus sur les périodes sans mission.",
  },
  {
    q: "Que deviennent mes congés non pris si je quitte le portage ?",
    r: "Ils vous sont versés sous forme d'indemnité compensatrice de congés payés au moment de la rupture du contrat, au même titre que pour tout salarié. Cette indemnité est soumise à cotisations et entre dans le salaire de référence retenu pour le calcul de vos droits au chômage.",
  },
];

const tocItems = [
  { id: "acquisition", label: "Acquisition des droits" },
  { id: "indemnite", label: "Calcul de l'indemnité" },
  { id: "versement", label: "Quand elle est versée" },
  { id: "nuance", label: "La nuance du portage" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

const sourcesLinks = [
  { label: "Convention collective des salariés en portage salarial du 22 mars 2017 (IDCC 3219)", href: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000035184768" },
  { label: "Convention collective portage salarial — article 28 (congés payés)", href: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043125626" },
  { label: "Ministère du Travail — le portage salarial", href: "https://travail-emploi.gouv.fr/droit-du-travail/les-contrats-de-travail/article/le-portage-salarial" },
  { label: "Code du travail — articles L1254-1 à L1254-31", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000030435227/" },
];

export default function GuideCongesPayesPortagePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Congés payés en portage salarial : comment ça marche en 2026",
      description:
        "Acquisition, calcul de l'indemnité et modalités de versement des congés payés du salarié porté.",
      author: { "@type": "Person", name: "Nizar Laghrifi", url: `${SITE_URL}/a-propos` },
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      datePublished: "2026-08-19",
      dateModified: "2026-08-19",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/guides/conges-payes-portage-salarial`,
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
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: "Congés payés en portage", item: `${SITE_URL}/guides/conges-payes-portage-salarial` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <Link href="/" className="transition hover:text-primary">Accueil</Link>
          <span aria-hidden>›</span>
          <Link href="/guides" className="transition hover:text-primary">Guides</Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">Congés payés en portage</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour août 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Congés payés en portage salarial
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          Vous y avez droit — mais ils sortent de votre propre poche
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">
          Le salarié porté acquiert des congés payés exactement comme n&apos;importe
          quel salarié : {JOURS_PAR_MOIS} jours ouvrables par mois, cinq semaines
          par an. Ce que la plupart des sociétés de portage expliquent mal,
          c&apos;est d&apos;où vient l&apos;argent — et la réponse change la façon
          dont il faut piloter sa trésorerie.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="space-y-16">
            <section id="acquisition" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
                Ce que vous acquérez
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  La règle est celle du droit commun : <strong>{JOURS_PAR_MOIS} jours
                  ouvrables de congés payés par mois de travail effectif</strong>,
                  soit 30 jours ouvrables — cinq semaines — sur une année pleine.
                  La période de référence court du <strong>1er juin au 31 mai</strong>{" "}
                  de l&apos;année suivante.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">
                  Les congés peuvent être pris dès l&apos;embauche : il n&apos;y a
                  pas de période de carence à respecter avant de poser ses
                  premiers jours. La convention collective de branche du portage
                  salarial du 22 mars 2017 impose par ailleurs que les modalités
                  d&apos;acquisition, de prise et de paiement figurent{" "}
                  <strong>dans votre contrat de travail</strong>.
                </p>
              </div>
            </section>

            <section id="indemnite" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
                Comment l&apos;indemnité est calculée
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                La convention retient <strong>le plus avantageux</strong> des deux
                calculs suivants :
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Règle du dixième
                  </p>
                  <p className="mt-2 text-2xl font-bold text-primary">
                    {Math.round(TAUX_INDEMNITE * 100)} %
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    de la rémunération brute perçue pendant la période de
                    référence.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Maintien de salaire
                  </p>
                  <p className="mt-2 text-2xl font-bold text-primary">
                    = salaire habituel
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    la rémunération que vous auriez perçue si vous aviez continué
                    à travailler.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  <strong>Un ordre de grandeur.</strong> Pour un consultant à{" "}
                  {TJM} € de TJM sur {JOURS} jours par mois, le salaire brut
                  mensuel calculé par notre simulateur s&apos;établit à{" "}
                  {EUR.format(brutMensuel)}. La règle du dixième représente donc
                  environ <strong>{EUR.format(indemniteMensuelle)} par mois</strong>,
                  soit {EUR.format(indemniteMensuelle * 12)} sur l&apos;année.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Montants dérivés de notre simulateur de portage avec 8 % de
                  frais de gestion. Le vôtre dépendra de votre société et de vos
                  frais professionnels.
                </p>
              </div>
            </section>

            <section id="versement" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
                Versée chaque mois, ou mise en réserve ?
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  Les deux pratiques existent, et la convention les autorise :
                  l&apos;indemnité peut être <strong>versée</strong> au salarié ou{" "}
                  <strong>précomptée</strong> chaque mois.
                </p>
                <ul className="mt-5 space-y-3 text-base text-foreground/80">
                  <li className="flex gap-3">
                    <span aria-hidden className="text-primary">→</span>
                    <span>
                      <strong>Versement mensuel</strong> — une ligne apparaît sur
                      chaque bulletin. Votre revenu mensuel est plus élevé, mais
                      rien n&apos;est mis de côté pour les périodes sans mission.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="text-primary">→</span>
                    <span>
                      <strong>Mise en réserve</strong> — la société conserve la
                      somme et la débloque au moment du congé. Votre revenu
                      mensuel est plus faible, mais vous êtes couvert quand vous
                      ne facturez pas.
                    </span>
                  </li>
                </ul>
                <p className="mt-5 text-base leading-relaxed text-foreground/80">
                  Ce choix ne change pas votre rémunération totale, seulement sa
                  répartition dans le temps. Vérifiez ce que prévoit votre
                  contrat : c&apos;est un point rarement mis en avant lors de la
                  signature.
                </p>
              </div>
            </section>

            <section id="nuance" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
                La nuance que personne n&apos;explique
              </h2>
              <div className="mt-4 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
                <p className="text-base leading-relaxed">
                  Dans une entreprise classique, les congés payés sont financés
                  par l&apos;employeur : vous êtes payé sans produire, et
                  l&apos;entreprise l&apos;assume.{" "}
                  <strong>En portage, il n&apos;y a pas de tiers payeur.</strong>{" "}
                  Votre rémunération vient intégralement de ce que vous facturez,
                  et l&apos;indemnité de congés payés est prélevée sur cette même
                  somme.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  Autrement dit, prendre des congés ne crée aucun revenu
                  supplémentaire — cela redistribue dans le temps un montant que
                  vous avez déjà généré. Ce n&apos;est pas un défaut du dispositif,
                  c&apos;est sa nature ; mais mieux vaut le savoir avant de
                  construire un budget en supposant cinq semaines payées « en
                  plus ».
                </p>
              </div>
              <p className="mt-6 text-base leading-relaxed text-foreground/80">
                Ce mécanisme reste utile : il vous force à lisser vos revenus, ce
                qui est précieux dans une activité où les intermissions sont
                fréquentes. Pour dimensionner votre TJM en tenant compte des
                jours réellement facturables, utilisez notre{" "}
                <Link href="/simulateurs/tjm-freelance" className="text-primary underline-offset-4 hover:underline">
                  simulateur de TJM
                </Link>{" "}
                — le nombre de jours travaillés par mois y est un paramètre clé.
              </p>
            </section>

            <section id="faq" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><MessageCircleIcon className="w-4 h-4" /></IconBadge>
                Questions fréquentes
              </h2>
              <div className="mt-6 space-y-3">
                {faq.map((f) => (
                  <details key={f.q} className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg">
                    <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-semibold text-foreground">
                      {f.q}
                      <span aria-hidden className="mt-1 shrink-0 text-xl leading-none text-primary transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 text-base leading-relaxed text-foreground/80">{f.r}</p>
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
                  {sourcesLinks.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                        {s.label}<span aria-hidden> ↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs italic text-muted-foreground">
                  Dernière mise à jour : août 2026. Les modalités précises
                  dépendent de votre contrat de travail et de votre société de
                  portage. Ce guide est informatif et ne constitue pas un conseil
                  juridique. Une erreur ?{" "}
                  <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                    Signalez-la
                  </Link>
                  .
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
