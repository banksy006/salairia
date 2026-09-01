import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, PercentIcon, CalculatorIcon, AlertTriangleIcon } from "@/components/icons";
import { SASU_EURL_2026 } from "@/lib/calculators/sasu-eurl";

// Trajet d'un euro de bénéfice jusqu'au dividende net, dérivé des constantes.
const S = SASU_EURL_2026;
const benefice = 10_000;
const isReduit = benefice * S.IS_TAUX_REDUIT;
const apresIs = benefice - isReduit;
const flatTax = apresIs * S.PFU_TOTAL;
const netFinal = apresIs - flatTax;
const tauxGlobal = 1 - netFinal / benefice;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const PCT = (x: number) => `${Math.round(x * 100)} %`;

const meta: GuideMeta = {
  slug: "dividendes-sasu-ou-salaire",
  titre: "Dividendes en SASU : fiscalité et arbitrage",
  sousTitre: `IS puis flat tax : sur ${EUR.format(benefice)} de bénéfice, ${EUR.format(netFinal)} arrivent dans la poche`,
  chapo: `Les dividendes ont la réputation d'être « moins taxés » que le salaire. La réalité est plus nuancée : un euro de bénéfice traverse deux prélèvements successifs — l'impôt sur les sociétés puis la flat tax de 30 % — pour un taux global d'environ ${PCT(tauxGlobal)} sur la première tranche. Voici le trajet complet, l'option du barème, et le cas particulier de l'EURL qui change tout.`,
  filAriane: "Dividendes SASU",
  datePublished: "2026-08-19",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "trajet", label: "Le trajet d'un euro" },
    { id: "flat-tax", label: "Flat tax ou barème" },
    { id: "eurl", label: "Le piège EURL" },
    { id: "quand", label: "Quand privilégier quoi" },
  ],
  faq: [
    {
      q: "Comment sont imposés les dividendes de SASU en 2026 ?",
      r: `Par défaut au prélèvement forfaitaire unique de ${PCT(S.PFU_TOTAL)} — 12,8 % d'impôt sur le revenu et 17,2 % de prélèvements sociaux — appliqué au montant distribué. Mais ce montant a déjà supporté l'impôt sur les sociétés : ${PCT(S.IS_TAUX_REDUIT)} jusqu'à ${EUR.format(S.IS_SEUIL_REDUIT)} de bénéfice, ${PCT(S.IS_TAUX_NORMAL)} au-delà. Les deux étages se cumulent : c'est le taux combiné qu'il faut regarder, pas la seule flat tax.`,
    },
    {
      q: "Peut-on choisir le barème progressif plutôt que la flat tax ?",
      r: "Oui, sur option lors de la déclaration de revenus. Les dividendes sont alors soumis au barème après un abattement de 40 %, plus les 17,2 % de prélèvements sociaux. L'option est intéressante pour les foyers faiblement imposés — typiquement tranche à 11 % ou non imposables. Depuis 2026, cette option n'est plus irrévocable d'une année sur l'autre, ce qui permet d'arbitrer chaque année selon ses revenus. Au moindre doute, faites les deux calculs avant de cocher la case.",
    },
    {
      q: "Les dividendes de SASU paient-ils des cotisations sociales ?",
      r: "Non — c'est la grande différence avec l'EURL. En SASU, les dividendes supportent les prélèvements sociaux de 17,2 % (inclus dans la flat tax) mais aucune cotisation sociale génératrice de droits. En EURL, la part des dividendes qui excède 10 % du capital social est réintégrée dans l'assiette des cotisations TNS (~45 %) : avec un capital de 1 000 €, quasiment tout dividende y passe. C'est souvent ce seul mécanisme qui fait pencher un arbitrage SASU/EURL.",
    },
    {
      q: "Quand les dividendes peuvent-ils être versés ?",
      r: "Après la clôture de l'exercice et l'approbation des comptes, sur décision d'affectation du résultat — donc en pratique une fois par an, plusieurs mois après avoir gagné l'argent. Des acomptes sur dividendes sont possibles mais encadrés (bilan intermédiaire certifié). Ce décalage temporel est un vrai paramètre : les dividendes ne remplacent pas un revenu mensuel.",
    },
    {
      q: "Verser 100 % en dividendes est-il l'optimum fiscal ?",
      r: "Rarement. Le calcul brut peut le laisser croire, mais il ignore trois éléments : le salaire est déductible du résultat (il réduit l'IS), le salaire crée des droits sociaux que les dividendes ne créent pas, et un dirigeant sans rémunération perd sa couverture maladie et ne valide aucun trimestre. L'optimum réel est presque toujours un mix — notre simulateur SASU/EURL calcule les trois scénarios sur vos chiffres.",
    },
  ],
  sources: [
    { label: "economie.gouv.fr — le prélèvement forfaitaire unique (PFU)", href: "https://www.economie.gouv.fr/particuliers/impots-et-fiscalite/gerer-mes-autres-impots-et-taxes/comment-fonctionne-le-prelevement" },
    { label: "impots.gouv.fr — impôt sur les sociétés", href: "https://www.impots.gouv.fr/international-professionnel/impot-sur-les-societes" },
    { label: "impots.gouv.fr — mes dividendes", href: "https://www.impots.gouv.fr/international-particulier/mes-dividendes" },
    { label: "Bpifrance Création — situation fiscale du président de SASU", href: "https://bpifrance-creation.fr/moment-de-vie/quelle-est-situation-sociale-fiscale-du-president-sasu" },
  ],
};

