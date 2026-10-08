import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, EuroIcon, CalendarIcon, ScaleIcon, AlertTriangleIcon } from "@/components/icons";
import { SALAIRE_2026 } from "@/lib/calculators/salaire-brut-net";

// PLFSS 2027, art. 7 (Assemblée nationale n° 3211, déposé le 1er octobre 2026) :
// exonération de cotisations inscrite au code de la Sécurité sociale, dans une
// limite fixée par décret qui ne peut excéder 1/15 du PASS (doublée avec un
// accord d'intéressement) ; dans les entreprises de moins de 50 salariés,
// exonération de CSG-CRDS prolongée aux primes versées jusqu'au 31 décembre
// 2027, sans l'exonération d'impôt. Vérifié le 8 octobre 2026.
// PASS 2027 estimé à 48 900 € (Commission des comptes de la Sécurité sociale).
const PLAFOND_MAX_2026 = SALAIRE_2026.PASS_ANNUEL / 15;
const PLAFOND_MAX_2027 = 48_900 / 15;
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "prime-partage-valeur",
  titre: "Prime de partage de la valeur : ce qui change au 1er janvier 2027",
  sousTitre: "Jusqu'à 3 000 ou 6 000 € aujourd'hui — et un budget 2027 qui pérennise l'exonération de cotisations, épargne la CSG un an de plus dans les TPE, mais fait revenir l'impôt",
  chapo: "L'ex-« prime Macron » vit ses derniers mois sous son régime le plus favorable : dans les entreprises de moins de 50 salariés, elle reste exonérée de tout — cotisations, CSG et impôt — pour les salariés sous 3 SMIC jusqu'au 31 décembre 2026. Le projet de loi de financement de la Sécurité sociale pour 2027, déposé le 1er octobre, adoucit la sortie : exonération de cotisations pérennisée, CSG-CRDS toujours épargnée en 2027 dans les petites entreprises — mais l'exonération d'impôt sur le revenu n'est pas prolongée. Ce qu'il faut savoir, côté salarié comme côté employeur, avant le 31 décembre.",
  filAriane: "Prime de partage de la valeur",
  datePublished: "2026-08-23",
  dateModified: "2026-10-08",
  tocItems: [
    { id: "quoi", label: "Ce qu'est la PPV" },
    { id: "plafonds", label: "Plafonds 3 000 / 6 000 €" },
    { id: "regimes", label: "Qui est exonéré de quoi" },
    { id: "fin", label: "Ce qui change en 2027" },
  ],
  faq: [
    {
      q: "Qu'est-ce que la prime de partage de la valeur, et qui peut la verser ?",
      r: "C'est une prime facultative que tout employeur peut verser à ses salariés, exonérée de cotisations sociales dans la limite de 3 000 € par an et par bénéficiaire — 6 000 € si l'entreprise est couverte par un accord d'intéressement ou de participation volontaire. Elle peut être versée en une ou plusieurs fois (au maximum une par trimestre), et depuis 2024 un employeur peut attribuer deux PPV distinctes dans la même année civile, dans la limite des plafonds globaux. Le montant peut être modulé selon la rémunération, l'ancienneté, la durée de travail ou la présence effective.",
    },
    {
      q: "La PPV est-elle imposable pour le salarié en 2026 ?",
      r: "Tout dépend de deux critères : la taille de l'entreprise et votre rémunération. Dans une entreprise de moins de 50 salariés, si vous gagnez moins de 3 SMIC, la prime est exonérée de tout jusqu'au 31 décembre 2026 : pas de cotisations, pas de CSG-CRDS, pas d'impôt sur le revenu. Dans tous les autres cas (entreprise de 50 salariés et plus, ou rémunération au-delà de 3 SMIC), la prime est exonérée de cotisations sociales mais supporte la CSG-CRDS et l'impôt sur le revenu.",
    },
    {
      q: "Que se passe-t-il au 1er janvier 2027 ?",
      r: "Sans nouveau texte, le régime de faveur des petites entreprises s'éteint : la PPV serait partout exonérée de cotisations sociales uniquement, et soumise à la CSG-CRDS ainsi qu'à l'impôt sur le revenu. Le projet de LFSS 2027 (article 7) change en partie la donne : dans les entreprises de moins de 50 salariés, la CSG-CRDS resterait exonérée sur les primes versées en 2027 aux salariés sous 3 SMIC — mais pas l'impôt sur le revenu, dont l'exonération n'est pas reconduite. Concrètement, une prime de 1 000 € versée en décembre 2026 à un salarié à 2 SMIC d'une TPE arrive intacte ; versée en janvier 2027, elle serait imposée à son taux marginal, et rognée en plus de 97 € de CSG-CRDS si le texte n'est pas adopté. Dans les deux cas, verser avant le 31 décembre reste l'option la plus favorable.",
    },
    {
      q: "Le plafond de 3 000 € va-t-il changer ?",
      r: `Peut-être, à la marge. Le PLFSS 2027 inscrit l'exonération de cotisations dans le code de la Sécurité sociale, avec un plafond fixé par décret qui ne pourra pas dépasser un quinzième du plafond annuel de la Sécurité sociale : ${EUR.format(PLAFOND_MAX_2026)} sur la base du PASS 2026, environ ${EUR.format(PLAFOND_MAX_2027)} avec le PASS 2027 estimé. Le plafond resterait doublé pour les entreprises dotées d'un accord d'intéressement ou de participation volontaire. Le montant exact dépendra du décret : 3 000 € reste la référence tant qu'il n'est pas publié.`,
    },
    {
      q: "Peut-on placer sa PPV pour éviter l'impôt ?",
      r: "Oui, et ce sera le principal levier après 2026 : la PPV affectée à un plan d'épargne salariale (PEE, PER collectif) dans les 15 jours suivant son versement est exonérée d'impôt sur le revenu, dans la limite des plafonds. L'argent est alors bloqué 5 ans (PEE) sauf cas de déblocage anticipé — mariage, naissance, achat de la résidence principale, rupture du contrat. C'est le même mécanisme que pour l'intéressement et la participation.",
    },
    {
      q: "La PPV peut-elle remplacer une augmentation ?",
      r: "Non, et c'est écrit dans la loi : la prime ne peut se substituer à aucun élément de rémunération obligatoire ni à une augmentation prévue par accord ou usage. La distinction pratique reste réelle : une PPV est ponctuelle, révocable et n'entre pas dans l'assiette de vos droits (retraite, chômage, indemnités), quand une augmentation est acquise et productrice de droits. À montant égal, une augmentation vaut structurellement plus qu'une prime — notre simulateur de négociation permet de chiffrer l'écart sur plusieurs années.",
    },
  ],
  sources: [
    { label: "Loi n° 2022-1158 du 16 août 2022, art. 1er — prime de partage de la valeur (Légifrance)", href: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000046186723" },
    { label: "URSSAF — la prime de partage de la valeur", href: "https://www.urssaf.fr/accueil/employeur/verser-remuneration/prime-partage-valeur.html" },
    { label: "service-public.fr — prime de partage de la valeur (PPV)", href: "https://www.service-public.fr/particuliers/vosdroits/F35275" },
    { label: "economie.gouv.fr — prime de partage de la valeur", href: "https://www.economie.gouv.fr/particuliers/prime-partage-valeur" },
    { label: "Projet de loi de financement de la Sécurité sociale pour 2027, n° 3211, art. 7 (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3211_projet-loi" },
  ],
};

