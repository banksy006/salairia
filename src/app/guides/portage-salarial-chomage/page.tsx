import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  ShieldIcon,
  CalculatorIcon,
  AlertTriangleIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  InfoIcon,
  ScaleIcon,
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";
import BarChart, { type BarDatum } from "@/components/charts/BarChart";
import { PORTAGE_2026, calculerPortage } from "@/lib/calculators/portage";
import { ARE_2026, calculerAre } from "@/lib/calculators/are";

export const metadata: Metadata = {
  title: "Portage salarial et chômage : vos droits à l'ARE en 2026",
  description:
    "Le salarié porté cotise à l'assurance chômage et ouvre des droits à l'ARE. Conditions d'affiliation 2026, calcul de l'allocation, et le piège du montant : l'ARE se calcule sur le salaire brut, pas sur le chiffre d'affaires facturé.",
  alternates: { canonical: "/guides/portage-salarial-chomage" },
  openGraph: {
    title: "Portage salarial et chômage : vos droits à l'ARE en 2026",
    description:
      "Oui, le portage ouvre droit au chômage. Mais l'allocation se calcule sur votre salaire brut, pas sur votre CA — et l'écart surprend.",
    url: "/guides/portage-salarial-chomage",
  },
};

// Cas type entièrement calculé : le CA facturé passe par le simulateur portage
// pour donner un brut, dont on dérive l'ARE. Aucun montant n'est saisi.
const TJM = 500;
const JOURS = 18;
const FRAIS_GESTION = 8;

const portage = calculerPortage({
  tjm: TJM,
  joursTravailles: JOURS,
  tauxFraisGestion: FRAIS_GESTION,
  fraisProRefacturables: 0,
  fraisProNonRefacturables: 0,
  statut: "senior",
  tauxPAS: 0,
});

const caAnnuel = portage.caHT * 12;
const brutAnnuel = portage.salaireBrut * 12;
const are = calculerAre(brutAnnuel);

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const EUR2 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

const cascade: BarDatum[] = [
  {
    label: "Chiffre d'affaires facturé au client",
    hint: `${TJM} €/jour × ${JOURS} jours × 12 mois`,
    value: Math.round(caAnnuel),
  },
  {
    label: "Salaire brut — la base de calcul de l'ARE",
    hint: `après ${FRAIS_GESTION} % de frais de gestion et ${Math.round(PORTAGE_2026.CHARGES_PATRONALES_TAUX * 100)} % de charges patronales`,
    value: Math.round(brutAnnuel),
  },
  {
    label: "ARE annuelle estimée",
    hint: `${EUR2.format(are.allocationJournaliere)} par jour indemnisé`,
    value: Math.round(are.allocationMensuelle * 12),
    highlight: true,
  },
];

