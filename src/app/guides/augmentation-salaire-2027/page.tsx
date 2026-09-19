import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, BarChartIcon, CalculatorIcon, TargetIcon, LightbulbIcon, InfoIcon } from "@/components/icons";
import { calculerBrutVersNet } from "@/lib/calculators/salaire-brut-net";

// Enquêtes de budgets d'augmentation pour 2027, publiées entre août et
// septembre 2026. Ce sont des intentions déclarées par les entreprises, pas
// des données officielles : elles sont citées comme telles.
// Vérifié le 19 septembre 2026.
const ENQUETES = [
  { source: "WTW — Salary Budget Planning", date: "4 août 2026", prevision: "3 % (moyenne)", n2026: "—", note: "Hypothèses d'inflation retenues : 2,5 % en 2026, 1,7 % en 2027. 17 % des entreprises prévoyaient des augmentations générales en 2026." },
  { source: "Mercer — enquête NAO", date: "septembre 2026", prevision: "2,5 % (médiane)", n2026: "2 % (médiane)", note: "277 entreprises interrogées. L'enveloppe 2026 est la plus basse en quatre ans ; 17 % d'augmentations générales liées à l'inflation, contre 61 % en 2025." },
  { source: "Michael Page — étude de rémunérations", date: "17 septembre 2026", prevision: "2 à 2,5 % (moyenne)", n2026: "1,5 à 2 %", note: "Hausses « légèrement supérieures » à 2026, mais concentrées sur les profils pénuriques." },
];
// Fourchette retenue pour les calculs : de 2 % à 3 %, médiane 2,5 %.
const HAUSSE_BASSE = 0.02;
const HAUSSE_MED = 0.025;
const HAUSSE_HAUTE = 0.03;
// Inflation 2027 telle qu'anticipée par WTW dans son enquête (1,7 %).
const INFLATION_2027 = 0.017;

const net = (brut: number, statut: "cadre" | "non-cadre") =>
  calculerBrutVersNet({ salaire: brut, mode: "brut-vers-net", periodicite: "mensuel", statut, tauxPAS: 0 }).netAvantImpotMensuel;

