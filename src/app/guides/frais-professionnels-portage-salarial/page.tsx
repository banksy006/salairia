import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ReceiptIcon, ScaleIcon, PercentIcon } from "@/components/icons";
import { calculerPortage } from "@/lib/calculators/portage";

const base = {
  tjm: 500,
  joursTravailles: 18,
  tauxFraisGestion: 8,
  statut: "senior" as const,
  tauxPAS: 0,
};
const FRAIS = 300; // €/mois de frais professionnels dans les exemples

const sans = calculerPortage({ ...base, fraisProRefacturables: 0, fraisProNonRefacturables: 0 });
const refact = calculerPortage({ ...base, fraisProRefacturables: FRAIS, fraisProNonRefacturables: 0 });
const nonRefact = calculerPortage({ ...base, fraisProRefacturables: 0, fraisProNonRefacturables: FRAIS });

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
// Coût réel des frais non refacturables : perte de net par rapport au scénario sans frais
const perteNonRefact = sans.salaireNetAvantImpot - nonRefact.salaireNetAvantImpot;
const economie = FRAIS - perteNonRefact;

const meta: GuideMeta = {
  slug: "frais-professionnels-portage-salarial",
  titre: "Frais professionnels en portage salarial",
  sousTitre: `Refacturables ou non : ${FRAIS} € de frais ne coûtent que ${EUR.format(perteNonRefact)} de net`,
  chapo: `Le portage salarial permet de déduire ses frais professionnels — matériel, déplacements, logiciels — d'une façon que ni le salariat classique ni la micro-entreprise n'offrent. Encore faut-il distinguer deux régimes très différents : les frais refacturés au client, remboursés intégralement hors charges, et les frais non refacturables, déduits du chiffre d'affaires avant cotisations. Les deux mécanismes, chiffrés.`,
  filAriane: "Frais pro en portage",
  datePublished: "2026-08-19",
  dateModified: "2026-08-19",
  tocItems: [
    { id: "deux-regimes", label: "Les deux régimes" },
    { id: "chiffres", label: "L'impact chiffré" },
    { id: "tva", label: "Et la TVA ?" },
    { id: "limites", label: "Limites et justificatifs" },
  ],
  faq: [
    {
      q: "Quelle est la différence entre frais refacturables et non refacturables ?",
      r: "Les frais refacturables sont ceux que votre client accepte de rembourser en plus de vos honoraires — un déplacement chez lui, par exemple. Ils transitent par la facture, vous sont reversés intégralement et n'entrent ni dans le calcul des charges ni dans votre salaire brut. Les frais non refacturables sont vos dépenses d'activité que personne ne rembourse — ordinateur, téléphone, formation : ils sont déduits de votre chiffre d'affaires avant le calcul des cotisations, ce qui en réduit fortement le coût réel.",
    },
    {
      q: "Pourquoi dit-on qu'un achat en frais pro « coûte moins cher » ?",
      r: `Parce qu'il échappe aux cotisations. Un achat payé sur votre salaire net a déjà subi frais de gestion, charges patronales et salariales — il faut facturer environ 2 € pour disposer de 1 € net. Le même achat passé en frais non refacturables est prélevé sur le CA avant charges : ${FRAIS} € de frais ne réduisent votre net que de ${EUR.format(perteNonRefact)}. L'économie, ${EUR.format(economie)} par mois dans notre exemple, vient des cotisations évitées.`,
    },
    {
      q: "Y a-t-il un plafond aux frais professionnels en portage ?",
      r: "Les frais refacturés au client ne sont pas plafonnés — ils relèvent de votre négociation commerciale. Les frais non refacturables, eux, sont encadrés par les pratiques URSSAF et celles de la société de portage : la plupart limitent l'enveloppe à un pourcentage du salaire brut (souvent autour de 30 %), et exigent des dépenses réelles, justifiées et liées à l'activité. Au-delà, le risque de redressement pèse sur la société — c'est pourquoi elle contrôle.",
    },
    {
      q: "Puis-je passer mon loyer ou mon abonnement internet en frais ?",
      r: "Partiellement, si vous travaillez de chez vous : la quote-part professionnelle d'un abonnement ou d'un espace de travail à domicile est généralement admise, au prorata de l'usage. Chaque société de portage a sa charte de frais — certaines sont plus strictes que d'autres. Demandez la liste des frais admis avant de signer : c'est un critère de choix aussi réel que les frais de gestion.",
    },
    {
      q: "Les frais professionnels réduisent-ils mes droits (chômage, retraite) ?",
      r: "Oui, indirectement, pour les frais non refacturables : en réduisant le salaire brut, ils réduisent l'assiette de vos cotisations — donc le salaire de référence de votre ARE et vos points de retraite. C'est l'arbitrage à connaître : optimiser le net d'aujourd'hui contre les droits de demain. Les frais refacturés, eux, n'ont aucun impact puisqu'ils ne touchent pas le brut.",
    },
  ],
  sources: [
    { label: "URSSAF — frais professionnels", href: "https://www.urssaf.fr/accueil/employeur/cotisations/liste-cotisations/frais-professionnels.html" },
    { label: "Convention collective portage salarial (IDCC 3219)", href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/" },
    { label: "impots.gouv.fr — TVA", href: "https://www.impots.gouv.fr" },
  ],
};

export const metadata: Metadata = {
  title: "Frais professionnels en portage salarial : refacturables ou non (2026)",
  description: `Frais refacturés au client vs frais déduits du CA : deux mécanismes, deux effets sur le net. ${FRAIS} € de frais non refacturables ne coûtent que ${EUR.format(perteNonRefact)} de net réel — calculs détaillés.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Frais professionnels en portage : le mécanisme qui change le net",
    description: "Refacturables, non refacturables, TVA : les trois leviers chiffrés.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="deux-regimes" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Deux régimes, deux logiques
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Frais refacturables</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Remboursés par le client <strong>en plus</strong> de vos
              honoraires : déplacements sur site, hébergement en mission,
              matériel demandé par le client. Ils apparaissent sur la facture,
              vous reviennent à 100 % et ne supportent <strong>aucune
              charge</strong> — mais ils ne créent pas de revenu : c&apos;est un
              remboursement.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Frais non refacturables</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Vos dépenses d&apos;activité que personne ne rembourse :
              ordinateur, téléphone, logiciels, formation, prospection. Déduits
              du chiffre d&apos;affaires <strong>avant</strong> le calcul des
              charges, ils réduisent votre brut — mais bien moins que leur
              montant, puisque les cotisations évitées en absorbent une partie.
            </p>
          </div>
        </div>
      </section>

      <section id="chiffres" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          L&apos;impact chiffré : trois scénarios, mêmes 500 € de TJM
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Calculs de notre simulateur — TJM {base.tjm} €, {base.joursTravailles}{" "}
          jours, {base.tauxFraisGestion} % de frais de gestion, et {EUR.format(FRAIS)}{" "}
          de frais professionnels mensuels selon leur traitement :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Scénario</th>
                <th className="px-5 py-4 text-right">Salaire net</th>
                <th className="px-5 py-4 text-right">+ remboursement</th>
                <th className="px-5 py-4 text-right">Total perçu</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-5 py-3 font-semibold text-foreground">Sans frais professionnels</td>
                <td className="px-5 py-3 text-right tabular-nums">{EUR.format(sans.salaireNetAvantImpot)}</td>
                <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">—</td>
                <td className="px-5 py-3 text-right font-bold tabular-nums">{EUR.format(sans.totalPercu)}</td>
              </tr>
              <tr className="border-b border-border bg-accent/5">
                <td className="border-l-4 border-accent px-5 py-3 font-semibold text-foreground">
                  {EUR.format(FRAIS)} refacturés au client
                </td>
                <td className="px-5 py-3 text-right tabular-nums">{EUR.format(refact.salaireNetAvantImpot)}</td>
                <td className="px-5 py-3 text-right tabular-nums text-accent">+ {EUR.format(FRAIS)}</td>
                <td className="px-5 py-3 text-right font-bold tabular-nums">{EUR.format(refact.totalPercu)}</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-semibold text-foreground">
                  {EUR.format(FRAIS)} non refacturables
                </td>
                <td className="px-5 py-3 text-right tabular-nums">{EUR.format(nonRefact.salaireNetAvantImpot)}</td>
                <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">—</td>
                <td className="px-5 py-3 text-right font-bold tabular-nums">{EUR.format(nonRefact.totalPercu)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          La lecture importante est sur la dernière ligne :{" "}
          {EUR.format(FRAIS)} de dépenses ne font baisser le net que de{" "}
          <strong>{EUR.format(perteNonRefact)}</strong>. Les{" "}
          {EUR.format(economie)} de différence sont les cotisations que ces
          frais n&apos;ont pas supportées. Autrement dit, le même ordinateur
          coûte {EUR.format(perteNonRefact)} passé en frais pro… et{" "}
          {EUR.format(FRAIS)} payé sur votre net — sans compter qu&apos;il
          aurait fallu facturer environ le double pour générer ce net.
        </p>
      </section>

      <section id="tva" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Et la TVA sur les frais ?
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Point souvent ignoré : la société de portage est assujettie à la
            TVA. Elle facture vos prestations TTC, collecte la TVA — et peut{" "}
            <strong>récupérer la TVA sur vos frais professionnels</strong>{" "}
            lorsqu&apos;ils sont engagés au nom de la société et correctement
            justifiés. Sur un achat de matériel à 1 200 € TTC, ce sont 200 € de
            TVA récupérable qui ne pèsent ni sur vous ni sur votre compte
            d&apos;activité.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Les pratiques varient selon les sociétés : certaines créditent la
            TVA récupérée sur votre compte d&apos;activité, d&apos;autres
            l&apos;intègrent différemment. C&apos;est une question à poser
            explicitement avant de signer — au même titre que les{" "}
            <Link href="/guides/frais-gestion-portage-salarial" className="text-primary underline-offset-4 hover:underline">
              frais de gestion
            </Link>
            , elle fait partie du coût réel du contrat.
          </p>
        </div>
      </section>

      <section id="limites" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Limites, justificatifs et arbitrage
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Trois règles gouvernent les frais non refacturables : la dépense
            doit être <strong>réelle</strong> (facture à l&apos;appui),{" "}
            <strong>professionnelle</strong> (liée à l&apos;activité) et{" "}
            <strong>raisonnable</strong> (la plupart des sociétés plafonnent
            l&apos;enveloppe autour de 30 % du salaire brut). La société de
            portage contrôle, car c&apos;est elle qui porte le risque URSSAF en
            cas d&apos;abus.
          </p>
          <div className="mt-5 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
            <p className="text-sm leading-relaxed">
              L&apos;arbitrage à garder en tête : chaque euro passé en frais non
              refacturables réduit votre brut, donc l&apos;assiette de votre
              future ARE et de vos points retraite. Optimiser le net
              d&apos;aujourd&apos;hui se paie en droits de demain — notre{" "}
              <Link href="/guides/portage-salarial-chomage" className="underline underline-offset-4">
                guide portage et chômage
              </Link>{" "}
              chiffre ce que l&apos;allocation perd quand le brut baisse.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/simulateurs/portage-salarial" className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
              Simuler avec mes frais réels →
            </Link>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}
