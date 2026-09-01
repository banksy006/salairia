import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalculatorIcon, PercentIcon, InfoIcon, ScaleIcon } from "@/components/icons";

// Prélèvements sociaux sur les pensions de retraite — taux 2026.
// CSG à 4 taux selon le revenu fiscal de référence, + CRDS 0,5 % et CASA 0,3 %
// pour les taux médian et normal. Source : service-public.fr, URSSAF.
const TAUX = [
  { nom: "Exonération", csg: 0, crds: 0, casa: 0, seuil: "RFR ≤ 13 048 €" },
  { nom: "Taux réduit", csg: 3.8, crds: 0.5, casa: 0, seuil: "13 049 € à 17 057 €" },
  { nom: "Taux médian", csg: 6.6, crds: 0.5, casa: 0.3, seuil: "17 058 € à 26 472 €" },
  { nom: "Taux normal", csg: 8.3, crds: 0.5, casa: 0.3, seuil: "au-delà de 26 472 €" },
];
const total = (t: (typeof TAUX)[number]) => t.csg + t.crds + t.casa;

const PENSIONS = [1_200, 1_800, 2_600];
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const PCT = (x: number) => x.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const meta: GuideMeta = {
  slug: "retraite-brut-net",
  titre: "Retraite brut en net : le calcul n'a rien à voir avec un salaire",
  sousTitre: "Pas de cotisations retraite ni chômage — mais une CSG à quatre taux qui dépend de votre revenu fiscal",
  chapo: "Convertir une pension brute en net ne suit pas les règles du salaire. Un retraité ne cotise plus ni à la retraite, ni au chômage : il ne supporte que la CSG, la CRDS et la CASA. Résultat, l'écart brut-net va de 0 % à 9,1 % selon votre revenu fiscal de référence — contre environ 22 % pour un salarié. Voici les quatre taux, les seuils, et le calcul sur trois niveaux de pension.",
  filAriane: "Retraite brut/net",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "difference", label: "Pourquoi c'est différent" },
    { id: "taux", label: "Les quatre taux de CSG" },
    { id: "calcul", label: "Trois pensions calculées" },
    { id: "seuils", label: "Les effets de seuil" },
  ],
  faq: [
    {
      q: "Comment passer de sa retraite brute à sa retraite nette ?",
      r: "On retire de la pension brute les prélèvements sociaux : CSG, CRDS et CASA. Contrairement à un salaire, aucune cotisation retraite, chômage ou maladie n'est prélevée — c'est pourquoi l'écart brut-net d'un retraité est bien plus faible que celui d'un actif. Le taux global va de 0 % (exonération) à 9,1 % (8,3 % de CSG + 0,5 % de CRDS + 0,3 % de CASA), selon votre revenu fiscal de référence de l'avant-dernière année. À cela peut s'ajouter une cotisation d'assurance maladie de 1 % sur la retraite complémentaire.",
    },
    {
      q: "Comment savoir quel taux de CSG m'est appliqué ?",
      r: "Il dépend de votre revenu fiscal de référence, figurant sur votre avis d'impôt, et de votre nombre de parts fiscales. Pour une personne seule en métropole en 2026, les seuils sont : exonération jusqu'à 13 048 €, taux réduit de 3,8 % jusqu'à 17 057 €, taux médian de 6,6 % jusqu'à 26 472 €, taux normal de 8,3 % au-delà. Ces seuils sont majorés pour chaque demi-part supplémentaire et diffèrent en outre-mer. Votre caisse applique le taux automatiquement à partir des données transmises par l'administration fiscale.",
    },
    {
      q: "Pourquoi ma retraite nette a-t-elle baissé sans que ma pension change ?",
      r: "Presque toujours à cause d'un changement de taux de CSG. Le taux est réexaminé chaque année sur la base du revenu fiscal de référence : un revenu exceptionnel, la vente d'un bien, le décès d'un conjoint qui modifie le nombre de parts peuvent faire franchir un seuil et faire passer de 3,8 % à 6,6 %, voire à 8,3 %. Un dispositif de lissage existe : le changement n'intervient que si le seuil est dépassé deux années consécutives — ce qui évite les bascules pour un seul revenu exceptionnel.",
    },
    {
      q: "La CSG sur les retraites est-elle déductible des impôts ?",
      r: "En partie seulement. Sur les taux médian et normal, une fraction de la CSG est déductible du revenu imposable (5,9 points sur les 8,3 %, 4,2 points sur les 6,6 %), le reste ne l'étant pas. La CSG au taux réduit de 3,8 % est intégralement déductible. La CRDS et la CASA ne le sont jamais. Cette déductibilité est appliquée automatiquement dans votre déclaration pré-remplie : le montant que vous y voyez est déjà net de la part déductible.",
    },
    {
      q: "Le prélèvement à la source s'applique-t-il aux retraites ?",
      r: "Oui. Votre caisse prélève l'impôt sur le revenu directement sur la pension, à votre taux personnalisé — le même mécanisme que pour un salaire, actualisé chaque 1er septembre à partir de votre déclaration de printemps. Ce prélèvement s'ajoute aux prélèvements sociaux : la pension effectivement virée sur votre compte est donc le brut, moins CSG-CRDS-CASA, moins l'impôt à la source. Notre simulateur net après impôt permet d'estimer cette dernière étape.",
    },
  ],
  sources: [
    { label: "service-public.fr — CSG, CRDS et CASA sur les pensions de retraite", href: "https://www.service-public.fr/particuliers/vosdroits/F2971" },
    { label: "URSSAF — prélèvements sociaux sur les revenus de remplacement", href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes.html" },
    { label: "L'Assurance retraite — montant de la retraite et prélèvements", href: "https://www.lassuranceretraite.fr/" },
    { label: "Code de la sécurité sociale, art. L136-8 — taux de CSG (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047621661" },
  ],
};

