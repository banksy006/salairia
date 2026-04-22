import type { Metadata } from "next";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  BuildingIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  CalculatorIcon,
} from "@/components/icons";
import PouvoirAchatApercuCard from "@/components/simulateurs/PouvoirAchatApercuCard";
import { PouvoirAchatProvider } from "@/components/simulateurs/PouvoirAchatContext";
import PouvoirAchatSimulator from "@/components/simulateurs/PouvoirAchatSimulator";
import TocSidebar from "@/components/simulateurs/TocSidebar";
import villesData from "@/data/cout-vie-villes.json";

export const metadata: Metadata = {
  title:
    "Pouvoir d'achat par ville 2026 — De quel salaire avez-vous besoin ? | Salairia",
  description:
    "Comparez le coût de la vie dans 20 villes françaises : loyer, transport, alimentation. Calculez le salaire net nécessaire pour vivre confortablement.",
  alternates: { canonical: "/simulateurs/pouvoir-achat-ville" },
  openGraph: {
    title:
      "Pouvoir d'achat par ville 2026 — De quel salaire avez-vous besoin ?",
    description:
      "Comparez le coût de la vie dans 20 villes françaises. Calculez le salaire net nécessaire.",
    url: "/simulateurs/pouvoir-achat-ville",
  },
};

const faq = [
  {
    q: "Comment est calculé le salaire nécessaire ?",
    r: "Nous appliquons la règle bancaire classique : le loyer ne doit pas dépasser 30 % du salaire net. Le salaire nécessaire est donc calculé comme le loyer T2 moyen divisé par 0,30. C'est le seuil utilisé par les banques et les agences immobilières pour évaluer la solvabilité d'un locataire.",
  },
  {
    q: "D'où viennent les données de loyer ?",
    r: "Les loyers moyens pour un T2 proviennent de MeilleursAgents et des observatoires locaux des loyers (OLAP pour Paris, observatoires régionaux), relevés en avril 2026. Il s'agit de moyennes sur l'ensemble de la ville — les écarts entre quartiers peuvent être importants.",
  },
  {
    q: "Pourquoi Paris est-elle si chère ?",
    r: "Le loyer moyen d'un T2 à Paris (1 350 €/mois) est 2 à 3 fois supérieur à celui de villes comme Brest, Dijon ou Le Mans. Le surcoût ne vient pas que du loyer : l'alimentation et les charges courantes sont également 10 à 15 % plus élevées. En revanche, les salaires parisiens sont en moyenne 15 à 20 % plus élevés qu'en province.",
  },
  {
    q: "Ces données incluent-elles les familles ?",
    r: "Non, ce simulateur estime le coût de la vie pour une personne seule (T2). Pour un couple ou une famille, le loyer (T3-T4), l'alimentation et les charges augmentent. En première approximation, multipliez le total par 1,5 pour un couple et par 2 pour une famille avec 2 enfants.",
  },
  {
    q: "Le coût des transports inclut-il la voiture ?",
    r: "Non, nous utilisons le tarif de l'abonnement mensuel aux transports en commun de chaque ville. Si vous utilisez une voiture, ajoutez 300 à 500 €/mois (crédit, assurance, essence, stationnement) au total. Dans les grandes villes, les transports en commun restent généralement plus économiques.",
  },
];

const sourcesLinks = [
  { label: "MeilleursAgents — loyers moyens par ville", href: "https://www.meilleursagents.com" },
  { label: "INSEE — indices des prix à la consommation", href: "https://www.insee.fr" },
  { label: "OLAP — observatoire des loyers Paris", href: "https://www.observatoire-des-loyers.fr" },
  { label: "Tarifs transports en commun officiels 2026", href: "https://www.iledefrance-mobilites.fr" },
];

