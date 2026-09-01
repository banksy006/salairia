import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, CalculatorIcon, PercentIcon, InfoIcon } from "@/components/icons";
import { SALAIRE_2026, calculerBrutVersNet } from "@/lib/calculators/salaire-brut-net";

// Valeurs en vigueur (arrêté du 22 mai 2026, effet 1er juin 2026), depuis nos constantes.
const SMIC = SALAIRE_2026.SMIC_MENSUEL_BRUT;
const SMIC_HORAIRE = SMIC / 151.67;
const netSmic = calculerBrutVersNet({
  salaire: SMIC,
  mode: "brut-vers-net",
  periodicite: "mensuel",
  statut: "non-cadre",
  tauxPAS: 0,
}).netAvantImpotMensuel;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const meta: GuideMeta = {
  slug: "smic-2027",
  titre: "SMIC 2027 : ce qui va se passer au 1er janvier",
  sousTitre: `Le SMIC actuel — ${EUR2.format(SMIC)} bruts, ~${EUR.format(netSmic)} nets — et la mécanique qui fixera le montant 2027`,
  chapo: "Le montant du SMIC 2027 n'existe pas encore : il sera fixé par décret mi-décembre 2026, pour une entrée en vigueur au 1er janvier 2027. Mais la formule qui le déterminera, elle, est connue et publique. Cette page explique la mécanique de revalorisation, rappelle les valeurs en vigueur, et sera mise à jour le jour de la publication du décret avec les montants exacts.",
  filAriane: "SMIC 2027",
  datePublished: "2026-08-23",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "actuel", label: "Le SMIC aujourd'hui" },
    { id: "formule", label: "La formule de revalorisation" },
    { id: "calendrier", label: "Le calendrier" },
    { id: "effets", label: "Ce qu'une hausse déclenche" },
  ],
  faq: [
    {
      q: "Quel sera le montant du SMIC au 1er janvier 2027 ?",
      r: `Il n'est pas encore fixé — et quiconque affiche aujourd'hui un montant précis l'invente. Le décret est publié chaque année autour de la mi-décembre, après avis du groupe d'experts sur le SMIC et de la Commission nationale de la négociation collective. La revalorisation légale résulte d'une formule mécanique : l'inflation constatée pour les 20 % de ménages aux revenus les plus faibles, plus la moitié du gain de pouvoir d'achat du salaire horaire moyen des ouvriers et employés. Le gouvernement peut y ajouter un « coup de pouce », rare depuis 2012. Cette page sera mise à jour avec les montants exacts dès la publication au Journal officiel.`,
    },
    {
      q: "Quel est le montant du SMIC actuellement en vigueur ?",
      r: `Depuis le 1er juin 2026 : ${EUR2.format(SMIC_HORAIRE)} de l'heure, soit ${EUR2.format(SMIC)} bruts par mois pour un temps plein de 151,67 heures — environ ${EUR.format(netSmic)} nets avant impôt d'après notre simulateur brut/net. Cette revalorisation de juin (+2,4 %) était une revalorisation infra-annuelle automatique, déclenchée parce que l'inflation mesurée avait dépassé 2 % depuis la dernière hausse.`,
    },
    {
      q: "Le SMIC peut-il augmenter en cours d'année 2027 ?",
      r: "Oui, c'est le mécanisme qui a joué en juin 2026 : dès que l'indice des prix à la consommation des ménages du premier quintile progresse d'au moins 2 % par rapport à l'indice constaté lors de l'établissement du dernier SMIC, une revalorisation automatique du même pourcentage intervient, sans attendre le 1er janvier. Dans les périodes d'inflation forte, cela peut se produire plusieurs fois par an — trois fois en 2022. En période d'inflation modérée, la hausse annuelle de janvier reste la seule.",
    },
    {
      q: "Une hausse du SMIC augmente-t-elle tous les salaires ?",
      r: "Non — elle ne relève directement que les salaires qui passeraient en dessous du nouveau minimum. Un salarié à 1 900 € bruts n'a droit à rien automatiquement. Les effets indirects existent : les minima de branche doivent être renégociés quand ils passent sous le SMIC, la grille des apprentis (en pourcentage du SMIC) suit mécaniquement, et certains seuils sociaux indexés bougent. Mais l'effet de « tassement » est réel : sans négociation, l'écart entre le SMIC et les premiers niveaux de grille se resserre à chaque revalorisation.",
    },
    {
      q: "Le SMIC net va-t-il augmenter autant que le brut ?",
      r: "Pas nécessairement à l'identique : le net dépend aussi des taux de cotisations et de la CSG, qui peuvent bouger au 1er janvier. Historiquement, le net suit le brut de près pour le SMIC (les allègements de cotisations y sont concentrés). Dès la publication du décret, notre simulateur brut/net intégrera les nouvelles valeurs et cette page affichera le SMIC 2027 en brut, en net et de l'heure.",
    },
  ],
  sources: [
    { label: "Code du travail, art. L3231-4 à L3231-12 — modalités de fixation du SMIC (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006177908/" },
    { label: "Arrêté du 22 mai 2026 portant relèvement du SMIC (Légifrance)", href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054126589" },
    { label: "URSSAF — le SMIC et le minimum garanti", href: "https://www.urssaf.fr/accueil/actualites/augmentation-smic.html" },
    { label: "Groupe d'experts SMIC — rapports annuels (dares.travail-emploi.gouv.fr)", href: "https://dares.travail-emploi.gouv.fr/" },
  ],
};

