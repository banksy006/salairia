import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  ScaleIcon,
  CalculatorIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  RocketIcon,
  BriefcaseIcon,
  AlertTriangleIcon,
  CompassIcon,
  EuroIcon,
  BarChartIcon,
  LightbulbIcon,
  TargetIcon,
  InfoIcon,
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title: "TJM freelance 2026 : calculer son taux journalier moyen",
  description:
    "Guide complet du TJM freelance 2026 : formule de calcul, TJM médian par métier (dev, data, design, conseil), variations géographiques, négociation. Sources officielles.",
  alternates: { canonical: "/guides/tjm-freelance" },
  openGraph: {
    title: "TJM freelance 2026 : calculer son taux journalier moyen | Salairia",
    description:
      "Formule de calcul, TJM médian par métier, variations géographiques, conseils de négociation.",
    url: "/guides/tjm-freelance",
  },
};

const faq = [
  {
    q: "Quelle est la formule pour calculer son TJM ?",
    r: "La formule la plus utilisée est : TJM = (Revenu net annuel souhaité + Charges + Frais pro) / Nombre de jours facturables dans l'année. Pour un auto-entrepreneur, on majore le salaire net souhaité d'environ 30 % pour les cotisations URSSAF. Pour les autres statuts (portage, SASU, EURL), les charges avoisinent 50 % : il faut donc doubler le revenu net souhaité avant de diviser par les jours facturables.",
  },
  {
    q: "Combien de jours facturables faut-il prévoir par an ?",
    r: "La plupart des freelances retiennent entre 120 et 180 jours facturables par an, soit 60 à 75 % d'une année standard (environ 220 jours ouvrés). La différence couvre les congés, la prospection, la comptabilité, les formations et les périodes d'intermission. Un freelance en début d'activité retient plutôt 120 jours ; un freelance très booké peut monter à 180 voire 200 jours.",
  },
  {
    q: "Quel est le TJM médian en France pour un freelance ?",
    r: "Selon le baromètre Malt 2026, le TJM médian pour un profil confirmé tous secteurs confondus se situe autour de 450 €/jour, avec une moyenne autour de 470 €/jour. Le TJM médian varie fortement selon le métier, l'ancienneté, la zone géographique (Paris concentre les plus hauts TJM) et le type de client (grand compte vs PME).",
  },
  {
    q: "Le TJM est-il HT ou TTC ?",
    r: "Le TJM est toujours indiqué HT (hors taxes). La TVA s'ajoute ensuite selon votre statut : un auto-entrepreneur sous le seuil de franchise TVA facture en franchise ; au-dessus du seuil, il ajoute 20 % de TVA. En portage, la société de portage gère la TVA à votre place. En SASU et EURL, la société est assujettie à la TVA dès sa création sauf cas particuliers.",
  },
  {
    q: "Faut-il facturer à la journée ou au forfait ?",
    r: "Le TJM est adapté aux missions dont le périmètre évolue (conseil, développement agile, accompagnement). Le forfait convient aux livrables bien définis (un site web, un audit, un rapport). Beaucoup de freelances combinent les deux : TJM pour les missions longues chez le même client, forfait pour les prestations ponctuelles. Un forfait doit intégrer une marge de sécurité (+20-30 %) pour absorber les dépassements.",
  },
  {
    q: "Comment augmenter son TJM avec un client existant ?",
    r: "L'augmentation se négocie idéalement à la fin d'une mission ou au moment du renouvellement. Les leviers : nouveau périmètre, montée en expertise, nouveau livrable, comparaison marché (grille Malt ou étude Hays). Une hausse de 5 à 15 % par an est raisonnable pour un freelance confirmé qui monte en compétence. Au-delà, il faut souvent changer de client pour repartir sur un nouveau tarif.",
  },
  {
    q: "TJM en portage salarial vs en auto-entreprise : pourquoi un tel écart ?",
    r: "À revenu net équivalent, le TJM en portage salarial doit être plus élevé qu'en auto-entreprise car les charges sont plus lourdes (environ 50 % vs environ 22 %). Concrètement, pour viser 3 500 € nets/mois, il faut environ 400 €/jour en auto-entreprise contre environ 550 €/jour en portage. Notre simulateur TJM compare directement les 4 statuts : auto-entrepreneur, portage, SASU, EURL.",
  },
  {
    q: "Mon TJM est-il en phase avec le marché ?",
    r: "Les baromètres publics à consulter : Malt (grille par métier), Free-Work (tech/IT), Hays et Silkhom pour les profils tech, Jobbers pour les évolutions sectorielles. Comparez sur deux axes : votre métier précis (pas juste 'consultant') et votre séniorité (junior moins de 3 ans, confirmé 3-7 ans, senior plus de 7 ans). Un écart de ±15 % avec le médian est normal selon votre client et votre zone.",
  },
];

