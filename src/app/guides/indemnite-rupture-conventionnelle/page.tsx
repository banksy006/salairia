import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalculatorIcon, ScaleIcon, CalendarIcon, AlertTriangleIcon, InfoIcon } from "@/components/icons";
import { SALAIRE_2026 } from "@/lib/calculators/salaire-brut-net";

// Indemnité légale de licenciement (plancher de la rupture conventionnelle) :
// 1/4 de mois de salaire par année jusqu'à 10 ans, 1/3 au-delà (C. trav. R1234-2).
const indemniteLegale = (salaireRef: number, annees: number) =>
  salaireRef * (Math.min(annees, 10) / 4 + Math.max(annees - 10, 0) / 3);

const EXEMPLES = [
  { salaire: 2_000, annees: 3 },
  { salaire: 2_500, annees: 5 },
  { salaire: 2_800, annees: 8 },
  { salaire: 3_200, annees: 12 },
  { salaire: 4_000, annees: 15 },
];
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

// Contribution patronale spécifique sur la part exonérée de cotisations : 40 %
// pour les ruptures prenant effet à compter du 1er janvier 2026 (LFSS 2026,
// art. 15 ; 30 % auparavant). Source : France Travail, employeurs, 2026.
const CONTRIBUTION_PATRONALE = 0.4;
const CSG_CRDS = 0.097;
const PASS = SALAIRE_2026.PASS_ANNUEL;
// Budget 2027 (projets déposés le 1er octobre 2026) : plafond unique
// d'exonération égal à 1 PASS pour les cotisations, la CSG et l'impôt —
// PLFSS 2027, art. 6, pour les ruptures prenant effet à compter du 1er janvier
// 2027 ; PLF 2027, art. 2, pour l'impôt. PASS 2027 estimé à 48 900 € par la
// Commission des comptes de la Sécurité sociale (octobre 2026).
const PASS_2027_ESTIME = 48_900;

// Deux départs négociés. Règles actuelles simplifiées (rupture conventionnelle
// hors PSE) : impôt exonéré jusqu'au plus élevé du montant légal, de 2 ans de
// rémunération ou de 50 % de l'indemnité, dans la limite de 6 PASS ;
// cotisations exonérées dans la limite de 2 PASS ; CSG-CRDS due au-delà du
// montant légal.
const CAS_2027 = [
  { label: "Employé, 8 ans à 2 800 €", salaire: 2_800, annees: 8, indemnite: 15_000 },
  { label: "Cadre, 20 ans à 6 000 €", salaire: 6_000, annees: 20, indemnite: 90_000 },
].map((c) => {
  const legal = indemniteLegale(c.salaire, c.annees);
  const exoImpot = Math.min(Math.max(legal, 2 * c.salaire * 12, 0.5 * c.indemnite), 6 * PASS);
  const exoCotis = Math.min(exoImpot, 2 * PASS);
  const csgAujourdhui = Math.max(0, c.indemnite - legal);
  const cotisAujourdhui = Math.max(0, c.indemnite - exoCotis);
  const impotAujourdhui = Math.max(0, c.indemnite - exoImpot);
  const soumis2027 = Math.max(0, c.indemnite - PASS_2027_ESTIME);
  return { ...c, legal, csgAujourdhui, cotisAujourdhui, impotAujourdhui, soumis2027 };
});

