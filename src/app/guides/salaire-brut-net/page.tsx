import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  ShieldIcon,
  CalculatorIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  RocketIcon,
  BriefcaseIcon,
  AlertTriangleIcon,
  ScaleIcon,
  ReceiptIcon,
  EuroIcon,
  PercentIcon,
  LightbulbIcon,
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title: "Salaire brut et net : tout comprendre en 2026 | Salairia",
  description:
    "Comment passer du brut au net ? Cotisations, CSG/CRDS, prélèvement à la source : tout comprendre sur votre fiche de paie. Guide complet + simulateur gratuit.",
  alternates: {
    canonical: "/guides/salaire-brut-net",
  },
  openGraph: {
    title: "Salaire brut et net : tout comprendre en 2026 | Salairia",
    description:
      "Comment passer du brut au net ? Cotisations, CSG/CRDS, prélèvement à la source : tout comprendre sur votre fiche de paie.",
    url: "/guides/salaire-brut-net",
  },
};

const faq = [
  {
    q: "Quelle est la différence entre salaire brut et net ?",
    r: "Le salaire brut est le montant inscrit sur votre contrat de travail, avant toute déduction. Le salaire net est ce que vous recevez réellement sur votre compte bancaire, après déduction des cotisations sociales salariales (~22 %) et du prélèvement à la source (impôt sur le revenu). On distingue le net avant impôt (après cotisations, avant PAS) et le net après impôt (le virement réel).",
  },
  {
    q: "Comment calculer mon salaire net à partir du brut ?",
    r: "La méthode rapide : multipliez votre salaire brut par 0,78 (non-cadre) ou 0,77 (cadre) pour obtenir le net avant impôt. Par exemple, 3 000 € brut × 0,78 = 2 340 € net avant impôt. Pour le net après impôt, appliquez ensuite votre taux de prélèvement à la source. Pour un calcul exact, utilisez notre simulateur brut/net.",
  },
  {
    q: "Le 13e mois est-il inclus dans le salaire brut ?",
    r: "Le 13e mois est un complément de salaire brut versé en une ou plusieurs fois dans l\u2019année. Il est soumis aux mêmes cotisations sociales que le salaire mensuel. Quand on parle de salaire brut annuel, le 13e mois y est inclus s\u2019il est prévu par votre convention collective ou votre contrat.",
  },
  {
    q: "Les heures supplémentaires sont-elles imposables ?",
    r: "Depuis 2019, les heures supplémentaires bénéficient d\u2019une exonération d\u2019impôt sur le revenu jusqu\u2019à 7 500 € net par an. Elles restent soumises aux cotisations sociales, mais avec une réduction de cotisations salariales. Au-delà du plafond, elles sont imposées normalement.",
  },
  {
    q: "Mon net est différent de celui du simulateur, pourquoi ?",
    r: "Plusieurs raisons possibles : votre convention collective prévoit des cotisations spécifiques (prévoyance, mutuelle d\u2019entreprise), vous avez des avantages en nature, votre salaire dépasse le plafond de la Sécurité sociale (PASS), ou votre taux de PAS diffère de celui utilisé dans la simulation. Le simulateur utilise des taux moyens ; votre fiche de paie reflète les taux exacts de votre entreprise.",
  },
  {
    q: "Le salaire brut annuel inclut-il les primes ?",
    r: "Le salaire brut annuel inclut toutes les rémunérations brutes perçues : salaire de base, 13e mois, primes (ancienneté, performance, vacances), heures supplémentaires. En revanche, les remboursements de frais professionnels et les indemnités non imposables (transport, télétravail) n\u2019en font généralement pas partie.",
  },
  {
    q: "Comment passer du salaire horaire au mensuel ?",
    r: "La durée légale du travail est de 151,67 heures par mois (35h × 52 semaines / 12 mois). Multipliez votre taux horaire brut par 151,67 pour obtenir votre salaire mensuel brut. Exemple : SMIC 2026 à 11,88 € × 151,67 = 1 801,84 € brut mensuel.",
  },
  {
    q: "Le SMIC est-il exprimé en brut ou en net ?",
    r: "Le SMIC officiel est toujours exprimé en brut. En 2026, le SMIC brut mensuel est d\u2019environ 1 802 € pour 35 heures. Le SMIC net avant impôt est d\u2019environ 1 427 € (après cotisations salariales). La distinction est importante car c\u2019est le montant brut qui fait référence légalement.",
  },
];

