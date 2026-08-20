import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import BarChart, { type BarDatum } from "@/components/charts/BarChart";
import { IconBadge, CalculatorIcon, PercentIcon, InfoIcon } from "@/components/icons";
import { PORTAGE_2026, calculerPortage } from "@/lib/calculators/portage";

// Tous les montants de cette page sortent de calculerPortage(). Paramètres du
// cas type documentés ici pour être reproductibles dans le simulateur.
const JOURS = 18;
const FRAIS_GESTION = 8;

const simuler = (tjm: number, jours = JOURS, frais = FRAIS_GESTION) =>
  calculerPortage({
    tjm,
    joursTravailles: jours,
    tauxFraisGestion: frais,
    fraisProRefacturables: 0,
    fraisProNonRefacturables: 0,
    statut: "senior",
    tauxPAS: 0,
  });

const TJMS = [300, 400, 500, 600, 700, 800];
const lignes = TJMS.map((tjm) => ({ tjm, r: simuler(tjm) }));
const ref = simuler(500);

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const tauxRestitution = Math.round((ref.salaireNetAvantImpot / ref.caHT) * 100);

const cascade: BarDatum[] = [
  { label: "CA HT mensuel facturé", hint: `500 € × ${JOURS} jours`, value: Math.round(ref.caHT) },
  { label: `− Frais de gestion (${FRAIS_GESTION} %)`, value: Math.round(ref.caHT - ref.fraisGestion) },
  { label: `− Charges patronales (${Math.round(PORTAGE_2026.CHARGES_PATRONALES_TAUX * 100)} %)`, value: Math.round(ref.salaireBrut) },
  { label: `− Charges salariales (${Math.round(PORTAGE_2026.CHARGES_SALARIALES_TAUX * 100)} %) = net avant impôt`, value: Math.round(ref.salaireNetAvantImpot), highlight: true },
];

