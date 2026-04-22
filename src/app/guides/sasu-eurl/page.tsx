import type { Metadata } from "next";
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
  title: "SASU vs EURL : le guide complet 2026 | Salairia",
  description:
    "SASU ou EURL ? Comparatif détaillé 2026 : charges sociales, IS, dividendes, protection sociale, création. Guide indépendant pour choisir le bon statut.",
  alternates: {
    canonical: "/guides/sasu-eurl",
  },
  openGraph: {
    title: "SASU vs EURL : le guide complet 2026 | Salairia",
    description:
      "SASU ou EURL ? Comparatif détaillé 2026 : charges sociales, IS, dividendes, protection sociale, création.",
    url: "/guides/sasu-eurl",
  },
};

const faq = [
  {
    q: "Quelle est la différence fondamentale entre SASU et EURL ?",
    r: "La SASU est une Société par Actions Simplifiée Unipersonnelle dont le président est assimilé-salarié (régime général). L\u2019EURL est une Entreprise Unipersonnelle à Responsabilité Limitée dont le gérant majoritaire est travailleur non salarié (TNS). Cette différence de régime social entraîne des écarts majeurs sur les charges, la protection sociale et la fiscalité des dividendes.",
  },
  {
    q: "Combien coûte la création d\u2019une SASU ou EURL ?",
    r: "En faisant vous-même les démarches (rédaction des statuts, dépôt au greffe, annonce légale), comptez entre 200 et 500 €. En passant par un prestataire en ligne comme Legalstart ou Captain Contrat, les tarifs varient de 500 à 1 500 € selon les options (rédaction sur mesure, accompagnement comptable). Le capital social minimum est de 1 € dans les deux cas.",
  },
  {
    q: "Peut-on passer de EURL à SASU ?",
    r: "Oui, la transformation est possible sans dissolution. Il faut modifier les statuts, publier une annonce légale et déclarer le changement au guichet unique de l\u2019INPI. Le coût est d\u2019environ 500 à 1 500 € (frais de greffe + annonce légale + éventuellement avocat). L\u2019opération inverse (SASU vers EURL) est également possible.",
  },
  {
    q: "Le dirigeant de SASU a-t-il droit au chômage ?",
    r: "Non. Le président de SASU est assimilé-salarié mais ne cotise pas à l\u2019assurance chômage. Il ne peut pas bénéficier de l\u2019ARE en cas de cessation d\u2019activité. De même, le gérant d\u2019EURL ne cotise pas au chômage. Pour bénéficier du chômage, il faut se tourner vers le portage salarial ou une assurance privée (GSC, APPI).",
  },
  {
    q: "Faut-il un expert-comptable ?",
    r: "Ce n\u2019est pas une obligation légale, mais c\u2019est fortement recommandé. La SASU comme l\u2019EURL sont soumises à des obligations comptables strictes : bilan, compte de résultat, liasse fiscale, assemblée générale annuelle. Un expert-comptable coûte entre 100 et 300 €/mois selon la complexité de votre activité.",
  },
  {
    q: "Peut-on avoir 0 € de rémunération ?",
    r: "Oui, dans les deux structures. En SASU, si vous ne vous versez aucun salaire, vous ne payez aucune charge sociale (mais vous n\u2019acquérez aucun droit). En EURL, le gérant TNS doit payer des cotisations minimales même sans rémunération (environ 1 100 €/an en 2026). C\u2019est un point important à considérer en début d\u2019activité.",
  },
  {
    q: "Quelle structure pour une levée de fonds ?",
    r: "La SASU est nettement plus adaptée. Sa forme juridique (SAS) est la structure standard du capital-risque en France. Elle permet d\u2019émettre des actions de préférence, des BSA, des BSPCE, et de faire entrer facilement de nouveaux associés. L\u2019EURL, basée sur des parts sociales, est beaucoup plus rigide pour accueillir des investisseurs.",
  },
  {
    q: "SASU ou EURL pour un freelance IT ?",
    r: "Cela dépend de votre stratégie de rémunération. Si votre TJM est élevé (600 €+) et que vous souhaitez optimiser via les dividendes, la SASU est souvent plus avantageuse grâce à la flat tax sans charges sociales. Si vous privilégiez un salaire régulier avec des charges moindres, l\u2019EURL est intéressante. Dans tous les cas, simulez les deux scénarios avec vos chiffres réels.",
  },
];

