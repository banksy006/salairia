import type { Metadata } from "next";
import Link from "next/link";
import ArticleShell, { type ArticleMeta } from "@/components/ArticleShell";
import BarChart, { type BarDatum } from "@/components/charts/BarChart";
import { IconBadge, PercentIcon, InfoIcon, CalculatorIcon } from "@/components/icons";
import { ARE_2026, calculerAre } from "@/lib/calculators/are";
import data from "@/data/actualites.json";

const article = data.articles.find(
  (a) => a.slug === "pas-de-revalorisation-allocations-chomage-juillet-2026",
)! as ArticleMeta;

export const metadata: Metadata = {
  title: "Chômage : pas de revalorisation des allocations au 1er juillet 2026",
  description:
    "L'Unédic a décidé le 30 juin 2026 de ne pas revaloriser les allocations. ARE minimale à 32,13 €/jour, partie fixe à 13,18 € : les paramètres de 2025 sont reconduits. Impact chiffré sur trois niveaux de salaire.",
  alternates: { canonical: `/actualites/${article.slug}` },
  openGraph: {
    title: "Chômage : pas de revalorisation des allocations au 1er juillet 2026",
    description:
      "Les paramètres de calcul de l'ARE sont reconduits à l'identique. Ce que cela représente sur une allocation mensuelle.",
    url: `/actualites/${article.slug}`,
    type: "article",
  },
};

// Trois profils de salaire, allocation calculée par notre simulateur ARE.
const PROFILS = [
  { label: "SMIC (1 867 € bruts/mois)", brutMensuel: 1_867 },
  { label: "Salaire médian (2 800 € bruts/mois)", brutMensuel: 2_800 },
  { label: "Cadre (4 500 € bruts/mois)", brutMensuel: 4_500 },
];
const resultats = PROFILS.map((p) => ({
  ...p,
  are: calculerAre(p.brutMensuel * 12),
}));

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const chart: BarDatum[] = resultats.map((r) => ({
  label: r.label,
  hint: `taux de remplacement ${Math.round(r.are.tauxRemplacement * 100)} %`,
  value: Math.round(r.are.allocationMensuelle),
}));

export default function Page() {
  return (
    <ArticleShell article={article} filAriane="Allocations chômage 2026">
      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Une décision du 30 juin, un gel de fait
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Chaque année, le conseil d&apos;administration de l&apos;Unédic
          examine au 1er juillet une revalorisation des allocations. Le 30 juin
          2026, il a décidé de <strong>ne pas revaloriser</strong> : les
          paramètres en vigueur depuis le 1er juillet 2025 sont reconduits tels
          quels.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Il ne s&apos;agit pas d&apos;une baisse — aucun allocataire ne voit son
          montant diminuer. Mais en période d&apos;inflation, un montant
          nominal inchangé est une perte de pouvoir d&apos;achat réelle pour
          les allocataires, particulièrement au niveau du plancher où
          l&apos;allocation ne suit aucun salaire.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Paramètre</th>
                <th className="px-5 py-4 text-right">Valeur reconduite</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Partie proportionnelle du salaire journalier de référence", `${(ARE_2026.TAUX_PROPORTIONNEL * 100).toLocaleString("fr-FR", { minimumFractionDigits: 1 })} %`],
                ["Partie fixe journalière", EUR2.format(ARE_2026.PARTIE_FIXE_JOUR)],
                ["Plancher alternatif (% du SJR)", `${Math.round(ARE_2026.TAUX_ALTERNATIF * 100)} %`],
                ["Allocation minimale journalière", EUR2.format(ARE_2026.ALLOCATION_MINIMALE_JOUR)],
                ["Plafond (% du SJR)", `${Math.round(ARE_2026.PLAFOND_PART_SJR * 100)} %`],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 text-foreground/80">{k}</td>
                  <td className="px-5 py-3 text-right font-semibold tabular-nums text-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Ce que ça donne sur trois niveaux de salaire
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Allocations mensuelles brutes calculées avec les paramètres
          ci-dessus, pour une année complète travaillée au salaire indiqué :
        </p>
        <div className="mt-6">
          <BarChart
            caption="Allocation mensuelle brute estimée"
            data={chart}
            footnote="Estimations calculées par notre simulateur à partir des paramètres Unédic reconduits. Le montant réel dépend de la période de référence retenue par France Travail."
          />
        </div>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Le calcul fait apparaître un mécanisme que peu de gens ont en tête.
          France Travail retient le plus avantageux de deux modes : soit{" "}
          {(ARE_2026.TAUX_PROPORTIONNEL * 100).toLocaleString("fr-FR", { minimumFractionDigits: 1 })} %
          du salaire journalier de référence <em>plus</em> une partie fixe de{" "}
          {EUR2.format(ARE_2026.PARTIE_FIXE_JOUR)}, soit{" "}
          {Math.round(ARE_2026.TAUX_ALTERNATIF * 100)} % de ce salaire de référence.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Au niveau du SMIC, la partie fixe pèse lourd dans un petit salaire de
          référence : c&apos;est le premier mode qui gagne, et le taux de
          remplacement atteint{" "}
          <strong>{Math.round(resultats[0].are.tauxRemplacement * 100)} %</strong>.
          Dès le salaire médian, la partie fixe devient négligeable et
          c&apos;est le second mode qui prend le relais — le taux se stabilise
          à <strong>{Math.round(ARE_2026.TAUX_ALTERNATIF * 100)} %</strong> et n&apos;en
          bouge plus, pour le salaire médian comme pour le cadre à{" "}
          {EUR.format(4_500)}. Le gel de la partie fixe à{" "}
          {EUR2.format(ARE_2026.PARTIE_FIXE_JOUR)} touche donc d&apos;abord les
          allocataires les moins payés : c&apos;est sur eux seuls qu&apos;elle
          fait encore une différence.
        </p>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Qui est concerné, qui ne l&apos;est pas
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md">
          <p className="text-base leading-relaxed text-foreground/80">
            Ce gel concerne les allocataires de l&apos;assurance chômage,
            c&apos;est-à-dire les anciens salariés — y compris les{" "}
            <Link href="/guides/portage-salarial-chomage" className="text-primary underline-offset-4 hover:underline">
              salariés portés
            </Link>
            , qui cotisent et ouvrent des droits comme n&apos;importe quel
            salarié.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Il ne concerne pas ceux qui n&apos;ont, de toute façon, pas de
            droits : les micro-entrepreneurs et les présidents de SASU ne
            cotisent pas à l&apos;assurance chômage. C&apos;est un angle mort
            que nous détaillons dans nos guides{" "}
            <Link href="/guides/auto-entrepreneur-chomage" className="text-primary underline-offset-4 hover:underline">
              auto-entrepreneur et chômage
            </Link>{" "}
            et{" "}
            <Link href="/guides/sasu-chomage-dirigeant" className="text-primary underline-offset-4 hover:underline">
              SASU et chômage du dirigeant
            </Link>
            .
          </p>
        </div>
      </section>
    </ArticleShell>
  );
}
