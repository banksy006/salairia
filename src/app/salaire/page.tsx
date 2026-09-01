import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { IconBadge, CalendarIcon, CalculatorIcon, EuroIcon } from "@/components/icons";
import { calculerBrutVersNet } from "@/lib/calculators/salaire-brut-net";
import {
  MONTANTS_MENSUELS,
  MONTANTS_ANNUELS,
  slugMontant,
} from "@/lib/salaire-montants";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const net = (montant: number, periodicite: "mensuel" | "annuel") => {
  const r = calculerBrutVersNet({
    salaire: montant,
    mode: "brut-vers-net",
    periodicite,
    statut: "non-cadre",
    tauxPAS: 0,
  });
  return periodicite === "annuel" ? r.netAvantImpotAnnuel : r.netAvantImpotMensuel;
};

export const metadata: Metadata = {
  title: "Brut en net : la conversion pour chaque salaire (2026)",
  description:
    "Combien font 2 000 €, 2 500 € ou 35 000 € bruts en net ? La réponse calculée pour trente montants courants, avec le détail des cotisations 2026, le net après impôt et le coût employeur.",
  alternates: { canonical: "/salaire" },
  openGraph: {
    title: "Brut en net : la conversion pour chaque salaire",
    description: "Trente montants calculés avec les cotisations 2026, cadre et non-cadre.",
    url: "/salaire",
  },
};

export default function SalaireHubPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Brut en net : la conversion pour chaque salaire",
      url: `${SITE_URL}/salaire`,
      inLanguage: "fr-FR",
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Brut en net", item: `${SITE_URL}/salaire` },
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
          <span className="text-foreground">Brut en net</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          Taux 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Brut en net, montant par montant
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          La réponse calculée, pas approximée
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">
          Pour chaque montant : le net avant impôt en cadre et non-cadre, le
          détail des cotisations ligne par ligne, le net réellement versé selon
          votre taux de prélèvement à la source, et le coût employeur. Tout est
          calculé par notre{" "}
          <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
            simulateur brut/net
          </Link>{" "}
          avec les taux 2026 — qui accepte aussi n&apos;importe quel autre
          montant, dans les deux sens.
        </p>

        <section className="mt-12">
          <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
            <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
            Salaires mensuels
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MONTANTS_MENSUELS.map((m) => (
              <li key={m}>
                <Link
                  href={`/salaire/${slugMontant(m)}`}
                  className="flex items-baseline justify-between gap-3 rounded-xl border border-border bg-white px-5 py-4 shadow-sm transition hover:border-primary hover:shadow-md"
                >
                  <span className="font-semibold text-foreground">{EUR.format(m)} brut</span>
                  <span className="tabular-nums text-primary">{EUR.format(net(m, "mensuel"))} net</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
            <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
            Salaires annuels
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MONTANTS_ANNUELS.map((m) => (
              <li key={m}>
                <Link
                  href={`/salaire/${slugMontant(m)}`}
                  className="flex items-baseline justify-between gap-3 rounded-xl border border-border bg-white px-5 py-4 shadow-sm transition hover:border-primary hover:shadow-md"
                >
                  <span className="font-semibold text-foreground">{EUR.format(m)} brut</span>
                  <span className="tabular-nums text-primary">{EUR.format(net(m, "annuel"))} net</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 max-w-3xl text-base leading-relaxed text-foreground/80">
          Montants nets avant impôt, pour un salarié non-cadre à temps plein.
          Pour comprendre le mécanisme des cotisations plutôt que le seul
          résultat, notre{" "}
          <Link href="/guides/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
            guide du salaire brut et net
          </Link>{" "}
          détaille chaque ligne du bulletin ; pour situer votre rémunération
          dans la population française, le simulateur{" "}
          <Link href="/simulateurs/ou-se-situe-mon-salaire" className="text-primary underline-offset-4 hover:underline">
            « où se situe mon salaire »
          </Link>{" "}
          donne votre percentile exact.
        </p>
      </div>
    </>
  );
}
