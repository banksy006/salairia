import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalculatorIcon, ReceiptIcon, ScaleIcon, InfoIcon } from "@/components/icons";

// Barème URSSAF 2026 de l'allocation forfaitaire de télétravail.
// Vérifié le 1er septembre 2026 — deux modes de calcul au choix de l'employeur.
const PAR_JOUR = 2.7;
const PLAFOND_MENSUEL = 59.4;
const PAR_JOUR_HEBDO_MENSUEL = 10.7;
const PLAFOND_ANNUEL_IR = 626.4;

const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "indemnite-teletravail",
  titre: "Indemnité de télétravail : les barèmes 2026 et ce que vous pouvez demander",
  sousTitre: `${EUR2.format(PAR_JOUR)} par jour télétravaillé, ou ${EUR2.format(PAR_JOUR_HEBDO_MENSUEL)} par mois et par jour hebdomadaire — exonérés de cotisations`,
  chapo: `Aucune loi n'oblige l'employeur à verser une indemnité de télétravail. Mais s'il le fait, l'URSSAF fixe des plafonds jusqu'auxquels cette allocation est exonérée de cotisations et d'impôt : ${EUR2.format(PAR_JOUR)} par jour, ou ${EUR2.format(PAR_JOUR_HEBDO_MENSUEL)} par mois pour chaque jour de télétravail hebdomadaire régulier. Comprendre ces barèmes, c'est savoir ce qu'on peut demander — et vérifier ce qu'on reçoit.`,
  filAriane: "Indemnité de télétravail",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "baremes", label: "Les deux barèmes" },
    { id: "obligation", label: "Est-ce obligatoire ?" },
    { id: "calcul", label: "Ce que ça représente" },
    { id: "negocier", label: "Le demander et le vérifier" },
  ],
  faq: [
    {
      q: "Quel est le montant de l'indemnité de télétravail en 2026 ?",
      r: `Deux modes de calcul coexistent, au choix de l'employeur. Le premier est journalier : ${EUR2.format(PAR_JOUR)} par jour effectivement télétravaillé, dans la limite de ${EUR2.format(PLAFOND_MENSUEL)} par mois. Le second est forfaitaire mensuel : ${EUR2.format(PAR_JOUR_HEBDO_MENSUEL)} par mois pour chaque jour de télétravail par semaine — un salarié en télétravail deux jours par semaine perçoit donc ${EUR2.format(PAR_JOUR_HEBDO_MENSUEL * 2)} par mois. Dans les deux cas, ces montants sont exonérés de cotisations sociales, de CSG-CRDS et d'impôt sur le revenu, sans justificatif à produire.`,
    },
    {
      q: "L'employeur est-il obligé de verser une indemnité de télétravail ?",
      r: "Non. Depuis 2017, l'obligation de prise en charge de tous les coûts découlant du télétravail a été supprimée du Code du travail. Aucun texte n'impose donc une allocation forfaitaire. En revanche, deux tempéraments existent : un accord collectif ou une charte d'entreprise peut la rendre obligatoire — c'est le cas dans de nombreuses branches depuis 2021 —, et l'employeur reste tenu de fournir les équipements nécessaires à l'exercice des fonctions. L'accord national interprofessionnel de 2020 encourage par ailleurs la prise en charge, sans la rendre contraignante.",
    },
    {
      q: "Que se passe-t-il si l'employeur verse plus que le barème ?",
      r: "L'excédent n'est exonéré que si l'employeur peut justifier des frais réellement engagés par le salarié — factures d'abonnement internet, d'électricité, achat de matériel au prorata de l'usage professionnel. À défaut de justification, la part dépassant le barème est réintégrée dans le salaire brut et supporte cotisations, CSG-CRDS et impôt. C'est pourquoi la plupart des entreprises calent leur allocation exactement sur le barème URSSAF : au-delà, la gestion administrative devient disproportionnée.",
    },
    {
      q: "L'indemnité de télétravail apparaît-elle sur le bulletin de paie ?",
      r: `Oui, sur une ligne distincte, en dehors du salaire brut : c'est un remboursement de frais professionnels, pas un élément de rémunération. Elle n'entre donc ni dans l'assiette des cotisations, ni dans le net imposable, ni dans le calcul de vos droits (retraite, chômage, indemnités de rupture). Sur l'année, l'exonération d'impôt sur le revenu est plafonnée à ${EUR.format(PLAFOND_ANNUEL_IR)}. Le mécanisme est le même que pour les autres remboursements de frais, décrit dans notre guide du net imposable.`,
    },
    {
      q: "Un télétravailleur a-t-il droit aux titres-restaurant ?",
      r: "Oui. Le principe d'égalité de traitement l'impose : un salarié en télétravail dont la journée comprend une pause repas a droit à son titre-restaurant dans les mêmes conditions qu'un salarié sur site. La jurisprudence l'a confirmé et le BOSS l'a intégré. Un employeur qui réserverait les titres aux seuls jours de présence s'exposerait à un rappel, sauf accord collectif organisant un dispositif équivalent. C'est un point distinct de l'allocation de télétravail : les deux se cumulent.",
    },
  ],
  sources: [
    { label: "URSSAF — frais professionnels liés au télétravail", href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/frais-professionnels.html" },
    { label: "BOSS — frais professionnels et télétravail", href: "https://boss.gouv.fr/portail/accueil/avantages-en-nature-et-frais-pro/frais-professionnels.html" },
    { label: "Code du travail, art. L1222-9 à L1222-11 — télétravail (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006177841/" },
    { label: "service-public.fr — télétravail dans le secteur privé", href: "https://www.service-public.fr/particuliers/vosdroits/F13851" },
  ],
};

