import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, PercentIcon, CalculatorIcon, InfoIcon, ScaleIcon } from "@/components/icons";

// Exemple fil rouge, dérivé des constantes du simulateur brut/net.
// Réduction de cotisations salariales sur HS plafonnée à 11,31 points
// (art. L241-17 CSS) ; exonération d'IR plafonnée à 7 500 €/an (CGI 81 quater).
const BRUT_BASE = 2_300;
const TAUX_HORAIRE = BRUT_BASE / 151.67;
const HS_25 = TAUX_HORAIRE * 1.25;
const COTIS_NORMALES = 0.22; // ordre de grandeur non-cadre, cohérent avec nos simulateurs
const REDUCTION_HS = 0.1131;
const NET_HEURE_NORMALE = TAUX_HORAIRE * (1 - COTIS_NORMALES);
const NET_HEURE_SUP = HS_25 * (1 - (COTIS_NORMALES - REDUCTION_HS));

const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "heures-supplementaires",
  titre: "Heures supplémentaires : majoration, exonérations, net réel",
  sousTitre: `Une heure sup à 25 % rapporte ${EUR2.format(NET_HEURE_SUP)} nets là où l'heure normale en laisse ${EUR2.format(NET_HEURE_NORMALE)}`,
  chapo: `Les heures supplémentaires cumulent trois avantages que peu de salariés savent chiffrer : une majoration d'au moins 10 % (25 % par défaut), une réduction de cotisations salariales jusqu'à 11,31 points, et zéro impôt sur le revenu jusqu'à 7 500 € par an. Résultat : l'heure sup est, de loin, l'heure la mieux payée de votre mois. Le détail du calcul, les plafonds, et les pièges.`,
  filAriane: "Heures supplémentaires",
  datePublished: "2026-08-23",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "majoration", label: "Les majorations" },
    { id: "exonerations", label: "Les deux exonérations" },
    { id: "calcul", label: "Le calcul complet" },
    { id: "limites", label: "Plafonds et pièges" },
  ],
  faq: [
    {
      q: "Comment sont majorées les heures supplémentaires en 2026 ?",
      r: "Au-delà de 35 heures hebdomadaires, les 8 premières heures supplémentaires (de la 36e à la 43e) sont majorées de 25 %, et les suivantes de 50 %. Un accord d'entreprise ou de branche peut fixer d'autres taux, sans jamais descendre sous 10 %. Vérifiez votre convention collective : c'est elle qui prime sur le taux légal par défaut, dans les deux sens.",
    },
    {
      q: "Les heures supplémentaires sont-elles vraiment non imposables ?",
      r: "Oui, dans la limite de 7 500 € de rémunération d'heures supplémentaires par an et par salarié (montant net imposable). En dessous de ce plafond, ni impôt sur le revenu ni prélèvement à la source sur ces sommes — elles apparaissent d'ailleurs sur une ligne distincte du bulletin et sont pré-remplies à part dans la déclaration. Au-delà de 7 500 €, l'excédent est imposé normalement. Attention : elles restent intégrées au revenu fiscal de référence, ce qui peut jouer sur certaines aides.",
    },
    {
      q: "Qu'est-ce que la réduction de cotisations salariales sur les heures sup ?",
      r: "Les heures supplémentaires bénéficient d'une réduction des cotisations salariales d'assurance vieillesse, plafonnée à 11,31 % de la rémunération de ces heures. Concrètement, là où une heure normale supporte environ 22 % de cotisations salariales, l'heure supplémentaire n'en supporte plus qu'environ 11 %. Combinée à la majoration de 25 % et à l'absence d'impôt, c'est ce qui rend le net des heures sup si supérieur au net des heures normales.",
    },
    {
      q: "Les heures complémentaires du temps partiel sont-elles logées à la même enseigne ?",
      r: "Oui pour l'essentiel : les heures complémentaires (celles effectuées au-delà de la durée contractuelle d'un temps partiel) ouvrent droit à la même exonération d'impôt dans le même plafond commun de 7 500 €, et à la réduction de cotisations. Leur majoration est différente : 10 % pour les heures dans la limite du dixième de la durée contractuelle, 25 % au-delà. Et elles ne peuvent jamais porter le salarié à 35 heures, sous peine de requalification du contrat à temps plein.",
    },
    {
      q: "Mon employeur peut-il remplacer le paiement par du repos ?",
      r: "Oui, si un accord collectif le prévoit : c'est le repos compensateur de remplacement. Une heure majorée à 25 % devient 1 h 15 de repos. Le salarié y perd l'avantage fiscal — un repos ne bénéficie ni de l'exonération d'impôt ni de la réduction de cotisations. À l'inverse, au-delà du contingent annuel (220 heures par défaut), s'ajoute obligatoirement une contrepartie en repos. Si vous avez le choix, le paiement est presque toujours plus avantageux financièrement.",
    },
  ],
  sources: [
    { label: "Code du travail, art. L3121-28 et suivants — heures supplémentaires (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000033020913/" },
    { label: "CGI, art. 81 quater — exonération d'impôt sur le revenu (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046860862" },
    { label: "Code de la sécurité sociale, art. L241-17 — réduction de cotisations salariales (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038610242" },
    { label: "service-public.fr — heures supplémentaires d'un salarié du privé", href: "https://www.service-public.fr/particuliers/vosdroits/F2391" },
    { label: "URSSAF — la réduction de cotisations sur les heures supplémentaires", href: "https://www.urssaf.fr/accueil/employeur/beneficier-exonerations/exoneration-heures-sup.html" },
  ],
};

