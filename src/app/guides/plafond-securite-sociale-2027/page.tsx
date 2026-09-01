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
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "plafond-securite-sociale-2027",
  titre: "Plafond de la Sécurité sociale 2027 : pourquoi ce chiffre pilote votre paie",
  sousTitre: `Le PASS actuel — ${EUR.format(PASS_M)} par mois — et tout ce qui bougera avec lui au 1er janvier`,
  chapo: "C'est le paramètre le plus discret et le plus structurant de la paie française : le plafond de la Sécurité sociale borne les cotisations plafonnées, découpe les tranches de retraite complémentaire, plafonne les indemnités exonérées et fixe les minima du portage salarial. Sa valeur 2027 sera arrêtée fin 2026, sur la base de l'évolution du salaire moyen. Voici à quoi il sert, ligne par ligne, et ce que sa revalorisation changera.",
  filAriane: "PASS 2027",
  datePublished: "2026-08-23",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "quoi", label: "Ce qu'est le PASS" },
    { id: "usages", label: "Tout ce qu'il pilote" },
    { id: "revalorisation", label: "Comment il est revalorisé" },
    { id: "effets", label: "Les effets concrets en 2027" },
  ],
  faq: [
    {
      q: "Quel sera le montant du plafond de la Sécurité sociale en 2027 ?",
      r: `Il sera fixé par arrêté en fin d'année 2026, après avis de la Commission des comptes de la Sécurité sociale (automne). La règle : le plafond évolue comme le salaire moyen par tête de l'avant-dernière année, avec un mécanisme de correction — et il ne peut jamais baisser. La valeur en vigueur pour 2026 est de ${EUR.format(PASS_M)} par mois (${EUR.format(PASS_A)} par an). Cette page affichera les montants 2027 dès la parution de l'arrêté au Journal officiel.`,
    },
    {
      q: "À quoi sert concrètement le plafond de la Sécurité sociale ?",
      r: "À découper les rémunérations en tranches pour le calcul des cotisations. La cotisation vieillesse plafonnée (6,90 % salarié) ne s'applique qu'à la part du brut inférieure au plafond mensuel ; la retraite complémentaire AGIRC-ARRCO distingue la tranche 1 (jusqu'à 1 plafond) et la tranche 2 (de 1 à 8 plafonds) avec des taux très différents ; et des dizaines de seuils s'expriment en multiples du PASS : plafonds d'exonération des indemnités de rupture (2 PASS pour les cotisations, 6 pour l'impôt), gratification minimale des stagiaires, seuils de l'épargne salariale, assiettes maximales des indemnités journalières.",
    },
    {
      q: "Le PASS concerne-t-il les salaires en dessous du plafond ?",
      r: `Indirectement, oui. Même si votre brut est inférieur à ${EUR.format(PASS_M)}, le PASS structure votre bulletin (la distinction tranche 1 / tranche 2 y figure), fixe le plafond de calcul de vos indemnités journalières maladie, la gratification de vos stagiaires, et — si vous êtes en portage salarial — votre salaire minimum conventionnel, exprimé en pourcentage du PASS. Une revalorisation du plafond se propage donc bien au-delà des cadres supérieurs.`,
    },
    {
      q: "Pourquoi le salaire minimum du portage salarial dépend-il du PASS ?",
      r: `La convention collective du portage fixe les rémunérations minimales en pourcentage du plafond mensuel : 70 % pour un junior (soit ${EUR.format(MIN_JUNIOR)} en 2026), 75 % pour un senior, 85 % en forfait jours (${EUR.format(MIN_FORFAIT)}). Chaque revalorisation du PASS relève mécaniquement ces planchers — et donc le chiffre d'affaires minimal pour être « portable ». Un TJM limite en 2026 peut ne plus passer en 2027 : notre simulateur portage intègre ces seuils et alerte quand le brut calculé descend sous le minimum conventionnel.`,
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
  ],
};

export const metadata: Metadata = {
  title: `PASS 2027 : le plafond Sécurité sociale expliqué (${EUR.format(PASS_M)}/mois en 2026)`,
  description: `Le plafond de la Sécurité sociale pilote cotisations plafonnées, tranches AGIRC-ARRCO, exonérations d'indemnités et minima du portage salarial (70 à 85 % du PASS). Valeur 2026 : ${EUR.format(PASS_M)}/mois. Le montant 2027, fixé fin 2026, sera publié ici dès l'arrêté.`,
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
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
            <p className="text-3xl font-bold tabular-nums text-primary">{EUR.format(PASS_M)}</p>
            <p className="mt-2 text-sm text-muted-foreground">plafond mensuel (PMSS) — valeur 2026</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
            <p className="text-3xl font-bold tabular-nums text-primary">{EUR.format(PASS_A)}</p>
            <p className="mt-2 text-sm text-muted-foreground">plafond annuel (PASS) — valeur 2026</p>
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
                ["Indemnités de rupture", "exonérées de cotisations jusqu'à 2 PASS, d'impôt jusqu'à 6 PASS"],
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
              <span><strong>Salaires au-dessus du plafond</strong> : la frontière T1/T2 monte — une part un peu plus grande du brut cotise aux taux de la tranche 1, ce qui modifie légèrement le net des cadres au-dessus de {EUR.format(PASS_M)}.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Salariés portés</strong> : les minima conventionnels (70/75/85 % du plafond) montent d&apos;autant. Les TJM limites doivent être recalculés — le <Link href="/simulateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">simulateur portage</Link> le fait automatiquement à chaque mise à jour des constantes.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Négociations de départ</strong> : les plafonds d&apos;exonération des indemnités de rupture (2 et 6 PASS) s&apos;élargissent — un détail qui vaut des milliers d&apos;euros sur les grosses transactions, détaillé dans notre guide <Link href="/guides/indemnite-rupture-conventionnelle" className="text-primary underline-offset-4 hover:underline">rupture conventionnelle</Link>.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Employeurs</strong> : gratification minimale des stagiaires, seuils d&apos;épargne salariale et assiettes de prévoyance à réviser dans les outils de paie au 1er janvier.</span>
            </li>
          </ul>
        </div>
      </section>
    </GuideShell>
  );
}