export const metadata: Metadata = {
  title: `Indemnité de télétravail 2026 : ${EUR2.format(PAR_JOUR)}/jour, les barèmes URSSAF`,
  description: `L'allocation forfaitaire de télétravail est exonérée jusqu'à ${EUR2.format(PAR_JOUR)} par jour (plafond ${EUR2.format(PLAFOND_MENSUEL)}/mois) ou ${EUR2.format(PAR_JOUR_HEBDO_MENSUEL)} par mois et par jour hebdomadaire. Elle n'est pas obligatoire mais souvent prévue par accord. Ce qu'on peut demander, et le droit aux titres-restaurant.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Indemnité de télétravail : les barèmes 2026",
    description: "Ce que l'employeur peut verser sans charges, et ce que vous pouvez demander.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="baremes" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Les deux barèmes, au choix de l&apos;employeur
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-accent bg-accent/5 p-6 shadow-md">
            <p className="text-3xl font-bold tabular-nums text-accent">{EUR2.format(PAR_JOUR)}</p>
            <p className="mt-1 font-semibold text-foreground">par jour télétravaillé</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Calcul au réel, sur les jours effectivement télétravaillés, dans
              la limite de <strong>{EUR2.format(PLAFOND_MENSUEL)} par mois</strong>.
              Adapté aux organisations souples, où le nombre de jours varie
              d&apos;une semaine à l&apos;autre.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="text-3xl font-bold tabular-nums text-primary">{EUR2.format(PAR_JOUR_HEBDO_MENSUEL)}</p>
            <p className="mt-1 font-semibold text-foreground">par mois, et par jour de télétravail hebdomadaire</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Forfait mensuel fixe : deux jours par semaine donnent{" "}
              <strong>{EUR2.format(PAR_JOUR_HEBDO_MENSUEL * 2)} par mois</strong>,
              trois jours {EUR2.format(PAR_JOUR_HEBDO_MENSUEL * 3)}. Plus simple
              à gérer en paie quand le rythme est régulier.
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Dans les deux cas, l&apos;allocation est exonérée de{" "}
          <strong>cotisations sociales, de CSG-CRDS et d&apos;impôt sur le
          revenu</strong>, sans justificatif à produire — c&apos;est tout
          l&apos;intérêt du forfait. L&apos;exonération fiscale est plafonnée à{" "}
          {EUR.format(PLAFOND_ANNUEL_IR)} par an. Un accord collectif peut
          prévoir des montants supérieurs, exonérés eux aussi dans des limites
          plus élevées lorsqu&apos;ils sont prévus par la branche.
        </p>
      </section>

      <section id="obligation" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Obligatoire ? Non — mais souvent dû quand même
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Depuis les ordonnances de 2017, le Code du travail n&apos;impose
            plus à l&apos;employeur de prendre en charge tous les coûts
            découlant du télétravail. Aucune allocation n&apos;est donc légalement
            obligatoire. Trois nuances importantes :
          </p>
          <ul className="mt-4 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>L&apos;accord collectif ou la charte</strong> peut la rendre obligatoire — et c&apos;est le cas dans de nombreuses branches depuis l&apos;accord national interprofessionnel de 2020. Vérifiez votre convention avant de conclure qu&apos;on ne vous doit rien.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Les équipements restent à la charge de l&apos;employeur</strong> : il doit fournir les outils nécessaires à l&apos;exercice des fonctions. Un ordinateur, un écran ou un siège relèvent de cette obligation, distincte de l&apos;allocation forfaitaire.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Les frais réels restent remboursables</strong> sur justificatifs, si l&apos;employeur choisit cette voie plutôt que le forfait — mais la gestion est nettement plus lourde des deux côtés.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Ce que ça représente réellement
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Rythme de télétravail</th>
                <th className="px-5 py-4 text-right">Forfait mensuel</th>
                <th className="px-5 py-4 text-right">Sur l&apos;année</th>
                <th className="px-5 py-4 text-right">Équivalent en brut*</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((j) => {
                const mensuel = PAR_JOUR_HEBDO_MENSUEL * j;
                return (
                  <tr key={j} className={`border-b border-border last:border-b-0 ${j === 2 ? "bg-accent/5" : ""}`}>
                    <td className={`px-5 py-3 font-semibold text-foreground ${j === 2 ? "border-l-4 border-accent" : ""}`}>
                      {j} jour{j > 1 ? "s" : ""} par semaine
                    </td>
                    <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">{EUR2.format(mensuel)}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(mensuel * 12)}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">≈ {EUR.format((mensuel / 0.78) * 12)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          * L&apos;allocation étant nette de cotisations et d&apos;impôt,
          obtenir la même somme en salaire supposerait une augmentation brute
          nettement supérieure — de l&apos;ordre de 28 % de plus, puis encore
          l&apos;impôt. C&apos;est l&apos;argument à avoir en tête : à coût
          employeur égal, l&apos;allocation de télétravail est bien plus
          efficace qu&apos;une augmentation, comme les{" "}
          <Link href="/guides/titres-restaurant" className="text-primary underline-offset-4 hover:underline">
            titres-restaurant
          </Link>{" "}
          — et pour la même raison.
        </p>
      </section>

      <section id="negocier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Le demander, et vérifier ce qu&apos;on reçoit
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>Commencez par lire votre accord d&apos;entreprise ou la charte télétravail.</strong> Si une allocation y figure, elle est due : ce n&apos;est plus une demande mais une application.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>Vérifiez la ligne sur votre bulletin.</strong> L&apos;allocation doit apparaître séparément du brut, en remboursement de frais — si elle est intégrée au salaire, elle est chargée et imposée, ce qui vous coûte inutilement.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span><strong>Vérifiez vos titres-restaurant.</strong> Les jours télétravaillés y ouvrent droit comme les jours sur site. C&apos;est le manquement le plus fréquent, et il se rattrape.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">4.</span>
              <span><strong>En négociation d&apos;embauche</strong>, chiffrez l&apos;ensemble : allocation télétravail, titres-restaurant, mutuelle et primes pèsent souvent plus qu&apos;on ne le croit face au fixe. Notre <Link href="/simulateurs/negociation-salariale" className="text-primary underline-offset-4 hover:underline">simulateur de négociation</Link> aide à comparer des packages hétérogènes.</span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            Dernier point pour les indépendants : un{" "}
            <Link href="/guides/portage-salarial" className="text-primary underline-offset-4 hover:underline">
              salarié porté
            </Link>{" "}
            peut lui aussi bénéficier de ce forfait, versé par sa société de
            portage et déduit de son compte d&apos;activité — un micro-entrepreneur,
            lui, n&apos;a rien d&apos;équivalent : ses frais de bureau sont
            couverts par l&apos;abattement forfaitaire, sans ligne dédiée.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
