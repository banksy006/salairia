import type { Metadata } from "next";
import { calculerPortage, salaireMinimumMensuel, SOCIETES_PORTAGE } from "@/lib/calculators/portage";
import { calculerTous } from "@/lib/calculators/tjm-freelance";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  CalculatorIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  BarChartIcon,
  ScaleIcon,
  AlertTriangleIcon,
  BriefcaseIcon,
} from "@/components/icons";
import ApercuCard from "@/components/simulateurs/ApercuCard";
import { PortageProvider } from "@/components/simulateurs/PortageContext";
import PortageSimulator from "@/components/simulateurs/PortageSimulator";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title: "Simulation portage salarial 2026 : salaire net selon votre TJM, sociétés comparées",
  description:
    "Simulation gratuite du salaire net en portage salarial à partir du TJM : frais de gestion, charges patronales et salariales, net avant et après impôt, et le net chez chaque société de portage. Exemples chiffrés de 300 à 800 € par jour, sans email demandé.",
  alternates: { canonical: "/simulateurs/portage-salarial" },
  openGraph: {
    title: "Simulation portage salarial 2026 : salaire net selon votre TJM, sociétés comparées",
    description:
      "Comparez votre salaire net réel chez 9 sociétés de portage salarial. Simulateur gratuit, neutre, taux 2026. Résultat en 30 secondes, sans email demandé.",
    url: "/simulateurs/portage-salarial",
  },
};

// Cas type de la FAQ, calculé par le simulateur pour ne jamais diverger de lui.
const EXEMPLE = calculerPortage({ tjm: 500, joursTravailles: 18, tauxFraisGestion: 8, fraisProRefacturables: 0, fraisProNonRefacturables: 0, statut: "senior", tauxPAS: 0 });
const EUR_FAQ = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR = EUR_FAQ;
const PCT = (x: number) => `${Math.round(x * 100)} %`;

// Exemples de la page, tous issus du calculateur : 18 jours facturés, 8 % de
// frais de gestion, pas de frais pro, statut senior, avant impôt.
const JOURS = 18;
const EXEMPLES = [300, 400, 500, 600, 800].map((tjm) => ({
  tjm,
  r: calculerPortage({ tjm, joursTravailles: JOURS, tauxFraisGestion: 8, fraisProRefacturables: 0, fraisProNonRefacturables: 0, statut: "senior", tauxPAS: 0 }),
}));

// TJM à partir duquel le brut atteint le minimum conventionnel (senior, 75 % du
// PASS) avec 18 jours et 8 % de frais : on monte de 5 € en 5 € jusqu'à y arriver.
const MIN_SENIOR = salaireMinimumMensuel("senior");
let TJM_MINIMUM = 100;
while (
  calculerPortage({ tjm: TJM_MINIMUM, joursTravailles: JOURS, tauxFraisGestion: 8, fraisProRefacturables: 0, fraisProNonRefacturables: 0, statut: "senior", tauxPAS: 0 }).salaireBrut < MIN_SENIOR
) {
  TJM_MINIMUM += 5;
}

// Même mission (500 €/j, 18 j), trois statuts : nets annuels du calculateur TJM.
const STATUTS = calculerTous({ tjm: 500, joursTravailles: JOURS, fraisProMensuels: 0, tauxPAS: 0 });
const RESULTAT_STATUT = (statut: string) => STATUTS.find((x) => x.statut === statut);
// Un statut hors plafond (warning « danger ») affiche « Inapplicable » plutôt
// qu'un net flatteur mais impossible : même règle que le comparateur salarié/freelance.
const NET_STATUT = (statut: string) => {
  const r = RESULTAT_STATUT(statut);
  if (!r || r.warnings.some((w) => w.severity === "danger")) return null;
  return r.netAvantImpot;
};

