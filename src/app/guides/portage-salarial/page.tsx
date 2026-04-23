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
  title: "Portage salarial : le guide complet 2026 | Salairia",
  description:
    "Tout savoir sur le portage salarial en 2026 : fonctionnement, salaire, avantages, inconvénients, cotisations, chômage. Guide indépendant + simulateur gratuit.",
  alternates: {
    canonical: "/guides/portage-salarial",
  },
  openGraph: {
    title: "Portage salarial : le guide complet 2026 | Salairia",
    description:
      "Tout savoir sur le portage salarial en 2026 : fonctionnement, salaire, avantages, inconvénients, cotisations, chômage.",
    url: "/guides/portage-salarial",
  },
};

const faq = [
  {
    q: "Le portage salarial est-il fait pour moi ?",
    r: "Si vous êtes consultant, formateur ou expert avec un TJM supérieur à 300 €/jour et que vous souhaitez bénéficier de la sécurité du salariat (chômage, retraite, mutuelle) sans créer de société, le portage est probablement adapté. Si votre CA est inférieur à 3 000 €/mois, l'auto-entreprise sera plus avantageuse financièrement.",
  },
  {
    q: "Combien coûte le portage salarial ?",
    r: "Les frais de gestion varient de 5 à 10 % du CA selon la société. En ajoutant les cotisations sociales (~45 %), vous conservez environ 45-55 % de votre chiffre d'affaires en salaire net. Pour un TJM de 500 €, cela représente environ 3 700 € net mensuel.",
  },
  {
    q: "Le portage salarial donne-t-il droit au chômage ?",
    r: "Oui. En tant que salarié porté en CDI, vous cotisez à l'assurance chômage. En cas de rupture conventionnelle ou de fin de mission prolongée, vous pouvez bénéficier de l'ARE dans les mêmes conditions qu'un salarié classique.",
  },
  {
    q: "Peut-on cumuler portage salarial et auto-entreprise ?",
    r: "Oui, à condition que les deux activités soient différentes. Vous ne pouvez pas facturer le même client via les deux statuts. Le cumul est courant chez les consultants qui ont une activité principale en portage et une activité secondaire en micro-entreprise.",
  },
  {
    q: "Le CDI en portage permet-il d'obtenir un crédit immobilier ?",
    r: "Oui, c'est l'un des arguments majeurs du portage. Les banques reconnaissent le CDI en portage salarial. Vos bulletins de paie réguliers et votre stabilité contractuelle facilitent l'accès au crédit, ce qui est beaucoup plus difficile en auto-entreprise ou en SASU.",
  },
  {
    q: "Quelle est la différence entre portage salarial et intérim ?",
    r: "En intérim, c'est l'agence qui vous trouve des missions et qui fixe les conditions. En portage salarial, c'est vous qui trouvez vos clients, négociez vos tarifs et choisissez vos missions. La société de portage ne gère que l'administratif et la paie.",
  },
  {
    q: "Faut-il un diplôme pour le portage salarial ?",
    r: "La convention collective exige un niveau Bac+2 minimum ou 3 ans d'expérience significative dans votre secteur d'activité. Cette condition vise à garantir que le salarié porté a l'autonomie nécessaire pour trouver et mener ses missions.",
  },
  {
    q: "Le portage salarial existe-t-il à l'international ?",
    r: "Oui. Certaines sociétés de portage (comme Ad'missions ou ITG) accompagnent les consultants sur des missions à l'étranger. La facturation se fait via la société française, et le consultant conserve sa protection sociale française. Les modalités varient selon le pays et la durée de la mission.",
  },
];

