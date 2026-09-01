import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, CalculatorIcon, ScaleIcon, InfoIcon } from "@/components/icons";
import { calculerBrutVersNet } from "@/lib/calculators/salaire-brut-net";

// 13e mois type : un mois de salaire brut supplémentaire, soumis aux mêmes
// cotisations qu'un salaire ordinaire. Chiffré par le simulateur brut/net.
const BRUT_13E = 2_500;
const r = calculerBrutVersNet({
  salaire: BRUT_13E,
  mode: "brut-vers-net",
  periodicite: "mensuel",
  statut: "non-cadre",
  tauxPAS: 0,
});
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "13e-mois",
  titre: "13e mois : qui y a droit, comment il se calcule",
  sousTitre: `Un 13e mois de ${EUR.format(BRUT_13E)} bruts laisse environ ${EUR.format(r.netAvantImpotMensuel)} nets — avant impôt`,
  chapo: "Le 13e mois n'est prévu par aucune loi : il naît d'une convention collective, d'un accord d'entreprise, du contrat de travail ou d'un usage. Mais dès qu'il existe, il devient un droit — pas un geste. Qui peut y prétendre, comment se calcule le prorata en cas d'arrivée ou de départ en cours d'année, ce qu'il laisse en net, et les questions qui fâchent : prime remplacée, embauche « avec » ou « sans », mensualisation.",
  filAriane: "13e mois",
  datePublished: "2026-08-23",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "droit", label: "D'où vient le droit" },
    { id: "calcul", label: "Calcul et prorata" },
    { id: "net", label: "Ce qu'il laisse en net" },
    { id: "questions", label: "Les cas litigieux" },
  ],
  faq: [
    {
      q: "Le 13e mois est-il obligatoire ?",
      r: "Non — aucune loi ne l'impose. Il devient obligatoire pour l'employeur dès lors qu'il est prévu par la convention collective (c'est le cas dans la banque, les assurances, l'immobilier, une partie de la chimie…), un accord d'entreprise, le contrat de travail, ou un usage constant, fixe et général dans l'entreprise. Dans ces cas, le supprimer unilatéralement est impossible : un usage se dénonce selon une procédure précise (information des représentants du personnel et de chaque salarié, délai de prévenance), et une clause contractuelle ne se retire qu'avec l'accord du salarié.",
    },
    {
      q: "Comment le 13e mois est-il calculé en cas d'année incomplète ?",
      r: "Sauf disposition contraire du texte qui l'institue, le 13e mois se proratise au temps de présence : arrivé au 1er juillet, vous touchez la moitié ; parti au 31 mars, un quart — généralement versé avec le solde de tout compte. Le texte fondateur (convention, accord) peut toutefois conditionner le versement à la présence dans l'entreprise à la date de paiement : cette clause est licite pour une prime versée en une fois, d'où l'importance de lire le texte exact avant de démissionner en novembre.",
    },
    {
      q: "Le 13e mois est-il imposable et soumis à cotisations ?",
      r: "Intégralement, comme n'importe quel salaire : cotisations salariales (environ 22 % pour un non-cadre), CSG-CRDS, puis prélèvement à la source. C'est sa grande différence avec la prime de partage de la valeur, qui bénéficie d'exonérations. Le mois de son versement, votre net grimpe donc fortement mais le prélèvement à la source aussi — le taux s'applique sur un revenu doublé, ce qui surprend sur le bulletin de décembre.",
    },
    {
      q: "Un salarié à temps partiel ou en CDD y a-t-il droit ?",
      r: "Oui, dès lors que le texte qui institue le 13e mois couvre sa catégorie : le principe d'égalité de traitement interdit d'en exclure les temps partiels (versement au prorata de la durée du travail) comme les CDD (au prorata de la présence), sauf différence de situation objective. Un CDD de 6 mois dans une entreprise à 13e mois conventionnel doit percevoir 6/12e de la prime. Les intérimaires suivent un régime distinct via leur indemnité de fin de mission.",
    },
    {
      q: "13e mois mensualisé ou versé en décembre : est-ce la même chose ?",
      r: "Financièrement oui, psychologiquement non. Certaines entreprises « mensualisent » le 13e mois : le salaire affiché est en réalité le salaire annuel divisé par 12 avec la prime déjà intégrée. À l'embauche, la question à poser est toujours : « le salaire annoncé est-il sur 12 ou sur 13 mois ? » — 36 000 € sur 13 mois font 2 769 € mensuels, contre 3 000 € sur 12. Notre simulateur brut/net permet de comparer les deux offres en net réel.",
    },
  ],
  sources: [
    { label: "service-public.fr — prime de 13e mois", href: "https://www.service-public.fr/particuliers/vosdroits/F2528" },
    { label: "Code du travail — principe d'égalité de traitement (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072050/" },
    { label: "URSSAF — les éléments de rémunération soumis à cotisations", href: "https://www.urssaf.fr/accueil/employeur/verser-remuneration.html" },
  ],
};