const meta: GuideMeta = {
  slug: "indemnite-rupture-conventionnelle",
  titre: "Indemnité de rupture conventionnelle : le calcul exact",
  sousTitre: "Le plancher légal, la formule, cinq cas chiffrés — et ce que ça change pour le chômage",
  chapo: "La rupture conventionnelle est le seul mode de départ négocié qui cumule une indemnité minimale garantie et le droit au chômage. Son plancher est l'indemnité légale de licenciement : un quart de mois de salaire par année d'ancienneté jusqu'à dix ans, un tiers au-delà. Voici la formule exacte, les subtilités d'assiette qui changent le résultat, et la fiscalité de ce que vous touchez.",
  filAriane: "Rupture conventionnelle",
  datePublished: "2026-08-23",
  dateModified: "2026-10-08",
  tocItems: [
    { id: "formule", label: "La formule légale" },
    { id: "exemples", label: "Cinq cas chiffrés" },
    { id: "fiscalite", label: "Impôts et cotisations" },
    { id: "budget-2027", label: "Ce que change le budget 2027" },
    { id: "chomage", label: "Chômage et délais" },
  ],
  faq: [
    {
      q: "Comment se calcule l'indemnité minimale de rupture conventionnelle ?",
      r: "Elle ne peut pas être inférieure à l'indemnité légale de licenciement : 1/4 de mois de salaire de référence par année d'ancienneté pour les dix premières années, puis 1/3 de mois par année au-delà de dix ans. Le salaire de référence est le plus favorable entre la moyenne des 12 derniers mois et celle des 3 derniers mois (primes annuelles proratisées). Les années incomplètes comptent au prorata des mois. Exemple : 8 ans d'ancienneté à 2 800 € → 2 800 × 8/4 = 5 600 € minimum.",
    },
    {
      q: "Peut-on négocier plus que le minimum ?",
      r: "Oui, et c'est tout l'enjeu de la négociation : le plancher est un minimum légal, pas un tarif. L'employeur qui souhaite le départ a souvent intérêt à payer davantage qu'un licenciement contesté aux prud'hommes. Les indemnités supra-légales se négocient en mois de salaire ; leur revers est double : elles allongent le délai de carence France Travail (jusqu'à 150 jours au lieu de 7) et, au-delà de certains seuils, elles réintègrent cotisations et CSG. Négociez en net réellement perçu, pas en brut affiché.",
    },
    {
      q: "L'indemnité de rupture conventionnelle est-elle imposable ?",
      r: "La part correspondant à l'indemnité légale ou conventionnelle de licenciement est exonérée d'impôt sur le revenu. Au-delà, l'exonération continue dans la limite du plus élevé de : 2 fois la rémunération annuelle brute de l'année précédente, ou 50 % de l'indemnité totale — le tout plafonné à 6 fois le plafond annuel de la Sécurité sociale. Côté cotisations sociales, l'exonération est plafonnée à 2 PASS, et la CSG-CRDS reprend dès que l'indemnité dépasse le montant légal. Une contribution patronale de 40 % (30 % avant 2026) s'applique par ailleurs sur la part exonérée — elle pèse sur le coût employeur, donc sur votre marge de négociation. Attention : le budget 2027 propose de remplacer tous ces plafonds par une limite unique égale au plafond annuel de la Sécurité sociale, pour l'impôt comme pour les cotisations et la CSG.",
    },
    {
      q: "Qu'est-ce que le budget 2027 change pour les indemnités de rupture ?",
      r: "Le projet de loi de financement de la Sécurité sociale (article 6) et le projet de loi de finances (article 2), déposés le 1er octobre 2026, remplacent les règles actuelles par un plafond unique : l'indemnité serait exonérée de cotisations, de CSG-CRDS et d'impôt dans la limite d'un plafond annuel de la Sécurité sociale — 48 060 € en 2026, environ 48 900 € en 2027 — et soumise à tout au-delà. Le volet social viserait les ruptures prenant effet à compter du 1er janvier 2027. Le volet fiscal, dans la version déposée, s'appliquerait dès l'imposition des revenus 2026 ; des amendements proposent de l'aligner sur la même date. Selon le gouvernement, 95 % des salariés ne seraient pas pénalisés.",
    },
    {
      q: "La rupture conventionnelle ouvre-t-elle droit au chômage ?",
      r: "Oui, intégralement — c'est sa différence fondamentale avec la démission. L'ARE est calculée sur vos salaires antérieurs comme pour un licenciement. Deux délais avant le premier versement : le délai d'attente de 7 jours, et un différé d'indemnisation si vous avez perçu une indemnité supra-légale — environ 1 jour de différé par tranche de 107,9 € au-delà du minimum légal, plafonné à 150 jours. Une indemnité supra-légale de 10 000 € décale ainsi l'ARE d'environ 3 mois : à intégrer dans le calcul global.",
    },
    {
      q: "Quelle est la procédure, et combien de temps prend-elle ?",
      r: "Un ou plusieurs entretiens, la signature de la convention (formulaire en ligne via TéléRC ou le formulaire Cerfa), puis deux délais incompressibles : 15 jours calendaires de rétractation pour chaque partie, puis 15 jours ouvrables d'homologation par l'administration (DDETS) — le silence vaut acceptation. Comptez donc 5 à 6 semaines minimum entre la signature et la fin effective du contrat. Le salarié protégé suit un circuit différent (autorisation de l'inspection du travail).",
    },
  ],
  sources: [
    { label: "Code du travail, art. R1234-2 — montant de l'indemnité légale (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035644154" },
    { label: "Code du travail, art. L1237-11 à L1237-16 — rupture conventionnelle (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000019071187/" },
    { label: "service-public.fr — indemnité spécifique de rupture conventionnelle", href: "https://www.service-public.fr/particuliers/vosdroits/F19030" },
    { label: "Code du travail numérique — simulateur officiel d'indemnité", href: "https://code.travail.gouv.fr/outils/indemnite-licenciement" },
    { label: "Unédic — différé d'indemnisation", href: "https://www.unedic.org/la-reglementation/fiches-thematiques/differes-dindemnisation-et-delai-dattente" },
    { label: "France Travail — rupture conventionnelle en 2026 : contribution patronale portée à 40 % (LFSS 2026)", href: "https://www.francetravail.org/accueil/actualites/2026/rupture-conventionnelle-en-2026-quelles-nouvelles-regles-et-impacts-pour-employeurs-et-salaries.html?type=article" },
    { label: "Projet de loi de financement de la Sécurité sociale pour 2027, n° 3211, art. 6 (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3211_projet-loi" },
    { label: "Projet de loi de finances pour 2027, n° 3210, art. 2 (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3210_projet-loi.pdf" },
  ],
};

