import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ReceiptIcon, InfoIcon, AlertTriangleIcon } from "@/components/icons";
import { PORTAGE_2026, calculerPortage, salaireMinimumMensuel } from "@/lib/calculators/portage";

const TJM = 500;
const JOURS = 18;
const FRAIS = 8;
const r = calculerPortage({
  tjm: TJM,
  joursTravailles: JOURS,
  tauxFraisGestion: FRAIS,
  fraisProRefacturables: 0,
  fraisProNonRefacturables: 0,
  statut: "senior",
  tauxPAS: 0,
});
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const minSenior = salaireMinimumMensuel("senior");

const meta: GuideMeta = {
  slug: "fiche-de-paie-portage-salarial",
  titre: "Fiche de paie en portage salarial",
  sousTitre: "Lire son bulletin ligne à ligne, du CA facturé au net versé",
  chapo: `La fiche de paie d'un salarié porté ressemble à celle d'un salarié classique — avec une différence de taille : le « salaire brut » n'y est pas un montant négocié, c'est le résultat d'un calcul qui part de votre facturation. Voici chaque ligne expliquée, avec un exemple complet à ${TJM} € de TJM.`,
  filAriane: "Fiche de paie portage",
  datePublished: "2026-08-19",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "difference", label: "La différence clé" },
    { id: "lignes", label: "Le bulletin ligne à ligne" },
    { id: "controles", label: "Les 4 points à contrôler" },
  ],
  faq: [
    {
      q: "Pourquoi mon brut varie-t-il d'un mois à l'autre ?",
      r: "Parce qu'il dépend de votre facturation. Contrairement à un salarié classique dont le brut est fixé au contrat, le brut du salarié porté est recalculé chaque mois : chiffre d'affaires encaissé, moins les frais de gestion, moins les charges patronales. Un mois à 15 jours facturés donne mécaniquement un brut plus faible qu'un mois à 20 jours. Certaines sociétés proposent un lissage pour stabiliser le versement, mais la base reste votre activité réelle.",
    },
    {
      q: "Où sont passés les frais de gestion sur mon bulletin ?",
      r: "Ils n'y figurent généralement pas, et c'est normal : les frais de gestion sont prélevés en amont, sur votre compte d'activité, avant l'établissement de la paie. Le bulletin commence au salaire brut, déjà net de ces frais. Pour vérifier le prélèvement, il faut consulter le relevé de compte d'activité que votre société de portage doit vous fournir — c'est un document distinct du bulletin.",
    },
    {
      q: "Qu'est-ce que la réserve financière sur mon compte d'activité ?",
      r: "La convention collective impose à la société de portage de constituer une réserve — généralement 10 % du salaire de base sur les CDI — destinée à financer les périodes sans mission. Cette somme reste dans votre compte d'activité et vous est reversée selon les modalités de votre contrat. Elle explique une partie de l'écart entre ce que vous facturez et ce qui apparaît en brut le même mois.",
    },
    {
      q: "Mon employeur, c'est qui sur la fiche de paie ?",
      r: "La société de portage. C'est elle qui figure comme employeur, avec son SIRET et sa convention collective (IDCC 3219). Votre client n'apparaît nulle part sur le bulletin — la relation commerciale avec lui est portée par le contrat de prestation, pas par le contrat de travail. C'est cette structure tripartite qui vous donne le statut de salarié.",
    },
    {
      q: "Le net à payer est-il mon net imposable ?",
      r: "Non, ce sont deux lignes distinctes. Le net imposable réintègre des éléments non soumis à cotisations mais soumis à l'impôt (comme la part non déductible de la CSG), et sert de base au prélèvement à la source. Le net à payer est ce qui arrive sur votre compte, après retenue du PAS. Sur un bulletin de portage comme sur tout bulletin, net imposable > net à payer dès que votre taux de PAS est supérieur à zéro.",
    },
  ],
  sources: [
    { label: "Convention collective portage salarial (IDCC 3219)", href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/" },
    { label: "Code du travail — portage salarial (L1254-1 à L1254-31)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000030435227/" },
    { label: "service-public.fr — bulletin de paie", href: "https://www.service-public.fr/particuliers/vosdroits/F559" },
    { label: "URSSAF — cotisations sociales", href: "https://www.urssaf.fr" },
  ],
};

