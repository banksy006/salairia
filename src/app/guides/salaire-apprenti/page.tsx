import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, GraduationCapIcon, CalculatorIcon, InfoIcon, PercentIcon } from "@/components/icons";
import { SALAIRE_2026 } from "@/lib/calculators/salaire-brut-net";

// Grille légale de rémunération des apprentis (C. trav. D6222-26),
// en % du SMIC. Montants dérivés du SMIC du simulateur (1 867,02 € au 1er juin 2026).
const SMIC = SALAIRE_2026.SMIC_MENSUEL_BRUT;
const GRILLE = [
  { age: "16 – 17 ans", annees: [27, 39, 55] },
  { age: "18 – 20 ans", annees: [43, 51, 67] },
  { age: "21 – 25 ans", annees: [53, 61, 78] },
  { age: "26 ans et plus", annees: [100, 100, 100] },
];
// Exonération de cotisations salariales jusqu'à 50 % du SMIC (LFSS 2025).
const SEUIL_EXO = SMIC * 0.5;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const meta: GuideMeta = {
  slug: "salaire-apprenti",
  titre: "Salaire d'un apprenti : la grille 2026 en euros",
  sousTitre: `De ${EUR.format(SMIC * 0.27)} à ${EUR.format(SMIC)} bruts selon l'âge et l'année — avec un net quasi égal au brut`,
  chapo: `La rémunération d'un apprenti est un pourcentage du SMIC, fixé par une grille légale croisant l'âge et l'année de contrat. Depuis la revalorisation du SMIC au 1er juin 2026 (1 867,02 € bruts), tous les montants ont bougé. Voici la grille complète en euros, la règle du changement de tranche en cours de contrat, et pourquoi le net d'un apprenti est si proche de son brut.`,
  filAriane: "Salaire apprenti",
  datePublished: "2026-08-23",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "grille", label: "La grille 2026" },
    { id: "net", label: "Du brut au net" },
    { id: "regles", label: "Les règles qui changent le montant" },
    { id: "impot", label: "Impôt et aides" },
  ],
  faq: [
    {
      q: "Quel est le salaire minimum d'un apprenti en 2026 ?",
      r: `Il dépend de l'âge et de l'année d'exécution du contrat, en pourcentage du SMIC (1 867,02 € bruts au 1er juin 2026). Les extrêmes : 27 % du SMIC (${EUR.format(SMIC * 0.27)}) pour un apprenti de 16-17 ans en première année, et 100 % du SMIC (${EUR.format(SMIC)}) dès 26 ans, quelle que soit l'année. Entre les deux, la grille légale prévoit par exemple 43 % (${EUR.format(SMIC * 0.43)}) pour un 18-20 ans en 1re année et 78 % (${EUR.format(SMIC * 0.78)}) pour un 21-25 ans en 3e année. Beaucoup de conventions collectives prévoient mieux : vérifiez la vôtre.`,
    },
    {
      q: "Le salaire d'un apprenti est-il vraiment net de charges ?",
      r: `En très grande partie, oui. La rémunération d'un apprenti est exonérée de cotisations salariales jusqu'à 50 % du SMIC, soit ${EUR2.format(SEUIL_EXO)} par mois en 2026. En dessous de ce seuil — ce qui couvre toutes les premières années et la plupart des deuxièmes années — le net est égal au brut. Au-delà, seule la fraction excédentaire supporte les cotisations : un apprenti à 78 % du SMIC (${EUR.format(SMIC * 0.78)}) ne cotise que sur environ ${EUR.format(SMIC * 0.28)}.`,
    },
    {
      q: "Que se passe-t-il quand l'apprenti change de tranche d'âge en cours de contrat ?",
      r: "Le passage à 18 ans ou à 21 ans déclenche automatiquement le pourcentage supérieur, dès le premier jour du mois qui suit l'anniversaire. Un apprenti qui fête ses 21 ans le 12 mars passe de 51 % à 61 % du SMIC (s'il est en 2e année) au 1er avril. À l'inverse, le passage en année supérieure de formation s'applique à la date anniversaire du contrat. Les deux mécanismes se cumulent — c'est la source d'erreur de paie la plus fréquente sur les contrats d'apprentissage.",
    },
    {
      q: "Un apprenti paie-t-il des impôts sur son salaire ?",
      r: "Rarement. Les salaires versés aux apprentis sont exonérés d'impôt sur le revenu dans la limite du SMIC annuel — au-delà de ce plafond, seul l'excédent est imposable. Un apprenti rémunéré toute l'année sous 100 % du SMIC ne déclare donc rien d'imposable à ce titre. Attention au cas du rattachement au foyer fiscal des parents : l'exonération s'applique de la même façon, l'excédent éventuel s'ajoutant aux revenus du foyer.",
    },
    {
      q: "L'apprenti compte-t-il pour la retraite et le chômage ?",
      r: "Oui aux deux. Les périodes d'apprentissage valident des trimestres de retraite (l'État complète les cotisations si la rémunération est trop faible pour valider 4 trimestres) et l'apprenti cotise à l'assurance chômage comme tout salarié : un contrat d'apprentissage de 2 ans ouvre des droits ARE à son terme s'il n'est pas suivi d'une embauche. Le portage de ces droits vers un projet indépendant est d'ailleurs possible — notre guide sur le cumul ARE et micro-entreprise détaille la mécanique.",
    },
  ],
  sources: [
    { label: "Code du travail, art. D6222-26 — rémunération des apprentis (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038025782" },
    { label: "service-public.fr — salaire d'un apprenti", href: "https://www.service-public.fr/particuliers/vosdroits/F2918" },
    { label: "URSSAF — l'embauche d'un apprenti", href: "https://www.urssaf.fr/accueil/employeur/embaucher-gerer-salaries/embaucher-apprenti.html" },
    { label: "Arrêté du 22 mai 2026 portant relèvement du SMIC (Légifrance)", href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054126589" },
  ],
};

