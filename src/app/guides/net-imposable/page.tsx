import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalculatorIcon, ReceiptIcon, InfoIcon, ScaleIcon } from "@/components/icons";
import { calculerBrutVersNet } from "@/lib/calculators/salaire-brut-net";

const BRUT = 2_500;
const r = calculerBrutVersNet({
  salaire: BRUT,
  mode: "brut-vers-net",
  periodicite: "mensuel",
  statut: "non-cadre",
  tauxPAS: 0,
});
// La CSG non déductible et la CRDS se réintègrent dans le net imposable :
// elles sont prélevées sur le salaire mais restent imposables.
const NON_DEDUCTIBLE = r.cotisations.csgNonDeductible + r.cotisations.crds;
const NET_IMPOSABLE = r.netAvantImpotMensuel + NON_DEDUCTIBLE;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const meta: GuideMeta = {
  slug: "net-imposable",
  titre: "Net imposable : pourquoi il est plus élevé que ce que vous touchez",
  sousTitre: `Sur ${EUR.format(BRUT)} bruts, le net imposable dépasse le net à payer d'environ ${EUR2.format(NON_DEDUCTIBLE)} par mois`,
  chapo: `C'est la ligne du bulletin de paie qui déclenche le plus de messages aux services RH : « pourquoi je déclare plus que ce que j'ai reçu ? ». La réponse tient à une particularité française — une partie de la CSG et la totalité de la CRDS sont prélevées sur votre salaire mais restent imposables. Le net imposable est donc structurellement supérieur au net versé. Voici le mécanisme, chiffré, et ce qui s'y ajoute encore.`,
  filAriane: "Net imposable",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "definition", label: "Trois nets, pas un" },
    { id: "csg", label: "La CSG non déductible" },
    { id: "ajouts", label: "Ce qui s'ajoute encore" },
    { id: "verifier", label: "Vérifier sa déclaration" },
  ],
  faq: [
    {
      q: "Pourquoi le net imposable est-il supérieur au net à payer ?",
      r: `Parce qu'une partie des prélèvements sociaux n'est pas déductible du revenu imposable. Sur les 9,70 % de CSG-CRDS prélevés sur votre salaire, seuls 6,80 points sont déductibles : les 2,40 points de CSG non déductible et les 0,50 point de CRDS sont retirés de votre paie mais réintégrés dans l'assiette de l'impôt. Sur ${EUR.format(BRUT)} bruts, cela représente environ ${EUR2.format(NON_DEDUCTIBLE)} par mois d'écart, soit près de ${EUR.format(NON_DEDUCTIBLE * 12)} sur l'année que vous déclarez sans les avoir touchés.`,
    },
    {
      q: "Quelle différence entre net à payer, net imposable et net social ?",
      r: "Trois notions distinctes sur le même bulletin. Le net à payer est ce qui arrive sur votre compte, après prélèvement à la source. Le net imposable sert de base au calcul de l'impôt : c'est le montant pré-rempli dans votre déclaration, et il est plus élevé. Le montant net social, obligatoire sur les bulletins depuis 2023, est encore une autre base : il sert au calcul des prestations sociales comme le RSA et la prime d'activité, et n'a pas la même définition que le net imposable. Aucun des trois ne se déduit simplement des autres.",
    },
    {
      q: "Les tickets-restaurant et la mutuelle changent-ils le net imposable ?",
      r: "Oui, dans deux sens opposés. La part patronale des titres-restaurant, exonérée dans la limite du plafond, ne s'ajoute pas au net imposable — c'est un avantage net d'impôt. En revanche, la part patronale de la mutuelle complémentaire santé obligatoire est réintégrée dans le net imposable depuis 2013 : votre employeur la paie, vous ne la touchez pas, mais vous êtes imposé dessus. C'est la deuxième cause d'écart après la CSG non déductible.",
    },
    {
      q: "Mon net imposable annuel doit-il correspondre à ma déclaration pré-remplie ?",
      r: "Oui, et c'est le contrôle à faire chaque printemps. Le cumul de net imposable figurant sur votre bulletin de décembre doit correspondre au montant pré-rempli en case 1AJ de votre déclaration. Un écart signale soit une erreur de l'employeur dans la déclaration sociale nominative, soit un revenu d'un autre employeur, soit un élément particulier (indemnités journalières, heures supplémentaires exonérées déclarées à part). Ne corrigez jamais sans avoir identifié la cause : la déclaration pré-remplie fait foi pour l'administration.",
    },
    {
      q: "Les heures supplémentaires figurent-elles dans le net imposable ?",
      r: "Elles apparaissent sur une ligne distincte. La rémunération des heures supplémentaires est exonérée d'impôt sur le revenu dans la limite de 7 500 € par an : elle est donc exclue du net imposable classique et pré-remplie dans une case spécifique de la déclaration. Elle reste en revanche intégrée au revenu fiscal de référence, qui sert à déterminer votre éligibilité à certaines aides et le taux de CSG applicable à vos revenus de remplacement.",
    },
  ],
  sources: [
    { label: "service-public.fr — bulletin de paie : mentions obligatoires", href: "https://www.service-public.fr/particuliers/vosdroits/F559" },
    { label: "URSSAF — CSG et CRDS sur les revenus d'activité", href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html" },
    { label: "impots.gouv.fr — les salaires à déclarer", href: "https://www.impots.gouv.fr/particulier/les-salaires" },
    { label: "service-public.fr — le montant net social", href: "https://www.service-public.fr/particuliers/actualites/A16599" },
  ],
};

