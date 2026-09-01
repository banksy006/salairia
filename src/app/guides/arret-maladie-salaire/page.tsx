import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalculatorIcon, CalendarIcon, ShieldIcon, AlertTriangleIcon } from "@/components/icons";
import { SALAIRE_2026 } from "@/lib/calculators/salaire-brut-net";

// IJSS maladie : 50 % du salaire journalier de base, calculé sur les 3 derniers
// mois plafonnés à 1,4 SMIC depuis le 1er avril 2025 (contre 1,8 auparavant).
// Plafond de 42,97 €/jour bruts depuis le 1er juillet 2026 — ameli.fr.
const IJ_MAX_JOUR = 42.97;
const PLAFOND_SJB_MENSUEL = SALAIRE_2026.SMIC_MENSUEL_BRUT * 1.4;
const CARENCE = 3;

// Trois profils : le plafond mord dès qu'on dépasse 1,4 SMIC.
const PROFILS = [1_900, 2_600, 3_500].map((brut) => {
  const brutRetenu = Math.min(brut, PLAFOND_SJB_MENSUEL);
  const sjb = (brutRetenu * 3) / 91.25;
  const ij = Math.min(sjb * 0.5, IJ_MAX_JOUR);
  return { brut, sjb, ij, mensuel: ij * 30, plafonne: brut > PLAFOND_SJB_MENSUEL };
});

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const meta: GuideMeta = {
  slug: "arret-maladie-salaire",
  titre: "Arrêt maladie : ce que vous touchez vraiment",
  sousTitre: `Indemnités plafonnées à ${EUR2.format(IJ_MAX_JOUR)} par jour — et un plafond de calcul abaissé qui change tout depuis 2025`,
  chapo: `Un arrêt maladie ne coupe pas le salaire, mais il le réduit fortement — et davantage qu'avant. Depuis avril 2025, le salaire pris en compte pour calculer les indemnités journalières est plafonné à 1,4 SMIC au lieu de 1,8, soit une baisse de 22 % du montant maximum. S'y ajoutent trois jours de carence et une indemnisation limitée à 50 % du salaire journalier. Le complément employeur, quand il existe, fait toute la différence. Voici le calcul, chiffré.`,
  filAriane: "Arrêt maladie",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "calcul", label: "Le calcul des indemnités" },
    { id: "plafond", label: "Le plafond abaissé" },
    { id: "complement", label: "Le complément employeur" },
    { id: "reflexes", label: "Les réflexes utiles" },
  ],
  faq: [
    {
      q: "Combien touche-t-on en arrêt maladie ?",
      r: `L'Assurance maladie verse une indemnité journalière égale à 50 % du salaire journalier de base, lui-même calculé sur la moyenne des trois derniers salaires bruts divisée par 91,25. Ce salaire est retenu dans la limite de 1,4 SMIC, soit environ ${EUR.format(PLAFOND_SJB_MENSUEL)} bruts mensuels en 2026 — ce qui plafonne l'indemnité à ${EUR2.format(IJ_MAX_JOUR)} par jour depuis le 1er juillet 2026, soit de l'ordre de ${EUR.format(IJ_MAX_JOUR * 30)} pour un mois complet. À ces indemnités s'ajoute, selon votre convention collective, un complément versé par l'employeur.`,
    },
    {
      q: "Qu'est-ce que le délai de carence de trois jours ?",
      r: `Les trois premiers jours d'un arrêt ne sont pas indemnisés par l'Assurance maladie : le versement commence au quatrième jour. Ce délai s'applique à chaque nouvel arrêt, sauf en cas de prolongation d'un arrêt en cours, d'affection de longue durée ou d'accident du travail. Beaucoup de conventions collectives prennent en charge tout ou partie de cette carence via le maintien de salaire — c'est l'un des éléments les plus concrets à vérifier dans sa convention, et l'un des plus inégalement répartis entre branches.`,
    },
    {
      q: "Mon employeur doit-il compléter les indemnités ?",
      r: "Oui, dans une certaine mesure, dès un an d'ancienneté : la loi de mensualisation impose un maintien de salaire de 90 % de la rémunération brute pendant les 30 premiers jours, puis des deux tiers pendant les 30 suivants, ces durées augmentant avec l'ancienneté. Ce maintien est calculé indemnités journalières déduites — l'employeur ne verse que le complément. Attention : ce dispositif légal comporte lui-même un délai de carence de 7 jours, souvent supprimé par les conventions collectives, qui prévoient fréquemment un maintien à 100 % dès le premier jour.",
    },
    {
      q: "Pourquoi le montant maximum a-t-il baissé ?",
      r: "Parce que le plafond de calcul est passé de 1,8 à 1,4 SMIC pour les arrêts débutant à compter du 1er avril 2025, dans le cadre des mesures d'économies de l'Assurance maladie. La mécanique est indirecte mais l'effet direct : le salaire retenu pour le calcul est écrêté plus tôt, ce qui réduit d'environ 22 % l'indemnité maximale. Concrètement, un salarié à 3 500 € bruts touche aujourd'hui la même indemnité qu'un salarié à 2 600 € — le plafond mord bien avant les hauts salaires.",
    },
    {
      q: "Les indemnités journalières sont-elles imposables ?",
      r: "Oui, les indemnités journalières de maladie ordinaire sont soumises à l'impôt sur le revenu et au prélèvement à la source, ainsi qu'à la CSG-CRDS à taux réduit. Elles figurent sur votre déclaration pré-remplie. Exception notable : les indemnités versées au titre d'une affection de longue durée sont exonérées d'impôt sur le revenu. Les indemnités d'accident du travail ou de maladie professionnelle, elles, ne sont imposables qu'à hauteur de 50 %.",
    },
  ],
  sources: [
    { label: "ameli.fr — montants maximum des indemnités journalières", href: "https://www.ameli.fr/entreprise/vos-salaries/montants-reference/indemnites-journalieres" },
    { label: "ameli.fr — indemnités journalières en cas d'arrêt maladie", href: "https://www.ameli.fr/assure/remboursements/indemnites-journalieres" },
    { label: "Code du travail, art. L1226-1 — maintien de salaire (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019071106" },
    { label: "service-public.fr — arrêt maladie d'un salarié du privé", href: "https://www.service-public.fr/particuliers/vosdroits/F3053" },
  ],
};

