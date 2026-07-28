import type { Metadata } from "next";
import ArticleShell, { type ArticleMeta } from "@/components/ArticleShell";
import BarChart, { type BarDatum } from "@/components/charts/BarChart";
import { IconBadge, PercentIcon, TargetIcon, InfoIcon } from "@/components/icons";
import {
  AE_2026,
  calculerAutoEntrepreneur,
} from "@/lib/calculators/auto-entrepreneur";
import data from "@/data/actualites.json";

const article = data.articles.find(
  (a) => a.slug === "cotisations-auto-entrepreneur-hausse-2026",
)! as ArticleMeta;

export const metadata: Metadata = {
  title:
    "Cotisations auto-entrepreneur 2026 : le taux BNC passe à 25,6 %, les plafonds montent",
  description:
    "Au 1er janvier 2026, le taux BNC des auto-entrepreneurs est passé de 24,6 % à 25,6 % et les plafonds du régime micro ont été relevés à 83 600 € et 203 100 €. Impact chiffré.",
  alternates: { canonical: `/actualites/${article.slug}` },
  openGraph: {
    title: "Cotisations auto-entrepreneur 2026 : le taux BNC passe à 25,6 %",
    description:
      "Un point de cotisation en plus, des plafonds relevés : ce que ça change concrètement.",
    url: `/actualites/${article.slug}`,
    type: "article",
  },
};

const ANCIEN_TAUX_BNC = 0.246;
const CA_EXEMPLE = 40_000;

const netAvec = (taux: number) => {
  // On rejoue le calcul du simulateur en substituant l'ancien taux, pour que
  // la comparaison porte sur la seule variable qui a bougé.
  const r = calculerAutoEntrepreneur({
    caAnnuel: CA_EXEMPLE,
    categorie: "BNC_REGIME_GENERAL",
    acre: false,
    versementLiberatoire: false,
    fraisProAnnuels: 0,
  });
  const ecart = CA_EXEMPLE * (AE_2026.TAUX_BNC_REGIME_GENERAL - taux);
  return r.revenuAvantImpot + ecart;
};

const revenuAvant = netAvec(ANCIEN_TAUX_BNC);
const revenuApres = netAvec(AE_2026.TAUX_BNC_REGIME_GENERAL);
const surcout = revenuAvant - revenuApres;

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const chart: BarDatum[] = [
  {
    label: "Revenu annuel avant impôt — taux 2025 (24,6 %)",
    hint: `${EUR.format(CA_EXEMPLE)} de CA, sans frais pro`,
    value: Math.round(revenuAvant),
  },
  {
    label: "Revenu annuel avant impôt — taux 2026 (25,6 %)",
    hint: `${EUR.format(CA_EXEMPLE)} de CA, sans frais pro`,
    value: Math.round(revenuApres),
    highlight: true,
  },
];

const paliers = [20_000, 40_000, 60_000, 83_600].map((ca) => ({
  ca,
  surcout: ca * (AE_2026.TAUX_BNC_REGIME_GENERAL - ANCIEN_TAUX_BNC),
}));

export default function ArticleCotisationsAE() {
  return (
    <ArticleShell article={article} filAriane="Cotisations auto-entrepreneur">
      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Un point de cotisation en plus sur les BNC
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Depuis le 1er janvier 2026, le taux global de cotisations sociales des
          auto-entrepreneurs relevant du régime général et déclarant en{" "}
          <strong>bénéfices non commerciaux</strong> est passé de 24,6 % à{" "}
          <strong>25,6 %</strong>. C&apos;est la catégorie de la plupart des
          consultants, développeurs, graphistes et rédacteurs indépendants.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Un point de plus paraît anodin. Sur {EUR.format(CA_EXEMPLE)} de chiffre
          d&apos;affaires, cela représente pourtant{" "}
          <strong>{EUR.format(surcout)} de cotisations supplémentaires</strong>{" "}
          par an, soit {EUR.format(surcout / 12)} par mois de revenu en moins.
        </p>

        <div className="mt-6">
          <BarChart
            caption={`Revenu annuel avant impôt — BNC au régime général, ${EUR.format(CA_EXEMPLE)} de CA`}
            data={chart}
            footnote="Calculé par notre simulateur auto-entrepreneur, hors frais professionnels et hors CFP. Le revenu affiché est avant impôt sur le revenu."
          />
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[26rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Chiffre d&apos;affaires annuel</th>
                <th className="px-5 py-3 text-right">Cotisations en plus</th>
                <th className="px-5 py-3 text-right">Par mois</th>
              </tr>
            </thead>
            <tbody>
              {paliers.map((p) => (
                <tr key={p.ca} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">
                    {EUR.format(p.ca)}
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">
                    +{EUR.format(p.surcout)}
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">
                    +{EUR.format(p.surcout / 12)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-r-lg border-l-4 border-primary bg-muted p-4">
          <p className="text-sm leading-relaxed text-foreground/80">
            <strong className="text-foreground">Ce n&apos;est pas une taxe
            sèche.</strong> L&apos;Urssaf indique que cette hausse rééquilibre la
            répartition du taux global au profit des cotisations
            <em> contributives</em> — celles qui ouvrent des droits, notamment à
            la retraite complémentaire — et au détriment de la part CSG-CRDS, qui
            n&apos;en ouvre aucun. À taux global comparable, un euro cotisé
            rapporte donc davantage en droits.
          </p>
        </div>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><TargetIcon className="w-4 h-4" /></IconBadge>
          Les plafonds ont été relevés
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Second changement, plus favorable celui-là : les seuils de chiffre
          d&apos;affaires du régime micro ont été revalorisés pour 2026.
        </p>
        <ul className="mt-4 space-y-2 text-base text-foreground/80">
          <li className="flex gap-3">
            <span aria-hidden className="text-accent">✅</span>
            <span>
              <strong>{EUR.format(AE_2026.PLAFOND_BIC_VENTE)}</strong> pour la
              vente de marchandises
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="text-accent">✅</span>
            <span>
              <strong>{EUR.format(AE_2026.PLAFOND_BNC)}</strong> pour les
              prestations de services et les BNC
            </span>
          </li>
        </ul>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          En activité mixte, le chiffre d&apos;affaires global ne doit pas
          dépasser {EUR.format(AE_2026.PLAFOND_BIC_VENTE)}, dont au maximum{" "}
          {EUR.format(AE_2026.PLAFOND_BNC)} de prestations de services.
        </p>

        <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
          <p className="text-sm leading-relaxed">
            Ne confondez pas ce plafond avec le{" "}
            <strong>seuil de franchise de TVA</strong>, bien plus bas :{" "}
            {EUR.format(AE_2026.FRANCHISE_TVA_SERVICES)} pour les services
            (tolérance jusqu&apos;à{" "}
            {EUR.format(AE_2026.FRANCHISE_TVA_SERVICES_TOLERANCE)}). On peut
            rester auto-entrepreneur tout en devant facturer la TVA — c&apos;est
            même le cas le plus fréquent chez les freelances établis.
          </p>
        </div>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          À partir de quand faut-il en changer
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          La hausse ne rend pas le régime micro perdant en soi : il reste le plus
          simple et le moins coûteux à administrer. Ce qui déclenche vraiment
          l&apos;arbitrage, c&apos;est le niveau de <strong>frais
          professionnels</strong>. En micro, aucun frais réel n&apos;est
          déductible — ni matériel, ni local, ni sous-traitance. Dès que ces
          dépenses deviennent significatives, une SASU ou une EURL reprend
          l&apos;avantage, indépendamment du taux de cotisation.
        </p>
      </section>
    </ArticleShell>
  );
}
