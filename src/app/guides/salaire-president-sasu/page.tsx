import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalculatorIcon, ScaleIcon, AlertTriangleIcon } from "@/components/icons";
import { SASU_EURL_2026, comparerSasuEurl } from "@/lib/calculators/sasu-eurl";

// Cas type : 80 000 € de CA, 10 000 € de charges d'exploitation.
const CA = 80_000;
const CHARGES = 10_000;
const CAPITAL = 1_000;

const scenario = (remunerationNette: number) =>
  comparerSasuEurl({ caAnnuel: CA, chargesExploitation: CHARGES, remunerationNette, capitalSocial: CAPITAL }).sasu;

const s0 = scenario(0);
const s24 = scenario(24_000);
const s42 = scenario(42_000);

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "salaire-president-sasu",
  titre: "Salaire du président de SASU",
  sousTitre: "Combien se verser — l'arbitrage salaire / dividendes, chiffré",
  chapo: `Le président de SASU fixe librement sa rémunération, de zéro à la totalité du résultat. Chaque euro versé en salaire coûte environ 42 % de charges patronales mais crée des droits sociaux ; chaque euro laissé en société subit l'impôt sur les sociétés puis 30 % de flat tax en dividende, sans créer aucun droit. Voici les trois scénarios calculés sur un cas type à ${EUR.format(CA)} de chiffre d'affaires.`,
  filAriane: "Salaire président SASU",
  datePublished: "2026-08-19",
  dateModified: "2026-08-19",
  tocItems: [
    { id: "libre", label: "Une liberté totale" },
    { id: "scenarios", label: "3 scénarios calculés" },
    { id: "criteres", label: "Comment arbitrer" },
    { id: "zero", label: "Le piège du salaire zéro" },
  ],
  faq: [
    {
      q: "Y a-t-il un salaire minimum pour un président de SASU ?",
      r: "Non, aucun. Le président n'étant pas lié par un contrat de travail, ni le SMIC ni aucun minimum conventionnel ne s'appliquent à son mandat. Il peut ne percevoir aucune rémunération — c'est fréquent en début d'activité ou en cumul avec un emploi salarié. La contrepartie : sans rémunération, aucune cotisation n'est versée, donc aucun droit social n'est acquis, ni retraite ni indemnités maladie.",
    },
    {
      q: "Combien coûte 1 000 € de salaire net au président ?",
      r: `Environ ${EUR.format(1000 / 0.78 * 1.42)} sortis de la société : le net est majoré d'environ 22 % de cotisations salariales pour obtenir le brut (soit ${EUR.format(1000 / 0.78)}), puis de ${Math.round(SASU_EURL_2026.SASU_TAUX_CHARGES_PATRONALES * 100)} % de charges patronales. Ce coût est déductible du résultat, ce qui réduit l'impôt sur les sociétés — c'est ce qui rend l'arbitrage moins défavorable qu'il n'y paraît.`,
    },
    {
      q: "Le salaire du président doit-il être versé chaque mois ?",
      r: "Non. La rémunération du mandat est fixée par les statuts ou par décision d'associé, et peut être mensuelle, trimestrielle ou même décidée en fin d'exercice selon le résultat. Beaucoup de présidents de petite SASU ajustent leur rémunération une à deux fois par an. Attention néanmoins : des versements sans décision formalisée fragilisent la société en cas de contrôle.",
    },
    {
      q: "Peut-on cumuler salaire de président et dividendes ?",
      r: "Oui, et c'est même la stratégie la plus courante au-delà d'un certain résultat : une rémunération régulière qui ouvre les droits sociaux et lisse la trésorerie personnelle, complétée par des dividendes sur le bénéfice restant. Le point d'équilibre dépend de votre besoin de revenus immédiats, de votre tranche d'imposition et de la valeur que vous accordez à la retraite — notre simulateur calcule les trois scénarios sur vos chiffres.",
    },
    {
      q: "La rémunération du président est-elle un salaire au sens du droit du travail ?",
      r: "Non — c'est une rémunération de mandat social. Le président est « assimilé salarié » pour la Sécurité sociale (il cotise au régime général et reçoit un bulletin de paie), mais il ne bénéficie ni du droit du travail, ni des congés payés, ni de l'assurance chômage. Cette dernière absence surprend beaucoup de créateurs : nous y consacrons un guide dédié.",
    },
  ],
  sources: [
    { label: "Bpifrance Création — situation sociale et fiscale du président de SASU", href: "https://bpifrance-creation.fr/moment-de-vie/quelle-est-situation-sociale-fiscale-du-president-sasu" },
    { label: "URSSAF — dirigeant assimilé salarié", href: "https://www.urssaf.fr/accueil/choisir-forme-juridique/creer-societe.html" },
    { label: "impots.gouv.fr — impôt sur les sociétés", href: "https://www.impots.gouv.fr/international-professionnel/impot-sur-les-societes" },
    { label: "economie.gouv.fr — prélèvement forfaitaire unique", href: "https://www.economie.gouv.fr/particuliers/impots-et-fiscalite/gerer-mes-autres-impots-et-taxes/comment-fonctionne-le-prelevement" },
  ],
};