export const metadata: Metadata = {
  title: "Heures supplémentaires 2026 : majoration 25 %, 7 500 € sans impôt, net réel calculé",
  description: `Majoration d'au moins 25 %, réduction de cotisations de 11,31 points, exonération d'impôt jusqu'à 7 500 €/an : l'heure sup rapporte ${EUR2.format(NET_HEURE_SUP)} nets contre ${EUR2.format(NET_HEURE_NORMALE)} pour l'heure normale sur un brut de ${EUR.format(BRUT_BASE)}. Le calcul complet.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Heures supplémentaires : l'heure la mieux payée de votre mois",
    description: "Majoration, double exonération, plafonds : le calcul complet du net réel.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="majoration" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Les majorations : 25 %, 50 %, jamais moins de 10 %
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Toute heure travaillée au-delà de 35 heures par semaine est une
            heure supplémentaire, décomptée à la semaine civile. Le barème
            légal par défaut : <strong>+25 %</strong> de la 36e à la 43e heure,{" "}
            <strong>+50 %</strong> à partir de la 44e. Un accord
            d&apos;entreprise ou de branche peut y déroger, avec un plancher
            absolu de 10 % — d&apos;où l&apos;importance de vérifier votre
            convention collective avant tout calcul.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Le taux horaire de référence se calcule sur la base de{" "}
            <strong>151,67 heures mensuelles</strong> pour un temps plein :
            pour {EUR.format(BRUT_BASE)} bruts, l&apos;heure normale vaut{" "}
            {EUR2.format(TAUX_HORAIRE)} et l&apos;heure majorée à 25 %{" "}
            <strong>{EUR2.format(HS_25)}</strong>. S&apos;y ajoutent les primes
            liées à la nature du travail (elles entrent dans l&apos;assiette),
            mais pas les remboursements de frais.
          </p>
        </div>
      </section>

      <section id="exonerations" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Les deux exonérations qui changent tout
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Zéro impôt jusqu&apos;à 7 500 €/an</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              La rémunération des heures supplémentaires est exonérée
              d&apos;impôt sur le revenu dans la limite de{" "}
              <strong>7 500 € par an</strong> (CGI, art. 81 quater). Pas de
              prélèvement à la source sur ces sommes, ligne dédiée sur le
              bulletin, case pré-remplie distincte dans la déclaration. Seul
              l&apos;excédent au-delà du plafond est imposé.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Cotisations réduites de 11,31 points</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Les cotisations salariales d&apos;assurance vieillesse sur ces
              heures sont réduites, dans la limite de{" "}
              <strong>11,31 %</strong> de leur rémunération (CSS, art.
              L241-17). L&apos;heure sup ne supporte plus qu&apos;environ 11 %
              de prélèvements sociaux au lieu de ~22 % — sans rogner vos
              droits retraite, la réduction étant compensée par l&apos;État.
            </p>
          </div>
        </div>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Le calcul complet sur un cas type
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Salarié non-cadre à {EUR.format(BRUT_BASE)} bruts (35 h). Comparons
          une heure normale et une heure supplémentaire majorée à 25 %, avec
          ~22 % de cotisations salariales — l&apos;ordre de grandeur de nos
          simulateurs :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">&nbsp;</th>
                <th className="px-5 py-4 text-right">Heure normale</th>
                <th className="px-5 py-4 text-right">Heure sup (+25 %)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-5 py-3 font-semibold text-foreground">Brut</td>
                <td className="px-5 py-3 text-right tabular-nums">{EUR2.format(TAUX_HORAIRE)}</td>
                <td className="px-5 py-3 text-right tabular-nums">{EUR2.format(HS_25)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-5 py-3 font-semibold text-foreground">Cotisations salariales</td>
                <td className="px-5 py-3 text-right tabular-nums text-foreground/70">≈ 22 %</td>
                <td className="px-5 py-3 text-right tabular-nums text-foreground/70">≈ 11 % (réduction 11,31 pts)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-5 py-3 font-semibold text-foreground">Impôt sur le revenu</td>
                <td className="px-5 py-3 text-right text-foreground/70">selon votre taux de PAS</td>
                <td className="px-5 py-3 text-right font-semibold text-accent">0 € (sous 7 500 €/an)</td>
              </tr>
              <tr className="bg-accent/5">
                <td className="border-l-4 border-accent px-5 py-3 font-semibold text-foreground">Net (avant impôt pour l&apos;heure normale)</td>
                <td className="px-5 py-3 text-right tabular-nums">{EUR2.format(NET_HEURE_NORMALE)}</td>
                <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-accent">{EUR2.format(NET_HEURE_SUP)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          L&apos;écart réel est encore plus grand que ces{" "}
          {Math.round((NET_HEURE_SUP / NET_HEURE_NORMALE - 1) * 100)} % : le
          net de l&apos;heure normale sera ensuite amputé du prélèvement à la
          source, pas celui de l&apos;heure sup. Pour un salarié imposé à 11 %,
          l&apos;heure supplémentaire rapporte au final près de{" "}
          <strong>60 % de plus</strong> que l&apos;heure normale. Chiffres à
          affiner sur votre profil exact avec le{" "}
          <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
            simulateur brut/net
          </Link>{" "}
          et le{" "}
          <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">
            simulateur net après impôt
          </Link>
          .
        </p>
      </section>

      <section id="limites" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Plafonds et pièges
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Le contingent annuel</strong> : 220 heures par défaut (souvent modifié par accord). Au-delà, chaque heure ouvre droit à une contrepartie obligatoire en repos en plus de la majoration.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Les durées maximales restent absolues</strong> : 10 h par jour, 48 h par semaine, 44 h en moyenne sur 12 semaines. Aucune exonération ne rend légal leur dépassement.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Forfait jours = pas d&apos;heures sup.</strong> Les cadres au forfait annuel en jours ne décomptent pas leurs heures : le dispositif ne les concerne pas (leurs jours de repos rachetés suivent un autre régime).</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Revenu fiscal de référence</strong> : les heures exonérées y restent intégrées. Elles peuvent donc peser sur l&apos;éligibilité à certaines aides ou au taux réduit de CSG des retraités du foyer.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Non payées ?</strong> Les heures sup imposées par la charge de travail et connues de l&apos;employeur sont dues, même sans accord écrit préalable. Emails, plannings et badgeages font preuve — prescription de 3 ans sur les salaires.</span>
            </li>
          </ul>
        </div>
      </section>
    </GuideShell>
  );
}
