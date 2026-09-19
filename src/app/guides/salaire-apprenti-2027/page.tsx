import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, GraduationCapIcon, CalculatorIcon, CalendarIcon, PercentIcon, InfoIcon } from "@/components/icons";
import { SALAIRE_2026 } from "@/lib/calculators/salaire-brut-net";

// Grille légale (C. trav. D6222-26), en % du SMIC. Les montants 2026 sont
// dérivés du SMIC du simulateur (1 867,02 € depuis le 1er juin 2026).
const SMIC = SALAIRE_2026.SMIC_MENSUEL_BRUT;
const GRILLE = [
  { age: "16 – 17 ans", pct: [27, 39, 55] },
  { age: "18 – 20 ans", pct: [43, 51, 67] },
  { age: "21 – 25 ans", pct: [53, 61, 78] },
  { age: "26 ans et plus", pct: [100, 100, 100] },
];
// Exonération de cotisations salariales jusqu'à 50 % du SMIC (LFSS 2025).
const SEUIL_EXO = 0.5;
// Hypothèses de revalorisation du SMIC au 1er janvier 2027, à titre
// d'illustration : +1 %, +1,5 %, +2 %. Le décret est attendu mi-décembre.
const SCENARIOS = [1, 1.5, 2];

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const PCT1 = (x: number) => x.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const meta: GuideMeta = {
  slug: "salaire-apprenti-2027",
  titre: "Salaire d'un apprenti en 2027 : ce qui va changer au 1er janvier",
  sousTitre: `Une grille en pourcentage du SMIC — donc mécaniquement revalorisée avec lui — de ${EUR.format(SMIC * 0.27)} à ${EUR.format(SMIC)} bruts aujourd'hui`,
  chapo: `Le salaire d'un apprenti ne se négocie pas : c'est un pourcentage du SMIC, fixé par une grille légale selon l'âge et l'année de contrat. Chaque revalorisation du SMIC se répercute donc automatiquement, au premier jour, sur toutes les cases de la grille. Le SMIC 2027 sera fixé par décret mi-décembre 2026 : voici la grille en vigueur en euros, ce que chaque point de hausse du SMIC représente case par case, et les trois autres paramètres — cotisations, impôt, aides — qui peuvent bouger au 1er janvier.`,
  filAriane: "Salaire apprenti 2027",
  datePublished: "2026-09-19",
  dateModified: "2026-09-19",
  tocItems: [
    { id: "grille", label: "La grille en vigueur" },
    { id: "2027", label: "Ce qu'une hausse du SMIC change" },
    { id: "net", label: "Brut, net, impôt" },
    { id: "calendrier", label: "Le calendrier" },
  ],
  faq: [
    {
      q: "Quel sera le salaire d'un apprenti en 2027 ?",
      r: `Il sera égal aux mêmes pourcentages du SMIC qu'aujourd'hui — 27 % à 100 % selon l'âge et l'année — appliqués au SMIC 2027, qui sera fixé par décret mi-décembre 2026 pour le 1er janvier. Sur le SMIC actuel (${EUR2.format(SMIC)}), un apprenti de 18 à 20 ans en première année touche ${EUR.format(SMIC * 0.43)} bruts ; chaque hausse de 1 % du SMIC lui apporte environ ${EUR2.format(SMIC * 0.43 * 0.01)} de plus par mois. La grille légale elle-même n'a pas été modifiée depuis 2019 et aucun projet de réforme n'est annoncé pour 2027 : c'est le SMIC, et lui seul, qui fera bouger les montants.`,
    },
    {
      q: "Le nouveau SMIC s'applique-t-il immédiatement aux contrats en cours ?",
      r: "Oui, dès la paie de janvier 2027, sans avenant ni démarche. La rémunération d'un apprenti est définie par référence au SMIC en vigueur, pas par un montant figé au moment de la signature : quand le SMIC est revalorisé, la nouvelle base s'applique à tous les contrats, en cours comme nouveaux. Si le contrat prévoit un pourcentage supérieur au minimum légal (ce que font de nombreuses conventions collectives), ce pourcentage s'applique lui aussi au nouveau SMIC.",
    },
    {
      q: "Pourquoi certains apprentis touchent-ils plus que la grille ?",
      r: "Trois raisons. D'abord, beaucoup de conventions collectives fixent des pourcentages plus élevés — la métallurgie, le bâtiment ou la banque, par exemple. Ensuite, la rémunération ne peut jamais être inférieure à celle du contrat précédent en cas d'enchaînement de contrats d'apprentissage : un apprenti qui prépare un second diplôme conserve au moins son ancien pourcentage. Enfin, l'employeur reste libre de verser davantage. Le minimum légal est un plancher, jamais un plafond.",
    },
    {
      q: "Un apprenti paie-t-il des cotisations et des impôts en 2027 ?",
      r: `Sur la partie de sa rémunération inférieure à 50 % du SMIC, aucune cotisation salariale : son net est égal à son brut. Au-delà — ce qui concerne les 21-25 ans dès la deuxième année et tous les apprentis de 26 ans et plus — la fraction excédentaire supporte les cotisations de droit commun, et depuis 2025 la CSG et la CRDS. Côté impôt, les salaires d'apprenti sont exonérés jusqu'au SMIC annuel (${EUR.format(SMIC * 12)} en 2026, seuil revalorisé avec le SMIC 2027). Ces règles ne changent pas au 1er janvier 2027, sauf disposition nouvelle de la loi de financement de la Sécurité sociale.`,
    },
    {
      q: "Les aides à l'embauche d'apprentis changent-elles en 2027 ?",
      r: "C'est le paramètre le plus incertain. L'aide exceptionnelle versée aux employeurs pour la première année de contrat a été réduite en 2025 et son maintien dépend chaque année de la loi de finances. Pour les contrats signés en 2027, le montant sera connu avec la loi de finances pour 2027, votée fin décembre 2026. Cette aide n'a aucun effet sur le salaire de l'apprenti — elle réduit le coût pour l'entreprise — mais elle pèse sur le nombre de contrats proposés. Nous mettrons cette page à jour à la promulgation.",
    },
  ],
  sources: [
    { label: "Code du travail, art. D6222-26 — rémunération des apprentis (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038025782" },
    { label: "service-public.fr — salaire d'un apprenti", href: "https://www.service-public.fr/particuliers/vosdroits/F2918" },
    { label: "URSSAF — contrat d'apprentissage : cotisations et exonérations", href: "https://www.urssaf.fr/accueil/employeur/embaucher-gerer-salaries/statuts-particuliers/apprenti.html" },
    { label: "Arrêté du 22 mai 2026 portant relèvement du SMIC (Légifrance)", href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054126589" },
  ],
};

export const metadata: Metadata = {
  title: "Salaire apprenti 2027 : grille en % du SMIC, montants actuels et effet de la revalorisation",
  description: `La grille légale des apprentis (27 % à 100 % du SMIC selon l'âge et l'année) suit mécaniquement le SMIC 2027, fixé mi-décembre. Les montants en vigueur (${EUR.format(SMIC * 0.27)} à ${EUR.format(SMIC)} bruts), l'effet chiffré de chaque point de hausse, les cotisations, l'impôt et le calendrier du 1er janvier 2027.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Salaire d'un apprenti en 2027 : ce qui va changer au 1er janvier",
    description: "La grille en % du SMIC, les montants actuels et l'effet de la revalorisation 2027.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="grille" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><GraduationCapIcon className="w-4 h-4" /></IconBadge>
          La grille légale, sur le SMIC en vigueur
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Montants bruts mensuels pour un temps plein, calculés sur le SMIC de{" "}
          {EUR2.format(SMIC)} (1er juin 2026). Le pourcentage dépend de
          l&apos;âge de l&apos;apprenti et de l&apos;année d&apos;exécution du
          contrat ; à 26 ans et plus, c&apos;est le SMIC entier — ou le minimum
          conventionnel du poste s&apos;il est supérieur.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
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
                  {l.pct.map((p, i) => (
                    <td key={i} className="px-5 py-3 text-right tabular-nums">
                      <span className="text-lg font-bold text-primary">{EUR.format(SMIC * (p / 100))}</span>
                      <span className="block text-xs text-muted-foreground">{p} % du SMIC</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Les règles de passage d&apos;une case à l&apos;autre — changement de
          tranche d&apos;âge le mois suivant l&apos;anniversaire, changement
          d&apos;année à la date anniversaire du contrat, maintien du pourcentage
          en cas de second contrat — sont détaillées dans notre{" "}
          <Link href="/guides/salaire-apprenti" className="text-primary underline-offset-4 hover:underline">
            guide complet du salaire d&apos;apprenti
          </Link>
          . Cette page se concentre sur ce que 2027 va y changer.
        </p>
      </section>

      <section id="2027" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Ce qu&apos;une hausse du SMIC change, case par case
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le montant du SMIC 2027 n&apos;est pas connu — il résultera de la
          formule légale (inflation des ménages modestes plus la moitié du gain
          de pouvoir d&apos;achat du salaire ouvrier), détaillée dans notre page{" "}
          <Link href="/guides/smic-2027" className="text-primary underline-offset-4 hover:underline">
            SMIC 2027
          </Link>
          . Mais l&apos;effet d&apos;une hausse sur la grille, lui, se calcule
          d&apos;avance. Trois hypothèses, à titre d&apos;illustration, pour les
          cases les plus courantes :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[38rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Profil</th>
                <th className="px-5 py-4 text-right">2026</th>
                {SCENARIOS.map((s) => (
                  <th key={s} className="px-5 py-4 text-right">SMIC +{PCT1(s)} %</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { l: "16-17 ans, 1re année", p: 27 },
                { l: "18-20 ans, 1re année", p: 43 },
                { l: "18-20 ans, 2e année", p: 51 },
                { l: "21-25 ans, 2e année", p: 61 },
                { l: "21-25 ans, 3e année", p: 78 },
                { l: "26 ans et plus", p: 100 },
              ].map((r) => (
                <tr key={r.l} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">
                    {r.l}
                    <span className="block text-xs font-normal text-muted-foreground">{r.p} % du SMIC</span>
                  </td>
                  <td className="px-5 py-3 text-right font-bold tabular-nums text-primary">{EUR.format(SMIC * (r.p / 100))}</td>
                  {SCENARIOS.map((s) => (
                    <td key={s} className="px-5 py-3 text-right tabular-nums text-foreground/80">
                      {EUR.format(SMIC * (1 + s / 100) * (r.p / 100))}
                      <span className="block text-xs text-accent">+{EUR2.format(SMIC * (s / 100) * (r.p / 100))}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-5 text-amber-900">
          <p className="flex items-start gap-3 text-sm leading-relaxed">
            <InfoIcon className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <span>
              Les colonnes +1 %, +1,5 % et +2 % sont des <strong>hypothèses
              de calcul</strong>, pas des prévisions. Elles montrent l&apos;ordre
              de grandeur : pour un apprenti en première année, une
              revalorisation du SMIC se traduit par quelques euros à une
              dizaine d&apos;euros par mois. Les montants exacts seront publiés
              ici le jour du décret.
            </span>
          </p>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Un point souvent oublié : le SMIC peut aussi être revalorisé{" "}
          <strong>en cours d&apos;année</strong>, dès que l&apos;inflation
          dépasse 2 % depuis la dernière hausse — c&apos;est ce qui s&apos;est
          produit le 1er juin 2026. Chaque revalorisation infra-annuelle se
          propage de la même manière à la grille des apprentis, sans attendre
          janvier.
        </p>
      </section>

      <section id="net" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Brut, net et impôt : ce qui ne bougera (probablement) pas
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { t: "Cotisations", d: `Exonération totale de cotisations salariales jusqu'à ${SEUIL_EXO * 100} % du SMIC (${EUR.format(SMIC * SEUIL_EXO)} en 2026, seuil revalorisé avec le SMIC). En dessous, net = brut. Au-dessus, seule la fraction excédentaire cotise, CSG-CRDS comprises depuis 2025.` },
            { t: "Impôt sur le revenu", d: `Exonération des salaires d'apprenti dans la limite du SMIC annuel — ${EUR.format(SMIC * 12)} en 2026. Le seuil 2027 sera le SMIC 2027 × 12. En pratique, un apprenti sous 100 % du SMIC n'a aucun revenu imposable à ce titre, même rattaché au foyer de ses parents.` },
            { t: "Aide employeur", d: "L'aide exceptionnelle à l'embauche, réduite en 2025, dépend chaque année de la loi de finances. Son montant pour les contrats 2027 sera arrêté fin décembre 2026. Sans effet sur la paie de l'apprenti, mais déterminant pour l'offre de contrats." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          La différence entre un apprenti et un stagiaire tient là : le stagiaire
          perçoit une gratification fixée sur le plafond de la Sécurité sociale,
          sans lien avec le SMIC — nous la détaillons dans le guide de la{" "}
          <Link href="/guides/gratification-stage-2027" className="text-primary underline-offset-4 hover:underline">
            gratification de stage 2027
          </Link>
          . L&apos;apprenti, lui, est un salarié à part entière : ses mois
          comptent pour la retraite et ouvrent des droits au chômage.
        </p>
      </section>

      <section id="calendrier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Le calendrier d&apos;ici janvier 2027
        </h2>
        <ol className="mt-6 space-y-4">
          {[
            { d: "Fin novembre 2026", t: "Rapport du groupe d'experts sur le SMIC", x: "Il éclaire le gouvernement sur l'opportunité d'un « coup de pouce » au-delà de la formule légale — recommandé nulle part depuis 2012." },
            { d: "Mi-décembre 2026", t: "Décret de revalorisation du SMIC", x: "Publication au Journal officiel du SMIC horaire et mensuel au 1er janvier 2027. Toutes les cases de la grille des apprentis en découlent immédiatement." },
            { d: "Fin décembre 2026", t: "Lois de finances et de financement de la Sécurité sociale", x: "Montant de l'aide à l'embauche pour les contrats 2027 ; éventuelles modifications du régime social des apprentis." },
            { d: "Janvier 2027", t: "Première paie au nouveau SMIC", x: "Application automatique aux contrats en cours. Vérifiez sur le bulletin que le pourcentage est appliqué au nouveau montant." },
          ].map((e) => (
            <li key={e.t} className="flex gap-4 rounded-2xl border border-border bg-white p-5 shadow-md">
              <span className="w-32 flex-shrink-0 text-sm font-semibold text-primary">{e.d}</span>
              <div>
                <p className="font-semibold text-foreground">{e.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">{e.x}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Pour convertir n&apos;importe quel montant de la grille en net, le{" "}
          <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
            simulateur brut/net
          </Link>{" "}
          reste l&apos;outil de référence — en gardant en tête qu&apos;il
          applique les cotisations de droit commun, sans l&apos;exonération
          propre aux apprentis en dessous de 50 % du SMIC.
        </p>
      </section>
    </GuideShell>
  );
}
