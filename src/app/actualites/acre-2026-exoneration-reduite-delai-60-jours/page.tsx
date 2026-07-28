import type { Metadata } from "next";
import ArticleShell, { type ArticleMeta } from "@/components/ArticleShell";
import BarChart, { type BarDatum } from "@/components/charts/BarChart";
import { IconBadge, PercentIcon, CalendarIcon, AlertTriangleIcon } from "@/components/icons";
import {
  AE_2026,
  calculerAutoEntrepreneur,
} from "@/lib/calculators/auto-entrepreneur";
import data from "@/data/actualites.json";

const article = data.articles.find(
  (a) => a.slug === "acre-2026-exoneration-reduite-delai-60-jours",
)! as ArticleMeta;

export const metadata: Metadata = {
  title: "ACRE 2026 : exonération réduite à 25 % et demande sous 60 jours",
  description:
    "L'ACRE ne réduit plus les cotisations que de 25 % au lieu de 50 %, et la demande doit être déposée dans les 60 jours suivant le début d'activité. Impact chiffré pour un auto-entrepreneur.",
  alternates: { canonical: `/actualites/${article.slug}` },
  openGraph: {
    title: "ACRE 2026 : exonération réduite à 25 % et demande sous 60 jours",
    description:
      "L'économie est divisée par deux, et un nouveau délai peut faire perdre l'aide entièrement.",
    url: `/actualites/${article.slug}`,
    type: "article",
  },
};

const CA_EXEMPLE = 40_000;
const ANCIENNE_EXONERATION = 0.5;

const base = {
  caAnnuel: CA_EXEMPLE,
  categorie: "BNC_REGIME_GENERAL" as const,
  versementLiberatoire: false,
  fraisProAnnuels: 0,
};

const sansAcre = calculerAutoEntrepreneur({ ...base, acre: false });
const avecAcre = calculerAutoEntrepreneur({ ...base, acre: true });

const economieActuelle = sansAcre.cotisationsURSSAF - avecAcre.cotisationsURSSAF;
const economieAncienne =
  CA_EXEMPLE * AE_2026.TAUX_BNC_REGIME_GENERAL * ANCIENNE_EXONERATION;

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const chart: BarDatum[] = [
  {
    label: "Économie ACRE — règle avant 2026 (50 %)",
    hint: `${EUR.format(CA_EXEMPLE)} de CA en BNC`,
    value: Math.round(economieAncienne),
  },
  {
    label: "Économie ACRE — règle 2026 (25 %)",
    hint: `${EUR.format(CA_EXEMPLE)} de CA en BNC`,
    value: Math.round(economieActuelle),
    highlight: true,
  },
];

export default function ArticleAcre2026() {
  return (
    <ArticleShell article={article} filAriane="ACRE 2026">
      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          L&apos;économie est divisée par deux
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          L&apos;ACRE — aide aux créateurs et repreneurs d&apos;entreprise —
          réduisait jusqu&apos;ici les cotisations de <strong>50 %</strong> en
          début d&apos;activité. Depuis 2026, cette réduction est ramenée à{" "}
          <strong>25 %</strong> : le micro-entrepreneur cotise à 75 % du taux de
          droit commun au lieu de 50 %.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Pour un auto-entrepreneur en BNC réalisant {EUR.format(CA_EXEMPLE)} de
          chiffre d&apos;affaires, l&apos;économie passe de{" "}
          {EUR.format(economieAncienne)} à{" "}
          <strong>{EUR.format(economieActuelle)}</strong> sur la période
          d&apos;exonération.
        </p>

        <div className="mt-6">
          <BarChart
            caption={`Économie de cotisations grâce à l'ACRE — BNC, ${EUR.format(CA_EXEMPLE)} de CA`}
            data={chart}
            footnote="Calculé par notre simulateur auto-entrepreneur, catégorie BNC régime général, sans frais professionnels ni versement libératoire."
          />
        </div>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Le piège : 60 jours pour déposer la demande
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          C&apos;est le changement le plus coûteux, et le moins commenté. Depuis
          le 1er janvier 2026, la demande d&apos;ACRE doit être déposée auprès de
          l&apos;Urssaf <strong>dans les 60 jours suivant le début
          d&apos;activité</strong>. Passé ce délai, l&apos;aide est perdue —
          entièrement, et sans rattrapage possible.
        </p>
        <div className="mt-6 rounded-r-lg border-l-4 border-destructive bg-destructive/10 p-4 text-destructive">
          <p className="text-sm leading-relaxed">
            Beaucoup de créateurs découvrent l&apos;ACRE plusieurs mois après
            leur immatriculation, en préparant leur première déclaration. En
            2026, c&apos;est trop tard. La demande se fait au moment de la
            création ou juste après, pas au moment de déclarer.
          </p>
        </div>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Combien de temps dure réellement l&apos;exonération
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          On lit partout « 12 mois ». C&apos;est une approximation. La règle
          exacte est : <strong>jusqu&apos;à la fin du 3<sup>e</sup> trimestre
          civil suivant la date d&apos;immatriculation</strong>. Selon le moment
          où l&apos;activité démarre, la durée réelle varie donc entre 9 et
          12 mois.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Concrètement, une immatriculation en début de trimestre offre presque
          une année pleine ; une immatriculation en fin de trimestre en offre
          nettement moins. Sur {EUR.format(CA_EXEMPLE)} de CA annuel, trois mois
          d&apos;exonération en moins représentent environ{" "}
          {EUR.format(economieActuelle / 4)} d&apos;écart.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground">
          Pas de dégressivité pour les micro-entrepreneurs
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Une confusion fréquente mérite d&apos;être levée. Pour les
          entrepreneurs au <strong>régime réel</strong>, l&apos;exonération
          devient dégressive au-delà de 36 045 € de revenu et s&apos;annule à
          48 060 € (article D131-6-1 du Code de la sécurité sociale).
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Ce mécanisme ne s&apos;applique <strong>pas</strong> au régime
          micro-social. Le micro-entrepreneur conserve un taux réduit forfaitaire
          quel que soit son chiffre d&apos;affaires, tant qu&apos;il reste dans
          les plafonds du régime.
        </p>
      </section>
    </ArticleShell>
  );
}