const faq = [
  {
    q: "Combien je touche en portage avec un TJM de 500 € ?",
    r: `Avec un TJM de 500 € HT et 18 jours travaillés par mois, vous réalisez 9 000 € de chiffre d'affaires HT. Après 8 % de frais de gestion, des charges patronales d'environ 43 % du brut puis 22 % de charges salariales, il vous reste environ ${EUR_FAQ.format(EXEMPLE.salaireNetAvantImpot)} nets avant impôt, soit la moitié du chiffre d'affaires. Ce montant varie selon la société de portage, votre mutuelle et votre prévoyance.`,
  },
  {
    q: "Quel est le salaire minimum en portage salarial ?",
    r: "La convention collective du portage salarial (IDCC 3219) impose un salaire brut minimum calculé en pourcentage du PASS mensuel : 70 % pour un junior, 75 % pour un senior, 85 % pour un salarié en forfait jours. En 2026, avec un PASS mensuel de 4 005 €, cela représente respectivement 2 803,50 €, 3 003,75 € et 3 404,25 € bruts mensuels.",
  },
  {
    q: "Quelle différence entre portage salarial et freelance ?",
    r: "Le freelance (micro-entreprise, EI, EURL) facture directement ses clients et gère lui-même ses cotisations. Le porté salarié, lui, signe un contrat de travail avec une société de portage qui facture le client et lui reverse un salaire après déduction des charges et des frais de gestion. Le porté bénéficie du statut de salarié (chômage, retraite, prévoyance) mais paye beaucoup plus de charges qu'un auto-entrepreneur.",
  },
  {
    q: "Comment choisir sa société de portage ?",
    r: "Trois critères comptent : le taux de frais de gestion (de 4 à 10 % en général), les services inclus (mutuelle, prévoyance, assurance RC pro, formation) et la qualité de l'accompagnement. Un taux bas n'est pas toujours le meilleur choix : certaines sociétés facturent des frais cachés ou offrent moins de services. Utilisez notre comparateur ci-dessus comme point de départ.",
  },
  {
    q: "Le portage salarial est-il avantageux fiscalement ?",
    r: "Non, le portage est plus coûteux en charges que la micro-entreprise ou la SASU à l'IS. Son intérêt est ailleurs : ouverture des droits au chômage, couverture sociale complète de salarié, simplicité administrative (pas de compta à gérer), et accès à des missions qui exigent un statut salarié. Pour une pure optimisation fiscale, d'autres statuts sont plus adaptés.",
  },
];

const etapes = [
  {
    n: 1,
    t: "Chiffre d'affaires HT",
    d: "TJM × nombre de jours travaillés dans le mois. C'est le montant que la société de portage facture à votre client final.",
  },
  {
    n: 2,
    t: "Frais de gestion",
    d: "La société de portage prélève entre 4 et 10 % du CA HT. Ce pourcentage rémunère ses services : facturation, paie, accompagnement, assurance.",
  },
  {
    n: 3,
    t: "Charges patronales",
    d: "Les cotisations employeur (URSSAF, retraite, chômage, prévoyance) représentent environ 43 % du salaire brut. La base restante (CA − frais de gestion − frais professionnels non refacturables) se partage donc entre le brut, égal à cette base divisée par 1,43, et ces charges.",
  },
  {
    n: 4,
    t: "Salaire brut",
    d: "Ce qu'il reste après les charges patronales. C'est le salaire qui apparaît sur votre bulletin de paie avant cotisations salariales.",
  },
  {
    n: 5,
    t: "Charges salariales",
    d: "Environ 22 % du salaire brut : cotisations salariales de retraite, chômage, CSG/CRDS. Elles sont prélevées directement sur la fiche de paie.",
  },
  {
    n: 6,
    t: "Salaire net",
    d: "Le montant versé sur votre compte bancaire. Si vous avez renseigné un taux de prélèvement à la source, l'impôt est retiré pour obtenir le net après impôt.",
  },
];

