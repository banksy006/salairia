import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  EuroIcon,
  PercentIcon,
  ExternalLinkIcon,
  InfoIcon,
} from "@/components/icons";
import BarChart, { type BarDatum } from "@/components/charts/BarChart";
import { SALAIRE_2026, calculerBrutVersNet } from "@/lib/calculators/salaire-brut-net";
import { getTauxNeutre } from "@/lib/calculators/net-apres-impot";
import data from "@/data/actualites.json";

const article = data.articles.find(
  (a) => a.slug === "smic-juin-2026-et-bareme-pas-mai-2026",
)!;

export const metadata: Metadata = {
  title:
    "SMIC juin 2026 et barème du prélèvement à la source : ce qui a changé dans votre paie",
  description:
    "Le SMIC a été revalorisé au 1er juin 2026 et les tranches du taux neutre du prélèvement à la source réajustées au 1er mai. Impact chiffré sur votre net mensuel.",
  alternates: { canonical: `/actualites/${article.slug}` },
  openGraph: {
    title: "SMIC juin 2026 et barème du PAS : ce qui a changé dans votre paie",
    description:
      "Deux changements en cours d'année, largement passés inaperçus. Voici leur impact chiffré.",
    url: `/actualites/${article.slug}`,
    type: "article",
  },
};

// Tous les montants ci-dessous sortent des calculateurs, jamais d'une saisie
// manuelle : le SMIC janvier est conservé en local pour la comparaison.
const SMIC_BRUT_JANVIER = 1_823.03;
const SMIC_BRUT_JUIN = SALAIRE_2026.SMIC_MENSUEL_BRUT;

const netFor = (brut: number) =>
  calculerBrutVersNet({
    salaire: brut,
    mode: "brut-vers-net",
    periodicite: "mensuel",
    statut: "non-cadre",
    tauxPAS: 0,
  }).netAvantImpotMensuel;

const smicNetJanvier = netFor(SMIC_BRUT_JANVIER);
const smicNetJuin = netFor(SMIC_BRUT_JUIN);
const gainNetMensuel = smicNetJuin - smicNetJanvier;

const EUR2 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

// Ancien barème du taux neutre, applicable jusqu'au 30 avril 2026.
const ANCIEN_BAREME: [number, number][] = [
  [1_591, 0], [1_653, 0.005], [1_759, 0.013], [1_877, 0.021], [2_006, 0.029],
  [2_113, 0.035], [2_253, 0.041], [2_666, 0.053], [3_052, 0.075], [3_476, 0.099],
  [3_913, 0.119], [4_566, 0.138], [5_475, 0.158], [6_851, 0.179], [8_557, 0.20],
  [11_877, 0.24], [16_087, 0.28], [25_251, 0.33], [46_557, 0.38],
];
const ancienTaux = (net: number) =>
  ANCIEN_BAREME.find(([max]) => net <= max)?.[1] ?? 0.43;

const casPAS = [1_600, 2_200, 2_700, 3_000, 5_000].map((net) => ({
  net,
  avant: ancienTaux(net),
  apres: getTauxNeutre(net),
}));

const smicChart: BarDatum[] = [
  {
    label: "SMIC net — janvier 2026",
    hint: `${EUR2.format(SMIC_BRUT_JANVIER)} brut`,
    value: Math.round(smicNetJanvier),
  },
  {
    label: "SMIC net — depuis le 1er juin 2026",
    hint: `${EUR2.format(SMIC_BRUT_JUIN)} brut`,
    value: Math.round(smicNetJuin),
    highlight: true,
  },
];