export const metadata: Metadata = {
  title: "Retraite brut en net 2026 : les 4 taux de CSG et le calcul",
  description: "Un retraité ne cotise ni à la retraite ni au chômage : seules la CSG (0, 3,8, 6,6 ou 8,3 % selon le revenu fiscal de référence), la CRDS et la CASA s'appliquent. L'écart brut-net va de 0 % à 9,1 %. Seuils 2026, trois pensions calculées et les effets de seuil.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Retraite brut en net : le calcul n'a rien à voir avec un salaire",
    description: "Les quatre taux de CSG, les seuils de revenu fiscal, et trois pensions calculées.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="difference" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Pourquoi le calcul est plus simple que pour un salaire
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Un salarié voit environ 22 % de son brut partir en cotisations :
            vieillesse, retraite complémentaire, CSG-CRDS — le détail est dans
            notre{" "}
            <Link href="/guides/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
              guide du salaire brut et net
            </Link>
            . Un retraité, lui, ne cotise plus pour des droits qu&apos;il a
            déjà liquidés : <strong>ni retraite, ni chômage</strong>. Ne restent
            que trois prélèvements de solidarité :
          </p>
          <ul className="mt-4 space-y-2 text-base text-foreground/80">
            <li className="flex gap-3"><span aria-hidden className="text-primary">→</span><span><strong>La CSG</strong>, à quatre taux possibles selon votre revenu fiscal de référence — c&apos;est la seule variable qui compte vraiment.</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">→</span><span><strong>La CRDS</strong>, à 0,5 %, due dès que vous n&apos;êtes pas exonéré.</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">→</span><span><strong>La CASA</strong>, à 0,3 %, qui finance l&apos;autonomie et ne s&apos;applique qu&apos;aux taux médian et normal.</span></li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            S&apos;y ajoute, sur la seule retraite complémentaire, une
            cotisation d&apos;assurance maladie de 1 % pour les retraités non
            exonérés. Au total, l&apos;écart entre brut et net va de{" "}
            <strong>0 % à environ 9,1 %</strong> — quatre fois moins que pour
            un actif.
          </p>
        </div>
      </section>

      <section id="taux" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Les quatre taux, et qui les paie
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Situation</th>
                <th className="px-5 py-4">Revenu fiscal de référence (1 part, métropole)</th>
                <th className="px-5 py-4 text-right">CSG</th>
                <th className="px-5 py-4 text-right">Total prélevé</th>
              </tr>
            </thead>
            <tbody>
              {TAUX.map((t) => (
                <tr key={t.nom} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{t.nom}</td>
                  <td className="px-5 py-3 tabular-nums text-foreground/80">{t.seuil}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{PCT(t.csg)} %</td>
                  <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">{PCT(total(t))} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le revenu fiscal de référence retenu est celui de{" "}
          <strong>l&apos;avant-dernière année</strong>, figurant sur votre avis
          d&apos;impôt. Les seuils sont majorés pour chaque demi-part
          supplémentaire et diffèrent dans les départements d&apos;outre-mer.
          C&apos;est votre caisse qui applique le taux, à partir des données
          transmises par l&apos;administration fiscale : vous n&apos;avez
          aucune démarche à faire, mais vous pouvez le vérifier sur votre
          notification annuelle.
        </p>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Trois pensions, quatre situations
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Pension brute mensuelle</th>
                {TAUX.map((t) => (
                  <th key={t.nom} className="px-5 py-4 text-right">{t.nom}<span className="block text-[10px] font-normal normal-case">{PCT(total(t))} %</span></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PENSIONS.map((p) => (
                <tr key={p} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold tabular-nums text-foreground">{EUR.format(p)}</td>
                  {TAUX.map((t) => (
                    <td key={t.nom} className="px-5 py-3 text-right tabular-nums text-foreground/80">
                      {EUR.format(p * (1 - total(t) / 100))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Montants nets de prélèvements sociaux, <strong>avant impôt sur le
          revenu</strong>. Sur une pension de {EUR.format(1_800)}, l&apos;écart
          entre un retraité exonéré et un retraité au taux normal atteint{" "}
          {EUR.format(1_800 * 0.091)} par mois — près de{" "}
          {EUR.format(1_800 * 0.091 * 12)} sur l&apos;année, pour une pension
          brute identique. C&apos;est tout l&apos;enjeu du taux de CSG, et la
          raison pour laquelle un franchissement de seuil se ressent
          immédiatement.
        </p>
      </section>

      <section id="seuils" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Les effets de seuil, et le lissage qui les amortit
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Les taux de CSG fonctionnent par paliers, pas progressivement : un
            euro de revenu fiscal au-dessus d&apos;un seuil fait basculer{" "}
            <strong>toute la pension</strong> au taux supérieur. Passer de
            3,8 % à 6,6 % coûte 3,1 points sur l&apos;intégralité du montant —
            un effet de falaise que peu d&apos;autres prélèvements français
            produisent avec cette brutalité.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Un garde-fou existe : le changement de taux ne s&apos;applique que
            si le seuil est dépassé <strong>deux années consécutives</strong>.
            Un revenu exceptionnel isolé — vente d&apos;un bien, prime de
            départ — ne déclenche donc pas de bascule durable. En revanche, une
            modification du nombre de parts fiscales (décès du conjoint,
            notamment) produit son effet immédiatement, ce qui aggrave une
            situation déjà difficile.
          </p>
          <div className="mt-5 rounded-r-lg border-l-4 border-primary bg-muted p-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground">Deux rendez-vous à connaître :</strong>{" "}
              les pensions de base sont revalorisées au 1er janvier et
              l&apos;AGIRC-ARRCO au 1er novembre — deux hausses distinctes,
              détaillées dans notre guide de la{" "}
              <Link href="/guides/revalorisation-retraites-2027" className="underline underline-offset-4">
                revalorisation des retraites
              </Link>
              . Et pour estimer l&apos;impôt qui viendra s&apos;ajouter à ces
              prélèvements sociaux, notre{" "}
              <Link href="/simulateurs/net-apres-impot" className="underline underline-offset-4">
                simulateur net après impôt
              </Link>{" "}
              applique le barème en vigueur.
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}
