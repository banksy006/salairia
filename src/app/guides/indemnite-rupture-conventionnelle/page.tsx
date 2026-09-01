import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalculatorIcon, ScaleIcon, CalendarIcon, AlertTriangleIcon } from "@/components/icons";

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

const meta: GuideMeta = {
  slug: "indemnite-rupture-conventionnelle",
  titre: "Indemnité de rupture conventionnelle : le calcul exact",
  sousTitre: "Le plancher légal, la formule, cinq cas chiffrés — et ce que ça change pour le chômage",
  chapo: "La rupture conventionnelle est le seul mode de départ négocié qui cumule une indemnité minimale garantie et le droit au chômage. Son plancher est l'indemnité légale de licenciement : un quart de mois de salaire par année d'ancienneté jusqu'à dix ans, un tiers au-delà. Voici la formule exacte, les subtilités d'assiette qui changent le résultat, et la fiscalité de ce que vous touchez.",
  filAriane: "Rupture conventionnelle",
  datePublished: "2026-08-23",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "formule", label: "La formule légale" },
    { id: "exemples", label: "Cinq cas chiffrés" },
    { id: "fiscalite", label: "Impôts et cotisations" },
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
      r: "La part correspondant à l'indemnité légale ou conventionnelle de licenciement est exonérée d'impôt sur le revenu. Au-delà, l'exonération continue dans la limite du plus élevé de : 2 fois la rémunération annuelle brute de l'année précédente, ou 50 % de l'indemnité totale — le tout plafonné à 6 fois le plafond annuel de la Sécurité sociale. Côté cotisations sociales, l'exonération est plafonnée à 2 PASS, et la CSG-CRDS reprend dès que l'indemnité dépasse le montant légal. Une contribution patronale de 30 % s'applique par ailleurs sur la part exonérée — elle pèse sur le coût employeur, donc sur votre marge de négociation.",
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
  ],
};

export const metadata: Metadata = {
  title: "Indemnité rupture conventionnelle 2026 : calcul, minimum légal, fiscalité",
  description: `1/4 de mois par année jusqu'à 10 ans, 1/3 au-delà : la formule exacte du minimum légal avec 5 cas chiffrés — de ${EUR.format(indemniteLegale(2000, 3))} pour 3 ans à ${EUR.format(indemniteLegale(4000, 15))} pour 15 ans. Fiscalité, différé France Travail, procédure.`,
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
              <span><strong>Côté employeur</strong>, une contribution patronale de 30 % frappe la part exonérée de cotisations. Quand vous négociez « un mois de plus », il en coûte 1,3 à l&apos;entreprise — connaître ce chiffre aide à cadrer la discussion.</span>
            </li>
          </ul>
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