const sourcesLinks = [
  { label: "service-public.fr — créer une société unipersonnelle", href: "https://www.service-public.fr" },
  { label: "Legifrance — Code de commerce", href: "https://www.legifrance.gouv.fr" },
  { label: "URSSAF — cotisations TNS et assimilé-salarié", href: "https://www.urssaf.fr" },
  { label: "LégiSocial — barèmes cotisations sociales 2026", href: "https://www.legisocial.fr" },
  { label: "lecoindesentrepreneurs.fr — SASU vs EURL", href: "https://www.lecoindesentrepreneurs.fr" },
];

const tocItems = [
  { id: "definition", label: "Définitions" },
  { id: "creation", label: "Création" },
  { id: "charges", label: "Charges sociales" },
  { id: "is", label: "Impôt sur les sociétés" },
  { id: "dividendes", label: "Dividendes" },
  { id: "protection", label: "Protection sociale" },
  { id: "remuneration", label: "Rémunération" },
  { id: "avantages", label: "Avantages / inconvénients" },
  { id: "choisir", label: "Comment choisir" },
  { id: "simuler", label: "Simuler" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function GuideSasuEurlPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "SASU vs EURL : le guide complet 2026",
      description: "SASU ou EURL ? Comparatif détaillé 2026 : charges sociales, IS, dividendes, protection sociale, création.",
      author: { "@type": "Person", name: "Nizar Laghrifi", url: "https://salairia.fr/a-propos" },
      publisher: { "@type": "Organization", name: "Salairia", url: "https://salairia.fr" },
      datePublished: "2026-04-15",
      dateModified: "2026-04-15",
      inLanguage: "fr-FR",
      url: "https://salairia.fr/guides/sasu-eurl",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://salairia.fr/" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "https://salairia.fr/guides" },
        { "@type": "ListItem", position: 3, name: "SASU vs EURL", item: "https://salairia.fr/guides/sasu-eurl" },
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
            <span className="text-foreground">SASU vs EURL</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
            <CalendarIcon className="h-3.5 w-3.5" />
            À jour avril 2026
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            SASU vs EURL : le guide complet 2026
          </h1>
          <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
            Charges, dividendes, protection sociale et simulation
          </p>

          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground/80">
            <p>
              La SASU et l&apos;EURL sont les deux structures juridiques les plus
              utilisées par les entrepreneurs solo en France. Chaque année, environ
              300 000 SASU et 200 000 EURL sont créées. Pourtant, le choix entre
              les deux reste un casse-tête pour la majorité des créateurs : régime
              social, charges, dividendes, protection — tout diffère. Ce guide
              compare les deux statuts point par point pour vous aider à choisir
              en connaissance de cause.
            </p>
            <p className="text-sm text-muted-foreground">
              ⏱ Lecture : 14 min · Données vérifiées sur les{" "}
              <Link href="/methodologie" className="text-primary hover:underline">
                sources officielles
              </Link>
            </p>
          </div>
        </section>

        <div className="mt-16 flex gap-12">
          <div className="min-w-0 flex-1 space-y-16">

            {/* 1. Définitions */}
            <section id="definition" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><BriefcaseIcon className="h-4 w-4" /></IconBadge>
                SASU et EURL : définitions
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  La <strong>SASU</strong> (Société par Actions Simplifiée Unipersonnelle) est
                  la forme unipersonnelle de la SAS. Le dirigeant est appelé <strong>président</strong> et
                  relève du régime général de la sécurité sociale en tant qu&apos;assimilé-salarié.
                  C&apos;est la structure préférée des startups et des freelances à forte valeur ajoutée.
                </p>
                <p>
                  L&apos;<strong>EURL</strong> (Entreprise Unipersonnelle à Responsabilité Limitée)
                  est la forme unipersonnelle de la SARL. Le dirigeant est appelé <strong>gérant
                  majoritaire</strong> et relève du régime des travailleurs non salariés (TNS).
                  C&apos;est une structure historique, appréciée pour ses charges sociales plus faibles.
                </p>
                <p>
                  Les deux sont soumises à l&apos;impôt sur les sociétés (IS) par défaut, avec
                  une option possible pour l&apos;impôt sur le revenu (IR) pendant les 5 premières
                  années. La responsabilité est limitée aux apports dans les deux cas.
                </p>
              </div>

              {/* 2-column comparison cards */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border-2 border-primary bg-white p-6 shadow-sm">
                  <p className="text-lg font-bold text-primary">SASU</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Société par Actions Simplifiée Unipersonnelle
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                    <li><strong>Dirigeant :</strong> Président</li>
                    <li><strong>Régime social :</strong> Assimilé-salarié (régime général)</li>
                    <li><strong>Fiscalité :</strong> IS par défaut</li>
                    <li><strong>Capital minimum :</strong> 1 €</li>
                    <li><strong>Responsabilité :</strong> Limitée aux apports</li>
                    <li><strong>Dividendes :</strong> Flat tax 30 % uniquement</li>
                  </ul>
                </div>
                <div className="rounded-xl border-2 border-accent bg-white p-6 shadow-sm">
                  <p className="text-lg font-bold text-accent">EURL</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Entreprise Unipersonnelle à Responsabilité Limitée
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                    <li><strong>Dirigeant :</strong> Gérant majoritaire</li>
                    <li><strong>Régime social :</strong> TNS (travailleur non salarié)</li>
                    <li><strong>Fiscalité :</strong> IS par défaut</li>
                    <li><strong>Capital minimum :</strong> 1 €</li>
                    <li><strong>Responsabilité :</strong> Limitée aux apports</li>
                    <li><strong>Dividendes :</strong> Flat tax 30 % + charges TNS au-delà de 10 % du capital</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. Création */}
            <section id="creation" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><RocketIcon className="h-4 w-4" /></IconBadge>
                Créer sa SASU ou EURL
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                Les étapes sont identiques pour les deux structures. Voici le parcours en 5 étapes.
              </p>

              <ol className="mt-8 flex flex-col gap-0">
                {[
                  { t: "Rédiger les statuts", d: "Les statuts définissent les règles de fonctionnement de votre société : objet social, capital, siège, modalités de prise de décision. En SASU, les statuts sont très libres. En EURL, ils sont plus encadrés par le Code de commerce. Vous pouvez utiliser un modèle en ligne ou faire appel à un prestataire (Legalstart, Captain Contrat)." },
                  { t: "Déposer le capital social", d: "Le capital minimum est de 1 € dans les deux cas, mais un capital de 500 à 1 000 € est recommandé pour la crédibilité. Le dépôt se fait sur un compte bancaire professionnel bloqué. La banque délivre une attestation de dépôt nécessaire pour l\u2019immatriculation." },
                  { t: "Publier une annonce légale", d: "Obligatoire pour toute création de société. Le coût est fixé par arrêté : environ 150 à 200 € selon le département. L\u2019annonce doit paraître dans un journal d\u2019annonces légales (JAL) habilité." },
                  { t: "Immatriculer via le guichet unique INPI", d: "Depuis 2023, toutes les formalités passent par le guichet unique de l\u2019INPI (procedures.inpi.fr). Vous déposez vos statuts, l\u2019attestation de dépôt de capital, l\u2019annonce légale et un formulaire en ligne. Le greffe délivre votre extrait Kbis sous 3 à 7 jours." },
                  { t: "Ouvrir un compte professionnel", d: "Une fois le Kbis obtenu, débloquez les fonds et ouvrez votre compte bancaire professionnel définitif. Comparez les néobanques (Qonto, Shine) et les banques traditionnelles selon vos besoins." },
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

              <div className="mt-8 rounded-xl border-l-4 border-primary bg-primary/5 p-5">
                <p className="text-sm text-primary">
                  <strong>Budget création :</strong> Comptez 200 à 500 € en faisant tout vous-même (greffe + annonce légale).
                  En passant par un prestataire en ligne, les forfaits vont de 500 à 1 500 € tout compris.
                  Les deux structures ont exactement le même coût de création.
                </p>
              </div>
            </section>

            {/* 3. Charges sociales */}
            <section id="charges" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                Charges sociales comparées
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  C&apos;est <strong>la différence la plus importante</strong> entre SASU et EURL.
                  Le président de SASU, assimilé-salarié, supporte des charges sociales d&apos;environ
                  62 % du salaire brut (42 % de cotisations patronales + 22 % de cotisations
                  salariales). Le gérant d&apos;EURL, en TNS, paie environ 45 % de cotisations
                  sur sa rémunération nette.
                </p>
                <p>
                  Concrètement, pour un même revenu net, la SASU coûte significativement plus
                  cher à l&apos;entreprise. Mais cette différence de coût s&apos;explique par une
                  protection sociale bien supérieure en SASU.
                </p>
              </div>

              {/* Comparison table */}
              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Poste</th>
                      <th className="px-5 py-3 text-center">SASU</th>
                      <th className="px-5 py-3 text-center">EURL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Régime social", "Assimilé-salarié", "TNS"],
                      ["Cotisations patronales", "~42 % du brut", "—"],
                      ["Cotisations salariales", "~22 % du brut", "—"],
                      ["Cotisations TNS", "—", "~45 % du net"],
                      ["Coût total pour 40 k€ net", "~72 800 €", "~58 000 €"],
                      ["Écart annuel", "", "~14 800 € en faveur de l\u2019EURL"],
                    ].map(([poste, sasu, eurl]) => (
                      <tr key={poste} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold text-foreground">{poste}</td>
                        <td className="px-5 py-2.5 text-center text-foreground/80">{sasu}</td>
                        <td className="px-5 py-2.5 text-center text-foreground/80">{eurl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Concrete example */}
              <div className="mt-6 rounded-xl bg-muted/30 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Exemple concret</p>
                <p className="mt-2 text-base leading-relaxed text-foreground/80">
                  Pour vous verser <strong>40 000 € net par an</strong>, votre société devra débourser
                  environ <strong className="text-primary">72 800 € en SASU</strong> (salaire brut
                  + charges patronales) contre <strong className="text-accent">58 000 € en EURL</strong> (rémunération
                  + cotisations TNS). Soit un écart de <strong>14 800 €/an</strong> en faveur de
                  l&apos;EURL — à condition d&apos;accepter une protection sociale moindre.
                </p>
              </div>

              <p className="mt-4 text-base text-foreground/80">
                <strong>Simule les charges avec tes chiffres</strong> :{" "}
                <Link href="/simulateurs/sasu-eurl" className="font-semibold text-primary hover:underline">
                  comparateur SASU vs EURL →
                </Link>
              </p>
            </section>

            {/* 4. Impôt sur les sociétés */}
            <section id="is" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                L&apos;impôt sur les sociétés (IS)
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Bonne nouvelle : <strong>l&apos;IS est identique en SASU et en EURL</strong>.
                  Les deux structures sont soumises au même barème progressif :
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Tranche de bénéfice</th>
                      <th className="px-5 py-3 text-right">Taux IS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-5 py-2.5 text-foreground">Jusqu&apos;à 42 500 €</td>
                      <td className="px-5 py-2.5 text-right font-semibold tabular-nums text-accent">15 %</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-2.5 text-foreground">Au-delà de 42 500 €</td>
                      <td className="px-5 py-2.5 text-right font-semibold tabular-nums text-foreground">25 %</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Le taux réduit de 15 % s&apos;applique sous conditions : CA inférieur à
                  10 M€ et capital entièrement libéré, détenu à 75 % minimum par des
                  personnes physiques. En pratique, la quasi-totalité des SASU et EURL
                  en bénéficient.
                </p>
                <p>
                  <strong>IS ou IR ?</strong> Les deux structures peuvent opter pour l&apos;impôt
                  sur le revenu (IR) pendant leurs 5 premières années d&apos;existence.
                  L&apos;option IR est intéressante si votre tranche marginale d&apos;imposition
                  est inférieure à 25 %, ou si vous souhaitez imputer les déficits de
                  la société sur votre revenu personnel. Au-delà, l&apos;IS est généralement
                  plus avantageux car les bénéfices réinvestis dans l&apos;entreprise ne sont
                  imposés qu&apos;à 15 ou 25 %.
                </p>
              </div>
            </section>

            {/* 5. Dividendes */}
            <section id="dividendes" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ScaleIcon className="h-4 w-4" /></IconBadge>
                Dividendes : la vraie différence
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Si les charges sociales sont le premier point de divergence, la fiscalité
                  des dividendes est le second — et il est souvent sous-estimé. C&apos;est
                  pourtant ici que la <strong>SASU prend un avantage décisif</strong> pour
                  les entrepreneurs à fort bénéfice.
                </p>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border-2 border-primary bg-white p-6 shadow-sm">
                  <p className="text-lg font-bold text-primary">SASU</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    Les dividendes sont soumis uniquement à la <strong>flat tax de 30 %</strong> (12,8 %
                    d&apos;impôt sur le revenu + 17,2 % de prélèvements sociaux). <strong>Aucune
                    charge sociale supplémentaire</strong>, quel que soit le montant distribué.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-primary">
                    100 000 € de dividendes → 70 000 € net
                  </p>
                </div>
                <div className="rounded-xl border-2 border-accent bg-white p-6 shadow-sm">
                  <p className="text-lg font-bold text-accent">EURL</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    La flat tax de 30 % ne s&apos;applique que sur la fraction des dividendes
                    inférieure à <strong>10 % du capital social</strong>. Au-delà, les dividendes
                    sont soumis aux <strong>cotisations TNS (~45 %)</strong> en plus des
                    prélèvements sociaux.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-accent">
                    100 000 € de dividendes → ~52 000 € net (capital de 1 000 €)
                  </p>
                </div>
              </div>

              {/* Warning card */}
              <div className="mt-6 flex gap-3 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
                <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div>
                  <p className="font-semibold text-amber-900">Le piège du capital à 1 000 €</p>
                  <p className="mt-1 text-sm text-amber-800">
                    Avec un capital social de 1 000 € (le cas standard), le seuil de 10 % ne
                    représente que <strong>100 € de dividendes</strong>. En EURL, la quasi-totalité
                    des dividendes distribués sera donc soumise aux cotisations TNS (~45 %),
                    en plus de l&apos;impôt sur le revenu. C&apos;est un coût considérable que
                    beaucoup de créateurs découvrent trop tard. Augmenter le capital peut
                    réduire cet impact, mais le levier reste limité comparé à la SASU.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  <strong>En résumé :</strong> si vous prévoyez de distribuer une part importante
                  de vos bénéfices en dividendes, la SASU est nettement plus avantageuse.
                  En EURL, il est préférable de privilégier la rémunération du gérant
                  plutôt que les dividendes.
                </p>
              </div>
            </section>

            {/* 6. Protection sociale */}
            <section id="protection" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ShieldIcon className="h-4 w-4" /></IconBadge>
                Protection sociale
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Le régime social du dirigeant a un impact direct sur sa couverture
                  maladie, sa retraite et sa prévoyance. Voici un comparatif détaillé
                  des prestations selon le statut.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Protection</th>
                      <th className="px-5 py-3 text-center">SASU (assimilé-salarié)</th>
                      <th className="px-5 py-3 text-center">EURL (TNS)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Assurance maladie", "Régime général (identique cadre)", "Régime général (remboursements identiques)"],
                      ["Indemnités journalières maladie", "Oui, dès le 4e jour (comme un salarié)", "Oui, mais après 3 jours de carence et montant plafonné"],
                      ["Retraite de base", "Régime général (meilleure valorisation)", "SSI — validation identique en trimestres"],
                      ["Retraite complémentaire", "AGIRC-ARRCO (obligatoire, bien valorisée)", "RCI (retraite complémentaire TNS, moins avantageuse)"],
                      ["Prévoyance décès/invalidité", "Incluse (régime cadre)", "Minimale — contrat Madelin recommandé"],
                      ["Assurance chômage", "Non", "Non"],
                      ["Mutuelle obligatoire", "Non (pas de salarié = pas d\u2019obligation)", "Non"],
                    ].map(([protection, sasu, eurl]) => (
                      <tr key={protection} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold text-foreground">{protection}</td>
                        <td className="px-5 py-2.5 text-center text-foreground/80">{sasu}</td>
                        <td className="px-5 py-2.5 text-center text-foreground/80">{eurl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 rounded-xl border-l-4 border-primary bg-primary/5 p-5">
                <p className="text-sm text-primary">
                  <strong>Ni SASU ni EURL ne donnent droit au chômage.</strong> Pour bénéficier de
                  l&apos;ARE, il faut se tourner vers le{" "}
                  <Link href="/comparateurs/portage-salarial" className="font-semibold underline hover:no-underline">
                    portage salarial
                  </Link>{" "}
                  ou souscrire une assurance privée (GSC, APPI — environ 500 à 1 500 €/an).
                </p>
              </div>

              <p className="mt-4 text-base text-foreground/80">
                En EURL, il est fortement recommandé de souscrire un contrat Madelin
                (prévoyance + retraite complémentaire) pour compléter la couverture TNS.
                Ce surcoût réduit l&apos;écart de charges avec la SASU, mais offre plus
                de flexibilité dans le choix des garanties.
              </p>
            </section>

            {/* 7. Stratégie de rémunération */}
            <section id="remuneration" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                Stratégie de rémunération
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Le choix entre salaire et dividendes est un levier d&apos;optimisation
                  majeur. Voici trois stratégies types et leur pertinence selon la structure.
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BriefcaseIcon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-foreground">100 % salaire</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    Toute la rémunération passe en salaire (ou rémunération de gérant en EURL).
                    Maximise les droits sociaux (retraite, IJ maladie). Idéal si vous avez besoin
                    de bulletins de paie (crédit immobilier) ou si votre TMI est basse.
                  </p>
                  <p className="mt-3 text-xs font-semibold text-accent">Favorable à l&apos;EURL (charges moindres)</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ScaleIcon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-foreground">Mix salaire + dividendes</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    Vous vous versez un salaire suffisant pour valider 4 trimestres de retraite
                    (~7 000 €/an) et distribuez le reste en dividendes. C&apos;est la stratégie
                    d&apos;optimisation la plus courante, surtout en SASU.
                  </p>
                  <p className="mt-3 text-xs font-semibold text-primary">Favorable à la SASU (dividendes sans charges)</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <RocketIcon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-foreground">100 % dividendes</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    Zéro salaire, tout en dividendes. En SASU, vous ne payez que la flat tax (30 %)
                    mais n&apos;acquérez aucun droit social. En EURL, les cotisations TNS minimales
                    restent dues (~1 100 €/an) même sans rémunération.
                  </p>
                  <p className="mt-3 text-xs font-semibold text-primary">Favorable à la SASU (flat tax seule)</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border-l-4 border-primary bg-primary/5 p-5">
                <p className="text-sm text-primary">
                  <strong>Point clé :</strong> la SASU favorise une stratégie axée dividendes
                  (flat tax sans charges sociales), tandis que l&apos;EURL favorise une stratégie
                  axée salaire (charges TNS plus faibles que le régime général). Choisissez
                  votre structure en fonction de votre stratégie de rémunération cible.
                </p>
              </div>
            </section>

            {/* 8. Avantages et inconvénients */}
            <section id="avantages" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ScaleIcon className="h-4 w-4" /></IconBadge>
                Avantages et inconvénients comparés
              </h2>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {/* SASU Pros */}
                <div className="rounded-xl border border-accent/40 bg-accent/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-accent">✅ Avantages SASU</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li>Protection sociale complète (assimilé-salarié, cadre)</li>
                    <li>Dividendes à la flat tax uniquement (30 %), sans charges sociales</li>
                    <li>Statuts très flexibles (libre organisation)</li>
                    <li>Structure idéale pour accueillir des investisseurs (BSPCE, actions de préférence)</li>
                    <li>Image perçue plus « startup / moderne »</li>
                    <li>Pas de cotisations minimales si 0 € de rémunération</li>
                  </ul>
                </div>

                {/* SASU Cons */}
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-destructive">❌ Inconvénients SASU</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li>Charges sociales sur salaire très élevées (~62 % du brut)</li>
                    <li>Bulletins de paie obligatoires (coût comptable supplémentaire)</li>
                    <li>Pas de droit au chômage</li>
                    <li>Coût de gestion comptable plus élevé qu&apos;en EURL</li>
                    <li>Formalisme annuel (PV d&apos;assemblée, dépôt des comptes)</li>
                  </ul>
                </div>

                {/* EURL Pros */}
                <div className="rounded-xl border border-accent/40 bg-accent/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-accent">✅ Avantages EURL</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li>Charges sociales sur rémunération plus faibles (~45 % du net)</li>
                    <li>Pas de bulletins de paie (rémunération de gérant directe)</li>
                    <li>Cadre juridique très encadré (moins de risque de nullité des statuts)</li>
                    <li>Option IR possible (transparence fiscale) les 5 premières années</li>
                    <li>Coût de gestion comptable souvent inférieur</li>
                    <li>Cotisations TNS déductibles du bénéfice imposable</li>
                  </ul>
                </div>

                {/* EURL Cons */}
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-destructive">❌ Inconvénients EURL</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li>Dividendes lourdement taxés au-delà de 10 % du capital (charges TNS)</li>
                    <li>Protection sociale incomplète (retraite, prévoyance à compléter)</li>
                    <li>Cotisations minimales dues même sans rémunération (~1 100 €/an)</li>
                    <li>Pas de droit au chômage</li>
                    <li>Structure peu adaptée à l&apos;entrée d&apos;investisseurs</li>
                    <li>Régularisation N+1 des cotisations (décalage trésorerie)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 9. Comment choisir */}
            <section id="choisir" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><RocketIcon className="h-4 w-4" /></IconBadge>
                Comment choisir entre SASU et EURL
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Il n&apos;existe pas de réponse universelle. Le bon choix dépend de votre
                  situation personnelle, de votre stratégie de rémunération et de vos projets
                  à moyen terme. Voici un arbre de décision simplifié :
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  { condition: "Vous voulez une protection sociale maximale", result: "→ SASU", color: "border-primary bg-primary/5 text-primary" },
                  { condition: "Vous voulez minimiser vos charges sociales", result: "→ EURL", color: "border-accent bg-accent/5 text-accent" },
                  { condition: "Vous prévoyez de distribuer des dividendes", result: "→ SASU", color: "border-primary bg-primary/5 text-primary" },
                  { condition: "Vous préférez tout prendre en salaire", result: "→ EURL", color: "border-accent bg-accent/5 text-accent" },
                  { condition: "Vous envisagez une levée de fonds ou des associés", result: "→ SASU", color: "border-primary bg-primary/5 text-primary" },
                  { condition: "Vous voulez un cadre juridique simple et balisé", result: "→ EURL", color: "border-accent bg-accent/5 text-accent" },
                  { condition: "Vous démarrez sans CA et voulez éviter les charges minimales", result: "→ SASU", color: "border-primary bg-primary/5 text-primary" },
                  { condition: "Vous êtes freelance IT avec un TJM élevé (600 €+)", result: "→ SASU (dividendes)", color: "border-primary bg-primary/5 text-primary" },
                ].map((item) => (
                  <div key={item.condition} className={`flex items-center justify-between rounded-xl border-l-4 p-4 ${item.color}`}>
                    <span className="text-sm text-foreground/80">{item.condition}</span>
                    <span className="ml-4 shrink-0 text-sm font-bold">{item.result}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  En pratique, la tendance est à la SASU pour les profils à forte rémunération
                  qui optimisent via les dividendes, et à l&apos;EURL pour ceux qui privilégient
                  la simplicité et veulent maximiser leur revenu immédiat en salaire.
                </p>
                <p>
                  N&apos;oubliez pas que le choix n&apos;est pas définitif : il est possible de
                  transformer une EURL en SASU (et inversement) moyennant des frais de quelques
                  centaines d&apos;euros.
                </p>
              </div>
            </section>

            {/* 10. CTA Simuler */}
            <section id="simuler" className="scroll-mt-24">
              <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center shadow-md sm:p-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Simule ton revenu en SASU et EURL
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80">
                  Tu connais maintenant les différences entre les deux statuts. Utilise nos
                  simulateurs pour comparer ton revenu net avec tes propres chiffres.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link href="/simulateurs/sasu-eurl" className="inline-flex items-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
                    Compare SASU et EURL avec tes chiffres →
                  </Link>
                  <Link href="/simulateurs/tjm-freelance" className="inline-flex items-center rounded-xl border-2 border-primary bg-transparent px-6 py-3.5 text-base font-semibold text-primary transition hover:bg-primary/5">
                    Compare les 4 statuts freelance →
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
