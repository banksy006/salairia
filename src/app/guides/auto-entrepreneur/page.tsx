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
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title: "Auto-entrepreneur : le guide complet 2026 | Salairia",
  description:
    "Tout savoir sur le statut auto-entrepreneur en 2026 : création, charges URSSAF, ACRE, TVA, plafonds, versement libératoire. Guide indépendant + simulateur gratuit.",
  alternates: {
    canonical: "/guides/auto-entrepreneur",
  },
  openGraph: {
    title: "Auto-entrepreneur : le guide complet 2026 | Salairia",
    description:
      "Tout savoir sur le statut auto-entrepreneur en 2026 : création, charges URSSAF, ACRE, TVA, plafonds, versement libératoire.",
    url: "/guides/auto-entrepreneur",
  },
};

const faq = [
  {
    q: "Peut-on être auto-entrepreneur et salarié en même temps ?",
    r: "Oui, le cumul est autorisé sans restriction de chiffre d\u2019affaires. Vous devez simplement respecter votre clause d\u2019exclusivité ou de non-concurrence si votre contrat de travail en contient une. Votre employeur n\u2019a pas besoin d\u2019être informé, sauf disposition contraire dans votre convention collective.",
  },
  {
    q: "Comment déclarer son chiffre d\u2019affaires ?",
    r: "La déclaration se fait en ligne sur autoentrepreneur.urssaf.fr, mensuellement ou trimestriellement selon l\u2019option choisie à la création. Vous déclarez le CA encaissé (et non facturé) sur la période. La déclaration est obligatoire même si le CA est nul : vous indiquez alors 0 €.",
  },
  {
    q: "Quand payer ses cotisations URSSAF ?",
    r: "Les cotisations sont prélevées automatiquement après chaque déclaration de chiffre d\u2019affaires. Si vous déclarez mensuellement, le prélèvement a lieu le mois suivant la période déclarée. En trimestriel, les échéances sont les 30 avril, 31 juillet, 31 octobre et 31 janvier.",
  },
  {
    q: "L\u2019auto-entrepreneur peut-il embaucher ?",
    r: "Oui, rien ne l\u2019interdit légalement. En pratique, c\u2019est très rare car le régime n\u2019est pas adapté : vous ne pouvez pas déduire les salaires de vos charges, et le coût d\u2019un salarié s\u2019ajoute à vos cotisations forfaitaires. Si vous avez besoin de recruter, il est préférable de passer en SASU ou EURL.",
  },
  {
    q: "Comment facturer en auto-entrepreneur ?",
    r: "Vos factures doivent mentionner : votre nom, SIRET, adresse, la mention « EI » (entrepreneur individuel), le détail de la prestation, le montant HT, et la mention « TVA non applicable, art. 293 B du CGI » si vous êtes en franchise. Depuis 2026, la facturation électronique via Chorus Pro devient progressivement obligatoire.",
  },
  {
    q: "Que se passe-t-il si mon CA est nul ?",
    r: "Vous ne payez aucune cotisation : c\u2019est le principe du régime forfaitaire. En revanche, vous ne validez aucun trimestre de retraite. Si votre CA reste nul pendant 2 années civiles consécutives (8 trimestres), votre micro-entreprise est automatiquement radiée par l\u2019URSSAF.",
  },
  {
    q: "L\u2019auto-entrepreneur a-t-il droit au chômage ?",
    r: "Non, les cotisations micro-entrepreneur ne couvrent pas l\u2019assurance chômage. Depuis 2019, l\u2019ATI (Allocation des Travailleurs Indépendants) existe mais ses conditions sont très restrictives : il faut justifier d\u2019au moins 2 ans d\u2019activité et d\u2019un revenu antérieur minimum de 10 000 €/an. Le montant est plafonné à ~800 €/mois pendant 6 mois.",
  },
  {
    q: "Comment fermer son auto-entreprise ?",
    r: "La cessation d\u2019activité se déclare en ligne sur le guichet unique (guichet-unique.inpi.fr). Elle prend effet immédiatement. Vous devez ensuite effectuer une dernière déclaration de CA dans les 30 jours suivant la cessation et payer les cotisations correspondantes. Pensez aussi à déclarer les revenus de l\u2019année en cours aux impôts.",
  },
];