export const metadata: Metadata = {
  title: `Dividendes SASU 2026 : ${PCT(tauxGlobal)} de prélèvements réels, pas 30 %`,
  description: `IS puis flat tax : sur ${EUR.format(benefice)} de bénéfice, ${EUR.format(netFinal)} nets. Le trajet complet d'un euro de dividende, l'option barème, et la règle des 10 % du capital en EURL.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Dividendes en SASU : le vrai taux de prélèvement",
    description: `La flat tax de 30 % ne raconte que la moitié de l'histoire — le taux combiné IS + PFU atteint ${PCT(tauxGlobal)}.`,
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="trajet" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Le trajet d&apos;un euro de bénéfice
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Suivons {EUR.format(benefice)} de bénéfice dans une SASU restant sous
          le seuil du taux réduit d&apos;IS :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Étape</th>
                <th className="px-5 py-4 text-right">Prélèvement</th>
                <th className="px-5 py-4 text-right">Reste</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-5 py-3 font-semibold text-foreground">Bénéfice avant impôt</td>
                <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">—</td>
                <td className="px-5 py-3 text-right font-bold tabular-nums">{EUR.format(benefice)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-5 py-3 font-semibold text-foreground">
                  Impôt sur les sociétés ({PCT(S.IS_TAUX_REDUIT)} jusqu&apos;à {EUR.format(S.IS_SEUIL_REDUIT)})
                </td>
                <td className="px-5 py-3 text-right tabular-nums text-destructive">− {EUR.format(isReduit)}</td>
                <td className="px-5 py-3 text-right tabular-nums">{EUR.format(apresIs)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-5 py-3 font-semibold text-foreground">Flat tax ({PCT(S.PFU_TOTAL)}) sur la distribution</td>
                <td className="px-5 py-3 text-right tabular-nums text-destructive">− {EUR.format(flatTax)}</td>
                <td className="px-5 py-3 text-right tabular-nums">{EUR.format(netFinal)}</td>
              </tr>
              <tr className="bg-accent/5">
                <td className="border-l-4 border-accent px-5 py-3 font-semibold text-foreground">Net dans la poche</td>
                <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">{PCT(tauxGlobal)} au total</td>
                <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-accent">{EUR.format(netFinal)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le taux réel n&apos;est donc pas 30 % mais{" "}
          <strong>{PCT(tauxGlobal)}</strong> — et il grimpe à environ 47,5 %
          pour la part de bénéfice au-delà de {EUR.format(S.IS_SEUIL_REDUIT)},
          taxée à l&apos;IS à {PCT(S.IS_TAUX_NORMAL)}. Comparer « 30 % de flat
          tax » à « 65 % de charges sur le salaire » revient à comparer des
          étages différents de deux immeubles différents.
        </p>
      </section>

      <section id="flat-tax" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Flat tax ou barème progressif ?
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La flat tax s&apos;applique par défaut, mais vous pouvez opter pour
            le barème progressif : les dividendes sont alors imposés après un{" "}
            <strong>abattement de 40 %</strong>, auquel s&apos;ajoutent les
            17,2 % de prélèvements sociaux. La règle pratique :
          </p>
          <ul className="mt-4 space-y-2 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Foyer non imposable ou en tranche à 11 %</strong> : le barème avec abattement bat presque toujours la flat tax.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">❌</span>
              <span><strong>Tranche à 30 % et au-delà</strong> : la flat tax reste généralement plus avantageuse.</span>
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Depuis 2026, l&apos;option pour le barème n&apos;est plus
            irrévocable : elle peut être reconsidérée chaque année. L&apos;écart
            se chiffre en centaines d&apos;euros sur quelques milliers de
            dividendes — le calcul dans les deux sens, avant de déclarer, est
            rarement du temps perdu.
          </p>
        </div>
      </section>

      <section id="eurl" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Le piège des dividendes en EURL
        </h2>
        <div className="mt-4 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
          <p className="text-base leading-relaxed">
            Ce guide vaut pour la SASU. En EURL, une règle change tout : la part
            des dividendes qui dépasse{" "}
            <strong>{PCT(S.EURL_SEUIL_DIVIDENDES_CAPITAL)} du capital social</strong>{" "}
            est soumise aux cotisations sociales TNS (~{PCT(S.EURL_TAUX_COTISATIONS_TNS)}),
            en plus de la fiscalité. Avec un capital de {EUR.format(S.CAPITAL_SOCIAL_DEFAUT)} —
            le standard des créations en ligne — le seuil est à{" "}
            {EUR.format(S.CAPITAL_SOCIAL_DEFAUT * S.EURL_SEUIL_DIVIDENDES_CAPITAL)} :
            autant dire que tous les dividendes y passent. C&apos;est le
            mécanisme qui fait si souvent pencher l&apos;arbitrage de statut
            vers la SASU pour qui compte distribuer — notre{" "}
            <Link href="/guides/sasu-eurl" className="underline underline-offset-4">
              guide SASU vs EURL
            </Link>{" "}
            détaille la comparaison complète.
          </p>
        </div>
      </section>

      <section id="quand" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Quand privilégier les dividendes, quand le salaire
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Les dividendes prennent l&apos;avantage…</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              quand vos droits sociaux sont déjà couverts par ailleurs (cumul
              avec un emploi salarié, carrière complète), quand le revenu
              n&apos;est pas nécessaire mensuellement, et pour la part de
              résultat qui excède vos besoins courants.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Le salaire prend l&apos;avantage…</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              quand vous vivez de la société, quand la retraite et la couverture
              maladie comptent, et parce qu&apos;il réduit l&apos;IS en étant
              déductible. Le détail de cet arbitrage est dans notre guide{" "}
              <Link href="/guides/salaire-president-sasu" className="text-primary underline-offset-4 hover:underline">
                salaire du président de SASU
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <p className="text-base text-foreground/80">
            Le simulateur calcule les trois répartitions — 100 % salaire, mix,
            100 % dividendes — sur votre CA réel, et compare SASU et EURL côte
            à côte :
          </p>
          <Link href="/simulateurs/sasu-eurl" className="mt-3 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
            Simuler salaire vs dividendes →
          </Link>
        </div>
      </section>
    </GuideShell>
  );
}