const sourcesLinks = [
  { label: "service-public.fr — portage salarial", href: "https://www.service-public.fr" },
  { label: "Legifrance — ordonnance du 2 avril 2015", href: "https://www.legifrance.gouv.fr" },
  { label: "Convention collective portage salarial (IDCC 3219)", href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/" },
  { label: "URSSAF — cotisations sociales", href: "https://www.urssaf.fr" },
  { label: "PEPS — syndicat professionnel du portage", href: "https://pfrh.peps-syndicat.fr" },
  { label: "INSEE — données marché du portage salarial", href: "https://www.insee.fr" },
];

const tocItems = [
  { id: "definition", label: "Définition" },
  { id: "fonctionnement", label: "Fonctionnement" },
  { id: "avantages", label: "Avantages" },
  { id: "inconvenients", label: "Inconvénients" },
  { id: "salaire", label: "Salaire" },
  { id: "cotisations", label: "Cotisations" },
  { id: "chomage", label: "Chômage et ARE" },
  { id: "eligibilite", label: "Éligibilité" },
  { id: "comparatif", label: "vs autres statuts" },
  { id: "choisir", label: "Choisir sa société" },
  { id: "simuler", label: "Simuler" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function GuidePortageSalarialPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Portage salarial : le guide complet 2026",
      description: "Tout savoir sur le portage salarial en 2026 : fonctionnement, salaire, avantages, inconvénients, cotisations, chômage.",
      author: { "@type": "Person", name: "Nizar Laghrifi", url: `${SITE_URL}/a-propos` },
      publisher: { "@type": "Organization", name: "Salairia", url: `${SITE_URL}` },
      datePublished: "2026-04-17",
      dateModified: "2026-04-17",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/guides/portage-salarial`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: "Portage salarial", item: `${SITE_URL}/guides/portage-salarial` },
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
            <span className="text-foreground">Portage salarial</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
            <CalendarIcon className="h-3.5 w-3.5" />
            À jour avril 2026
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Portage salarial : le guide complet 2026
          </h1>
          <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
            Fonctionnement, salaire, avantages et simulation
          </p>

          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground/80">
            <p>
              Le portage salarial permet à un professionnel indépendant de
              facturer ses clients tout en bénéficiant du statut de salarié :
              protection sociale complète, droit au chômage, bulletins de paie.
              En 2026, plus de 200 000 consultants en France utilisent ce statut.
              Ce guide couvre tout ce que vous devez savoir pour décider si le
              portage est adapté à votre situation.
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

            {/* 1. Définition */}
            <section id="definition" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><BriefcaseIcon className="h-4 w-4" /></IconBadge>
                Qu&apos;est-ce que le portage salarial ?
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Le portage salarial est une relation contractuelle <strong>tripartite</strong> entre
                  un consultant indépendant, une société de portage et une entreprise cliente.
                  Le consultant trouve ses missions et négocie ses tarifs librement. La société de
                  portage l&apos;embauche en CDI ou CDD, facture le client, et lui reverse un salaire
                  après déduction des frais de gestion et des cotisations sociales.
                </p>
                <p>
                  Ce statut est encadré par le Code du travail depuis l&apos;ordonnance du 2 avril 2015
                  et la convention collective du 22 mars 2017 (IDCC 3219).
                </p>
              </div>

              {/* Schéma tripartite */}
              <div className="mt-8 rounded-xl bg-muted/30 p-6 sm:p-8">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                  <div className="flex h-28 w-44 flex-col items-center justify-center rounded-xl border-2 border-primary bg-white p-4 text-center shadow-sm">
                    <span className="text-sm font-bold text-primary">Consultant</span>
                    <span className="mt-1 text-xs text-muted-foreground">Trouve les missions</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                    <span className="hidden sm:block">←</span>
                    <span>Contrat de travail (CDI)</span>
                    <span>Convention de portage</span>
                    <span className="hidden sm:block">→</span>
                  </div>
                  <div className="flex h-28 w-44 flex-col items-center justify-center rounded-xl border-2 border-accent bg-white p-4 text-center shadow-sm">
                    <span className="text-sm font-bold text-accent">Société de portage</span>
                    <span className="mt-1 text-xs text-muted-foreground">Facture et paie</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                    <span className="hidden sm:block">←</span>
                    <span>Contrat commercial</span>
                    <span className="hidden sm:block">→</span>
                  </div>
                  <div className="flex h-28 w-44 flex-col items-center justify-center rounded-xl border-2 border-border bg-white p-4 text-center shadow-sm">
                    <span className="text-sm font-bold text-foreground">Entreprise cliente</span>
                    <span className="mt-1 text-xs text-muted-foreground">Reçoit la prestation</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Fonctionnement */}
            <section id="fonctionnement" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                Comment fonctionne le portage salarial ?
              </h2>
              <p className="mt-2 text-base text-muted-foreground">Le processus en 5 étapes.</p>

              <ol className="mt-8 flex flex-col gap-0">
                {[
                  { t: "Vous trouvez une mission", d: "Vous prospectez et négociez directement avec votre client (TJM, durée, conditions). La société de portage n'intervient pas dans la recherche." },
                  { t: "La société de portage contractualise", d: "Elle signe un contrat commercial avec votre client et un contrat de travail (CDI ou CDD) avec vous." },
                  { t: "Vous réalisez votre mission", d: "Vous travaillez en autonomie chez le client. Vous remplissez un compte-rendu d'activité mensuel (CRA)." },
                  { t: "La société facture et encaisse", d: "Elle émet la facture au client, gère les relances et le recouvrement." },
                  { t: "Vous recevez votre salaire", d: "Après déduction des frais de gestion (5-10 % du CA) et des cotisations sociales (~45 % du restant), la société vous verse un salaire net chaque mois." },
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
            </section>

            {/* 3. Avantages */}
            <section id="avantages" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ShieldIcon className="h-4 w-4" /></IconBadge>
                Les avantages du portage salarial
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: ShieldIcon, t: "Protection sociale complète", d: "Assurance maladie, retraite complémentaire, mutuelle d'entreprise, prévoyance. Même couverture qu'un salarié cadre." },
                  { icon: ScaleIcon, t: "Droit au chômage", d: "Vous cotisez à l'assurance chômage. En cas de fin de mission, vous pouvez toucher l'ARE." },
                  { icon: BriefcaseIcon, t: "CDI pour emprunter", d: "Un CDI en portage est reconnu par les banques pour un crédit immobilier. Argument souvent décisif." },
                  { icon: CalculatorIcon, t: "Zéro gestion administrative", d: "Facturation, déclarations URSSAF, bulletins de paie : la société de portage s'occupe de tout." },
                  { icon: RocketIcon, t: "Pas de création de société", d: "Démarrage immédiat, pas de frais de création, pas de comptabilité, pas de CFE." },
                  { icon: ExternalLinkIcon, t: "Frais professionnels déductibles", d: "Repas, transport, matériel : vos frais réduisent votre base de cotisations, contrairement à l'auto-entreprise." },
                ].map((a) => (
                  <li key={a.t} className="rounded-xl border border-border bg-white p-5 shadow-sm">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <a.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-foreground">{a.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">{a.d}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Inconvénients */}
            <section id="inconvenients" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><AlertTriangleIcon className="h-4 w-4" /></IconBadge>
                Les inconvénients du portage salarial
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  { t: "Coût total élevé", d: "Entre les frais de gestion (5-10 %) et les cotisations sociales (~45 %), vous conservez environ 45-55 % de votre CA. En auto-entreprise, c'est 75-80 %." },
                  { t: "TJM minimum requis", d: "La convention collective impose un salaire minimum (75 % du PASS). En pratique, un TJM inférieur à 300-350 €/jour rend le portage peu viable économiquement." },
                  { t: "Pas de patrimoine d'entreprise", d: "Contrairement à une SASU ou EURL, vous ne construisez pas de société que vous pouvez revendre ou transmettre." },
                  { t: "Limité aux prestations intellectuelles", d: "Le portage est réservé aux activités de conseil, formation, expertise. Pas d'activité commerciale, artisanale ou de négoce." },
                ].map((inc) => (
                  <li key={inc.t} className="flex gap-3 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
                    <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <div>
                      <p className="font-semibold text-amber-900">{inc.t}</p>
                      <p className="mt-1 text-sm text-amber-800">{inc.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* 5. Salaire */}
            <section id="salaire" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                Salaire et rémunération en portage salarial
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Voici la cascade de déductions pour un TJM de 500 €, 18 jours travaillés par mois :
              </p>

              {/* Waterfall chart */}
              <div className="mt-6 space-y-2">
                {[
                  { label: "CA HT mensuel", value: "9 000 €", pct: 100, color: "bg-primary" },
                  { label: "− Frais de gestion (7 %)", value: "−630 €", pct: 93, color: "bg-primary/80" },
                  { label: "− Charges patronales (~43 %)", value: "−3 599 €", pct: 53, color: "bg-primary/60" },
                  { label: "= Salaire brut", value: "4 771 €", pct: 53, color: "bg-accent" },
                  { label: "− Charges salariales (~22 %)", value: "−1 050 €", pct: 41, color: "bg-accent/70" },
                  { label: "= Salaire net avant impôt", value: "~3 721 €", pct: 41, color: "bg-accent" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <span className="w-56 shrink-0 text-right text-sm text-foreground/80">{row.label}</span>
                    <div className="flex-1">
                      <div className={`h-7 rounded ${row.color}`} style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="w-20 text-right text-sm font-semibold tabular-nums text-foreground">{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Taux de restitution : environ <strong>41 %</strong> du CA. Les taux réels varient selon la société de portage.
              </p>

              <div className="mt-6 rounded-xl border-l-4 border-primary bg-primary/5 p-5">
                <p className="text-sm text-primary">
                  <strong>Salaire minimum légal :</strong> La convention collective impose une rémunération minimale de 75 % du PASS pour un junior (soit ~2 517 €/mois brut en 2026), 80 % pour un senior et 85 % pour un forfait jours.
                </p>
              </div>

              <p className="mt-4 text-base text-foreground/80">
                <strong>Calcule ton salaire exact</strong> avec{" "}
                <Link href="/simulateurs/portage-salarial" className="text-primary hover:underline">
                  notre simulateur de salaire en portage
                </Link>.
              </p>
            </section>

            {/* 6. Cotisations */}
            <section id="cotisations" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                Cotisations sociales en portage salarial
              </h2>
              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Catégorie</th>
                      <th className="px-5 py-3 text-right">Taux approx.</th>
                      <th className="px-5 py-3">Base</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Charges patronales", "~42-45 %", "Salaire brut", true],
                      ["  dont sécurité sociale", "~30 %", "", false],
                      ["  dont retraite complémentaire", "~10 %", "", false],
                      ["  dont prévoyance/mutuelle", "~2-3 %", "", false],
                      ["Charges salariales", "~21-23 %", "Salaire brut", true],
                      ["  dont CSG/CRDS", "~9,7 %", "98,25 % du brut", false],
                      ["  dont retraite complémentaire", "~4 %", "", false],
                      ["  dont sécurité sociale", "~7 %", "", false],
                    ].map(([cat, taux, base, bold]) => (
                      <tr key={cat as string} className="border-b border-border last:border-b-0">
                        <td className={`px-5 py-2.5 ${bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                          {cat as string}
                        </td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{taux as string}</td>
                        <td className="px-5 py-2.5 text-xs text-muted-foreground">{base as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Ces taux sont des moyennes — les cotisations exactes dépendent de la convention collective et du niveau de rémunération. Consultez notre{" "}
                <Link href="/methodologie" className="text-primary hover:underline">page méthodologie</Link> pour les sources.
              </p>
            </section>

            {/* 7. Chômage */}
            <section id="chomage" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ShieldIcon className="h-4 w-4" /></IconBadge>
                Portage salarial et chômage
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Cotiser au chômage en portage</h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Oui, le salarié porté cotise à l&apos;assurance chômage comme tout salarié. C&apos;est l&apos;un des avantages majeurs par rapport à l&apos;auto-entreprise ou la SASU, où aucune cotisation chômage n&apos;est prélevée.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Toucher l&apos;ARE en portage</h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    En cas de rupture conventionnelle ou de fin de CDD, vous pouvez bénéficier de l&apos;ARE (Allocation de Retour à l&apos;Emploi). Le montant dépend de votre salaire brut des 24 derniers mois. Il est possible de cumuler ARE et revenus d&apos;activité portée, sous conditions.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Portage salarial après un licenciement</h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Vous pouvez démarrer en portage tout en percevant vos allocations chômage existantes. Le cumul est possible tant que le total (ARE + salaire porté) ne dépasse pas votre ancien salaire de référence.
                  </p>
                </div>
                <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
                  <AlertTriangleIcon className="mb-1 inline h-4 w-4 text-amber-500" /> Le maintien ou le cumul des droits au chômage dépend de votre situation individuelle. Consultez France Travail (ex-Pôle Emploi) pour une simulation personnalisée.
                </div>
              </div>
            </section>

            {/* 8. Éligibilité */}
            <section id="eligibilite" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><BriefcaseIcon className="h-4 w-4" /></IconBadge>
                Qui peut bénéficier du portage salarial ?
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-accent/40 bg-accent/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-accent">✅ Éligible</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li>Consultants, formateurs, experts, coaches</li>
                    <li>Profils IT (développeurs, chefs de projet, data)</li>
                    <li>Managers de transition</li>
                    <li>Professions libérales non réglementées</li>
                    <li>Cadres en reconversion</li>
                    <li>Retraités actifs</li>
                    <li className="font-medium text-foreground">Condition : Bac+2 minimum OU 3 ans d&apos;expérience</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-destructive">❌ Non éligible</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li>Activités commerciales / achat-revente</li>
                    <li>Artisanat et métiers manuels</li>
                    <li>Professions réglementées (médecin, avocat, architecte)</li>
                    <li>Services à la personne (ménage, garde d&apos;enfants)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 9. Comparatif statuts */}
            <section id="comparatif" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ScaleIcon className="h-4 w-4" /></IconBadge>
                Portage salarial vs autres statuts
              </h2>
              <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-3 py-3 sm:px-5">Critère</th>
                      <th className="whitespace-nowrap px-3 py-3 sm:px-5">Portage</th>
                      <th className="whitespace-nowrap px-3 py-3 sm:px-5">Auto-entr.</th>
                      <th className="whitespace-nowrap px-3 py-3 sm:px-5">SASU</th>
                      <th className="whitespace-nowrap px-3 py-3 sm:px-5">EURL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Protection sociale", "Complète", "Minimale", "Assimilé-salarié", "TNS"],
                      ["Chômage", "Oui", "Non", "Non", "Non"],
                      ["Plafond CA", "Aucun", "77 700 €", "Aucun", "Aucun"],
                      ["Frais déductibles", "Oui", "Non", "Oui", "Oui"],
                      ["Gestion admin", "Zéro", "Simple", "Compta oblig.", "Compta oblig."],
                      ["Coût total", "~50 % CA", "~22-25 % CA", "~60-65 % net", "~45 % net"],
                      ["Patrimoine", "Non", "Non", "Oui", "Oui"],
                    ].map(([critere, ...vals]) => (
                      <tr key={critere} className="border-b border-border last:border-b-0">
                        <td className="px-3 py-2.5 font-semibold text-foreground sm:px-5">{critere}</td>
                        {vals.map((v, i) => (
                          <td key={i} className="px-3 py-2.5 text-foreground/80 sm:px-5">{v}</td>
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
                <Link href="/simulateurs/auto-entrepreneur" className="rounded-xl border border-border bg-white p-4 text-sm font-medium text-primary shadow-sm transition hover:shadow-md hover:border-primary">
                  Simulateur auto-entrepreneur →
                </Link>
              </div>
            </section>

            {/* 10. Choisir sa société */}
            <section id="choisir" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><BriefcaseIcon className="h-4 w-4" /></IconBadge>
                Comment choisir sa société de portage
              </h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-foreground/80">
                <p>
                  Le choix de votre société de portage repose sur 5 critères principaux :
                  les frais de gestion (5 à 10 % du CA), le label PEPS (gage de sérieux),
                  la qualité de l&apos;accompagnement (interlocuteur dédié vs plateforme),
                  les avis des portés actuels et les services inclus (mutuelle, avance sur
                  salaire, RC Pro).
                </p>
                <p>
                  Nous avons analysé les 10 sociétés les plus connues dans notre{" "}
                  <Link href="/comparateurs/portage-salarial" className="font-semibold text-primary hover:underline">
                    comparatif indépendant des sociétés de portage salarial
                  </Link>.
                </p>
              </div>
            </section>

            {/* 11. CTA Simuler */}
            <section id="simuler" className="scroll-mt-24">
              <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center shadow-md sm:p-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Simule ton revenu en portage salarial
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80">
                  Tu connais maintenant le fonctionnement du portage. Utilise notre simulateur
                  pour estimer ton salaire net selon ton TJM.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link href="/simulateurs/portage-salarial" className="inline-flex items-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
                    Simuler mon salaire →
                  </Link>
                  <Link href="/comparateurs/portage-salarial" className="inline-flex items-center rounded-xl border-2 border-primary bg-transparent px-6 py-3.5 text-base font-semibold text-primary transition hover:bg-primary/5">
                    Comparer les sociétés
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
