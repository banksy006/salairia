import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { IconBadge, CalendarIcon, BuildingIcon } from "@/components/icons";
import villesData from "@/data/cout-vie-villes.json";

const SLUGS = ["paris", "lyon", "marseille", "toulouse", "bordeaux"];

interface Ville {
  id: string;
  nom: string;
  region: string;
  loyerT2: number;
  transport: number;
  alimentation: number;
  charges: number;
}
const villes = (villesData.villes as Ville[]).filter((v) => SLUGS.includes(v.id));
const budgetVie = (v: Ville) => Math.round((v.loyerT2 + v.transport + v.alimentation + v.charges) / 0.7);
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export const metadata: Metadata = {
  title: "Quel salaire pour vivre dans chaque ville de France ?",
  description:
    "Le salaire nécessaire pour vivre à Paris, Lyon, Marseille, Toulouse et Bordeaux : budget détaillé poste par poste, loyers de juillet 2026, et les deux montants de référence calculés pour chaque ville.",
  alternates: { canonical: "/villes" },
  openGraph: {
    title: "Quel salaire pour vivre dans chaque ville de France ?",
    description: "Budgets détaillés et salaires nécessaires, ville par ville, avec les loyers de juillet 2026.",
    url: "/villes",
  },
};

export default function VillesHubPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Quel salaire pour vivre dans chaque ville de France",
      url: `${SITE_URL}/villes`,
      inLanguage: "fr-FR",
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      numberOfItems: villes.length,
      itemListElement: [...villes]
        .sort((a, b) => budgetVie(b) - budgetVie(a))
        .map((v, i) => ({ "@type": "ListItem", position: i + 1, name: v.nom, url: `${SITE_URL}/villes/${v.id}` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Salaire par ville", item: `${SITE_URL}/villes` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-foreground/70">
          <Link href="/" className="transition hover:text-primary">Accueil</Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">Salaire par ville</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour août 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Quel salaire pour vivre dans votre ville ?
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          Le budget réel des grandes villes, calculé poste par poste
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">
          Pour chaque ville : le loyer moyen d&apos;un T2 relevé chez
          MeilleursAgents, les dépenses courantes, et les deux salaires de
          référence qui en découlent — celui qu&apos;il faut pour vivre
          confortablement, et celui qu&apos;exigent les bailleurs. Les quinze
          autres villes que nous suivons sont dans le{" "}
          <Link href="/simulateurs/pouvoir-achat-ville" className="text-primary underline-offset-4 hover:underline">
            comparateur interactif
          </Link>
          .
        </p>

        <section className="mt-12">
          <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
            <IconBadge><BuildingIcon className="w-4 h-4" /></IconBadge>
            Les cinq grandes villes
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...villes].sort((a, b) => budgetVie(b) - budgetVie(a)).map((v) => (
              <li key={v.id}>
                <Link
                  href={`/villes/${v.id}`}
                  className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-md transition hover:border-primary hover:shadow-lg"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{v.region}</span>
                  <span className="mt-1 text-xl font-bold text-foreground">{v.nom}</span>
                  <span className="mt-4 text-3xl font-bold tabular-nums text-primary">{EUR.format(budgetVie(v))}</span>
                  <span className="text-sm text-muted-foreground">nets/mois pour vivre confortablement</span>
                  <span className="mt-3 text-sm text-foreground/70">Loyer T2 : {EUR.format(v.loyerT2)}</span>
                  <span className="mt-4 text-sm font-semibold text-primary">Voir le détail →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