export const metadata: Metadata = {
  title: `13e mois : qui y a droit, calcul du prorata, net réel (${EUR.format(r.netAvantImpotMensuel)} sur ${EUR.format(BRUT_13E)} bruts)`,
  description: "Le 13e mois n'est pas légal mais conventionnel : convention collective, accord, contrat ou usage. Prorata d'année incomplète, temps partiel, CDD, fiscalité — et le piège du salaire annoncé « sur 13 mois » à l'embauche.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "13e mois : qui y a droit, comment il se calcule",
    description: "D'où vient le droit, le prorata, le net réel et les cas litigieux.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="droit" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          D&apos;où vient le droit au 13e mois
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Quatre sources possibles, par ordre de solidité : la{" "}
            <strong>convention collective</strong> (imposée à toutes les
            entreprises de la branche), l&apos;<strong>accord
            d&apos;entreprise</strong>, le <strong>contrat de travail</strong>{" "}
            (le plus protecteur individuellement : il ne se modifie
            qu&apos;avec votre accord), et l&apos;<strong>usage</strong> — une
            pratique constante, fixe et générale, qui engage l&apos;employeur
            tant qu&apos;il ne l&apos;a pas dénoncée dans les formes.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Le réflexe : identifier <em>votre</em> source. Elle détermine tout
            le reste — assiette de calcul (salaire de base ou salaire moyen,
            primes incluses ou non), date de versement, condition de présence,
            règles de prorata. Deux salariés de deux branches différentes
            peuvent avoir deux 13e mois aux règles opposées, parfaitement
            légales l&apos;une comme l&apos;autre.
          </p>
        </div>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Calcul, prorata et cas particuliers
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">La règle par défaut</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Un mois de salaire de base, proratisé au temps de présence de
              l&apos;année : 6 mois de présence = 50 % du 13e mois, versés le
              cas échéant avec le solde de tout compte. Les absences
              assimilées à du travail effectif (congés payés, maternité,
              accident du travail) ne réduisent pas la prime ; les congés sans
              solde, si — sauf texte plus favorable.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Ce que le texte peut changer</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Condition de présence à la date de versement, assiette élargie
              aux primes, versement en deux fois (juin et décembre),
              ancienneté minimale d&apos;un an… Toutes ces clauses existent et
              sont opposables. La seule limite : l&apos;égalité de traitement
              entre salariés placés dans la même situation.
            </p>
          </div>
        </div>
      </section>

      <section id="net" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Ce qu&apos;un 13e mois laisse en net
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le 13e mois est un salaire comme un autre : mêmes cotisations,
            même CSG, même prélèvement à la source. Sur un 13e mois de{" "}
            {EUR.format(BRUT_13E)} bruts (non-cadre), notre simulateur brut/net
            calcule <strong>{EUR.format(r.netAvantImpotMensuel)} nets avant
            impôt</strong> — soit {EUR.format(BRUT_13E - r.netAvantImpotMensuel)}{" "}
            de cotisations salariales. Le prélèvement à la source
            s&apos;applique ensuite à votre taux personnalisé, sur un revenu
            mensuel doublé : le net « après impôt » de décembre est donc
            proportionnellement plus entamé qu&apos;un mois ordinaire, sans
            que votre impôt annuel change — c&apos;est un simple effet de
            calendrier.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/simulateurs/salaire-brut-net" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
              Calculer mon 13e mois en net →
            </Link>
            <Link href="/simulateurs/net-apres-impot" className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary">
              Estimer l&apos;effet du prélèvement à la source
            </Link>
          </div>
        </div>
      </section>

      <section id="questions" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Les trois cas qui fâchent
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-4 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span>
                <strong>« Salaire sur 13 mois » à l&apos;embauche.</strong> Un
                package de 39 000 € sur 13 mois, c&apos;est 3 000 € par
                versement mais un mensuel courant de 3 000 € aussi — alors que
                39 000 € sur 12 mois font 3 250 € chaque mois. À l&apos;année
                c&apos;est identique ; pour votre trésorerie mensuelle et vos
                capacités d&apos;emprunt, non. Exigez toujours le montant{" "}
                <em>annuel brut</em> et le nombre de versements.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span>
                <strong>Le 13e mois « remplacé » par une prime.</strong> Un
                employeur ne peut pas substituer une prime discrétionnaire
                (PPV comprise) à un 13e mois dû par convention, contrat ou
                usage — la PPV a d&apos;ailleurs une interdiction légale de
                substitution. Si votre 13e mois a discrètement disparu au
                profit d&apos;une « prime exceptionnelle », le rappel de
                salaire se prescrit par 3 ans.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span>
                <strong>La comparaison d&apos;offres.</strong> Un 13e mois
                conventionnel vaut plus qu&apos;une prime d&apos;objectifs du
                même montant : il est garanti, productif de droits, et suit
                vos augmentations. Pour comparer deux packages hétérogènes,
                ramenez tout en{" "}
                <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
                  net annuel
                </Link>{" "}
                puis pondérez ce qui est garanti et ce qui ne l&apos;est pas —
                notre{" "}
                <Link href="/simulateurs/negociation-salariale" className="text-primary underline-offset-4 hover:underline">
                  simulateur de négociation
                </Link>{" "}
                vous y aide.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </GuideShell>
  );
}