const sources = [
  {
    label: "URSSAF.fr — taux de cotisations 2026",
    href: "https://www.urssaf.fr",
  },
  {
    label: "BOSS.gouv.fr — Bulletin officiel de la Sécurité sociale",
    href: "https://boss.gouv.fr",
  },
  {
    label: "Convention collective du portage salarial (IDCC 3219)",
    href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/",
  },
  { label: "ITG — grille tarifaire", href: "https://www.itg.fr" },
  {
    label: "Cadres en Mission — grille tarifaire",
    href: "https://www.cadresenmission.com",
  },
  { label: "OpenWork — grille tarifaire", href: "https://www.openwork.cc" },
  {
    label: "ABC Portage — grille tarifaire",
    href: "https://www.abcportage.fr",
  },
];

const tocItems = [
  { id: "simulateur", label: "Simulateur" },
  { id: "comparatif", label: "Comparatif sociétés" },
  { id: "etapes", label: "Comprendre le calcul" },
  { id: "exemples", label: "Exemples par TJM" },
  { id: "statuts", label: "Portage, micro ou SASU" },
  { id: "erreurs", label: "Erreurs fréquentes" },
  { id: "apres", label: "Chômage, congés, paie" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function PortageSalarialPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Simulateur Portage Salarial 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      datePublished: "2026-04-15",
      dateModified: "2026-10-24",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      description:
        "Simulateur gratuit pour calculer son salaire net en portage salarial à partir de son TJM, avec comparatif des principales sociétés.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.r,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Simulateurs",
          item: `${SITE_URL}/simulateurs`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Portage salarial",
          item: `${SITE_URL}/simulateurs/portage-salarial`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <PortageProvider>
          <section className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <nav
                aria-label="Fil d'Ariane"
                className="flex items-center gap-2 text-sm text-foreground/70"
              >
                <Link href="/" className="transition hover:text-primary">
                  Accueil
                </Link>
                <span aria-hidden>›</span>
                <Link
                  href="/simulateurs"
                  className="transition hover:text-primary"
                >
                  Simulateurs
                </Link>
                <span aria-hidden>›</span>
                <span className="text-foreground">Portage salarial</span>
              </nav>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
                <CalendarIcon className="w-3.5 h-3.5" />
                À jour octobre 2026
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Simulateur Portage Salarial 2026
              </h1>
              <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
                Votre salaire net à partir de votre TJM, et le net chez chaque société
              </p>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  Le portage salarial permet à un indépendant de facturer ses
                  clients tout en gardant le statut de salarié : une société de
                  portage encaisse le chiffre d&apos;affaires, prélève ses
                  frais de gestion, puis verse un salaire après cotisations
                  patronales et salariales.
                </p>
                <p>
                  Ce simulateur estime votre salaire net mensuel à partir de
                  votre TJM, et compare automatiquement les {SOCIETES_PORTAGE.length} sociétés dont le taux est
                  modélisable, classées du moins cher au plus cher. Taux 2026.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ApercuCard />
            </div>
          </section>

          <div className="mt-16 flex gap-12">
            <div className="min-w-0 flex-1 space-y-16">
              <PortageSimulator />

              <section id="etapes" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
                    Comprendre le calcul en 6 étapes
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Voici, étape par étape, comment votre chiffre
                    d&apos;affaires se transforme en salaire net.
                    L&apos;ordre des déductions est imposé par la
                    réglementation : toute erreur de séquence fausse le
                    résultat.
                  </p>

                  <ol className="mt-8 grid gap-4 md:grid-cols-2">
                    {etapes.map((step) => (
                      <li
                        key={step.n}
                        className="group flex gap-4 rounded-xl border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                      >
                        <div
                          aria-hidden
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-sm"
                        >
                          {step.n}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {step.t}
                          </h3>
                          <p className="mt-1 text-base leading-relaxed text-foreground/80">
                            {step.d}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section id="exemples" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><BarChartIcon className="w-4 h-4" /></IconBadge>
                    Simulation du salaire net selon le TJM
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Cinq cas calculés par le simulateur : {JOURS} jours facturés
                    par mois, 8 % de frais de gestion, aucun frais professionnel,
                    avant impôt sur le revenu. Changez un paramètre ci-dessus et
                    le résultat suit.
                  </p>
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[34rem] text-left text-sm">
                      <thead>
                        <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                          <th className="px-4 py-3">TJM HT</th>
                          <th className="px-4 py-3">CA mensuel</th>
                          <th className="px-4 py-3">Salaire brut</th>
                          <th className="px-4 py-3">Net avant impôt</th>
                          <th className="px-4 py-3">Net / CA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {EXEMPLES.map(({ tjm, r }) => (
                          <tr key={tjm} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                            <td className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">{EUR.format(tjm)} / jour</td>
                            <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">{EUR.format(r.caHT)}</td>
                            <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">{EUR.format(r.salaireBrut)}</td>
                            <td className="whitespace-nowrap px-4 py-3 text-lg font-bold tabular-nums text-primary">{EUR.format(r.salaireNetAvantImpot)}</td>
                            <td className="whitespace-nowrap px-4 py-3 tabular-nums text-accent">{PCT(r.salaireNetAvantImpot / r.caHT)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-6 text-base leading-relaxed text-foreground/80">
                    La règle de lecture est simple : en portage, <strong>le net
                    avant impôt représente un peu moins de la moitié du chiffre
                    d&apos;affaires</strong>, quel que soit le TJM. La proportion
                    ne bouge pas parce que toutes les déductions sont
                    proportionnelles : 8 % de frais de gestion sur le CA, puis
                    des charges patronales de 43 % et salariales de 22 %
                    exprimées en pourcentage du brut. Ce qui change avec le TJM,
                    c&apos;est le montant absolu, et le franchissement des seuils :
                    au-dessous de <strong>{EUR.format(TJM_MINIMUM)} par jour</strong>, avec {JOURS} jours
                    facturés, le brut passe sous le minimum conventionnel d&apos;un
                    salarié porté senior ({EUR.format(MIN_SENIOR)} bruts, soit 75 % du
                    PASS) et la société de portage ne peut légalement pas vous
                    embaucher à temps plein sur cette base.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-foreground/80">
                    Deux paramètres font bouger la simulation plus que le TJM
                    lui-même. Le <strong>nombre de jours facturés</strong>
                    d&apos;abord : 18 jours correspond à un mois plein moins les
                    congés et jours fériés lissés sur l&apos;année ; un consultant
                    qui enchaîne les missions sans intermission facture plutôt 20
                    à 21 jours, et celui qui prospecte entre deux contrats tombe
                    à 14 ou 15. Les <strong>frais professionnels</strong>
                    ensuite : remboursés hors charges quand ils sont refacturés
                    au client, ils s&apos;ajoutent au net sans cotisations ; non
                    refacturés, ils sont déduits de la base avant le calcul des
                    charges, ce qui reste plus avantageux que de les payer avec
                    du salaire net.
                  </p>
                </div>
              </section>

              <section id="statuts" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
                    Portage, micro-entreprise ou SASU : la même mission, trois nets
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Un TJM de 500 € sur {JOURS} jours par mois, soit {EUR.format(500 * JOURS * 12)} de
                    chiffre d&apos;affaires annuel, calculé par notre simulateur
                    TJM avec les hypothèses de chaque statut.
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                      { k: "auto-entrepreneur", l: "Auto-entrepreneur", n: "Cotisations de 25,6 % du CA, mais 108 000 € dépassent le plafond de la micro : il faudrait un TJM inférieur ou moins de jours" },
                      { k: "portage", l: "Portage salarial", n: "8 % de frais de gestion, charges de salarié, chômage et retraite complète" },
                      { k: "sasu", l: "SASU", n: "Assimilé salarié, 1 500 € de comptabilité par an, pas de chômage" },
                    ].map((c) => (
                      <div key={c.k} className="rounded-xl border border-border bg-background p-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.l}</p>
                        {NET_STATUT(c.k) === null ? (
                          <>
                            <p className="mt-1 text-2xl font-bold text-muted-foreground">Inapplicable</p>
                            <p className="text-xs text-muted-foreground">chiffre d&apos;affaires au-dessus du plafond micro</p>
                          </>
                        ) : (
                          <>
                            <p className="mt-1 text-2xl font-bold tabular-nums text-primary">{EUR.format(NET_STATUT(c.k) ?? 0)}</p>
                            <p className="text-xs text-muted-foreground">net annuel avant impôt</p>
                          </>
                        )}
                        <p className="mt-3 text-sm text-foreground/80">{c.n}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-base leading-relaxed text-foreground/80">
                    Le portage est le statut qui laisse le moins de net, et
                    c&apos;est normal : c&apos;est le seul qui achète une
                    protection complète de salarié, assurance chômage comprise.
                    L&apos;écart avec la SASU se réduit si l&apos;on compte les
                    frais d&apos;expert-comptable, le temps administratif et
                    l&apos;absence de droits au chômage du président. Pour
                    comparer avec votre propre TJM et vos frais, le{" "}
                    <Link href="/simulateurs/tjm-freelance" className="text-primary underline-offset-4 hover:underline">
                      simulateur TJM freelance
                    </Link>{" "}
                    met les quatre statuts côte à côte, et le{" "}
                    <Link href="/simulateurs/salarie-ou-freelance" className="text-primary underline-offset-4 hover:underline">
                      comparateur salarié ou freelance
                    </Link>{" "}
                    part de votre salaire actuel.
                  </p>
                </div>
              </section>

              <section id="erreurs" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
                    Les erreurs qui faussent une simulation de portage
                  </h2>
                  <ul className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80">
                    <li className="flex gap-3">
                      <span aria-hidden className="font-bold text-primary">1.</span>
                      <span><strong>Appliquer les charges patronales à la base plutôt qu&apos;au brut.</strong> Les 43 % s&apos;expriment en pourcentage du salaire brut : la base après frais de gestion se partage donc entre le brut (base ÷ 1,43) et les charges. Compter 43 % de la base revient à gonfler les charges d&apos;un tiers et à sous-estimer le net d&apos;un cinquième. C&apos;est l&apos;erreur la plus répandue, et elle a longtemps figuré dans ce simulateur avant d&apos;être corrigée en octobre 2026.</span>
                    </li>
                    <li className="flex gap-3">
                      <span aria-hidden className="font-bold text-primary">2.</span>
                      <span><strong>Confondre frais de gestion « sur le CA » et « sur le brut ».</strong> La plupart des sociétés prélèvent un pourcentage du chiffre d&apos;affaires HT, mais certaines l&apos;expriment sur la masse salariale, ce qui donne un taux affiché plus faible pour un prélèvement identique. Ramenez toujours au CA pour comparer.</span>
                    </li>
                    <li className="flex gap-3">
                      <span aria-hidden className="font-bold text-primary">3.</span>
                      <span><strong>Oublier le plafonnement des frais de gestion.</strong> Au-delà d&apos;un certain CA mensuel, plusieurs sociétés plafonnent leur prélèvement ou appliquent un taux dégressif. À 800 € par jour, un taux fixe de 8 % n&apos;est plus le marché : négociez.</span>
                    </li>
                    <li className="flex gap-3">
                      <span aria-hidden className="font-bold text-primary">4.</span>
                      <span><strong>Compter 21 jours tous les mois.</strong> Sur une année, congés, jours fériés et intermissions ramènent la moyenne autour de 18 jours facturés. Simuler à 21 jours surestime le net annuel de 15 %.</span>
                    </li>
                    <li className="flex gap-3">
                      <span aria-hidden className="font-bold text-primary">5.</span>
                      <span><strong>Ignorer la mutuelle, la prévoyance et la réserve financière.</strong> Elles sont prélevées sur la paie et varient d&apos;une société à l&apos;autre ; la convention collective impose aussi une réserve de 10 % du brut en CDI, versée plus tard. Le net du bulletin peut donc être inférieur de quelques pour cent à la simulation.</span>
                    </li>
                    <li className="flex gap-3">
                      <span aria-hidden className="font-bold text-primary">6.</span>
                      <span><strong>Comparer un net avant impôt à un net après impôt.</strong> Le prélèvement à la source s&apos;applique au salaire porté comme à tout salaire ; renseignez votre taux dans le simulateur pour obtenir le montant qui arrivera réellement sur votre compte.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="apres" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><BriefcaseIcon className="w-4 h-4" /></IconBadge>
                    Ce que le simulateur ne montre pas : chômage, congés, bulletin de paie
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-foreground/80">
                    Le net mensuel n&apos;est qu&apos;une partie de la
                    rémunération d&apos;un salarié porté. Le portage cotise à
                    l&apos;assurance chômage : à la fin d&apos;une mission, le
                    porté ouvre des droits à l&apos;ARE, calculés sur le salaire
                    brut et non sur le chiffre d&apos;affaires facturé, ce qui
                    surprend souvent. Notre guide{" "}
                    <Link href="/guides/portage-salarial-chomage" className="text-primary underline-offset-4 hover:underline">
                      portage salarial et chômage
                    </Link>{" "}
                    chiffre l&apos;allocation à partir des exemples ci-dessus.
                    Les congés payés sont provisionnés sur chaque bulletin,
                    selon un mécanisme détaillé dans le guide{" "}
                    <Link href="/guides/conges-payes-portage-salarial" className="text-primary underline-offset-4 hover:underline">
                      congés payés en portage
                    </Link>
                    . Enfin, pour vérifier ligne à ligne qu&apos;une société
                    applique bien ce qu&apos;elle annonce, le guide de la{" "}
                    <Link href="/guides/fiche-de-paie-portage-salarial" className="text-primary underline-offset-4 hover:underline">
                      fiche de paie en portage salarial
                    </Link>{" "}
                    décode chaque rubrique. Et avant de signer, le{" "}
                    <Link href="/comparateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
                      comparatif des sociétés de portage
                    </Link>{" "}
                    rassemble les frais, les services et les avis de dix
                    acteurs.
                  </p>
                </div>
              </section>

              <section id="faq" className="scroll-mt-24">
                <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                  <IconBadge><MessageCircleIcon className="w-4 h-4" /></IconBadge>
                  Questions fréquentes
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                  Les questions qu&apos;on nous pose le plus souvent sur le
                  portage salarial.
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  {faq.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-foreground">
                        <span>{item.q}</span>
                        <span
                          aria-hidden
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xl text-primary transition group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-4 text-base leading-relaxed text-foreground/80">
                        {item.r}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              <section id="sources" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-2xl font-bold tracking-tight text-foreground">
                    <IconBadge><ExternalLinkIcon className="w-4 h-4" /></IconBadge>
                    Sources
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Les données utilisées dans ce simulateur proviennent des
                    publications officielles et des grilles tarifaires
                    publiques des sociétés de portage.
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {sources.map((s) => (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary underline-offset-4 transition hover:underline"
                        >
                          {s.label}
                          <span aria-hidden className="ml-1 text-xs">
                            ↗
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs italic text-muted-foreground">
                    Dernière mise à jour : octobre 2026. Les taux de charges
                    sont des moyennes indicatives, pas un barème URSSAF
                    exhaustif.
                  </p>
                </div>
              </section>
            </div>

            <TocSidebar items={tocItems} />
          </div>
        </PortageProvider>
      </div>
    </>
  );
}