const meta: GuideMeta = {
  slug: "simulation-tjm-portage-salarial",
  titre: "Simulation TJM en portage salarial",
  sousTitre: `De 300 à 800 € par jour : le net réel, calculé`,
  chapo: `Une simulation de portage sérieuse ne se résume pas à « environ 50 % du CA ». Le net dépend du TJM, du nombre de jours facturés, des frais de gestion et des frais professionnels. Voici les résultats calculés pour six niveaux de TJM, la mécanique complète, et les trois paramètres qui changent vraiment le résultat.`,
  filAriane: "Simulation TJM portage",
  datePublished: "2026-08-19",
  dateModified: "2026-08-19",
  tocItems: [
    { id: "tableau", label: "Net par TJM" },
    { id: "mecanique", label: "La mécanique" },
    { id: "parametres", label: "Les 3 paramètres clés" },
    { id: "simuler", label: "Simuler votre cas" },
  ],
  faq: [
    {
      q: "Quel pourcentage de mon TJM vais-je toucher en net ?",
      r: `Avec des frais de gestion de ${FRAIS_GESTION} % et les taux de charges moyens 2026, le net avant impôt représente environ ${tauxRestitution} % du chiffre d'affaires facturé. Sur un TJM de 500 € à ${JOURS} jours par mois, cela donne ${EUR.format(ref.salaireNetAvantImpot)} nets mensuels pour ${EUR.format(ref.caHT)} facturés. Ce taux varie de quelques points selon la société de portage et vos frais professionnels.`,
    },
    {
      q: "Pourquoi les simulateurs des sociétés de portage donnent-ils des résultats différents ?",
      r: "Trois raisons principales : les frais de gestion diffèrent (de 4 à 10 % selon la société, parfois plafonnés), certains simulateurs intègrent des optimisations par défaut (frais professionnels, épargne salariale, chèques cadeau) qui gonflent le résultat affiché, et les taux de charges retenus varient légèrement. Comparez toujours à paramètres identiques — c'est précisément ce que fait notre simulateur en affichant 9 sociétés sur les mêmes entrées.",
    },
    {
      q: "Quel TJM minimum pour que le portage soit viable ?",
      r: `En dessous de 250 € par jour, le portage est rarement pertinent : la convention collective impose un salaire minimum d'environ ${EUR.format(PORTAGE_2026.PASS_MENSUEL * PORTAGE_2026.SALAIRE_MIN_JUNIOR_RATIO)} bruts mensuels pour un junior (70 % du plafond de la Sécurité sociale), et un TJM trop bas ne permet pas de l'atteindre à temps plein. Notre simulateur affiche une alerte dans ce cas et suggère le régime micro-entrepreneur, moins chargé.`,
    },
    {
      q: "Le nombre de jours travaillés change-t-il le taux de restitution ?",
      r: "Non : frais de gestion et charges étant proportionnels, le pourcentage restitué reste le même. En revanche, le nombre de jours change le montant absolu — et c'est lui qui détermine si vous atteignez le salaire minimum conventionnel. Passer de 18 à 15 jours facturés réduit le net d'un sixième, ce qui suffit à faire basculer un TJM limite sous le seuil.",
    },
    {
      q: "Faut-il simuler avec ou sans frais professionnels ?",
      r: "Avec, si vous en avez : les frais professionnels non refacturables sont déduits du chiffre d'affaires avant le calcul des charges, ce qui les rend « moins chers » qu'un achat sur salaire net. Une simulation sans frais donne le scénario plancher ; ajoutez vos frais réels pour le scénario réaliste. Les deux champs existent dans notre simulateur.",
    },
  ],
  sources: [
    { label: "URSSAF — cotisations sociales", href: "https://www.urssaf.fr" },
    { label: "Convention collective portage salarial (IDCC 3219)", href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/" },
    { label: "Code du travail — articles L1254-1 à L1254-31 (portage)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000030435227/" },
    { label: "PEPS — syndicat professionnel du portage", href: "https://www.peps-syndicat.fr" },
  ],
};

export const metadata: Metadata = {
  title: "Simulation TJM portage salarial 2026 : le net de 300 à 800 €/jour",
  description: `Simulation complète du portage salarial par TJM : à 500 €/jour sur ${JOURS} jours, ${EUR.format(ref.salaireNetAvantImpot)} nets avant impôt. Tableau de 300 à 800 €, mécanique de calcul et paramètres qui changent le résultat.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Simulation TJM portage salarial 2026 : le net de 300 à 800 €/jour",
    description: `Le net réel calculé pour six niveaux de TJM, avec les taux 2026.`,
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="tableau" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Le net par TJM, de 300 à 800 €
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Hypothèses : {JOURS} jours facturés par mois, {FRAIS_GESTION} % de
          frais de gestion — la valeur médiane du marché —, statut senior, sans
          frais professionnels. Chaque ligne sort de notre simulateur, pas
          d&apos;une règle de trois.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">TJM</th>
                <th className="px-5 py-4 text-right">CA mensuel HT</th>
                <th className="px-5 py-4 text-right">Salaire brut</th>
                <th className="px-5 py-4 text-right">Net avant impôt</th>
                <th className="px-5 py-4 text-right">Net annuel</th>
              </tr>
            </thead>
            <tbody>
              {lignes.map(({ tjm, r }) => (
                <tr key={tjm} className={`border-b border-border last:border-b-0 ${tjm === 500 ? "bg-accent/5" : ""}`}>
                  <td className={`px-5 py-3 font-semibold text-foreground ${tjm === 500 ? "border-l-4 border-accent" : ""}`}>{tjm} €</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(r.caHT)}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(r.salaireBrut)}</td>
                  <td className="px-5 py-3 text-right text-lg font-bold tabular-nums">{EUR.format(r.salaireNetAvantImpot)}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(r.salaireNetAvantImpot * 12)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Nets avant impôt sur le revenu. La ligne 500 € sert de référence aux
          exemples de ce guide.
        </p>
      </section>

      <section id="mecanique" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          D&apos;où viennent ces chiffres
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le calcul suit quatre étapes, toujours dans le même ordre. La cascade
          ci-dessous les montre pour un TJM de 500 € :
        </p>
        <div className="mt-6">
          <BarChart
            caption={`Du CA au net — TJM 500 €, ${JOURS} jours/mois, frais ${FRAIS_GESTION} %`}
            data={cascade}
            footnote={`Le net avant impôt représente ${tauxRestitution} % du CA facturé. Les taux de charges (${Math.round(PORTAGE_2026.CHARGES_PATRONALES_TAUX * 100)} % patronales, ${Math.round(PORTAGE_2026.CHARGES_SALARIALES_TAUX * 100)} % salariales) sont des moyennes 2026 observées sur le marché, pas des barèmes officiels exhaustifs.`}
          />
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Deux points échappent souvent aux simulations rapides : les charges
          patronales s&apos;appliquent <strong>après</strong> déduction des
          frais de gestion, et les charges salariales s&apos;appliquent au brut
          résultant — les pourcentages se composent, ils ne s&apos;additionnent
          pas. C&apos;est pourquoi « 8 % + 43 % + 22 % » ne donne pas 73 % de
          prélèvements mais environ {100 - tauxRestitution} %.
        </p>
      </section>

      <section id="parametres" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Les trois paramètres qui changent vraiment le résultat
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Les frais de gestion</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              De 4 à 10 % selon la société. À TJM 500 €, passer de{" "}
              {FRAIS_GESTION} % à 4 % ajoute{" "}
              {EUR.format(simuler(500, JOURS, 4).salaireNetAvantImpot - ref.salaireNetAvantImpot)}{" "}
              nets par mois. Notre{" "}
              <Link href="/comparateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
                comparatif des sociétés
              </Link>{" "}
              recense les taux publiés.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Les jours facturés</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              La variable la plus sous-estimée. À 500 € de TJM, 15 jours au lieu
              de {JOURS} font tomber le net de {EUR.format(ref.salaireNetAvantImpot)} à{" "}
              {EUR.format(simuler(500, 15).salaireNetAvantImpot)}. Congés,
              intermissions et prospection ne se facturent pas.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Les frais professionnels</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Déduits avant charges, ils coûtent moins cher que payés sur le
              net. Le détail — refacturables ou non, et la TVA — est traité dans
              notre{" "}
              <Link href="/guides/frais-professionnels-portage-salarial" className="text-primary underline-offset-4 hover:underline">
                guide des frais professionnels
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="simuler" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Simuler votre cas exact
        </h2>
        <div className="mt-4 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
          <p className="max-w-3xl text-base leading-relaxed text-foreground/80">
            Les tableaux de ce guide couvrent les cas types. Pour votre
            situation — votre TJM, vos jours réels, vos frais, votre taux de
            prélèvement à la source — le simulateur donne le résultat en direct
            et compare 9 sociétés de portage sur vos propres paramètres.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/simulateurs/portage-salarial" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
              Ouvrir le simulateur portage →
            </Link>
            <Link href="/simulateurs/tjm-freelance" className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary">
              Comparer avec les autres statuts
            </Link>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}