const PROFILS: { label: string; brut: number; statut: "cadre" | "non-cadre" }[] = [
  { label: "Employé, 2 200 € bruts", brut: 2_200, statut: "non-cadre" },
  { label: "Technicien, 2 800 € bruts", brut: 2_800, statut: "non-cadre" },
  { label: "Cadre, 3 800 € bruts", brut: 3_800, statut: "cadre" },
  { label: "Cadre confirmé, 5 000 € bruts", brut: 5_000, statut: "cadre" },
];

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const PCT1 = (x: number) => x.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const meta: GuideMeta = {
  slug: "augmentation-salaire-2027",
  titre: "Augmentation de salaire 2027 : ce que les entreprises prévoient, et comment obtenir plus",
  sousTitre: "Des budgets entre 2 et 3 % selon les enquêtes — mais distribués à 97 % au mérite : la moyenne ne dit rien de ce que vous toucherez",
  chapo: `Les enveloppes d'augmentation pour 2027 se dessinent : 3 % en moyenne selon WTW, 2,5 % de médiane chez Mercer, 2 à 2,5 % pour Michael Page — un léger mieux après une année 2026 au plus bas depuis quatre ans. Mais la vraie information est ailleurs : seules 17 % des entreprises pratiquent encore des augmentations générales. Le budget se joue désormais entretien par entretien. Voici ce que ces pourcentages représentent en net, ce qu'il en reste après inflation, et comment se placer au-dessus de la moyenne lors des NAO.`,
  filAriane: "Augmentation 2027",
  datePublished: "2026-09-19",
  dateModified: "2026-09-19",
  tocItems: [
    { id: "enquetes", label: "Ce que disent les enquêtes" },
    { id: "net", label: "En net, ça donne quoi" },
    { id: "distribution", label: "Qui touche quoi" },
    { id: "obtenir", label: "Obtenir plus que la moyenne" },
  ],
  faq: [
    {
      q: "De combien les salaires vont-ils augmenter en 2027 ?",
      r: "Les enquêtes menées auprès des entreprises convergent vers une fourchette de 2 à 3 % pour les budgets d'augmentation 2027 : 3 % en moyenne selon WTW (enquête d'août 2026), 2,5 % de médiane selon Mercer (277 entreprises, septembre 2026), 2 à 2,5 % selon Michael Page. C'est légèrement au-dessus de 2026, année où la médiane est tombée à 2 %, son plus bas niveau en quatre ans. Ces chiffres sont des intentions déclarées à l'automne : elles sont régulièrement révisées, à la baisse comme à la hausse, lors des négociations annuelles obligatoires du premier trimestre.",
    },
    {
      q: "Une augmentation de 2,5 %, c'est combien en net par mois ?",
      r: `Pour un salarié non cadre à 2 800 € bruts, +2,5 % représente ${EUR.format(2_800 * HAUSSE_MED)} bruts, soit environ ${EUR.format(net(2_800 * (1 + HAUSSE_MED), "non-cadre") - net(2_800, "non-cadre"))} nets par mois d'après notre simulateur brut/net. Pour un cadre à 3 800 € bruts, ${EUR.format(3_800 * HAUSSE_MED)} bruts et environ ${EUR.format(net(3_800 * (1 + HAUSSE_MED), "cadre") - net(3_800, "cadre"))} nets. Rapporté à l'inflation anticipée pour 2027 (1,7 % selon WTW), le gain de pouvoir d'achat réel se situe autour de 0,8 point — quelques dizaines d'euros par mois. Une augmentation à 2 % ou moins couvre tout juste la hausse des prix.`,
    },
    {
      q: "Pourquoi le budget moyen ne dit-il rien de mon augmentation ?",
      r: "Parce qu'il n'est plus réparti uniformément. En 2026, 17 % des entreprises seulement ont pratiqué des augmentations générales indexées sur l'inflation, contre 61 % un an plus tôt ; 97 % arbitrent au mérite, sur des critères de performance individuelle. Un budget de 2,5 % signifie en pratique que certains salariés reçoivent 0 %, d'autres 5 ou 6 % — profils pénuriques, promotions, rattrapages d'équité salariale. La moyenne est une enveloppe pour l'employeur, pas une promesse pour le salarié.",
    },
    {
      q: "Quand se décident les augmentations 2027 ?",
      r: "Dans la plupart des entreprises, entre janvier et mars 2027, lors des négociations annuelles obligatoires (NAO) pour les augmentations collectives, et lors des entretiens annuels pour les augmentations individuelles. Mais le budget, lui, est arrêté à l'automne 2026 — c'est le moment où les enquêtes citées ici sont réalisées. D'où un conseil de calendrier : la demande d'augmentation se prépare en octobre-novembre, quand l'enveloppe se construit, pas en février quand elle est déjà répartie.",
    },
    {
      q: "L'entreprise peut-elle refuser toute augmentation en 2027 ?",
      r: "Oui, sauf minimum légal ou conventionnel. Aucune loi n'impose une augmentation annuelle : seuls le SMIC (revalorisé au 1er janvier 2027) et les minima de branche s'imposent, et une entreprise dont les salaires les dépassent peut décider d'un gel. La NAO oblige à négocier, pas à conclure. En revanche, l'employeur doit respecter l'égalité de traitement — un refus discriminatoire, ou un écart injustifié entre femmes et hommes à poste équivalent, est contestable, et la directive sur la transparence des salaires va rendre ces écarts visibles.",
    },
  ],
  sources: [
    { label: "WTW — Salary Budget Planning, perspectives 2027 (wtwco.com)", href: "https://www.wtwco.com/fr-fr/insights/2026/01/augmentations-salariales-2026-moins-de-volume-plus-darbitrages-strategiques" },
    { label: "Mercer — enquête NAO 2027, relayée par AEF info", href: "https://www.aefinfo.fr/depeche/755054-apres-plusieurs-annees-de-fortes-revalorisations-les-augmentations-salariales-semblent-se-stabiliser-en-france-wtw" },
    { label: "Michael Page — étude de rémunérations 2027, relayée par AEF info", href: "https://www.aefinfo.fr/depeche/756927-pour-2027-les-entreprises-prevoient-entre-2-et-25-daugmentations-salariales-michael-page" },
    { label: "INSEE — indice des prix à la consommation", href: "https://www.insee.fr/fr/statistiques/serie/001763852" },
    { label: "DARES — évolution des salaires de base (indicateurs trimestriels)", href: "https://dares.travail-emploi.gouv.fr/donnees/les-indices-de-salaires-de-base" },
  ],
};