const sourcesLinks = [
  { label: "autoentrepreneur.urssaf.fr — portail officiel URSSAF", href: "https://www.autoentrepreneur.urssaf.fr" },
  { label: "service-public.fr — micro-entreprise", href: "https://www.service-public.fr" },
  { label: "economie.gouv.fr — statut auto-entrepreneur", href: "https://www.economie.gouv.fr" },
  { label: "guichet-unique.inpi.fr — création d\u2019entreprise", href: "https://www.guichet-unique.inpi.fr" },
  { label: "impots.gouv.fr — versement libératoire", href: "https://www.impots.gouv.fr" },
];

const tocItems = [
  { id: "definition", label: "Définition" },
  { id: "creation", label: "Création" },
  { id: "charges", label: "Charges 2026" },
  { id: "acre", label: "ACRE" },
  { id: "tva", label: "TVA" },
  { id: "plafonds", label: "Plafonds CA" },
  { id: "versement-liberatoire", label: "Vers. libératoire" },
  { id: "avantages", label: "Avantages / Inconvén." },
  { id: "comparatif", label: "vs autres statuts" },
  { id: "quitter", label: "Quand quitter" },
  { id: "simuler", label: "Simuler" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function GuideAutoEntrepreneurPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Auto-entrepreneur : le guide complet 2026",
      description: "Tout savoir sur le statut auto-entrepreneur en 2026 : création, charges URSSAF, ACRE, TVA, plafonds, versement libératoire.",
      author: { "@type": "Person", name: "Nizar Laghrifi", url: `${SITE_URL}/a-propos` },
      publisher: { "@type": "Organization", name: "Salairia", url: `${SITE_URL}` },
      datePublished: "2026-04-15",
      dateModified: "2026-04-15",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/guides/auto-entrepreneur`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: "Auto-entrepreneur", item: `${SITE_URL}/guides/auto-entrepreneur` },
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
            <span className="text-foreground">Auto-entrepreneur</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
            <CalendarIcon className="h-3.5 w-3.5" />
            À jour avril 2026
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Auto-entrepreneur : le guide complet 2026
          </h1>
          <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
            Création, charges, plafonds et simulation
          </p>

          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground/80">
            <p>
              Le statut d&apos;auto-entrepreneur (officiellement « micro-entrepreneur »
              depuis 2016) est le régime le plus simple et le plus populaire pour
              lancer une activité indépendante en France. Avec plus de 4 millions de
              micro-entrepreneurs actifs en 2026, il séduit par sa création gratuite
              en 15 minutes, ses cotisations proportionnelles au chiffre d&apos;affaires
              et l&apos;absence totale de comptabilité. Ce guide couvre tout ce que vous
              devez savoir : de la création à la sortie du régime, en passant par
              les charges URSSAF, l&apos;ACRE, la TVA, les plafonds et le versement
              libératoire.
            </p>
            <p className="text-sm text-muted-foreground">
              ⏱ Lecture : 15 min · Données vérifiées sur les{" "}
              <Link href="/methodologie" className="text-primary hover:underline">
                sources officielles
              </Link>
            </p>
          </div>
        </section>

        <div className="mt-16 flex gap-12">
          <div className="min-w-0 flex-1 space-y-16">

            {/* 1. Définition */}
            <section id="definition" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><BriefcaseIcon className="h-4 w-4" /></IconBadge>
                Qu&apos;est-ce que l&apos;auto-entrepreneur ?
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  L&apos;auto-entrepreneur est un <strong>entrepreneur individuel</strong> qui
                  bénéficie du régime fiscal et social simplifié de la micro-entreprise.
                  Créé en 2009 pour encourager l&apos;entrepreneuriat, ce statut a été
                  fusionné avec celui de micro-entrepreneur en 2016 : les deux termes
                  désignent désormais exactement la même chose.
                </p>
                <p>
                  Le cadre juridique repose sur la <strong>loi PACTE de 2019</strong>, qui a
                  simplifié la création d&apos;entreprise et relevé les plafonds de chiffre
                  d&apos;affaires. L&apos;auto-entrepreneur n&apos;est pas une forme juridique distincte :
                  c&apos;est un régime fiscal et social appliqué à l&apos;entreprise individuelle (EI).
                  Depuis la loi du 14 février 2022, le patrimoine personnel de l&apos;entrepreneur
                  individuel est automatiquement protégé — seul le patrimoine professionnel
                  répond des dettes de l&apos;activité.
                </p>
                <p>
                  Concrètement, l&apos;auto-entrepreneur paie ses cotisations sociales et,
                  éventuellement, son impôt sur le revenu sous forme d&apos;un{" "}
                  <strong>pourcentage fixe appliqué au chiffre d&apos;affaires encaissé</strong>.
                  Pas de CA = pas de charges. C&apos;est cette simplicité qui en fait le statut
                  préféré des créateurs d&apos;entreprise en France.
                </p>
              </div>

              <div className="mt-8 rounded-xl bg-muted/30 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">En résumé</p>
                <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                  <li><strong>Forme juridique :</strong> Entreprise Individuelle (EI)</li>
                  <li><strong>Régime fiscal :</strong> Micro-fiscal (abattement forfaitaire ou versement libératoire)</li>
                  <li><strong>Régime social :</strong> Micro-social simplifié (cotisations proportionnelles au CA)</li>
                  <li><strong>Comptabilité :</strong> Livre des recettes uniquement (pas de bilan, pas d&apos;expert-comptable)</li>
                  <li><strong>Responsabilité :</strong> Limitée au patrimoine professionnel depuis 2022</li>
                </ul>
              </div>
            </section>

            {/* 2. Création */}
            <section id="creation" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><RocketIcon className="h-4 w-4" /></IconBadge>
                Comment créer son auto-entreprise
              </h2>
              <p className="mt-2 text-base text-muted-foreground">La création est gratuite et prend environ 15 minutes en ligne.</p>

              <ol className="mt-8 flex flex-col gap-0">
                {[
                  { t: "Choisir le type d\u2019activité", d: "Déterminez si votre activité relève du BIC (vente de marchandises, artisanat) ou du BNC (prestations de services intellectuelles). Ce choix détermine vos taux de cotisations et vos plafonds de chiffre d\u2019affaires. En cas de doute, l\u2019URSSAF ou votre CCI peuvent vous orienter." },
                  { t: "Déclarer sur le guichet unique", d: "Rendez-vous sur guichet-unique.inpi.fr (le portail qui a remplacé l\u2019ancien site autoentrepreneur.urssaf.fr pour la création). Remplissez le formulaire en ligne avec votre pièce d\u2019identité. La déclaration est entièrement gratuite." },
                  { t: "Recevoir votre numéro SIRET", d: "L\u2019INSEE vous attribue un numéro SIRET sous 1 à 4 semaines. Ce numéro est indispensable pour facturer. En attendant, vous pouvez commencer à travailler avec l\u2019accusé de réception de votre déclaration." },
                  { t: "Ouvrir un compte bancaire dédié", d: "Si votre CA dépasse 10 000 € pendant 2 années consécutives, un compte dédié à l\u2019activité est obligatoire. Pas besoin d\u2019un compte professionnel : un second compte courant personnel suffit. En dessous de ce seuil, c\u2019est recommandé mais pas obligatoire." },
                  { t: "Commencer à facturer", d: "Dès réception de votre SIRET, vous pouvez émettre vos premières factures. N\u2019oubliez pas la mention de franchise de TVA si vous êtes en dessous des seuils. Votre première déclaration de CA aura lieu 90 jours après le début d\u2019activité." },
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 border-l-2 border-primary pb-8 pl-6 last:border-l-0 last:pb-0">
                    <div className="-ml-9 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{step.t}</h3>
                      <p className="mt-1 text-base leading-relaxed text-foreground/80">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
                <p className="text-sm text-primary">
                  <strong>Astuce :</strong> Pensez à demander l&apos;ACRE lors de votre déclaration si vous y
                  êtes éligible. La demande doit être faite <strong>au moment de la création</strong> ou dans les
                  45 jours suivants. Après ce délai, c&apos;est trop tard.
                </p>
              </div>
            </section>

            {/* 3. Charges et cotisations */}
            <section id="charges" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                Charges et cotisations 2026
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  En auto-entrepreneur, les cotisations sociales sont calculées comme un
                  pourcentage fixe du chiffre d&apos;affaires encaissé. Le taux dépend de la
                  nature de votre activité. Ces cotisations couvrent la maladie, la retraite
                  de base, la retraite complémentaire, les allocations familiales, la CSG et
                  la CRDS.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Type d&apos;activité</th>
                      <th className="px-5 py-3 text-right">Taux cotisations</th>
                      <th className="px-5 py-3 text-right">CFP</th>
                      <th className="px-5 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["BIC — Vente de marchandises", "12,3 %", "0,1 %", "12,4 %"],
                      ["BIC — Prestations de services", "21,2 %", "0,3 %", "21,5 %"],
                      ["BNC — Régime général (URSSAF)", "25,6 %", "0,2 %", "25,8 %"],
                      ["BNC — CIPAV (professions libérales)", "23,2 %", "0,2 %", "23,4 %"],
                    ].map(([cat, taux, cfp, total]) => (
                      <tr key={cat as string} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold text-foreground">{cat as string}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{taux as string}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{cfp as string}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums font-semibold text-foreground">{total as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong>CFP</strong> = Contribution à la Formation Professionnelle. Elle est collectée
                  en même temps que les cotisations URSSAF et vous donne accès à des droits
                  de formation via votre OPCO.
                </p>
                <p>
                  <strong>Exemple :</strong> pour un développeur freelance (BNC régime général) qui facture
                  5 000 €/mois, les cotisations s&apos;élèvent à 5 000 × 25,8 % = <strong>1 290 €</strong>.
                  Il conserve <strong>3 710 € avant impôt sur le revenu</strong>.
                </p>
              </div>

              <p className="mt-4 text-base text-foreground/80">
                <strong>Calcule tes charges exactes</strong> avec{" "}
                <Link href="/simulateurs/auto-entrepreneur" className="text-primary hover:underline">
                  notre simulateur auto-entrepreneur
                </Link>.
              </p>
            </section>

            {/* 4. ACRE */}
            <section id="acre" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ShieldIcon className="h-4 w-4" /></IconBadge>
                L&apos;ACRE en 2026 : ce qui a changé
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  L&apos;ACRE (Aide à la Création ou à la Reprise d&apos;Entreprise) permet aux
                  nouveaux auto-entrepreneurs de bénéficier d&apos;une réduction de cotisations
                  sociales pendant les 12 premiers mois d&apos;activité.
                </p>
                <p>
                  <strong>Réforme 2026 :</strong> le taux de réduction est passé de 50 % à
                  <strong> 25 %</strong> pour les nouvelles demandes. Concrètement, un
                  prestataire BNC (régime général) paiera 19,2 % au lieu de 25,6 % la première
                  année, contre 12,8 % avec l&apos;ancien dispositif. Le bénéfice reste
                  appréciable mais il est nettement moins généreux qu&apos;avant.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Activité</th>
                      <th className="px-5 py-3 text-right">Taux normal</th>
                      <th className="px-5 py-3 text-right">Taux ACRE 2026</th>
                      <th className="px-5 py-3 text-right">Économie / 10 k€ CA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["BIC Vente", "12,3 %", "9,2 %", "310 €"],
                      ["BIC Services", "21,2 %", "15,9 %", "530 €"],
                      ["BNC Régime général", "25,6 %", "19,2 %", "640 €"],
                      ["BNC CIPAV", "23,2 %", "17,4 %", "580 €"],
                    ].map(([cat, normal, acre, eco]) => (
                      <tr key={cat as string} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold text-foreground">{cat as string}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{normal as string}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-accent font-semibold">{acre as string}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{eco as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-3 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
                <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div>
                  <p className="font-semibold text-amber-900">Réduction moins avantageuse depuis 2026</p>
                  <p className="mt-1 text-sm text-amber-800">
                    Avec la réforme, l&apos;ACRE ne réduit plus les cotisations que de 25 % (contre 50 % auparavant).
                    L&apos;économie reste réelle mais elle ne doit plus être le critère principal de choix du statut.
                    N&apos;oubliez pas : la demande doit être faite dans les 45 jours suivant la création.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-base leading-relaxed text-foreground/80">
                <p><strong>Conditions d&apos;éligibilité :</strong></p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Ne pas avoir bénéficié de l&apos;ACRE dans les 3 années précédentes</li>
                  <li>Être demandeur d&apos;emploi (indemnisé ou non), bénéficiaire du RSA, de l&apos;ASS, de la PreParE, ou avoir entre 18 et 25 ans</li>
                  <li>Créer ou reprendre une entreprise (toute forme juridique)</li>
                  <li>En exercer effectivement le contrôle</li>
                </ul>
              </div>
            </section>

            {/* 5. TVA */}
            <section id="tva" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                TVA et franchise en base
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Par défaut, l&apos;auto-entrepreneur bénéficie de la <strong>franchise en base
                  de TVA</strong> : il ne facture pas de TVA à ses clients et ne la récupère
                  pas sur ses achats. C&apos;est un avantage compétitif en B2C (le prix est
                  identique au TTC d&apos;un concurrent assujetti) mais un inconvénient en B2B
                  (le client ne peut pas déduire de TVA sur vos factures).
                </p>
                <p>
                  Cette franchise s&apos;applique tant que votre chiffre d&apos;affaires ne dépasse
                  pas certains seuils, révisés régulièrement par l&apos;administration fiscale.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Type d&apos;activité</th>
                      <th className="px-5 py-3 text-right">Seuil franchise</th>
                      <th className="px-5 py-3 text-right">Seuil majoré (tolérance)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Prestations de services", "37 500 €", "41 250 €"],
                      ["Vente de marchandises", "85 000 €", "93 500 €"],
                    ].map(([cat, seuil, majore]) => (
                      <tr key={cat as string} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold text-foreground">{cat as string}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{seuil as string}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{majore as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  <strong>Comment ça fonctionne :</strong> si votre CA dépasse le seuil de franchise
                  mais reste sous le seuil majoré, vous bénéficiez d&apos;une tolérance pour
                  l&apos;année en cours. En revanche, si vous dépassez le seuil majoré, vous
                  devenez redevable de la TVA <strong>dès le premier jour du mois de
                  dépassement</strong>.
                </p>
                <p>
                  Si vous dépassez le seuil de franchise pendant deux années consécutives
                  (sans dépasser le seuil majoré), vous perdez la franchise au 1er janvier
                  de la troisième année.
                </p>
                <p>
                  Devenir assujetti à la TVA implique : facturer 20 % de TVA à vos clients,
                  déclarer la TVA mensuellement ou trimestriellement, et demander un numéro
                  de TVA intracommunautaire auprès de votre SIE (service des impôts des entreprises).
                </p>
              </div>

              <div className="mt-6 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
                <p className="text-sm text-primary">
                  <strong>Bon à savoir :</strong> vous pouvez opter volontairement pour la TVA même en dessous
                  des seuils. C&apos;est intéressant si vos clients sont des entreprises (B2B) et que vous
                  avez des achats importants (matériel informatique, sous-traitance) dont vous souhaitez
                  récupérer la TVA.
                </p>
              </div>
            </section>

            {/* 6. Plafonds CA */}
            <section id="plafonds" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ScaleIcon className="h-4 w-4" /></IconBadge>
                Plafonds de chiffre d&apos;affaires
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Le régime micro-entrepreneur est soumis à des plafonds de CA annuels.
                  Si vous les dépassez, vous basculez automatiquement vers le régime réel
                  d&apos;imposition — avec une comptabilité plus lourde et des cotisations
                  calculées différemment.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Type d&apos;activité</th>
                      <th className="px-5 py-3 text-right">Plafond annuel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["BIC — Vente de marchandises, hébergement, restauration", "203 100 €"],
                      ["BIC / BNC — Prestations de services", "83 600 €"],
                    ].map(([cat, plafond]) => (
                      <tr key={cat as string} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold text-foreground">{cat as string}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums font-semibold text-foreground">{plafond as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  <strong>Dépassement sur une seule année :</strong> vous restez auto-entrepreneur
                  l&apos;année du dépassement. Les plafonds sont proratisés si vous avez créé votre
                  activité en cours d&apos;année.
                </p>
                <p>
                  <strong>Dépassement deux années consécutives :</strong> vous basculez au régime réel
                  d&apos;imposition au 1er janvier de l&apos;année suivante. Vous devrez alors tenir une
                  comptabilité complète (bilan, compte de résultat), ce qui implique
                  généralement de faire appel à un expert-comptable.
                </p>
                <p>
                  Pour les activités mixtes (vente + services), chaque plafond s&apos;applique
                  séparément, et le CA global ne doit pas dépasser 203 100 €.
                </p>
              </div>

              <div className="mt-6 flex gap-3 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
                <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div>
                  <p className="font-semibold text-amber-900">Attention au prorata</p>
                  <p className="mt-1 text-sm text-amber-800">
                    Si vous créez votre activité le 1er juillet, votre plafond pour cette première
                    année est divisé par deux. Pour un prestataire de services : 83 600 / 2 = 41 800 €.
                    Dépassez ce montant et l&apos;année comptera comme un dépassement.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Versement libératoire */}
            <section id="versement-liberatoire" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                Le versement libératoire
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Le versement libératoire de l&apos;impôt sur le revenu permet de payer
                  votre impôt en même temps que vos cotisations URSSAF, sous forme d&apos;un
                  pourcentage supplémentaire appliqué au CA. Vous êtes alors libéré de
                  l&apos;impôt classique sur ces revenus d&apos;activité.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Type d&apos;activité</th>
                      <th className="px-5 py-3 text-right">Taux VL</th>
                      <th className="px-5 py-3 text-right">Cotisations + VL = Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["BIC — Vente de marchandises", "1,0 %", "13,3 %"],
                      ["BIC — Prestations de services", "1,7 %", "22,9 %"],
                      ["BNC — Activités libérales", "2,2 %", "27,8 %"],
                    ].map(([cat, vl, total]) => (
                      <tr key={cat as string} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold text-foreground">{cat as string}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{vl as string}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums font-semibold text-foreground">{total as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  <strong>Condition d&apos;éligibilité :</strong> votre revenu fiscal de référence (RFR) de
                  l&apos;avant-dernière année (N-2) ne doit pas dépasser environ <strong>28 800 € par
                  part de quotient familial</strong>. Ce seuil est revalorisé chaque année.
                </p>
                <p>
                  <strong>Quand c&apos;est avantageux :</strong> le versement libératoire est intéressant
                  si votre taux marginal d&apos;imposition est supérieur au taux du VL. Un
                  prestataire de services dans la tranche à 30 % économise 30 % − 1,7 % = 28,3
                  points sur l&apos;abattement. En revanche, si vous êtes non imposable ou dans la
                  tranche à 11 %, le VL vous fait payer plus d&apos;impôt que nécessaire.
                </p>
                <p>
                  <strong>Quand c&apos;est défavorable :</strong> si votre foyer fiscal est non imposable
                  (après abattement micro), vous payez un impôt que vous n&apos;auriez normalement
                  pas à payer. C&apos;est le cas de nombreux auto-entrepreneurs à faible CA ou
                  avec un conjoint aux revenus modestes.
                </p>
              </div>

              <p className="mt-4 text-base text-foreground/80">
                <strong>Simule l&apos;impact du versement libératoire</strong> avec{" "}
                <Link href="/simulateurs/auto-entrepreneur" className="text-primary hover:underline">
                  notre simulateur
                </Link>{" "}
                pour savoir s&apos;il est avantageux dans ta situation.
              </p>
            </section>

            {/* 8. Avantages et inconvénients */}
            <section id="avantages" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ScaleIcon className="h-4 w-4" /></IconBadge>
                Avantages et inconvénients
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-accent/40 bg-accent/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-accent">✅ Avantages</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li><strong>Simplicité maximale :</strong> création en 15 min, pas de comptabilité, déclaration en ligne trimestrielle ou mensuelle</li>
                    <li><strong>Charges réduites :</strong> 12 à 26 % du CA selon l&apos;activité, contre ~45 % en portage ou ~60 % en SASU</li>
                    <li><strong>Pas d&apos;expert-comptable :</strong> un simple livre des recettes suffit, pas de bilan ni de liasse fiscale</li>
                    <li><strong>Démarrage immédiat :</strong> vous pouvez commencer à travailler dès la déclaration, pas besoin d&apos;attendre le SIRET</li>
                    <li><strong>Cumul possible :</strong> compatible avec un emploi salarié, la retraite, les études ou les allocations chômage (sous conditions)</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-destructive">❌ Inconvénients</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li><strong>Pas de déduction de charges :</strong> les cotisations sont calculées sur le CA brut, pas sur le bénéfice. Si vos frais réels dépassent l&apos;abattement forfaitaire, vous perdez de l&apos;argent</li>
                    <li><strong>Protection sociale limitée :</strong> pas de chômage, indemnités journalières faibles, retraite proportionnelle au CA déclaré</li>
                    <li><strong>Plafonds de CA :</strong> 83 600 € en services, 203 100 € en vente. Au-delà, vous basculez au régime réel</li>
                    <li><strong>Pas de patrimoine d&apos;entreprise :</strong> vous ne pouvez pas revendre votre activité, céder des parts ou lever des fonds</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 9. Comparatif statuts */}
            <section id="comparatif" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ScaleIcon className="h-4 w-4" /></IconBadge>
                Auto-entrepreneur vs autres statuts
              </h2>
              <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-3 py-3 sm:px-5">Critère</th>
                      <th className="whitespace-nowrap px-3 py-3 sm:px-5">Auto-entr.</th>
                      <th className="whitespace-nowrap px-3 py-3 sm:px-5">Portage</th>
                      <th className="whitespace-nowrap px-3 py-3 sm:px-5">SASU</th>
                      <th className="whitespace-nowrap px-3 py-3 sm:px-5">EURL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Création", "Gratuite, 15 min", "Immédiate", "~300 € + statuts", "~300 € + statuts"],
                      ["Cotisations sociales", "12-26 % du CA", "~45 % du brut", "~65 % du net", "~45 % du net"],
                      ["Protection sociale", "Minimale", "Complète (salarié)", "Assimilé-salarié", "TNS"],
                      ["Chômage", "Non (ATI limitée)", "Oui (ARE)", "Non", "Non"],
                      ["Plafond CA", "83 600 / 203 100 €", "Aucun", "Aucun", "Aucun"],
                      ["Frais déductibles", "Non (abattement)", "Oui", "Oui", "Oui"],
                      ["Comptabilité", "Livre des recettes", "Aucune", "Bilan obligatoire", "Bilan obligatoire"],
                      ["Patrimoine / Revente", "Non", "Non", "Oui (parts)", "Oui (parts)"],
                      ["Idéal pour", "< 70 k€ CA", "> 3 k€/mois net", "Dividendes + IS", "Rému. immédiate"],
                    ].map(([critere, ...vals]) => (
                      <tr key={critere} className="border-b border-border last:border-b-0">
                        <td className="px-3 py-2.5 font-semibold text-foreground sm:px-5">{critere}</td>
                        {vals.map((v, i) => (
                          <td key={i} className={`px-3 py-2.5 sm:px-5 ${i === 0 ? "text-primary font-medium" : "text-foreground/80"}`}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Link href="/simulateurs/tjm-freelance" className="rounded-xl border border-border bg-white p-4 text-sm font-medium text-primary shadow-sm transition hover:shadow-md hover:border-primary">
                  Compare ton revenu selon les 4 statuts →
                </Link>
                <Link href="/simulateurs/sasu-eurl" className="rounded-xl border border-border bg-white p-4 text-sm font-medium text-primary shadow-sm transition hover:shadow-md hover:border-primary">
                  SASU ou EURL : le comparatif détaillé →
                </Link>
                <Link href="/guides/portage-salarial" className="rounded-xl border border-border bg-white p-4 text-sm font-medium text-primary shadow-sm transition hover:shadow-md hover:border-primary">
                  Guide complet du portage salarial →
                </Link>
              </div>
            </section>

            {/* 10. Quand quitter */}
            <section id="quitter" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><RocketIcon className="h-4 w-4" /></IconBadge>
                Quand quitter l&apos;auto-entrepreneur ?
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Le statut auto-entrepreneur est idéal pour démarrer, mais il peut
                  devenir un frein à mesure que votre activité se développe. Voici les
                  signaux qui indiquent qu&apos;il est temps d&apos;évoluer vers un autre statut :
                </p>
              </div>

              <ul className="mt-6 space-y-4">
                {[
                  { t: "Votre CA approche des plafonds", d: "Si vous atteignez régulièrement 70-80 % du plafond (soit ~60 000 € en services), il est judicieux d\u2019anticiper le changement plutôt que de subir un basculement subi au régime réel." },
                  { t: "Vos frais réels dépassent 30 % du CA", d: "L\u2019abattement forfaitaire (34 % en BNC, 50 % en BIC services, 71 % en BIC vente) est censé couvrir vos charges. Si vos frais réels sont supérieurs, vous payez des cotisations sur un bénéfice fictif. En SASU ou EURL, vous déduisez les charges réelles." },
                  { t: "Vous souhaitez vous verser des dividendes", d: "L\u2019auto-entrepreneur n\u2019a pas de notion de bénéfice distribuable. Si vous voulez optimiser votre rémunération entre salaire et dividendes (notamment en SASU à l\u2019IS), il faut créer une société." },
                  { t: "Vous avez besoin d\u2019une meilleure protection sociale", d: "Si vous souhaitez cotiser au chômage, bénéficier d\u2019une mutuelle d\u2019entreprise ou d\u2019indemnités journalières plus élevées, le portage salarial ou la SASU offrent une couverture supérieure." },
                ].map((item) => (
                  <li key={item.t} className="flex gap-3 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
                    <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <div>
                      <p className="font-semibold text-amber-900">{item.t}</p>
                      <p className="mt-1 text-sm text-amber-800">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-base text-foreground/80">
                Pour savoir quel statut serait le plus avantageux à votre niveau de CA,
                utilise{" "}
                <Link href="/simulateurs/tjm-freelance" className="text-primary hover:underline">
                  notre comparateur de statuts freelance
                </Link>.
              </p>
            </section>

            {/* 11. CTA Simuler */}
            <section id="simuler" className="scroll-mt-24">
              <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center shadow-md sm:p-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Simule tes charges auto-entrepreneur
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80">
                  Tu connais maintenant les règles du jeu. Utilise nos simulateurs
                  pour estimer tes cotisations, ton revenu net et comparer avec les
                  autres statuts.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link href="/simulateurs/auto-entrepreneur" className="inline-flex items-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
                    Simuler mes charges AE →
                  </Link>
                  <Link href="/simulateurs/tjm-freelance" className="inline-flex items-center rounded-xl border-2 border-primary bg-transparent px-6 py-3.5 text-base font-semibold text-primary transition hover:bg-primary/5">
                    Comparer les statuts →
                  </Link>
                </div>
              </div>
            </section>

            {/* 12. FAQ */}
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

            {/* 13. Sources */}
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
                  Dernière mise à jour : avril 2026. Ce guide est à vocation informative. Pour une
                  analyse adaptée à votre situation, consultez un expert-comptable ou un avocat spécialisé.
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
