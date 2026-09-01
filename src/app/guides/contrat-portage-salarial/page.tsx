import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, FileTextIcon, ScaleIcon, CalendarIcon, AlertTriangleIcon } from "@/components/icons";
import { salaireMinimumMensuel } from "@/lib/calculators/portage";

const MIN_JUNIOR = salaireMinimumMensuel("junior");
const MIN_SENIOR = salaireMinimumMensuel("senior");
const MIN_FORFAIT = salaireMinimumMensuel("forfait_jours");
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "contrat-portage-salarial",
  titre: "Contrat de portage salarial : CDI ou CDD, ce que vous signez vraiment",
  sousTitre: "Deux contrats, pas un — et des mentions obligatoires qui protègent le porté",
  chapo: "Le portage salarial repose sur une relation à trois, formalisée par deux contrats distincts : un contrat de travail entre vous et la société de portage, et un contrat commercial de prestation entre elle et votre client. Le premier peut être un CDI ou un CDD dit « de mission », avec des règles très différentes. Voici ce que chacun contient, les mentions que la loi impose, et les clauses à lire avant de signer.",
  filAriane: "Contrat de portage",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "deux", label: "Deux contrats distincts" },
    { id: "cdi-cdd", label: "CDI ou CDD de mission" },
    { id: "mentions", label: "Les mentions obligatoires" },
    { id: "rompre", label: "Rompre le contrat" },
  ],
  faq: [
    {
      q: "Quelle est la différence entre CDI et CDD en portage salarial ?",
      r: "Le CDD de portage est conclu pour la durée d'une mission, avec un terme précis ou une durée minimale, et ne peut excéder 18 mois renouvellements compris. Il ouvre droit à une indemnité de fin de contrat d'au moins 10 % de la rémunération totale — l'équivalent de la prime de précarité. Le CDI de portage, lui, est à durée indéterminée et englobe les périodes d'intermission, qui ne sont pas rémunérées mais durant lesquelles le contrat subsiste : vous restez salarié, vous conservez votre ancienneté et votre couverture, et une réserve financière (généralement 10 % du salaire de base) est constituée pour lisser ces périodes.",
    },
    {
      q: "Quel salaire minimum le contrat doit-il garantir ?",
      r: `La convention collective du portage salarial (IDCC 3219) fixe des rémunérations minimales indexées sur le plafond de la Sécurité sociale : ${EUR.format(MIN_JUNIOR)} par mois pour un consultant junior (70 % du plafond), ${EUR.format(MIN_SENIOR)} pour un senior (75 %) et ${EUR.format(MIN_FORFAIT)} en forfait jours (85 %), valeurs 2026. Si votre chiffre d'affaires ne permet pas d'atteindre ce minimum, la société de portage ne peut légalement pas vous salarier sur cette base — c'est le vrai plancher d'entrée dans le portage, et notre simulateur vous alerte dès que le brut calculé passe en dessous.`,
    },
    {
      q: "Quelles mentions le contrat de travail doit-il obligatoirement contenir ?",
      r: "Le Code du travail en dresse la liste (art. L1254-14 et suivants) : l'identité et la qualification du salarié porté, les modalités de calcul et de versement de la rémunération, de l'indemnité d'apport d'affaires et des frais de gestion, la périodicité du compte d'activité, l'identité de l'assureur en responsabilité civile professionnelle et l'étendue de la garantie, les modalités de déduction des frais professionnels. L'absence de ces mentions est un motif classique de contestation devant le conseil de prud'hommes.",
    },
    {
      q: "Qu'est-ce que le contrat de prestation avec le client ?",
      r: "C'est le second contrat, commercial celui-là, conclu entre la société de portage et votre client — vous n'en êtes pas signataire, bien que vous ayez négocié la mission. Il doit être établi au plus tard dans les deux jours ouvrables suivant le début de la prestation et contenir l'identité du salarié porté, le descriptif de la mission, sa durée, le prix convenu et les conditions d'exécution. C'est lui qui fonde la facturation : sans contrat de prestation valide, pas de facture, donc pas de salaire.",
    },
    {
      q: "Y a-t-il une période d'essai en portage salarial ?",
      r: "Oui, selon les règles de droit commun : jusqu'à 2 mois pour un employé, 3 mois pour un agent de maîtrise ou technicien, 4 mois pour un cadre, renouvelables une fois si un accord de branche le prévoit. En CDD de mission, elle est proportionnelle à la durée du contrat, dans les limites légales. Point pratique souvent ignoré : la période d'essai porte sur la relation avec la société de portage, pas sur la mission — l'interrompre ne met pas fin au contrat de prestation, qui suit ses propres règles.",
    },
  ],
  sources: [
    { label: "Code du travail, art. L1254-1 à L1254-31 — portage salarial (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000030435227/" },
    { label: "Convention collective du portage salarial, IDCC 3219 (Légifrance)", href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/" },
    { label: "service-public.fr — portage salarial", href: "https://entreprendre.service-public.fr/vosdroits/F31620" },
    { label: "Ministère du Travail — le portage salarial", href: "https://travail-emploi.gouv.fr/le-portage-salarial" },
  ],
};