export const metadata: Metadata = {
  title: "Augmentation salaire 2027 : budgets prévus (2 à 3 %), gain net réel et négociation",
  description: `Les enquêtes WTW, Mercer et Michael Page annoncent des budgets d'augmentation 2027 entre 2 et 3 %, distribués à 97 % au mérite. Ce que +2,5 % représente en net pour quatre profils (calculé avec les cotisations 2026), ce qu'il en reste après 1,7 % d'inflation, et comment obtenir plus que la moyenne aux NAO.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Augmentation de salaire 2027 : ce que les entreprises prévoient",
    description: "Budgets 2 à 3 %, gain net calculé, et comment se placer au-dessus de la moyenne.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="enquetes" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><BarChartIcon className="w-4 h-4" /></IconBadge>
          Ce que disent les enquêtes de l&apos;automne 2026
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Enquête</th>
                <th className="px-5 py-4">Publiée</th>
                <th className="px-5 py-4 text-right">Budget 2027</th>
                <th className="px-5 py-4 text-right">Constaté 2026</th>
              </tr>
            </thead>
            <tbody>
              {ENQUETES.map((e) => (
                <tr key={e.source} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3">
                    <span className="font-semibold text-foreground">{e.source}</span>
                    <span className="mt-1 block max-w-xs text-xs text-muted-foreground">{e.note}</span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-foreground/80">{e.date}</td>
                  <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">{e.prevision}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{e.n2026}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Trois enquêtes, trois méthodes — moyenne ou médiane, panels
          différents — mais une même tendance : après le pic de 2023 (budgets
          proches de 5 %) et la décrue de 2024-2026, les entreprises stabilisent
          leurs enveloppes autour de <strong>2,5 %</strong>, avec un léger
          rebond par rapport à 2026. Ces chiffres décrivent l&apos;intention des
          directions à l&apos;automne, avant les négociations ; l&apos;écart
          entre budget annoncé et augmentations réellement versées est
          historiquement de quelques dixièmes de point.
        </p>
        <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-5 text-amber-900">
          <p className="flex items-start gap-3 text-sm leading-relaxed">
            <InfoIcon className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <span>
              Ces enquêtes sont réalisées par des cabinets de conseil auprès
              d&apos;entreprises volontaires, majoritairement grandes : elles ne
              sont ni des statistiques officielles ni représentatives des TPE.
              La mesure définitive de l&apos;évolution des salaires 2027 viendra
              de l&apos;indice DARES des salaires de base, publié
              trimestriellement.
            </span>
          </p>
        </div>
      </section>

      <section id="net" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          En net, ça donne quoi — et que reste-t-il après l&apos;inflation
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Un pourcentage sur le brut se traduit en net après cotisations. Nous
          avons calculé le gain mensuel net pour quatre profils, avec les
          cotisations 2026 de notre simulateur brut/net, à trois niveaux
          d&apos;augmentation — les bornes des enquêtes et leur milieu :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Profil</th>
                <th className="px-5 py-4 text-right">Net actuel</th>
                <th className="px-5 py-4 text-right">+{PCT1(HAUSSE_BASSE * 100)} %</th>
                <th className="px-5 py-4 text-right">+{PCT1(HAUSSE_MED * 100)} %</th>
                <th className="px-5 py-4 text-right">+{PCT1(HAUSSE_HAUTE * 100)} %</th>
              </tr>
            </thead>
            <tbody>
              {PROFILS.map((p) => {
                const n0 = net(p.brut, p.statut);
                return (
                  <tr key={p.label} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-3 font-semibold text-foreground">{p.label}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(n0)}</td>
                    {[HAUSSE_BASSE, HAUSSE_MED, HAUSSE_HAUTE].map((h) => (
                      <td key={h} className="px-5 py-3 text-right tabular-nums">
                        <span className={`font-bold ${h === HAUSSE_MED ? "text-primary" : "text-foreground"}`}>+{EUR.format(net(p.brut * (1 + h), p.statut) - n0)}</span>
                        <span className="block text-xs text-muted-foreground">nets / mois</span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le net progresse un peu moins vite que le brut pour les cadres au-delà
          du plafond de la Sécurité sociale, où les cotisations de retraite
          complémentaire passent en tranche 2. Rapporté à l&apos;inflation que
          les entreprises elles-mêmes anticipent pour 2027 —{" "}
          {PCT1(INFLATION_2027 * 100)} % —, une augmentation de{" "}
          {PCT1(HAUSSE_MED * 100)} % laisse un gain de pouvoir d&apos;achat
          d&apos;environ {PCT1((HAUSSE_MED - INFLATION_2027) * 100)} point : pour
          le cadre à 3 800 € bruts, cela représente{" "}
          {EUR.format((net(3_800 * (1 + HAUSSE_MED), "cadre") - net(3_800, "cadre")) - net(3_800, "cadre") * INFLATION_2027)}{" "}
          nets par mois de mieux qu&apos;en 2026, en euros constants. À{" "}
          {PCT1(HAUSSE_BASSE * 100)} %, le gain réel est quasi nul.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Pour tester votre propre cas, le{" "}
          <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
            simulateur brut/net
          </Link>{" "}
          convertit n&apos;importe quel montant dans les deux sens, et le{" "}
          <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">
            simulateur net après impôt
          </Link>{" "}
          ajoute l&apos;effet du prélèvement à la source — une augmentation peut
          vous faire changer de taux.
        </p>
      </section>

      <section id="distribution" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><TargetIcon className="w-4 h-4" /></IconBadge>
          Qui touche quoi : la fin des augmentations générales
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le basculement est brutal : <strong>61 %</strong> des entreprises
          pratiquaient des augmentations générales liées à l&apos;inflation en
          2025, <strong>17 %</strong> en 2026. Dans le même temps, 97 %
          déclarent arbitrer les augmentations sur la performance individuelle,
          59 % sur les promotions et évolutions de carrière, 22 % réservent un
          budget aux contributions exceptionnelles. Le budget de 2,5 % est donc
          un total à répartir, et la répartition suit trois priorités :
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { t: "Les compétences pénuriques", d: "Data, cybersécurité, IA, certains métiers techniques et de la santé : ces profils captent une part disproportionnée de l'enveloppe, avec des hausses individuelles à 5 % et plus, parce que leur remplacement coûterait davantage." },
            { t: "L'équité salariale", d: "À l'approche de la transposition de la directive sur la transparence des salaires, les entreprises consacrent une part du budget aux rattrapages d'écarts injustifiés — femmes-hommes, ou entre salariés au même poste. Un levier de négociation nouveau." },
            { t: "La rétention des « clés »", d: "Managers, experts, salariés identifiés comme talents : des budgets ciblés, parfois hors NAO, pour les retenir. Pour les autres, le mérite standard se situe entre 0 et 2 % — souvent en dessous de l'inflation." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Deux mécanismes complètent le tableau. Le{" "}
          <Link href="/guides/smic-2027" className="text-primary underline-offset-4 hover:underline">
            SMIC 2027
          </Link>
          , revalorisé au 1er janvier, relève d&apos;office les salaires
          qu&apos;il rattrape — un effet de tassement des bas de grille que les
          branches doivent ensuite corriger. Et la{" "}
          <Link href="/guides/prime-partage-valeur" className="text-primary underline-offset-4 hover:underline">
            prime de partage de la valeur
          </Link>
          , dont le régime social de faveur expire fin 2026 pour les petites
          entreprises, a servi de substitut aux augmentations pérennes : son
          extinction pourrait, paradoxalement, ramener un peu de budget vers le
          salaire de base.
        </p>
      </section>

      <section id="obtenir" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><LightbulbIcon className="w-4 h-4" /></IconBadge>
          Obtenir plus que la moyenne : le calendrier et les arguments
        </h2>
        <ol className="mt-6 space-y-4">
          {[
            { t: "Se manifester avant que l'enveloppe soit répartie", x: "Les budgets 2027 se construisent en octobre-novembre 2026. Un entretien demandé à ce moment-là, avec un dossier, pèse sur l'arbitrage ; en février, le manager ne peut plus que redistribuer ce qui lui a été alloué." },
            { t: "Chiffrer sa position dans le marché", x: "Une demande argumentée par une fourchette de marché objective — pas par un ressenti — change la nature de la discussion. Nos pages salaires par métier donnent, pour vingt métiers, les fourchettes par niveau et par région ; le simulateur de négociation situe votre salaire dans ces fourchettes." },
            { t: "Séparer mérite, promotion et rattrapage", x: "Ce sont trois lignes budgétaires distinctes. Demander une augmentation « parce que l'inflation » vise la ligne la plus maigre. Demander un rattrapage d'équité, une revalorisation liée à un périmètre élargi, ou un alignement sur le marché externe active des budgets différents — et parfois cumulables." },
            { t: "Négocier au-delà du salaire de base", x: "Prime sur objectifs, télétravail, jours de congé, titres-restaurant, participation à la mutuelle, intéressement : quand l'enveloppe salariale est fermée, les avantages ne le sont pas toujours. Certains sont exonérés de cotisations et valent plus en net qu'un brut équivalent." },
          ].map((e, i) => (
            <li key={e.t} className="flex gap-4 rounded-2xl border border-border bg-white p-5 shadow-md">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{i + 1}</span>
              <div>
                <p className="font-semibold text-foreground">{e.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">{e.x}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Les outils pour préparer l&apos;entretien : le{" "}
          <Link href="/simulateurs/negociation-salariale" className="text-primary underline-offset-4 hover:underline">
            simulateur de négociation salariale
          </Link>{" "}
          pour situer une proposition dans le marché, les{" "}
          <Link href="/metiers" className="text-primary underline-offset-4 hover:underline">
            fourchettes par métier
          </Link>{" "}
          pour l&apos;argumentaire, et le{" "}
          <Link href="/simulateurs/ou-se-situe-mon-salaire" className="text-primary underline-offset-4 hover:underline">
            percentile de votre salaire
          </Link>{" "}
          dans la distribution française. Et si la réponse est non, notre guide{" "}
          <Link href="/guides/transparence-salaires" className="text-primary underline-offset-4 hover:underline">
            sur la transparence des salaires
          </Link>{" "}
          explique ce que le prochain employeur devra vous dire avant même
          l&apos;entretien.
        </p>
      </section>
    </GuideShell>
  );
}