export default function ActualiteSmicPasPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.titre,
      description: article.chapo,
      author: {
        "@type": "Person",
        name: "Nizar Laghrifi",
        url: `${SITE_URL}/a-propos`,
      },
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      datePublished: article.datePublication,
      dateModified: article.dateModification,
      inLanguage: "fr-FR",
      url: `${SITE_URL}/actualites/${article.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Actualités", item: `${SITE_URL}/actualites` },
        { "@type": "ListItem", position: 3, name: article.titre, item: `${SITE_URL}/actualites/${article.slug}` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <Link href="/" className="transition hover:text-primary">Accueil</Link>
          <span aria-hidden>›</span>
          <Link href="/actualites" className="transition hover:text-primary">Actualités</Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">SMIC et barème PAS</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
            {article.categorie}
          </span>
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <CalendarIcon className="h-3.5 w-3.5" />
            <time dateTime={article.datePublication}>
              {new Date(article.datePublication).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </span>
          <span className="text-muted-foreground">· {article.tempsLecture} min</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {article.titre}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/80">
          {article.chapo}
        </p>

        <div className="mt-10 space-y-12">
          <section>
            <h2 className="flex items-center text-2xl font-bold text-foreground">
              <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
              Le SMIC a augmenté au 1er juin
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              La plupart des gens associent le SMIC à une revalorisation au
              1er janvier. En 2026, il y en a eu une seconde : l&apos;arrêté du
              22 mai 2026 a porté le SMIC horaire brut de 12,02 € à{" "}
              <strong>12,31 €</strong> à compter du 1er juin, soit{" "}
              <strong>{EUR2.format(SMIC_BRUT_JUIN)} brut par mois</strong> pour
              35 heures hebdomadaires.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              En net avant impôt, pour un salarié non-cadre, cela représente un
              gain de <strong>{EUR2.format(gainNetMensuel)} par mois</strong>,
              soit {EUR2.format(gainNetMensuel * 12)} sur douze mois.
            </p>

            <div className="mt-6">
              <BarChart
                caption="SMIC net mensuel avant impôt, salarié non-cadre"
                data={smicChart}
                footnote="Calculé avec nos taux de cotisations 2026 (vieillesse, AGIRC-ARRCO, CEG, CSG-CRDS). Le net réel varie selon la convention collective et la mutuelle d'entreprise."
              />
            </div>

            <div className="mt-6 rounded-r-lg border-l-4 border-primary bg-muted p-4">
              <p className="text-sm leading-relaxed text-foreground/80">
                <strong className="text-foreground">Pourquoi ça compte
                au-delà du SMIC :</strong> de nombreux minima conventionnels et
                dispositifs (réduction générale de cotisations, seuils
                d&apos;exonération) sont indexés sur le SMIC. Une revalorisation
                en cours d&apos;année décale mécaniquement ces seuils.
              </p>
            </div>
          </section>

          <section>
            <h2 className="flex items-center text-2xl font-bold text-foreground">
              <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
              Le barème du taux neutre a bougé au 1er mai
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              Second changement, encore plus discret : la loi de finances pour
              2026 a réajusté les limites des tranches du{" "}
              <strong>taux par défaut</strong> du prélèvement à la source, à
              compter du 1er mai 2026. Ce taux s&apos;applique à toute personne
              dont l&apos;administration ne connaît pas encore le taux
              personnalisé — typiquement un premier emploi, un changement
              d&apos;employeur, ou un salarié qui a refusé la transmission de son
              taux.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              Les tranches ayant été relevées, un même salaire tombe parfois dans
              une tranche inférieure. L&apos;effet n&apos;est pas anecdotique :
            </p>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3">Net imposable mensuel</th>
                    <th className="px-5 py-3 text-right">Avant le 1er mai</th>
                    <th className="px-5 py-3 text-right">Depuis le 1er mai</th>
                    <th className="px-5 py-3 text-right">Écart mensuel</th>
                  </tr>
                </thead>
                <tbody>
                  {casPAS.map((c) => {
                    const ecart = c.net * c.apres - c.net * c.avant;
                    return (
                      <tr key={c.net} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-3 font-semibold text-foreground">
                          {c.net.toLocaleString("fr-FR")} €
                        </td>
                        <td className="px-5 py-3 text-right tabular-nums text-foreground/80">
                          {(c.avant * 100).toFixed(1).replace(".", ",")} %
                        </td>
                        <td className="px-5 py-3 text-right tabular-nums text-foreground/80">
                          {(c.apres * 100).toFixed(1).replace(".", ",")} %
                        </td>
                        <td className={`px-5 py-3 text-right font-semibold tabular-nums ${ecart < 0 ? "text-accent" : "text-foreground/80"}`}>
                          {ecart === 0
                            ? "—"
                            : `${ecart < 0 ? "−" : "+"}${EUR2.format(Math.abs(ecart)).replace("−", "")}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Taux issus de la grille métropole du BOFiP et de l&apos;article
              204 H du CGI. Un écart négatif signifie moins de prélèvement, donc
              plus de net versé.
            </p>

            <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
              <p className="text-sm leading-relaxed">
                Attention : le taux neutre n&apos;est pas un cadeau fiscal. Il
                détermine ce qui est prélevé chaque mois, pas ce que tu dois
                réellement. Si le prélèvement est trop faible au regard de ta
                situation, la régularisation arrive l&apos;année suivante.
              </p>
            </div>
          </section>

          <section>
            <h2 className="flex items-center text-2xl font-bold text-foreground">
              <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
              Vérifier sur ta propre situation
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              Nos deux simulateurs concernés ont été mis à jour avec ces
              valeurs. Ils permettent de vérifier l&apos;impact sur ton salaire
              réel plutôt que sur un cas type.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {article.liens.map((l) => (
                <Link
                  key={l.url}
                  href={l.url}
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                >
                  {l.label} →
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="flex items-center text-2xl font-bold text-foreground">
              <IconBadge><ExternalLinkIcon className="w-4 h-4" /></IconBadge>
              Sources
            </h2>
            <ul className="mt-4 space-y-3">
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {s.label}
                    <span aria-hidden> ↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs italic text-muted-foreground">
              Article publié le{" "}
              {new Date(article.datePublication).toLocaleDateString("fr-FR")}.
              Les montants cités sont calculés par nos simulateurs à partir des
              taux 2026. Une erreur ?{" "}
              <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                Signale-la
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