const faq = [
  {
    q: "Le portage salarial donne-t-il vraiment droit au chômage ?",
    r: "Oui. Le salarié porté est titulaire d'un contrat de travail — le plus souvent un CDI — et relève à ce titre du régime d'assurance chômage, dès lors que la société de portage respecte le cadre fixé par l'ordonnance du 2 avril 2015. Des cotisations d'assurance chômage sont prélevées sur son salaire brut comme pour n'importe quel salarié. C'est l'un des principaux arguments du portage face à l'auto-entreprise, qui n'ouvre aucun droit de ce type.",
  },
  {
    q: "Combien de temps faut-il avoir travaillé pour ouvrir des droits ?",
    r: `Il faut justifier d'au moins ${ARE_2026.JOURS_TRAVAILLES_REQUIS} jours travaillés ou ${ARE_2026.HEURES_TRAVAILLEES_REQUISES} heures, soit environ six mois, au cours des ${ARE_2026.PERIODE_REFERENCE_MOIS} derniers mois — ${ARE_2026.PERIODE_REFERENCE_MOIS_SENIOR} mois si vous avez ${ARE_2026.AGE_PERIODE_ALLONGEE} ans ou plus. Nouveauté importante : depuis le 1er avril 2026, ce seuil est abaissé à ${ARE_2026.JOURS_REQUIS_PRIMO_ENTRANT} jours ou ${ARE_2026.HEURES_REQUISES_PRIMO_ENTRANT} heures, soit environ cinq mois, pour les personnes qui n'ont jamais ouvert de droit à l'assurance chômage au cours des vingt dernières années.`,
  },
  {
    q: "Mon allocation est-elle calculée sur mon chiffre d'affaires ?",
    r: "Non, et c'est le point qui surprend le plus. France Travail retient votre salaire brut, celui qui figure sur vos bulletins de paie — donc après déduction des frais de gestion de la société de portage et des charges patronales. Sur une facturation annuelle de " + EUR.format(caAnnuel) + ", le salaire brut ne représente que " + EUR.format(brutAnnuel) + ". C'est ce second montant qui sert de base au calcul.",
  },
  {
    q: "Comment mettre fin à un CDI de portage pour toucher l'ARE ?",
    r: "Une démission simple ne donne pas droit à l'allocation. Les voies qui ouvrent des droits sont la rupture conventionnelle, le licenciement — notamment pour absence de mission prolongée — et l'arrivée du terme d'un CDD de portage. La fin d'une mission ne met pas fin au CDI en elle-même : le contrat se poursuit, et c'est l'absence durable de nouvelle mission qui peut conduire à une rupture. Discutez-en avec votre société de portage avant d'engager quoi que ce soit.",
  },
  {
    q: "Puis-je cumuler l'ARE avec une activité en portage ?",
    r: "Oui, le cumul est possible. Reprendre une mission en portage pendant une période d'indemnisation réduit l'allocation du mois concerné, proportionnellement au salaire brut perçu, mais les jours non indemnisés sont reportés à la fin de vos droits. Vous ne perdez donc pas ces jours, vous les décalez. Ce mécanisme rend le portage particulièrement adapté à une reprise progressive d'activité.",
  },
  {
    q: "Les frais professionnels refacturés comptent-ils dans le calcul ?",
    r: "Non. Les frais professionnels que votre client vous rembourse ne sont pas du salaire : ils ne supportent pas de cotisations et n'entrent donc pas dans le salaire de référence retenu par France Travail. Un consultant qui refacture beaucoup de déplacements verra son revenu réel dépasser nettement la base servant au calcul de son allocation.",
  },
];

const sourcesLinks = [
  { label: "France Travail — Ai-je droit à l'allocation chômage ?", href: "https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocati/lessentiel-a-savoir-sur-lallocat/ai-je-droit-a-lallocation-chomag.html" },
  { label: "France Travail — le portage salarial", href: "https://www.francetravail.fr/candidat/votre-projet-professionnel/definir-votre-projet-professionn/le-portage-salarial--et-si-cetai.html" },
  { label: "Unédic — conditions pour avoir droit aux allocations chômage", href: "https://www.unedic.org/l-assurance-chomage-et-vous/demandeur-d-emploi-ou-salarie/mon-indemnisation/quelles-sont-les-conditions-pour-avoir-droit-aux-allocations-chomage" },
  { label: "Unédic — assouplissement pour les primo-entrants (1er avril 2026)", href: "https://www.unedic.org/actualites/assurance-chomage-une-condition-dacces-assouplie-pour-les-primo-entrants" },
  { label: "Unédic — allocation d'aide au retour à l'emploi (ARE)", href: "https://www.unedic.org/la-reglementation/fiches-thematiques/allocation-d-aide-au-retour-a-l-emploi-are" },
  { label: "Unédic — cumul allocation et salaire", href: "https://www.unedic.org/la-reglementation/fiches-thematiques/cumul-allocation-salaire" },
  { label: "Code du travail — articles L1254-1 à L1254-31 (portage salarial)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000030435227/" },
];