export const metadata: Metadata = {
  title: "Salaire président SASU : combien se verser en 2026 (calculs)",
  description: `Salaire, dividendes ou mix : trois scénarios calculés sur ${EUR.format(CA)} de CA. Coût réel d'un euro de salaire, flat tax 30 %, et le piège du salaire zéro.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Salaire du président de SASU : l'arbitrage chiffré",
    description: "Trois scénarios calculés, du 100 % dividendes au salaire plein.",
    url: `/guides/${meta.slug}`,
  },
};

const rows = [
  { label: "100 % dividendes (salaire zéro)", s: s0, rem: 0 },
  { label: "Mix — 2 000 € nets/mois de salaire", s: s24, rem: 24_000 },
  { label: "Salaire prioritaire — 3 500 € nets/mois", s: s42, rem: 42_000 },
];

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="libre" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Une liberté que ni le salarié ni le gérant TNS n&apos;ont
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            En SASU, la rémunération du président est un{" "}
            <strong>choix de gestion</strong>, pas une obligation : zéro,
            symbolique, ou la totalité du résultat. Chaque euro suit alors
            l&apos;un de deux chemins fiscaux et sociaux très différents.
          </p>
          <ul className="mt-4 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span>
                <strong>Le chemin salaire</strong> : cotisations salariales
                (~{Math.round(SASU_EURL_2026.SASU_TAUX_CHARGES_SALARIALES * 100)} %)
                et patronales (~{Math.round(SASU_EURL_2026.SASU_TAUX_CHARGES_PATRONALES * 100)} %),
                mais le coût total est déductible du résultat, et chaque
                versement crée des droits — retraite de base et complémentaire,
                indemnités maladie, prévoyance.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span>
                <strong>Le chemin dividendes</strong> : le bénéfice paie
                d&apos;abord l&apos;impôt sur les sociétés
                ({Math.round(SASU_EURL_2026.IS_TAUX_REDUIT * 100)} % jusqu&apos;à{" "}
                {EUR.format(SASU_EURL_2026.IS_SEUIL_REDUIT)}, {Math.round(SASU_EURL_2026.IS_TAUX_NORMAL * 100)} %
                au-delà), puis la distribution subit la flat tax de{" "}
                {Math.round(SASU_EURL_2026.PFU_TOTAL * 100)} %. Aucune
                cotisation — donc aucun droit acquis.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section id="scenarios" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Trois scénarios calculés
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Cas type calculé par notre simulateur : {EUR.format(CA)} de chiffre
          d&apos;affaires, {EUR.format(CHARGES)} de charges d&apos;exploitation,
          soit {EUR.format(CA - CHARGES)} de résultat à répartir. Montants avant
          impôt sur le revenu personnel (hors flat tax, déjà déduite des
          dividendes nets).
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Scénario</th>
                <th className="px-5 py-4 text-right">Salaire net annuel</th>
                <th className="px-5 py-4 text-right">IS payé</th>
                <th className="px-5 py-4 text-right">Dividendes nets</th>
                <th className="px-5 py-4 text-right">Total dans la poche</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ label, s, rem }) => {
                const best = s.netTotal === Math.max(...rows.map((r) => r.s.netTotal));
                return (
                  <tr key={label} className={`border-b border-border last:border-b-0 ${best ? "bg-accent/5" : ""}`}>
                    <td className={`px-5 py-3 font-semibold text-foreground ${best ? "border-l-4 border-accent" : ""}`}>{label}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{EUR.format(rem)}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-foreground/70">{EUR.format(s.is)}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{EUR.format(s.dividendesNets)}</td>
                    <td className="px-5 py-3 text-right text-lg font-bold tabular-nums">{EUR.format(s.netTotal)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Lecture contre-intuitive : les totaux sont proches — quelques
          milliers d&apos;euros d&apos;écart sur {EUR.format(CA - CHARGES)} de
          résultat. La vraie différence n&apos;est pas dans le montant
          immédiat, elle est dans ce que chaque scénario{" "}
          <strong>achète en droits sociaux</strong> : le scénario 100 %
          dividendes maximise parfois la poche de l&apos;année, mais laisse le
          président sans un trimestre de retraite ni couverture maladie digne
          de ce nom.
        </p>
      </section>

      <section id="criteres" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Les trois critères d&apos;arbitrage
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Votre besoin de revenu régulier</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Loyer, crédit, famille : si vous vivez de la société, un salaire
              mensuel s&apos;impose. Les dividendes n&apos;arrivent qu&apos;après
              clôture et approbation des comptes — une fois par an.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Votre horizon retraite</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Seul le salaire valide des trimestres et des points. À 30 ans avec
              une carrière salariée derrière soi, l&apos;enjeu est faible ; à 20
              ans de la retraite avec des années incomplètes, chaque année sans
              salaire se paiera.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Votre couverture santé</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Sans rémunération, pas d&apos;indemnités journalières en cas de
              maladie ou d&apos;accident. Un salaire même modeste maintient la
              protection — c&apos;est souvent l&apos;argument décisif contre le
              salaire zéro prolongé.
            </p>
          </div>
        </div>
      </section>

      <section id="zero" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Le piège du salaire zéro prolongé
        </h2>
        <div className="mt-4 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
          <p className="text-base leading-relaxed">
            Se verser zéro pendant un an pour « laisser grossir la société »
            est défendable en phase de lancement. Prolongé, ce choix cumule
            trois angles morts : <strong>aucun trimestre de retraite</strong>{" "}
            validé, <strong>aucune indemnité</strong> en cas de pépin de santé,
            et — contrairement à une idée répandue —{" "}
            <strong>aucun droit au chômage à préserver</strong>, puisque le
            président de SASU n&apos;y cotise de toute façon pas, salaire ou
            pas. Ce dernier point mérite un détour : voir notre guide{" "}
            <Link href="/guides/sasu-chomage-dirigeant" className="underline underline-offset-4">
              SASU et chômage du dirigeant
            </Link>
            .
          </p>
        </div>
        <div className="mt-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <p className="text-base text-foreground/80">
            Les scénarios ci-dessus utilisent un cas type. Sur vos chiffres —
            votre CA, vos charges, la rémunération que vous visez — le
            simulateur calcule les trois répartitions et compare avec
            l&apos;EURL :
          </p>
          <Link href="/simulateurs/sasu-eurl" className="mt-3 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
            Simuler ma rémunération de président →
          </Link>
        </div>
      </section>
    </GuideShell>
  );
}