export const metadata: Metadata = {
  title: `Arrêt maladie : combien touche-t-on ? (${EUR2.format(IJ_MAX_JOUR)}/jour maximum en 2026)`,
  description: `Indemnités journalières à 50 % du salaire, plafonnées à ${EUR2.format(IJ_MAX_JOUR)}/jour depuis juillet 2026, plafond de calcul abaissé à 1,4 SMIC (−22 %), trois jours de carence. Trois cas chiffrés, le maintien de salaire employeur et la fiscalité des IJ.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Arrêt maladie : ce que vous touchez vraiment",
    description: "Le calcul des indemnités, le plafond abaissé en 2025, et le complément employeur.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Le calcul, en trois étapes
        </h2>
        <div className="mt-4 rounded-xl bg-muted p-5 text-center">
          <p className="font-semibold text-foreground">
            Salaire journalier de base = (3 derniers salaires bruts, plafonnés à 1,4 SMIC) ÷ 91,25
          </p>
          <p className="mt-1 font-semibold text-foreground">
            Indemnité journalière = salaire journalier de base × 50 %
          </p>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Salaire brut mensuel</th>
                <th className="px-5 py-4 text-right">Salaire journalier retenu</th>
                <th className="px-5 py-4 text-right">Indemnité par jour</th>
                <th className="px-5 py-4 text-right">Pour 30 jours</th>
              </tr>
            </thead>
            <tbody>
              {PROFILS.map((p) => (
                <tr key={p.brut} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold tabular-nums text-foreground">
                    {EUR.format(p.brut)}
                    {p.plafonne && (
                      <span className="ml-2 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-destructive">
                        plafonné
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR2.format(p.sjb)}</td>
                  <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">{EUR2.format(p.ij)}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(p.mensuel)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le point le plus frappant de ce tableau : le salarié à{" "}
          {EUR.format(3_500)} bruts touche <strong>exactement la même
          indemnité</strong> que celui à {EUR.format(2_600)}. Le plafond de
          1,4 SMIC écrête tout ce qui dépasse environ{" "}
          {EUR.format(PLAFOND_SJB_MENSUEL)} bruts mensuels — soit à peine
          au-dessus du salaire médian français. Pour connaître votre brut exact,
          notre{" "}
          <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
            simulateur brut/net
          </Link>{" "}
          fait la conversion dans les deux sens.
        </p>
      </section>

      <section id="plafond" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Le changement de 2025 que peu de gens ont vu passer
        </h2>
        <div className="mt-4 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
          <p className="text-base leading-relaxed">
            Pour les arrêts débutant à compter du{" "}
            <strong>1er avril 2025</strong>, le plafond du salaire retenu est
            passé de <strong>1,8 à 1,4 SMIC</strong>. L&apos;indemnité
            journalière maximale a mécaniquement chuté d&apos;environ{" "}
            <strong>22 %</strong>. Aucune ligne n&apos;a changé sur les
            bulletins de paie, aucun courrier n&apos;a prévenu les salariés :
            l&apos;effet ne se découvre qu&apos;au premier arrêt. Pour un cadre
            en arrêt long, l&apos;écart avec l&apos;ancien régime se chiffre en
            centaines d&apos;euros par mois.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: EUR2.format(IJ_MAX_JOUR), l: "indemnité journalière maximale depuis le 1er juillet 2026" },
            { v: EUR.format(PLAFOND_SJB_MENSUEL), l: "salaire mensuel brut au-delà duquel l'indemnité n'augmente plus" },
            { v: `${CARENCE} jours`, l: "de carence avant le premier versement" },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
              <p className="text-2xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-2 text-xs text-muted-foreground">{c.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="complement" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          Le complément employeur : là où se joue la vraie différence
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Les indemnités de la Sécurité sociale ne sont qu&apos;une moitié de
            l&apos;équation. Dès <strong>un an d&apos;ancienneté</strong>, la
            loi impose à l&apos;employeur un maintien de salaire : 90 % de la
            rémunération brute pendant les 30 premiers jours, puis deux tiers
            pendant les 30 suivants, avec des durées qui s&apos;allongent avec
            l&apos;ancienneté. Ce maintien est calculé{" "}
            <em>indemnités journalières déduites</em> : l&apos;employeur ne
            verse que la différence.
          </p>
          <ul className="mt-5 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Le régime légal comporte 7 jours de carence</strong> pour le maintien employeur — distincts des 3 jours de la Sécurité sociale.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Beaucoup de conventions collectives font mieux</strong> : maintien à 100 % dès le premier jour, sans condition d&apos;ancienneté, sur des durées bien plus longues. C&apos;est l&apos;un des avantages les plus concrets d&apos;une bonne convention — et l&apos;un des moins regardés à l&apos;embauche.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>La subrogation</strong> : quand l&apos;employeur la pratique, il vous verse l&apos;intégralité et perçoit les indemnités à votre place. Vous ne voyez aucune coupure de trésorerie — sinon, comptez plusieurs semaines avant le premier virement de l&apos;Assurance maladie.</span>
            </li>
          </ul>
          <div className="mt-5 rounded-r-lg border-l-4 border-primary bg-muted p-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground">Les indépendants n&apos;ont pas ce filet.</strong>{" "}
              Un micro-entrepreneur perçoit des indemnités journalières bien plus
              faibles, sous conditions d&apos;affiliation et de revenu ; un
              président de SASU cotise au régime général mais sans complément
              employeur. Le salarié porté, lui, conserve le régime salarié
              complet — un point de comparaison chiffré dans notre{" "}
              <Link href="/simulateurs/salarie-ou-freelance" className="underline underline-offset-4">
                comparateur salarié ou freelance
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="reflexes" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Quatre réflexes utiles
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>Transmettre l&apos;arrêt sous 48 heures</strong> : les volets 1 et 2 à la caisse d&apos;assurance maladie, le volet 3 à l&apos;employeur. Au-delà, l&apos;indemnisation peut être réduite.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>Lire sa convention collective</strong> sur le maintien de salaire : c&apos;est elle, pas la loi, qui détermine si vous toucherez 50 % ou 100 % de votre salaire.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span><strong>Vérifier la prévoyance</strong> : la plupart des contrats collectifs prennent le relais après 90 jours d&apos;arrêt, quand le maintien employeur s&apos;épuise. Les cadres en bénéficient obligatoirement.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">4.</span>
              <span><strong>Anticiper l&apos;effet fiscal</strong> : les indemnités journalières de maladie ordinaire sont imposables et soumises au prélèvement à la source, ce qui surprend souvent l&apos;année suivante. Notre <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">simulateur net après impôt</Link> aide à estimer l&apos;effet sur l&apos;année.</span>
            </li>
          </ul>
        </div>
      </section>
    </GuideShell>
  );
}