const sourcesLinks = [
  { label: "URSSAF — taux de cotisations sociales 2026", href: "https://www.urssaf.fr" },
  { label: "LégiSocial — barèmes de paie", href: "https://www.legisocial.fr" },
  { label: "service-public.fr — fiche de paie", href: "https://www.service-public.fr" },
  { label: "impots.gouv.fr — prélèvement à la source", href: "https://www.impots.gouv.fr" },
  { label: "AGIRC-ARRCO — retraite complémentaire", href: "https://www.agirc-arrco.fr" },
];

const tocItems = [
  { id: "definition", label: "Brut vs Net" },
  { id: "cotisations", label: "Cotisations" },
  { id: "fiche-de-paie", label: "Fiche de paie" },
  { id: "cadre-non-cadre", label: "Cadre vs non-cadre" },
  { id: "pas", label: "Prélèvement à la source" },
  { id: "exemples", label: "Exemples" },
  { id: "formule", label: "Formule" },
  { id: "net-brut", label: "Net → Brut" },
  { id: "negociation", label: "Négociation" },
  { id: "simuler", label: "Simuler" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function GuideSalaireBrutNetPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Salaire brut et net : tout comprendre en 2026",
      description: "Comment passer du brut au net ? Cotisations, CSG/CRDS, prélèvement à la source : tout comprendre sur votre fiche de paie.",
      author: { "@type": "Person", name: "Nizar Laghrifi", url: `${SITE_URL}/a-propos` },
      publisher: { "@type": "Organization", name: "Salairia", url: `${SITE_URL}` },
      datePublished: "2026-04-15",
      dateModified: "2026-04-15",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/guides/salaire-brut-net`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: "Salaire brut net", item: `${SITE_URL}/guides/salaire-brut-net` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.r },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        {/* Hero */}
        <section>
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-foreground/70">
            <Link href="/" className="transition hover:text-primary">Accueil</Link>
            <span aria-hidden>›</span>
            <Link href="/guides" className="transition hover:text-primary">Guides</Link>
            <span aria-hidden>›</span>
            <span className="text-foreground">Salaire brut net</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
            <CalendarIcon className="h-3.5 w-3.5" />
            À jour avril 2026
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Salaire brut et net : tout comprendre en 2026
          </h1>
          <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
            Cotisations, fiche de paie et prélèvement à la source
          </p>

          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground/80">
            <p>
              « Salaire brut net » est la requête la plus recherchée en France sur la
              rémunération, avec plus de 90 000 recherches mensuelles. Et pour cause :
              la plupart des salariés ne comprennent pas l&apos;écart entre le montant
              inscrit sur leur contrat et celui qu&apos;ils reçoivent sur leur compte.
              Ce guide vous explique, ligne par ligne, comment passer du brut au net,
              ce que financent vos cotisations, et comment lire votre fiche de paie sans
              zone d&apos;ombre.
            </p>
            <p className="text-sm text-muted-foreground">
              ⏱ Lecture : 12 min · Données vérifiées sur les{" "}
              <Link href="/methodologie" className="text-primary hover:underline">
                sources officielles
              </Link>
            </p>
          </div>
        </section>

        <div className="mt-16 flex gap-12">
          <div className="min-w-0 flex-1 space-y-16">

            {/* 1. Définition — Brut vs Net */}
            <section id="definition" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><EuroIcon className="h-4 w-4" /></IconBadge>
                Brut vs Net : quelle différence ?
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Le <strong>salaire brut</strong> est le montant total de votre rémunération
                  avant toute déduction. C&apos;est celui qui figure sur votre contrat de travail
                  et en haut de votre fiche de paie. Il inclut votre salaire de base, les primes
                  et les heures supplémentaires.
                </p>
                <p>
                  Le <strong>salaire net avant impôt</strong> (aussi appelé « net à payer avant
                  impôt sur le revenu ») est ce qui reste après déduction des cotisations sociales
                  salariales (assurance maladie, retraite, chômage, CSG/CRDS). C&apos;est le
                  montant que vous perceviez avant la réforme du prélèvement à la source.
                </p>
                <p>
                  Le <strong>salaire net après impôt</strong> (ou « net à payer ») est le montant
                  réellement viré sur votre compte bancaire chaque mois. C&apos;est le net avant
                  impôt moins le prélèvement à la source (PAS).
                </p>
              </div>

              {/* Visual: 3 boxes cascade */}
              <div className="mt-8 rounded-xl bg-muted/30 p-6 sm:p-8">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                  <div className="flex h-28 w-52 flex-col items-center justify-center rounded-xl border-2 border-primary bg-white p-4 text-center shadow-sm">
                    <span className="text-sm font-bold text-primary">Salaire brut</span>
                    <span className="mt-1 text-xs text-muted-foreground">Montant contractuel</span>
                    <span className="mt-1 text-lg font-bold tabular-nums text-foreground">3 000 €</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                    <span className="hidden sm:block">→</span>
                    <span className="text-center">− cotisations salariales<br />(~22 %)</span>
                    <span className="hidden sm:block">→</span>
                  </div>
                  <div className="flex h-28 w-52 flex-col items-center justify-center rounded-xl border-2 border-accent bg-white p-4 text-center shadow-sm">
                    <span className="text-sm font-bold text-accent">Net avant impôt</span>
                    <span className="mt-1 text-xs text-muted-foreground">Après cotisations</span>
                    <span className="mt-1 text-lg font-bold tabular-nums text-foreground">2 340 €</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                    <span className="hidden sm:block">→</span>
                    <span className="text-center">− PAS<br />(ex. 7,5 %)</span>
                    <span className="hidden sm:block">→</span>
                  </div>
                  <div className="flex h-28 w-52 flex-col items-center justify-center rounded-xl border-2 border-foreground bg-white p-4 text-center shadow-sm">
                    <span className="text-sm font-bold text-foreground">Net après impôt</span>
                    <span className="mt-1 text-xs text-muted-foreground">Virement réel</span>
                    <span className="mt-1 text-lg font-bold tabular-nums text-foreground">2 165 €</span>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Calcul approximatif : taux ~22 % de cotisations (non-cadre), PAS à 7,5 %.
                </p>
              </div>
            </section>

            {/* 2. Cotisations sociales */}
            <section id="cotisations" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><PercentIcon className="h-4 w-4" /></IconBadge>
                Les cotisations sociales en détail
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Les cotisations sociales salariales sont prélevées chaque mois sur votre
                  salaire brut. Elles financent la protection sociale française : maladie,
                  retraite, chômage. Voici les trois grands blocs à connaître.
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground">1. Sécurité sociale — vieillesse (~7,3 %)</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    La cotisation vieillesse salariale finance votre retraite de base (régime général).
                    Elle se décompose en une part plafonnée (6,90 % sur la tranche 1, sous le plafond
                    de la Sécurité sociale) et une part déplafonnée (0,40 % sur la totalité du salaire).
                    C&apos;est grâce à cette cotisation que vous validez des trimestres et accumulez des
                    droits à la retraite.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground">2. Retraite complémentaire AGIRC-ARRCO (~4 % T1)</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    Depuis la fusion AGIRC-ARRCO en 2019, cadres et non-cadres cotisent au même régime
                    de retraite complémentaire. Le taux salarial est d&apos;environ 3,15 % sur la tranche 1
                    (jusqu&apos;au PASS) et de 8,64 % sur la tranche 2 (entre 1 et 8 PASS). En pratique,
                    pour la majorité des salariés dont le salaire reste sous le PASS, le taux effectif
                    est d&apos;environ 4 % du brut.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground">3. CSG/CRDS (9,7 % sur 98,25 % du brut)</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    La Contribution Sociale Généralisée (CSG) et la Contribution au Remboursement
                    de la Dette Sociale (CRDS) sont prélevées sur 98,25 % du salaire brut (un
                    abattement de 1,75 % pour frais professionnels). La CSG se décompose en une
                    part déductible (6,80 %) et une part non déductible (2,40 %). La CRDS (0,50 %)
                    n&apos;est pas déductible. Total : 9,70 % sur l&apos;assiette.
                  </p>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Cotisation salariale</th>
                      <th className="px-5 py-3 text-right">Taux</th>
                      <th className="px-5 py-3">Assiette</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Assurance vieillesse (plafonnée)", "6,90 %", "Tranche 1 (≤ PASS)", false],
                      ["Assurance vieillesse (déplafonnée)", "0,40 %", "Totalité du brut", false],
                      ["Retraite complémentaire T1", "3,15 %", "Tranche 1 (≤ PASS)", false],
                      ["Retraite complémentaire T2", "8,64 %", "Tranche 2 (> PASS)", false],
                      ["CSG déductible", "6,80 %", "98,25 % du brut", false],
                      ["CSG non déductible + CRDS", "2,90 %", "98,25 % du brut", false],
                      ["Assurance chômage", "0 %", "Supprimée côté salarial", false],
                      ["Total approximatif", "~22 %", "Du salaire brut", true],
                    ].map(([cat, taux, base, bold]) => (
                      <tr key={cat as string} className="border-b border-border last:border-b-0">
                        <td className={`px-5 py-2.5 ${bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                          {cat as string}
                        </td>
                        <td className={`px-5 py-2.5 text-right tabular-nums ${bold ? "font-semibold text-foreground" : "text-foreground/80"}`}>
                          {taux as string}
                        </td>
                        <td className="px-5 py-2.5 text-xs text-muted-foreground">{base as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Ces taux sont ceux du régime général pour 2026. Les taux exacts varient
                selon votre convention collective et votre niveau de rémunération.
                Consultez notre{" "}
                <Link href="/simulateurs/salaire-brut-net" className="text-primary hover:underline">
                  simulateur brut/net
                </Link>{" "}
                pour un calcul personnalisé.
              </p>
            </section>

            {/* 3. Fiche de paie */}
            <section id="fiche-de-paie" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ReceiptIcon className="h-4 w-4" /></IconBadge>
                Lire sa fiche de paie
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  La fiche de paie (ou bulletin de salaire) est un document obligatoire
                  remis chaque mois par votre employeur. Depuis 2018, le format a été simplifié,
                  mais il reste dense. Voici les 6 lignes essentielles à vérifier chaque mois.
                </p>
              </div>

              {/* Mock payslip */}
              <div className="mt-8 rounded-xl border-2 border-border bg-white shadow-md">
                <div className="border-b border-border bg-muted/40 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bulletin de paie</p>
                      <p className="text-sm text-muted-foreground">Période : avril 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Entreprise Exemple SAS</p>
                      <p className="text-xs text-muted-foreground">SIRET : 123 456 789 00001</p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-border">
                  <div className="flex items-center justify-between px-6 py-3 bg-primary/5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Salaire de base</p>
                        <p className="text-xs text-muted-foreground">151,67 h × taux horaire</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold tabular-nums text-foreground">3 000,00 €</p>
                  </div>

                  <div className="flex items-center justify-between px-6 py-3 bg-primary/5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Heures supplémentaires</p>
                        <p className="text-xs text-muted-foreground">Majorées à 25 % ou 50 %</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold tabular-nums text-foreground">0,00 €</p>
                  </div>

                  <div className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
                      <p className="text-sm font-semibold text-foreground">Cotisations salariales</p>
                    </div>
                    <div className="mt-2 ml-9 space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between"><span>Assurance vieillesse</span><span className="tabular-nums">−219,00 €</span></div>
                      <div className="flex justify-between"><span>Retraite complémentaire</span><span className="tabular-nums">−94,50 €</span></div>
                      <div className="flex justify-between"><span>CSG/CRDS</span><span className="tabular-nums">−285,83 €</span></div>
                      <div className="flex justify-between"><span>Autres (prévoyance, mutuelle)</span><span className="tabular-nums">−60,67 €</span></div>
                      <div className="flex justify-between border-t border-border pt-1 font-semibold text-foreground">
                        <span>Total cotisations salariales</span>
                        <span className="tabular-nums">−660,00 €</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-6 py-3 bg-accent/5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">4</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Net imposable</p>
                        <p className="text-xs text-muted-foreground">Base de calcul pour l&apos;impôt sur le revenu</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold tabular-nums text-foreground">2 408,00 €</p>
                  </div>

                  <div className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">5</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Prélèvement à la source (PAS)</p>
                        <p className="text-xs text-muted-foreground">Taux personnalisé : 7,5 %</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold tabular-nums text-destructive">−175,50 €</p>
                  </div>

                  <div className="flex items-center justify-between bg-accent/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">6</span>
                      <div>
                        <p className="text-base font-bold text-foreground">Net à payer</p>
                        <p className="text-xs text-muted-foreground">Montant viré sur votre compte</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold tabular-nums text-accent">2 164,50 €</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Fiche de paie simplifiée à titre illustratif. Calcul approximatif pour un salarié
                non-cadre à 3 000 € brut, taux de cotisations ~22 %, PAS à 7,5 %.
              </p>

              <div className="mt-6 rounded-xl border-l-4 border-primary bg-primary/5 p-5">
                <p className="text-sm text-primary">
                  <strong>Astuce :</strong> Le net imposable est légèrement supérieur au net à payer avant impôt,
                  car la CSG non déductible et la CRDS sont réintégrées dans la base imposable. Ne confondez
                  pas les deux montants.
                </p>
              </div>
            </section>

            {/* 4. Cadre vs non-cadre */}
            <section id="cadre-non-cadre" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ScaleIcon className="h-4 w-4" /></IconBadge>
                Cadre vs non-cadre : quelles différences ?
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Depuis la fusion des régimes AGIRC et ARRCO en 2019, les différences de cotisations
                  entre cadres et non-cadres se sont considérablement réduites. Le régime de retraite
                  complémentaire est désormais unifié. Toutefois, quelques écarts subsistent.
                </p>
              </div>

              <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Critère</th>
                      <th className="px-5 py-3">Non-cadre</th>
                      <th className="px-5 py-3">Cadre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Retraite complémentaire", "AGIRC-ARRCO (unifié)", "AGIRC-ARRCO (unifié)"],
                      ["Cotisation APEC", "Non", "Oui (0,024 % salarial)"],
                      ["Prévoyance minimum", "Non obligatoire", "1,50 % T1 (dont 0,76 % salarial)"],
                      ["Taux de cotisation total", "~22 %", "~23-23,5 %"],
                      ["Ratio net/brut approximatif", "×0,78", "×0,77"],
                      ["Écart de net mensuel (3 000 € brut)", "~2 340 €", "~2 310 €"],
                    ].map(([critere, noncadre, cadre]) => (
                      <tr key={critere} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold text-foreground">{critere}</td>
                        <td className="px-5 py-2.5 text-foreground/80">{noncadre}</td>
                        <td className="px-5 py-2.5 text-foreground/80">{cadre}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-xl border-l-4 border-primary bg-primary/5 p-5">
                <p className="text-sm text-primary">
                  <strong>En résumé :</strong> L&apos;écart entre cadre et non-cadre est aujourd&apos;hui de l&apos;ordre
                  de 0,5 à 1 point de cotisations salariales. La principale différence est la cotisation
                  APEC (obligatoire pour les cadres, 0,024 % salarié) et le minimum prévoyance. Sur un
                  salaire de 3 000 € brut, cela représente environ 30 € de différence mensuelle.
                </p>
              </div>
            </section>

            {/* 5. Prélèvement à la source */}
            <section id="pas" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ShieldIcon className="h-4 w-4" /></IconBadge>
                Le prélèvement à la source
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Le prélèvement à la source (PAS) est en vigueur depuis janvier 2019. Votre
                  employeur prélève directement l&apos;impôt sur le revenu sur votre salaire chaque
                  mois, avant de vous verser le net à payer. Cela ne change pas le montant total
                  de votre impôt : vous payez la même somme, mais mensuellement au lieu d&apos;un
                  versement annuel.
                </p>
                <p>
                  L&apos;administration fiscale transmet votre taux de prélèvement à votre employeur.
                  Trois options existent :
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-foreground">Taux personnalisé</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    Calculé sur les revenus de votre foyer fiscal. C&apos;est le taux par défaut,
                    transmis automatiquement par les impôts à votre employeur.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-foreground">Taux individualisé</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    Utile pour les couples avec des revenus très différents. Chaque conjoint a un
                    taux adapté à ses revenus propres. Le total reste identique.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-foreground">Taux neutre (non personnalisé)</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    Basé sur un barème standard sans tenir compte de votre situation familiale.
                    Utile si vous ne souhaitez pas communiquer votre taux réel à votre employeur.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
                <AlertTriangleIcon className="mb-1 inline h-4 w-4 text-amber-500" />{" "}
                Le PAS ne change pas votre impôt total. Si trop d&apos;impôt a été prélevé,
                vous serez remboursé lors de la déclaration annuelle. Si pas assez, vous
                devrez verser un complément. Vous pouvez modifier votre taux à tout moment
                sur impots.gouv.fr.
              </div>

              <p className="mt-4 text-base text-foreground/80">
                <strong>Estime ton net après impôt</strong> avec{" "}
                <Link href="/simulateurs/net-apres-impot" className="text-primary hover:underline">
                  notre simulateur de prélèvement à la source
                </Link>.
              </p>
            </section>

            {/* 6. Exemples concrets */}
            <section id="exemples" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                Exemples concrets de conversion
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Voici un tableau de correspondance pour 5 niveaux de salaire courants en France.
                Ces montants sont indicatifs et basés sur un taux moyen de cotisations salariales
                de ~22 % (non-cadre) et un prélèvement à la source de 7,5 %.
              </p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Brut mensuel</th>
                      <th className="px-5 py-3 text-right">Net avant impôt</th>
                      <th className="px-5 py-3 text-right">Net après PAS (7,5 %)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["2 000 € (SMIC+)", "~1 560 €", "~1 443 €"],
                      ["2 500 €", "~1 950 €", "~1 804 €"],
                      ["3 000 €", "~2 340 €", "~2 165 €"],
                      ["4 000 €", "~3 120 €", "~2 886 €"],
                      ["5 000 €", "~3 900 €", "~3 608 €"],
                    ].map(([brut, net, netPas]) => (
                      <tr key={brut} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-3 font-semibold text-foreground">{brut}</td>
                        <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{net}</td>
                        <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{netPas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Calcul approximatif, taux ~22 % de cotisations salariales (non-cadre, salaire sous le PASS).
                PAS fixé à 7,5 % à titre illustratif. Les montants réels varient selon votre convention
                collective, votre situation familiale et votre taux de PAS personnalisé.
              </p>

              <p className="mt-4 text-base text-foreground/80">
                <strong>Calcule ton net exact</strong> avec{" "}
                <Link href="/simulateurs/salaire-brut-net" className="font-semibold text-primary hover:underline">
                  notre simulateur brut/net →
                </Link>
              </p>
            </section>

            {/* 7. Formule de conversion */}
            <section id="formule" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><RocketIcon className="h-4 w-4" /></IconBadge>
                La formule de conversion
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Pour une estimation rapide sans simulateur, vous pouvez appliquer ces coefficients :
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border-2 border-primary bg-primary/5 p-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">Non-cadre</p>
                  <p className="mt-3 text-2xl font-bold text-foreground">Net ≈ Brut × 0,78</p>
                  <p className="mt-2 text-sm text-muted-foreground">~22 % de cotisations salariales</p>
                </div>
                <div className="rounded-xl border-2 border-accent bg-accent/5 p-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-wider text-accent">Cadre</p>
                  <p className="mt-3 text-2xl font-bold text-foreground">Net ≈ Brut × 0,77</p>
                  <p className="mt-2 text-sm text-muted-foreground">~23 % de cotisations salariales</p>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-base leading-relaxed text-foreground/80">
                <p>
                  Ces coefficients sont des approximations valables pour un salaire inférieur au
                  plafond annuel de la Sécurité sociale (PASS = 47 100 € brut annuel en 2026, soit
                  3 925 € brut mensuel). Au-delà, certaines cotisations plafonnées ne s&apos;appliquent
                  plus sur la partie dépassant le PASS, ce qui modifie légèrement le ratio.
                </p>
                <p>
                  Pour les hauts salaires (au-delà du PASS), le taux effectif de cotisations peut
                  baisser légèrement sur la tranche au-delà du plafond, mais la retraite complémentaire
                  tranche 2 compense en partie. Le ratio net/brut reste entre 0,75 et 0,80 pour la
                  grande majorité des salariés.
                </p>
              </div>
            </section>

            {/* 8. Net → Brut */}
            <section id="net-brut" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><LightbulbIcon className="h-4 w-4" /></IconBadge>
                Du net au brut : le calcul inverse
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Vous connaissez votre salaire net souhaité et voulez savoir quel brut demander ?
                  La formule inverse est simple :
                </p>
              </div>

              <div className="mt-6 rounded-xl border-2 border-primary bg-primary/5 p-6 text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Net → Brut</p>
                <p className="mt-3 text-2xl font-bold text-foreground">Brut ≈ Net / 0,78</p>
                <p className="mt-2 text-sm text-muted-foreground">(non-cadre) · ou Net / 0,77 (cadre)</p>
              </div>

              <div className="mt-6 space-y-3 text-base leading-relaxed text-foreground/80">
                <p>
                  <strong>Exemple :</strong> vous souhaitez toucher 2 000 € net avant impôt.
                  Brut nécessaire : 2 000 / 0,78 ≈ <strong>2 564 € brut</strong>.
                </p>
                <p>
                  Ce calcul est particulièrement utile dans deux situations :
                </p>
                <ul className="ml-4 list-disc space-y-2 pl-2">
                  <li>
                    <strong>Négociation salariale :</strong> une offre d&apos;emploi affiche un salaire net, mais
                    vous devez négocier en brut (standard en France).
                  </li>
                  <li>
                    <strong>Comparaison d&apos;offres :</strong> deux entreprises proposent des montants dans des
                    unités différentes (brut annuel vs net mensuel). Ramenez tout au même référentiel.
                  </li>
                </ul>
              </div>

              <p className="mt-4 text-base text-foreground/80">
                <strong>Utilise le mode Net → Brut</strong> de{" "}
                <Link href="/simulateurs/salaire-brut-net" className="font-semibold text-primary hover:underline">
                  notre simulateur brut/net →
                </Link>
              </p>
            </section>

            {/* 9. Négociation */}
            <section id="negociation" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><BriefcaseIcon className="h-4 w-4" /></IconBadge>
                Négocier en brut ou en net ?
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  En France, la convention est de négocier en <strong>salaire brut annuel</strong>.
                  C&apos;est le montant que vous trouverez sur votre contrat de travail et dans les offres
                  d&apos;emploi. Cependant, ce qui compte au quotidien, c&apos;est votre net mensuel après impôt.
                  Il est donc essentiel de savoir convertir l&apos;un en l&apos;autre.
                </p>
                <p>
                  Quelques conseils pratiques pour votre négociation :
                </p>
                <ul className="ml-4 list-disc space-y-2 pl-2">
                  <li>
                    <strong>Demandez le brut annuel global</strong> (fixe + variable + primes), pas
                    seulement le fixe mensuel. Un 13e mois ou une prime d&apos;intéressement peut
                    représenter 10-15 % de rémunération supplémentaire.
                  </li>
                  <li>
                    <strong>Pensez au package total :</strong> mutuelle prise en charge, tickets
                    restaurant, remboursement transport, télétravail, intéressement/participation.
                    Ces éléments ont une valeur nette réelle.
                  </li>
                  <li>
                    <strong>Comparez en net mensuel :</strong> ramenez chaque offre à un net mensuel
                    après impôt pour comparer objectivement.
                  </li>
                  <li>
                    <strong>Anticipez les évolutions :</strong> un salaire un peu plus bas dans une
                    entreprise avec de l&apos;intéressement massif peut être plus avantageux qu&apos;un
                    fixe élevé sans variable.
                  </li>
                </ul>
              </div>

              <p className="mt-4 text-base text-foreground/80">
                Découvre notre{" "}
                <Link href="/simulateurs/negociation-salariale" className="font-semibold text-primary hover:underline">
                  simulateur de négociation salariale →
                </Link>{" "}
                pour comparer des offres et évaluer un package global.
              </p>
            </section>

            {/* 10. CTA Simuler */}
            <section id="simuler" className="scroll-mt-24">
              <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center shadow-md sm:p-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Simule ta conversion brut / net
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80">
                  Tu connais maintenant la mécanique du salaire brut et net. Utilise nos
                  simulateurs pour obtenir un résultat précis, adapté à ta situation.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link href="/simulateurs/salaire-brut-net" className="inline-flex items-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
                    Convertir mon brut en net →
                  </Link>
                  <Link href="/simulateurs/net-apres-impot" className="inline-flex items-center rounded-xl border-2 border-primary bg-transparent px-6 py-3.5 text-base font-semibold text-primary transition hover:bg-primary/5">
                    Estimer mon net après impôt →
                  </Link>
                </div>
              </div>
            </section>

            {/* 11. FAQ */}
            <section id="faq" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><MessageCircleIcon className="h-4 w-4" /></IconBadge>
                Questions fréquentes
              </h2>
              <div className="mt-6 flex flex-col gap-4">
                {faq.map((item) => (
                  <details key={item.q} className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-foreground">
                      <span>{item.q}</span>
                      <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xl text-primary transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 text-base leading-relaxed text-foreground/80">{item.r}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* 12. Sources */}
            <section id="sources" className="scroll-mt-24">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <h2 className="flex items-center text-2xl font-bold tracking-tight text-foreground">
                  <IconBadge><ExternalLinkIcon className="h-4 w-4" /></IconBadge>
                  Sources
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {sourcesLinks.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline-offset-4 transition hover:underline">
                        {s.label}<span aria-hidden className="ml-1 text-xs">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs italic text-muted-foreground">
                  Dernière mise à jour : avril 2026. Ce guide est à vocation informative et ne
                  constitue pas un conseil fiscal ou juridique. Pour une analyse adaptée à votre
                  situation, consultez un expert-comptable ou un conseiller fiscal.
                  Rédigé par{" "}
                  <Link href="/a-propos" className="text-primary hover:underline">Nizar Laghrifi</Link>,
                  fondateur de Salairia.
                </p>
              </div>
            </section>
          </div>

          <TocSidebar items={tocItems} />
        </div>
      </div>
    </>
  );
}