export const metadata: Metadata = {
  title: "Contrat de portage salarial : CDI, CDD de mission et mentions obligatoires",
  description: `Le portage repose sur deux contrats : travail (CDI ou CDD de mission, 18 mois maximum) et prestation commerciale. Salaire minimum conventionnel de ${EUR.format(MIN_JUNIOR)} à ${EUR.format(MIN_FORFAIT)}, mentions imposées par le Code du travail, réserve financière et rupture.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Contrat de portage salarial : ce que vous signez vraiment",
    description: "CDI ou CDD de mission, mentions obligatoires, minima conventionnels et rupture.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="deux" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><FileTextIcon className="w-4 h-4" /></IconBadge>
          Deux contrats, deux logiques
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-accent bg-accent/5 p-6 shadow-md">
            <p className="font-semibold text-foreground">1. Le contrat de travail</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Entre <strong>vous et la société de portage</strong>. CDI ou CDD
              de mission. C&apos;est lui qui fait de vous un salarié : bulletin
              de paie, cotisations, couverture sociale, droits au chômage. Il
              fixe aussi le taux de frais de gestion et les modalités du compte
              d&apos;activité.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">2. Le contrat de prestation</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Entre <strong>la société de portage et votre client</strong>.
              Commercial, pas salarial — vous ne le signez pas, même si vous
              avez négocié la mission. Il doit être établi dans les deux jours
              ouvrables suivant le début de la prestation et fonde la
              facturation.
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Cette architecture à trois est ce qui distingue le portage de tous les
          autres statuts d&apos;indépendant : vous conservez l&apos;autonomie
          commerciale (vous trouvez et négociez vos missions) tout en étant
          juridiquement salarié. C&apos;est aussi ce qui explique le décalage
          entre ce que vous facturez et ce que vous touchez, détaillé dans notre{" "}
          <Link href="/guides/fiche-de-paie-portage-salarial" className="text-primary underline-offset-4 hover:underline">
            guide de la fiche de paie en portage
          </Link>
          .
        </p>
      </section>

      <section id="cdi-cdd" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          CDI ou CDD de mission : que choisir
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">&nbsp;</th>
                <th className="px-5 py-4">CDI de portage</th>
                <th className="px-5 py-4">CDD de mission</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Durée", "Indéterminée, couvre les intermissions", "Durée de la mission — 18 mois maximum, renouvellements compris"],
                ["Intermissions", "Le contrat subsiste, non rémunéré, ancienneté conservée", "Le contrat prend fin avec la mission"],
                ["Fin de contrat", "Rupture conventionnelle, démission ou licenciement", "Indemnité de fin de contrat d'au moins 10 % de la rémunération totale"],
                ["Réserve financière", "Généralement 10 % du salaire de base, pour lisser les creux", "Non applicable"],
                ["Adapté si", "Missions récurrentes, activité installée, besoin de continuité", "Mission unique ou ponctuelle, test du portage"],
              ].map(([k, cdi, cdd]) => (
                <tr key={k as string} className="border-b border-border align-top last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{k}</td>
                  <td className="px-5 py-3 text-foreground/80">{cdi}</td>
                  <td className="px-5 py-3 text-foreground/80">{cdd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          En pratique, la plupart des sociétés proposent le CDI par défaut aux
          consultants qui s&apos;installent, le CDD restant réservé aux missions
          isolées. Le CDI n&apos;engage pas davantage : il se rompt comme tout
          CDI, et son intérêt réel est la continuité — de l&apos;ancienneté, de
          la mutuelle, et des{" "}
          <Link href="/guides/portage-salarial-chomage" className="text-primary underline-offset-4 hover:underline">
            droits au chômage
          </Link>{" "}
          entre deux clients.
        </p>
      </section>

      <section id="mentions" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Les mentions que la loi impose — et qu&apos;il faut vérifier
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            {[
              ["Le calcul de la rémunération", "modalités de calcul et de versement du salaire, de l'indemnité d'apport d'affaires et des primes éventuelles."],
              ["Le taux de frais de gestion", "et son assiette exacte. C'est le seul paramètre que vous négociez vraiment — notre comparateur montre l'écart réel entre 4 % et 10 %."],
              ["Le compte d'activité", "sa périodicité et son contenu : c'est le document qui retrace CA encaissé, frais prélevés, réserve constituée. Distinct du bulletin de paie."],
              ["La responsabilité civile professionnelle", "identité de l'assureur et étendue de la garantie. La société doit vous couvrir : vérifiez le plafond et les activités couvertes."],
              ["Les frais professionnels", "modalités de déduction, distinction entre refacturables au client et non refacturables — l'arbitrage est détaillé dans notre guide dédié."],
              ["La qualification et l'expertise", "elles déterminent votre minimum conventionnel : junior, senior ou forfait jours."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden className="text-primary">→</span>
                <span><strong>{t}</strong> — {d}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-r-lg border-l-4 border-primary bg-muted p-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground">Le minimum conventionnel est un plancher légal</strong>, pas une
              recommandation : {EUR.format(MIN_JUNIOR)} pour un junior,{" "}
              {EUR.format(MIN_SENIOR)} pour un senior, {EUR.format(MIN_FORFAIT)}{" "}
              en forfait jours (valeurs 2026, indexées sur le plafond de la
              Sécurité sociale). Une société qui vous propose un contrat sous ce
              seuil est en infraction — et le montant évoluera au 1er janvier
              avec le{" "}
              <Link href="/guides/plafond-securite-sociale-2027" className="underline underline-offset-4">
                nouveau plafond
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="rompre" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Rompre le contrat : ce qui vous revient
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le contrat de travail en portage se rompt comme n&apos;importe quel
            contrat de travail : démission avec préavis, rupture
            conventionnelle, licenciement, ou arrivée du terme pour un CDD. Rien
            ne vous attache durablement à une société de portage — changer est
            courant, et le bon moment se situe entre deux missions.
          </p>
          <ul className="mt-5 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Le solde du compte d&apos;activité vous revient</strong> : chiffre d&apos;affaires encaissé et non encore versé, réserve financière constituée. Demandez-en le détail écrit avant de partir.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>La rupture conventionnelle ouvre les droits au chômage</strong> et une indemnité au moins égale au minimum légal — le calcul complet est dans notre <Link href="/guides/indemnite-rupture-conventionnelle" className="text-primary underline-offset-4 hover:underline">guide dédié</Link>.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Changer en cours de mission est possible</strong> mais suppose de faire signer un nouveau contrat de prestation à votre client par la nouvelle société. Prévoyez deux à trois semaines de coordination.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Attention à la clause de non-sollicitation</strong> que certains contrats prévoient sur les clients apportés par la société. Elle est licite si elle est limitée dans le temps et l&apos;objet — lisez-la avant de signer, pas au moment de partir.</span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            Pour choisir la société avec laquelle signer, notre{" "}
            <Link href="/comparateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
              comparatif de dix sociétés
            </Link>{" "}
            détaille frais, services et label PEPS, et chaque fiche calcule le
            net que ses frais laissent réellement.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
