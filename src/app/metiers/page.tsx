import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { IconBadge, CalendarIcon, BriefcaseIcon, CompassIcon } from "@/components/icons";
import { METIERS, median, netMensuel, tjmEquivalent, ANCRAGE_APEC } from "@/lib/metiers";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const KEUR = (n: number) => `${Math.round(n / 1000)} k€`;

// Regroupement par catégorie, ordonné par nombre de métiers décroissant.
const parCategorie = [...new Set(METIERS.map((m) => m.categorie))]
  .map((c) => ({ categorie: c, metiers: METIERS.filter((m) => m.categorie === c) }))
  .sort((a, b) => b.metiers.length - a.metiers.length);

export const metadata: Metadata = {
  title: "Salaires par métier 2026 : fourchettes, net et TJM équivalent",
  description:
    "Les fourchettes de rémunération de 20 métiers, du junior à l'expert, en Île-de-France et en province — converties en net mensuel, situées dans la distribution française, et traduites en TJM freelance d'équivalence.",
  alternates: { canonical: "/metiers" },
  openGraph: {
    title: "Salaires par métier 2026",
    description: "20 métiers, 4 niveaux, 2 régions — avec le net calculé et le TJM freelance équivalent.",
    url: "/metiers",
  },
};

export default function MetiersHubPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Salaires par métier",
      url: `${SITE_URL}/metiers`,
      inLanguage: "fr-FR",
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      numberOfItems: METIERS.length,
      itemListElement: METIERS.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `Salaire ${m.label}`,
        url: `${SITE_URL}/metiers/${m.id}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Salaires par métier", item: `${SITE_URL}/metiers` },
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
          <span className="text-foreground">Salaires par métier</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour septembre 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Salaires par métier
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          Les fourchettes, en net — et le TJM pour gagner autant en freelance
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">
          Pour chacun des {METIERS.length} métiers : la fourchette de brut
          annuel du junior à l&apos;expert, en Île-de-France et en province, la
          conversion en net mensuel calculée avec les cotisations cadres 2026,
          la position dans la distribution française des salaires, le coût
          employeur réel — et le tarif journalier qu&apos;il faudrait facturer
          en indépendant pour retrouver le même net.
        </p>

        {parCategorie.map(({ categorie, metiers }) => (
          <section key={categorie} className="mt-12">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><BriefcaseIcon className="w-4 h-4" /></IconBadge>
              {categorie}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {metiers.map((m) => {
                const b = median(m.idf.confirme);
                return (
                  <li key={m.id}>
                    <Link
                      href={`/metiers/${m.id}`}
                      className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-md transition hover:border-primary hover:shadow-lg"
                    >
                      <span className="text-base font-bold text-foreground">{m.label}</span>
                      <span className="mt-3 text-2xl font-bold tabular-nums text-primary">
                        {KEUR(m.idf.confirme[0] * 1000)} – {KEUR(m.idf.confirme[1] * 1000)}
                      </span>
                      <span className="text-xs text-muted-foreground">bruts annuels, confirmé en IDF</span>
                      <span className="mt-3 text-sm text-foreground/70">
                        ≈ {EUR.format(netMensuel(b))} nets/mois · TJM {EUR.format(tjmEquivalent(b))}
                      </span>
                      <span className="mt-4 text-sm font-semibold text-primary">Voir le détail →</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="mt-16 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8">
          <h2 className="flex items-center text-2xl font-bold text-foreground">
            <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
            Votre métier n&apos;est pas dans la liste ?
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/80">
            Nos simulateurs fonctionnent quel que soit votre poste :{" "}
            <Link href="/simulateurs/ou-se-situe-mon-salaire" className="text-primary underline-offset-4 hover:underline">
              « où se situe mon salaire »
            </Link>{" "}
            vous donne votre percentile exact dans la distribution INSEE,{" "}
            <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
              le simulateur brut/net
            </Link>{" "}
            convertit dans les deux sens, et{" "}
            <Link href="/simulateurs/salarie-ou-freelance" className="text-primary underline-offset-4 hover:underline">
              le comparateur salarié ou freelance
            </Link>{" "}
            calcule votre TJM d&apos;équivalence sur vos propres chiffres.
          </p>
          <p className="mt-4 max-w-3xl text-xs italic text-muted-foreground">
            Fourchettes indicatives de marché, ancrées sur le baromètre APEC
            2025 (médiane cadres {ANCRAGE_APEC.medianeCadresKEur} k€, 80 % des
            cadres entre {ANCRAGE_APEC.fourchette80PctKEur[0]} et{" "}
            {ANCRAGE_APEC.fourchette80PctKEur[1]} k€). Nets, percentiles, coûts
            employeur et TJM sont calculés par nos simulateurs avec les taux
            2026.
          </p>
        </section>
      </div>
    </>
  );
}