export const metadata: Metadata = {
  title: "SMIC 2027 : date, formule de revalorisation, montant actuel",
  description: `Le SMIC 2027 sera fixé par décret mi-décembre 2026 pour le 1er janvier. En attendant : la formule légale de revalorisation expliquée, le montant en vigueur (${EUR2.format(SMIC)} bruts, ~${EUR.format(netSmic)} nets) et tous les effets d'une hausse. Page mise à jour dès la publication du décret.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "SMIC 2027 : ce qui va se passer au 1er janvier",
    description: "La formule, le calendrier, et les montants dès leur publication officielle.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="actuel" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Le SMIC en vigueur aujourd&apos;hui
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: EUR2.format(SMIC_HORAIRE), l: "brut de l'heure" },
            { v: EUR2.format(SMIC), l: "bruts par mois (151,67 h)" },
            { v: `≈ ${EUR.format(netSmic)}`, l: "nets par mois avant impôt, calculés par notre simulateur" },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
              <p className="text-3xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.l}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Ces valeurs datent du <strong>1er juin 2026</strong> (arrêté du 22
          mai 2026) : l&apos;inflation ayant dépassé 2 % depuis la précédente
          fixation, la revalorisation automatique infra-annuelle de +2,4 %
          s&apos;est déclenchée sans attendre janvier. C&apos;est de cette
          base que partira le calcul du SMIC 2027.
        </p>
      </section>

      <section id="formule" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          La formule qui fixera le montant 2027
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La revalorisation du 1er janvier n&apos;est pas une décision
            discrétionnaire : le Code du travail impose un plancher calculé en
            deux morceaux :
          </p>
          <ul className="mt-4 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>L&apos;inflation des ménages modestes</strong> : l&apos;évolution de l&apos;indice des prix à la consommation (hors tabac) des 20 % de ménages aux revenus les plus faibles — un indice plus sensible à l&apos;alimentation et à l&apos;énergie que l&apos;IPC général.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>+ la moitié du gain de pouvoir d&apos;achat du SHBOE</strong> : le salaire horaire de base des ouvriers et employés, pour que le SMIC participe aux progrès salariaux généraux et pas seulement à l&apos;inflation.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span><strong>± le « coup de pouce »</strong> : le gouvernement peut aller au-delà du minimum légal. Aucun coup de pouce n&apos;a été accordé depuis juillet 2012 — le groupe d&apos;experts sur le SMIC le déconseille chaque année dans son rapport de novembre.</span>
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Subtilité qui comptera cette année : la hausse de juin 2026 a déjà
            « consommé » une partie de l&apos;inflation constatée. La
            revalorisation de janvier 2027 se calcule depuis cette hausse-là,
            pas depuis janvier 2026 — les années à revalorisation
            infra-annuelle finissent donc souvent par un 1er janvier modeste.
          </p>
        </div>
      </section>

      <section id="calendrier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Le calendrier d&apos;ici au 1er janvier
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <tbody>
              {[
                ["Fin novembre 2026", "Rapport annuel du groupe d'experts sur le SMIC : premier chiffrage public de la revalorisation mécanique attendue."],
                ["Début – mi-décembre", "Avis de la Commission nationale de la négociation collective ; annonce gouvernementale."],
                ["Mi-décembre 2026", "Publication du décret au Journal officiel — les montants deviennent officiels. Cette page est mise à jour ce jour-là."],
                ["1er janvier 2027", "Entrée en vigueur : nouveau SMIC horaire et mensuel, répercussion sur la grille apprentis et les minima indexés."],
              ].map(([d, t]) => (
                <tr key={d} className="border-b border-border last:border-b-0">
                  <td className="w-48 whitespace-nowrap px-5 py-3 font-semibold text-foreground">{d}</td>
                  <td className="px-5 py-3 text-foreground/80">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="effets" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce qu&apos;une hausse du SMIC déclenche — et ne déclenche pas
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Relèvement automatique</strong> des salaires inférieurs au nouveau minimum, de la <Link href="/guides/salaire-apprenti" className="text-primary underline-offset-4 hover:underline">grille des apprentis</Link> (pourcentages du SMIC) et des seuils indexés (réduction générale de cotisations, éligibilité à certains dispositifs à « 3 SMIC »…).</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">❌</span>
              <span><strong>Aucun effet automatique</strong> sur les salaires au-dessus du minimum : un salarié à 1 950 € bruts ne gagne rien de plus par décret. C&apos;est la négociation — individuelle ou de branche — qui répercute, ou pas.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Le tassement des grilles</strong> : à chaque hausse, des minima de branche passent sous le SMIC et doivent être renégociés. Si votre salaire s&apos;est fait rattraper par le SMIC en quelques années, c&apos;est un argument objectif de négociation — notre <Link href="/simulateurs/negociation-salariale" className="text-primary underline-offset-4 hover:underline">simulateur de négociation</Link> vous aide à le chiffrer, et <Link href="/simulateurs/ou-se-situe-mon-salaire" className="text-primary underline-offset-4 hover:underline">« où se situe mon salaire »</Link> à le situer dans la distribution française.</span>
            </li>
          </ul>
        </div>
      </section>
    </GuideShell>
  );
}