export const metadata: Metadata = {
  title: "Fiche de paie en portage salarial : la lire ligne à ligne (2026)",
  description: `Comprendre son bulletin de salaire en portage : d'où vient le brut, où sont les frais de gestion, ce qu'est la réserve financière. Exemple calculé complet à ${TJM} € de TJM.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Fiche de paie en portage salarial : la lire ligne à ligne",
    description: "Chaque ligne du bulletin expliquée, avec un exemple calculé complet.",
    url: `/guides/${meta.slug}`,
  },
};

const lignesBulletin = [
  { l: "Salaire de base", v: EUR.format(r.salaireBrut), note: "Résultat du calcul : CA moins frais de gestion moins charges patronales. C'est ce brut qui sert de référence à vos droits — allocation chômage et retraite se calculent sur lui." },
  { l: "Cotisations salariales", v: `− ${EUR.format(r.chargesSalariales)}`, note: `Environ ${Math.round(PORTAGE_2026.CHARGES_SALARIALES_TAUX * 100)} % du brut : vieillesse, retraite complémentaire, CSG-CRDS, prévoyance.` },
  { l: "Net avant impôt", v: EUR.format(r.salaireNetAvantImpot), note: "Ce qui reste après cotisations — le montant à comparer à une offre en CDI, et celui que regarde un banquier." },
  { l: "Prélèvement à la source", v: "selon votre taux", note: "Appliqué sur le net imposable, à votre taux personnalisé transmis par l'administration." },
];

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="difference" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          La différence avec un bulletin classique
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Sur un bulletin de salarié classique, tout part d&apos;un{" "}
            <strong>brut contractuel</strong> fixé à l&apos;embauche. Sur un
            bulletin de portage, tout part de votre{" "}
            <strong>facturation du mois</strong> : la société de portage encaisse
            votre chiffre d&apos;affaires sur un compte d&apos;activité, prélève
            ses frais de gestion, puis transforme le solde en salaire — en
            provisionnant d&apos;abord les charges patronales.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Concrètement, pour {EUR.format(r.caHT)} facturés dans le mois
            ({TJM} € × {JOURS} jours), le bulletin affichera un brut
            d&apos;environ <strong>{EUR.format(r.salaireBrut)}</strong> — jamais{" "}
            {EUR.format(r.caHT)}. Les {EUR.format(r.caHT - r.salaireBrut)}{" "}
            d&apos;écart sont les frais de gestion ({FRAIS} %) et les charges
            patronales (~{Math.round(PORTAGE_2026.CHARGES_PATRONALES_TAUX * 100)} %),
            prélevés avant même la première ligne du bulletin.
          </p>
          <div className="mt-6 rounded-r-lg border-l-4 border-primary bg-muted p-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground">Deux documents, pas un.</strong>{" "}
              Le bulletin de paie raconte la partie salariale. Le{" "}
              <strong>relevé de compte d&apos;activité</strong> — que la société
              doit vous fournir — raconte la partie amont : encaissements,
              frais de gestion, provisions, réserve. Pour vérifier qu&apos;on ne
              vous prélève rien d&apos;indu, c&apos;est ce second document
              qu&apos;il faut lire.
            </p>
          </div>
        </div>
      </section>

      <section id="lignes" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Le bulletin, ligne à ligne
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Exemple calculé par notre simulateur : TJM {TJM} €, {JOURS} jours
          facturés, {FRAIS} % de frais de gestion, statut senior.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[38rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Ligne du bulletin</th>
                <th className="px-5 py-4 text-right">Montant</th>
                <th className="px-5 py-4">Ce qu&apos;elle signifie</th>
              </tr>
            </thead>
            <tbody>
              {lignesBulletin.map((x) => (
                <tr key={x.l} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{x.l}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right font-bold tabular-nums">{x.v}</td>
                  <td className="px-5 py-3 text-foreground/80">{x.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          S&apos;y ajoutent selon votre contrat : l&apos;indemnité de congés
          payés — versée ou provisionnée, voir notre{" "}
          <Link href="/guides/conges-payes-portage-salarial" className="text-primary underline-offset-4 hover:underline">
            guide dédié
          </Link>{" "}
          —, la prime d&apos;apport d&apos;affaires (5 % du salaire de base,
          prévue par la convention collective), et le remboursement des frais
          professionnels refacturables, qui apparaît hors cotisations.
        </p>
      </section>

      <section id="controles" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Les quatre points à contrôler chaque mois
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">1. Le salaire minimum conventionnel</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              La convention impose un brut plancher indexé sur le plafond de la
              Sécurité sociale : {EUR.format(salaireMinimumMensuel("junior"))} pour
              un junior, {EUR.format(minSenior)} pour un senior,{" "}
              {EUR.format(salaireMinimumMensuel("forfait_jours"))} en forfait
              jours. Un brut durablement sous ce seuil est une anomalie à
              signaler.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">2. La cohérence CA → brut</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Recalculez : (CA − frais de gestion) ÷ (1 + taux patronal) ≈ brut.
              Sur notre exemple : ({EUR.format(r.caHT)} − {EUR.format(r.fraisGestion)})
              ÷ 1,43 ≈ {EUR.format(r.salaireBrut)}. Un écart inexpliqué signifie
              des prélèvements non annoncés — mutuelle, prévoyance renforcée,
              taxes — à retrouver sur le compte d&apos;activité.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">3. Les frais refacturables</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Ils doivent être remboursés <strong>hors cotisations</strong>, en
              bas de bulletin. Des frais refacturables passés dans le brut vous
              font payer des charges sur un remboursement — c&apos;est de
              l&apos;argent perdu.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">4. Le taux de PAS appliqué</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Vérifiez qu&apos;il correspond à celui de votre espace
              impots.gouv.fr. En début de contrat, la société applique parfois le
              taux neutre, moins favorable pour la trésorerie si vos revenus
              sont modestes. Notre{" "}
              <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">
                simulateur net après impôt
              </Link>{" "}
              permet de comparer les deux.
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <p className="text-base text-foreground/80">
            Pour vérifier votre propre bulletin avec vos paramètres exacts :
          </p>
          <Link href="/simulateurs/portage-salarial" className="mt-3 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
            Recalculer mon bulletin →
          </Link>
        </div>
      </section>
    </GuideShell>
  );
}