const tocItems = [
  { id: "simulateur", label: "Comparateur" },
  { id: "classement", label: "Classement" },
  { id: "methode", label: "Méthodologie" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

const villesSorted = [...(villesData.villes as { id: string; nom: string; loyerT2: number; transport: number; alimentation: number; charges: number }[])].sort(
  (a, b) =>
    a.loyerT2 + a.transport + a.alimentation + a.charges -
    (b.loyerT2 + b.transport + b.alimentation + b.charges),
);

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function PouvoirAchatVillePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Comparateur pouvoir d'achat par ville 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      description:
        "Comparez le coût de la vie dans 20 villes françaises et calculez le salaire nécessaire.",
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://salairia.fr/" },
        { "@type": "ListItem", position: 2, name: "Simulateurs", item: "https://salairia.fr/simulateurs" },
        { "@type": "ListItem", position: 3, name: "Pouvoir d'achat ville", item: "https://salairia.fr/simulateurs/pouvoir-achat-ville" },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <PouvoirAchatProvider>
          <section className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-foreground/70">
                <Link href="/" className="transition hover:text-primary">Accueil</Link>
                <span aria-hidden>›</span>
                <Link href="/simulateurs" className="transition hover:text-primary">Simulateurs</Link>
                <span aria-hidden>›</span>
                <span className="text-foreground">Pouvoir d&apos;achat ville</span>
              </nav>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
                <CalendarIcon className="h-3.5 w-3.5" />
                À jour avril 2026
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Pouvoir d&apos;achat par ville 2026
              </h1>
              <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
                De quel salaire as-tu besoin pour vivre dans ta ville ?
              </p>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  Le coût de la vie varie du simple au double entre les villes françaises.
                  Ce comparateur décompose les dépenses mensuelles (loyer, transport,
                  alimentation, charges courantes) pour 20 villes et calcule le salaire
                  net nécessaire pour y vivre confortablement.
                </p>
                <p>
                  Comparez deux villes côte à côte pour évaluer l&apos;impact d&apos;un
                  déménagement ou d&apos;une mutation sur votre budget. Données
                  MeilleursAgents et INSEE, avril 2026.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PouvoirAchatApercuCard />
            </div>
          </section>

          <div className="mt-16 flex gap-12">
            <div className="min-w-0 flex-1 space-y-16">
              <PouvoirAchatSimulator />

              <section id="classement" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><BuildingIcon className="h-4 w-4" /></IconBadge>
                    Classement des 20 villes par coût de la vie
                  </h2>
                  <p className="mt-2 text-base text-muted-foreground">
                    Du moins cher au plus cher. Total mensuel = loyer T2 +
                    transport + alimentation + charges.
                  </p>

                  <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3">#</th>
                          <th className="px-4 py-3">Ville</th>
                          <th className="whitespace-nowrap px-4 py-3 text-right">Total / mois</th>
                          <th className="whitespace-nowrap px-4 py-3 text-right">Salaire net requis</th>
                        </tr>
                      </thead>
                      <tbody>
                        {villesSorted.map((v, i) => {
                          const total = v.loyerT2 + v.transport + v.alimentation + v.charges;
                          const salNet = Math.round(v.loyerT2 / 0.3);
                          return (
                            <tr key={v.id} className="border-b border-border last:border-b-0 transition hover:bg-muted/50">
                              <td className="px-4 py-2.5 text-muted-foreground">{i + 1}</td>
                              <td className="px-4 py-2.5 font-semibold text-foreground">{v.nom}</td>
                              <td className="px-4 py-2.5 text-right tabular-nums text-foreground/80">{EUR0.format(total)}</td>
                              <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-primary">{EUR0.format(salNet)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section id="methode" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                    Méthodologie
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                    <p>
                      Le <strong>salaire net nécessaire</strong> est calculé selon la règle bancaire
                      standard : le loyer ne doit pas dépasser 30 % du revenu net. Si le loyer T2
                      moyen est de 780 € (Lyon), le salaire net minimum est de 780 / 0,30 = 2 600 €.
                    </p>
                    <p>
                      Le <strong>coût total mensuel</strong> additionne 4 postes : loyer T2 moyen
                      (source MeilleursAgents), abonnement transport en commun (tarif officiel de
                      chaque ville), alimentation (estimation INSEE ajustée par ville) et charges
                      courantes (énergie, assurances, télécom, loisirs).
                    </p>
                    <p>
                      Ces montants concernent une personne seule. Pour un couple, appliquez un
                      coefficient de 1,5 environ ; pour une famille avec enfants, un coefficient
                      de 2.
                    </p>
                  </div>
                </div>
              </section>

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
                    Dernière mise à jour : avril 2026. Estimations indicatives basées sur
                    les moyennes de marché. Le coût réel dépend de votre quartier, mode de
                    vie et situation familiale.
                  </p>
                </div>
              </section>
            </div>

            <TocSidebar items={tocItems} />
          </div>
        </PouvoirAchatProvider>
      </div>
    </>
  );
}
