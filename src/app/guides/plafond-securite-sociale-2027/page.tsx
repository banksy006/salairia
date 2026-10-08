import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ShieldIcon, CalculatorIcon, CalendarIcon, InfoIcon } from "@/components/icons";
import { SALAIRE_2026 } from "@/lib/calculators/salaire-brut-net";
import { salaireMinimumMensuel } from "@/lib/calculators/portage";

// PASS en vigueur, depuis les constantes des simulateurs.
const PASS_M = SALAIRE_2026.PASS_MENSUEL;
const PASS_A = SALAIRE_2026.PASS_ANNUEL;
const MIN_JUNIOR = salaireMinimumMensuel("junior");
const MIN_FORFAIT = salaireMinimumMensuel("forfait_jours");
// Valeur 2027 ESTIMÉE (+1,7 %) : rapport de la Commission des comptes de la
// Sécurité sociale d'octobre 2026, relayé par la Revue fiduciaire le 7 octobre
// 2026. Non officielle tant que l'arrêté de fin d'année n'est pas publié : les
// simulateurs gardent la valeur 2026.
const PASS_2027_M = 4_075;
const PASS_2027_A = 48_900;
const HAUSSE_2027 = (PASS_2027_A / PASS_A - 1) * 100;
// Minima du portage recalculés sur le PASS estimé, avec les ratios du simulateur.
const MIN_JUNIOR_2027 = (MIN_JUNIOR / PASS_M) * PASS_2027_M;
const MIN_FORFAIT_2027 = (MIN_FORFAIT / PASS_M) * PASS_2027_M;
// Plafond horaire = PASS / 1 607 heures, arrondi à l'euro ; base de la
// gratification minimale des stagiaires (15 %).
const PLAFOND_HORAIRE_2027 = Math.round(PASS_2027_A / 1_607);
const PCT1 = (x: number) => x.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "plafond-securite-sociale-2027",
  titre: "Plafond de la Sécurité sociale 2027 : pourquoi ce chiffre pilote votre paie",
  sousTitre: `${EUR.format(PASS_M)} par mois en 2026, ${EUR.format(PASS_2027_M)} attendus en 2027 selon l'estimation officielle — et tout ce qui bougera avec lui au 1er janvier`,
  chapo: "C'est le paramètre le plus discret et le plus structurant de la paie française : le plafond de la Sécurité sociale borne les cotisations plafonnées, découpe les tranches de retraite complémentaire, plafonne les indemnités exonérées et fixe les minima du portage salarial. Sa valeur 2027 est désormais estimée : 4 075 € par mois selon la Commission des comptes de la Sécurité sociale, avant l'arrêté de fin décembre. Et le budget 2027 lui confie un rôle de plus — plafonner les indemnités de rupture. Voici à quoi il sert, ligne par ligne, et ce que sa revalorisation changera.",
  filAriane: "PASS 2027",
  datePublished: "2026-08-23",
  dateModified: "2026-10-08",
  tocItems: [
    { id: "quoi", label: "Ce qu'est le PASS" },
    { id: "usages", label: "Tout ce qu'il pilote" },
    { id: "revalorisation", label: "Comment il est revalorisé" },
    { id: "effets", label: "Les effets concrets en 2027" },
  ],
  faq: [
    {
      q: "Quel sera le montant du plafond de la Sécurité sociale en 2027 ?",
      r: `Selon le rapport de la Commission des comptes de la Sécurité sociale d'octobre 2026, il atteindrait ${EUR.format(PASS_2027_M)} par mois et ${EUR.format(PASS_2027_A)} par an, soit une hausse de ${PCT1(HAUSSE_2027)} % par rapport à 2026 (${EUR.format(PASS_M)} par mois, ${EUR.format(PASS_A)} par an). C'est une estimation : la valeur officielle sera fixée par arrêté en fin d'année et peut encore être ajustée. La règle de calcul : le plafond suit l'évolution du salaire moyen par tête, avec un mécanisme de correction — et il ne peut jamais baisser. Cette page affichera le montant définitif dès la parution de l'arrêté au Journal officiel.`,
    },
    {
      q: "À quoi sert concrètement le plafond de la Sécurité sociale ?",
      r: "À découper les rémunérations en tranches pour le calcul des cotisations. La cotisation vieillesse plafonnée (6,90 % salarié) ne s'applique qu'à la part du brut inférieure au plafond mensuel ; la retraite complémentaire AGIRC-ARRCO distingue la tranche 1 (jusqu'à 1 plafond) et la tranche 2 (de 1 à 8 plafonds) avec des taux très différents ; et des dizaines de seuils s'expriment en multiples du PASS : plafonds d'exonération des indemnités de rupture (aujourd'hui 2 PASS pour les cotisations et 6 pour l'impôt, un seul PASS pour les deux dans le budget 2027), gratification minimale des stagiaires, seuils de l'épargne salariale, assiettes maximales des indemnités journalières.",
    },
    {
      q: "Le PASS concerne-t-il les salaires en dessous du plafond ?",
      r: `Indirectement, oui. Même si votre brut est inférieur à ${EUR.format(PASS_M)}, le PASS structure votre bulletin (la distinction tranche 1 / tranche 2 y figure), fixe le plafond de calcul de vos indemnités journalières maladie, la gratification de vos stagiaires, et — si vous êtes en portage salarial — votre salaire minimum conventionnel, exprimé en pourcentage du PASS. Une revalorisation du plafond se propage donc bien au-delà des cadres supérieurs.`,
    },
    {
      q: "Pourquoi le salaire minimum du portage salarial dépend-il du PASS ?",
      r: `La convention collective du portage fixe les rémunérations minimales en pourcentage du plafond mensuel : 70 % pour un junior (soit ${EUR.format(MIN_JUNIOR)} en 2026, environ ${EUR.format(MIN_JUNIOR_2027)} avec le plafond 2027 estimé), 75 % pour un senior, 85 % en forfait jours (${EUR.format(MIN_FORFAIT)}, puis environ ${EUR.format(MIN_FORFAIT_2027)}). Chaque revalorisation du PASS relève mécaniquement ces planchers — et donc le chiffre d'affaires minimal pour être « portable ». Un TJM limite en 2026 peut ne plus passer en 2027 : notre simulateur portage intègre ces seuils et alerte quand le brut calculé descend sous le minimum conventionnel.`,
    },
    {
      q: "Quelle est la différence entre PASS, PMSS et SMIC ?",
      r: "Le PASS est le plafond annuel de la Sécurité sociale ; le PMSS en est simplement la déclinaison mensuelle (PASS ÷ 12). Ce sont des paramètres de calcul des cotisations, fixés par référence au salaire moyen. Le SMIC, lui, est un salaire minimum légal, indexé sur l'inflation des ménages modestes : il borne ce qu'on peut vous payer, quand le PASS borne ce sur quoi on cotise à certains taux. Les deux évoluent au 1er janvier, mais selon des logiques indépendantes — l'un peut accélérer quand l'autre ralentit.",
    },
  ],
  sources: [
    { label: "BOSS — le plafond de la Sécurité sociale (boss.gouv.fr)", href: "https://boss.gouv.fr/portail/accueil/regles-dassujettissement/assiette-generale.html" },
    { label: "Code de la sécurité sociale, art. D242-17 et suivants (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006073189/" },
    { label: "URSSAF — le plafond de la Sécurité sociale", href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/plafonds-securite-sociale.html" },
    { label: "Convention collective du portage salarial, IDCC 3219 (Légifrance)", href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/" },
    { label: "Revue fiduciaire — le plafond de la Sécurité sociale pour 2027 pourrait s'établir à 4 075 € par mois (7 octobre 2026)", href: "https://www.revue-fiduciaire.com/actualite/article/le-plafond-de-la-securite-sociale-pour-2027-pourrait-s-etablir-a-4-075-par-mois" },
    { label: "Projet de loi de financement de la Sécurité sociale pour 2027, n° 3211 (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3211_projet-loi" },
  ],
};

export const metadata: Metadata = {
  title: `PASS 2027 : ${EUR.format(PASS_2027_M)}/mois attendus, le plafond Sécurité sociale expliqué`,
  description: `Plafond de la Sécurité sociale 2027 estimé à ${EUR.format(PASS_2027_M)} par mois et ${EUR.format(PASS_2027_A)} par an (+${PCT1(HAUSSE_2027)} %), contre ${EUR.format(PASS_M)} en 2026. Ce qu'il pilote : cotisations plafonnées, tranches AGIRC-ARRCO, minima du portage, gratification des stagiaires — et, avec le budget 2027, les indemnités de rupture.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "PASS 2027 : pourquoi ce chiffre pilote votre paie",
    description: "Cotisations, tranches de retraite, minima du portage : tout ce que le plafond commande.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="quoi" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          Ce qu&apos;est le PASS
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
            <p className="text-3xl font-bold tabular-nums text-primary">{EUR.format(PASS_M)}</p>
            <p className="mt-2 text-sm text-muted-foreground">plafond mensuel (PMSS) — valeur 2026</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
            <p className="text-3xl font-bold tabular-nums text-primary">{EUR.format(PASS_A)}</p>
            <p className="mt-2 text-sm text-muted-foreground">plafond annuel (PASS) — valeur 2026</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center shadow-md">
            <p className="text-3xl font-bold tabular-nums text-primary">{EUR.format(PASS_2027_M)}</p>
            <p className="mt-2 text-sm text-muted-foreground">plafond mensuel 2027 estimé (+{PCT1(HAUSSE_2027)} %) — arrêté attendu fin décembre</p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Créé avec la Sécurité sociale en 1945, le plafond servait au départ
          à une seule chose : limiter l&apos;assiette des cotisations — et
          donc des prestations — de l&apos;assurance vieillesse. Quatre-vingts
          ans plus tard, il est devenu l&apos;unité de mesure de tout le droit
          social : des dizaines de seuils, plafonds et minima s&apos;expriment
          en PASS, en fractions ou en multiples de PASS.
        </p>
      </section>

      <section id="usages" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Tout ce que le plafond pilote, ligne par ligne
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Ce qui en dépend</th>
                <th className="px-5 py-4">La règle</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Vieillesse plafonnée (6,90 % salarié)", "cotisée uniquement sur la part du brut ≤ 1 plafond mensuel"],
                ["AGIRC-ARRCO tranche 1 / tranche 2", "T1 jusqu'à 1 plafond (3,15 % salarié), T2 de 1 à 8 plafonds (8,64 %)"],
                ["Indemnités de rupture", "exonérées de cotisations jusqu'à 2 PASS, d'impôt jusqu'à 6 PASS — le budget 2027 propose un plafond unique d'1 PASS"],
                ["Prime de partage de la valeur", "le PLFSS 2027 propose de plafonner son exonération de cotisations à 1/15 du PASS au maximum, fixé par décret"],
                ["Minima du portage salarial", `70 / 75 / 85 % du plafond mensuel selon le statut (${EUR.format(MIN_JUNIOR)} à ${EUR.format(MIN_FORFAIT)} en 2026)`],
                ["Indemnités journalières, épargne salariale, stage…", "assiettes maximales et gratifications exprimées en fractions de PASS"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{k}</td>
                  <td className="px-5 py-3 text-foreground/80">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          C&apos;est le découpage que vous voyez sur votre bulletin — notre
          guide{" "}
          <Link href="/guides/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
            salaire brut/net
          </Link>{" "}
          l&apos;explique cotisation par cotisation, et le{" "}
          <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
            simulateur
          </Link>{" "}
          applique les tranches à votre salaire exact.
        </p>
      </section>

      <section id="revalorisation" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Comment la valeur 2027 sera fixée
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Contrairement au SMIC (indexé sur l&apos;inflation), le plafond
            suit <strong>l&apos;évolution du salaire moyen par tête</strong> de
            l&apos;avant-dernière année, corrigée des écarts constatés — et il
            ne peut jamais diminuer. Le circuit : la Commission des comptes de
            la Sécurité sociale documente l&apos;évolution salariale à
            l&apos;automne, puis un arrêté publié en fin d&apos;année fixe les
            valeurs applicables au 1er janvier.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Conséquence pratique : les années de fortes augmentations
            salariales se répercutent sur le PASS <em>avec deux ans de
            retard</em>. La valeur 2027 reflétera pour l&apos;essentiel les
            salaires de 2025. Dès l&apos;arrêté publié, cette page et les
            constantes de nos simulateurs seront mises à jour ensemble.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Première indication chiffrée pour 2027 : le rapport de la
            Commission des comptes de la Sécurité sociale, publié début
            octobre 2026, retient une hausse de{" "}
            <strong>{PCT1(HAUSSE_2027)} %</strong>, soit{" "}
            <strong>{EUR.format(PASS_2027_M)} par mois</strong> et{" "}
            {EUR.format(PASS_2027_A)} par an. Cette estimation sert de base aux
            prévisions de recettes du PLFSS ; l&apos;arrêté officiel reprend
            presque toujours ce chiffre, mais il peut s&apos;en écarter à la
            marge. Nos simulateurs continuent d&apos;appliquer{" "}
            {EUR.format(PASS_M)} jusqu&apos;au 1er janvier.
          </p>
        </div>
      </section>

      <section id="effets" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce qu&apos;une hausse du PASS changera concrètement
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Salaires au-dessus du plafond</strong> : la frontière T1/T2 monterait de {EUR.format(PASS_M)} à {EUR.format(PASS_2027_M)} — une part un peu plus grande du brut cotise aux taux de la tranche 1, ce qui modifie légèrement le net des cadres au-dessus du plafond.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Salariés portés</strong> : les minima conventionnels (70/75/85 % du plafond) montent d&apos;autant — environ {EUR.format(MIN_JUNIOR_2027)} pour un junior avec le plafond estimé. Les TJM limites doivent être recalculés — le <Link href="/simulateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">simulateur portage</Link> le fait automatiquement à chaque mise à jour des constantes.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Négociations de départ</strong> : le budget 2027 propose de remplacer les plafonds actuels (2 PASS pour les cotisations, jusqu&apos;à 6 PASS pour l&apos;impôt) par un plafond unique d&apos;1 PASS, soit {EUR.format(PASS_2027_A)} avec la valeur estimée — un changement qui vaut des milliers d&apos;euros sur les grosses transactions, détaillé dans notre guide <Link href="/guides/indemnite-rupture-conventionnelle" className="text-primary underline-offset-4 hover:underline">rupture conventionnelle</Link>.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Stagiaires et employeurs</strong> : la gratification minimale vaut 15 % du plafond horaire, arrondi à l&apos;euro. Avec {EUR.format(PASS_2027_A)}, il resterait à {EUR.format(PLAFOND_HORAIRE_2027)} : gratification inchangée à {EUR2.format(PLAFOND_HORAIRE_2027 * 0.15)} de l&apos;heure (<Link href="/guides/gratification-stage-2027" className="text-primary underline-offset-4 hover:underline">le calcul</Link>). Seuils d&apos;épargne salariale et assiettes de prévoyance sont à réviser dans les outils de paie au 1er janvier.</span>
            </li>
          </ul>
        </div>
      </section>
    </GuideShell>
  );
}