const tocItems = [
  { id: "droit", label: "Avez-vous droit à l'ARE ?" },
  { id: "conditions", label: "Conditions 2026" },
  { id: "montant", label: "Le calcul du montant" },
  { id: "piege", label: "Le piège du CA" },
  { id: "rupture", label: "Mettre fin au contrat" },
  { id: "cumul", label: "Cumuler ARE et mission" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

export default function GuidePortageChomagePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Portage salarial et chômage : vos droits à l'ARE en 2026",
      description:
        "Conditions d'affiliation, calcul de l'allocation et base de référence pour un salarié porté.",
      author: { "@type": "Person", name: "Nizar Laghrifi", url: `${SITE_URL}/a-propos` },
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      datePublished: "2026-08-19",
      dateModified: "2026-09-01",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/guides/portage-salarial-chomage`,
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
        { "@type": "ListItem", position: 3, name: "Portage salarial et chômage", item: `${SITE_URL}/guides/portage-salarial-chomage` },
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
          <span className="text-foreground">Portage et chômage</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour septembre 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Portage salarial et chômage
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          Vous y avez droit — mais pas sur le montant que vous croyez
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">
          C&apos;est l&apos;argument numéro un du portage face à
          l&apos;auto-entreprise : le salarié porté cotise à l&apos;assurance
          chômage et ouvre de vrais droits. Ce que presque personne ne dit,
          c&apos;est que l&apos;allocation ne se calcule pas sur ce que vous
          facturez, mais sur votre salaire brut — un montant très inférieur.
          Voici les conditions, le calcul, et l&apos;écart réel.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="space-y-16">
            <section id="droit" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
                Le salarié porté a-t-il droit au chômage ?
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  Oui, sans ambiguïté. Le salarié porté signe un{" "}
                  <strong>contrat de travail</strong> avec sa société de portage
                  — un CDI dans la grande majorité des cas. À ce titre, il relève
                  du régime général et des cotisations d&apos;assurance chômage
                  sont prélevées sur son salaire brut, exactement comme pour un
                  salarié classique.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">
                  Cette affiliation découle du cadre légal du portage, fixé par
                  l&apos;ordonnance du 2 avril 2015 et codifié aux articles
                  L1254-1 et suivants du Code du travail. Elle suppose que la
                  société de portage respecte ce cadre : c&apos;est un point à
                  vérifier avant de signer, au même titre que ses frais de
                  gestion.
                </p>
                <div className="mt-6 rounded-r-lg border-l-4 border-primary bg-muted p-4">
                  <p className="text-sm leading-relaxed text-foreground/80">
                    <strong className="text-foreground">La différence avec
                    l&apos;auto-entreprise est totale.</strong> Un
                    micro-entrepreneur ne cotise pas à l&apos;assurance chômage
                    et n&apos;ouvre aucun droit à l&apos;ARE. Le dispositif ATI
                    qui existe pour les indépendants est plafonné et soumis à des
                    conditions très restrictives. C&apos;est souvent ce seul
                    critère qui fait basculer un consultant vers le portage,
                    malgré son coût plus élevé — que vous pouvez chiffrer avec
                    notre{" "}
                    <Link href="/simulateurs/tjm-freelance" className="text-primary underline-offset-4 hover:underline">
                      comparateur de statuts
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>

            <section id="conditions" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
                Les conditions d&apos;ouverture en 2026
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Elles sont les mêmes que pour tout salarié. Deux durées
                d&apos;affiliation coexistent depuis le printemps 2026.
              </p>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
                <table className="w-full min-w-[38rem] text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4">Situation</th>
                      <th className="px-5 py-4 text-right">Jours travaillés</th>
                      <th className="px-5 py-4 text-right">ou heures</th>
                      <th className="px-5 py-4">Période de référence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-5 py-4 font-semibold text-foreground">Cas général</td>
                      <td className="px-5 py-4 text-right font-bold tabular-nums">{ARE_2026.JOURS_TRAVAILLES_REQUIS}</td>
                      <td className="px-5 py-4 text-right tabular-nums">{ARE_2026.HEURES_TRAVAILLEES_REQUISES}</td>
                      <td className="px-5 py-4 text-foreground/80">{ARE_2026.PERIODE_REFERENCE_MOIS} derniers mois</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-5 py-4 font-semibold text-foreground">
                        À partir de {ARE_2026.AGE_PERIODE_ALLONGEE} ans
                      </td>
                      <td className="px-5 py-4 text-right font-bold tabular-nums">{ARE_2026.JOURS_TRAVAILLES_REQUIS}</td>
                      <td className="px-5 py-4 text-right tabular-nums">{ARE_2026.HEURES_TRAVAILLEES_REQUISES}</td>
                      <td className="px-5 py-4 text-foreground/80">{ARE_2026.PERIODE_REFERENCE_MOIS_SENIOR} derniers mois</td>
                    </tr>
                    <tr className="bg-accent/5">
                      <td className="border-l-4 border-accent px-5 py-4 font-semibold text-foreground">
                        Première indemnisation
                        <span className="mt-1 block text-xs font-normal text-muted-foreground">
                          aucun droit ouvert depuis 20 ans
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-bold tabular-nums text-accent">{ARE_2026.JOURS_REQUIS_PRIMO_ENTRANT}</td>
                      <td className="px-5 py-4 text-right tabular-nums text-accent">{ARE_2026.HEURES_REQUISES_PRIMO_ENTRANT}</td>
                      <td className="px-5 py-4 text-foreground/80">{ARE_2026.PERIODE_REFERENCE_MOIS} ou {ARE_2026.PERIODE_REFERENCE_MOIS_SENIOR} mois</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-r-lg border-l-4 border-accent bg-accent/10 p-4">
                <p className="text-sm leading-relaxed text-foreground/80">
                  <strong className="text-foreground">Changement récent :</strong>{" "}
                  pour les fins de contrat intervenues{" "}
                  <strong>à compter du 1er avril 2026</strong>, le seuil tombe de{" "}
                  {ARE_2026.JOURS_TRAVAILLES_REQUIS} à{" "}
                  {ARE_2026.JOURS_REQUIS_PRIMO_ENTRANT} jours — environ cinq mois
                  au lieu de six — pour les primo-entrants. Un consultant qui
                  démarre en portage et dont la première mission tourne court
                  peut donc ouvrir des droits plus tôt qu&apos;auparavant.
                </p>
              </div>
            </section>

            <section id="montant" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
                Comment le montant est calculé
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                France Travail part du <strong>salaire journalier de référence</strong>{" "}
                (SJR), obtenu en divisant les salaires bruts de la période de
                référence par le nombre de jours calendaires. Il compare ensuite
                deux formules et retient la plus favorable :
              </p>
              <ul className="mt-4 space-y-2 text-base text-foreground/80">
                <li className="flex gap-3">
                  <span aria-hidden className="text-primary">→</span>
                  <span>
                    {(ARE_2026.TAUX_PROPORTIONNEL * 100).toFixed(1).replace(".", ",")} % du SJR,
                    augmentés d&apos;une partie fixe de {EUR2.format(ARE_2026.PARTIE_FIXE_JOUR)} par jour
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-primary">→</span>
                  <span>ou {(ARE_2026.TAUX_ALTERNATIF * 100).toFixed(0)} % du SJR</span>
                </li>
              </ul>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Le résultat ne peut pas descendre sous{" "}
                {EUR2.format(ARE_2026.ALLOCATION_MINIMALE_JOUR)} par jour, ni
                dépasser {Math.round(ARE_2026.PLAFOND_PART_SJR * 100)} % du SJR.
                Ce double plancher explique pourquoi les salaires les plus bas
                sont remplacés à un taux plus élevé que les hauts salaires,
                indemnisés à {(ARE_2026.TAUX_ALTERNATIF * 100).toFixed(0)} %.
              </p>
            </section>

            <section id="piege" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
                Le piège : ce n&apos;est pas votre CA qui compte
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                C&apos;est l&apos;erreur la plus répandue. Un consultant qui
                facture {EUR.format(caAnnuel)} par an imagine une allocation
                calculée sur cette base. En réalité, France Travail retient le{" "}
                <strong>salaire brut</strong> figurant sur ses bulletins de paie
                — c&apos;est-à-dire après les frais de gestion de la société de
                portage et après les charges patronales.
              </p>

              <div className="mt-6">
                <BarChart
                  caption={`Du CA facturé à l'allocation — TJM ${TJM} €, ${JOURS} jours/mois, ${FRAIS_GESTION} % de frais de gestion`}
                  data={cascade}
                  footnote="Cascade calculée par notre simulateur de portage puis par notre calculateur d'ARE, avec les paramètres Unédic d'avril 2026. Estimation indicative : seule France Travail détermine votre droit réel."
                />
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  Sur cet exemple, l&apos;allocation mensuelle s&apos;établit
                  autour de{" "}
                  <strong>{EUR.format(are.allocationMensuelle)}</strong> bruts,
                  soit {EUR2.format(are.allocationJournaliere)} par jour
                  indemnisé. Rapportée au chiffre d&apos;affaires facturé, elle
                  représente moins de{" "}
                  {Math.round((are.allocationMensuelle * 12 / caAnnuel) * 100)} %.
                  Rapportée au salaire brut, elle atteint en revanche{" "}
                  {Math.round(are.tauxRemplacement * 100)} % — le taux de
                  remplacement réel.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">
                  Ce n&apos;est pas une anomalie : c&apos;est la contrepartie
                  logique du fait que les cotisations chômage ont été prélevées
                  sur le salaire brut, pas sur le chiffre d&apos;affaires. Mais
                  il vaut mieux le savoir avant de bâtir un plan de trésorerie
                  sur une allocation surestimée.
                </p>
                <Link
                  href="/simulateurs/portage-salarial"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                >
                  Calculer mon salaire brut en portage →
                </Link>
              </div>
            </section>

            <section id="rupture" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
                Comment mettre fin au contrat sans perdre ses droits
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  Une confusion fréquente : <strong>la fin d&apos;une mission ne
                  met pas fin au CDI de portage</strong>. Le contrat se poursuit,
                  et vous restez salarié même sans mission en cours — simplement
                  sans rémunération, puisque celle-ci dépend de votre
                  facturation.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">
                  Pour ouvrir des droits, il faut que le contrat prenne fin par
                  un motif qui n&apos;est pas une démission simple :
                </p>
                <ul className="mt-4 space-y-2 text-base text-foreground/80">
                  <li className="flex gap-3">
                    <span aria-hidden className="text-accent">✅</span>
                    <span><strong>Rupture conventionnelle</strong> — la voie la plus courante, négociée avec la société de portage</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="text-accent">✅</span>
                    <span><strong>Licenciement</strong>, notamment en cas d&apos;absence prolongée de mission</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="text-accent">✅</span>
                    <span><strong>Fin d&apos;un CDD de portage</strong> arrivé à son terme</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="text-destructive">❌</span>
                    <span><strong>Démission simple</strong> — n&apos;ouvre pas de droit, sauf cas de démission légitime</span>
                  </li>
                </ul>
                <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
                  <p className="text-sm leading-relaxed">
                    Parlez-en à votre société de portage <em>avant</em> d&apos;agir.
                    Les pratiques varient d&apos;une structure à l&apos;autre, et
                    une rupture mal qualifiée peut vous coûter plusieurs mois
                    d&apos;indemnisation.
                  </p>
                </div>
              </div>
            </section>

            <section id="cumul" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
                Cumuler l&apos;ARE avec une mission en portage
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  C&apos;est possible, et c&apos;est même l&apos;un des usages
                  les plus pertinents du portage. Si vous reprenez une mission
                  pendant votre indemnisation, l&apos;allocation du mois est
                  réduite en fonction du salaire brut perçu — mais les jours non
                  indemnisés ne sont pas perdus : ils sont{" "}
                  <strong>reportés à la fin de vos droits</strong>.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">
                  Concrètement, une mission courte pendant une période de
                  chômage ne vous fait rien perdre : elle décale simplement la
                  fin de votre indemnisation. C&apos;est ce qui rend le portage
                  adapté à une reprise progressive, là où la création d&apos;une
                  société impose des choix plus définitifs.
                </p>
              </div>
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
                  Dernière mise à jour : septembre 2026. Les montants d&apos;allocation
                  présentés sont des estimations calculées avec les paramètres
                  Unédic d&apos;avril 2026 ; seule France Travail détermine votre
                  droit réel, en fonction de votre parcours exact. Ce guide est
                  informatif et ne constitue pas un conseil juridique. Une
                  erreur ?{" "}
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