export const metadata: Metadata = {
  title: `Net imposable : pourquoi il dépasse votre net à payer (calcul 2026)`,
  description: `Le net imposable est supérieur au net versé parce que la CSG non déductible (2,40 %) et la CRDS (0,50 %) sont prélevées sans être déductibles. Sur ${EUR.format(BRUT)} bruts, l'écart atteint ${EUR2.format(NON_DEDUCTIBLE)} par mois. Différence avec le net social, effet de la mutuelle et contrôle de la déclaration.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Net imposable : pourquoi il est plus élevé que ce que vous touchez",
    description: "Le mécanisme de la CSG non déductible, chiffré, et les trois « nets » du bulletin.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="definition" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Trois « nets » sur le même bulletin
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { t: "Net à payer", d: "Ce qui arrive sur votre compte, après prélèvement à la source. Le seul montant que vous voyez vraiment.", c: "accent" },
            { t: "Net imposable", d: "La base de calcul de l'impôt, pré-remplie dans votre déclaration. Toujours supérieur au net à payer.", c: "primary" },
            { t: "Montant net social", d: "Obligatoire depuis 2023, il sert au calcul du RSA et de la prime d'activité. Encore une autre définition.", c: "muted" },
          ].map((x) => (
            <div key={x.t} className={`rounded-2xl border p-6 shadow-md ${x.c === "accent" ? "border-accent bg-accent/5" : "border-border bg-white"}`}>
              <p className="font-semibold text-foreground">{x.t}</p>
              <p className="mt-2 text-base leading-relaxed text-foreground/80">{x.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Ces trois montants coexistent sur votre bulletin sans qu&apos;aucun ne
          se déduise simplement des autres. Le plus déroutant est le net
          imposable : il est <strong>supérieur</strong> à ce que vous touchez,
          ce qui donne l&apos;impression de déclarer de l&apos;argent jamais
          perçu. C&apos;est exact — et parfaitement légal.
        </p>
      </section>

      <section id="csg" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          La cause principale : la CSG non déductible
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La CSG-CRDS prélevée sur votre salaire représente 9,70 %, appliqués
            sur 98,25 % du brut. Mais elle se scinde en deux parts au regard de
            l&apos;impôt : <strong>6,80 points sont déductibles</strong> du
            revenu imposable, tandis que <strong>2,40 points de CSG et 0,50
            point de CRDS ne le sont pas</strong>. Ces derniers sont retirés de
            votre paie <em>et</em> réintégrés dans l&apos;assiette de
            l&apos;impôt.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <tbody>
                {[
                  ["Salaire brut", EUR.format(r.brutMensuel), null],
                  ["Total des cotisations salariales", `− ${EUR2.format(r.totalCotisationsSalariales)}`, "destructive"],
                  ["Net avant impôt (ce que vous touchez, avant PAS)", EUR2.format(r.netAvantImpotMensuel), "fort"],
                  ["+ CSG non déductible et CRDS", `+ ${EUR2.format(NON_DEDUCTIBLE)}`, "primary"],
                ].map(([l, v, style]) => (
                  <tr key={l as string} className="border-b border-border">
                    <td className="px-5 py-3 text-foreground/80">{l}</td>
                    <td className={`px-5 py-3 text-right tabular-nums ${style === "destructive" ? "text-destructive" : style === "primary" ? "font-semibold text-primary" : style === "fort" ? "font-semibold text-foreground" : "font-semibold text-foreground"}`}>{v}</td>
                  </tr>
                ))}
                <tr className="bg-accent/5">
                  <td className="border-l-4 border-accent px-5 py-3 font-semibold text-foreground">Net imposable</td>
                  <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-accent">{EUR2.format(NET_IMPOSABLE)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Sur {EUR.format(BRUT)} bruts, l&apos;écart atteint{" "}
            <strong>{EUR2.format(NON_DEDUCTIBLE)} par mois</strong>, soit
            environ {EUR.format(NON_DEDUCTIBLE * 12)} sur l&apos;année. Vous
            déclarez donc chaque année un peu plus que ce que votre compte
            bancaire a vu passer. Le détail de chaque cotisation est expliqué
            dans notre{" "}
            <Link href="/guides/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
              guide du salaire brut et net
            </Link>
            , et le{" "}
            <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
              simulateur
            </Link>{" "}
            les calcule sur votre propre salaire.
          </p>
        </div>
      </section>

      <section id="ajouts" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Ce qui s&apos;ajoute encore au net imposable
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>La part patronale de la mutuelle</strong> : depuis 2013, la cotisation santé payée par l&apos;employeur est réintégrée dans votre net imposable. Vous ne la touchez pas, vous êtes imposé dessus. C&apos;est la deuxième cause d&apos;écart, et elle pèse davantage dans les entreprises généreuses sur la complémentaire.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Les avantages en nature</strong> : voiture de fonction à usage privé, logement, repas fournis. Ils sont évalués forfaitairement ou au réel et s&apos;ajoutent au net imposable.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Ce qui, à l&apos;inverse, n&apos;y entre pas</strong> : la part patronale des <Link href="/guides/titres-restaurant" className="text-primary underline-offset-4 hover:underline">titres-restaurant</Link> dans la limite du plafond, les remboursements de frais professionnels réels, et la rémunération des <Link href="/guides/heures-supplementaires" className="text-primary underline-offset-4 hover:underline">heures supplémentaires</Link> jusqu&apos;à 7 500 € par an — pré-remplie dans une case distincte.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Les indemnités journalières</strong> de maladie ordinaire sont imposables et s&apos;ajoutent à votre déclaration, souvent via une ligne distincte — un détail qui surprend l&apos;année suivant un arrêt long, comme expliqué dans notre <Link href="/guides/arret-maladie-salaire" className="text-primary underline-offset-4 hover:underline">guide sur l&apos;arrêt maladie</Link>.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="verifier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Le contrôle à faire chaque printemps
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Votre bulletin de <strong>décembre</strong> affiche un cumul annuel
            de net imposable. Ce montant doit correspondre à ce qui est
            pré-rempli en case 1AJ de votre déclaration de revenus. Trois
            minutes de vérification qui évitent des mois de réclamation.
          </p>
          <ul className="mt-5 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>Les montants concordent</strong> : rien à faire, validez.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>Le pré-rempli est plus élevé</strong> : cherchez un second employeur, des indemnités journalières, une indemnité de rupture, ou du chômage perçu dans l&apos;année.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span><strong>Le pré-rempli est plus faible ou aberrant</strong> : c&apos;est probablement une erreur de déclaration sociale nominative côté employeur. Demandez-lui une correction avant de modifier votre déclaration — c&apos;est lui qui doit rectifier à la source.</span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            Une fois le net imposable établi, c&apos;est lui qui alimente le
            barème et détermine votre impôt puis votre taux de prélèvement à la
            source. Notre{" "}
            <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">
              simulateur net après impôt
            </Link>{" "}
            fait le trajet complet, et notre guide du{" "}
            <Link href="/guides/bareme-impot-2027" className="text-primary underline-offset-4 hover:underline">
              barème de l&apos;impôt
            </Link>{" "}
            explique comment les tranches s&apos;y appliquent.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