export const metadata: Metadata = {
  title: `Salaire apprenti 2026 : grille complète en euros, de ${EUR.format(SMIC * 0.27)} à ${EUR.format(SMIC)}`,
  description: `Grille officielle de rémunération des apprentis avec le SMIC de juin 2026 : montants exacts par âge (16-17, 18-20, 21-25, 26+) et année de contrat, exonération de cotisations jusqu'à ${EUR2.format(SEUIL_EXO)}, changement de tranche, impôt.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Salaire d'un apprenti : la grille 2026 en euros",
    description: "Tous les montants par âge et année de contrat, calculés sur le SMIC en vigueur.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="grille" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><GraduationCapIcon className="w-4 h-4" /></IconBadge>
          La grille 2026, en pourcentages et en euros
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Grille légale (C. trav., art. D6222-26), appliquée au SMIC en vigueur
          depuis le 1er juin 2026 — {EUR2.format(SMIC)} bruts mensuels pour
          151,67 h. Les conventions collectives peuvent prévoir des minima
          supérieurs :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Âge</th>
                <th className="px-5 py-4 text-right">1re année</th>
                <th className="px-5 py-4 text-right">2e année</th>
                <th className="px-5 py-4 text-right">3e année</th>
              </tr>
            </thead>
            <tbody>
              {GRILLE.map((l) => (
                <tr key={l.age} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{l.age}</td>
                  {l.annees.map((pct, i) => (
                    <td key={i} className="px-5 py-3 text-right">
                      <span className="block text-base font-bold tabular-nums text-primary">{EUR.format(SMIC * pct / 100)}</span>
                      <span className="text-xs text-muted-foreground">{pct} % du SMIC</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Dès <strong>26 ans</strong>, l&apos;apprenti est payé au moins au
          SMIC complet (ou au salaire minimum conventionnel de l&apos;emploi
          occupé s&apos;il est supérieur), quelle que soit l&apos;année de
          formation. Pour les licences pro en un an et certains contrats
          courts, c&apos;est la grille de l&apos;année qui correspond au
          diplôme préparé qui s&apos;applique.
        </p>
      </section>

      <section id="net" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Du brut au net : la règle des 50 % du SMIC
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le bulletin d&apos;un apprenti ne ressemble à aucun autre : la
            rémunération est <strong>exonérée de cotisations salariales
            jusqu&apos;à 50 % du SMIC</strong>, soit {EUR2.format(SEUIL_EXO)}{" "}
            par mois en 2026. Concrètement :
          </p>
          <ul className="mt-4 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span>Un apprenti à 43 % du SMIC ({EUR.format(SMIC * 0.43)}) est sous le seuil : <strong>net = brut</strong>, au centime près.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span>Un apprenti à 78 % du SMIC ({EUR.format(SMIC * 0.78)}) ne cotise que sur la fraction au-delà de {EUR2.format(SEUIL_EXO)}, soit environ {EUR.format(SMIC * 0.28)} — la retenue reste légère.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span>La CSG-CRDS suit la même logique d&apos;exonération sous le seuil : c&apos;est ce qui distingue l&apos;apprenti du salarié classique, dont le net tourne autour de 78 % du brut — comparez avec notre <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">simulateur brut/net</Link>.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="regles" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Les règles qui font bouger le montant en cours de contrat
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">L&apos;anniversaire</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Le passage à 18 ou 21 ans applique la tranche supérieure{" "}
              <strong>dès le 1er jour du mois suivant</strong>. Ce n&apos;est
              pas à l&apos;employeur d&apos;y penser « à l&apos;occasion » :
              c&apos;est automatique et rétroactivement exigible.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">L&apos;année de contrat</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Le passage en 2e ou 3e année se fait à la{" "}
              <strong>date anniversaire du contrat</strong>, pas à la rentrée
              scolaire. Contrat signé un 15 septembre : la 2e année démarre le
              15 septembre suivant.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Le SMIC lui-même</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Chaque revalorisation du SMIC répercute mécaniquement la grille :
              celle du 1er juin 2026 a augmenté tous les salaires
              d&apos;apprentis de 2,4 %. Prochaine échéance attendue :
              le 1er janvier 2027.
            </p>
          </div>
        </div>
      </section>

      <section id="impot" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Impôt, aides et cumuls
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Impôt sur le revenu</strong> : salaire exonéré jusqu&apos;au SMIC annuel ; seul l&apos;excédent se déclare. La quasi-totalité des apprentis ne paie rien.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Prime d&apos;activité</strong> : accessible dès 18 ans si la rémunération dépasse un seuil (~1 100 € nets) — le simulateur de la CAF fait foi.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Aides au logement et mobili-jeune</strong> : cumulables avec le salaire d&apos;apprenti ; l&apos;aide mobili-jeune (Action Logement) peut couvrir une partie du loyer pendant la formation.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Après le contrat</strong> : les droits au chômage sont ouverts comme pour tout salarié, et l&apos;expérience compte pour l&apos;ancienneté si l&apos;entreprise embauche. Pour situer la première vraie rémunération qui suit, notre simulateur <Link href="/simulateurs/ou-se-situe-mon-salaire" className="text-primary underline-offset-4 hover:underline">« où se situe mon salaire »</Link> donne le percentile exact.</span>
            </li>
          </ul>
        </div>
      </section>
    </GuideShell>
  );
}