export const metadata: Metadata = {
  title: "Prime de partage de la valeur : plafonds 2026 et ce qui change en 2027",
  description: "PPV : 3 000 € (6 000 € avec accord d'intéressement), exonération totale jusqu'au 31 décembre 2026 dans les entreprises de moins de 50 salariés sous 3 SMIC. Ce que prévoit le PLFSS 2027 : cotisations pérennisées, CSG épargnée un an de plus dans les TPE, retour de l'impôt sur le revenu — et l'option épargne salariale.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "PPV : ce qui change au 1er janvier 2027",
    description: "Exonération totale jusqu'au 31 décembre 2026 en TPE — puis le retour de l'impôt, selon le PLFSS 2027.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="quoi" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          Ce qu&apos;est la PPV — et ce qu&apos;elle n&apos;est pas
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Née en 2019 sous le nom de « prime exceptionnelle de pouvoir
            d&apos;achat » puis pérennisée en 2022, la prime de partage de la
            valeur est un versement <strong>facultatif</strong> de
            l&apos;employeur, mis en place par accord d&apos;entreprise ou
            décision unilatérale. Elle peut bénéficier à tous les salariés ou
            être réservée à ceux dont la rémunération ne dépasse pas un
            plafond ; son montant peut être modulé — rémunération, ancienneté,
            temps de présence — mais jamais individualisé à la tête du client.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Ce qu&apos;elle n&apos;est pas : un élément de salaire. Elle
            n&apos;entre ni dans l&apos;assiette de vos droits à la retraite,
            ni dans le calcul de l&apos;ARE, ni dans celui de vos indemnités de
            rupture. La loi interdit d&apos;ailleurs qu&apos;elle se substitue
            à une augmentation ou à un élément de rémunération obligatoire —
            en pratique, la frontière mérite d&apos;être surveillée quand une
            prime récurrente s&apos;installe à la place des revalorisations.
          </p>
        </div>
      </section>

      <section id="plafonds" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Les plafonds : 3 000 € — ou 6 000 € sous condition
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="text-3xl font-bold tabular-nums text-primary">3 000 €</p>
            <p className="mt-1 text-sm font-semibold text-foreground">par an et par salarié</p>
            <p className="mt-3 text-base leading-relaxed text-foreground/80">
              Le plafond de droit commun de l&apos;exonération de cotisations
              sociales. Versement en une ou plusieurs fois — au maximum une
              fois par trimestre —, et jusqu&apos;à deux primes distinctes
              dans l&apos;année depuis 2024.
            </p>
          </div>
          <div className="rounded-2xl border border-accent bg-accent/5 p-6 shadow-md">
            <p className="text-3xl font-bold tabular-nums text-accent">6 000 €</p>
            <p className="mt-1 text-sm font-semibold text-foreground">si accord d&apos;intéressement ou de participation volontaire</p>
            <p className="mt-3 text-base leading-relaxed text-foreground/80">
              Le plafond double pour les entreprises qui ont mis en place un
              accord d&apos;intéressement, ou un accord de participation alors
              qu&apos;elles n&apos;y sont pas tenues. Une incitation directe à
              structurer le partage de la valeur au-delà de la prime.
            </p>
          </div>
        </div>
      </section>

      <section id="regimes" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Qui est exonéré de quoi, jusqu&apos;au 31 décembre 2026
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Situation</th>
                <th className="px-5 py-4 text-center">Cotisations</th>
                <th className="px-5 py-4 text-center">CSG-CRDS</th>
                <th className="px-5 py-4 text-center">Impôt sur le revenu</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border bg-accent/5">
                <td className="border-l-4 border-accent px-5 py-3 font-semibold text-foreground">
                  Entreprise &lt; 50 salariés, rémunération &lt; 3 SMIC
                </td>
                <td className="px-5 py-3 text-center text-accent">exonérée</td>
                <td className="px-5 py-3 text-center text-accent">exonérée</td>
                <td className="px-5 py-3 text-center font-semibold text-accent">exonérée</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-semibold text-foreground">
                  Tous les autres cas
                </td>
                <td className="px-5 py-3 text-center text-accent">exonérée</td>
                <td className="px-5 py-3 text-center text-destructive">due (9,7 %)</td>
                <td className="px-5 py-3 text-center text-destructive">imposée</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Dans le second cas, l&apos;échappatoire existe : affecter la prime à
          un <strong>plan d&apos;épargne salariale</strong> (PEE, PER
          collectif) dans les 15 jours du versement l&apos;exonère
          d&apos;impôt sur le revenu — contre un blocage de 5 ans, cas de
          déblocage anticipé mis à part.
        </p>
      </section>

      <section id="fin" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Le 1er janvier 2027 : ce qui s&apos;éteint, ce que le budget prolonge
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">PPV versée en 2027, entreprise &lt; 50 salariés, salarié &lt; 3 SMIC</th>
                <th className="px-5 py-4 text-center">Cotisations</th>
                <th className="px-5 py-4 text-center">CSG-CRDS</th>
                <th className="px-5 py-4 text-center">Impôt sur le revenu</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-5 py-3 font-semibold text-foreground">Droit actuel (sans nouveau texte)</td>
                <td className="px-5 py-3 text-center text-accent">exonérée</td>
                <td className="px-5 py-3 text-center text-destructive">due (9,7 %)</td>
                <td className="px-5 py-3 text-center text-destructive">imposée</td>
              </tr>
              <tr className="bg-amber-50/60">
                <td className="border-l-4 border-amber-500 px-5 py-3 font-semibold text-foreground">Si le PLFSS 2027 est adopté en l&apos;état</td>
                <td className="px-5 py-3 text-center text-accent">exonérée</td>
                <td className="px-5 py-3 text-center text-accent">exonérée</td>
                <td className="px-5 py-3 text-center text-destructive">imposée</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
          <p className="text-base leading-relaxed">
            Dans les deux scénarios, l&apos;<strong>exonération d&apos;impôt
            sur le revenu disparaît</strong> au 1er janvier 2027 pour les
            primes perçues directement — seul le placement sur un plan
            d&apos;épargne salariale la préserve. Pour un salarié à 2 SMIC dans
            une TPE, une prime de 1 000 € versée en décembre 2026 arrive
            entière ; la même prime en janvier 2027 subit son taux marginal
            d&apos;imposition — souvent 11 %, parfois 30 % —, et 97 € de
            CSG-CRDS en plus si le PLFSS n&apos;est pas adopté. Employeurs de
            moins de 50 salariés : si une prime est prévue « prochainement »,
            <strong> la verser avant le 31 décembre garde une valeur mesurable</strong>.
          </p>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le texte pérennise par ailleurs l&apos;exonération de cotisations
          pour toutes les entreprises, dans une limite fixée par décret —
          au plus un quinzième du plafond de la Sécurité sociale, soit environ{" "}
          {EUR.format(PLAFOND_MAX_2027)} en 2027, doublée avec un accord
          d&apos;intéressement. Ces mesures sont celles d&apos;un projet de
          loi, déposé le 1er octobre 2026 : cette page sera mise à jour au vote
          définitif, comme notre{" "}
          <Link href="/guides/ce-qui-change-1er-janvier-2027" className="text-primary underline-offset-4 hover:underline">
            récapitulatif du 1er janvier 2027
          </Link>
          .
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Côté salarié, le bon réflexe reste inchangé : une prime ne remplace
          pas une augmentation — elle ne crée aucun droit et peut disparaître
          l&apos;année suivante. Pour préparer la discussion de fond, notre{" "}
          <Link href="/simulateurs/negociation-salariale" className="text-primary underline-offset-4 hover:underline">
            simulateur de négociation salariale
          </Link>{" "}
          chiffre ce que vaut réellement un point d&apos;augmentation, et le{" "}
          <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
            simulateur brut/net
          </Link>{" "}
          traduit la proposition de votre employeur en net réel.
        </p>
      </section>
    </GuideShell>
  );
}