const sourcesLinks = [
  { label: "Malt — baromètre des tarifs freelance", href: "https://www.malt.fr/t/barometre-tarifs" },
  { label: "Free-Work — grilles TJM par métier tech", href: "https://www.free-work.com/fr/tech-it" },
  { label: "Silkhom — baromètre TJM informatique et digital", href: "https://www.silkhom.com/barometre-des-tjm-informatique-electronique-digital/" },
  { label: "Hays France — études salariales annuelles", href: "https://www.hays.fr" },
  { label: "Jobbers — étude TJM freelance 2026", href: "https://www.jobbers.io/fr/etude-2025-levolution-des-tjm-freelance-en-france-par-secteur/" },
  { label: "Blog du Modérateur — TJM freelance IT", href: "https://www.blogdumoderateur.com/freelances-taux-journaliers-moyens-it-france-2025/" },
  { label: "URSSAF — cotisations auto-entrepreneur", href: "https://www.urssaf.fr" },
  { label: "INSEE — travailleurs indépendants", href: "https://www.insee.fr" },
  { label: "DARES — travail indépendant", href: "https://dares.travail-emploi.gouv.fr" },
];

const tocItems = [
  { id: "definition", label: "Définition" },
  { id: "calcul", label: "Calculer son TJM" },
  { id: "metiers", label: "TJM par métier" },
  { id: "statut", label: "TJM par statut" },
  { id: "jours", label: "Jours facturables" },
  { id: "frais", label: "Frais à inclure" },
  { id: "negociation", label: "Négocier" },
  { id: "augmenter", label: "Augmenter son TJM" },
  { id: "bas", label: "Pièges d'un TJM bas" },
  { id: "geographie", label: "Paris vs régions" },
  { id: "simuler", label: "Simuler" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function GuideTjmFreelancePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "TJM freelance 2026 : calculer son taux journalier moyen",
      description:
        "Guide complet du TJM freelance 2026 : formule, grilles par métier, variations par statut et par zone, conseils de négociation.",
      author: { "@type": "Person", name: "Nizar Laghrifi", url: `${SITE_URL}/a-propos` },
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      datePublished: "2026-04-23",
      dateModified: "2026-04-23",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/guides/tjm-freelance`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: "TJM freelance", item: `${SITE_URL}/guides/tjm-freelance` },
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
            <span className="text-foreground">TJM freelance</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
            <CalendarIcon className="h-3.5 w-3.5" />
            À jour avril 2026
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            TJM freelance 2026 : le guide complet
          </h1>
          <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
            Calcul, grilles par métier, négociation
          </p>

          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground/80">
            <p>
              Le <strong>Taux Journalier Moyen (TJM)</strong> est la brique
              centrale de votre rémunération en freelance. Il conditionne vos
              revenus, votre positionnement sur le marché, votre capacité à
              investir dans votre activité et à traverser les périodes creuses.
              Ce guide couvre la formule de calcul, les grilles de TJM par
              métier en 2026, les variations selon le statut juridique et la
              zone géographique, ainsi que les leviers concrets pour le
              négocier et le faire évoluer.
            </p>
            <p className="text-sm text-muted-foreground">
              ⏱ Lecture : 11 min · Sources baromètres Malt, Free-Work, Hays,
              Silkhom, Jobbers —{" "}
              <Link href="/methodologie" className="text-primary hover:underline">méthodologie complète</Link>
            </p>
          </div>
        </section>

        <div className="mt-16 flex gap-12">
          <div className="min-w-0 flex-1 space-y-16">

            {/* 1. Définition */}
            <section id="definition" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><BriefcaseIcon className="h-4 w-4" /></IconBadge>
                Qu&apos;est-ce que le TJM et pourquoi il compte ?
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Le <strong>TJM (Taux Journalier Moyen)</strong> est le tarif
                  hors taxes qu&apos;un freelance facture à son client pour une
                  journée de prestation. Il est exprimé en euros HT par jour
                  (€/j). Il ne correspond pas à votre salaire net quotidien :
                  entre le CA encaissé et le net perçu, il y a les cotisations
                  sociales (22 à 50 % selon le statut), les frais
                  professionnels, la TVA selon votre situation, et les jours
                  non facturés (congés, prospection, formation).
                </p>
                <p>
                  Le TJM est au freelance ce que le salaire annuel brut est au
                  salarié : un indicateur de positionnement marché, un levier
                  de négociation, et un signal envoyé au marché sur votre
                  niveau d&apos;expertise. Un TJM mal calculé, trop bas ou trop
                  haut, peut saboter une activité en quelques mois.
                </p>
                <p>
                  Sa valeur médiane en France en 2026, selon le baromètre Malt,
                  se situe autour de <strong>450 €/jour pour un profil
                  confirmé</strong> tous secteurs confondus, avec une moyenne
                  autour de 470 €/jour. Les écarts entre les métiers sont
                  importants : un développeur web confirmé se situe autour de
                  500-650 €/jour, un data scientist expérimenté autour de
                  700-900 €/jour, un expert IA peut atteindre 1 000 à
                  1 500 €/jour.
                </p>
              </div>
            </section>

            {/* 2. Calcul */}
            <section id="calcul" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                Comment calculer son TJM : 3 méthodes
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Trois méthodes coexistent pour fixer son TJM. La bonne pratique
                est de les <strong>croiser</strong> pour définir une fourchette
                et trancher à l&apos;intérieur en fonction de votre client et
                de votre positionnement.
              </p>

              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Méthode 1 — Revenu net souhaité
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Vous partez du salaire net annuel que vous voulez atteindre
                    et vous remontez au TJM nécessaire.
                  </p>
                  <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-5 text-sm">
                    <p className="font-mono text-primary">
                      TJM = (Revenu net annuel souhaité + Charges + Frais pro)
                      / Jours facturables
                    </p>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Les charges varient selon le statut :
                  </p>
                  <ul className="mt-3 space-y-2 text-base text-foreground/80">
                    <li>• <strong>Auto-entrepreneur</strong> — majorer le net souhaité d&apos;environ <strong>30 %</strong> (cotisations URSSAF 21,8 à 25,6 % + frais pro non déductibles).</li>
                    <li>• <strong>Portage, SASU, EURL</strong> — charges proches de <strong>50 %</strong> : il faut quasi <strong>doubler</strong> le net souhaité avant de diviser par les jours facturables.</li>
                  </ul>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Exemple : pour viser 3 500 €/mois nets (42 000 €/an) en
                    portage, avec 160 jours facturables :
                    (42 000 × 2) / 160 = <strong>525 €/jour HT</strong>.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Méthode 2 — Benchmark marché
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Vous regardez les grilles publiques par métier et
                    séniorité, puis vous vous positionnez dans la fourchette
                    selon votre expertise et votre réseau. Les baromètres
                    Malt, Free-Work, Silkhom, Hays et Jobbers publient chaque
                    année ces données. Voir la grille détaillée en section
                    suivante.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Méthode 3 — Valeur créée pour le client
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Vous partez du ROI pour le client. Un consultant qui aide
                    une entreprise à économiser 500 000 €/an peut légitimement
                    facturer 1 500 €/jour, même si la grille « consultant
                    stratégie senior » plafonne à 1 200 €. Cette méthode est
                    la plus subjective mais la plus rémunératrice quand elle
                    s&apos;applique. Elle suppose de pouvoir quantifier
                    l&apos;impact de la prestation.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. TJM par métier */}
            <section id="metiers" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><BarChartIcon className="h-4 w-4" /></IconBadge>
                TJM médian par métier en France 2026
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Les grilles ci-dessous agrègent les baromètres Malt 2026,
                Free-Work, Silkhom et Hays. Les fourchettes couvrent le
                junior-confirmé ; les profils seniors ou experts dépassent
                régulièrement le haut de la fourchette.
              </p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Métier</th>
                      <th className="px-5 py-3 text-right">TJM junior</th>
                      <th className="px-5 py-3 text-right">TJM confirmé</th>
                      <th className="px-5 py-3 text-right">TJM senior</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Développeur frontend", "350 €", "500 €", "650 €"],
                      ["Développeur backend", "400 €", "550 €", "750 €"],
                      ["Développeur fullstack", "400 €", "550 €", "750 €"],
                      ["Développeur mobile (iOS / Android)", "400 €", "600 €", "800 €"],
                      ["Data analyst / BI", "400 €", "550 €", "700 €"],
                      ["Data scientist / ML engineer", "500 €", "750 €", "950 €"],
                      ["Expert IA / LLM", "600 €", "900 €", "1 500 €"],
                      ["DevOps / SRE", "500 €", "700 €", "950 €"],
                      ["Cloud architect", "600 €", "850 €", "1 100 €"],
                      ["Expert cybersécurité", "600 €", "850 €", "1 200 €"],
                      ["Chef de projet tech / PMO", "450 €", "600 €", "800 €"],
                      ["Product manager / Product owner", "500 €", "700 €", "900 €"],
                      ["UX / UI designer", "400 €", "600 €", "800 €"],
                      ["Designer produit (senior)", "500 €", "700 €", "900 €"],
                      ["Consultant stratégie", "600 €", "850 €", "1 500 €"],
                      ["Consultant digital / growth", "400 €", "600 €", "850 €"],
                      ["SEO / SEA", "350 €", "500 €", "750 €"],
                      ["Rédacteur / copywriter", "300 €", "500 €", "700 €"],
                    ].map(([metier, j, c, s]) => (
                      <tr key={metier} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold text-foreground">{metier}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{j}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{c}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{s}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Données indicatives 2026. Les fourchettes bougent selon la
                région (Paris en haut), le type de client (grand compte en
                haut) et la rareté des compétences. Les sources sont listées
                en bas de page.
              </p>
            </section>

            {/* 4. TJM par statut */}
            <section id="statut" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ScaleIcon className="h-4 w-4" /></IconBadge>
                TJM par statut juridique
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Un TJM identique ne donne pas le même net selon le statut, à
                cause du poids des cotisations. À CA égal, un
                auto-entrepreneur conserve environ 75-80 % du montant facturé,
                un salarié en portage environ 45-55 %, un dirigeant de SASU
                50-55 % en mix salaire+dividendes, une gérance EURL 55-60 %.
              </p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">TJM facturé</th>
                      <th className="px-5 py-3 text-right">Auto-entrepreneur</th>
                      <th className="px-5 py-3 text-right">Portage salarial</th>
                      <th className="px-5 py-3 text-right">SASU / EURL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["400 €/j", "~2 520 €", "~1 700 €", "~2 000 €"],
                      ["500 €/j", "~3 150 €", "~2 150 €", "~2 500 €"],
                      ["600 €/j", "~3 780 €", "~2 600 €", "~3 000 €"],
                      ["800 €/j", "~5 040 €", "~3 500 €", "~4 000 €"],
                      ["1 000 €/j", "~6 300 €", "~4 400 €", "~5 000 €"],
                    ].map(([tjm, ae, portage, societe]) => (
                      <tr key={tjm} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold text-foreground">{tjm}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{ae}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{portage}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{societe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                Estimations nettes mensuelles pour 18 jours travaillés/mois,
                hors impôt sur le revenu. L&apos;auto-entreprise est plafonnée
                à 77 700 € de CA annuel en BNC libéral, soit environ 850 €/j
                sur 12 mois avec 8 jours par mois — au-delà, elle n&apos;est
                plus accessible.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Link href="/guides/portage-salarial" className="rounded-xl border border-border bg-white p-4 text-sm font-medium text-primary shadow-sm transition hover:shadow-md hover:border-primary">
                  Guide portage salarial →
                </Link>
                <Link href="/guides/auto-entrepreneur" className="rounded-xl border border-border bg-white p-4 text-sm font-medium text-primary shadow-sm transition hover:shadow-md hover:border-primary">
                  Guide auto-entrepreneur →
                </Link>
                <Link href="/guides/sasu-eurl" className="rounded-xl border border-border bg-white p-4 text-sm font-medium text-primary shadow-sm transition hover:shadow-md hover:border-primary">
                  Guide SASU vs EURL →
                </Link>
              </div>
            </section>

            {/* 5. Jours facturables */}
            <section id="jours" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalendarIcon className="h-4 w-4" /></IconBadge>
                Jours facturables : l&apos;autre variable critique
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                À TJM égal, passer de 120 à 180 jours facturables par an change
                le revenu de +50 %. Les freelances débutants sous-estiment
                souvent ce paramètre en imaginant facturer 200+ jours
                dès la première année — c&apos;est rarement le cas.
              </p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Profil</th>
                      <th className="px-5 py-3 text-right">Jours facturables / an</th>
                      <th className="px-5 py-3">Commentaire</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Freelance débutant", "100 à 130 j", "Prospection intensive, démarrage progressif"],
                      ["Freelance confirmé avec régie longue", "160 à 180 j", "1 client principal, mission de plusieurs mois"],
                      ["Freelance confirmé multi-clients", "140 à 170 j", "Alternance entre 2-3 clients, plus de switch cost"],
                      ["Freelance très booké", "180 à 200 j", "Rare, suppose une demande constante"],
                      ["Freelance expert à fort TJM", "80 à 130 j", "Choix délibéré : moins de jours, plus cher"],
                    ].map(([profil, jours, commentaire]) => (
                      <tr key={profil} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold text-foreground">{profil}</td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{jours}</td>
                        <td className="px-5 py-2.5 text-foreground/80">{commentaire}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                La différence entre 220 jours ouvrés (année pleine) et les 140
                à 180 facturables couvre :
              </p>
              <ul className="mt-3 space-y-2 text-base text-foreground/80">
                <li>• <strong>Congés</strong> — 25 à 30 jours incompressibles si vous voulez tenir dans la durée.</li>
                <li>• <strong>Prospection et commercial</strong> — 15 à 30 jours, beaucoup plus en phase de démarrage.</li>
                <li>• <strong>Comptabilité et administratif</strong> — 10 à 20 jours selon le statut (le portage en économise beaucoup).</li>
                <li>• <strong>Formation continue et veille</strong> — 10 à 20 jours, nécessaires dans les métiers tech qui évoluent vite.</li>
                <li>• <strong>Inter-missions</strong> — 10 à 30 jours, surtout en multi-clients.</li>
              </ul>
            </section>

            {/* 6. Frais à inclure */}
            <section id="frais" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><EuroIcon className="h-4 w-4" /></IconBadge>
                Le TJM tout inclus : ce qu&apos;il faut intégrer
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Un TJM salarié naïvement sur « ce que je veux toucher » oublie
                des coûts structurels qui pèsent lourd sur l&apos;année. Les
                intégrer dans la formule évite les mauvaises surprises 12 mois
                plus tard.
              </p>

              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: BriefcaseIcon, t: "Prévoyance et mutuelle", d: "En auto-entreprise, la couverture de base est faible (pas d'indemnités journalières les 3 premiers jours, pension d'invalidité limitée). Budgéter 100 à 200 €/mois pour une vraie couverture santé + prévoyance." },
                  { icon: AlertTriangleIcon, t: "Assurance RC Pro", d: "Obligatoire dans la plupart des domaines conseil et tech. 300 à 800 €/an selon le périmètre (RC + cyber selon activité)." },
                  { icon: CalendarIcon, t: "Congés et arrêts maladie", d: "Non rémunérés en AE, SASU ou EURL (sauf sur le brut via salaire). Il faut provisionner 6 à 10 % du TJM pour couvrir 1 mois de congés." },
                  { icon: RocketIcon, t: "Formation continue", d: "Indispensable pour maintenir la valeur marché. 1 500 à 5 000 €/an selon le métier." },
                  { icon: CalculatorIcon, t: "Comptabilité et logiciels", d: "De 0 €/an (AE simple) à 2 500 €/an (SASU/EURL avec expert-comptable + outils)." },
                  { icon: TargetIcon, t: "Équipement pro", d: "Ordinateur, logiciels, matériel métier : budgétez 2 000 à 5 000 €/an en amortissement." },
                ].map((item) => (
                  <li key={item.t} className="rounded-xl border border-border bg-white p-5 shadow-sm">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-foreground">{item.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">{item.d}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-lg border-l-4 border-primary bg-primary/5 p-4 text-sm">
                <p className="flex items-start gap-2 text-primary">
                  <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Règle de pouce : sur 100 € facturés HT, prévoyez environ
                    <strong> 8 à 12 € de frais pros structurels</strong>{" "}
                    (hors cotisations sociales et impôts). Intégrer ces frais
                    dans la formule évite de s&apos;appauvrir lentement sans
                    comprendre pourquoi.
                  </span>
                </p>
              </div>
            </section>

            {/* 7. Négocier son TJM */}
            <section id="negociation" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><LightbulbIcon className="h-4 w-4" /></IconBadge>
                Comment négocier son TJM
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                La négociation du TJM se joue en amont (avant la signature) et
                en aval (au renouvellement). Cinq leviers concrets :
              </p>

              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    1. Ne pas annoncer son TJM en premier
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    La première information chiffrée ancre la négociation.
                    Poussez le client à révéler son budget ou la fourchette
                    qu&apos;il a prévue en demandant des questions ouvertes :
                    «&nbsp;Quel budget avez-vous alloué à ce poste ?&nbsp;» ou
                    «&nbsp;Quelle fourchette retenez-vous pour ce niveau
                    d&apos;expertise ?&nbsp;». Si le client insiste, donnez
                    une fourchette plutôt qu&apos;un chiffre fixe.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    2. Négocier sur la valeur, pas sur le temps
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    «&nbsp;Je facture 700 €/jour&nbsp;» est défensif.
                    «&nbsp;Mon intervention vous fait économiser 80 000 €/an
                    sur 12 mois, pour un coût total de 60 000 €&nbsp;» est
                    offensif. Quand la valeur créée est quantifiable, le TJM
                    devient une métrique secondaire.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    3. S&apos;appuyer sur les grilles publiques
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Un client qui tente de tirer le prix vers le bas est
                    désarmé par une grille Malt ou Hays imprimée. Ce
                    n&apos;est pas votre avis contre le sien, c&apos;est votre
                    métier face au marché. Conservez ces PDFs dans vos
                    favoris.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    4. Accepter de perdre des missions
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Si toutes vos missions convergent au même TJM sans
                    résistance, vous sous-facturez. Un taux de refus sain se
                    situe entre 20 et 40 % des propositions budgétaires.
                    Au-delà, vous êtes peut-être hors marché ; en deçà, vous
                    avez de la marge pour monter.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    5. Négocier le périmètre en parallèle
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Si le client plafonne son budget, négociez en retour sur
                    le périmètre (moins de livrables, moins de réunions, pas
                    de disponibilité hors horaires) ou sur les conditions
                    (acompte à la signature, paiement à 30 jours maximum,
                    clause de révision annuelle).
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Quand augmenter */}
            <section id="augmenter" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><TargetIcon className="h-4 w-4" /></IconBadge>
                Quand et comment augmenter son TJM
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                L&apos;augmentation du TJM devrait être annuelle, pas
                exceptionnelle. Quatre signaux justifient une hausse :
              </p>

              <ul className="mt-6 space-y-4">
                {[
                  { t: "Signal 1 — Vous êtes systématiquement choisi", d: "Quand vous remportez plus de 70 % de vos propositions, vous êtes probablement en dessous du marché. Montez de 10 à 15 %." },
                  { t: "Signal 2 — Nouvelle compétence ou certification", d: "Une certification AWS, un portfolio renouvelé, une expertise en IA : chaque ajout justifie une révision. Ne le gardez pas pour vous — capitalisez." },
                  { t: "Signal 3 — Passage de junior à confirmé ou senior", d: "Les grilles marché varient de 30 à 60 % entre deux paliers. Le passage est subtil (pas de diplôme qui l'indique) — vous devez le proclamer vous-même sur votre profil et dans vos propositions." },
                  { t: "Signal 4 — Le marché bouge", d: "Certains segments (IA, cyber, cloud architect) ont connu +20 à +40 % en 2 ans. Ne pas suivre, c'est perdre. Consultez les baromètres annuels et ajustez en conséquence." },
                ].map((s) => (
                  <li key={s.t} className="flex gap-3 rounded-lg border-l-4 border-accent bg-accent/5 p-4">
                    <LightbulbIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground">{s.t}</p>
                      <p className="mt-1 text-sm text-foreground/80">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-base leading-relaxed text-foreground/80">
                <strong>Pour l&apos;exécution</strong> : annoncez la hausse 2
                à 3 mois avant le renouvellement ou la fin de mission, par
                écrit, avec un argumentaire factuel (nouvelles compétences,
                grille marché, résultats obtenus). Une hausse raisonnable :
                <strong> 5 à 15 % par an</strong> pour un client existant. Au-delà,
                il faut généralement changer de client pour repartir sur un
                nouveau tarif.
              </p>
            </section>

            {/* 9. TJM bas */}
            <section id="bas" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><AlertTriangleIcon className="h-4 w-4" /></IconBadge>
                Les pièges d&apos;un TJM trop bas
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Un TJM sous-évalué paraît rassurant au démarrage — plus
                facile à vendre, moins de risque de refus. En réalité, il
                crée trois problèmes structurels :
              </p>

              <ul className="mt-6 space-y-4">
                {[
                  { t: "Piège 1 — Exclusion des clients premium", d: "Les grands comptes et les missions stratégiques ne recrutent pas au bas de la grille. Un TJM trop bas signale un manque d'expertise ou un manque de confiance. Vous êtes filtré avant même l'entretien." },
                  { t: "Piège 2 — Cercle vicieux du volume", d: "Pour compenser un TJM faible, vous augmentez les jours facturables. Plus de jours = moins de temps pour monter en compétence, moins de temps pour prospecter des clients mieux payants. Vous vous enfermez dans un plafond." },
                  { t: "Piège 3 — Difficulté à remonter", d: "Un client payé 350 €/jour ne passe pas volontiers à 550 €/jour sans raison objective. Le TJM initial devient une ancre durable. Mieux vaut fixer haut dès le départ et céder 10-15 % en négociation que l'inverse." },
                ].map((p) => (
                  <li key={p.t} className="flex gap-3 rounded-lg border-l-4 border-destructive bg-destructive/5 p-4">
                    <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                    <div>
                      <p className="font-semibold text-foreground">{p.t}</p>
                      <p className="mt-1 text-sm text-foreground/80">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* 10. Géographie */}
            <section id="geographie" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CompassIcon className="h-4 w-4" /></IconBadge>
                Paris, régions et missions à distance
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Le marché freelance français reste fortement concentré en
                Île-de-France, avec des écarts de TJM significatifs entre la
                capitale et les régions. Selon les baromètres 2026 :
              </p>

              <ul className="mt-4 space-y-2 text-base text-foreground/80">
                <li>• <strong>Île-de-France</strong> — TJM moyen autour de 610-620 €/jour sur les profils tech confirmés.</li>
                <li>• <strong>Autres grandes métropoles</strong> (Lyon, Marseille, Nantes, Bordeaux, Lille, Toulouse) — écart de 5 à 15 % sous Paris sur les mêmes profils.</li>
                <li>• <strong>Villes secondaires</strong> — écart de 15 à 25 % sous Paris, compensé pour certains par un coût de vie plus bas.</li>
                <li>• <strong>Missions offshore ou à distance pure</strong> — certains clients appliquent une décote de 20 à 30 % pour du 100 % remote depuis l&apos;étranger.</li>
              </ul>

              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Deux tendances récentes redessinent la carte :
              </p>
              <ul className="mt-3 space-y-2 text-base text-foreground/80">
                <li>• <strong>Hybride / télétravail partiel</strong> — la plupart des missions tech accepte 2-3 jours/semaine sur site, ce qui permet aux freelances hors IDF d&apos;accéder aux clients parisiens en conservant ~80-90 % du TJM francilien.</li>
                <li>• <strong>Missions internationales</strong> — un freelance français peut désormais facturer en USD ou GBP pour des clients anglo-saxons, avec des TJM 20 à 40 % supérieurs au marché FR. Cadre légal à sécuriser au préalable, voir notre <Link href="/guides/portage-salarial#international" className="text-primary hover:underline">section sur le portage à l&apos;international</Link>.</li>
              </ul>
            </section>

            {/* 11. CTA Simuler */}
            <section id="simuler" className="scroll-mt-24">
              <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center shadow-md sm:p-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Simule ton TJM selon ton statut
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80">
                  Saisis ton salaire net cible ou ton TJM cible, et compare
                  instantanément les 4 statuts (auto-entrepreneur, portage,
                  SASU, EURL) sur la même base.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link href="/simulateurs/tjm-freelance" className="inline-flex items-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
                    Lancer le simulateur TJM →
                  </Link>
                  <Link href="/comparateurs/portage-salarial" className="inline-flex items-center rounded-xl border-2 border-primary bg-transparent px-6 py-3.5 text-base font-semibold text-primary transition hover:bg-primary/5">
                    Comparer les sociétés de portage
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
                  Dernière mise à jour : avril 2026. Les fourchettes de TJM
                  varient selon la région, le client et la rareté de la
                  compétence. Ce guide est à vocation informative. Rédigé par{" "}
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