export const metadata: Metadata = {
  title: "Indemnité rupture conventionnelle : calcul, fiscalité et plafond 2027",
  description: `1/4 de mois par année jusqu'à 10 ans, 1/3 au-delà : la formule exacte du minimum légal avec 5 cas chiffrés — de ${EUR.format(indemniteLegale(2000, 3))} pour 3 ans à ${EUR.format(indemniteLegale(4000, 15))} pour 15 ans. Fiscalité actuelle, contribution patronale à 40 %, plafond unique d'1 PASS prévu par le budget 2027, différé France Travail.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Indemnité de rupture conventionnelle : le calcul exact",
    description: "Formule légale, cas chiffrés, fiscalité et impact sur le chômage.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="formule" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          La formule légale, pièce par pièce
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            L&apos;indemnité spécifique de rupture conventionnelle a un
            plancher : l&apos;indemnité légale de licenciement (C. trav., art.
            R1234-2), soit :
          </p>
          <div className="mt-4 rounded-xl bg-muted p-5 text-center">
            <p className="font-semibold text-foreground">
              ¼ de mois de salaire × années d&apos;ancienneté (jusqu&apos;à 10 ans)
            </p>
            <p className="mt-1 font-semibold text-foreground">
              + ⅓ de mois × chaque année au-delà de 10 ans
            </p>
          </div>
          <ul className="mt-5 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Le salaire de référence</strong> est le plus favorable des deux : moyenne des 12 derniers mois bruts, ou moyenne des 3 derniers (les primes annuelles versées sur cette période n&apos;y comptent qu&apos;au prorata).</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Les années incomplètes comptent</strong> : 7 ans et 6 mois donnent 7,5 années dans la formule. L&apos;ancienneté s&apos;apprécie à la date de fin du contrat, préavis compris.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Votre convention collective peut faire mieux</strong> : si elle prévoit une indemnité de licenciement plus favorable, c&apos;est elle qui devient le plancher. Vérifiez avant de négocier — l&apos;écart peut être significatif dans la banque, la chimie ou la métallurgie.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Aucune condition d&apos;ancienneté</strong> : contrairement à l&apos;indemnité de licenciement (8 mois requis), l&apos;indemnité de rupture conventionnelle est due dès le premier mois, au prorata.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="exemples" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Cinq cas chiffrés
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Minimum légal calculé par la formule ci-dessus — ce sont des
          planchers de négociation, pas des plafonds :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Salaire de référence</th>
                <th className="px-5 py-4 text-right">Ancienneté</th>
                <th className="px-5 py-4 text-right">Détail</th>
                <th className="px-5 py-4 text-right">Minimum légal</th>
              </tr>
            </thead>
            <tbody>
              {EXEMPLES.map(({ salaire, annees }) => (
                <tr key={`${salaire}-${annees}`} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold tabular-nums text-foreground">{EUR.format(salaire)}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{annees} ans</td>
                  <td className="px-5 py-3 text-right text-xs text-muted-foreground">
                    {annees <= 10 ? `${annees} × ¼ mois` : `10 × ¼ + ${annees - 10} × ⅓ mois`}
                  </td>
                  <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">
                    {EUR.format(indemniteLegale(salaire, annees))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Pour un calcul au mois près intégrant votre convention collective, le
          simulateur officiel du Code du travail numérique (en sources) fait
          référence — c&apos;est celui que consultent les DDETS lors de
          l&apos;homologation.
        </p>
      </section>

      <section id="fiscalite" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Ce que vous touchez vraiment : impôts et cotisations
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Jusqu&apos;au montant légal ou conventionnel</strong> : zéro impôt sur le revenu, zéro cotisation, zéro CSG. Les {EUR.format(indemniteLegale(2800, 8))} de notre cas à 8 ans arrivent intacts sur le compte.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>La part supra-légale</strong> reste exonérée d&apos;impôt dans la limite du plus élevé de : 2 fois votre rémunération annuelle brute N-1, ou 50 % de l&apos;indemnité totale (plafond global : 6 PASS). Mais la CSG-CRDS (9,7 %) s&apos;applique dès le premier euro au-delà du montant légal, et les cotisations reprennent au-delà de 2 PASS.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-amber-600">ℹ️</span>
              <span><strong>Côté employeur</strong>, une contribution patronale de {Math.round(CONTRIBUTION_PATRONALE * 100)} % frappe la part exonérée de cotisations, pour les ruptures depuis le 1er janvier 2026 (30 % auparavant). Quand vous négociez « un mois de plus », il en coûte {(1 + CONTRIBUTION_PATRONALE).toLocaleString("fr-FR")} à l&apos;entreprise — connaître ce chiffre aide à cadrer la discussion.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="budget-2027" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce que le budget 2027 changerait : un plafond unique d&apos;1 PASS
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Les projets de lois de finances et de financement de la Sécurité
            sociale déposés le 1er octobre 2026 balaient le régime actuel :
            l&apos;indemnité serait exonérée de cotisations, de CSG-CRDS et
            d&apos;impôt <strong>dans la limite d&apos;un plafond annuel de la
            Sécurité sociale</strong> — {EUR.format(PASS)} en 2026, environ{" "}
            {EUR.format(PASS_2027_ESTIME)} en 2027 — et soumise à tout
            au-delà, y compris pour la part correspondant au minimum légal.
            Une indemnité supérieure à 10 PASS resterait soumise dès le premier
            euro.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Effet sur deux départs négociés, en montants soumis à prélèvements
            (règles actuelles simplifiées, PASS 2027 estimé) :
          </p>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Cas</th>
                <th className="px-5 py-4 text-right">Indemnité</th>
                <th className="px-5 py-4">Aujourd&apos;hui, soumis à</th>
                <th className="px-5 py-4">Budget 2027, soumis à tout sur</th>
              </tr>
            </thead>
            <tbody>
              {CAS_2027.map((c) => (
                <tr key={c.label} className="border-b border-border align-top last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">
                    {c.label}
                    <span className="block text-xs font-normal text-muted-foreground">minimum légal {EUR.format(c.legal)}</span>
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(c.indemnite)}</td>
                  <td className="px-5 py-3 text-foreground/80">
                    CSG-CRDS : {EUR.format(c.csgAujourdhui)} (soit {EUR.format(c.csgAujourdhui * CSG_CRDS)})
                    <span className="block text-xs text-muted-foreground">
                      cotisations : {EUR.format(c.cotisAujourdhui)} · impôt : {EUR.format(c.impotAujourdhui)}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold text-foreground">
                    {c.soumis2027 === 0 ? "Rien — indemnité entièrement exonérée" : `${EUR.format(c.soumis2027)} (cotisations, CSG-CRDS et impôt)`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Lecture : pour la plupart des départs, la réforme serait neutre, voire
          favorable — dans le premier cas, la CSG-CRDS due aujourd&apos;hui sur
          la part supra-légale disparaîtrait. Elle pénalise en revanche les
          indemnités au-delà d&apos;un PASS, typiquement les cadres à forte
          ancienneté : la fraction excédentaire supporterait cotisations,
          CSG-CRDS et impôt, alors qu&apos;elle est aujourd&apos;hui largement
          exonérée.
        </p>
        <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-5 text-amber-900">
          <p className="flex items-start gap-3 text-sm leading-relaxed">
            <AlertTriangleIcon className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <span>
              Ce sont des <strong>projets de loi</strong>. Le volet social
              viserait les ruptures prenant effet à compter du 1er janvier
              2027 ; le volet fiscal, dans la version déposée, s&apos;appliquerait
              dès l&apos;imposition des revenus 2026, selon l&apos;évaluation
              préalable du gouvernement — des amendements proposent de le
              réserver aux ruptures de 2027. Si vous négociez un départ
              important d&apos;ici la fin de l&apos;année, faites vérifier la
              date de rupture et de versement par un professionnel : cette page
              sera mise à jour à chaque étape du vote.
            </span>
          </p>
        </div>
      </section>

      <section id="chomage" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Chômage : le droit est acquis, le timing se calcule
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La rupture conventionnelle ouvre droit à l&apos;ARE dans les mêmes
            conditions qu&apos;un licenciement. Mais le premier versement
            n&apos;est pas immédiat : au délai d&apos;attente de 7 jours
            s&apos;ajoute un <strong>différé spécifique</strong> si vous avez
            négocié au-delà du minimum légal — environ un jour de carence par
            tranche de 107,9 € d&apos;indemnité supra-légale, plafonné à 150
            jours. Dix mille euros de supra-légal ≈ trois mois sans allocation.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            C&apos;est le paramètre à mettre en face de la négociation : un
            supra-légal généreux et un différé long peuvent rapporter moins,
            sur six mois, qu&apos;un montant plus modeste versé avec une ARE
            qui démarre vite — surtout si un projet indépendant vous attend.
            Pour chiffrer la suite, nos guides{" "}
            <Link href="/guides/auto-entrepreneur-chomage" className="text-primary underline-offset-4 hover:underline">
              cumul ARE + micro-entreprise
            </Link>{" "}
            et{" "}
            <Link href="/simulateurs/tjm-freelance" className="text-primary underline-offset-4 hover:underline">
              notre comparateur de statuts freelance
            </Link>{" "}
            prennent le relais.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
